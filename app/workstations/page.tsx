/**
 * Workstations Page - DES-BOMS Shop Floor Management
 * 
 * This page implements the operator confirmation system requirements from the 
 * DES-BOMS specification document:
 * 
 * 4. Operator Confirmation System
 * - Log into assigned workstation
 * - View job queue filtered by workstation
 * - Start/complete routing steps with timestamps
 * - Upload photos and flag issues
 * - Real-time workstation status monitoring
 * 
 * Features:
 * - Workstation selection and operator login
 * - Live job queue with batch routing steps
 * - Step confirmation with photo uploads
 * - Real-time status updates
 * - Manufacturing floor optimized interface
 */

"use client";

import { 
  Title, 
  Text, 
  Card, 
  Badge, 
  Group, 
  Stack, 
  Loader, 
  Alert, 
  Button,
  Select,
  Grid,
  ActionIcon,
  Modal,
  TextInput,
  Textarea,
  FileInput
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPlayerPlay, IconCheck, IconFlag, IconCamera, IconRefresh } from "@tabler/icons-react";

interface Workstation {
  id: string;
  name: string;
  description: string;
  active: boolean;
  status: 'ACTIVE' | 'IDLE' | 'MAINTENANCE';
  currentOperator?: string;
  activeJobs: number;
  queuedJobs: number;
}

interface RoutingStep {
  id: string;
  stepNumber: number;
  description: string;
  estimatedTime: number;
  notes?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FLAGGED';
  startTime?: string;
  endTime?: string;
  operatorName?: string;
  batch: {
    id: string;
    batchId: string;
    priority: 'RUSH' | 'STANDARD' | 'HOLD';
    lineItem: {
      quantity: number;
      part: {
        id: string;
        partNumber: string;
        partName: string;
        partType: 'FINISHED_GOOD' | 'SEMI_FINISHED' | 'RAW_MATERIAL';
        description?: string;
      };
      purchaseOrder: {
        customer: {
          name: string;
        };
      };
    };
  };
  confirmations?: Array<{
    id: string;
    operatorName: string;
    startTime: string;
    endTime?: string;
    photoPath?: string;
    notes?: string;
  }>;
}

