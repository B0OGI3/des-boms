/**
 * New Batch Modal - Create Manufacturing Batches
 * 
 * Implements DES-BOMS specification requirements:
 * 3.1 Batch Definition - System-generated batch IDs with line item linking
 * 3.2 Routing Steps - Sequential workstation routing configuration
 * 
 * Features:
 * - Line item selection from active orders
 * - System-generated batch ID (DES-YYYY-MMDD-###)
 * - Routing template selection and customization
 * - Priority setting (Rush / Standard / Hold)
 * - Estimated completion date calculation
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Modal, 
  NumberInput, 
  Select, 
  Button, 
  Stack, 
  Group, 
  Text, 
  Divider,
  Badge,
  Textarea
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { NewBatchInput } from '../types';
import { generateBatchId } from '../utils/batchHelpers';
import { ModalContentSkeleton } from './LoadingSkeletons';
import { ErrorWithRetry, ValidationError } from './ErrorComponents';

interface NewBatchModalProps {
  opened: boolean;
  onClose: () => void;
  onBatchCreated: () => void;
}

interface LineItem {
  id: string;
  partNumber: string;
  partName: string;
  quantity: number;
  availableQuantity: number;
  batchedQuantity: number;
  purchaseOrder: {
    id: string;
    systemOrderId: string;
    poNumber: string;
    customer: {
      name: string;
    };
  };
}

interface RoutingTemplate {
  id: string;
  name: string;
  description: string;
  steps: {
    stepNumber: number;
    workstationId: string;
    workstationName: string;
    description: string;
    estimatedTime: number;
    required?: boolean;
    notes?: string;
  }[];
}

export function NewBatchModal({ opened, onClose, onBatchCreated }: Readonly<NewBatchModalProps>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [routingTemplates, setRoutingTemplates] = useState<RoutingTemplate[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [quantityError, setQuantityError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<NewBatchInput>({
    lineItemId: '',
    quantity: 1,
    priority: 'STANDARD',
    notes: '',
    routingTemplateId: '',
    estimatedCompletion: '',
  });

  // Generate new batch ID only when modal opens
  const [newBatchId, setNewBatchId] = useState<string>('');

  const loadFormData = useCallback(async () => {
    try {
      setLoadingData(true);
      setError(null);
      
      // Load available line items from active orders
      const lineItemsResponse = await fetch('/api/orders/line-items?status=active');
      if (lineItemsResponse.ok) {
        const lineItemsData = await lineItemsResponse.json();
        setLineItems(lineItemsData.data || []);
      } else {
        throw new Error('Failed to load line items');
      }

      // Load routing templates
      try {
        const templatesResponse = await fetch('/api/routing-templates');
        if (templatesResponse.ok) {
          const templatesData = await templatesResponse.json();
          setRoutingTemplates(templatesData.data || []);
        } else {
          const errorText = await templatesResponse.text();
          console.error('Routing templates API error:', errorText);
          throw new Error(`Failed to load routing templates: ${templatesResponse.status} ${templatesResponse.statusText}`);
        }
      } catch (templateError) {
        console.error('Routing templates fetch error:', templateError);
        // Set default templates as fallback
        setRoutingTemplates([
          {
            id: 'fallback-1',
            name: 'Standard Workflow',
            description: 'Default routing template',
            steps: [
              {
                stepNumber: 1,
                workstationId: 'default-ws',
                workstationName: 'Default Workstation',
                description: 'Manufacturing step',
                estimatedTime: 60,
                required: true,
              },
            ],
          },
        ]);
        console.log('Using fallback routing templates due to API error');
      }

      setRetryCount(0); // Reset retry count on success

    } catch (err) {
      console.error('Error loading form data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load form data');
      setRetryCount(prev => prev + 1);
      
      // Auto-retry with exponential backoff (max 3 attempts)
      if (retryCount < 2) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        setTimeout(() => {
          loadFormData();
        }, delay);
      }
    } finally {
      setLoadingData(false);
    }
  }, [retryCount]);

  // Load line items and routing templates
  useEffect(() => {
    if (opened) {
      // Generate a new batch ID when modal opens
      setNewBatchId(generateBatchId());
      loadFormData();
    }
  }, [opened, loadFormData]);

  // Validate quantity against available quantity
  const validateQuantity = (quantity: number, lineItemId: string) => {
    const selectedLineItem = lineItems.find(item => item.id === lineItemId);
    if (!selectedLineItem) {
      setQuantityError('Please select a line item first');
      return false;
    }
    
    if (quantity <= 0) {
      setQuantityError('Quantity must be greater than 0');
      return false;
    }
    
    if (quantity > selectedLineItem.availableQuantity) {
      setQuantityError(`Only ${selectedLineItem.availableQuantity} units available (${selectedLineItem.batchedQuantity} already batched)`);
      return false;
    }
    
    setQuantityError(null);
    return true;
  };

  // Handle quantity change with validation
  const handleQuantityChange = (value: number | string) => {
    const numValue = Number(value) || 0;
    setFormData(prev => ({ ...prev, quantity: numValue }));
    validateQuantity(numValue, formData.lineItemId);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (!formData.lineItemId) {
        setError('Please select a line item');
        return;
      }

      if (!formData.routingTemplateId) {
        setError('Please select a routing template');
        return;
      }

      if (formData.quantity <= 0) {
        setError('Quantity must be greater than 0');
        return;
      }

      // Create the batch
      const response = await fetch('/api/batches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          batchId: newBatchId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create batch');
      }

      // Success - close modal and refresh data
      onBatchCreated();
      onClose();
      resetForm();

    } catch (err) {
      console.error('Error creating batch:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      lineItemId: '',
      quantity: 1,
      priority: 'STANDARD',
      notes: '',
      routingTemplateId: '',
      estimatedCompletion: '',
    });
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const selectedLineItem = lineItems.find(item => item.id === formData.lineItemId);
  const selectedTemplate = routingTemplates.find(template => template.id === formData.routingTemplateId);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="md">
          <Text size="lg" fw={600} style={{ color: "#f1f5f9" }}>
            Create New Batch
          </Text>
          <Badge variant="light" color="teal">
            {newBatchId}
          </Badge>
        </Group>
      }
      size="lg"
      styles={{
        content: {
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
          border: "1px solid rgba(51, 65, 85, 0.4)",
          backdropFilter: "blur(16px)",
        },
        header: {
          background: "transparent",
          borderBottom: "1px solid rgba(51, 65, 85, 0.3)",
        },
        title: {
          color: "#f1f5f9",
          fontWeight: 600,
        },
      }}
    >
      {(() => {
        if (loadingData) {
          return <ModalContentSkeleton />;
        }
        
        if (error) {
          return (
            <ErrorWithRetry
              error={error}
              onRetry={loadFormData}
              title="Failed to load form data"
              type="network"
            />
          );
        }
        
        return (
          <Stack gap="md">
          {/* Line Item Selection */}
          <div>
            <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
              Select Line Item *
            </Text>
            <Select
              placeholder={lineItems.length === 0 ? "No line items available" : "Choose line item to batch"}
              data={lineItems.map(item => ({
                value: item.id,
                label: `${item.partNumber} - ${item.partName} (Available: ${item.availableQuantity}/${item.quantity})`,
                disabled: item.availableQuantity === 0
              }))}
              value={formData.lineItemId}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, lineItemId: value || '' }));
                // Reset quantity validation when line item changes
                if (value) {
                  validateQuantity(formData.quantity, value);
                }
              }}
              searchable
              styles={{
                input: {
                  background: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(51, 65, 85, 0.5)",
                  color: "#e2e8f0",
                },
                dropdown: {
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                },
                option: {
                  color: "#e2e8f0",
                },
              }}
            />
            {selectedLineItem && (
              <Group gap="xs" mt={4}>
                <Text size="xs" style={{ color: "#94a3b8" }}>
                  Order: {selectedLineItem.purchaseOrder.systemOrderId} | 
                  Customer: {selectedLineItem.purchaseOrder.customer.name}
                </Text>
                {selectedLineItem.batchedQuantity > 0 && (
                  <Badge size="xs" color="yellow" variant="light">
                    {selectedLineItem.batchedQuantity} already batched
                  </Badge>
                )}
              </Group>
            )}
            {lineItems.length === 0 && (
              <Text size="xs" c="dimmed" mt={4}>
                No line items available for batching. All line items may already be fully batched.
              </Text>
            )}
          </div>

          {/* Batch Quantity */}
          <div>
            <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
              Batch Quantity *
            </Text>
            <NumberInput
              placeholder="Enter quantity to batch"
              value={formData.quantity}
              onChange={handleQuantityChange}
              min={1}
              max={selectedLineItem?.availableQuantity || 1000}
              error={quantityError}
              styles={{
                input: {
                  background: "rgba(30, 41, 59, 0.6)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: quantityError ? '#ef4444' : 'rgba(51, 65, 85, 0.5)',
                  color: "#e2e8f0",
                },
              }}
            />
            {selectedLineItem && !quantityError && (
              <Group gap="xs" mt={4}>
                <Text size="xs" style={{ color: "#94a3b8" }}>
                  Available: {selectedLineItem.availableQuantity} units
                </Text>
                {formData.quantity > 0 && formData.quantity <= selectedLineItem.availableQuantity && (
                  <Badge size="xs" color="green" variant="light" leftSection={<IconCheck size={12} />}>
                    Valid quantity
                  </Badge>
                )}
              </Group>
            )}
            {quantityError && (
              <ValidationError message={quantityError} />
            )}
          </div>

          {/* Priority Selection */}
          <div>
            <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
              Priority *
            </Text>
            <Select
              data={[
                { value: 'HOLD', label: 'Hold' },
                { value: 'STANDARD', label: 'Standard' },
                { value: 'RUSH', label: 'Rush' },
              ]}
              value={formData.priority}
              onChange={(value) => setFormData((prev: NewBatchInput) => ({ ...prev, priority: value as 'RUSH' | 'STANDARD' | 'HOLD' }))}
              styles={{
                input: {
                  background: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(51, 65, 85, 0.5)",
                  color: "#e2e8f0",
                },
                dropdown: {
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                },
                option: {
                  color: "#e2e8f0",
                },
              }}
            />
          </div>

          {/* Routing Template */}
          <div>
            <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
              Routing Template *
            </Text>
            <Select
              placeholder="Choose routing template"
              data={routingTemplates.map(template => ({
                value: template.id,
                label: template.name,
              }))}
              value={formData.routingTemplateId}
              onChange={(value) => setFormData((prev: NewBatchInput) => ({ ...prev, routingTemplateId: value || '' }))}
              searchable
              styles={{
                input: {
                  background: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(51, 65, 85, 0.5)",
                  color: "#e2e8f0",
                },
                dropdown: {
                  background: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                },
                option: {
                  color: "#e2e8f0",
                },
              }}
            />
            {selectedTemplate && (
              <div style={{ marginTop: 8 }}>
                <Text size="xs" style={{ color: "#94a3b8" }}>
                  {selectedTemplate.description}
                </Text>
                <Text size="xs" style={{ color: "#94a3b8", marginTop: 4 }}>
                  {selectedTemplate.steps.length} steps • Est. {selectedTemplate.steps.reduce((total, step) => total + step.estimatedTime, 0)} minutes
                </Text>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
              Notes (Optional)
            </Text>
            <Textarea
              placeholder="Add any special instructions or notes for this batch..."
              value={formData.notes}
              onChange={(event) => setFormData((prev: NewBatchInput) => ({ ...prev, notes: event.target.value }))}
              minRows={3}
              maxRows={5}
              styles={{
                input: {
                  background: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(51, 65, 85, 0.5)",
                  color: "#e2e8f0",
                },
              }}
            />
          </div>

          <Divider style={{ borderColor: "rgba(51, 65, 85, 0.3)" }} />

          {/* Action Buttons */}
          <Group justify="flex-end">
            <Button
              variant="subtle"
              onClick={handleClose}
              disabled={loading}
              style={{
                color: "#94a3b8",
                border: "1px solid rgba(51, 65, 85, 0.5)",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={loading}
              style={{
                background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
                border: "none",
              }}
            >
              Create Batch
            </Button>
          </Group>
        </Stack>
        );
      })()}
    </Modal>
  );
}
