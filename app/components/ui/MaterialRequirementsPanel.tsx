/**
 * Material Requirements Panel
 * Shows material consumption and BOM breakdown for orders and batches
 */

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Text,
  Group,
  Stack,
  Badge,
  Loader,
  Alert,
  Divider,
} from '@mantine/core';
import {
  IconPackage,
  IconComponents,
  IconCurrencyDollar,
  IconInfoCircle,
  IconChartBar,
} from '@tabler/icons-react';
import { PartTypeIndicator } from './PartTypeIndicator';

interface MaterialRequirement {
  partId: string;
  partNumber: string;
  partName: string;
  partType: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
  totalQuantityRequired: number;
  unitOfMeasure?: string;
  standardCost?: number;
  totalCost: number;
  sources: Array<{
    fromComponent: string;
    quantity: number;
    operation?: string;
  }>;
}

interface LineItemRequirements {
  lineItemId: string;
  part: {
    partNumber: string;
    partName: string;
    partType: 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
  };
  quantity: number;
  materialRequirements: MaterialRequirement[];
  totalMaterialCost: number;
  hasBOM: boolean;
}

interface MaterialRequirementsPanelProps {
  orderId?: string;
  lineItemId?: string;
  partId?: string;
  quantity?: number;
  showCosts?: boolean;
  compact?: boolean;
  onMaterialClick?: (material: MaterialRequirement) => void;
}

