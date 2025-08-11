/**
 * Order Search Hook - Database-driven search functionality
 * 
 * Provides debounced search functionality that queries the database
 * instead of filtering client-side data.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'hooks/useDebounce';
import type { StatusType, PriorityType, BaseEntity } from '../../../types/shared';

type PriorityFilterType = PriorityType | 'ALL';
type StatusFilterType = StatusType | 'ALL';

export interface Order extends BaseEntity {
  orderId: string;
  customerName: string;
  orderNumber: string;
  status: StatusType;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  orderDate: string;
  dueDate: string;
  totalValue: number;
  itemCount: number;
  assignedBatches: number;
  completedBatches: number;
  lineItems?: Array<{
    part: {
      id: string;
      partNumber: string;
      partName: string;
      partType: 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
      drawingNumber?: string;
      revisionLevel?: string;
      description?: string;
    };
    quantity: number;
    unitPrice?: number;
    notes?: string;
  }>;
}

interface SearchParams {
  search?: string;
  priority?: string;
  customerId?: string;
}

interface UseOrderSearchReturn {
  // Data
  orders: Order[];
  loading: boolean;
  error: string | null;
  
  // Search state
  searchTerm: string;
  priorityFilter: PriorityFilterType;
  statusFilter: StatusFilterType;
  
  // Actions
  setSearchTerm: (term: string) => void;
  setPriorityFilter: (priority: PriorityFilterType) => void;
  setStatusFilter: (status: StatusFilterType) => void;
  refetch: () => void;
  
  // Helpers
  hasActiveFilters: boolean;
  totalCount: number;
}

// Utility function to convert Prisma PurchaseOrder to UI Order
const convertPurchaseOrderToOrder = (purchaseOrder: {
  id: string;
  orderNumber: string;
  priority: string;
  dueDate: Date | null;
  customerCode: string;
  lineItems?: Array<{
    quantity: number;
    batches?: Array<{ status: string }>;
  }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}): Order => {
  try {
    const allBatches = purchaseOrder.lineItems?.flatMap((item) => item.batches || []) || [];
    const completedBatches = allBatches.filter((batch) => batch.status === 'COMPLETED').length;
    const inProgressBatches = allBatches.filter((batch) => batch.status === 'IN_PROGRESS').length;
    
    // Determine overall order status based on batch completion
    let status: StatusType;
    if (allBatches.length === 0) {
      status = 'PENDING';
    } else if (completedBatches === allBatches.length) {
      status = 'COMPLETED';
    } else if (inProgressBatches > 0) {
      status = 'IN_PROGRESS';
    } else {
      status = 'PENDING';
    }

    // Convert priority mapping from database to frontend values (DES-BOMS spec: Rush / Standard / Hold)
    const priorityMap: Record<string, 'RUSH' | 'STANDARD' | 'HOLD'> = {
      'RUSH': 'RUSH',
      'STANDARD': 'STANDARD', // Direct mapping to spec
      'HOLD': 'HOLD',        // Direct mapping to spec
      // Legacy mappings for backwards compatibility
      'HIGH': 'RUSH',       // Fallback if somehow HIGH exists
      'NORMAL': 'STANDARD', // Fallback if somehow NORMAL exists 
      'LOW': 'HOLD',        // Fallback if somehow LOW exists
    };

    // Calculate total value based on line items (placeholder calculation)
    const totalValue = (purchaseOrder.lineItems || []).reduce((sum: number, item) => {
      return sum + ((item.quantity || 0) * 100); // $100 per unit placeholder
    }, 0);

    return {
      id: purchaseOrder.id,
      createdAt: purchaseOrder.createdAt,
      updatedAt: purchaseOrder.updatedAt,
      orderId: purchaseOrder.systemOrderId || '',
      customerName: purchaseOrder.customer?.name || 'Unknown Customer',
      orderNumber: purchaseOrder.poNumber || '',
      status,
      priority: priorityMap[purchaseOrder.priority] || 'STANDARD',
      orderDate: new Date(purchaseOrder.createdAt).toISOString().split('T')[0],
      dueDate: purchaseOrder.dueDate ? new Date(purchaseOrder.dueDate).toISOString().split('T')[0] : '',
      totalValue,
      itemCount: (purchaseOrder.lineItems || []).length,
      assignedBatches: allBatches.length,
      completedBatches,
      lineItems: (purchaseOrder.lineItems || []).map((item: {
        part?: {
          id?: string;
          partNumber?: string;
          partName?: string;
          partType?: string;
          drawingNumber?: string;
          revisionLevel?: string;
          description?: string;
        };
        quantity?: number;
        unitPrice?: number;
        notes?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      }) => ({
        part: {
          id: item.part?.id || '',
          partNumber: item.part?.partNumber || '',
          partName: item.part?.partName || '',
          partType: (item.part?.partType as 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL') || 'FINISHED_GOOD',
          drawingNumber: item.part?.drawingNumber || undefined,
          revisionLevel: item.part?.revisionLevel || undefined,
          description: item.part?.description || undefined,
        },
        quantity: item.quantity || 0,
        unitPrice: item.unitPrice || undefined,
        notes: item.notes || undefined,
      })),
    };
  } catch (error) {
    console.error('Error converting purchase order:', error, purchaseOrder);
    throw error;
  }
};

export const useOrderSearch = (): UseOrderSearchReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilterType>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('ALL');
  
  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Build search parameters - only send what the API handles
  const searchParams: SearchParams = useMemo(() => {
    const params: SearchParams = {};
    if (debouncedSearchTerm.trim()) {
      params.search = debouncedSearchTerm.trim();
    }
    if (priorityFilter !== 'ALL') {
      // Map frontend priority values to database enum values (DES-BOMS spec: Rush / Standard / Hold)
      const priorityMapping: Record<string, string> = {
        'RUSH': 'RUSH',
        'STANDARD': 'STANDARD', 
        'HOLD': 'HOLD',
        // Legacy mappings for backwards compatibility
        'HIGH': 'RUSH',       // Map HIGH to RUSH 
        'NORMAL': 'STANDARD', // Map NORMAL to STANDARD
        'LOW': 'HOLD',        // Map LOW to HOLD
      };
      const dbPriority = priorityMapping[priorityFilter] || 'STANDARD';
      params.priority = dbPriority;
    }
    // Note: status filtering is handled client-side since it's calculated from batch data
    return params;
  }, [debouncedSearchTerm, priorityFilter]);
  
  // Fetch orders from API
  const fetchOrders = useCallback(async (params: SearchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value?.trim()) {
          queryParams.append(key, value);
        }
      });
      
      const queryString = queryParams.toString();
      const url = queryString ? `/api/orders?${queryString}` : '/api/orders';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        console.error('API returned error:', result);
        throw new Error(result.error || 'Failed to fetch orders');
      }
      
      const ordersData = result.data || [];
      
      const convertedOrders = ordersData.map(convertPurchaseOrderToOrder);
      
      // Apply client-side status filtering since it's calculated from batch data
      let filteredOrders = convertedOrders;
      if (statusFilter !== 'ALL') {
        filteredOrders = convertedOrders.filter((order: Order) => order.status === statusFilter);
      }
      
      setOrders(filteredOrders);
      
    } catch (err) {
      console.error('Error in fetchOrders:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);
  
  // Refetch function for manual refresh
  const refetch = useCallback(() => {
    fetchOrders(searchParams);
  }, [fetchOrders, searchParams]);
  
  // Effect to fetch orders when search parameters change
  useEffect(() => {
    // Add a small delay to prevent rapid API calls
    const timeoutId = setTimeout(() => {
      fetchOrders(searchParams);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchParams, fetchOrders]);
  
  // Initial fetch on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  const hasActiveFilters = Boolean(
    searchTerm.trim() || 
    priorityFilter !== 'ALL' || 
    statusFilter !== 'ALL'
  );
  
  return {
    // Data
    orders,
    loading,
    error,
    
    // Search state
    searchTerm,
    priorityFilter,
    statusFilter,
    
    // Actions
    setSearchTerm,
    setPriorityFilter,
    setStatusFilter,
    refetch,
    
    // Helpers
    hasActiveFilters,
    totalCount: orders.length,
  };
};
