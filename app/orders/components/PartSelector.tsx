'use client';

/**
 * PartSelector component for selecting existing parts or creating new ones
 * Used in order line items to improve UX and maintain part consistency
 */

import React, { useState, useEffect } from 'react';
import {
  Group,
  Button,
  Stack,
  TextInput,
  Text,
  Select,
  Alert,
  ActionIcon,
  Loader,
  Badge,
} from '@mantine/core';
import { IconPlus, IconSearch, IconRefresh } from '@tabler/icons-react';
import { PartCreationModal } from './PartCreationModal';

// Use the same Part type as PartCreationModal for consistency
type PartType = 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';

type Part = {
  id: string;
  partNumber: string;
  partName: string;
  partType: PartType;
  drawingNumber?: string;
  revisionLevel?: string;
  description?: string;
  materialSpec?: string;
  unitOfMeasure?: string;
  standardCost?: number;
  leadTime?: number;
  active?: boolean;
  notes?: string;
};

interface PartSelectorProps {
  value: Part | null;
  onChange: (part: Part | null) => void;
  onPartCreated?: (part: Part) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  isPageReady?: boolean;
  onOpenPartCreation?: (initialPartNumber?: string) => void;
}

const partTypeOptions = [
  { value: 'FINISHED', label: 'Finished Goods/Assemblies', color: 'blue' },
  { value: 'SEMI_FINISHED', label: 'Semi-Finished Parts/Sub-assemblies', color: 'orange' },
  { value: 'RAW_MATERIAL', label: 'Raw Materials/Stock', color: 'green' },
];

