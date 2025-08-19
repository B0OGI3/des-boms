/**
 * Smart Batch Generation Modal - Option B Implementation
 * 
 * Implements intelligent batch suggestions with user review and approval.
 * Features:
 * - Analyzes order line items for optimal batch sizing
 * - Suggests batch priorities based on order urgency
 * - Shows estimated completion times
 * - Allows user modification before creation
 */

"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Stack,
  Group,
  Text,
  Button,
  Card,
  Badge,
  Table,
  NumberInput,
  Select,
  Alert,
  LoadingOverlay,
  ActionIcon,
  Tooltip,
  Progress,
  Box,
  Slider,
  Switch,
  Divider,
  Title,
  TextInput,
  Textarea,
  Menu
} from "@mantine/core";
import { 
  IconWand, 
  IconCheck, 
  IconTrash, 
  IconInfoCircle,
  IconCalendar,
  IconSettings,
  IconCopy,
  IconRoute,
  IconEye
} from "@tabler/icons-react";
import { RoutingEditorModal } from "../../batches/components/RoutingEditorModal";

type PartType = 'FINISHED' | 'SEMI_FINISHED' | 'RAW_MATERIAL';

interface WorkflowStep {
  id: string;
  stepNumber: number;
  workstationId: string;
  description: string;
  estimatedTime: number; // Changed from estimatedMinutes to match batch system
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED';
  partType?: PartType;
  partNumber?: string;
  materialRequirements?: string[];
}

interface MaterialRequirement {
  partId: string;
  partNumber: string;
  partName: string;
  partType: PartType;
  totalQuantityRequired: number;
  unitOfMeasure?: string;
  standardCost?: number;
  totalCost: number;
}

interface BatchSuggestion {
  lineItemId: string;
  partNumber: string;
  partName: string;
  partType?: PartType;
  totalQuantity: number;
  materialRequirements?: MaterialRequirement[];
  suggestedBatches: Array<{
    batchNumber: number;
    quantity: number;
    priority: 'RUSH' | 'STANDARD';
    estimatedDuration: number;
    workflowSteps: WorkflowStep[];
    reasoning: string;
  }>;
}

interface GenerationConfig {
  maxBatchSize: number;
  minBatchSize: number;
  preferredBatchSize: number;
  priorityStrategy: 'BALANCED' | 'EFFICIENCY' | 'QUALITY' | 'SPEED';
  allowSplitting: boolean;
  rushThreshold: number; // percentage of order priority that triggers RUSH
  qualityControlLevel: 'STANDARD' | 'ENHANCED' | 'STRICT';
  estimationBuffer: number; // percentage buffer for time estimates
  defaultRoutingStrategy?: string;
}

interface BatchGenerationData {
  orderId: string;
  orderNumber: string;
  customerName: string;
  orderPriority: string;
  suggestions: BatchSuggestion[];
  summary: {
    totalLineItems: number;
    totalBatches: number;
    estimatedCompletionDays: number;
    canAutoGenerate: boolean;
  };
}

interface SmartBatchGenerationModalProps {
  opened: boolean;
  onClose: () => void;
  order: any;
  onBatchesCreated: () => void;
}

