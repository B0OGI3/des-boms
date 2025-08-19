/**
 * DeleteOrderConfirmation - Confirmation dialog for deleting orders
 * Aligned with DES-BOMS safety requirements for manufacturing operations
 */

import React, { useState } from 'react';
import {
  Modal,
  Text,
  Group,
  Stack,
  Button,
  Alert,
  Card,
  Badge,
  Divider
} from '@mantine/core';
import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import type { Order } from '../hooks/useOrderSearch';

interface DeleteOrderConfirmationProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderDeleted?: () => void;
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

// Priority badge colors
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'RUSH': return 'red';
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

export const DeleteOrderConfirmation: React.FC<DeleteOrderConfirmationProps> = ({
  opened,
  onClose,
  order,
  onOrderDeleted
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!order) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          // If response isn't JSON, use status text
          errorData = { error: response.statusText || 'Delete failed' };
        }
        console.error('Delete error response:', errorData);
        throw new Error(errorData.error || 'Failed to delete order');
      }

      // Only try to consume response if it was successful
      try {
        await response.json();
      } catch {
        // Response might be empty, which is fine for a successful delete
        console.log('Delete successful (empty response)');
      }

      onOrderDeleted?.();
      onClose();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete order');
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  const hasInProgressWork = order.status === 'IN_PROGRESS' || order.completedBatches > 0;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconTrash size={20} color="red" />
          <Text fw={600} size="lg" c="red">Delete Order</Text>
        </Group>
      }
      size="md"
    >
      <Stack gap="lg">
        {error && (
          <Alert icon={<IconAlertTriangle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}

        {/* Warning Message */}
        <Alert icon={<IconAlertTriangle size={16} />} color="orange" variant="light">
          <Text fw={500}>This action cannot be undone!</Text>
          <Text size="sm" mt="xs">
            Deleting this order will permanently remove it from the system along with all associated data.
          </Text>
        </Alert>

        {/* Order Summary */}
        <Card withBorder>
          <Stack gap="sm">
            <Text fw={500} size="md">Order to be deleted:</Text>
            <Divider />
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Order ID:</Text>
              <Text size="sm" fw={500}>{order.orderId}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Customer:</Text>
              <Text size="sm">{order.customerName}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">PO Number:</Text>
              <Text size="sm">{order.orderNumber}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Status:</Text>
              <Badge color={getStatusColor(order.status)} variant="filled" size="sm">
                {order.status.replace('_', ' ')}
              </Badge>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Priority:</Text>
              <Badge color={getPriorityColor(order.priority)} variant="outline" size="sm">
                {order.priority}
              </Badge>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Total Value:</Text>
              <Text size="sm" fw={500} c="green">{formatCurrency(order.totalValue)}</Text>
            </Group>
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Line Items:</Text>
              <Text size="sm">{order.itemCount}</Text>
            </Group>
            {order.assignedBatches > 0 && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">Production Batches:</Text>
                <Text size="sm">{order.completedBatches} / {order.assignedBatches} completed</Text>
              </Group>
            )}
          </Stack>
        </Card>

        {/* Additional Warning for In-Progress Orders */}
        {hasInProgressWork && (
          <Alert icon={<IconAlertTriangle size={16} />} color="red" variant="light">
            <Text fw={500} c="red">Warning: Production Work Detected</Text>
            <Text size="sm" mt="xs">
              This order has {order.status === 'IN_PROGRESS' ? 'work in progress' : 'completed batches'}. 
              Deleting this order may affect production tracking and historical records.
            </Text>
          </Alert>
        )}

        {/* Confirmation Input */}
        <Card withBorder style={{ backgroundColor: '#fef2f2' }}>
          <Text size="sm" c="dimmed" mb="xs">
            To confirm deletion, please verify the order ID:
          </Text>
          <Text fw={600} size="lg" ta="center" c="red">
            {order.orderId}
          </Text>
        </Card>

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            color="red"
            onClick={handleDelete} 
            loading={loading}
            leftSection={<IconTrash size={16} />}
          >
            Delete Order
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
