/**
 * Customer Management API Routes
 *
 * Handles CRUD operations for customer data in the DES-BOMS system.
 * Provides RESTful endpoints for customer management functionality.
 * Includes QuickBooks Online integration for bidirectional sync.
 */

import { prisma } from '@/lib/prisma';
import { getQuickBooksService } from '@/lib/quickbooks';
import { NextResponse } from 'next/server';

/**
 * Type definition for customer creation/update requests
 * Ensures type safety for incoming customer data
 */
type CustomerRequestBody = {
  name: string; // Required: Customer or company name
  contactName?: string; // Optional: Primary contact person
  email?: string; // Optional: Primary email (must be unique if provided)
  phone?: string; // Optional: Phone number
  billingAddress?: string; // Optional: Billing address
  shippingAddress?: string; // Optional: Shipping/service address
  notes?: string; // Optional: Customer notes
};

/**
 * GET /api/customers
 *
 * Retrieves all customers from the database, ordered alphabetically by name.
 * Used for customer listing pages and selection dropdowns.
 *
 * @returns Array of customer objects
 */
export async function GET() {
  const customers = await prisma.customer.findMany({
    orderBy: { name: 'asc' }, // Sort alphabetically for consistent UI
  });
  return NextResponse.json(customers);
}

/**
 * POST /api/customers
 *
 * Creates a new customer record in the database and syncs to QuickBooks.
 * Validates required fields and handles database constraints.
 *
 * @param req - Request object containing customer data
 * @returns Created customer object or error response
 */
export async function POST(req: Request) {
  const body: CustomerRequestBody = await req.json();
  const {
    name,
    contactName,
    email,
    phone,
    billingAddress,
    shippingAddress,
    notes,
  } = body;

  // Validate required fields
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  // Validate email format if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address' },
      { status: 400 }
    );
  }

  try {
    // Create new customer record with sync status PENDING
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        contactName: contactName || null,
        email: email || null,
        phone: phone || null,
        billingAddress: billingAddress || null,
        shippingAddress: shippingAddress || null,
        notes: notes || null,
        syncStatus: 'PENDING', // QuickBooks sync will be attempted
      },
    });

    // Attempt QuickBooks sync in background (non-blocking)
    syncCustomerToQuickBooks(newCustomer.id).catch(error => {
      console.error(
        `Background QuickBooks sync failed for customer ${newCustomer.id}:`,
        error
      );
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    // Handle database constraints (e.g., unique email violation)
    console.error('Error creating customer:', error);

    // Check for specific database errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A customer with this email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create customer. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Background function to sync customer to QuickBooks
 * Runs asynchronously to avoid blocking the API response
 */
async function syncCustomerToQuickBooks(customerId: string): Promise<void> {
  try {
    const qbService = await getQuickBooksService();
    if (qbService) {
      await qbService.syncCustomerToQuickBooks(customerId);
      console.log(`Customer ${customerId} queued for QuickBooks sync`);
    } else {
      console.warn(
        `QuickBooks not configured - customer ${customerId} not synced`
      );
      // Update sync status to indicate QB not configured
      await prisma.customer.update({
        where: { id: customerId },
        data: {
          syncStatus: 'FAILED',
          syncError: 'QuickBooks not configured',
        },
      });
    }
  } catch (error) {
    console.error(
      `Failed to sync customer ${customerId} to QuickBooks:`,
      error
    );
  }
}
