/**
 * EditOrderModal - Edit existing order information
 */

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  Group,
  Stack,
  TextInput,
  Select,
  Textarea,
  Button,
  Grid,
  Card,
  Divider,
  Table,
  ActionIcon,
  NumberInput,
  Alert
} from '@mantine/core';
import { IconEdit, IconTrash, IconPlus, IconAlertCircle } from '@tabler/icons-react';
import type { Order } from '../hooks/useOrderSearch';

interface EditOrderModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderUpdated?: () => void;
}

interface LineItemForm {
  partNumber: string;
  partName: string;
  drawingNumber: string;
  revisionLevel: string;
  quantity: number;
}

interface OrderForm {
  poNumber: string;
  dueDate: string;
  priority: string;
  notes: string;
  lineItems: LineItemForm[];
}

const priorityOptions = [
  { value: 'HOLD', label: 'Hold Priority' },
  { value: 'STANDARD', label: 'Standard Priority' },
  { value: 'RUSH', label: 'Rush Priority' }
];

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  opened,
  onClose,
  order,
  onOrderUpdated
}) => {
  const [form, setForm] = useState<OrderForm>({
    poNumber: '',
    dueDate: '',
    priority: 'STANDARD',
    notes: '',
    lineItems: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form when order changes
  useEffect(() => {
    if (order) {
      setForm({
        poNumber: order.orderNumber,
        dueDate: order.dueDate,
        priority: order.priority,
        notes: '', // Would need to be added to the Order type if available
        lineItems: order.lineItems?.map(item => ({
          partNumber: item.partNumber,
          partName: item.partName,
          drawingNumber: item.drawingNumber || '',
          revisionLevel: item.revisionLevel || '',
          quantity: item.quantity
        })) || []
      });
      setError(null);
    }
  }, [order]);

  const handleSubmit = async () => {
    if (!order) return;

    try {
      setLoading(true);
      setError(null);

      const updateData = {
        poNumber: form.poNumber,
        dueDate: form.dueDate,
        priority: form.priority,
        notes: form.notes,
        lineItems: form.lineItems
      };

      const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update order');
      }

      onOrderUpdated?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLineItem = () => {
    setForm(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        {
          partNumber: '',
          partName: '',
          drawingNumber: '',
          revisionLevel: '',
          quantity: 1
        }
      ]
    }));
  };

  const handleRemoveLineItem = (index: number) => {
    setForm(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index)
    }));
  };

  const handleLineItemChange = (index: number, field: keyof LineItemForm, value: string | number) => {
    setForm(prev => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  if (!order) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconEdit size={20} />
          <Text fw={600} size="lg">Edit Order - {order.orderId}</Text>
        </Group>
      }
      size="xl"
    >
      <Stack gap="lg">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}

        {/* Order Information */}
        <Card withBorder>
          <Stack gap="md">
            <Text fw={500} size="md">Order Information</Text>
            <Divider />
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label="PO Number"
                  placeholder="Customer PO number"
                  value={form.poNumber}
                  onChange={(e) => setForm(prev => ({ ...prev, poNumber: e.target.value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Due Date"
                  placeholder="YYYY-MM-DD"
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Priority"
                  placeholder="Select priority"
                  value={form.priority}
                  onChange={(value) => setForm(prev => ({ ...prev, priority: value || 'NORMAL' }))}
                  data={priorityOptions}
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label="Notes"
                  placeholder="Order notes and special instructions"
                  value={form.notes}
                  onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                  minRows={3}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>

        {/* Line Items */}
        <Card withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={500} size="md">Line Items</Text>
              <Button
                leftSection={<IconPlus size={16} />}
                size="sm"
                variant="light"
                onClick={handleAddLineItem}
              >
                Add Item
              </Button>
            </Group>
            <Divider />
            
            {form.lineItems.length === 0 ? (
              <Text c="dimmed" ta="center" py="md">
                No line items added yet. Click &quot;Add Item&quot; to get started.
              </Text>
            ) : (
              <Table striped>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Part Number</Table.Th>
                    <Table.Th>Part Name</Table.Th>
                    <Table.Th>Drawing #</Table.Th>
                    <Table.Th>Revision</Table.Th>
                    <Table.Th style={{ width: '100px' }}>Quantity</Table.Th>
                    <Table.Th style={{ width: '60px' }}>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {form.lineItems.map((item, index) => (
                    <Table.Tr key={`${item.partNumber || 'new'}-${index}`}>
                      <Table.Td>
                        <TextInput
                          placeholder="Part number"
                          value={item.partNumber}
                          onChange={(e) => handleLineItemChange(index, 'partNumber', e.target.value)}
                          size="sm"
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          placeholder="Part name"
                          value={item.partName}
                          onChange={(e) => handleLineItemChange(index, 'partName', e.target.value)}
                          size="sm"
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          placeholder="Drawing #"
                          value={item.drawingNumber}
                          onChange={(e) => handleLineItemChange(index, 'drawingNumber', e.target.value)}
                          size="sm"
                        />
                      </Table.Td>
                      <Table.Td>
                        <TextInput
                          placeholder="Revision"
                          value={item.revisionLevel}
                          onChange={(e) => handleLineItemChange(index, 'revisionLevel', e.target.value)}
                          size="sm"
                        />
                      </Table.Td>
                      <Table.Td>
                        <NumberInput
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(value) => handleLineItemChange(index, 'quantity', value || 1)}
                          min={1}
                          size="sm"
                        />
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => handleRemoveLineItem(index)}
                          size="sm"
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}
          </Stack>
        </Card>

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={loading}
            disabled={!form.poNumber || !form.dueDate || form.lineItems.length === 0}
          >
            Update Order
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
