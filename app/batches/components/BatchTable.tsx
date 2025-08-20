'use client';

import React, { useState, useCallback } from 'react';
import {
  Table,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Progress,
  Stack,
  Checkbox,
} from '@mantine/core';
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconPlayerPlay,
  IconClipboardList,
  IconRoute2,
  IconComponents,
} from '@tabler/icons-react';
import { RoutingEditorModal } from './RoutingEditorModal';
import { PartTypeIndicator } from '../../components/ui/PartTypeIndicator';
import type { Batch } from '../types';
import {
  calculateBatchProgress,
  getCurrentStep,
  getBatchStatusColor,
  getBatchPriorityColor,
  isBatchOverdue,
} from '../utils/batchHelpers';

interface BatchTableProps {
  batches: Batch[];
  onViewBatch: (batch: Batch) => void;
  onEditBatch: (batch: Batch) => void;
  onDeleteBatch: (batch: Batch) => void;
  onStartBatch?: (batch: Batch) => void;
  onViewWorkTraveler?: (batch: Batch) => void;
  loading?: boolean;
  emptyMessage?: string;
  // Bulk selection props
  selectedBatches?: Set<string>;
  onSelectBatch?: (batchId: string) => void;
  onSelectAll?: () => void;
  bulkSelectionMode?: boolean;
}

