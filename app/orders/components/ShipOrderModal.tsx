import React, { useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Text,
  Textarea,
  TextInput,
  Alert,
  Stack,
  Badge,
  Loader,
  Select,
} from '@mantine/core';
import type { Order } from '../hooks/useOrderSearch';

// Helper functions for UI logic
const getStatusBadgeColor = (orderStatus: string, canShip: boolean | null): string => {
  if (orderStatus === 'SHIPPED') return 'blue';
  return canShip ? 'green' : 'orange';
};

const getPriorityBadgeColor = (priority: string): string => {
  switch (priority) {
    case 'RUSH': return 'red';
    case 'HOLD': return 'gray';
    default: return 'blue';
  }
};

const getAlertColor = (messageType: string): string => {
  switch (messageType) {
    case 'success': return 'green';
    case 'info': return 'blue';
    default: return 'orange';
  }
};

const getAlertTitle = (messageType: string): string => {
  switch (messageType) {
    case 'success': return 'Ready to Ship';
    case 'info': return 'Already Shipped';
    default: return 'Cannot Ship Yet';
  }
};

interface ShipOrderModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderShipped?: () => void;
}

const CARRIERS = [
  { value: 'UPS', label: 'UPS' },
  { value: 'FedEx', label: 'FedEx' },
  { value: 'USPS', label: 'USPS' },
  { value: 'DHL', label: 'DHL' },
  { value: 'OnTrac', label: 'OnTrac' },
  { value: 'Local Delivery', label: 'Local Delivery' },
  { value: 'Customer Pickup', label: 'Customer Pickup' },
  { value: 'Other', label: 'Other' },
];

export const ShipOrderModal: React.FC<ShipOrderModalProps> = ({
  opened,
  onClose,
  order,
  onOrderShipped,
}) => {
  const [shippedBy, setShippedBy] = useState('');
  const [carrier, setCarrier] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingNotes, setShippingNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!order || !shippedBy.trim()) {
      setError('Operator name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${order.id}/ship`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippedBy: shippedBy.trim(),
          carrier: carrier || undefined,
          trackingNumber: trackingNumber.trim() || undefined,
          shippingNotes: shippingNotes.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to ship order');
      }

      // Success
      onOrderShipped?.();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to ship order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShippedBy('');
    setCarrier('');
    setTrackingNumber('');
    setShippingNotes('');
    setError(null);
    onClose();
  };

  // Check if order can be shipped
  const canShip = order && order.orderStatus === 'COMPLETED';

  const getStatusMessage = () => {
    if (!order) return null;
    
    if (order.orderStatus === 'SHIPPED') {
      return {
        type: 'info',
        message: `Order was shipped on ${order.shippedAt ? new Date(order.shippedAt).toLocaleDateString() : 'unknown date'} by ${order.shippedBy || 'unknown'}`,
      };
    }
    
    if (order.orderStatus !== 'COMPLETED') {
      return {
        type: 'warning',
        message: 'Order must be completed before shipping',
      };
    }
    
    return {
      type: 'success',
      message: 'Order is ready for shipping',
    };
  };

  const statusMessage = getStatusMessage();

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="sm">
          <Text size="lg" fw={600}>
            Ship Order
          </Text>
          {order && (
            <Badge 
              color={getStatusBadgeColor(order.orderStatus, canShip)}
              variant="light"
            >
              {order.orderStatus}
            </Badge>
          )}
        </Group>
      }
      size="md"
      centered
    >
      {!order ? (
        <Text c="dimmed">No order selected</Text>
      ) : (
        <Stack gap="md">
          {/* Order Summary */}
          <div style={{
            background: 'rgba(248, 249, 250, 0.5)',
            border: '1px solid rgba(206, 212, 218, 0.3)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <Group justify="space-between" style={{ marginBottom: '12px' }}>
              <Text fw={500}>{order.orderId}</Text>
              <Badge color="blue" variant="light">
                {order.customerName}
              </Badge>
            </Group>
            
            <Group gap="xl">
              <div>
                <Text size="sm" c="dimmed">Completed</Text>
                <Text size="sm">
                  {order.completedAt ? new Date(order.completedAt).toLocaleDateString() : 'Not completed'}
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Priority</Text>
                <Badge 
                  color={getPriorityBadgeColor(order.priority)}
                  variant="light"
                  size="sm"
                >
                  {order.priority}
                </Badge>
              </div>
              <div>
                <Text size="sm" c="dimmed">Total Value</Text>
                <Text size="sm">${order.totalValue.toLocaleString()}</Text>
              </div>
            </Group>
          </div>

          {/* Status Alert */}
          {statusMessage && (
            <Alert
              color={getAlertColor(statusMessage.type)}
              title={getAlertTitle(statusMessage.type)}
            >
              {statusMessage.message}
            </Alert>
          )}

          {/* Form Fields - only show if can ship */}
          {canShip && (
            <>
              <TextInput
                label="Shipped By"
                placeholder="Enter operator name or ID"
                value={shippedBy}
                onChange={(e) => setShippedBy(e.target.value)}
                required
                error={error && !shippedBy.trim() ? 'Operator name is required' : null}
              />

              <Select
                label="Carrier"
                placeholder="Select shipping carrier"
                value={carrier}
                onChange={(value) => setCarrier(value || '')}
                data={CARRIERS}
                searchable
                clearable
              />

              <TextInput
                label="Tracking Number"
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />

              <Textarea
                label="Shipping Notes"
                placeholder="Enter shipping details, special instructions, etc."
                value={shippingNotes}
                onChange={(e) => setShippingNotes(e.target.value)}
                minRows={3}
                maxRows={5}
              />
            </>
          )}

          {/* Show existing shipping info if already shipped */}
          {order.orderStatus === 'SHIPPED' && (
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <Text fw={500} style={{ marginBottom: '8px' }}>Shipping Information:</Text>
              <Stack gap="xs">
                <div>
                  <Text size="sm" c="dimmed">Shipped By:</Text>
                  <Text size="sm">{order.shippedBy}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Shipped Date:</Text>
                  <Text size="sm">
                    {order.shippedAt ? new Date(order.shippedAt).toLocaleString() : 'Unknown'}
                  </Text>
                </div>
                {/* Note: We'll need to parse shipping notes to extract carrier/tracking */}
              </Stack>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert color="red" title="Error">
              {error}
            </Alert>
          )}

          {/* Action Buttons */}
          <Group justify="flex-end" gap="sm">
            <Button
              variant="light"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              {order?.orderStatus === 'SHIPPED' ? 'Close' : 'Cancel'}
            </Button>
            
            {canShip && (
              <Button
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={!shippedBy.trim()}
                color="blue"
                leftSection={isSubmitting ? <Loader size="sm" /> : '🚚'}
              >
                {isSubmitting ? 'Shipping...' : 'Ship Order'}
              </Button>
            )}
          </Group>
        </Stack>
      )}
    </Modal>
  );
};
