/**
 * Enhanced Search Component with Autocomplete and Suggestions
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Autocomplete, Text, Group, ActionIcon, Tooltip } from '@mantine/core';
import { IconSearch, IconFilter, IconClearAll } from '@tabler/icons-react';

// Simple debounce implementation
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

interface EnhancedSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterToggle?: () => void;
  onClearFilters?: () => void;
  showAdvancedFilters?: boolean;
}

export const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  value,
  onChange,
  placeholder = "Search batches, parts, customers, orders...",
  onFilterToggle,
  onClearFilters,
  showAdvancedFilters = false,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to fetch suggestions
  const fetchSuggestionsImpl = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  }, []);

  // Debounced function to fetch suggestions
  const fetchSuggestions = useCallback(
    debounce(fetchSuggestionsImpl, 300),
    [fetchSuggestionsImpl]
  );

  // Fetch suggestions when search term changes
  useEffect(() => {
    fetchSuggestions(value);
  }, [value, fetchSuggestions]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
      <Group gap="xs" align="flex-end" style={{ width: '100%' }}>
        <div style={{ flex: 1 }}>
          <Text size="sm" style={{ color: "#94a3b8", marginBottom: "8px", fontWeight: 500 }}>
            Search Batches
          </Text>
          <Autocomplete
            value={value}
            onChange={onChange}
            onOptionSubmit={handleSelect}
            data={suggestions}
            placeholder={placeholder}
            leftSection={<IconSearch size={16} style={{ color: '#6b7280' }} />}
            limit={8}
            maxDropdownHeight={400}
            styles={{
              input: {
                height: '44px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(51, 65, 85, 0.5)',
                borderRadius: '8px',
                color: '#e2e8f0',
                fontSize: '14px',
                '&:focus': {
                  borderColor: '#14b8a6',
                  boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.1)',
                },
              },
              dropdown: {
                background: 'rgba(255, 255, 255, 0.98)',
                border: '1px solid rgba(203, 213, 225, 0.6)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(16px)',
              },
              option: {
                borderRadius: '6px',
                margin: '2px',
                '&:hover': {
                  background: 'rgba(248, 250, 252, 0.8)',
                },
              },
            }}
          />
        </div>

        {/* Advanced Filters Toggle */}
        {onFilterToggle && (
          <Tooltip label={showAdvancedFilters ? "Hide Filters" : "Show Advanced Filters"}>
            <ActionIcon
              variant={showAdvancedFilters ? "filled" : "light"}
              size="lg"
              onClick={onFilterToggle}
              style={{
                height: '44px',
                width: '44px',
                background: showAdvancedFilters 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                  : 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: showAdvancedFilters ? '#ffffff' : '#60a5fa',
              }}
            >
              <IconFilter size={18} />
            </ActionIcon>
          </Tooltip>
        )}

        {/* Clear Filters */}
        {onClearFilters && (value || showAdvancedFilters) && (
          <Tooltip label="Clear All Filters">
            <ActionIcon
              variant="light"
              size="lg"
              onClick={onClearFilters}
              style={{
                height: '44px',
                width: '44px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
              }}
            >
              <IconClearAll size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </div>
  );
};
