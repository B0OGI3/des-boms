/**
 * QuickBooks Online Integration Service
 * 
 * Handles customer synchronization between DES-BOMS and QuickBooks Online.
 * Uses the official Intuit OAuth and direct API calls for better compatibility.
 */


import OAuthClient from 'intuit-oauth';
import axios, { AxiosResponse } from 'axios';
import { prisma } from './prisma';

// DEBUG: Log env variables for troubleshooting
console.log('[QB DEBUG] QB_SANDBOX:', process.env.QB_SANDBOX, '| QB_CLIENT_ID:', process.env.QB_CLIENT_ID);

// QuickBooks configuration
const QB_CONFIG = {
  clientId: process.env.QB_CLIENT_ID || '',
  clientSecret: process.env.QB_CLIENT_SECRET || '',
  sandbox: process.env.QB_SANDBOX === 'true',
  redirectUri: process.env.QB_REDIRECT_URI || ''
};

// QuickBooks API base URLs
const QB_BASE_URL = QB_CONFIG.sandbox 
  ? 'https://sandbox-quickbooks.api.intuit.com'
  : 'https://quickbooks.api.intuit.com';

// Types for QuickBooks Customer
interface QBCustomer {
  Id?: string;
  DisplayName: string;
  PrimaryEmailAddr?: {
    Address: string;
  };
  PrimaryPhone?: {
    FreeFormNumber: string;
  };
  BillAddr?: {
    Line1?: string;
    City?: string;
    CountrySubDivisionCode?: string;
    PostalCode?: string;
  };
  ShipAddr?: {
    Line1?: string;
    City?: string;
    CountrySubDivisionCode?: string;
    PostalCode?: string;
  };
  SyncToken?: string;
}

interface QBResponse {
  QueryResponse?: {
    Customer?: QBCustomer[];
  };
  Customer?: QBCustomer;
}

interface DESCustomer {
  id: string;
  name: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  billingAddress?: string | null;
  shippingAddress?: string | null;
  quickbooksId?: string | null;
}

/**
 * QuickBooks Service Class
 * Handles all QuickBooks operations and data synchronization
 */
export class QuickBooksService {
  private readonly accessToken: string;
  private readonly companyId: string;
  private readonly oauthClient: OAuthClient;

  constructor(accessToken: string, companyId: string) {
    this.accessToken = accessToken;
    this.companyId = companyId;
    
    this.oauthClient = new OAuthClient({
      clientId: QB_CONFIG.clientId,
      clientSecret: QB_CONFIG.clientSecret,
      environment: QB_CONFIG.sandbox ? 'sandbox' : 'production',
      redirectUri: QB_CONFIG.redirectUri,
    });
  }

  /**
   * Make authenticated API request to QuickBooks
   */
  private async makeQBRequest(method: 'GET' | 'POST', endpoint: string, data?: any): Promise<AxiosResponse> {
    const url = `${QB_BASE_URL}/v3/company/${this.companyId}/${endpoint}`;
    
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    try {
      if (method === 'GET') {
        return await axios.get(url, { headers });
      } else {
        return await axios.post(url, data, { headers });
      }
    } catch (error) {
      console.error(`QuickBooks API ${method} error:`, error);
      throw error;
    }
  }

  /**
   * Create customer in QuickBooks
   */
  async createCustomer(customer: DESCustomer): Promise<string | null> {
    try {
      const qbCustomer: QBCustomer = {
        DisplayName: customer.name,
      };

      // Add email if provided
      if (customer.email) {
        qbCustomer.PrimaryEmailAddr = {
          Address: customer.email,
        };
      }

      // Add phone if provided
      if (customer.phone) {
        qbCustomer.PrimaryPhone = {
          FreeFormNumber: customer.phone,
        };
      }

      // Add billing address if provided
      if (customer.billingAddress) {
        qbCustomer.BillAddr = {
          Line1: customer.billingAddress,
        };
      }

      // Add shipping address if provided
      if (customer.shippingAddress) {
        qbCustomer.ShipAddr = {
          Line1: customer.shippingAddress,
        };
      }

      // Log the payload being sent to QuickBooks
      console.log('[QB DEBUG] Creating customer in QuickBooks with payload:', JSON.stringify(qbCustomer, null, 2));

      const response = await this.makeQBRequest('POST', 'customer', qbCustomer);
      const result: QBResponse = response.data;
      return result.Customer?.Id || null;
    } catch (error: any) {
      // Log the error response from QuickBooks for debugging
      if (error.response) {
        console.error('[QB ERROR] QuickBooks API response:', JSON.stringify(error.response.data, null, 2));
      }
      console.error('Error creating customer in QuickBooks:', error);
      throw error;
    }
  }