const PartSelectorInternal: React.FC<PartSelectorProps> = ({
  value,
  onChange,
  onPartCreated,
  placeholder = "Select or create a part",
  error,
  required = false,
  isPageReady = true,
  onOpenPartCreation,
}) => {
  // All state hooks at the top
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [useDropdown, setUseDropdown] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize component
  useEffect(() => {
    if (isPageReady && !isInitialized) {
      fetchParts();
      setIsInitialized(true);
    }
  }, [isPageReady, isInitialized]);

  const fetchParts = async () => {
    setLoading(true);
    setFetchError(null);
    
    try {
      const response = await fetch('/api/parts');
      if (!response.ok) {
        throw new Error(`Failed to fetch parts: ${response.statusText}`);
      }
      const data = await response.json();
      
      // Handle different response formats
      let partsArray = [];
      if (Array.isArray(data)) {
        partsArray = data;
      } else if (data && Array.isArray(data.data)) {
        partsArray = data.data;
      } else if (data && Array.isArray(data.parts)) {
        partsArray = data.parts;
      } else {
        console.warn('Unexpected response format:', data);
        partsArray = [];
      }
      
      setParts(partsArray);
    } catch (error) {
      console.error('Error fetching parts:', error);
      setFetchError(error instanceof Error ? error.message : 'Unknown error');
      setParts([]);
    } finally {
      setLoading(false);
    }
  };

  // Transform parts to Select options
  const partOptions = Array.isArray(parts) ? parts.map(part => ({
    value: part.id,
    label: `${part.partNumber} - ${part.partName}`,
    part: part,
  })) : [];

  // Filtered options based on search term
  const filteredOptions = searchTerm
    ? partOptions.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.part.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : partOptions;

  const getPartTypeBadge = (partType: string) => {
    const typeConfig = partTypeOptions.find(opt => opt.value === partType);
    return typeConfig ? (
      <Badge 
        color={typeConfig.color} 
        variant="light" 
        size="sm"
      >
        {typeConfig.label.split('/')[0]}
      </Badge>
    ) : null;
  };

  // Render search results content
  const renderSearchResults = () => {
    if (loading) {
      return (
        <Group justify="center" py="md">
          <Loader size="sm" />
          <Text size="sm" c="dimmed">Searching...</Text>
        </Group>
      );
    }

    if (filteredOptions.length > 0) {
      return filteredOptions.slice(0, 10).map(option => (
        <Group
          key={option.value}
          justify="space-between"
          p="xs"
          style={{
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: 'var(--mantine-radius-sm)',
            cursor: 'pointer',
            backgroundColor: value?.id === option.value ? 'var(--mantine-color-blue-0)' : undefined,
          }}
          onClick={() => {
            onChange(option.part);
            setSearchTerm('');
          }}
        >
          <div>
            <Group gap="xs">
              <Text fw={500} size="sm">{option.part.partNumber}</Text>
              {getPartTypeBadge(option.part.partType)}
            </Group>
            <Text size="xs" c="dimmed">{option.part.partName}</Text>
            {option.part.description && (
              <Text size="xs" c="dimmed" lineClamp={1}>
                {option.part.description}
              </Text>
            )}
          </div>
        </Group>
      ));
    }

    return (
      <Group justify="center" py="md">
        <Text size="sm" c="dimmed">No parts found</Text>
        <Button
          size="xs"
          variant="light"
          leftSection={<IconPlus size={14} />}
          onClick={() => onOpenPartCreation?.(searchTerm)}
        >
          Create &quot;{searchTerm}&quot;
        </Button>
      </Group>
    );
  };

  if (fetchError) {
    return (
      <Alert color="red" title="Error Loading Parts">
        <Stack gap="sm">
          <Text size="sm">{fetchError}</Text>
          <Button size="xs" variant="light" onClick={fetchParts}>
            Try Again
          </Button>
        </Stack>
      </Alert>
    );
  }

  return (
    <Stack gap="xs">
      {/* Mode Toggle */}
      <Group gap="xs">
        <Button 
          size="xs" 
          variant={useDropdown ? "filled" : "light"}
          onClick={() => setUseDropdown(true)}
        >
          Select Existing
        </Button>
        <Button 
          size="xs" 
          variant={!useDropdown ? "filled" : "light"}
          onClick={() => setUseDropdown(false)}
        >
          Search/Create
        </Button>
        <ActionIcon
          variant="light"
          onClick={fetchParts}
          loading={loading}
          size="sm"
        >
          <IconRefresh size={14} />
        </ActionIcon>
      </Group>

      {useDropdown ? (
        /* Dropdown Mode */
        <Stack gap="xs">
          <Group gap="xs">
            <div style={{ flex: 1 }}>
              <Select
                placeholder={placeholder}
                value={typeof value === 'string' ? value : (value?.id || '')}
                onChange={(partId) => {
                  if (typeof partId === 'string') {
                    const selectedPart = parts.find(p => p.id === partId || p.partNumber === partId);
                    onChange(selectedPart || null);
                  } else {
                    onChange(null);
                  }
                }}
                data={partOptions}
                searchable
                error={error}
                required={required}
                disabled={loading}
                rightSection={loading ? <Loader size="sm" /> : undefined}
                maxDropdownHeight={200}
                comboboxProps={{
                  withinPortal: true,
                }}
              />
            </div>
            <Button
              leftSection={<IconPlus size={16} />}
              variant="light"
              size="sm"
              onClick={() => onOpenPartCreation?.()}
            >
              New Part
            </Button>
          </Group>
          
          {/* Selected Part Info in Dropdown Mode */}
          {value && (
            <Group justify="space-between" p="xs" style={{
              border: '1px solid var(--mantine-color-green-3)',
              borderRadius: 'var(--mantine-radius-sm)',
              backgroundColor: 'var(--mantine-color-green-0)',
            }}>
              <div style={{ flex: 1 }}>
                {typeof value === 'string' ? (
                  /* If value is a string (part number), find the actual part */
                  (() => {
                    const actualPart = parts.find(p => p.id === value || p.partNumber === value);
                    return actualPart ? (
                      <>
                        <Group gap="xs">
                          <Text fw={500} size="sm">{actualPart.partNumber}</Text>
                          {actualPart.partType && getPartTypeBadge(actualPart.partType)}
                        </Group>
                        <Text size="xs" c="dimmed">{actualPart.partName}</Text>
                        {actualPart.description && (
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {actualPart.description}
                          </Text>
                        )}
                      </>
                    ) : (
                      <Text size="sm" c="dimmed">Part: {value}</Text>
                    );
                  })()
                ) : (
                  /* If value is a Part object */
                  <>
                    <Group gap="xs">
                      <Text fw={500} size="sm">{value.partNumber}</Text>
                      {value.partType && getPartTypeBadge(value.partType)}
                    </Group>
                    <Text size="xs" c="dimmed">{value.partName}</Text>
                    {value.description && (
                      <Text size="xs" c="dimmed" lineClamp={1}>
                        {value.description}
                      </Text>
                    )}
                  </>
                )}
              </div>
              <Button
                size="xs"
                variant="subtle"
                color="red"
                onClick={() => onChange(null)}
              >
                Clear
              </Button>
            </Group>
          )}
        </Stack>
      ) : (
        /* Search/Create Mode */
        <Group gap="xs">
          <div style={{ flex: 1 }}>
            <TextInput
              placeholder="Enter part number or search..."
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftSection={<IconSearch size={16} />}
              error={error}
              required={required}
            />
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            variant="light"
            size="sm"
            onClick={() => onOpenPartCreation?.(searchTerm)}
          >
            New Part
          </Button>
        </Group>
      )}

      {/* Search Results (when in search mode) */}
      {!useDropdown && searchTerm && (
        <Stack gap="xs" style={{ maxHeight: 200, overflowY: 'auto' }}>
          {renderSearchResults()}
        </Stack>
      )}

      {/* Selected Part Display - Only show in search/create mode */}
      {value && !useDropdown && (
        <Group justify="space-between" p="xs" style={{
          border: '1px solid var(--mantine-color-blue-3)',
          borderRadius: 'var(--mantine-radius-sm)',
          backgroundColor: 'var(--mantine-color-blue-0)',
        }}>
          <div>
            <Group gap="xs">
              <Text fw={500} size="sm">{value.partNumber}</Text>
              {getPartTypeBadge(value.partType)}
            </Group>
            <Text size="xs" c="dimmed">{value.partName}</Text>
            {value.description && (
              <Text size="xs" c="dimmed" lineClamp={1}>
                {value.description}
              </Text>
            )}
          </div>
          <Button
            size="xs"
            variant="subtle"
            color="red"
            onClick={() => onChange(null)}
          >
            Remove
          </Button>
        </Group>
      )}
    </Stack>
  );
};

// Wrapper component with modal management
type WrapperProps = Omit<PartSelectorProps, 'onOpenPartCreation'>;

export const PartSelector: React.FC<WrapperProps> = (props) => {
  const [showPartCreationModal, setShowPartCreationModal] = useState(false);
  const [partCreationInitialPN, setPartCreationInitialPN] = useState('');

  const handleOpenPartCreation = (initialPartNumber?: string) => {
    setPartCreationInitialPN(initialPartNumber || '');
    setShowPartCreationModal(true);
  };

  const handlePartCreated = (newPart: Part) => {
    props.onChange(newPart);
    props.onPartCreated?.(newPart);
    setShowPartCreationModal(false);
  };

  return (
    <>
      <PartSelectorInternal
        {...props}
        onOpenPartCreation={handleOpenPartCreation}
      />
      
      <PartCreationModal
        opened={showPartCreationModal}
        onClose={() => setShowPartCreationModal(false)}
        onPartCreated={handlePartCreated}
        initialPartNumber={partCreationInitialPN}
      />
    </>
  );
};

export default PartSelector;
