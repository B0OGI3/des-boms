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
  List,
  Loader,
} from '@mantine/core';
import type { Order } from '../hooks/useOrderSearch';

// Helper function to determine badge color
const getBadgeColor = (priority: string): string => {
  switch (priority) {
    case 'RUSH': return 'red';
    case 'HOLD': return 'gray';
    default: return 'blue';
  }
};

// Helper function to check if order can be completed
const canCompleteOrder = (order: Order | null): boolean => {
  return !!(order && 
    order.orderStatus === 'ACTIVE' && 
    order.assignedBatches > 0 && 
    order.completedBatches === order.assignedBatches);
};

// Helper function to get status message
const getOrderStatusMessage = (order: Order | null) => {
  if (!order) return null;
  
  if (order.orderStatus !== 'ACTIVE') {
    return {
      type: 'warning' as const,
      message: `Order is already ${order.orderStatus.toLowerCase()}`,
    };
  }
  
  if (order.assignedBatches === 0) {
    return {
      type: 'warning' as const,
      message: 'No batches have been created for this order yet',
    };
  }
  
  if (order.completedBatches < order.assignedBatches) {
    const remaining = order.assignedBatches - order.completedBatches;
    return {
      type: 'warning' as const,
      message: `${remaining} batch(es) still need to be completed`,
    };
  }
  
  return {
    type: 'success' as const,
    message: 'All batches completed - ready to complete order',
  };
};

// Helper function to validate form inputs
const validateCompletionForm = (order: Order | null, completedBy: string): string | null => {
  if (!order) return 'No order selected';
  if (!completedBy.trim()) return 'Operator name is required';
  return null;
};

