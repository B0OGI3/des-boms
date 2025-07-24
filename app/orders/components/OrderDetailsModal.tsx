/**
 * OrderDetailsModal - View detailed information about an order
 */

import React from 'react';
import {
  Modal,
  Text,
  Group,
  Badge,
  Stack,
  Card,
  Divider,
  Grid,
  Table,
  Button,
  ScrollArea
} from '@mantine/core';
import { IconCalendar, IconUser, IconFileText, IconPackage } from '@tabler/icons-react';
import type { Order } from '../hooks/useOrderSearch';

interface OrderDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onEdit?: (order: Order) => void;
}

// Status badge colors
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'PENDING': return 'gray';
    case 'IN_PROGRESS': return 'blue';
    case 'COMPLETED': return 'green';
    case 'ON_HOLD': return 'yellow';
    case 'CANCELLED': return 'red';
    default: return 'gray';
  }
};

// Priority badge colors (aligned with DES-BOMS spec: Rush / Standard / Hold)
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'RUSH': return 'red';        // Urgent priority - red
    case 'STANDARD': return 'blue';   // Normal priority - blue
    case 'HOLD': return 'gray';       // On hold - gray
    // Legacy support for old priority values
    case 'HIGH': return 'orange';
    case 'NORMAL': return 'blue';
    case 'LOW': return 'gray';
    default: return 'gray';
  }
};

// Format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  opened,
  onClose,
  order,
  onEdit
}) => {
  if (!order) return null;

  const progressPercentage = order.assignedBatches > 0 
    ? Math.round((order.completedBatches / order.assignedBatches) * 100) 
    : 0;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconFileText size={20} />
          <Text fw={600} size="lg">Order Details</Text>
        </Group>
      }
      size="xl"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack gap="lg">
        {/* Order Header */}
        <Card withBorder>
          <Grid>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Order ID</Text>
                <Text fw={600} size="lg">{order.orderId}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">PO Number</Text>
                <Text fw={500}>{order.orderNumber}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Customer</Text>
                <Group gap="xs">
                  <IconUser size={16} />
                  <Text fw={500}>{order.customerName}</Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Status & Priority</Text>
                <Group gap="xs">
                  <Badge color={getStatusColor(order.status)} variant="filled">
                    {order.status.replace('_', ' ')}
                  </Badge>
                  <Badge color={getPriorityColor(order.priority)} variant="outline">
                    {order.priority}
                  </Badge>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Dates and Financial Info */}
        <Grid>
          <Grid.Col span={6}>
            <Card withBorder>
              <Stack gap="md">
                <Group gap="xs">
                  <IconCalendar size={18} />
                  <Text fw={500}>Important Dates</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Order Date:</Text>
                    <Text size="sm">{formatDate(order.orderDate)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Due Date:</Text>
                    <Text size="sm" fw={500}>{formatDate(order.dueDate)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Days Until Due:</Text>
                    <Text size="sm" c={
                      (() => {
                        const daysUntilDue = Math.ceil((new Date(order.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        if (daysUntilDue < 0) return 'red';
                        if (daysUntilDue < 7) return 'orange';
                        return 'green';
                      })()
                    }>
                      {Math.ceil((new Date(order.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder>
              <Stack gap="md">
                <Group gap="xs">
                  <IconPackage size={18} />
                  <Text fw={500}>Order Summary</Text>
                </Group>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Total Value:</Text>
                    <Text size="sm" fw={600} c="green">{formatCurrency(order.totalValue)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Line Items:</Text>
                    <Text size="sm">{order.itemCount}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Production Progress:</Text>
                    <Text size="sm">{order.completedBatches} / {order.assignedBatches} batches ({progressPercentage}%)</Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Line Items */}
        {order.lineItems && order.lineItems.length > 0 && (
          <Card withBorder>
            <Stack gap="md">
              <Text fw={500} size="md">Line Items</Text>
              <Divider />
              <ScrollArea>
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Part Number</Table.Th>
                      <Table.Th>Part Name</Table.Th>
                      <Table.Th>Drawing #</Table.Th>
                      <Table.Th>Revision</Table.Th>
                      <Table.Th style={{ textAlign: 'right' }}>Quantity</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {order.lineItems.map((item, index) => (
                      <Table.Tr key={`${item.partNumber}-${index}`}>
                        <Table.Td>
                          <Text fw={500}>{item.partNumber}</Text>
                        </Table.Td>
                        <Table.Td>{item.partName}</Table.Td>
                        <Table.Td>{item.drawingNumber || '-'}</Table.Td>
                        <Table.Td>{item.revisionLevel || '-'}</Table.Td>
                        <Table.Td style={{ textAlign: 'right' }}>
                          <Text fw={500}>{item.quantity.toLocaleString()}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Stack>
          </Card>
        )}

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
          {onEdit && (
            <Button 
              variant="filled" 
              onClick={() => {
                onEdit(order);
                onClose();
              }}
            >
              Edit Order
            </Button>
          )}
        </Group>
      </Stack>
    </Modal>
  );
};
