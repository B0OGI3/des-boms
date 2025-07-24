'use client';

/**
 * Generic Pagination component for data tables
 */

import React from 'react';
import { Select, Text } from '@mantine/core';
import type { UsePaginationReturn } from '../../../hooks/usePagination';

export interface PaginationProps<T> {
  pagination: UsePaginationReturn<T>;
  totalItems: number;
  showItemsPerPage?: boolean;
  itemsPerPageOptions?: number[];
  className?: string;
}

export const Pagination = <T,>({
  pagination,
  totalItems,
  showItemsPerPage = true,
  itemsPerPageOptions = [5, 10, 25, 50],
  className = '',
}: PaginationProps<T>) => {
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    setCurrentPage,
    setItemsPerPage,
    canGoNext,
    canGoPrevious,
  } = pagination;

  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at most
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    const endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    // Add first page if there's a gap
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`page-button ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => setCurrentPage(1)}
          style={getPageButtonStyle(currentPage === 1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" style={getEllipsisStyle()}>...</span>);
      }
    }

    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
          style={getPageButtonStyle(currentPage === i)}
        >
          {i}
        </button>
      );
    }

    // Add last page if there's a gap
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" style={getEllipsisStyle()}>...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => setCurrentPage(totalPages)}
          style={getPageButtonStyle(currentPage === totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const getPageButtonStyle = (isActive: boolean) => ({
    padding: "8px 12px",
    margin: "0 2px",
    background: isActive 
      ? "linear-gradient(135deg, #1e40af, #1e3a8a)"
      : "rgba(30, 41, 59, 0.7)",
    border: "1px solid rgba(51, 65, 85, 0.4)",
    borderRadius: "6px",
    color: isActive ? "#ffffff" : "#cbd5e1",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 500,
    transition: "all 0.2s ease",
    minWidth: "36px",
  });

  const getEllipsisStyle = () => ({
    padding: "8px 4px",
    color: "#64748b",
    fontSize: "0.85rem",
  });

  if (totalItems === 0) return null;

  return (
    <div className={`pagination-container ${className}`} style={getContainerStyle()}>
      <div style={getInfoStyle()}>
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} items
      </div>
      
      <div style={getControlsStyle()}>
        {showItemsPerPage && (
          <div style={getItemsPerPageStyle()}>
            <Text style={{ color: "#94a3b8", fontSize: "0.85rem", marginRight: "8px" }}>
              Show:
            </Text>
            <Select
              value={itemsPerPage.toString()}
              onChange={(value) => value && setItemsPerPage(Number(value))}
              size="sm"
              data={itemsPerPageOptions.map(option => ({
                value: option.toString(),
                label: option.toString()
              }))}
              withCheckIcon={false}
              rightSection={<div style={{ display: "none" }} />}
              styles={{
                input: {
                  background: "rgba(30, 41, 59, 0.7)",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                  color: "#cbd5e1",
                  height: "32px",
                  fontSize: "0.85rem",
                  borderRadius: "6px",
                  minWidth: "60px",
                  fontWeight: 500,
                },
                dropdown: {
                  background: "rgba(15, 23, 42, 0.98)",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                  backdropFilter: "blur(16px)",
                  borderRadius: "6px",
                },
                option: {
                  color: "#cbd5e1",
                  fontSize: "0.85rem",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                },
              }}
            />
          </div>
        )}

        <div style={getButtonsStyle()}>
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!canGoPrevious}
            style={getPageButtonStyle(false)}
          >
            ←
          </button>

          {/* Page numbers */}
          {generatePageNumbers()}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!canGoNext}
            style={getPageButtonStyle(false)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const getContainerStyle = () => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px",
  padding: "16px 0",
  borderTop: "1px solid rgba(51, 65, 85, 0.2)",
});

const getInfoStyle = () => ({
  color: "#94a3b8",
  fontSize: "0.85rem",
  fontWeight: 500,
});

const getControlsStyle = () => ({
  display: "flex",
  alignItems: "center",
  gap: "24px",
});

const getItemsPerPageStyle = () => ({
  display: "flex",
  alignItems: "center",
});

const getButtonsStyle = () => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});
