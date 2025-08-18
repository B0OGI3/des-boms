/**
 * DES-BOMS Workstation Management - No Login Required
 * 
 * Streamlined workstation management interface for immediate access to all 
 * DES-BOMS manufacturing functionality without any authentication barriers.
 * 
 * Core DES-BOMS Features:
 * - Direct workstation selection and job queue access
 * - Complete routing step management (start/complete/flag)
 * - Photo uploads and detailed notes for documentation  
 * - Real-time job queue updates and status tracking
 * - Part number, customer, and priority information display
 * - Manufacturing workflow control optimized for efficiency
 * 
 * No authentication required - select workstation and immediately begin managing
 * manufacturing operations with full DES-BOMS capability.
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
  FileInput,
  Switch
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconPlayerPlay, IconCheck, IconFlag, IconCamera, IconRefresh, IconPlus, IconEdit } from "@tabler/icons-react";
import { LoadingScreen } from "../components/LoadingScreen";
import { usePageInitialization } from "../../hooks/usePageInitialization";

interface Workstation {
  id: string;
  name: string;
  description: string;
  active: boolean;
  category?: string;
  location?: string;
  status?: 'ACTIVE' | 'IDLE' | 'MAINTENANCE';
  activeJobs?: number;
  queuedJobs?: number;
}

interface RoutingStep {
  id: string;
  stepNumber: number;
  description: string;
  estimatedTime: number; // Consistent with our WorkflowStep interface
  notes?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FLAGGED' | 'FAILED';
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
  // Page initialization
  const { isPageReady, pageInitialization, initializePage, getProgress } = usePageInitialization({
    initialTasks: ['workstations', 'routing', 'components'],
    autoStart: false
  });

  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState<string>('');
  const [routingSteps, setRoutingSteps] = useState<RoutingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [stepActionModal, setStepActionModal] = useState<{
    open: boolean;
    step?: RoutingStep;
    action?: 'start' | 'complete' | 'flag';
  }>({ open: false });
  const [workstationModal, setWorkstationModal] = useState<{
    open: boolean;
    workstation?: Workstation;
    mode: 'add' | 'edit';
  }>({ open: false, mode: 'add' });
  const [actionNotes, setActionNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Workstation form state
  const [workstationForm, setWorkstationForm] = useState({
    name: '',
    description: '',
    category: 'MACHINING',
    location: '',
    active: true
  });

  // Initialize page with data fetching
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    initializePage([
      { 
        name: 'workstations', 
        fn: async () => {
          const response = await fetch('/api/workstations');
          if (response.ok) {
            const result = await response.json();
            setWorkstations(result.data || []);
          }
        }
      },
      { name: 'routing' },
      { name: 'components' }
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  // Handle workstation creation/update
  const handleWorkstationSave = async () => {
    try {
      const url = '/api/workstations';
      const method = workstationModal.mode === 'add' ? 'POST' : 'PUT';
      const body = workstationModal.mode === 'edit' 
        ? { ...workstationForm, id: workstationModal.workstation?.id }
        : workstationForm;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Refresh workstations list
        const workstationsResponse = await fetch('/api/workstations');
        if (workstationsResponse.ok) {
          const result = await workstationsResponse.json();
          setWorkstations(result.data || []);
        }
        
        // Close modal and reset form
        setWorkstationModal({ open: false, mode: 'add' });
        setWorkstationForm({
          name: '',
          description: '',
          category: 'MACHINING',
          location: '',
          active: true
        });
      }
    } catch (error) {
      console.error('Error saving workstation:', error);
    }
  };

  // Open workstation modal for editing
  const handleEditWorkstation = (workstation: Workstation) => {
    setWorkstationForm({
      name: workstation.name,
      description: workstation.description || '',
      category: workstation.category || 'MACHINING',
      location: workstation.location || '',
      active: workstation.active
    });
    setWorkstationModal({ open: true, mode: 'edit', workstation });
  };

  // Open workstation modal for adding
  const handleAddWorkstation = () => {
    setWorkstationForm({
      name: '',
      description: '',
      category: 'MACHINING',
      location: '',
      active: true
    });
    setWorkstationModal({ open: true, mode: 'add' });
  };

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
    if (!stepActionModal.step) return;

    try {
      const formData = new FormData();
      formData.append('stepId', stepActionModal.step.id);
      formData.append('workstationId', selectedWorkstation);
      formData.append('operatorName', 'Admin');
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

  if (!isPageReady) {
    return <LoadingScreen 
      title="Loading Workstations"
      description="Initializing workstation management..."
      icon="🏭"
      pageInitialization={pageInitialization}
      progress={getProgress()}
    />;
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
            🏭 DES-BOMS Workstation Management
          </Title>
          <Text size="lg" style={{ color: "#cbd5e1" }}>
            Complete manufacturing job queue control and routing step management
          </Text>
        </div>

        {/* Workstation Management */}
        <Card withBorder style={{ 
          background: "rgba(30, 41, 59, 0.85)",
          border: "1px solid rgba(51, 65, 85, 0.7)",
          marginBottom: 32
        }}>
          <Group justify="space-between" align="center" mb="md">
            <Title order={3} style={{ color: "#f1f5f9" }}>
              ⚙️ Manage Workstations
            </Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddWorkstation}
              color="green"
              variant="filled"
            >
              Add Workstation
            </Button>
          </Group>
          
          <Grid>
            {workstations.map((workstation) => (
              <Grid.Col span={4} key={workstation.id}>
                <Card withBorder style={{
                  background: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                }}>
                  <Group justify="space-between" align="flex-start">
                    <div style={{ flex: 1 }}>
                      <Group gap="sm" mb="xs">
                        <Text fw={600} style={{ color: "#f1f5f9" }}>
                          {workstation.name}
                        </Text>
                        <Badge 
                          color={workstation.active ? "green" : "red"} 
                          variant="filled"
                        >
                          {workstation.active ? "Active" : "Inactive"}
                        </Badge>
                      </Group>
                      <Text size="sm" style={{ color: "#cbd5e1" }}>
                        {workstation.description}
                      </Text>
                      {workstation.category && (
                        <Text size="xs" style={{ color: "#94a3b8" }}>
                          Type: {workstation.category}
                        </Text>
                      )}
                      {workstation.location && (
                        <Text size="xs" style={{ color: "#94a3b8" }}>
                          Location: {workstation.location}
                        </Text>
                      )}
                    </div>
                    <ActionIcon
                      color="blue"
                      variant="light"
                      onClick={() => handleEditWorkstation(workstation)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Card>

        {/* Workstation Selection */}
        <Card withBorder style={{ 
          background: "rgba(30, 41, 59, 0.85)",
          border: "1px solid rgba(51, 65, 85, 0.7)",
          marginBottom: 32
        }}>
          <Title order={3} style={{ color: "#f1f5f9", marginBottom: 16 }}>
            🏭 Workstation Control
          </Title>
          <Grid>
            <Grid.Col span={8}>
              <Select
                label="Select Workstation to Manage"
                placeholder="Choose a workstation"
                value={selectedWorkstation}
                onChange={(value) => setSelectedWorkstation(value || '')}
                data={workstations.map(ws => ({ 
                  value: ws.id, 
                  label: `${ws.name} - ${ws.description}` 
                }))}
                size="lg"
                styles={{
                  label: { color: "#f1f5f9", fontSize: "16px", fontWeight: 600 },
                  input: { 
                    background: "rgba(51, 65, 85, 0.5)",
                    border: "1px solid rgba(71, 85, 105, 0.5)",
                    color: "#f1f5f9",
                    fontSize: "16px"
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <div style={{ paddingTop: 30 }}>
                <Button
                  leftSection={<IconRefresh size={16} />}
                  onClick={() => window.location.reload()}
                  variant="light"
                  color="blue"
                  size="lg"
                  fullWidth
                >
                  Refresh All Data
                </Button>
              </div>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Batch Integration Info */}
        {selectedWorkstation && (
          <Card withBorder style={{ 
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            marginBottom: 32
          }}>
            <Title order={4} style={{ color: "#10b981", marginBottom: 12 }}>
              📦 How Workstations Work with Batches
            </Title>
            <Text style={{ color: "#059669", marginBottom: 8 }}>
              <strong>Workflow:</strong> Orders → Batches → Routing Steps → Workstations
            </Text>
            <Text size="sm" style={{ color: "#047857" }}>
              • Each batch (created from orders) contains routing steps assigned to specific workstations<br/>
              • Routing steps appear in this workstation's job queue when assigned<br/>
              • Complete routing steps here to move batches through the manufacturing process<br/>
              • All step actions are tracked and linked back to the original batch and order
            </Text>
            <Group gap="sm" mt="md">
              <Button
                component="a"
                href="/batches"
                variant="light"
                color="green"
                size="sm"
              >
                View All Batches
              </Button>
              <Button
                component="a"
                href="/orders"
                variant="light"
                color="blue"
                size="sm"
              >
                View Orders
              </Button>
            </Group>
          </Card>
        )}

        {/* Job Queue */}
        {selectedWorkstation ? (
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
          <Alert color="blue" style={{
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)"
          }}>
            <Text style={{ color: "#93c5fd" }}>
              👆 Select a workstation above to view and manage its job queue.
            </Text>
          </Alert>
        )}

        {/* Workstation Add/Edit Modal */}
        <Modal
          opened={workstationModal.open}
          onClose={() => setWorkstationModal({ open: false, mode: 'add' })}
          title={
            <Text fw={600} style={{ color: "#f1f5f9" }}>
              {workstationModal.mode === 'add' ? 'Add New Workstation' : 'Edit Workstation'}
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
            <TextInput
              label="Workstation Name"
              placeholder="e.g., LATHE-1, MILL-2"
              value={workstationForm.name}
              onChange={(event) => setWorkstationForm(prev => ({ 
                ...prev, 
                name: event.target.value 
              }))}
              required
              styles={{
                label: { color: "#f1f5f9" },
                input: { 
                  background: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                  color: "#f1f5f9"
                }
              }}
            />
            
            <Textarea
              label="Description"
              placeholder="Describe the workstation capabilities..."
              value={workstationForm.description}
              onChange={(event) => setWorkstationForm(prev => ({ 
                ...prev, 
                description: event.target.value 
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

            <Select
              label="Category"
              value={workstationForm.category}
              onChange={(value) => setWorkstationForm(prev => ({ 
                ...prev, 
                category: value || 'MACHINING' 
              }))}
              data={[
                { value: 'MACHINING', label: 'Machining' },
                { value: 'ASSEMBLY', label: 'Assembly' },
                { value: 'WELDING', label: 'Welding' },
                { value: 'INSPECTION', label: 'Inspection' },
                { value: 'PACKAGING', label: 'Packaging' },
                { value: 'PREP', label: 'Preparation' },
                { value: 'FINISHING', label: 'Finishing' },
                { value: 'OTHER', label: 'Other' }
              ]}
              styles={{
                label: { color: "#f1f5f9" },
                input: { 
                  background: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgba(71, 85, 105, 0.5)",
                  color: "#f1f5f9"
                }
              }}
            />

            <TextInput
              label="Location (Optional)"
              placeholder="e.g., Building A, Bay 3"
              value={workstationForm.location}
              onChange={(event) => setWorkstationForm(prev => ({ 
                ...prev, 
                location: event.target.value 
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

            <Switch
              label="Active"
              checked={workstationForm.active}
              onChange={(event) => setWorkstationForm(prev => ({ 
                ...prev, 
                active: event.currentTarget.checked 
              }))}
              styles={{
                label: { color: "#f1f5f9" }
              }}
            />

            <Group justify="flex-end" gap="sm">
              <Button
                variant="light"
                color="gray"
                onClick={() => setWorkstationModal({ open: false, mode: 'add' })}
              >
                Cancel
              </Button>
              <Button
                color="blue"
                onClick={handleWorkstationSave}
              >
                {workstationModal.mode === 'add' ? 'Add Workstation' : 'Update Workstation'}
              </Button>
            </Group>
          </Stack>
        </Modal>

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
              onChange={(event) => setActionNotes(event.target.value)}
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
