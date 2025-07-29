import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'hooks/useDebounce';
import type { 
  Batch, 
  BatchSearchParams, 
  BatchStatusFilter, 
  BatchPriorityFilter,
  BatchSearchResult 
} from '../types';

interface UseBatchSearchReturn extends BatchSearchResult {
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: BatchStatusFilter;
  setStatusFilter: (status: BatchStatusFilter) => void;
  priorityFilter: BatchPriorityFilter;
  setPriorityFilter: (priority: BatchPriorityFilter) => void;
  workstationFilter: string;
  setWorkstationFilter: (workstation: string) => void;
  overdueFilter: boolean;
  setOverdueFilter: (overdue: boolean) => void;
  refetch: () => void;
}

// Utility function to convert API response to UI Batch
const convertApiBatchToBatch = (apiBatch: any): Batch => {
  return {
    id: apiBatch.id,
    batchId: apiBatch.batchId,
    lineItemId: apiBatch.lineItemId,
    quantity: apiBatch.quantity,
    startDate: apiBatch.startDate,
    estimatedCompletion: apiBatch.estimatedCompletion,
    actualCompletion: apiBatch.actualCompletion,
    priority: apiBatch.priority,
    status: apiBatch.status,
    notes: apiBatch.notes,
    createdAt: apiBatch.createdAt,
    updatedAt: apiBatch.updatedAt,
    lineItem: {
      id: apiBatch.lineItem.id,
      partNumber: apiBatch.lineItem.partNumber,
      partName: apiBatch.lineItem.partName,
      drawingNumber: apiBatch.lineItem.drawingNumber,
      revisionLevel: apiBatch.lineItem.revisionLevel,
      quantity: apiBatch.lineItem.quantity,
      purchaseOrder: {
        id: apiBatch.lineItem.purchaseOrder.id,
        systemOrderId: apiBatch.lineItem.purchaseOrder.systemOrderId,
        poNumber: apiBatch.lineItem.purchaseOrder.poNumber,
        customer: {
          id: apiBatch.lineItem.purchaseOrder.customer.id,
          name: apiBatch.lineItem.purchaseOrder.customer.name,
        },
      },
    },
    routingSteps: apiBatch.routingSteps || [],
    qcRecords: apiBatch.qcRecords || [],
  };
};

export const useBatchSearch = (): UseBatchSearchReturn => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BatchStatusFilter>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<BatchPriorityFilter>('ALL');
  const [workstationFilter, setWorkstationFilter] = useState<string>('ALL');
  const [overdueFilter, setOverdueFilter] = useState<boolean>(false);
  
  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Build search parameters - only send what the API handles
  const searchParams: BatchSearchParams = useMemo(() => {
    const params: BatchSearchParams = {};
    if (debouncedSearchTerm.trim()) {
      params.search = debouncedSearchTerm.trim();
    }
    if (statusFilter !== 'ALL') {
      params.status = statusFilter;
    }
    if (priorityFilter !== 'ALL') {
      params.priority = priorityFilter;
    }
    if (workstationFilter !== 'ALL') {
      params.workstation = workstationFilter;
    }
    if (overdueFilter) {
      params.overdue = 'true';
    }
    return params;
  }, [debouncedSearchTerm, statusFilter, priorityFilter, workstationFilter, overdueFilter]);
  
  // Fetch batches from API
  const fetchBatches = useCallback(async (params: BatchSearchParams = {}) => {
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
      const url = queryString ? `/api/batches?${queryString}` : '/api/batches';
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch batches');
      }
      
      const data = await response.json();
      
      // Convert API response to UI format
      const convertedBatches = data.data.map(convertApiBatchToBatch);
      setBatches(convertedBatches);
      
    } catch (err) {
      console.error('Error fetching batches:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setBatches([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const refetch = useCallback(() => {
    fetchBatches(searchParams);
  }, [fetchBatches, searchParams]);
  
  // Effect to fetch batches when search parameters change
  useEffect(() => {
    // Add a small delay to prevent rapid API calls
    const timeoutId = setTimeout(() => {
      fetchBatches(searchParams);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchParams, fetchBatches]);
  
  // Initial fetch on mount
  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);
  
  const hasActiveFilters = Boolean(
    searchTerm.trim() || 
    statusFilter !== 'ALL' || 
    priorityFilter !== 'ALL' ||
    workstationFilter !== 'ALL' ||
    overdueFilter
  );
  
  return {
    batches,
    totalCount: batches.length,
    hasActiveFilters,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    workstationFilter,
    setWorkstationFilter,
    overdueFilter,
    setOverdueFilter,
    refetch,
  };
};