export default function WorkstationsPage() {
  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState<string>('');
  const [operatorName, setOperatorName] = useState<string>('');
  const [routingSteps, setRoutingSteps] = useState<RoutingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [stepActionModal, setStepActionModal] = useState<{
    open: boolean;
    step?: RoutingStep;
    action?: 'start' | 'complete' | 'flag';
  }>({ open: false });
  const [actionNotes, setActionNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Fetch workstations
  useEffect(() => {
    const fetchWorkstations = async () => {
      try {
        const response = await fetch('/api/workstations');
        if (response.ok) {
          const result = await response.json();
          setWorkstations(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching workstations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkstations();
  }, []);

  // Fetch routing steps for selected workstation
  useEffect(() => {
    if (!selectedWorkstation) {
      setRoutingSteps([]);
      return;
    }

    const fetchRoutingSteps = async () => {
      try {
        const response = await fetch(`/api/routing-steps?workstationId=${selectedWorkstation}&status=PENDING,IN_PROGRESS`);
        if (response.ok) {
          const result = await response.json();
          setRoutingSteps(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching routing steps:', error);
      }
    };

    fetchRoutingSteps();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchRoutingSteps, 30000);
    return () => clearInterval(interval);
  }, [selectedWorkstation]);

  const handleStepAction = async (action: 'start' | 'complete' | 'flag') => {
    if (!stepActionModal.step || !operatorName) return;

    try {
      const formData = new FormData();
      formData.append('stepId', stepActionModal.step.id);
      formData.append('workstationId', selectedWorkstation);
      formData.append('operatorName', operatorName);
      formData.append('action', action);
      
      if (actionNotes) {
        formData.append('notes', actionNotes);
      }
      
      if (uploadedFile) {
        formData.append('photo', uploadedFile);
      }

      const response = await fetch('/api/step-confirmations', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Refresh routing steps
        const stepsResponse = await fetch(`/api/routing-steps?workstationId=${selectedWorkstation}&status=PENDING,IN_PROGRESS`);
        if (stepsResponse.ok) {
          const result = await stepsResponse.json();
          setRoutingSteps(result.data || []);
        }
        
        // Close modal and reset
        setStepActionModal({ open: false });
        setActionNotes('');
        setUploadedFile(null);
      }
    } catch (error) {
      console.error('Error submitting step action:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'green';
      case 'IN_PROGRESS': return 'blue';
      case 'PENDING': return 'yellow';
      case 'FLAGGED': return 'red';
      case 'COMPLETED': return 'gray';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'RUSH': return 'red';
      case 'STANDARD': return 'blue';
      case 'HOLD': return 'gray';
      default: return 'blue';
    }
  };

  const getPartTypeColor = (partType: string) => {
    switch (partType) {
      case 'FINISHED_GOOD': return 'green';
      case 'SEMI_FINISHED': return 'orange';
      case 'RAW_MATERIAL': return 'purple';
      default: return 'gray';
    }
  };

  const getPartTypeLabel = (partType: string) => {
    switch (partType) {
      case 'FINISHED_GOOD': return 'FG';
      case 'SEMI_FINISHED': return 'SF';
      case 'RAW_MATERIAL': return 'RM';
      default: return partType;
    }
  };

  if (loading) {
    return (
      <div style={{ 
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Loader size="xl" color="#3b82f6" />
      </div>
    );
  }

  return (
    <main style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      minHeight: "100vh",
      padding: "20px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title order={1} style={{ color: "#f1f5f9", marginBottom: 12 }}>
            🏭 Shop Floor Workstations
          </Title>
          <Text size="lg" style={{ color: "#cbd5e1" }}>
            Operator confirmations and real-time workstation management
          </Text>
        </div>

        {/* Workstation Selection */}
        <Card withBorder style={{ 
          background: "rgba(30, 41, 59, 0.85)",
          border: "1px solid rgba(51, 65, 85, 0.7)",
          marginBottom: 32
        }}>
          <Grid>
            <Grid.Col span={4}>
              <Select
                label="Select Workstation"
                placeholder="Choose your workstation"
                value={selectedWorkstation}
                onChange={(value) => setSelectedWorkstation(value || '')}
                data={workstations.map(ws => ({ 
                  value: ws.id, 
                  label: `${ws.name} - ${ws.description}` 
                }))}
                styles={{
                  label: { color: "#f1f5f9" },
                  input: { 
                    background: "rgba(51, 65, 85, 0.5)",
                    border: "1px solid rgba(71, 85, 105, 0.5)",
                    color: "#f1f5f9"
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Operator Name"
                placeholder="Enter your name"
                value={operatorName}
                onChange={(event) => setOperatorName(event.currentTarget.value)}
                styles={{
                  label: { color: "#f1f5f9" },
                  input: { 
                    background: "rgba(51, 65, 85, 0.5)",
                    border: "1px solid rgba(71, 85, 105, 0.5)",
                    color: "#f1f5f9"
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <div style={{ paddingTop: 25 }}>
                <Button
                  leftSection={<IconRefresh size={16} />}
                  onClick={() => window.location.reload()}
                  variant="light"
                  color="blue"
                >
                  Refresh Queue
                </Button>
              </div>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Job Queue */}
        {selectedWorkstation && operatorName ? (
          <div>
            <Title order={2} style={{ color: "#f1f5f9", marginBottom: 20 }}>
              📋 Job Queue - {workstations.find(w => w.id === selectedWorkstation)?.name}
            </Title>
            
            {routingSteps.length === 0 ? (
              <Alert color="blue" style={{ 
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.3)"
              }}>
                <Text style={{ color: "#93c5fd" }}>
                  No routing steps currently queued for this workstation.
                </Text>
              </Alert>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {routingSteps.map((step) => (
                  <Card
                    key={step.id}
                    withBorder
                    style={{
                      background: "rgba(30, 41, 59, 0.85)",
                      border: "1px solid rgba(51, 65, 85, 0.7)",
                    }}
                  >
                    <Grid align="center">
                      <Grid.Col span={8}>
                        <Group justify="space-between" align="flex-start">
                          <div>
                            <Group gap="sm" mb="xs">
                              <Text fw={600} style={{ color: "#f1f5f9" }}>
                                Step {step.stepNumber}: {step.description}
                              </Text>
                              <Badge color={getStatusColor(step.status)} variant="filled">
                                {step.status}
                              </Badge>
                              <Badge color={getPriorityColor(step.batch.priority)} variant="outline">
                                {step.batch.priority}
                              </Badge>
                              <Badge color={getPartTypeColor(step.batch.lineItem.part.partType)} variant="light">
                                {getPartTypeLabel(step.batch.lineItem.part.partType)}
                              </Badge>
                            </Group>
                            <Text size="sm" style={{ color: "#cbd5e1" }}>
                              Batch: {step.batch.batchId} • Part: {step.batch.lineItem.part.partNumber} ({step.batch.lineItem.part.partName})
                            </Text>
                            <Text size="sm" style={{ color: "#94a3b8" }}>
                              Customer: {step.batch.lineItem.purchaseOrder.customer.name} • Est. Time: {step.estimatedTime}min
                            </Text>
                            {step.notes && (
                              <Text size="sm" style={{ color: "#94a3b8", fontStyle: "italic" }}>
                                Notes: {step.notes}
                              </Text>
                            )}
                          </div>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Group gap="xs" justify="flex-end">
                          {step.status === 'PENDING' && (
                            <Button
                              leftSection={<IconPlayerPlay size={16} />}
                              size="sm"
                              color="blue"
                              onClick={() => setStepActionModal({ 
                                open: true, 
                                step, 
                                action: 'start' 
                              })}
                            >
                              Start
                            </Button>
                          )}
                          {step.status === 'IN_PROGRESS' && (
                            <Button
                              leftSection={<IconCheck size={16} />}
                              size="sm"
                              color="green"
                              onClick={() => setStepActionModal({ 
                                open: true, 
                                step, 
                                action: 'complete' 
                              })}
                            >
                              Complete
                            </Button>
                          )}
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => setStepActionModal({ 
                              open: true, 
                              step, 
                              action: 'flag' 
                            })}
                          >
                            <IconFlag size={16} />
                          </ActionIcon>
                        </Group>
                      </Grid.Col>
                    </Grid>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Alert color="orange" style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.3)"
          }}>
            <Text style={{ color: "#fbbf24" }}>
              Please select a workstation and enter your operator name to view the job queue.
            </Text>
          </Alert>
        )}

        {/* Step Action Modal */}
        <Modal
          opened={stepActionModal.open}
          onClose={() => setStepActionModal({ open: false })}
          title={
            <Text fw={600} style={{ color: "#f1f5f9" }}>
              {(() => {
                if (stepActionModal.action === 'start') return 'Start Step';
                if (stepActionModal.action === 'complete') return 'Complete Step';
                return 'Flag Issue';
              })()}
            </Text>
          }
          styles={{
            content: { 
              background: "rgba(30, 41, 59, 0.95)",
              border: "1px solid rgba(51, 65, 85, 0.7)"
            },
            header: { 
              background: "rgba(30, 41, 59, 0.95)",
              borderBottom: "1px solid rgba(51, 65, 85, 0.7)"
            }
          }}
        >
          <Stack gap="md">
            {stepActionModal.step && (
              <div>
                <Text size="sm" style={{ color: "#cbd5e1" }}>
                  Step: {stepActionModal.step.description}
                </Text>
                <Text size="sm" style={{ color: "#94a3b8" }}>
                  Batch: {stepActionModal.step.batch.batchId}
                </Text>
              </div>
            )}
            
            <Textarea
              label="Notes (Optional)"
              placeholder="Add any notes about this step..."
              value={actionNotes}
              onChange={(event) => setActionNotes(event.currentTarget.value)}
              styles={{
                label: { color: "#f1f5f9" },
                input: { 
                  background: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                  color: "#f1f5f9"
                }
              }}
            />

            <FileInput
              label="Photo Upload (Optional)"
              placeholder="Upload a photo..."
              accept="image/*"
              leftSection={<IconCamera size={16} />}
              value={uploadedFile}
              onChange={setUploadedFile}
              styles={{
                label: { color: "#f1f5f9" },
                input: { 
                  background: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                  color: "#f1f5f9"
                }
              }}
            />

            <Group justify="flex-end" gap="sm">
              <Button
                variant="light"
                color="gray"
                onClick={() => setStepActionModal({ open: false })}
              >
                Cancel
              </Button>
              <Button
                color={stepActionModal.action === 'flag' ? 'red' : 'blue'}
                onClick={() => handleStepAction(stepActionModal.action!)}
              >
                {(() => {
                  if (stepActionModal.action === 'start') return 'Start Step';
                  if (stepActionModal.action === 'complete') return 'Complete Step';
                  return 'Flag Issue';
                })()}
              </Button>
            </Group>
          </Stack>
        </Modal>

      </div>
    </main>
  );
}
