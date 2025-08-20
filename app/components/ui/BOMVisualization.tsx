/**
 * BOM Structure Visualization Component
 * Shows hierarchical BOM structure in a clear, visual format
 */

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Text,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Loader,
  Alert,
  Collapse,
  Divider,
} from '@mantine/core';
import {
  IconChevronRight,
  IconChevronDown,
  IconComponents,
  IconCurrencyDollar,
  IconInfoCircle,
  IconHierarchy,
} from '@tabler/icons-react';
import { PartTypeIndicator } from './PartTypeIndicator';

interface BOMComponent {
  id: string;
  quantity: number;
  unitOfMeasure?: string;
  scrapFactor?: number;
  operation?: string;
  notes?: string;
  componentCost: number;
  childPart: {
    id: string;
    partNumber: string;
    partName: string;
    partType: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
    description?: string;
    standardCost?: number;
    materialSpec?: string;
  };
  subComponents?: BOMComponent[];
}

interface BOMStructure {
  parentPart: {
    id: string;
    partNumber: string;
    partName: string;
    partType: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
    description?: string;
  };
  bomComponents: BOMComponent[];
  summary: {
    totalComponents: number;
    totalMaterialCost: number;
    levels: number;
  };
  materialRequirements?: Array<{
    partId: string;
    partNumber: string;
    partName: string;
    partType: string;
    totalQuantityRequired: number;
    unitOfMeasure?: string;
    standardCost?: number;
    totalCost: number;
  }>;
}

interface BOMVisualizationProps {
  partId: string;
  quantity?: number;
  showMaterialRequirements?: boolean;
  showCosts?: boolean;
  maxLevels?: number;
  compact?: boolean;
  onComponentClick?: (component: BOMComponent) => void;
}

