import React, { useState, useEffect } from 'react';
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Button,
  Modal,
  Textarea,
  NumberInput,
  Divider,
  Progress,
  Grid,
  ActionIcon,
  Timeline,
  Title,
  Alert
} from '@mantine/core';
import { 
  IconPlayerPlay, 
  IconCheck, 
  IconEye,
  IconTools
} from '@tabler/icons-react';

interface WorkOrderItem {
  id: string;
  serialNumber: string;
  itemNumber: number;
  status: string;
  startedAt?: string;
  completedAt?: string;
  currentStepId?: string;
  stepProgress: Array<{
    id: string;
    status: string;
    startedAt?: string;
    completedAt?: string;
    actualTime?: number;
    routingStep: {
      id: string;
      stepNumber: number;
      description: string;
      workstation: {
        name: string;
      };
    };
  }>;
  qualityChecks: Array<{
    id: string;
    checkType: string;
    result: string;
    checkedAt: string;
    notes?: string;
  }>;
}

interface WorkOrderTrackingProps {
  batchId: string;
  workstationId: string;
}

export const WorkOrderTracking: React.FC<WorkOrderTrackingProps> = ({ 
  batchId, 
  workstationId 
}) => {
  const [workOrderItems, setWorkOrderItems] = useState<WorkOrderItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<WorkOrderItem | null>(null);
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    action?: 'start' | 'complete' | 'hold' | 'rework';
    stepId?: string;
  }>({ open: false });
  const [loading, setLoading] = useState(false);
  const [actionNotes, setActionNotes] = useState('');
  const [actualTime, setActualTime] = useState<number>(0);

  // Fetch work order items
  const fetchWorkOrderItems = async () => {
    try {
      const response = await fetch(`/api/batches/${batchId}/work-order-items`);
      if (response.ok) {
        const result = await response.json();
        setWorkOrderItems(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching work order items:', error);
    }
  };

  useEffect(() => {
    if (batchId) {
      fetchWorkOrderItems();
    }
  }, [batchId]);

  // Generate work order items if none exist
  const generateWorkOrderItems = async (quantity: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/batches/${batchId}/work-order-items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });

      if (response.ok) {
        await fetchWorkOrderItems();
      }
    } catch (error) {
      console.error('Error generating work order items:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update step progress
  const updateStepProgress = async () => {
    if (!selectedItem || !actionModal.action || !actionModal.stepId) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/batches/${batchId}/work-order-items/${selectedItem.id}/step-progress`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            routingStepId: actionModal.stepId,
            action: actionModal.action,
            operatorId: 'current-operator',
            notes: actionNotes,
            actualTime: actualTime || undefined
          })
        }
      );

      if (response.ok) {
        await fetchWorkOrderItems();
        setActionModal({ open: false });
        setActionNotes('');
        setActualTime(0);
      }
    } catch (error) {
      console.error('Error updating step progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'QUEUED': return 'gray';
      case 'IN_PROGRESS': return 'blue';
      case 'COMPLETED': return 'green';
      case 'ON_HOLD': return 'yellow';
      case 'REWORK': return 'orange';
      case 'SCRAPPED': return 'red';
      default: return 'gray';
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'gray';
      case 'IN_PROGRESS': return 'blue';
      case 'COMPLETED': return 'green';
      default: return 'gray';
    }
  };

  const calculateProgress = (item: WorkOrderItem) => {
    const completedSteps = item.stepProgress.filter(sp => sp.status === 'COMPLETED').length;
    const totalSteps = item.stepProgress.length;
    return totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  };

  const getCurrentStep = (item: WorkOrderItem) => {
    return item.stepProgress.find(sp => sp.routingStep.id === item.currentStepId);
  };

  const getWorkstationSteps = (item: WorkOrderItem) => {
    return item.stepProgress.filter(
      sp => sp.routingStep.workstation.name === workstationId || 
            workstationId === 'all'
    );
  };

  if (workOrderItems.length === 0) {
    return (
      <Card withBorder>
        <Stack gap="md">
          <Title order={4}>📋 Individual Part Tracking</Title>
          <Alert color="blue">
            <Text>No work order items found for this batch. Generate individual part tracking to monitor each piece through manufacturing.</Text>
          </Alert>
          <Group>
            <NumberInput
              label="Quantity to Track"
              placeholder="Enter number of parts"
              min={1}
              max={100}
              defaultValue={1}
              onChange={(value) => setActualTime(Number(value) || 1)}
            />
            <Button
              onClick={() => generateWorkOrderItems(actualTime || 1)}
              loading={loading}
              leftSection={<IconTools size={16} />}
            >
              Generate Work Orders
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  }

  return (
    <Stack gap="md">
      <Card withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>📋 Individual Part Tracking</Title>
          <Badge size="lg" color="blue">
            {workOrderItems.length} Parts
          </Badge>
        </Group>

        <Grid>
          {workOrderItems.map((item) => {
            const progress = calculateProgress(item);
            const currentStep = getCurrentStep(item);
            const workstationSteps = getWorkstationSteps(item);

            return (
              <Grid.Col span={6} key={item.id}>
                <Card withBorder style={{ height: '100%' }}>
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Group gap="xs">
                        <Text fw={600} size="sm">
                          {item.serialNumber}
                        </Text>
                        <Badge color={getStatusColor(item.status)} size="sm">
                          {item.status}
                        </Badge>
                      </Group>
                      <ActionIcon
                        variant="light"
                        color="blue"
                        onClick={() => setSelectedItem(item)}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                    </Group>

                    <div>
                      <Progress
                        value={progress}
                        color={progress === 100 ? 'green' : 'blue'}
                        size="sm"
                      />
                      <Text size="xs" ta="center" mt={2}>
                        {Math.round(progress)}% Complete
                      </Text>
                    </div>

                    {currentStep && (
                      <Text size="xs" c="dimmed">
                        Current: {currentStep.routingStep.description}
                      </Text>
                    )}

                    {workstationSteps.length > 0 && (
                      <Stack gap="xs">
                        <Text size="xs" fw={500}>At This Workstation:</Text>
                        {workstationSteps.map((step) => (
                          <Group key={step.id} justify="space-between">
                            <Text size="xs">
                              Step {step.routingStep.stepNumber}: {step.routingStep.description}
                            </Text>
                            <Group gap="xs">
                              <Badge color={getStepStatusColor(step.status)} size="xs">
                                {step.status}
                              </Badge>
                              {step.status === 'PENDING' && (
                                <Button
                                  size="xs"
                                  variant="light"
                                  leftSection={<IconPlayerPlay size={12} />}
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setActionModal({
                                      open: true,
                                      action: 'start',
                                      stepId: step.routingStep.id
                                    });
                                  }}
                                >
                                  Start
                                </Button>
                              )}
                              {step.status === 'IN_PROGRESS' && (
                                <Button
                                  size="xs"
                                  variant="light"
                                  color="green"
                                  leftSection={<IconCheck size={12} />}
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setActionModal({
                                      open: true,
                                      action: 'complete',
                                      stepId: step.routingStep.id
                                    });
                                  }}
                                >
                                  Complete
                                </Button>
                              )}
                            </Group>
                          </Group>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Card>

      {/* Detailed Item View Modal */}
      <Modal
        opened={!!selectedItem && !actionModal.open}
        onClose={() => setSelectedItem(null)}
        title={`Work Order: ${selectedItem?.serialNumber}`}
        size="lg"
      >
        {selectedItem && (
          <Stack gap="md">
            <Group>
              <Badge color={getStatusColor(selectedItem.status)}>
                {selectedItem.status}
              </Badge>
              <Text size="sm" c="dimmed">
                Item {selectedItem.itemNumber}
              </Text>
            </Group>

            <Divider label="Manufacturing Progress" />
            
            <Timeline active={selectedItem.stepProgress.findIndex(sp => sp.status === 'IN_PROGRESS')}>
              {selectedItem.stepProgress.map((step) => (
                <Timeline.Item 
                  key={step.id} 
                  color={getStepStatusColor(step.status)}
                  title={`Step ${step.routingStep.stepNumber}: ${step.routingStep.description}`}
                >
                  <Text size="xs" c="dimmed">
                    Workstation: {step.routingStep.workstation.name}
                  </Text>
                  {step.startedAt && (
                    <Text size="xs" c="dimmed">
                      Started: {new Date(step.startedAt).toLocaleString()}
                    </Text>
                  )}
                  {step.completedAt && (
                    <Text size="xs" c="dimmed">
                      Completed: {new Date(step.completedAt).toLocaleString()}
                    </Text>
                  )}
                  {step.actualTime && (
                    <Text size="xs" c="dimmed">
                      Time: {step.actualTime} minutes
                    </Text>
                  )}
                </Timeline.Item>
              ))}
            </Timeline>

            {selectedItem.qualityChecks.length > 0 && (
              <>
                <Divider label="Quality Checks" />
                <Stack gap="xs">
                  {selectedItem.qualityChecks.map((qc) => (
                    <Group key={qc.id} justify="space-between">
                      <Text size="sm">{qc.checkType}</Text>
                      <Badge color={qc.result === 'PASS' ? 'green' : 'red'}>
                        {qc.result}
                      </Badge>
                    </Group>
                  ))}
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Modal>

      {/* Action Modal */}
      <Modal
        opened={actionModal.open}
        onClose={() => setActionModal({ open: false })}
        title={`${actionModal.action?.toUpperCase()} Step`}
      >
        <Stack gap="md">
          <Text size="sm">
            Work Order: {selectedItem?.serialNumber}
          </Text>
          
          <Textarea
            label="Notes"
            placeholder="Add notes about this action..."
            value={actionNotes}
            onChange={(e) => setActionNotes(e.target.value)}
          />

          {actionModal.action === 'complete' && (
            <NumberInput
              label="Actual Time (minutes)"
              placeholder="Time taken to complete"
              value={actualTime}
              onChange={(value) => setActualTime(Number(value) || 0)}
            />
          )}

          <Group justify="flex-end">
            <Button
              variant="light"
              onClick={() => setActionModal({ open: false })}
            >
              Cancel
            </Button>
            <Button
              onClick={updateStepProgress}
              loading={loading}
              color={actionModal.action === 'complete' ? 'green' : 'blue'}
            >
              {actionModal.action?.toUpperCase()}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
