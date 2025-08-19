/**
 * Delete Batch Confirmation Modal - Safe Batch Deletion
 * 
 * Implements DES-BOMS specification requirements:
 * 3.1 Batch Definition - Safe batch removal with validation
 * 
 * Features:
 * - Confirmation dialog with batch details
 * - Validation checks (can't delete in-progress batches)
 * - Clear impact warning
 * - Double confirmation for safety
 */

"use client";

import React, { useState } from "react";
import { 
  Modal, 
  Text, 
  Group, 
  Stack, 
  Badge, 
  Button,
  Alert,
  Divider,
  Checkbox
} from "@mantine/core";
import type { Batch } from '../types';
import { getBatchStatusColor, calculateBatchProgress } from '../utils/batchHelpers';

interface DeleteBatchConfirmationProps {
  opened: boolean;
  onClose: () => void;
  batch: Batch | null;
  onBatchDeleted: () => void;
}

export function DeleteBatchConfirmation({ 
  opened, 
  onClose, 
  batch, 
  onBatchDeleted 
}: Readonly<DeleteBatchConfirmationProps>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleDelete = async () => {
    if (!batch || !confirmed) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/batches/${batch.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // If response isn't JSON, use status text
          errorData = { error: response.statusText || 'Delete failed' };
        }
        console.error('Delete batch error response:', errorData);
        throw new Error(errorData.error || 'Failed to delete batch');
      }

      // Only try to consume response if it was successful
      try {
        await response.json();
      } catch {
        // Response might be empty, which is fine for a successful delete
        console.log('Delete batch successful (empty response)');
      }

      // Success - close modal and refresh data
      onBatchDeleted();
      onClose();
      resetState();

    } catch (err) {
      console.error('Error deleting batch:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setConfirmed(false);
    setError(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!batch) return null;

  const progress = calculateBatchProgress(batch);
  const hasProgress = progress > 0;
  const canDelete = !['IN_PROGRESS'].includes(batch.status) || progress === 0;

  // Determine warning level
  const getWarningLevel = () => {
    if (batch.status === 'COMPLETED') return 'warning';
    if (hasProgress || batch.status === 'IN_PROGRESS') return 'danger';
    return 'info';
  };

  const getWarningMessage = () => {
    if (batch.status === 'COMPLETED') {
      return 'This batch is completed. Deleting it will remove all historical data and QC records.';
    }
    if (hasProgress) {
      return 'This batch has routing progress. Deleting it will lose all work confirmations and time tracking.';
    }
    if (batch.status === 'IN_PROGRESS') {
      return 'This batch is currently in progress. It should be completed or put on hold before deletion.';
    }
    return 'This batch will be permanently deleted and cannot be recovered.';
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="md">
          <Text size="lg" fw={600} style={{ color: "#f1f5f9" }}>
            Delete Batch
          </Text>
          <Badge variant="outline" color="red">
            PERMANENT ACTION
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

        {!canDelete && (
          <Alert color="red" title="Cannot Delete">
            This batch cannot be deleted while it&apos;s in progress. Please complete the batch or put it on hold first.
          </Alert>
        )}

        <Alert 
          color={(() => {
            const level = getWarningLevel();
            if (level === 'danger') return 'red';
            if (level === 'warning') return 'yellow';
            return 'blue';
          })()}
          title="Warning"
        >
          {getWarningMessage()}
        </Alert>

        {/* Batch Information */}
        <div style={{
          background: "rgba(30, 41, 59, 0.4)",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid rgba(51, 65, 85, 0.3)",
        }}>
          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Text size="lg" fw={600} style={{ color: "#f1f5f9" }}>
                  {batch.batchId}
                </Text>
                <Text size="sm" style={{ color: "#94a3b8" }}>
                  Created: {new Date(batch.createdAt).toLocaleDateString()}
                </Text>
              </div>
              <Group gap="sm">
                <Badge variant="filled" color={getBatchStatusColor(batch.status)}>
                  {batch.status.replace('_', ' ')}
                </Badge>
                <Badge variant="light" color="gray">
                  {progress}% Complete
                </Badge>
              </Group>
            </Group>

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
                  Quantity
                </Text>
                <Text fw={500} style={{ color: "#f1f5f9" }}>
                  {batch.quantity} units
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
              <div>
                <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                  Priority
                </Text>
                <Badge size="sm" variant="light" color={
                  (() => {
                    if (batch.priority === 'RUSH') return 'red';
                    if (batch.priority === 'STANDARD') return 'blue';
                    return 'gray';
                  })()
                }>
                  {batch.priority}
                </Badge>
              </div>
            </div>

            {/* Show routing steps count and QC records */}
            <Group>
              <Text size="sm" style={{ color: "#94a3b8" }}>
                {batch.routingSteps.length} routing steps
              </Text>
              <Text size="sm" style={{ color: "#94a3b8" }}>
                {batch.qcRecords.length} QC records
              </Text>
              {batch.notes && (
                <Text size="sm" style={{ color: "#94a3b8" }}>
                  Has notes
                </Text>
              )}
            </Group>
          </Stack>
        </div>

        {/* Impact Summary */}
        <div style={{
          background: "rgba(239, 68, 68, 0.1)",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}>
          <Text size="sm" fw={600} style={{ color: "#fca5a5", marginBottom: 8 }}>
            This action will:
          </Text>
          <Stack gap={4}>
            <Text size="sm" style={{ color: "#fca5a5" }}>
              • Permanently delete the batch record
            </Text>
            <Text size="sm" style={{ color: "#fca5a5" }}>
              • Remove all routing step confirmations ({batch.routingSteps.reduce((total, step) => total + step.confirmations.length, 0)})
            </Text>
            <Text size="sm" style={{ color: "#fca5a5" }}>
              • Delete all QC inspection records ({batch.qcRecords.length})
            </Text>
            <Text size="sm" style={{ color: "#fca5a5" }}>
              • Return {batch.quantity} units to the line item for rebatching
            </Text>
          </Stack>
        </div>

        {/* Confirmation Checkbox */}
        {canDelete && (
          <Checkbox
            checked={confirmed}
            onChange={(event) => setConfirmed(event.currentTarget.checked)}
            label={
              <Text style={{ color: "#f1f5f9" }}>
                I understand this action cannot be undone and want to permanently delete this batch
              </Text>
            }
            styles={{
              input: {
                background: "rgba(30, 41, 59, 0.6)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
              },
              label: {
                color: "#f1f5f9",
              },
            }}
          />
        )}

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
            onClick={handleDelete}
            loading={loading}
            disabled={!canDelete || !confirmed}
            color="red"
            style={{
              background: (!canDelete || !confirmed) 
                ? "rgba(107, 114, 128, 0.5)"
                : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              border: "none",
            }}
          >
            Delete Batch
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