export function BatchTable({
  batches,
  onViewBatch,
  onEditBatch,
  onDeleteBatch,
  onStartBatch,
  onViewWorkTraveler,
  loading = false,
  emptyMessage = 'No batches found',
  selectedBatches = new Set(),
  onSelectBatch,
  onSelectAll,
  bulkSelectionMode = false,
}: Readonly<BatchTableProps>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [routingModalOpen, setRoutingModalOpen] = useState(false);
  const [selectedBatchForRouting, setSelectedBatchForRouting] =
    useState<Batch | null>(null);
  const [bomStructures, setBomStructures] = useState<Map<string, any>>(
    new Map()
  );

  // Optimized checkbox calculations - only run when needed
  const hasSelection = selectedBatches.size > 0;
  const allSelected =
    batches.length > 0 && selectedBatches.size === batches.length;
  const someSelected = hasSelection && !allSelected;

  const toggleRowExpansion = useCallback((batchId: string) => {
    setExpandedRows(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(batchId)) {
        newExpanded.delete(batchId);
      } else {
        newExpanded.add(batchId);
        // Load BOM structure when expanding for the first time
        loadBOMStructure(batchId);
      }
      return newExpanded;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBOMStructure = useCallback(
    async (batchId: string) => {
      const batch = batches.find(b => b.id === batchId);
      if (!batch || bomStructures.has(batch.lineItem.part.id)) return;

      try {
        const response = await fetch(
          `/api/bom?partId=${batch.lineItem.part.id}&quantity=${batch.quantity}`
        );
        const result = await response.json();
        if (result.success) {
          setBomStructures(prev =>
            new Map(prev).set(batch.lineItem.part.id, result.data)
          );
        }
      } catch (error) {
        console.warn('Failed to load BOM structure:', error);
      }
    },
    [batches, bomStructures]
  );

  const openRoutingEditor = useCallback((batch: Batch) => {
    setSelectedBatchForRouting(batch);
    setRoutingModalOpen(true);
  }, []);

  const closeRoutingEditor = useCallback(() => {
    setRoutingModalOpen(false);
    setSelectedBatchForRouting(null);
  }, []);

  const handleRoutingSave = useCallback((_steps: any[]) => {
    // Refresh the page or update the batch data
    window.location.reload();
  }, []);

  // Simple status color function
  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'green';
      case 'IN_PROGRESS':
        return 'blue';
      case 'FAILED':
        return 'red';
      default:
        return 'gray';
    }
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          border: '1px solid rgba(203, 213, 225, 0.6)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text size='lg' style={{ color: '#374151' }}>
          Loading batches...
        </Text>
      </div>
    );
  }

  if (batches.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          border: '1px solid rgba(203, 213, 225, 0.6)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Text size='lg' style={{ color: '#374151', marginBottom: 8 }}>
          📦 No batches found
        </Text>
        <Text size='sm' style={{ color: '#6b7280' }}>
          {emptyMessage}
        </Text>
      </div>
    );
  }

  return (
    <>
      <div
        className='batch-table-container'
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          border: '1px solid rgba(203, 213, 225, 0.6)',
          boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
        }}
      >
        <Table
          striped
          highlightOnHover
          style={{
            background: 'transparent',
          }}
          styles={{
            th: {
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '16px 12px',
              borderBottom: '1px solid rgba(30, 64, 175, 0.2)',
            },
            td: {
              color: '#374151',
              fontSize: '0.9rem',
              padding: '12px',
              borderBottom: '1px solid rgba(203, 213, 225, 0.3)',
              background: 'transparent',
            },
            tr: {
              '&:hover': {
                background: 'rgba(248, 250, 252, 0.8) !important',
              },
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              {bulkSelectionMode && (
                <Table.Th style={{ width: '50px' }}>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={onSelectAll}
                  />
                </Table.Th>
              )}
              <Table.Th style={{ width: '40px' }}></Table.Th>
              <Table.Th>Batch ID</Table.Th>
              <Table.Th>Part Info</Table.Th>
              <Table.Th>Order</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Progress</Table.Th>
              <Table.Th>Current Step</Table.Th>
              <Table.Th>Routing</Table.Th>
              <Table.Th style={{ width: '180px' }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {batches.map(batch => {
              const isExpanded = expandedRows.has(batch.id);
              const progress = calculateBatchProgress(batch);
              const currentStep = getCurrentStep(batch);
              const overdue = isBatchOverdue(batch);

              return (
                <React.Fragment key={batch.id}>
                  <Table.Tr
                    style={{
                      background: overdue
                        ? 'rgba(239, 68, 68, 0.1)'
                        : 'rgba(248, 250, 252, 0.8)',
                      borderLeft: overdue
                        ? '3px solid #ef4444'
                        : '3px solid transparent',
                      borderBottom: '1px solid rgba(203, 213, 225, 0.3)',
                    }}
                  >
                    {bulkSelectionMode && (
                      <Table.Td>
                        <Checkbox
                          checked={selectedBatches.has(batch.id)}
                          onChange={() => onSelectBatch?.(batch.id)}
                        />
                      </Table.Td>
                    )}
                    <Table.Td>
                      <ActionIcon
                        variant='subtle'
                        size='sm'
                        onClick={() => toggleRowExpansion(batch.id)}
                        style={{ color: '#6b7280' }}
                      >
                        <span
                          style={{
                            fontSize: '12px',
                            transform: isExpanded
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          ▶
                        </span>
                      </ActionIcon>
                    </Table.Td>

                    <Table.Td>
                      <div>
                        <Text fw={600} style={{ color: '#111827' }}>
                          {batch.batchId}
                        </Text>
                        {overdue && (
                          <Badge color='red' size='xs' variant='filled'>
                            OVERDUE
                          </Badge>
                        )}
                      </div>
                    </Table.Td>

                    <Table.Td>
                      <div>
                        <div className='flex items-center gap-2 mb-1'>
                          <Text
                            fw={500}
                            style={{
                              color: '#2563eb',
                              fontFamily: 'monospace',
                            }}
                          >
                            {batch.lineItem.part.partNumber}
                          </Text>
                          <PartTypeIndicator
                            partType={batch.lineItem.part.partType}
                            partNumber={batch.lineItem.part.partNumber}
                            hasComponents={
                              bomStructures.get(batch.lineItem.part.id)
                                ?.bomComponents?.length > 0
                            }
                            componentCount={
                              bomStructures.get(batch.lineItem.part.id)
                                ?.bomComponents?.length || 0
                            }
                            bomLevels={
                              bomStructures.get(batch.lineItem.part.id)?.summary
                                ?.levels || 0
                            }
                            size='xs'
                            showDetails={true}
                          />
                        </div>
                        <Text fw={500} style={{ color: '#111827' }}>
                          {batch.lineItem.part.partName}
                        </Text>
                        {batch.lineItem.part.description && (
                          <Text size='sm' style={{ color: '#6b7280' }}>
                            {batch.lineItem.part.description}
                          </Text>
                        )}
                        {batch.lineItem.part.drawingNumber && (
                          <Text size='xs' style={{ color: '#9ca3af' }}>
                            Dwg: {batch.lineItem.part.drawingNumber}
                            {batch.lineItem.part.revisionLevel &&
                              ` Rev ${batch.lineItem.part.revisionLevel}`}
                          </Text>
                        )}
                        {/* Show material spec if available */}
                        {batch.lineItem.part.materialSpec && (
                          <Text size='xs' style={{ color: '#7c3aed' }}>
                            Material: {batch.lineItem.part.materialSpec}
                          </Text>
                        )}
                      </div>
                    </Table.Td>

                    <Table.Td>
                      <div>
                        <Text fw={500} style={{ color: '#111827' }}>
                          {batch.lineItem.purchaseOrder.systemOrderId}
                        </Text>
                        <Text size='sm' style={{ color: '#6b7280' }}>
                          {batch.lineItem.purchaseOrder.customer.name}
                        </Text>
                        <Text size='xs' style={{ color: '#9ca3af' }}>
                          PO: {batch.lineItem.purchaseOrder.poNumber}
                        </Text>
                      </div>
                    </Table.Td>

                    <Table.Td>
                      <Text fw={600} style={{ color: '#111827' }}>
                        {batch.quantity}
                      </Text>
                      <Text size='xs' style={{ color: '#9ca3af' }}>
                        of {batch.lineItem.quantity}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Badge
                        color={getBatchPriorityColor(batch.priority)}
                        variant='filled'
                        size='sm'
                      >
                        {batch.priority}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <Badge
                        color={getBatchStatusColor(batch.status)}
                        variant='filled'
                        size='sm'
                      >
                        {batch.status.replace('_', ' ')}
                      </Badge>
                    </Table.Td>

                    <Table.Td>
                      <div style={{ width: '80px' }}>
                        <Progress
                          value={progress}
                          size='sm'
                          color={progress === 100 ? 'green' : 'blue'}
                          style={{ marginBottom: 4 }}
                        />
                        <Text size='xs' style={{ color: '#6b7280' }}>
                          {progress}%
                        </Text>
                      </div>
                    </Table.Td>

                    <Table.Td>
                      {currentStep ? (
                        <div>
                          <Text size='sm' fw={500} style={{ color: '#111827' }}>
                            {currentStep.workstation.name}
                          </Text>
                          <Text size='xs' style={{ color: '#6b7280' }}>
                            Step {currentStep.stepNumber}
                          </Text>
                        </div>
                      ) : (
                        <Text size='sm' style={{ color: '#9ca3af' }}>
                          {batch.status === 'COMPLETED'
                            ? 'Complete'
                            : 'Not started'}
                        </Text>
                      )}
                    </Table.Td>

                    <Table.Td>
                      <div>
                        <Text size='sm' fw={500} style={{ color: '#111827' }}>
                          {batch.routingSteps.length > 0 ? (
                            <>{batch.routingSteps.length} steps</>
                          ) : (
                            'No routing'
                          )}
                        </Text>
                        <Text size='xs' style={{ color: '#6b7280' }}>
                          {batch.routingSteps.length > 0
                            ? `${batch.routingSteps.filter(s => s.status === 'COMPLETED').length} completed`
                            : 'Not configured'}
                        </Text>
                      </div>
                    </Table.Td>

                    <Table.Td>
                      <Group gap='xs'>
                        <Tooltip label='View Details'>
                          <ActionIcon
                            variant='subtle'
                            size='sm'
                            onClick={() => onViewBatch(batch)}
                            style={{ color: '#3b82f6' }}
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                        </Tooltip>

                        <Tooltip label='Edit Batch'>
                          <ActionIcon
                            variant='subtle'
                            size='sm'
                            onClick={() => onEditBatch(batch)}
                            style={{ color: '#10b981' }}
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Tooltip>

                        <Tooltip label='Edit Routing'>
                          <ActionIcon
                            variant='subtle'
                            size='sm'
                            onClick={() => openRoutingEditor(batch)}
                            style={{ color: '#8b5cf6' }}
                          >
                            <IconRoute2 size={16} />
                          </ActionIcon>
                        </Tooltip>

                        {onStartBatch && batch.status === 'QUEUED' && (
                          <Tooltip label='Start Batch'>
                            <ActionIcon
                              variant='subtle'
                              size='sm'
                              onClick={() => onStartBatch(batch)}
                              style={{ color: '#f59e0b' }}
                            >
                              <IconPlayerPlay size={16} />
                            </ActionIcon>
                          </Tooltip>
                        )}

                        {onViewWorkTraveler && (
                          <Tooltip label='Work Traveler'>
                            <ActionIcon
                              variant='subtle'
                              size='sm'
                              onClick={() => onViewWorkTraveler(batch)}
                              style={{ color: '#8b5cf6' }}
                            >
                              <IconClipboardList size={16} />
                            </ActionIcon>
                          </Tooltip>
                        )}

                        <Tooltip label='Delete Batch'>
                          <ActionIcon
                            variant='subtle'
                            size='sm'
                            onClick={() => onDeleteBatch(batch)}
                            style={{ color: '#ef4444' }}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>

                  {/* Expanded row with routing steps and BOM structure */}
                  {isExpanded && (
                    <Table.Tr>
                      <Table.Td
                        colSpan={bulkSelectionMode ? 11 : 10}
                        style={{
                          background: 'rgba(241, 245, 249, 0.8)',
                          padding: '16px',
                        }}
                      >
                        <Stack gap='md'>
                          {/* BOM Structure Section */}
                          {batch.lineItem.part.partType !== 'RAW_MATERIAL' && (
                            <div>
                              <Group
                                align='center'
                                gap='sm'
                                style={{ marginBottom: 8 }}
                              >
                                <IconComponents
                                  size={16}
                                  style={{ color: '#3b82f6' }}
                                />
                                <Text fw={600} style={{ color: '#111827' }}>
                                  BOM Structure
                                </Text>
                              </Group>

                              {(() => {
                                const bomData = bomStructures.get(
                                  batch.lineItem.part.id
                                );

                                if (!bomData) {
                                  return (
                                    <div
                                      style={{
                                        background: 'rgba(249, 250, 251, 0.8)',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #d1d5db',
                                      }}
                                    >
                                      <Text
                                        size='sm'
                                        style={{ color: '#6b7280' }}
                                      >
                                        Loading BOM structure...
                                      </Text>
                                    </div>
                                  );
                                }

                                if (
                                  !bomData.bomComponents ||
                                  bomData.bomComponents.length === 0
                                ) {
                                  return (
                                    <div
                                      style={{
                                        background: 'rgba(254, 243, 199, 0.8)',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        borderLeft: '3px solid #f59e0b',
                                      }}
                                    >
                                      <Text
                                        size='sm'
                                        style={{ color: '#92400e' }}
                                      >
                                        ⚠️ No BOM structure defined for this{' '}
                                        {batch.lineItem.part.partType
                                          .toLowerCase()
                                          .replace('_', ' ')}
                                      </Text>
                                      <Text
                                        size='xs'
                                        style={{
                                          color: '#a16207',
                                          marginTop: 4,
                                        }}
                                      >
                                        Consider defining a BOM to track
                                        material consumption and costs
                                      </Text>
                                    </div>
                                  );
                                }

                                return (
                                  <div
                                    style={{
                                      background: 'rgba(240, 249, 255, 0.8)',
                                      padding: '12px',
                                      borderRadius: '8px',
                                      borderLeft: '3px solid #0ea5e9',
                                    }}
                                  >
                                    <Group
                                      justify='space-between'
                                      style={{ marginBottom: 8 }}
                                    >
                                      <Text
                                        size='sm'
                                        fw={500}
                                        style={{ color: '#0f172a' }}
                                      >
                                        {bomData.summary.totalComponents}{' '}
                                        components across{' '}
                                        {bomData.summary.levels} levels
                                      </Text>
                                      <Text
                                        size='sm'
                                        fw={600}
                                        style={{ color: '#059669' }}
                                      >
                                        $
                                        {bomData.summary.totalMaterialCost.toFixed(
                                          2
                                        )}{' '}
                                        material cost
                                      </Text>
                                    </Group>

                                    <div
                                      style={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                          'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '8px',
                                        marginTop: '8px',
                                      }}
                                    >
                                      {bomData.bomComponents
                                        .slice(0, 6)
                                        .map((component: any) => (
                                          <div
                                            key={component.id}
                                            style={{
                                              background:
                                                'rgba(255, 255, 255, 0.9)',
                                              padding: '8px',
                                              borderRadius: '6px',
                                              border:
                                                '1px solid rgba(203, 213, 225, 0.5)',
                                            }}
                                          >
                                            <Group
                                              justify='space-between'
                                              align='flex-start'
                                              style={{ marginBottom: 4 }}
                                            >
                                              <div style={{ flex: 1 }}>
                                                <Text
                                                  size='xs'
                                                  fw={600}
                                                  style={{
                                                    fontFamily: 'monospace',
                                                    color: '#2563eb',
                                                    marginBottom: 2,
                                                  }}
                                                >
                                                  {
                                                    component.childPart
                                                      .partNumber
                                                  }
                                                </Text>
                                                <PartTypeIndicator
                                                  partType={
                                                    component.childPart.partType
                                                  }
                                                  partNumber={
                                                    component.childPart
                                                      .partNumber
                                                  }
                                                  size='xs'
                                                  showDetails={false}
                                                />
                                              </div>
                                              <Badge
                                                size='xs'
                                                color='gray'
                                                variant='outline'
                                              >
                                                {component.quantity}{' '}
                                                {component.unitOfMeasure ||
                                                  'EA'}
                                              </Badge>
                                            </Group>

                                            <Text
                                              size='xs'
                                              style={{
                                                color: '#374151',
                                                lineHeight: 1.2,
                                              }}
                                            >
                                              {component.childPart.partName}
                                            </Text>

                                            {component.componentCost > 0 && (
                                              <Text
                                                size='xs'
                                                style={{
                                                  color: '#059669',
                                                  marginTop: 2,
                                                }}
                                              >
                                                $
                                                {component.componentCost.toFixed(
                                                  2
                                                )}
                                              </Text>
                                            )}
                                          </div>
                                        ))}

                                      {bomData.bomComponents.length > 6 && (
                                        <div
                                          style={{
                                            background:
                                              'rgba(249, 250, 251, 0.9)',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border:
                                              '1px dashed rgba(156, 163, 175, 0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                          }}
                                        >
                                          <Text
                                            size='xs'
                                            style={{ color: '#6b7280' }}
                                          >
                                            +{bomData.bomComponents.length - 6}{' '}
                                            more components
                                          </Text>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {/* Routing Steps Section */}
                          <div>
                            <Text fw={600} style={{ color: '#111827' }}>
                              Routing Steps ({batch.routingSteps.length})
                            </Text>

                            {batch.routingSteps.length === 0 ? (
                              <Text size='sm' style={{ color: '#6b7280' }}>
                                No routing steps defined
                              </Text>
                            ) : (
                              <div
                                style={{
                                  display: 'grid',
                                  gridTemplateColumns:
                                    'repeat(auto-fit, minmax(200px, 1fr))',
                                  gap: '12px',
                                }}
                              >
                                {[...batch.routingSteps]
                                  .sort((a, b) => a.stepNumber - b.stepNumber)
                                  .map(step => {
                                    return (
                                      <div
                                        key={step.id}
                                        style={{
                                          background:
                                            'rgba(255, 255, 255, 0.9)',
                                          padding: '12px',
                                          borderRadius: '8px',
                                          borderWidth:
                                            step.id === currentStep?.id
                                              ? '2px'
                                              : '1px',
                                          borderStyle: 'solid',
                                          borderColor:
                                            step.id === currentStep?.id
                                              ? '#3b82f6'
                                              : 'rgba(203, 213, 225, 0.5)',
                                        }}
                                      >
                                        <Group
                                          justify='space-between'
                                          align='center'
                                          style={{ marginBottom: 6 }}
                                        >
                                          <Text
                                            fw={600}
                                            size='sm'
                                            style={{ color: '#111827' }}
                                          >
                                            Step {step.stepNumber}
                                          </Text>
                                          <Badge
                                            size='xs'
                                            color={getStepStatusColor(
                                              step.status
                                            )}
                                          >
                                            {step.status.replace('_', ' ')}
                                          </Badge>
                                        </Group>

                                        <Text
                                          fw={500}
                                          size='sm'
                                          style={{
                                            color: '#374151',
                                            marginBottom: 4,
                                          }}
                                        >
                                          {step.workstation.name}
                                        </Text>

                                        <Text
                                          size='xs'
                                          style={{
                                            color: '#6b7280',
                                            marginBottom: 4,
                                          }}
                                        >
                                          {step.description}
                                        </Text>

                                        {step.estimatedTime && (
                                          <Text
                                            size='xs'
                                            style={{ color: '#9ca3af' }}
                                          >
                                            Est: {step.estimatedTime}min
                                          </Text>
                                        )}
                                      </div>
                                    );
                                  })}
                              </div>
                            )}
                          </div>

                          {batch.notes && (
                            <div>
                              <Text
                                fw={600}
                                size='sm'
                                style={{ color: '#374151', marginBottom: 4 }}
                              >
                                Batch Notes:
                              </Text>
                              <Text size='sm' style={{ color: '#6b7280' }}>
                                {batch.notes}
                              </Text>
                            </div>
                          )}
                        </Stack>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </React.Fragment>
              );
            })}
          </Table.Tbody>
        </Table>
      </div>

      {/* Print Styles for BatchTable */}
      <style>{`
      @media print {
        .batch-table-container {
          background: white !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
        
        .batch-table-container table {
          border-collapse: collapse !important;
          width: 100% !important;
        }
        
        .batch-table-container th,
        .batch-table-container td {
          border: 1px solid black !important;
          padding: 6pt !important;
          color: black !important;
          background: white !important;
        }
        
        .batch-table-container th {
          background: #f0f0f0 !important;
          font-weight: bold !important;
        }
        
        /* Hide action columns in print */
        .batch-table-container th:last-child,
        .batch-table-container td:last-child {
          display: none !important;
        }
        
        /* Hide expand/collapse column */
        .batch-table-container th:nth-child(1),
        .batch-table-container td:nth-child(1) {
          display: none !important;
        }
        
        /* Hide bulk selection column when present */
        .batch-table-container th:first-child,
        .batch-table-container td:first-child {
          display: none !important;
        }
      }
    `}</style>

      {/* Routing Editor Modal */}
      {selectedBatchForRouting && (
        <RoutingEditorModal
          opened={routingModalOpen}
          onClose={closeRoutingEditor}
          batchId={selectedBatchForRouting.id}
          currentSteps={selectedBatchForRouting.routingSteps.map(step => ({
            id: step.id,
            stepNumber: step.stepNumber,
            workstationId: step.workstationId,
            estimatedMinutes: step.estimatedTime || 60,
            description: step.description,
            status: step.status,
          }))}
          onSave={handleRoutingSave}
        />
      )}
    </>
  );
}