export const SmartBatchGenerationModal: React.FC<SmartBatchGenerationModalProps> = ({
  opened,
  onClose,
  order,
  onBatchesCreated
}) => {
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [suggestions, setSuggestions] = useState<BatchGenerationData | null>(null);
  const [approvedSuggestions, setApprovedSuggestions] = useState<BatchSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [routingEditorModal, setRoutingEditorModal] = useState<{
    open: boolean;
    batchId?: string;
    lineItemId?: string;
    batchNumber?: number;
  }>({ open: false });
  const [showWorkflowSteps, setShowWorkflowSteps] = useState<{
    [key: string]: boolean;
  }>({});
  
  // Generation configuration with defaults
  const [config, setConfig] = useState<GenerationConfig>({
    maxBatchSize: 100,
    minBatchSize: 10,
    preferredBatchSize: 50,
    priorityStrategy: 'BALANCED',
    allowSplitting: true,
    rushThreshold: 75, // Rush if order priority is high
    qualityControlLevel: 'STANDARD',
    estimationBuffer: 20, // 20% buffer for estimates
    defaultRoutingStrategy: 'AUTO'
  });

  // Load suggestions when modal opens
  useEffect(() => {
    if (opened && order) {
      loadSuggestions();
    }
  }, [opened, order]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/orders/${order.id}/generate-batches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: config
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate batch suggestions');
      }

      const result = await response.json();
      if (result.success) {
        setSuggestions(result.data);
        setApprovedSuggestions(result.data.suggestions); // Start with all suggestions approved
      } else {
        throw new Error(result.error || 'Failed to load suggestions');
      }
    } catch (err) {
      console.error('Error loading suggestions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBatches = async () => {
    if (!suggestions || approvedSuggestions.length === 0) return;

    try {
      setCreating(true);
      setError(null);

      const response = await fetch(`/api/orders/${order.id}/generate-batches`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approvedSuggestions
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create batches');
      }

      const result = await response.json();
      if (result.success) {
        onBatchesCreated();
        onClose();
      } else {
        throw new Error(result.error || 'Failed to create batches');
      }
    } catch (err) {
      console.error('Error creating batches:', err);
      setError(err instanceof Error ? err.message : 'Failed to create batches');
    } finally {
      setCreating(false);
    }
  };

  const updateBatchQuantity = (lineItemId: string, batchNumber: number, newQuantity: number) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const updatedBatches = suggestion.suggestedBatches.map(batch => 
        batch.batchNumber === batchNumber 
          ? { ...batch, quantity: newQuantity }
          : batch
      );
      
      return { ...suggestion, suggestedBatches: updatedBatches };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const updateBatchPriority = (lineItemId: string, batchNumber: number, newPriority: 'RUSH' | 'STANDARD') => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const updatedBatches = suggestion.suggestedBatches.map(batch => 
        batch.batchNumber === batchNumber 
          ? { ...batch, priority: newPriority }
          : batch
      );
      
      return { ...suggestion, suggestedBatches: updatedBatches };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const updateBatchDuration = (lineItemId: string, batchNumber: number, newDuration: number) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const updatedBatches = suggestion.suggestedBatches.map(batch => 
        batch.batchNumber === batchNumber 
          ? { ...batch, estimatedDuration: newDuration }
          : batch
      );
      
      return { ...suggestion, suggestedBatches: updatedBatches };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const updateBatchWorkflowSteps = (lineItemId: string, batchNumber: number, steps: WorkflowStep[]) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const updatedBatches = suggestion.suggestedBatches.map(batch => 
        batch.batchNumber === batchNumber 
          ? { 
              ...batch, 
              workflowSteps: steps
            }
          : batch
      );
      
      return { ...suggestion, suggestedBatches: updatedBatches };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const openRoutingEditor = (lineItemId: string, batchNumber: number) => {
    setRoutingEditorModal({
      open: true,
      lineItemId,
      batchNumber,
      batchId: `temp-${lineItemId}-${batchNumber}` // Temporary ID for preview
    });
  };

  const toggleWorkflowSteps = (lineItemId: string, batchNumber: number) => {
    const key = `${lineItemId}-${batchNumber}`;
    setShowWorkflowSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const updateBatchReasoning = (lineItemId: string, batchNumber: number, newReasoning: string) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const updatedBatches = suggestion.suggestedBatches.map(batch => 
        batch.batchNumber === batchNumber 
          ? { ...batch, reasoning: newReasoning }
          : batch
      );
      
      return { ...suggestion, suggestedBatches: updatedBatches };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const removeBatch = (lineItemId: string, batchNumber: number) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const filteredBatches = suggestion.suggestedBatches.filter(batch => 
        batch.batchNumber !== batchNumber
      );
      
      return { ...suggestion, suggestedBatches: filteredBatches };
    };

    const filterEmptySuggestions = (suggestion: BatchSuggestion) => 
      suggestion.suggestedBatches.length > 0;

    setApprovedSuggestions(prev => 
      prev.map(updateSuggestion).filter(filterEmptySuggestions)
    );
  };

  const duplicateBatch = (lineItemId: string, batchNumber: number) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const batchToDuplicate = suggestion.suggestedBatches.find(b => b.batchNumber === batchNumber);
      if (!batchToDuplicate) return suggestion;
      
      const newBatchNumber = Math.max(...suggestion.suggestedBatches.map(b => b.batchNumber)) + 1;
      const duplicatedBatch = {
        ...batchToDuplicate,
        batchNumber: newBatchNumber,
        reasoning: `${batchToDuplicate.reasoning} (copy)`
      };
      
      return {
        ...suggestion,
        suggestedBatches: [...suggestion.suggestedBatches, duplicatedBatch]
      };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const applyToAllBatches = (lineItemId: string, field: 'priority' | 'reasoning', value: any) => {
    const updateSuggestion = (suggestion: BatchSuggestion) => {
      if (suggestion.lineItemId !== lineItemId) return suggestion;
      
      const updatedBatches = suggestion.suggestedBatches.map(batch => ({
        ...batch,
        [field]: value
      }));
      
      return { ...suggestion, suggestedBatches: updatedBatches };
    };

    setApprovedSuggestions(prev => prev.map(updateSuggestion));
  };

  const totalApprovedBatches = approvedSuggestions.reduce(
    (sum, suggestion) => sum + suggestion.suggestedBatches.length, 
    0
  );

  if (!order) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconWand size={20} color="#7c3aed" />
          <Text fw={600} size="lg">Smart Batch Generation</Text>
        </Group>
      }
      size="95%"
      styles={{
        content: { position: 'relative' },
        body: { maxHeight: '85vh', overflow: 'auto' }
      }}
    >
      <LoadingOverlay visible={loading} />
      
      <Stack gap="lg">
        {/* Order Summary */}
        <Card withBorder>
          <Group justify="space-between" align="center">
            <div>
              <Text fw={600} size="md">{suggestions?.orderNumber || order.orderId}</Text>
              <Text size="sm" c="dimmed">{suggestions?.customerName}</Text>
            </div>
            <Badge 
              color={suggestions?.orderPriority === 'RUSH' ? 'red' : 'blue'} 
              variant="filled"
            >
              {suggestions?.orderPriority} Priority
            </Badge>
          </Group>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert color="red" icon={<IconInfoCircle size={16} />}>
            {error}
          </Alert>
        )}

        {/* Suggestions Summary */}
        {suggestions && (
          <Card withBorder>
            <Group justify="space-between" align="center" mb="md">
              <Text fw={600} size="md">Batch Generation Summary</Text>
              <Group gap="xs">
                <Menu shadow="md" width={350}>
                  <Menu.Target>
                    <Button
                      size="xs"
                      variant="subtle"
                      leftSection={<IconSettings size={14} />}
                    >
                      Settings
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Generation Settings</Menu.Label>
                    
                    <Menu.Item>
                      <Stack gap="sm" p="sm">
                        <div>
                          <Text size="sm" fw={500} mb="xs">Batch Size Configuration</Text>
                          <Group gap="sm">
                            <NumberInput
                              label="Min"
                              value={config.minBatchSize}
                              onChange={(value) => setConfig(prev => ({ ...prev, minBatchSize: Number(value) || 1 }))}
                              min={1}
                              max={config.maxBatchSize - 1}
                              w={70}
                              size="xs"
                            />
                            <NumberInput
                              label="Preferred"
                              value={config.preferredBatchSize}
                              onChange={(value) => setConfig(prev => ({ ...prev, preferredBatchSize: Number(value) || 10 }))}
                              min={config.minBatchSize}
                              max={config.maxBatchSize}
                              w={80}
                              size="xs"
                            />
                            <NumberInput
                              label="Max"
                              value={config.maxBatchSize}
                              onChange={(value) => setConfig(prev => ({ ...prev, maxBatchSize: Number(value) || 100 }))}
                              min={config.minBatchSize + 1}
                              max={1000}
                              w={70}
                              size="xs"
                            />
                          </Group>
                        </div>
                        
                        <div>
                          <Text size="sm" fw={500} mb="xs">Priority Strategy</Text>
                          <Select
                            value={config.priorityStrategy}
                            onChange={(value) => setConfig(prev => ({ 
                              ...prev, 
                              priorityStrategy: value as 'BALANCED' | 'EFFICIENCY' | 'QUALITY' | 'SPEED' 
                            }))}
                            data={[
                              { value: 'BALANCED', label: 'Balanced' },
                              { value: 'EFFICIENCY', label: 'Efficiency Focus' },
                              { value: 'QUALITY', label: 'Quality Focus' },
                              { value: 'SPEED', label: 'Speed Focus' }
                            ]}
                            size="xs"
                          />
                        </div>
                        
                        <div>
                          <Text size="sm" fw={500} mb="xs">Options</Text>
                          <Stack gap="xs">
                            <Switch
                              label="Allow batch splitting"
                              checked={config.allowSplitting}
                              onChange={(event) => setConfig(prev => ({ 
                                ...prev, 
                                allowSplitting: event.currentTarget.checked 
                              }))}
                              size="sm"
                            />
                            <Group gap="sm" align="center">
                              <Text size="xs">Rush Threshold:</Text>
                              <Slider
                                value={config.rushThreshold}
                                onChange={(value) => setConfig(prev => ({ ...prev, rushThreshold: value }))}
                                min={0}
                                max={100}
                                w={100}
                                size="sm"
                              />
                              <Text size="xs" c="dimmed">{config.rushThreshold}%</Text>
                            </Group>
                          </Stack>
                        </div>
                      </Stack>
                    </Menu.Item>
                    
                    <Menu.Divider />
                    
                    <Menu.Item 
                      leftSection={<IconWand size={14} />}
                      onClick={loadSuggestions}
                      disabled={loading}
                    >
                      Regenerate with Current Settings
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                
                <Button
                  size="xs"
                  variant="filled"
                  leftSection={<IconWand size={14} />}
                  onClick={loadSuggestions}
                  disabled={loading}
                >
                  Regenerate
                </Button>
              </Group>
            </Group>
            
            <Group gap="xl">
              <div>
                <Text size="sm" c="dimmed">Line Items</Text>
                <Text fw={600} size="lg">{suggestions.summary.totalLineItems}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Suggested Batches</Text>
                <Text fw={600} size="lg">{suggestions.summary.totalBatches}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Est. Completion</Text>
                <Text fw={600} size="lg">{suggestions.summary.estimatedCompletionDays} days</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Workflow Steps</Text>
                <Text fw={600} size="lg">
                  {approvedSuggestions.flatMap(s => 
                    s.suggestedBatches.flatMap(b => b.workflowSteps || [])
                  ).length} total
                </Text>
              </div>
            </Group>

            {/* Workflow Steps Summary */}
            {approvedSuggestions.length > 0 && (
              <Box mt="md">
                <Text size="sm" c="dimmed" mb="xs">Workflow Overview</Text>
                <Group gap="xs">
                  {approvedSuggestions.map(s => 
                    s.suggestedBatches.map(batch => {
                      const workflowSteps = batch.workflowSteps || [];
                      const totalMinutes = workflowSteps.reduce((sum, step) => sum + step.estimatedTime, 0);
                      return (
                        <Badge key={`${s.lineItemId}-${batch.batchNumber}`} variant="light" color="blue" size="sm">
                          Batch {batch.batchNumber}: {workflowSteps.length} steps ({totalMinutes}m)
                        </Badge>
                      );
                    })
                  ).flat()}
                </Group>
              </Box>
            )}

            {/* Progress indication */}
            <Box mt="md">
              <Group justify="space-between" align="center" mb="xs">
                <Text size="sm" c="dimmed">Approved Batches</Text>
                <Text size="sm" fw={500}>{totalApprovedBatches} of {suggestions.summary.totalBatches}</Text>
              </Group>
              <Progress 
                value={(totalApprovedBatches / suggestions.summary.totalBatches) * 100} 
                color="blue"
                size="sm"
              />
            </Box>
          </Card>
        )}

        {/* Batch Suggestions */}
        {suggestions && suggestions.suggestions.length > 0 && (
          <Card withBorder>
            <Group justify="space-between" align="center" mb="md">
              <Text fw={600} size="md">Batch Suggestions</Text>
              <Badge
                variant="light"
                color="blue"
                size="lg"
                leftSection={<IconInfoCircle size={14} />}
              >
                All fields are editable - click to customize!
              </Badge>
            </Group>
            
            <Stack gap="md">
              {approvedSuggestions.map((suggestion) => (
                <Card key={suggestion.lineItemId} withBorder p="md">
                  <Group justify="space-between" align="center" mb="sm">
                    <div>
                      <Text fw={600} size="sm">{suggestion.partNumber}</Text>
                      <Text size="xs" c="dimmed">{suggestion.partName}</Text>
                    </div>
                    <Badge variant="outline">
                      {suggestion.totalQuantity} units
                    </Badge>
                  </Group>

                  {/* Bulk Editing Tools */}
                  <Card withBorder p="sm" mb="md" style={{ backgroundColor: '#f8fafc' }}>
                    <Group gap="md" align="center">
                      <Text size="sm" fw={500} c="dimmed" style={{ minWidth: '80px' }}>
                        Bulk Actions:
                      </Text>
                      <Group gap="sm" style={{ flex: 1 }}>
                        <Select
                          placeholder="Apply priority to all..."
                          size="sm"
                          w={180}
                          data={[
                            { value: 'RUSH', label: '🚀 Set All RUSH' },
                            { value: 'STANDARD', label: '📋 Set All STANDARD' }
                          ]}
                          onChange={(value) => {
                            if (value) applyToAllBatches(suggestion.lineItemId, 'priority', value);
                          }}
                          clearable
                        />
                        <TextInput
                          placeholder="Type reasoning and press Enter..."
                          size="sm"
                          style={{ flex: 1, minWidth: '250px' }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              const value = event.currentTarget.value;
                              if (value.trim()) {
                                applyToAllBatches(suggestion.lineItemId, 'reasoning', value);
                                event.currentTarget.value = '';
                              }
                            }
                          }}
                        />
                      </Group>
                    </Group>
                  </Card>

                  <Box style={{ overflowX: 'auto' }}>
                    <Table striped highlightOnHover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th style={{ minWidth: '60px' }}>Batch</Table.Th>
                          <Table.Th style={{ minWidth: '100px' }}>
                            <Text size="sm">Quantity</Text>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '120px' }}>
                            <Text size="sm">Priority</Text>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '160px' }}>
                            <Text size="sm">Workflow Steps</Text>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '120px' }}>
                            <Text size="sm">Duration</Text>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '300px' }}>
                            <Text size="sm">Reasoning</Text>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '100px' }}>Actions</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                    <Table.Tbody>
                      {suggestion.suggestedBatches.map((batch) => (
                        <React.Fragment key={batch.batchNumber}>
                        <Table.Tr>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <Text size="sm" fw={500}>#{batch.batchNumber}</Text>
                          </Table.Td>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <NumberInput
                              size="xs"
                              value={batch.quantity}
                              onChange={(value) => updateBatchQuantity(
                                suggestion.lineItemId, 
                                batch.batchNumber, 
                                Number(value) || 0
                              )}
                              min={1}
                              max={suggestion.totalQuantity}
                              w={80}
                            />
                          </Table.Td>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <Select
                              size="xs"
                              value={batch.priority}
                              onChange={(value) => updateBatchPriority(
                                suggestion.lineItemId, 
                                batch.batchNumber, 
                                value as 'RUSH' | 'STANDARD'
                              )}
                              data={[
                                { value: 'RUSH', label: 'Rush' },
                                { value: 'STANDARD', label: 'Standard' }
                              ]}
                              w={100}
                            />
                          </Table.Td>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <Stack gap="xs">
                              <Group gap="xs" align="center">
                                <Text size="xs" fw={500}>
                                  {(batch.workflowSteps || []).length} step{(batch.workflowSteps || []).length !== 1 ? 's' : ''}
                                </Text>
                                <Group gap="xxs">
                                  <Tooltip label="View workflow steps">
                                    <ActionIcon
                                      size="xs"
                                      variant="light"
                                      color="green"
                                      onClick={() => toggleWorkflowSteps(
                                        suggestion.lineItemId,
                                        batch.batchNumber
                                      )}
                                    >
                                      <IconEye size={10} />
                                    </ActionIcon>
                                  </Tooltip>
                                  <Tooltip label="Edit workflow steps">
                                    <ActionIcon
                                      size="xs"
                                      variant="light"
                                      color="blue"
                                      onClick={() => openRoutingEditor(
                                        suggestion.lineItemId,
                                        batch.batchNumber
                                      )}
                                    >
                                      <IconRoute size={10} />
                                    </ActionIcon>
                                  </Tooltip>
                                </Group>
                              </Group>
                            </Stack>
                          </Table.Td>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <Group gap="xs" align="center">
                              <NumberInput
                                size="xs"
                                value={batch.estimatedDuration}
                                onChange={(value) => updateBatchDuration(
                                  suggestion.lineItemId, 
                                  batch.batchNumber, 
                                  Number(value) || 1
                                )}
                                min={1}
                                max={365}
                                w={60}
                                suffix="d"
                              />
                              <Tooltip label="Days to complete">
                                <IconCalendar size={12} style={{ color: '#64748b' }} />
                              </Tooltip>
                            </Group>
                          </Table.Td>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <Stack gap="xs">
                              <Textarea
                                size="xs"
                                value={batch.reasoning}
                                onChange={(event) => updateBatchReasoning(
                                  suggestion.lineItemId, 
                                  batch.batchNumber, 
                                  event.currentTarget.value
                                )}
                                placeholder="Enter reasoning for this batch..."
                                autosize
                                minRows={2}
                                maxRows={4}
                                styles={{
                                  input: {
                                    fontSize: '12px',
                                    padding: '6px 8px',
                                    lineHeight: '1.4'
                                  }
                                }}
                              />
                              <Select
                                size="xs"
                                placeholder="Quick presets..."
                                w="100%"
                                data={[
                                  { value: 'quality', label: '🎯 Quality Focus' },
                                  { value: 'efficiency', label: '🏭 Efficiency' },
                                  { value: 'rush', label: '🚀 Rush Order' },
                                  { value: 'standard', label: '📋 Standard Process' },
                                  { value: 'pilot', label: '🧪 Pilot Batch' },
                                  { value: 'final', label: '✅ Final Production' }
                                ]}
                                onChange={(value) => {
                                  const presets = {
                                    quality: 'Small batch for enhanced quality control and defect reduction',
                                    efficiency: 'Large batch optimized for maximum manufacturing efficiency',
                                    rush: 'Priority batch for urgent delivery requirements',
                                    standard: 'Standard batch size following normal production procedures',
                                    pilot: 'Initial pilot batch for process validation and testing',
                                    final: 'Final production batch to complete order requirements'
                                  };
                                  if (value && presets[value as keyof typeof presets]) {
                                    updateBatchReasoning(suggestion.lineItemId, batch.batchNumber, presets[value as keyof typeof presets]);
                                  }
                                }}
                                styles={{
                                  input: { fontSize: '11px', padding: '4px 8px' }
                                }}
                                clearable
                              />
                            </Stack>
                          </Table.Td>
                          <Table.Td style={{ verticalAlign: 'top', padding: '12px 8px' }}>
                            <Group gap="xs">
                              <Tooltip label="Duplicate this batch">
                                <ActionIcon 
                                  size="sm" 
                                  variant="subtle" 
                                  color="blue"
                                  onClick={() => duplicateBatch(suggestion.lineItemId, batch.batchNumber)}
                                >
                                  <IconCopy size={14} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Remove batch">
                                <ActionIcon 
                                  size="sm" 
                                  variant="subtle" 
                                  color="red"
                                  onClick={() => removeBatch(suggestion.lineItemId, batch.batchNumber)}
                                >
                                  <IconTrash size={14} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                        
                        {/* Workflow Steps Display */}
                        {showWorkflowSteps[`${suggestion.lineItemId}-${batch.batchNumber}`] && (batch.workflowSteps || []).length > 0 && (
                          <Table.Tr>
                            <Table.Td colSpan={7}>
                              <Box p="md" style={{ 
                                background: 'rgba(59, 130, 246, 0.05)', 
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '8px'
                              }}>
                                <Group justify="space-between" mb="xs">
                                  <Text size="sm" fw={600} c="blue">Workflow Steps</Text>
                                  <Text size="xs" c="dimmed">
                                    {(batch.workflowSteps || []).length} step{(batch.workflowSteps || []).length !== 1 ? 's' : ''}
                                  </Text>
                                </Group>
                                <Stack gap="xs">
                                  {(batch.workflowSteps || []).map((step) => (
                                      <Group key={step.id} gap="sm" p="xs" style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                      }}>
                                        <Badge size="sm" variant="light" color="blue">
                                          {step.stepNumber}
                                        </Badge>
                                        <Text size="sm" flex={1}>
                                          {step.description}
                                        </Text>
                                        <Text size="xs" c="dimmed">
                                          ~{step.estimatedTime}min
                                        </Text>
                                      </Group>
                                    ))}
                                  {(batch.workflowSteps || []).length === 0 && (
                                    <Text size="sm" c="dimmed" ta="center">
                                      No workflow steps defined. Click edit to add steps.
                                    </Text>
                                  )}
                                </Stack>
                              </Box>
                            </Table.Td>
                          </Table.Tr>
                        )}
                        </React.Fragment>
                      ))}
                    </Table.Tbody>
                  </Table>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Card>
        )}

        {/* No suggestions message */}
        {suggestions && suggestions.suggestions.length === 0 && (
          <Alert color="blue" icon={<IconInfoCircle size={16} />}>
            All line items in this order already have complete batch assignments.
          </Alert>
        )}

        {/* Summary and Action Section */}
        {suggestions && approvedSuggestions.length > 0 && (
          <Card p="lg" style={{
            background: "rgba(30, 41, 59, 0.8)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(59, 130, 246, 0.3)",
            borderRadius: "12px"
          }}>
            <Stack gap="md">
              {/* Summary Header */}
              <Group justify="space-between" align="center">
                <div>
                  <Title order={4} style={{ color: "#f1f5f9", marginBottom: 4 }}>
                    Ready to Create Batches
                  </Title>
                  <Text size="sm" c="dimmed">
                    Review your batch configuration below
                  </Text>
                </div>
                <Badge size="lg" variant="light" color="blue" style={{ fontSize: '14px', padding: '8px 12px' }}>
                  {totalApprovedBatches} Batches Total
                </Badge>
              </Group>

              <Divider color="rgba(59, 130, 246, 0.2)" />

              {/* Quick Summary Stats */}
              <Group gap="xl" justify="center">
                <div style={{ textAlign: 'center' }}>
                  <Text size="xl" fw={700} c="blue">
                    {approvedSuggestions.length}
                  </Text>
                  <Text size="sm" c="dimmed">Part Numbers</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text size="xl" fw={700} c="green">
                    {totalApprovedBatches}
                  </Text>
                  <Text size="sm" c="dimmed">Total Batches</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text size="xl" fw={700} c="orange">
                    {approvedSuggestions.reduce((sum, s) => 
                      sum + s.suggestedBatches.reduce((bSum, b) => bSum + b.quantity, 0), 0
                    )}
                  </Text>
                  <Text size="sm" c="dimmed">Total Units</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text size="xl" fw={700} c="purple">
                    {Math.round(approvedSuggestions.reduce((sum, s) => 
                      sum + s.suggestedBatches.reduce((bSum, b) => bSum + b.estimatedDuration, 0), 0
                    ))}d
                  </Text>
                  <Text size="sm" c="dimmed">Est. Duration</Text>
                </div>
              </Group>

              <Divider color="rgba(59, 130, 246, 0.2)" />

              {/* Action Buttons */}
              <Group justify="space-between" align="center">
                <Button 
                  variant="subtle" 
                  color="gray"
                  onClick={onClose} 
                  disabled={creating}
                  size="md"
                >
                  Cancel & Return
                </Button>
                
                <Button
                  variant="filled"
                  color="blue"
                  size="lg"
                  leftSection={<IconCheck size={18} />}
                  onClick={handleCreateBatches}
                  loading={creating}
                  disabled={totalApprovedBatches === 0}
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    fontWeight: 600,
                    fontSize: '16px',
                    padding: '12px 24px'
                  }}
                >
                  {creating ? 'Creating Batches...' : `Create ${totalApprovedBatches} Batches`}
                </Button>
              </Group>

              {/* Quick Help Text */}
              <Text size="xs" c="dimmed" ta="center" mt="xs">
                💡 All fields above are editable - click any value to customize before creating
              </Text>
            </Stack>
          </Card>
        )}

        {/* Simple action buttons for when no batches are ready */}
        {(!suggestions || approvedSuggestions.length === 0) && (
          <Group justify="flex-end" gap="sm">
            <Button variant="default" onClick={onClose} disabled={creating}>
              Close
            </Button>
          </Group>
        )}
      </Stack>

      {/* Routing Editor Modal */}
      {routingEditorModal.open && (
        <RoutingEditorModal
          opened={routingEditorModal.open}
          onClose={() => setRoutingEditorModal({ open: false })}
          batchId={routingEditorModal.batchId || ''}
          currentSteps={(() => {
            // Get current workflow steps for this batch
            const currentBatch = approvedSuggestions
              .find(s => s.lineItemId === routingEditorModal.lineItemId)
              ?.suggestedBatches.find(b => b.batchNumber === routingEditorModal.batchNumber);
            
            return (currentBatch?.workflowSteps || []).map(step => ({
              stepNumber: step.stepNumber,
              workstationId: step.workstationId || '', // Default empty if not set
              estimatedMinutes: step.estimatedTime || 60, // Convert back to estimatedMinutes for RoutingEditorModal
              description: step.description,
              status: step.status || 'PENDING'
            }));
          })()}
          onSave={(steps) => {
            // Convert back to our WorkflowStep format and save
            const workflowSteps: WorkflowStep[] = steps.map((step, index) => ({
              id: `step-${Date.now()}-${index}`,
              stepNumber: step.stepNumber,
              workstationId: step.workstationId || '',
              description: step.description,
              estimatedTime: step.estimatedMinutes || 60, // Convert back from estimatedMinutes
              status: step.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED' || 'PENDING'
            }));
            
            if (routingEditorModal.lineItemId && routingEditorModal.batchNumber) {
              updateBatchWorkflowSteps(
                routingEditorModal.lineItemId, 
                routingEditorModal.batchNumber, 
                workflowSteps
              );
            }
            
            setRoutingEditorModal({ open: false });
          }}
        />
      )}
    </Modal>
  );
};
