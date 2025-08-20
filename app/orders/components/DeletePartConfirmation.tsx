'use client';

/**
 * DeletePartConfirmation component for confirming part deletion from orders
 */

import React, { useState } from 'react';
import {
  Modal,
  Stack,
  Group,
  Button,
  Text,
  Alert,
  Badge,
  Card,
} from '@mantine/core';
import {
  IconTrash,
  IconAlertTriangle,
  IconInfoCircle,
} from '@tabler/icons-react';

// Types
interface Part {
  id: string;
  partNumber: string;
  partName: string;
  partType: string;
  drawingNumber?: string;
  revisionLevel?: string;
  description?: string;
}

interface LineItem {
  id?: string;
  part: Part;
  quantity: number;
  unitPrice?: number;
  notes?: string;
}

interface Order {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
}

interface DeletePartConfirmationProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  lineItem: LineItem | null;
  onPartDeleted: () => void;
}

export function DeletePartConfirmation({
  opened,
  onClose,
  order,
  lineItem,
  onPartDeleted,
}: Readonly<DeletePartConfirmationProps>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleDelete = async () => {
    if (!order || !lineItem?.id) {
      setError('Missing required information to delete part');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/orders/${order.id}/line-items/${lineItem.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete part from order');
      }

      onPartDeleted();
      onClose();
    } catch (error) {
      console.error('Error deleting part:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete part');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError('');
      onClose();
    }
  };

  if (!order || !lineItem) {
    return null;
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="sm">
          <IconTrash size={20} color="red" />
          <Text fw={600}>Delete Part from Order</Text>
        </Group>
      }
      size="md"
      centered
    >
      <Stack gap="md">
        {/* Warning Alert */}
        <Alert
          icon={<IconAlertTriangle size={16} />}
          color="red"
          variant="light"
        >
          <Text fw={500} mb="xs">This action cannot be undone</Text>
          <Text size="sm">
            The part will be permanently removed from this order. Any associated batches or production records will not be affected.
          </Text>
        </Alert>

        {/* Order Information */}
        <Card withBorder p="md">
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={500} size="sm" c="dimmed">Order Information</Text>
              <Badge color="blue" variant="light">
                {order.orderNumber}
              </Badge>
            </Group>
            <Text size="sm">
              <Text component="span" fw={500}>Customer:</Text> {order.customerName}
            </Text>
          </Stack>
        </Card>

        {/* Part Information */}
        <Card withBorder p="md">
          <Stack gap="sm">
            <Text fw={500} size="sm" c="dimmed">Part to Delete</Text>
            
            <Group justify="space-between" align="center">
              <div>
                <Text fw={600} size="md" style={{ color: '#dc2626' }}>
                  {lineItem.part.partNumber}
                </Text>
                <Text size="sm" c="dimmed">
                  {lineItem.part.partName}
                </Text>
              </div>
              <Badge color="gray" variant="light">
                Qty: {lineItem.quantity}
              </Badge>
            </Group>

            {lineItem.part.drawingNumber && (
              <Text size="sm">
                <Text component="span" fw={500}>Drawing:</Text> {lineItem.part.drawingNumber}
                {lineItem.part.revisionLevel && ` Rev ${lineItem.part.revisionLevel}`}
              </Text>
            )}

            {lineItem.part.description && (
              <Text size="sm" c="dimmed">
                {lineItem.part.description}
              </Text>
            )}
          </Stack>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert
            icon={<IconInfoCircle size={16} />}
            color="red"
            variant="light"
          >
            {error}
          </Alert>
        )}

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button
            variant="light"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={handleDelete}
            loading={loading}
          >
            Delete Part
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
