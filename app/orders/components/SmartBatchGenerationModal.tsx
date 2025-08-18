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
  Collapse,
  Divider,
  Title,
  TextInput,
  Textarea
} from "@mantine/core";
import { 
  IconWand, 
  IconCheck, 
  IconTrash, 
  IconInfoCircle,
  IconCalendar,
  IconSettings,
  IconChevronDown,
  IconChevronUp,
  IconCopy,
  IconEdit
} from "@tabler/icons-react";

interface BatchSuggestion {
  lineItemId: string;
  partNumber: string;
  partName: string;
  totalQuantity: number;
  suggestedBatches: Array<{
    batchNumber: number;
    quantity: number;
    priority: 'RUSH' | 'STANDARD';
    estimatedDuration: number;
    routingTemplateId?: string;
    routingTemplateName?: string;
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
  const [showCustomization, setShowCustomization] = useState(false);
  
  // Generation configuration with defaults
  const [config, setConfig] = useState<GenerationConfig>({
    maxBatchSize: 100,
    minBatchSize: 10,
    preferredBatchSize: 50,
    priorityStrategy: 'BALANCED',
    allowSplitting: true,
    rushThreshold: 75, // Rush if order priority is high
    qualityControlLevel: 'STANDARD',
    estimationBuffer: 20 // 20% buffer for estimates
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

        {/* Batch Generation Customization */}
        <Card withBorder>
          <Group justify="space-between" align="center" mb="md">
            <Text fw={600} size="md">Generation Settings</Text>
            <Button
              size="xs"
              variant="subtle"
              leftSection={showCustomization ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
              onClick={() => setShowCustomization(!showCustomization)}
            >
              {showCustomization ? 'Hide' : 'Customize'}
            </Button>
          </Group>
          
          <Collapse in={showCustomization}>
            <Stack gap="md">
              <Divider />
              
              {/* Batch Size Configuration */}
              <div>
                <Title order={6} mb="xs">Batch Size Configuration</Title>
                <Group gap="md">
                  <NumberInput
                    label="Min Batch Size"
                    value={config.minBatchSize}
                    onChange={(value) => setConfig(prev => ({ ...prev, minBatchSize: Number(value) || 1 }))}
                    min={1}
                    max={config.maxBatchSize - 1}
                    w={120}
                    size="sm"
                  />
                  <NumberInput
                    label="Preferred Size"
                    value={config.preferredBatchSize}
                    onChange={(value) => setConfig(prev => ({ ...prev, preferredBatchSize: Number(value) || 10 }))}
                    min={config.minBatchSize}
                    max={config.maxBatchSize}
                    w={120}
                    size="sm"
                  />
                  <NumberInput
                    label="Max Batch Size"
                    value={config.maxBatchSize}
                    onChange={(value) => setConfig(prev => ({ ...prev, maxBatchSize: Number(value) || 100 }))}
                    min={config.minBatchSize + 1}
                    max={1000}
                    w={120}
                    size="sm"
                  />
                </Group>
              </div>

              {/* Strategy Configuration */}
              <Group gap="md">
                <Select
                  label="Priority Strategy"
                  value={config.priorityStrategy}
                  onChange={(value) => setConfig(prev => ({ ...prev, priorityStrategy: value as any }))}
                  data={[
                    { value: 'BALANCED', label: 'Balanced - Equal focus on speed and quality' },
                    { value: 'EFFICIENCY', label: 'Efficiency - Maximize throughput' },
                    { value: 'QUALITY', label: 'Quality - Minimize defects' },
                    { value: 'SPEED', label: 'Speed - Minimize delivery time' }
                  ]}
                  w={300}
                  size="sm"
                />
                
                <Select
                  label="Quality Control"
                  value={config.qualityControlLevel}
                  onChange={(value) => setConfig(prev => ({ ...prev, qualityControlLevel: value as any }))}
                  data={[
                    { value: 'STANDARD', label: 'Standard QC' },
                    { value: 'ENHANCED', label: 'Enhanced QC' },
                    { value: 'STRICT', label: 'Strict QC' }
                  ]}
                  w={200}
                  size="sm"
                />
              </Group>

              {/* Advanced Options */}
              <Group gap="md">
                <div>
                  <Text size="sm" fw={500} mb="xs">Rush Threshold (%)</Text>
                  <Slider
                    value={config.rushThreshold}
                    onChange={(value) => setConfig(prev => ({ ...prev, rushThreshold: value }))}
                    min={0}
                    max={100}
                    step={5}
                    marks={[
                      { value: 25, label: '25%' },
                      { value: 50, label: '50%' },
                      { value: 75, label: '75%' }
                    ]}
                    w={200}
                    size="sm"
                  />
                  <Text size="xs" c="dimmed">Orders above this priority become RUSH batches</Text>
                </div>
                
                <div>
                  <Text size="sm" fw={500} mb="xs">Time Buffer (%)</Text>
                  <Slider
                    value={config.estimationBuffer}
                    onChange={(value) => setConfig(prev => ({ ...prev, estimationBuffer: value }))}
                    min={0}
                    max={50}
                    step={5}
                    marks={[
                      { value: 10, label: '10%' },
                      { value: 20, label: '20%' },
                      { value: 30, label: '30%' }
                    ]}
                    w={200}
                    size="sm"
                  />
                  <Text size="xs" c="dimmed">Safety buffer for completion estimates</Text>
                </div>
              </Group>

              <Switch
                label="Allow Batch Splitting"
                description="Split large quantities into multiple optimized batches"
                checked={config.allowSplitting}
                onChange={(event) => setConfig(prev => ({ ...prev, allowSplitting: event.currentTarget.checked }))}
              />
              
              <Group justify="flex-end" gap="sm" mt="md">
                <Button
                  size="xs"
                  variant="default"
                  onClick={() => setConfig({
                    maxBatchSize: 100,
                    minBatchSize: 10,
                    preferredBatchSize: 50,
                    priorityStrategy: 'BALANCED',
                    allowSplitting: true,
                    rushThreshold: 75,
                    qualityControlLevel: 'STANDARD',
                    estimationBuffer: 20
                  })}
                >
                  Reset to Defaults
                </Button>
                <Button
                  size="xs"
                  variant="filled"
                  onClick={loadSuggestions}
                  disabled={loading}
                >
                  Apply & Regenerate
                </Button>
              </Group>
            </Stack>
          </Collapse>
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
              <Button
                size="xs"
                variant="subtle"
                leftSection={<IconSettings size={14} />}
                onClick={loadSuggestions}
                disabled={loading}
              >
                Regenerate
              </Button>
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
            </Group>

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
                          rightSection={
                            <Tooltip label="Press Enter to apply to all batches">
                              <IconEdit size={14} style={{ color: '#64748b' }} />
                            </Tooltip>
                          }
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
                            <Group gap={4} align="center">
                              <Text size="sm">Quantity</Text>
                              <Tooltip label="Click to edit quantity">
                                <Text size="xs" c="blue" style={{ cursor: 'help' }}>✏️</Text>
                              </Tooltip>
                            </Group>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '120px' }}>
                            <Group gap={4} align="center">
                              <Text size="sm">Priority</Text>
                              <Tooltip label="Click to change priority">
                                <Text size="xs" c="blue" style={{ cursor: 'help' }}>✏️</Text>
                              </Tooltip>
                            </Group>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '120px' }}>
                            <Group gap={4} align="center">
                              <Text size="sm">Duration</Text>
                              <Tooltip label="Click to edit completion time">
                                <Text size="xs" c="blue" style={{ cursor: 'help' }}>✏️</Text>
                              </Tooltip>
                            </Group>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '300px' }}>
                            <Group gap={4} align="center">
                              <Text size="sm">Reasoning</Text>
                              <Tooltip label="Click to edit batch reasoning">
                                <Text size="xs" c="blue" style={{ cursor: 'help' }}>✏️</Text>
                              </Tooltip>
                            </Group>
                          </Table.Th>
                          <Table.Th style={{ minWidth: '100px' }}>Actions</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                    <Table.Tbody>
                      {suggestion.suggestedBatches.map((batch) => (
                        <Table.Tr key={batch.batchNumber}>
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

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose} disabled={creating}>
            Cancel
          </Button>
          
          {suggestions && approvedSuggestions.length > 0 && (
            <Button
              variant="filled"
              leftSection={<IconCheck size={16} />}
              onClick={handleCreateBatches}
              loading={creating}
              disabled={totalApprovedBatches === 0}
            >
              Create {totalApprovedBatches} Batches
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
};