export function BOMVisualization({
  partId,
  quantity = 1,
  showMaterialRequirements = true,
  showCosts = true,
  maxLevels = 3,
  compact: _compact = false,
  onComponentClick,
}: Readonly<BOMVisualizationProps>) {
  const [bomData, setBomData] = useState<BOMStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    loadBOMStructure();
  }, [partId, quantity]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBOMStructure = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/bom?partId=${partId}&quantity=${quantity}&levels=${maxLevels}`
      );
      const result = await response.json();

      if (result.success) {
        setBomData(result.data);
      } else {
        setError(result.error || 'Failed to load BOM structure');
      }
    } catch (err) {
      console.warn('Error loading BOM structure:', err);
      setError('Network error loading BOM structure');
    } finally {
      setLoading(false);
    }
  };

  const toggleComponentExpansion = (componentId: string) => {
    setExpandedComponents(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(componentId)) {
        newExpanded.delete(componentId);
      } else {
        newExpanded.add(componentId);
      }
      return newExpanded;
    });
  };

  const renderBOMComponent = (component: BOMComponent, level: number = 0) => {
    const isExpanded = expandedComponents.has(component.id);
    const hasSubComponents =
      component.subComponents && component.subComponents.length > 0;
    const indentStyle = { marginLeft: level * 20 };

    const getBorderColor = () => {
      if (level === 0) return '#3b82f6';
      if (level === 1) return '#10b981';
      return '#f59e0b';
    };

    return (
      <div key={component.id} style={indentStyle}>
        <Paper
          withBorder
          p='sm'
          style={{
            marginBottom: 8,
            backgroundColor: level === 0 ? '#fafafa' : '#ffffff',
            borderLeft: `3px solid ${getBorderColor()}`,
            cursor: onComponentClick ? 'pointer' : 'default',
          }}
          onClick={() => onComponentClick?.(component)}
        >
          <Group justify='space-between' align='flex-start'>
            <Group align='flex-start' gap='md' style={{ flex: 1 }}>
              {/* Expand/Collapse Button */}
              {hasSubComponents && (
                <ActionIcon
                  variant='subtle'
                  size='sm'
                  onClick={e => {
                    e.stopPropagation();
                    toggleComponentExpansion(component.id);
                  }}
                >
                  {isExpanded ? (
                    <IconChevronDown size={16} />
                  ) : (
                    <IconChevronRight size={16} />
                  )}
                </ActionIcon>
              )}

              {/* Component Info */}
              <div style={{ flex: 1 }}>
                <Group align='center' gap='sm' style={{ marginBottom: 4 }}>
                  <Text
                    fw={600}
                    size='sm'
                    style={{ fontFamily: 'monospace', color: '#2563eb' }}
                  >
                    {component.childPart.partNumber}
                  </Text>

                  <PartTypeIndicator
                    partType={component.childPart.partType}
                    partNumber={component.childPart.partNumber}
                    hasComponents={hasSubComponents}
                    componentCount={component.subComponents?.length || 0}
                    size='xs'
                    showDetails={false}
                  />

                  <Badge size='xs' color='gray' variant='outline'>
                    Qty: {component.quantity} {component.unitOfMeasure || 'EA'}
                  </Badge>

                  {component.scrapFactor && component.scrapFactor > 0 && (
                    <Badge size='xs' color='orange' variant='outline'>
                      +{(component.scrapFactor * 100).toFixed(1)}% scrap
                    </Badge>
                  )}
                </Group>

                <Text
                  fw={500}
                  size='sm'
                  style={{ color: '#111827', marginBottom: 2 }}
                >
                  {component.childPart.partName}
                </Text>

                {component.childPart.description && (
                  <Text size='xs' style={{ color: '#6b7280', marginBottom: 2 }}>
                    {component.childPart.description}
                  </Text>
                )}

                {component.childPart.materialSpec && (
                  <Text size='xs' style={{ color: '#9ca3af' }}>
                    Material: {component.childPart.materialSpec}
                  </Text>
                )}

                {component.operation && (
                  <Text size='xs' style={{ color: '#7c3aed', marginTop: 4 }}>
                    Operation: {component.operation}
                  </Text>
                )}

                {component.notes && (
                  <Text size='xs' style={{ color: '#059669', marginTop: 4 }}>
                    Notes: {component.notes}
                  </Text>
                )}
              </div>
            </Group>

            {/* Cost Information */}
            {showCosts && (
              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <Group gap={4} justify='flex-end' style={{ marginBottom: 2 }}>
                  <IconCurrencyDollar size={12} style={{ color: '#059669' }} />
                  <Text size='sm' fw={600} style={{ color: '#059669' }}>
                    ${component.componentCost.toFixed(2)}
                  </Text>
                </Group>

                {component.childPart.standardCost && (
                  <Text size='xs' style={{ color: '#6b7280' }}>
                    @${Number(component.childPart.standardCost).toFixed(2)}/ea
                  </Text>
                )}
              </div>
            )}
          </Group>
        </Paper>

        {/* Sub-components */}
        {hasSubComponents && (
          <Collapse in={isExpanded}>
            <div style={{ marginLeft: 16, marginTop: 4 }}>
              {component.subComponents!.map(subComponent =>
                renderBOMComponent(subComponent, level + 1)
              )}
            </div>
          </Collapse>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Paper withBorder p='md' style={{ textAlign: 'center' }}>
        <Loader size='sm' style={{ marginBottom: 8 }} />
        <Text size='sm' style={{ color: '#6b7280' }}>
          Loading BOM structure...
        </Text>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle size={16} />}
        title='Error Loading BOM'
        color='red'
        variant='light'
      >
        {error}
      </Alert>
    );
  }

  if (!bomData) {
    return (
      <Paper withBorder p='md' style={{ textAlign: 'center' }}>
        <IconComponents
          size={32}
          style={{ color: '#9ca3af', marginBottom: 8 }}
        />
        <Text size='sm' style={{ color: '#6b7280' }}>
          No BOM structure available
        </Text>
      </Paper>
    );
  }

  return (
    <Stack gap='md'>
      {/* Header */}
      <Paper withBorder p='md' style={{ backgroundColor: '#f8fafc' }}>
        <Group justify='space-between' align='flex-start'>
          <div>
            <Group align='center' gap='sm' style={{ marginBottom: 4 }}>
              <IconHierarchy size={20} style={{ color: '#3b82f6' }} />
              <Text fw={600} size='lg' style={{ color: '#111827' }}>
                BOM Structure
              </Text>
            </Group>

            <Group align='center' gap='sm' style={{ marginBottom: 4 }}>
              <Text
                fw={600}
                style={{ fontFamily: 'monospace', color: '#2563eb' }}
              >
                {bomData.parentPart.partNumber}
              </Text>
              <PartTypeIndicator
                partType={bomData.parentPart.partType}
                partNumber={bomData.parentPart.partNumber}
                hasComponents={bomData.bomComponents.length > 0}
                componentCount={bomData.bomComponents.length}
                bomLevels={bomData.summary.levels}
                size='sm'
              />
            </Group>

            <Text fw={500} style={{ color: '#111827' }}>
              {bomData.parentPart.partName}
            </Text>

            {bomData.parentPart.description && (
              <Text size='sm' style={{ color: '#6b7280' }}>
                {bomData.parentPart.description}
              </Text>
            )}
          </div>

          {/* Summary Stats */}
          <div style={{ textAlign: 'right' }}>
            <Group gap='md'>
              <div>
                <Text size='xs' style={{ color: '#6b7280' }}>
                  Components
                </Text>
                <Text fw={600} style={{ color: '#111827' }}>
                  {bomData.summary.totalComponents}
                </Text>
              </div>

              <div>
                <Text size='xs' style={{ color: '#6b7280' }}>
                  Levels
                </Text>
                <Text fw={600} style={{ color: '#111827' }}>
                  {bomData.summary.levels}
                </Text>
              </div>

              {showCosts && (
                <div>
                  <Text size='xs' style={{ color: '#6b7280' }}>
                    Total Cost
                  </Text>
                  <Text fw={600} style={{ color: '#059669' }}>
                    ${bomData.summary.totalMaterialCost.toFixed(2)}
                  </Text>
                </div>
              )}
            </Group>
          </div>
        </Group>
      </Paper>

      {/* BOM Components */}
      {bomData.bomComponents.length > 0 ? (
        <div>
          {bomData.bomComponents.map(component =>
            renderBOMComponent(component)
          )}
        </div>
      ) : (
        <Paper
          withBorder
          p='md'
          style={{ textAlign: 'center', backgroundColor: '#fef3c7' }}
        >
          <IconInfoCircle
            size={24}
            style={{ color: '#d97706', marginBottom: 8 }}
          />
          <Text fw={500} style={{ color: '#92400e' }}>
            No BOM Structure Defined
          </Text>
          <Text size='sm' style={{ color: '#a16207', marginTop: 4 }}>
            This {bomData.parentPart.partType.toLowerCase().replace('_', ' ')}{' '}
            does not have a bill of materials defined.
          </Text>
        </Paper>
      )}

      {/* Material Requirements Summary */}
      {showMaterialRequirements &&
        bomData.materialRequirements &&
        bomData.materialRequirements.length > 0 && (
          <Paper withBorder p='md'>
            <Text
              fw={600}
              size='md'
              style={{ color: '#111827', marginBottom: 12 }}
            >
              Raw Material Requirements
            </Text>
            <Divider style={{ marginBottom: 12 }} />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 12,
              }}
            >
              {bomData.materialRequirements
                .filter(req => req.partType === 'RAW_MATERIAL')
                .map(material => (
                  <Paper
                    key={material.partId}
                    withBorder
                    p='sm'
                    style={{ backgroundColor: '#f0f9ff' }}
                  >
                    <Group justify='space-between' align='flex-start'>
                      <div style={{ flex: 1 }}>
                        <Text
                          fw={600}
                          size='sm'
                          style={{ fontFamily: 'monospace', color: '#0369a1' }}
                        >
                          {material.partNumber}
                        </Text>
                        <Text size='sm' style={{ color: '#111827' }}>
                          {material.partName}
                        </Text>
                        <Text size='xs' style={{ color: '#6b7280' }}>
                          {material.totalQuantityRequired}{' '}
                          {material.unitOfMeasure || 'EA'}
                        </Text>
                      </div>

                      {showCosts && material.standardCost && (
                        <div style={{ textAlign: 'right' }}>
                          <Text size='sm' fw={600} style={{ color: '#059669' }}>
                            ${material.totalCost.toFixed(2)}
                          </Text>
                          <Text size='xs' style={{ color: '#6b7280' }}>
                            @${Number(material.standardCost).toFixed(2)}
                          </Text>
                        </div>
                      )}
                    </Group>
                  </Paper>
                ))}
            </div>
          </Paper>
        )}
    </Stack>
  );
}
