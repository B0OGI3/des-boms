'use client';

'use client';

/**
 * Generic FilterBar component for search and filtering
 */

import React from 'react';
import { Card, Text, TextInput, Select, Button } from '@mantine/core';
import type { StatusType, PriorityType } from '../../../types/shared';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  
  statusFilter?: StatusType | 'ALL';
  onStatusChange?: (value: StatusType | 'ALL') => void;
  statusOptions?: FilterOption[];
  
  priorityFilter?: PriorityType | 'ALL';
  onPriorityChange?: (value: PriorityType | 'ALL') => void;
  priorityOptions?: FilterOption[];
  
  customFilters?: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
}

const defaultStatusOptions: FilterOption[] = [
  { value: "ALL", label: "All Statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "CANCELLED", label: "Cancelled" },
];

const defaultPriorityOptions: FilterOption[] = [
  { value: "ALL", label: "All Priorities" },
  { value: "LOW", label: "Low" },
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "RUSH", label: "Rush" },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  
  statusFilter,
  onStatusChange,
  statusOptions = defaultStatusOptions,
  
  priorityFilter,
  onPriorityChange,
  priorityOptions = defaultPriorityOptions,
  
  customFilters,
  actionButton,
  onClearFilters,
  hasActiveFilters = false,
}) => {
  const inputStyles = {
    input: {
      background: "rgba(30, 41, 59, 0.7)",
      border: "1px solid rgba(51, 65, 85, 0.4)",
      color: "#cbd5e1",
      height: "40px",
      fontSize: "0.9rem",
      borderRadius: "8px",
      transition: "all 0.2s ease",
      backdropFilter: "blur(8px)",
      fontWeight: 500,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    },
  };

  const selectStyles = {
    ...inputStyles,
    section: { 
      display: "none",
    },
    dropdown: {
      background: "rgba(15, 23, 42, 0.98)",
      border: "1px solid rgba(51, 65, 85, 0.4)",
      backdropFilter: "blur(16px)",
      zIndex: 9999,
      maxHeight: "200px",
      overflowY: "auto" as const,
      borderRadius: "8px",
      marginTop: "4px",
      position: "absolute" as const,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    },
    option: {
      color: "#cbd5e1",
      fontSize: "0.9rem",
      padding: "12px 16px",
      minHeight: "40px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: 500,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    },
    wrapper: {
      position: "relative" as const,
    }
  };

  const labelStyle = {
    color: "#94a3b8",
    marginBottom: 8,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    fontSize: "0.8rem",
    fontWeight: 600,
  };

  return (
    <Card
      padding="xl"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))",
        border: "1px solid rgba(51, 65, 85, 0.4)",
        borderRadius: "12px",
        marginBottom: 24,
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.015) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      
      <div 
        style={{ 
          position: "relative", 
          zIndex: 1, 
          display: "flex", 
          gap: "16px", 
          alignItems: "flex-end",
          flexWrap: "wrap"
        }}
      >
        {/* Search Input */}
        <div style={{ flex: 1, minWidth: 240 }}>
          <Text size="sm" fw={600} style={labelStyle}>
            Search
          </Text>
          <TextInput
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            size="md"
            styles={inputStyles}
          />
        </div>

        {/* Status Filter */}
        {statusFilter !== undefined && onStatusChange && (
          <div style={{ minWidth: 140 }}>
            <Text size="sm" fw={600} style={labelStyle}>
              Status
            </Text>
            <Select
              value={statusFilter}
              onChange={(value) => onStatusChange((value as StatusType | 'ALL') || 'ALL')}
              size="md"
              data={statusOptions}
              withCheckIcon={false}
              rightSection={<div style={{ display: "none" }} />}
              comboboxProps={{
                withinPortal: true,
                middlewares: {
                  flip: false,
                  shift: false,
                }
              }}
              styles={selectStyles}
            />
          </div>
        )}

        {/* Priority Filter */}
        {priorityFilter !== undefined && onPriorityChange && (
          <div style={{ minWidth: 140 }}>
            <Text size="sm" fw={600} style={labelStyle}>
              Priority
            </Text>
            <Select
              value={priorityFilter}
              onChange={(value) => onPriorityChange((value as PriorityType | 'ALL') || 'ALL')}
              size="md"
              data={priorityOptions}
              withCheckIcon={false}
              rightSection={<div style={{ display: "none" }} />}
              comboboxProps={{
                withinPortal: true,
                middlewares: {
                  flip: false,
                  shift: false,
                }
              }}
              styles={selectStyles}
            />
          </div>
        )}

        {/* Custom Filters */}
        {customFilters}

        {/* Clear Filters Button */}
        {hasActiveFilters && onClearFilters && (
          <div>
            <Text size="sm" fw={600} style={{ 
              ...labelStyle,
              color: "transparent", 
              userSelect: "none",
            }}>
              Clear
            </Text>
            <Button
              size="md"
              variant="light"
              color="gray"
              onClick={onClearFilters}
              style={{
                height: "40px",
                fontSize: "0.9rem",
                borderRadius: "8px",
                fontWeight: 600,
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Action Button */}
        {actionButton && (
          <div>
            <Text size="sm" fw={600} style={{ 
              ...labelStyle,
              color: "transparent", 
              userSelect: "none",
            }}>
              Action
            </Text>
            <Button
              size="md"
              onClick={actionButton.onClick}
              style={{
                background: actionButton.variant === 'secondary' 
                  ? "rgba(107, 114, 128, 0.7)"
                  : "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                border: "none",
                height: "40px",
                fontSize: "0.9rem",
                borderRadius: "8px",
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(30, 64, 175, 0.15)",
                paddingLeft: "16px",
                paddingRight: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s ease",
              }}
            >
              {actionButton.label}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
