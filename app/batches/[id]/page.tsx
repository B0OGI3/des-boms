/**
 * Individual Batch Detail Page - Accessible via QR Code
 * 
 * This page provides a direct link to view batch details, optimized for
 * QR code scanning from work travelers.
 */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Title, Text, Group, Loader, Button, Badge, Stack, Card } from "@mantine/core";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import type { Batch } from "../types";

export default function BatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [batch, setBatch] = useState<Batch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const batchId = params.id as string;

  useEffect(() => {
    if (batchId) {
      fetchBatch(batchId);
    }
  }, [batchId]);

  const fetchBatch = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/batches/${id}`);
      
      if (!response.ok) {
        throw new Error('Batch not found');
      }
      
      const data = await response.json();
      setBatch(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load batch');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))'
      }}>
        <Loader size="lg" color="#14b8a6" />
      </div>
    );
  }

  if (error || !batch) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))',
        color: '#f1f5f9',
        textAlign: 'center',
        padding: '20px'
      }}>
        <Title order={2} style={{ color: '#ef4444', marginBottom: '16px' }}>
          Batch Not Found
        </Title>
        <Text size="lg" style={{ marginBottom: '24px' }}>
          The batch with ID &quot;{batchId}&quot; could not be found.
        </Text>
        <Button 
          onClick={() => router.push('/batches')}
          style={{
            background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
            border: "none",
          }}
        >
          Back to Batches
        </Button>
      </div>
    );
  }

  const getBatchStatusColor = (status: string) => {
    switch (status) {
      case 'QUEUED': return 'gray';
      case 'IN_PROGRESS': return 'blue';
      case 'COMPLETED': return 'green';
      case 'ON_HOLD': return 'yellow';
      case 'CANCELLED': return 'red';
      default: return 'gray';
    }
  };

  const getBatchPriorityColor = (priority: string) => {
    switch (priority) {
      case 'RUSH': return 'red';
      case 'STANDARD': return 'blue';
      case 'HOLD': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ErrorBoundary>
          {/* Header */}
          <Group justify="space-between" align="center" style={{ marginBottom: '32px' }}>
            <div>
              <Group gap="md" align="center" style={{ marginBottom: '12px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                }}>
                  📄
                </div>
                <div>
                  <Title order={1} style={{ 
                    color: '#f1f5f9', 
                    fontWeight: 700, 
                    fontSize: '2.2rem', 
                    margin: 0 
                  }}>
                    Batch Details
                  </Title>
                  <Text size="md" style={{ color: '#94a3b8' }}>
                    {batch.batchId} • Scanned from QR Code
                  </Text>
                </div>
              </Group>
            </div>
            <Group gap="md">
              <Button
                onClick={() => router.push('/batches')}
                variant="light"
                style={{
                  background: "rgba(51, 65, 85, 0.4)",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                  color: "#cbd5e1",
                }}
              >
                All Batches
              </Button>
            </Group>
          </Group>

          {/* Batch Information Card */}
          <Card style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
            border: "1px solid rgba(51, 65, 85, 0.4)",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "24px",
          }}>
            <Stack gap="xl">
              {/* Status and Priority */}
              <Group justify="space-between">
                <Group gap="md">
                  <Badge 
                    size="lg" 
                    color={getBatchStatusColor(batch.status)}
                    variant="light"
                  >
                    {batch.status.replace('_', ' ')}
                  </Badge>
                  <Badge 
                    size="lg" 
                    color={getBatchPriorityColor(batch.priority)}
                    variant="light"
                  >
                    {batch.priority} Priority
                  </Badge>
                </Group>
                <Text size="sm" style={{ color: '#94a3b8' }}>
                  Quantity: {batch.quantity} units
                </Text>
              </Group>

              {/* Basic Information */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <Text size="sm" style={{ color: '#94a3b8', marginBottom: '4px' }}>
                    Part Information
                  </Text>
                  <Text size="lg" style={{ color: '#f1f5f9', fontWeight: 600 }}>
                    {batch.lineItem.partNumber}
                  </Text>
                  <Text size="md" style={{ color: '#cbd5e1' }}>
                    {batch.lineItem.partName}
                  </Text>
                  {batch.lineItem.drawingNumber && (
                    <Text size="sm" style={{ color: '#94a3b8' }}>
                      Drawing: {batch.lineItem.drawingNumber}
                    </Text>
                  )}
                </div>

                <div>
                  <Text size="sm" style={{ color: '#94a3b8', marginBottom: '4px' }}>
                    Customer
                  </Text>
                  <Text size="lg" style={{ color: '#f1f5f9', fontWeight: 600 }}>
                    {batch.lineItem.purchaseOrder.customer.name}
                  </Text>
                  <Text size="sm" style={{ color: '#94a3b8' }}>
                    PO: {batch.lineItem.purchaseOrder.poNumber}
                  </Text>
                </div>

                <div>
                  <Text size="sm" style={{ color: '#94a3b8', marginBottom: '4px' }}>
                    Timeline
                  </Text>
                  {batch.startDate && (
                    <Text size="md" style={{ color: '#cbd5e1' }}>
                      Started: {new Date(batch.startDate).toLocaleDateString()}
                    </Text>
                  )}
                  {batch.estimatedCompletion && (
                    <Text size="md" style={{ color: '#cbd5e1' }}>
                      Due: {new Date(batch.estimatedCompletion).toLocaleDateString()}
                    </Text>
                  )}
                  {batch.actualCompletion && (
                    <Text size="md" style={{ color: '#10b981' }}>
                      Completed: {new Date(batch.actualCompletion).toLocaleDateString()}
                    </Text>
                  )}
                </div>
              </div>

              {/* Notes */}
              {batch.notes && (
                <div>
                  <Text size="sm" style={{ color: '#94a3b8', marginBottom: '8px' }}>
                    Notes
                  </Text>
                  <Text size="md" style={{ color: '#cbd5e1' }}>
                    {batch.notes}
                  </Text>
                </div>
              )}
            </Stack>
          </Card>

          {/* Routing Steps */}
          {batch.routingSteps && batch.routingSteps.length > 0 && (
            <Card style={{
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
              border: "1px solid rgba(51, 65, 85, 0.4)",
              borderRadius: "16px",
              padding: "32px",
            }}>
              <Title order={3} style={{ color: '#f1f5f9', marginBottom: '20px' }}>
                Routing Steps
              </Title>
              <Stack gap="md">
                {[...batch.routingSteps]
                  .sort((a, b) => a.stepNumber - b.stepNumber)
                  .map((step) => {
                    const getStepStatusColor = () => {
                      if (step.status === 'COMPLETED') return 'green';
                      if (step.status === 'IN_PROGRESS') return 'blue';
                      return 'gray';
                    };

                    return (
                      <div
                        key={step.id}
                        style={{
                          background: 'rgba(51, 65, 85, 0.3)',
                          border: '1px solid rgba(51, 65, 85, 0.5)',
                          borderRadius: '8px',
                          padding: '16px',
                        }}
                      >
                        <Group justify="space-between" align="flex-start">
                          <div style={{ flex: 1 }}>
                            <Group gap="md" align="center" style={{ marginBottom: '8px' }}>
                              <Badge size="sm" variant="light">
                                Step {step.stepNumber}
                              </Badge>
                              <Text size="md" style={{ color: '#f1f5f9', fontWeight: 600 }}>
                                {step.workstation.name}
                              </Text>
                              <Badge 
                                size="sm" 
                                color={getStepStatusColor()}
                              >
                                {step.status.replace('_', ' ')}
                              </Badge>
                            </Group>
                            <Text size="sm" style={{ color: '#cbd5e1', marginBottom: '4px' }}>
                              {step.description}
                            </Text>
                            {step.estimatedTime && (
                              <Text size="xs" style={{ color: '#94a3b8' }}>
                                Estimated time: {step.estimatedTime} minutes
                              </Text>
                            )}
                            {step.notes && (
                              <Text size="xs" style={{ color: '#94a3b8', marginTop: '4px' }}>
                                Notes: {step.notes}
                              </Text>
                            )}
                          </div>
                        </Group>
                      </div>
                    );
                  })}
              </Stack>
            </Card>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