// Helper function to make completion API call
const submitOrderCompletion = async (order: Order, completedBy: string, completionNotes: string) => {
  const response = await fetch(`/api/orders/${order.id}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completedBy: completedBy.trim(),
      completionNotes: completionNotes.trim() || undefined,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to complete order');
  }

  return result;
};

interface CompleteOrderModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderCompleted?: () => void;
}

// Subcomponent for order summary section
const OrderSummarySection: React.FC<{ order: Order }> = ({ order }) => (
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
        <Text size="sm" c="dimmed">Batches</Text>
        <Text fw={500}>
          {order.completedBatches} / {order.assignedBatches} completed
        </Text>
      </div>
      <div>
        <Text size="sm" c="dimmed">Priority</Text>
        <Badge 
          color={getBadgeColor(order.priority)}
          variant="light"
          size="sm"
        >
          {order.priority}
        </Badge>
      </div>
      <div>
        <Text size="sm" c="dimmed">Due Date</Text>
        <Text size="sm">{order.dueDate || 'Not set'}</Text>
      </div>
    </Group>
  </div>
);

// Subcomponent for status alert section
const StatusAlertSection: React.FC<{ statusMessage: { type: 'success' | 'warning'; message: string } | null }> = ({ statusMessage }) => {
  if (!statusMessage) return null;
  
  return (
    <Alert
      color={statusMessage.type === 'success' ? 'green' : 'orange'}
      title={statusMessage.type === 'success' ? 'Ready to Complete' : 'Cannot Complete Yet'}
    >
      {statusMessage.message}
    </Alert>
  );
};

// Subcomponent for completion requirements section
const CompletionRequirementsSection: React.FC<{ order: Order }> = ({ order }) => (
  <div>
    <Text size="sm" fw={500} style={{ marginBottom: '8px' }}>
      Completion Requirements:
    </Text>
    <List size="sm" spacing="xs">
      <List.Item 
        icon={order.assignedBatches > 0 ? '✅' : '❌'}
        style={{ color: order.assignedBatches > 0 ? 'green' : 'red' }}
      >
        Batches Created ({order.assignedBatches} total)
      </List.Item>
      <List.Item 
        icon={order.completedBatches === order.assignedBatches ? '✅' : '❌'}
        style={{ color: order.completedBatches === order.assignedBatches ? 'green' : 'red' }}
      >
        All Batches Completed ({order.completedBatches}/{order.assignedBatches})
      </List.Item>
      <List.Item 
        icon={order.orderStatus === 'ACTIVE' ? '✅' : '❌'}
        style={{ color: order.orderStatus === 'ACTIVE' ? 'green' : 'red' }}
      >
        Order Status: {order.orderStatus}
      </List.Item>
    </List>
  </div>
);

// Subcomponent for completion form section
const CompletionFormSection: React.FC<{
  completedBy: string;
  setCompletedBy: (value: string) => void;
  completionNotes: string;
  setCompletionNotes: (value: string) => void;
  error: string | null;
  canComplete: boolean;
}> = ({ completedBy, setCompletedBy, completionNotes, setCompletionNotes, error, canComplete }) => (
  <Stack gap="sm">
    <TextInput
      label="Completed By (Operator Name)"
      placeholder="Enter operator name..."
      value={completedBy}
      onChange={(e) => setCompletedBy(e.target.value)}
      required
      error={error && !completedBy.trim() ? 'Operator name is required' : null}
      disabled={!canComplete}
    />
    
    <Textarea
      label="Completion Notes (Optional)"
      placeholder="Enter any additional completion notes..."
      value={completionNotes}
      onChange={(e) => setCompletionNotes(e.target.value)}
      minRows={3}
      maxRows={6}
      disabled={!canComplete}
    />
  </Stack>
);

// Custom hook for order completion form logic
const useOrderCompletion = (order: Order | null, onOrderCompleted?: () => void, onClose?: () => void) => {
  const [completedBy, setCompletedBy] = useState('');
  const [completionNotes, setCompletionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const validationError = validateCompletionForm(order, completedBy);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitOrderCompletion(order!, completedBy, completionNotes);
      onOrderCompleted?.();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCompletedBy('');
    setCompletionNotes('');
    setError(null);
    onClose?.();
  };

  return {
    completedBy,
    setCompletedBy,
    completionNotes,
    setCompletionNotes,
    isSubmitting,
    error,
    handleSubmit,
    handleClose,
  };
};

// Subcomponent for modal header
const ModalHeader: React.FC<{ order: Order | null; canComplete: boolean }> = ({ order, canComplete }) => (
  <Group gap="sm">
    <Text size="lg" fw={600}>
      Complete Order
    </Text>
    {order && (
      <Badge 
        color={canComplete ? 'green' : 'orange'}
        variant="light"
      >
        {order.orderStatus}
      </Badge>
    )}
  </Group>
);

// Subcomponent for modal content
const ModalContent: React.FC<{
  order: Order;
  statusMessage: ReturnType<typeof getOrderStatusMessage>;
  canComplete: boolean;
  completedBy: string;
  setCompletedBy: (value: string) => void;
  completionNotes: string;
  setCompletionNotes: (value: string) => void;
  error: string | null;
  isSubmitting: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
}> = ({ 
  order, 
  statusMessage, 
  canComplete, 
  completedBy, 
  setCompletedBy, 
  completionNotes, 
  setCompletionNotes, 
  error, 
  isSubmitting, 
  handleSubmit, 
  handleClose 
}) => (
  <Stack gap="md">
    <OrderSummarySection order={order} />
    <StatusAlertSection statusMessage={statusMessage} />
    <CompletionRequirementsSection order={order} />
    
    {canComplete && (
      <CompletionFormSection
        completedBy={completedBy}
        setCompletedBy={setCompletedBy}
        completionNotes={completionNotes}
        setCompletionNotes={setCompletionNotes}
        error={error}
        canComplete={canComplete}
      />
    )}

    {error && (
      <Alert color="red" title="Error">
        {error}
      </Alert>
    )}

    <Group justify="flex-end" gap="sm">
      <Button
        variant="light"
        onClick={handleClose}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      
      {canComplete && (
        <Button
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!completedBy.trim()}
          color="green"
          leftSection={isSubmitting ? <Loader size="sm" /> : '✅'}
        >
          {isSubmitting ? 'Completing...' : 'Complete Order'}
        </Button>
      )}
    </Group>
  </Stack>
);

export const CompleteOrderModal: React.FC<CompleteOrderModalProps> = ({
  opened,
  onClose,
  order,
  onOrderCompleted,
}) => {
  const {
    completedBy,
    setCompletedBy,
    completionNotes,
    setCompletionNotes,
    isSubmitting,
    error,
    handleSubmit,
    handleClose,
  } = useOrderCompletion(order, onOrderCompleted, onClose);

  const canComplete = canCompleteOrder(order);
  const statusMessage = getOrderStatusMessage(order);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={<ModalHeader order={order} canComplete={canComplete} />}
      size="md"
      centered
    >
      {!order ? (
        <Text c="dimmed">No order selected</Text>
      ) : (
        <ModalContent
          order={order}
          statusMessage={statusMessage}
          canComplete={canComplete}
          completedBy={completedBy}
          setCompletedBy={setCompletedBy}
          completionNotes={completionNotes}
          setCompletionNotes={setCompletionNotes}
          error={error}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      )}
    </Modal>
  );
};
