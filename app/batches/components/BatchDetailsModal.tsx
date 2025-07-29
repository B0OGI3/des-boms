/**
 * Batch Details Modal - View Comprehensive Batch Information
 * 
 * Implements DES-BOMS specification requirements:
 * 3.1 Batch Definition - Complete batch information display
 * 3.2 Routing Steps - Step-by-step progress visualization
 * 3.3 Work Traveler - Routing documentation preview
 * 
 * Features:
 * - Complete batch information display
 * - Real-time routing step progress
 * - QC records and confirmations
 * - Work traveler preview
 * - Timeline visualization
 */

"use client";

import React from "react";
import { 
  Modal, 
  Text, 
  Group, 
  Stack, 
  Badge, 
  Progress, 
  Button,
  ScrollArea,
  Timeline,
  Card
} from "@mantine/core";
import type { Batch } from '../types';
import { 
  calculateBatchProgress, 
  getCurrentStep, 
  getBatchStatusColor, 
  getBatchPriorityColor,
  isBatchOverdue,
  formatEstimatedTime
} from '../utils/batchHelpers';

interface BatchDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  batch: Batch | null;
  onEdit?: (batch: Batch) => void;
}

export function BatchDetailsModal({ 
  opened, 
  onClose, 
  batch, 
  onEdit 
}: Readonly<BatchDetailsModalProps>) {
  if (!batch) return null;

  const progress = calculateBatchProgress(batch);
  const currentStep = getCurrentStep(batch);
  const overdue = isBatchOverdue(batch);

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'green';
      case 'IN_PROGRESS': return 'blue';
      case 'FAILED': return 'red';
      case 'SKIPPED': return 'yellow';
      default: return 'gray';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '✓';
      case 'IN_PROGRESS': return '⟲';
      case 'FAILED': return '✗';
      case 'SKIPPED': return '↷';
      default: return '○';
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="md">
          <Text size="lg" fw={600} style={{ color: "#f1f5f9" }}>
            Batch Details
          </Text>
          <Badge variant="filled" color={getBatchStatusColor(batch.status)}>
            {batch.status.replace('_', ' ')}
          </Badge>
          {overdue && (
            <Badge color="red" variant="filled">
              OVERDUE
            </Badge>
          )}
        </Group>
      }
      size="xl"
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
      <ScrollArea style={{ height: "70vh" }}>
        <Stack gap="lg">
          {/* Batch Summary */}
          <Card style={{
            background: "rgba(30, 41, 59, 0.4)",
            border: "1px solid rgba(51, 65, 85, 0.3)",
          }}>
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text size="xl" fw={600} style={{ color: "#f1f5f9" }}>
                    {batch.batchId}
                  </Text>
                  <Text size="sm" style={{ color: "#94a3b8" }}>
                    Created: {new Date(batch.createdAt).toLocaleDateString()}
                  </Text>
                </div>
                <Group gap="sm">
                  <Badge 
                    variant="light" 
                    color={getBatchPriorityColor(batch.priority)}
                    size="lg"
                  >
                    {batch.priority}
                  </Badge>
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => onEdit(batch)}
                      style={{
                        background: "rgba(59, 130, 246, 0.2)",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        color: "#93c5fd",
                      }}
                    >
                      Edit Batch
                    </Button>
                  )}
                </Group>
              </Group>

              {/* Progress */}
              <div>
                <Group justify="space-between" style={{ marginBottom: 8 }}>
                  <Text size="sm" fw={500} style={{ color: "#f1f5f9" }}>
                    Progress
                  </Text>
                  <Text size="sm" style={{ color: "#94a3b8" }}>
                    {progress}% Complete
                  </Text>
                </Group>
                <Progress
                  value={progress}
                  size="lg"
                  color={progress === 100 ? "green" : "blue"}
                  styles={{
                    root: {
                      background: progress === 100 
                        ? "linear-gradient(90deg, #10b981, #059669)"
                        : "linear-gradient(90deg, #3b82f6, #2563eb)",
                    },
                  }}
                />
              </div>
            </Stack>
          </Card>

          {/* Line Item Information */}
          <div>
            <Text size="lg" fw={600} style={{ color: "#f1f5f9", marginBottom: 12 }}>
              Line Item Information
            </Text>
            <Card style={{
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px solid rgba(51, 65, 85, 0.3)",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                    Part Number
                  </Text>
                  <Text fw={500} style={{ color: "#f1f5f9" }}>
                    {batch.lineItem.partNumber}
                  </Text>
                </div>
                <div>
                  <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                    Part Name
                  </Text>
                  <Text fw={500} style={{ color: "#f1f5f9" }}>
                    {batch.lineItem.partName}
                  </Text>
                </div>
                <div>
                  <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                    Order
                  </Text>
                  <Text fw={500} style={{ color: "#f1f5f9" }}>
                    {batch.lineItem.purchaseOrder.systemOrderId}
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
                    Batch Quantity
                  </Text>
                  <Text fw={500} style={{ color: "#f1f5f9" }}>
                    {batch.quantity} units
                  </Text>
                </div>
                <div>
                  <Text size="xs" style={{ color: "#94a3b8", textTransform: "uppercase" }}>
                    Drawing Number
                  </Text>
                  <Text fw={500} style={{ color: "#f1f5f9" }}>
                    {batch.lineItem.drawingNumber || 'N/A'}
                  </Text>
                </div>
              </div>
            </Card>
          </div>

          {/* Routing Steps Timeline */}
          <div>
            <Text size="lg" fw={600} style={{ color: "#f1f5f9", marginBottom: 12 }}>
              Routing Steps ({batch.routingSteps.length})
            </Text>
            <Card style={{
              background: "rgba(30, 41, 59, 0.4)",
              border: "1px solid rgba(51, 65, 85, 0.3)",
            }}>
              <Timeline active={-1} bulletSize={24} lineWidth={2}>
                {[...batch.routingSteps]
                  .sort((a, b) => a.stepNumber - b.stepNumber)
                  .map((step) => (
                    <Timeline.Item
                      key={step.id}
                      bullet={<span style={{ fontSize: "12px" }}>{getStepIcon(step.status)}</span>}
                      title={
                        <Group gap="sm">
                          <Text fw={600} style={{ color: "#f1f5f9" }}>
                            Step {step.stepNumber}: {step.description}
                          </Text>
                          <Badge 
                            size="sm" 
                            color={getStepStatusColor(step.status)}
                            variant="filled"
                          >
                            {step.status.replace('_', ' ')}
                          </Badge>
                          {step.id === currentStep?.id && (
                            <Badge size="sm" color="blue" variant="light">
                              CURRENT
                            </Badge>
                          )}
                        </Group>
                      }
                      styles={{
                        itemBullet: {
                          background: (() => {
                            if (step.status === 'COMPLETED') return "#10b981";
                            if (step.status === 'IN_PROGRESS') return "#3b82f6";
                            if (step.status === 'FAILED') return "#ef4444";
                            return "#6b7280";
                          })(),
                          border: "none",
                        },
                        itemTitle: {
                          marginBottom: 8,
                        },
                      }}
                    >
                      <div style={{ marginLeft: 8 }}>
                        {step.estimatedTime && (
                          <Text size="sm" style={{ color: "#94a3b8" }}>
                            Estimated: {formatEstimatedTime(step.estimatedTime)}
                          </Text>
                        )}
                        {step.notes && (
                          <Text size="sm" style={{ color: "#94a3b8", marginTop: 4 }}>
                            Notes: {step.notes}
                          </Text>
                        )}
                        {step.confirmations && step.confirmations.length > 0 && (
                          <div style={{ marginTop: 8 }}>
                            <Text size="xs" style={{ color: "#94a3b8", marginBottom: 4 }}>
                              Confirmations:
                            </Text>
                            {step.confirmations.map((confirmation, index) => (
                              <Text key={`confirmation-${step.id}-${index}`} size="xs" style={{ color: "#cbd5e1", marginLeft: 8 }}>
                                • {new Date(confirmation.createdAt).toLocaleString()}
                                {confirmation.notes && ` - ${confirmation.notes}`}
                              </Text>
                            ))}
                          </div>
                        )}
                      </div>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </Card>
          </div>

          {/* QC Records */}
          {batch.qcRecords && batch.qcRecords.length > 0 && (
            <div>
              <Text size="lg" fw={600} style={{ color: "#f1f5f9", marginBottom: 12 }}>
                Quality Control Records ({batch.qcRecords.length})
              </Text>
              <Card style={{
                background: "rgba(30, 41, 59, 0.4)",
                border: "1px solid rgba(51, 65, 85, 0.3)",
              }}>
                <Stack gap="md">
                  {batch.qcRecords.map((qc) => (
                    <div key={qc.id} style={{
                      padding: 12,
                      background: "rgba(71, 85, 105, 0.3)",
                      borderRadius: 8,
                      border: "1px solid rgba(71, 85, 105, 0.5)",
                    }}>
                      <Group justify="space-between" align="flex-start">
                        <div>
                          <Text fw={600} style={{ color: "#f1f5f9" }}>
                            QC Inspection by {qc.inspector}
                          </Text>
                          <Text size="sm" style={{ color: "#94a3b8" }}>
                            {new Date(qc.inspectionDate).toLocaleString()}
                          </Text>
                        </div>
                        <Badge 
                          color={(() => {
                            if (qc.result === 'PASS') return 'green';
                            if (qc.result === 'FAIL') return 'red';
                            return 'yellow';
                          })()}
                          variant="filled"
                        >
                          {qc.result.replace('_', ' ')}
                        </Badge>
                      </Group>
                      {qc.notes && (
                        <Text size="sm" style={{ color: "#cbd5e1", marginTop: 8 }}>
                          {qc.notes}
                        </Text>
                      )}
                    </div>
                  ))}
                </Stack>
              </Card>
            </div>
          )}

          {/* Batch Notes */}
          {batch.notes && (
            <div>
              <Text size="lg" fw={600} style={{ color: "#f1f5f9", marginBottom: 12 }}>
                Batch Notes
              </Text>
              <Card style={{
                background: "rgba(30, 41, 59, 0.4)",
                border: "1px solid rgba(51, 65, 85, 0.3)",
              }}>
                <Text style={{ color: "#cbd5e1" }}>
                  {batch.notes}
                </Text>
              </Card>
            </div>
          )}
        </Stack>
      </ScrollArea>
    </Modal>
  );
}