  /**
   * Update customer in QuickBooks
   */
  async updateCustomer(quickbooksId: string, customer: DESCustomer): Promise<boolean> {
    try {
      // First get the current customer to get the SyncToken
      const currentCustomer = await this.getCustomer(quickbooksId);
      if (!currentCustomer) {
        throw new Error('Customer not found in QuickBooks');
      }

      const qbCustomer: QBCustomer & { Id: string; SyncToken: string } = {
        Id: quickbooksId,
        SyncToken: currentCustomer.SyncToken || '0',
        DisplayName: customer.name,
      };

      // Update fields as needed
      if (customer.email) {
        qbCustomer.PrimaryEmailAddr = {
          Address: customer.email,
        };
      }

      if (customer.phone) {
        qbCustomer.PrimaryPhone = {
          FreeFormNumber: customer.phone,
        };
      }

      if (customer.billingAddress) {
        qbCustomer.BillAddr = {
          Line1: customer.billingAddress,
        };
      }

      if (customer.shippingAddress) {
        qbCustomer.ShipAddr = {
          Line1: customer.shippingAddress,
        };
      }

      await this.makeQBRequest('POST', 'customer', qbCustomer);
      return true;
    } catch (error) {
      console.error('Error updating customer in QuickBooks:', error);
      throw error;
    }
  }

  /**
   * Get customer from QuickBooks
   */
  async getCustomer(quickbooksId: string): Promise<QBCustomer | null> {
    try {
      const response = await this.makeQBRequest('GET', `customer/${quickbooksId}`);
      const result: QBResponse = response.data;
      
      return result.QueryResponse?.Customer?.[0] || null;
    } catch (error) {
      console.error('QuickBooks get customer error:', error);
      throw error;
    }
  }

  /**
   * Sync DES customer to QuickBooks
   */
  async syncCustomerToQuickBooks(customerId: string): Promise<void> {
    try {
      // Update sync status to UPDATING
      await prisma.customer.update({
        where: { id: customerId },
        data: { 
          syncStatus: 'UPDATING',
          syncError: null 
        },
      });

      // Get customer from database
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        throw new Error('Customer not found in database');
      }

      let quickbooksId: string | null = customer.quickbooksId;

      // Create or update in QuickBooks
      if (quickbooksId) {
        // Update existing customer
        await this.updateCustomer(quickbooksId, customer);
      } else {
        // Create new customer
        quickbooksId = await this.createCustomer(customer);
      }

      // Update database with sync success
      await prisma.customer.update({
        where: { id: customerId },
        data: {
          quickbooksId,
          syncStatus: 'SYNCED',
          lastSyncedAt: new Date(),
          syncError: null,
        },
      });

      console.log(`Customer ${customerId} synced successfully to QuickBooks`);
    } catch (error) {
      console.error(`Failed to sync customer ${customerId}:`, error);
      
      // Update database with sync failure
      await prisma.customer.update({
        where: { id: customerId },
        data: {
          syncStatus: 'FAILED',
          syncError: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      
      throw error;
    }
  }

  /**
   * Get all customers from QuickBooks
   */
  async getAllCustomers(): Promise<QBCustomer[]> {
    const response = await this.makeQBRequest('GET', 'query?query=SELECT * FROM Customer');
    return response.data.QueryResponse?.Customer || [];
  }
}

/**
 * Helper function to get QuickBooks service instance
 * Requires OAuth tokens to be configured in environment variables
 */
export async function getQuickBooksService(): Promise<QuickBooksService | null> {
  try {
    // Get tokens from environment variables (set after OAuth flow)
    const accessToken = process.env.QB_ACCESS_TOKEN || '';
    const companyId = process.env.QB_COMPANY_ID || '';

    if (!accessToken || !companyId) {
      console.warn('QuickBooks credentials not configured - OAuth setup required');
      return null;
    }

    return new QuickBooksService(accessToken, companyId);
  } catch (error) {
    console.error('Failed to initialize QuickBooks service:', error);
    return null;
  }
}

/**
 * Initialize OAuth Client for QuickBooks authentication
 */
export function createOAuthClient(): OAuthClient {
  return new OAuthClient({
    clientId: QB_CONFIG.clientId,
    clientSecret: QB_CONFIG.clientSecret,
    environment: QB_CONFIG.sandbox ? 'sandbox' : 'production',
    redirectUri: QB_CONFIG.redirectUri,
  });
}
