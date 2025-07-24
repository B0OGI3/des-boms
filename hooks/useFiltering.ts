/**
 * Generic filtering hook for reusable filtering logic
 */

import { useState, useMemo } from 'react';
import type { FilterState, StatusType, PriorityType } from '../types/shared';

export interface UseFilteringOptions<T> {
  searchFields?: (keyof T)[];
  customFilters?: Record<string, (item: T, value: any) => boolean>;
}

export interface UseFilteringReturn<T> {
  // Filter state
  filters: FilterState;
  filteredData: T[];
  
  // Actions
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: StatusType | 'ALL') => void;
  setPriorityFilter: (priority: PriorityType | 'ALL') => void;
  setDateRange: (start: string, end: string) => void;
  setCustomFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  
  // Helpers
  hasActiveFilters: boolean;
  getFilteredCount: () => number;
}

export const useFiltering = <T extends Record<string, any>>(
  data: T[],
  options: UseFilteringOptions<T> = {}
): UseFilteringReturn<T> => {
  const { searchFields = [], customFilters = {} } = options;
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    status: 'ALL',
    priority: 'ALL',
    customFilters: {},
  });
  
  const filteredData = useMemo(() => {
    const applySearchFilter = (item: T): boolean => {
      if (!filters.searchTerm) return true;
      
      const searchLower = filters.searchTerm.toLowerCase();
      return searchFields.some((field) => {
        const value = item[field];
        return value?.toString().toLowerCase().includes(searchLower);
      });
    };
    
    const applyStatusFilter = (item: T): boolean => {
      return filters.status === 'ALL' || item.status === filters.status;
    };
    
    const applyPriorityFilter = (item: T): boolean => {
      return filters.priority === 'ALL' || item.priority === filters.priority;
    };
    
    const applyDateRangeFilter = (item: T): boolean => {
      if (!filters.dateRange) return true;
      
      const itemDate = new Date(item.createdAt || item.orderDate || item.dueDate);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      return itemDate >= startDate && itemDate <= endDate;
    };
    
    const applyCustomFilters = (item: T): boolean => {
      if (!filters.customFilters) return true;
      
      return Object.entries(filters.customFilters).every(([key, value]) => {
        const customFilter = customFilters[key];
        return !customFilter || customFilter(item, value);
      });
    };
    
    return data.filter((item) => {
      return applySearchFilter(item) &&
             applyStatusFilter(item) &&
             applyPriorityFilter(item) &&
             applyDateRangeFilter(item) &&
             applyCustomFilters(item);
    });
  }, [data, filters, searchFields, customFilters]);
  
  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchTerm !== '' ||
      filters.status !== 'ALL' ||
      filters.priority !== 'ALL' ||
      filters.dateRange !== undefined ||
      Object.keys(filters.customFilters || {}).length > 0
    );
  }, [filters]);
  
  const setSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };
  
  const setStatusFilter = (status: StatusType | 'ALL') => {
    setFilters(prev => ({ ...prev, status }));
  };
  
  const setPriorityFilter = (priority: PriorityType | 'ALL') => {
    setFilters(prev => ({ ...prev, priority }));
  };
  
  const setDateRange = (start: string, end: string) => {
    setFilters(prev => ({ ...prev, dateRange: { start, end } }));
  };
  
  const setCustomFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      customFilters: { ...prev.customFilters, [key]: value }
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: 'ALL',
      priority: 'ALL',
      customFilters: {},
    });
  };
  
  return {
    // State
    filters,
    filteredData,
    
    // Actions
    setSearchTerm,
    setStatusFilter,
    setPriorityFilter,
    setDateRange,
    setCustomFilter,
    clearFilters,
    
    // Helpers
    hasActiveFilters,
    getFilteredCount: () => filteredData.length,
  };
};
