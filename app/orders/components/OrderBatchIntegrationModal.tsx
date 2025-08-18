import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Group,
  Text,
  Stack,
  Badge,
  Table,
  Progress,
  Tabs,
  ActionIcon,
  Tooltip,
  Card,
  Alert,
  Center,
  Loader,
} from '@mantine/core';
import { IconEye, IconSettings, IconTruck, IconClock, IconUser } from '@tabler/icons-react';
import type { Order } from '../hooks/useOrderSearch';

interface OrderBatchIntegrationModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onNavigateToBatch?: (batchId: string) => void;
  onNavigateToWorkstation?: (workstationId: string) => void;
}

interface BatchDetail {
  id: string;
  batchId: string;
  quantity: number;
  status: 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  startDate?: string;
  estimatedCompletion?: string;
  actualCompletion?: string;
  lineItem: {
    id: string;
    part: {
      partNumber: string;
      partName: string;
      drawingNumber?: string;
    };
  };
  routingSteps: Array<{
    id: string;
    stepNumber: number;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED';
    workstation: {
      id: string;
      name: string;
    };
    estimatedTime?: number;
    confirmations: Array<{
      operatorName: string;
      startTime: string;
      endTime?: string;
      status: string;
    }>;
  }>;
}

export const OrderBatchIntegrationModal: React.FC<OrderBatchIntegrationModalProps> = ({
  opened,
  onClose,
  order,
  onNavigateToBatch,
  onNavigateToWorkstation,
}) => {
  const [batches, setBatches] = useState<BatchDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Fetch batch details when modal opens
  useEffect(() => {
    if (opened && order) {
      fetchBatchDetails();
    }
  }, [opened, order]);

  const fetchBatchDetails = async () => {
    if (!order) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/orders/${order.id}/batches`);
      const result = await response.json();
      
      if (result.success) {
        setBatches(result.data);
      }
    } catch (error) {
      console.error('Error fetching batch details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'green';
      case 'IN_PROGRESS': return 'blue';
      case 'QUEUED': case 'PENDING': return 'gray';
      case 'ON_HOLD': return 'yellow';
      case 'CANCELLED': case 'FAILED': return 'red';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'RUSH': return 'red';
      case 'STANDARD': return 'blue';
      case 'HOLD': return 'gray';
      default: return 'gray';
    }
  };

  const calculateBatchProgress = (batch: BatchDetail) => {
    const completedSteps = batch.routingSteps.filter(step => step.status === 'COMPLETED').length;
    const totalSteps = batch.routingSteps.length;
    return totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  };

  const getOverallProgress = () => {
    if (batches.length === 0) return 0;
    const totalProgress = batches.reduce((sum, batch) => sum + calculateBatchProgress(batch), 0);
    return totalProgress / batches.length;
  };

  const getCurrentWorkstations = () => {
    const activeSteps = batches.flatMap(batch => 
      batch.routingSteps.filter(step => step.status === 'IN_PROGRESS')
    );
    return activeSteps;
  };

  if (!order) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <Text size="lg" fw={600}>
            Manufacturing Progress: {order.orderId}
          </Text>
          <Badge color="blue" variant="light">
            {order.customerName}
          </Badge>
        </Group>
      }
      size="xl"
      centered
    >
      <Stack gap="md">
        {loading ? (
          <Center style={{ minHeight: '200px' }}>
            <div style={{ textAlign: 'center' }}>
              <Loader size="md" />
              <Text size="sm" c="dimmed" mt="md">Loading batch details...</Text>
            </div>
          </Center>
        ) : (
          <>
        {/* Order Summary */}
        <Card withBorder>
          <Group justify="space-between" style={{ marginBottom: '12px' }}>
            <div>
              <Text fw={500}>{order.orderNumber}</Text>
              <Text size="sm" c="dimmed">Due: {order.dueDate}</Text>
            </div>
            <Group gap="sm">
              <Badge color={getPriorityColor(order.priority)} variant="light">
                {order.priority}
              </Badge>
              <Badge color={getStatusColor(order.status)} variant="filled">
                {order.status}
              </Badge>
            </Group>
          </Group>
          
          <div>
            <Text size="sm" c="dimmed" mb="xs">
              Overall Progress: {Math.round(getOverallProgress())}%
            </Text>
            <Progress 
              value={getOverallProgress()} 
              color="blue" 
              size="lg" 
              radius="md"
            />
          </div>
        </Card>

        {/* Tabs for different views */}
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'overview')}>
          <Tabs.List>
            <Tabs.Tab value="overview" leftSection={<IconEye size="0.8rem" />}>
              Overview
            </Tabs.Tab>
            <Tabs.Tab value="batches" leftSection={<IconSettings size="0.8rem" />}>
              Batches ({batches.length})
            </Tabs.Tab>
            <Tabs.Tab value="workstations" leftSection={<IconTruck size="0.8rem" />}>
              Active Workstations
            </Tabs.Tab>
          </Tabs.List>

          {/* Overview Tab */}
          <Tabs.Panel value="overview" pt="md">
            <Stack gap="md">
              <Group gap="xl">
                <div>
                  <Text size="sm" c="dimmed">Total Batches</Text>
                  <Text size="xl" fw={600}>{batches.length}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Completed Batches</Text>
                  <Text size="xl" fw={600} c="green">
                    {batches.filter(b => b.status === 'COMPLETED').length}
                  </Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">In Progress</Text>
                  <Text size="xl" fw={600} c="blue">
                    {batches.filter(b => b.status === 'IN_PROGRESS').length}
                  </Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Rush Batches</Text>
                  <Text size="xl" fw={600} c="red">
                    {batches.filter(b => b.priority === 'RUSH').length}
                  </Text>
                </div>
              </Group>

              {getCurrentWorkstations().length > 0 && (
                <Alert color="blue" title="Currently Active Workstations">
                  <Stack gap="xs">
                    {getCurrentWorkstations().map((step) => (
                      <Group key={step.id} justify="space-between">
                        <Text size="sm">{step.workstation.name}: {step.description}</Text>
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() => onNavigateToWorkstation?.(step.workstation.id)}
                        >
                          View
                        </Button>
                      </Group>
                    ))}
                  </Stack>
                </Alert>
              )}
            </Stack>
          </Tabs.Panel>

          {/* Batches Tab */}
          <Tabs.Panel value="batches" pt="md">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Batch ID</Table.Th>
                  <Table.Th>Part</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Progress</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {batches.map((batch) => (
                  <Table.Tr key={batch.id}>
                    <Table.Td>
                      <Text fw={500}>{batch.batchId}</Text>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm" fw={500}>{batch.lineItem.part.partNumber}</Text>
                        <Text size="xs" c="dimmed">{batch.lineItem.part.partName}</Text>
                      </div>
                    </Table.Td>
                    <Table.Td>{batch.quantity}</Table.Td>
                    <Table.Td>
                      <Badge color={getStatusColor(batch.status)} size="sm">
                        {batch.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Progress 
                        value={calculateBatchProgress(batch)} 
                        size="sm"
                        color={batch.priority === 'RUSH' ? 'red' : 'blue'}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="View Batch Details">
                          <ActionIcon
                            variant="subtle"
                            size="sm"
                            onClick={() => onNavigateToBatch?.(batch.id)}
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Tabs.Panel>

          {/* Workstations Tab */}
          <Tabs.Panel value="workstations" pt="md">
            <Stack gap="md">
              {getCurrentWorkstations().length === 0 ? (
                <Text c="dimmed" ta="center" py="xl">
                  No active workstations for this order
                </Text>
              ) : (
                getCurrentWorkstations().map((step) => (
                  <Card key={step.id} withBorder>
                    <Group justify="space-between">
                      <div>
                        <Group gap="sm">
                          <Text fw={500}>{step.workstation.name}</Text>
                          <Badge size="sm" color="blue">Step {step.stepNumber}</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">{step.description}</Text>
                        {step.confirmations.length > 0 && (
                          <Group gap="xs" mt="xs">
                            <IconUser size={14} />
                            <Text size="xs" c="dimmed">
                              {step.confirmations[0].operatorName}
                            </Text>
                            {step.estimatedTime && (
                              <>
                                <IconClock size={14} />
                                <Text size="xs" c="dimmed">
                                  {step.estimatedTime} min est.
                                </Text>
                              </>
                            )}
                          </Group>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={() => onNavigateToWorkstation?.(step.workstation.id)}
                      >
                        Go to Workstation
                      </Button>
                    </Group>
                  </Card>
                ))
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="light" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onNavigateToBatch?.('all')}>
            View All Batches
          </Button>
        </Group>
        </>
        )}
      </Stack>
    </Modal>
  );
};
