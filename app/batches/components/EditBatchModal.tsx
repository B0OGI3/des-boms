/**
 * Edit Batch Modal - Update Batch Settings and Routing
 * 
 * Implements DES-BOMS specification requirements:
 * 3.1 Batch Definition - Batch property updates
 * 3.2 Routing Steps - Routing modification capabilities
 * 
 * Features:
 * - Update batch quantity and priority
 * - Modify estimated completion dates
 * - Update batch notes and special instructions
 * - Real-time validation
 */

"use client";

import React, { useState, useEffect } from "react";
import { 
  Modal, 
  NumberInput, 
  Select, 
  Button, 
  Stack, 
  Group, 
  Text, 
  Divider,
  Alert,
  Textarea,
  Badge
} from "@mantine/core";
import type { Batch, EditBatchInput } from '../types';
import { getBatchStatusColor } from '../utils/batchHelpers';

interface EditBatchModalProps {
  opened: boolean;
  onClose: () => void;
  batch: Batch | null;
  onBatchUpdated: () => void;
}

export function EditBatchModal({ 
  opened, 
  onClose, 
  batch, 
  onBatchUpdated 
}: Readonly<EditBatchModalProps>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<EditBatchInput>({
    quantity: batch?.quantity || 1,
    priority: batch?.priority || 'STANDARD',
    notes: batch?.notes || '',
    estimatedCompletion: batch?.estimatedCompletion || '',
  });

  // Reset form when batch changes
  useEffect(() => {
    if (batch) {
      setFormData({
        quantity: batch.quantity,
        priority: batch.priority,
        notes: batch.notes || '',
        estimatedCompletion: batch.estimatedCompletion || '',
      });
    }
  }, [batch]);

  // Validation helper
  const validateForm = (): string | null => {
    if (!formData.quantity || formData.quantity <= 0) {
      return 'Quantity must be greater than 0';
    }
    return null;
  };

  // Changes detection helper
  const getChanges = (): Partial<EditBatchInput> => {
    if (!batch) return {};
    
    const changes: Partial<EditBatchInput> = {};
    if (formData.quantity !== batch.quantity) changes.quantity = formData.quantity;
    if (formData.priority !== batch.priority) changes.priority = formData.priority;
    if (formData.notes !== (batch.notes || '')) changes.notes = formData.notes;
    if (formData.estimatedCompletion !== (batch.estimatedCompletion || '')) {
      changes.estimatedCompletion = formData.estimatedCompletion;
    }
    return changes;
  };

  // Error handling helper
  const handleApiError = async (response: Response): Promise<never> => {
    let errorMessage = `Server responded with status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (parseError) {
      console.error('Could not parse error response:', parseError);
      // Use status-based error messages if JSON parsing fails
      if (response.status === 405) {
        errorMessage = 'Method not allowed - please try again';
      } else if (response.status === 404) {
        errorMessage = 'Batch not found';
      } else if (response.status >= 500) {
        errorMessage = 'Server error - please try again later';
      }
    }
    throw new Error(errorMessage);
  };

  const handleSubmit = async () => {
    if (!batch) return;

    try {
      setLoading(true);
      setError(null);

      // Validate form
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      // Get changes
      const changes = getChanges();
      if (Object.keys(changes).length === 0) {
        onClose();
        return;
      }

      // Update the batch
      const response = await fetch(`/api/batches/${batch.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });

      if (!response.ok) {
        await handleApiError(response);
      }

      // Parse the response
      try {
        await response.json();
      } catch (parseError) {
        console.error('Could not parse success response:', parseError);
        // If we can't parse the response but the status was OK, assume success
        console.log('Batch update appears successful despite parsing error');
      }

      // Success - close modal and refresh data
      onBatchUpdated();
      onClose();

    } catch (err) {
      console.error('Error updating batch:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  if (!batch) return null;

  // Check if batch can be edited (not completed or cancelled)
  const canEdit = !['COMPLETED', 'CANCELLED'].includes(batch.status);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="md">
          <Text size="lg" fw={600} style={{ color: "#f1f5f9" }}>
            Edit Batch
          </Text>
          <Badge variant="light" color="blue">
            {batch.batchId}
          </Badge>
          <Badge variant="filled" color={getBatchStatusColor(batch.status)}>
            {batch.status.replace('_', ' ')}
          </Badge>
        </Group>
      }
      size="md"
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
      <Stack gap="md">
        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        {!canEdit && (
          <Alert color="yellow" title="Limited Editing">
            This batch is {batch.status.toLowerCase().replace('_', ' ')} and has limited editing capabilities.
          </Alert>
        )}

        {/* Batch Information Display */}
        <div style={{
          background: "rgba(30, 41, 59, 0.4)",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid rgba(51, 65, 85, 0.3)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                Part Number
              </Text>
              <Text fw={500} style={{ color: "#f1f5f9" }}>
                {batch.lineItem.part.partNumber}
              </Text>
            </div>
            <div>
              <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                Customer
              </Text>
              <Text fw={500} style={{ color: "#f1f5f9" }}>
                {batch.lineItem.purchaseOrder.customer.name}
              </Text>
            </div>
          </div>
        </div>

        {/* Editable Fields */}
        <div>
          <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
            Batch Quantity *
          </Text>
          <NumberInput
            placeholder="Enter batch quantity"
            value={formData.quantity}
            onChange={(value) => setFormData((prev: EditBatchInput) => ({ ...prev, quantity: Number(value) || 1 }))}
            min={1}
            max={batch.lineItem.quantity}
            disabled={!canEdit}
            styles={{
              input: {
                background: "rgba(30, 41, 59, 0.6)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                color: "#e2e8f0",
              },
            }}
          />
          <Text size="xs" style={{ color: "#94a3b8", marginTop: 4 }}>
            Original order quantity: {batch.lineItem.quantity} units
          </Text>
        </div>

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
            onChange={(value) => setFormData((prev: EditBatchInput) => ({ 
              ...prev, 
              priority: value as 'RUSH' | 'STANDARD' | 'HOLD' 
            }))}
            disabled={!canEdit}
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

        <div>
          <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
            Estimated Completion
          </Text>
          <input
            type="datetime-local"
            value={formData.estimatedCompletion ? new Date(formData.estimatedCompletion).toISOString().slice(0, 16) : ''}
            onChange={(e) => setFormData((prev: EditBatchInput) => ({ 
              ...prev, 
              estimatedCompletion: e.target.value ? new Date(e.target.value).toISOString() : ''
            }))}
            disabled={!canEdit}
            style={{
              width: "100%",
              height: "44px",
              background: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              borderRadius: "8px",
              padding: "0 16px",
              color: "#e2e8f0",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <Text size="sm" fw={500} style={{ color: "#f1f5f9", marginBottom: 8 }}>
            Notes
          </Text>
          <Textarea
            placeholder="Add or update batch notes..."
            value={formData.notes}
            onChange={(event) => setFormData((prev: EditBatchInput) => ({ ...prev, notes: event.target.value }))}
            minRows={3}
            maxRows={5}
            disabled={!canEdit}
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
            disabled={!canEdit}
            style={{
              background: canEdit 
                ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                : "rgba(107, 114, 128, 0.5)",
              border: "none",
            }}
          >
            Update Batch
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
