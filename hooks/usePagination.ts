/**
 * Generic pagination hook for reusable pagination logic
 */

import { useState, useMemo } from 'react';

export interface UsePaginationOptions {
  initialPage?: number;
  initialItemsPerPage?: number;
}

export interface UsePaginationReturn<T> {
  // Pagination state
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  
  // Actions
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  
  // Helpers
  getPaginatedData: (data: T[]) => T[];
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const usePagination = <T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> => {
  const { initialPage = 1, initialItemsPerPage = 10 } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;
  
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };
  
  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);
  const goToNextPage = () => handlePageChange(currentPage + 1);
  const goToPreviousPage = () => handlePageChange(currentPage - 1);
  
  return {
    // State
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    
    // Actions
    setCurrentPage: handlePageChange,
    setItemsPerPage: handleItemsPerPageChange,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    
    // Helpers
    getPaginatedData: () => paginatedData,
    canGoNext,
    canGoPrevious,
  };
};