export function MaterialRequirementsPanel({
  orderId,
  lineItemId,
  partId,
  quantity = 1,
  showCosts = true,
  compact = false,
  onMaterialClick,
}: Readonly<MaterialRequirementsPanelProps>) {
  const [requirements, setRequirements] = useState<LineItemRequirements[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMaterialRequirements();
  }, [orderId, lineItemId, partId, quantity]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMaterialRequirements = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = '';

      if (orderId) {
        // Load material requirements for entire order
        url = `/api/orders/${orderId}/material-requirements`;
      } else if (lineItemId) {
        // Load material requirements for specific line item
        url = `/api/line-items/${lineItemId}/material-requirements`;
      } else if (partId) {
        // Load material requirements for specific part
        url = `/api/bom?partId=${partId}&quantity=${quantity}&materialsOnly=true`;
      } else {
        throw new Error('Must provide orderId, lineItemId, or partId');
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        if (partId) {
          // Convert single part response to array format
          setRequirements([
            {
              lineItemId: 'single-part',
              part: {
                partNumber: 'Direct Part',
                partName: 'Direct Part',
                partType: 'FINISHED',
              },
              quantity,
              materialRequirements: result.data.rawMaterials || [],
              totalMaterialCost: result.data.totalRawMaterialCost || 0,
              hasBOM: (result.data.rawMaterials || []).length > 0,
            },
          ]);
        } else {
          setRequirements(result.data || []);
        }
      } else {
        setError(result.error || 'Failed to load material requirements');
      }
    } catch (err) {
      console.warn('Error loading material requirements:', err);
      setError('Network error loading material requirements');
    } finally {
      setLoading(false);
    }
  };

  const getTotalCost = () => {
    return requirements.reduce((sum, req) => sum + req.totalMaterialCost, 0);
  };

  const getTotalMaterials = () => {
    const allMaterials = new Set();
    requirements.forEach(req => {
      req.materialRequirements.forEach(mat => {
        allMaterials.add(mat.partId);
      });
    });
    return allMaterials.size;
  };

  const renderMaterialCard = (
    material: MaterialRequirement,
    _lineItem: LineItemRequirements
  ) => (
    <Paper
      key={material.partId}
      withBorder
      p='sm'
      style={{
        backgroundColor: '#f8fafc',
        cursor: onMaterialClick ? 'pointer' : 'default',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s ease',
      }}
      onClick={() => onMaterialClick?.(material)}
    >
      <Group justify='space-between' align='flex-start'>
        <div style={{ flex: 1 }}>
          <Group align='center' gap='sm' style={{ marginBottom: 4 }}>
            <Text
              fw={600}
              size='sm'
              style={{ fontFamily: 'monospace', color: '#0369a1' }}
            >
              {material.partNumber}
            </Text>
            <PartTypeIndicator
              partType={material.partType}
              partNumber={material.partNumber}
              size='xs'
              showDetails={false}
            />
          </Group>

          <Text
            fw={500}
            size='sm'
            style={{ color: '#111827', marginBottom: 2 }}
          >
            {material.partName}
          </Text>

          <Group gap='xs' style={{ marginBottom: 4 }}>
            <Badge size='xs' color='blue' variant='outline'>
              {material.totalQuantityRequired} {material.unitOfMeasure || 'EA'}
            </Badge>

            {material.sources.length > 1 && (
              <Badge size='xs' color='purple' variant='outline'>
                {material.sources.length} sources
              </Badge>
            )}
          </Group>

          {!compact && material.sources.length > 0 && (
            <Text size='xs' style={{ color: '#6b7280' }}>
              Used in: {material.sources.map(s => s.fromComponent).join(', ')}
            </Text>
          )}
        </div>

        {showCosts && material.standardCost && (
          <div style={{ textAlign: 'right', minWidth: 80 }}>
            <Group gap={4} justify='flex-end' style={{ marginBottom: 2 }}>
              <IconCurrencyDollar size={12} style={{ color: '#059669' }} />
              <Text size='sm' fw={600} style={{ color: '#059669' }}>
                ${material.totalCost.toFixed(2)}
              </Text>
            </Group>

            <Text size='xs' style={{ color: '#6b7280' }}>
              @${Number(material.standardCost).toFixed(2)}/ea
            </Text>
          </div>
        )}
      </Group>
    </Paper>
  );

  if (loading) {
    return (
      <Paper withBorder p='md' style={{ textAlign: 'center' }}>
        <Loader size='sm' style={{ marginBottom: 8 }} />
        <Text size='sm' style={{ color: '#6b7280' }}>
          Loading material requirements...
        </Text>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle size={16} />}
        title='Error Loading Material Requirements'
        color='red'
        variant='light'
      >
        {error}
      </Alert>
    );
  }

  if (requirements.length === 0) {
    return (
      <Paper withBorder p='md' style={{ textAlign: 'center' }}>
        <IconComponents
          size={32}
          style={{ color: '#9ca3af', marginBottom: 8 }}
        />
        <Text size='sm' style={{ color: '#6b7280' }}>
          No material requirements found
        </Text>
      </Paper>
    );
  }

  if (compact) {
    const allMaterials = requirements.flatMap(req => req.materialRequirements);
    const totalMaterials = getTotalMaterials();
    const totalCost = getTotalCost();

    return (
      <Paper withBorder p='sm' style={{ backgroundColor: '#f0f9ff' }}>
        <Group justify='space-between' align='center'>
          <Group align='center' gap='sm'>
            <IconPackage size={16} style={{ color: '#0369a1' }} />
            <div>
              <Text size='sm' fw={600} style={{ color: '#0f172a' }}>
                {totalMaterials} Materials Required
              </Text>
              <Text size='xs' style={{ color: '#6b7280' }}>
                {allMaterials.reduce(
                  (sum, mat) => sum + mat.totalQuantityRequired,
                  0
                )}{' '}
                total units
              </Text>
            </div>
          </Group>

          {showCosts && totalCost > 0 && (
            <div style={{ textAlign: 'right' }}>
              <Text size='sm' fw={600} style={{ color: '#059669' }}>
                ${totalCost.toFixed(2)}
              </Text>
              <Text size='xs' style={{ color: '#6b7280' }}>
                material cost
              </Text>
            </div>
          )}
        </Group>
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
              <IconChartBar size={20} style={{ color: '#3b82f6' }} />
              <Text fw={600} size='lg' style={{ color: '#111827' }}>
                Material Requirements
              </Text>
            </Group>

            <Text size='sm' style={{ color: '#6b7280' }}>
              {requirements.length} line item
              {requirements.length !== 1 ? 's' : ''} • {getTotalMaterials()}{' '}
              unique materials
            </Text>
          </div>

          {/* Summary Stats */}
          {showCosts && (
            <div style={{ textAlign: 'right' }}>
              <Text size='xs' style={{ color: '#6b7280' }}>
                Total Material Cost
              </Text>
              <Text fw={600} size='lg' style={{ color: '#059669' }}>
                ${getTotalCost().toFixed(2)}
              </Text>
            </div>
          )}
        </Group>
      </Paper>

      {/* Line Items */}
      {requirements.map(lineItemReq => (
        <Paper key={lineItemReq.lineItemId} withBorder p='md'>
          <Group
            justify='space-between'
            align='center'
            style={{ marginBottom: 12 }}
          >
            <div>
              <Group align='center' gap='sm' style={{ marginBottom: 4 }}>
                <Text
                  fw={600}
                  style={{ fontFamily: 'monospace', color: '#2563eb' }}
                >
                  {lineItemReq.part.partNumber}
                </Text>
                <PartTypeIndicator
                  partType={lineItemReq.part.partType}
                  partNumber={lineItemReq.part.partNumber}
                  hasComponents={lineItemReq.hasBOM}
                  componentCount={lineItemReq.materialRequirements.length}
                  size='sm'
                />
                <Badge size='sm' color='gray' variant='outline'>
                  Qty: {lineItemReq.quantity}
                </Badge>
              </Group>

              <Text fw={500} style={{ color: '#111827' }}>
                {lineItemReq.part.partName}
              </Text>
            </div>

            {showCosts && (
              <div style={{ textAlign: 'right' }}>
                <Text size='sm' fw={600} style={{ color: '#059669' }}>
                  ${lineItemReq.totalMaterialCost.toFixed(2)}
                </Text>
                <Text size='xs' style={{ color: '#6b7280' }}>
                  material cost
                </Text>
              </div>
            )}
          </Group>

          <Divider style={{ marginBottom: 12 }} />

          {lineItemReq.materialRequirements.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                border: '1px solid #f59e0b',
              }}
            >
              <IconInfoCircle
                size={24}
                style={{ color: '#d97706', marginBottom: 8 }}
              />
              <Text fw={500} style={{ color: '#92400e' }}>
                No Material Requirements
              </Text>
              <Text size='sm' style={{ color: '#a16207', marginTop: 4 }}>
                This part does not have a BOM structure defined
              </Text>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 12,
              }}
            >
              {lineItemReq.materialRequirements.map(material =>
                renderMaterialCard(material, lineItemReq)
              )}
            </div>
          )}
        </Paper>
      ))}
    </Stack>
  );
}
