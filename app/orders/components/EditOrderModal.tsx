// Helper to update a line item with a selected part (for PartSelector)
function updateLineItemWithPartSelector(
  lineItems: LineItemForm[],
  index: number,
  part: any
): LineItemForm[] {
  return lineItems.map((li, i) =>
    i === index
      ? {
          ...li,
          partId: part.id,
          partNumber: part.partNumber,
          partName: part.partName,
          drawingNumber: part.drawingNumber || '',
          revisionLevel: part.revisionLevel || '',
        }
      : li
  );
}

function clearLineItemPartSelector(
  lineItems: LineItemForm[],
  index: number
): LineItemForm[] {
  return lineItems.map((li, i) =>
    i === index
      ? {
          ...li,
          partId: '',
          partNumber: '',
          partName: '',
          drawingNumber: '',
          revisionLevel: '',
        }
      : li
  );
}
// Helper to update part fields for a line item when a part is selected

/**
 * EditOrderModal - Edit existing order information
 */

import React, { useState, useEffect } from 'react';
import { PartSelector } from './PartSelector';
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
  Alert,
} from '@mantine/core';
import {
  IconEdit,
  IconTrash,
  IconPlus,
  IconAlertCircle,
} from '@tabler/icons-react';
import type { Order } from '../hooks/useOrderSearch';

interface EditOrderModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  onOrderUpdated?: () => void;
}

interface LineItemForm {
  id?: string; // line item id from backend, optional for new items
  partId: string;
  partNumber: string;
  partName: string;
  drawingNumber: string;
  revisionLevel: string;
  quantity: number;
  unitPrice: number;
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
  { value: 'RUSH', label: 'Rush Priority' },
];

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  opened,
  onClose,
  order,
  onOrderUpdated,
}) => {
  // ...existing code...
  const [form, setForm] = useState<OrderForm>({
    poNumber: '',
    dueDate: '',
    priority: 'STANDARD',
    notes: '',
    lineItems: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // (parts state is not used anymore, remove)

  // Memoize dropdown data for Select

  // Initialize form when order changes
  useEffect(() => {
    if (order) {
      setForm({
        poNumber: order.orderNumber,
        dueDate: order.dueDate,
        priority: order.priority,
        notes: '', // Would need to be added to the Order type if available
        lineItems:
          order.lineItems?.map(item => ({
            id: item.id, // line item id from backend
            partId: item.part.id,
            partNumber: item.part.partNumber,
            partName: item.part.partName,
            drawingNumber: item.part.drawingNumber || '',
            revisionLevel: item.part.revisionLevel || '',
            quantity: item.quantity,
            unitPrice: item.unitPrice ?? 0,
          })) || [],
      });
      setError(null);
    }
  }, [order]);

  // Helper to update part fields for a line item when a part is selected

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
        lineItems: form.lineItems,
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
          id: undefined, // new item, no id yet
          partId: '',
          partNumber: '',
          partName: '',
          drawingNumber: '',
          revisionLevel: '',
          quantity: 1,
          unitPrice: 0,
        },
      ],
    }));
  };

  const handleRemoveLineItem = (index: number) => {
    setForm(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  };

  const handleLineItemChange = (
    index: number,
    field: keyof LineItemForm,
    value: string | number
  ) => {
    setForm(prev => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  if (!order) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap='sm'>
          <IconEdit size={20} />
          <Text fw={600} size='lg'>
            Edit Order - {order.orderId}
          </Text>
        </Group>
      }
      size='xl'
    >
      <Stack gap='lg'>
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color='red'
            variant='light'
          >
            {error}
          </Alert>
        )}

        {/* Order Information */}
        <Card withBorder>
          <Stack gap='md'>
            <Text fw={500} size='md'>
              Order Information
            </Text>
            <Divider />
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  label='PO Number'
                  placeholder='Customer PO number'
                  value={form.poNumber}
                  onChange={e =>
                    setForm(prev => ({ ...prev, poNumber: e.target.value }))
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label='Due Date'
                  placeholder='YYYY-MM-DD'
                  type='date'
                  value={form.dueDate}
                  onChange={e =>
                    setForm(prev => ({ ...prev, dueDate: e.target.value }))
                  }
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label='Priority'
                  placeholder='Select priority'
                  value={form.priority}
                  onChange={value =>
                    setForm(prev => ({ ...prev, priority: value || 'NORMAL' }))
                  }
                  data={priorityOptions}
                  required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea
                  label='Notes'
                  placeholder='Order notes and special instructions'
                  value={form.notes}
                  onChange={e =>
                    setForm(prev => ({ ...prev, notes: e.target.value }))
                  }
                  minRows={3}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>

        {/* Line Items */}
        <Card withBorder>
          <Stack gap='md'>
            <Group justify='space-between'>
              <Text fw={500} size='md'>
                Line Items
              </Text>
              <Button
                leftSection={<IconPlus size={16} />}
                size='sm'
                variant='light'
                onClick={handleAddLineItem}
              >
                Add Item
              </Button>
            </Group>
            <Divider />
            {form.lineItems.length === 0 ? (
              <Text c='dimmed' ta='center' py='md'>
                No line items added yet. Click &quot;Add Item&quot; to get
                started.
              </Text>
            ) : (
              <div style={{ overflowX: 'auto', width: '100%' }}>
                <Table striped style={{ minWidth: 1400 }}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ minWidth: 420, width: 540 }}>
                        Part
                      </Table.Th>
                      <Table.Th style={{ minWidth: 160, width: 180 }}>
                        Drawing #
                      </Table.Th>
                      <Table.Th style={{ minWidth: 120, width: 140 }}>
                        Revision
                      </Table.Th>
                      <Table.Th style={{ minWidth: 120, width: 140 }}>
                        Quantity
                      </Table.Th>
                      <Table.Th style={{ minWidth: 160, width: 180 }}>
                        Unit Price
                      </Table.Th>
                      <Table.Th style={{ minWidth: 80, width: 100 }}>
                        Actions
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {form.lineItems.map((item, index) => (
                      <Table.Tr key={`${item.partId || 'new'}-${index}`}>
                        <Table.Td style={{ minWidth: 420, width: 540 }}>
                          <div style={{ minWidth: 420, width: 540 }}>
                            <PartSelector
                              value={
                                item.partId
                                  ? {
                                      id: item.partId,
                                      partNumber: item.partNumber,
                                      partName: item.partName,
                                      drawingNumber: item.drawingNumber,
                                      revisionLevel: item.revisionLevel,
                                      partType: 'FINISHED', // fallback for type safety
                                    }
                                  : null
                              }
                              onChange={part => {
                                setForm(prev => ({
                                  ...prev,
                                  lineItems: part
                                    ? updateLineItemWithPartSelector(
                                        prev.lineItems,
                                        index,
                                        part
                                      )
                                    : clearLineItemPartSelector(
                                        prev.lineItems,
                                        index
                                      ),
                                }));
                              }}
                              placeholder='Select existing part or create new one'
                              required
                              isPageReady={true}
                            />
                          </div>
                        </Table.Td>
                        <Table.Td style={{ minWidth: 160, width: 180 }}>
                          <TextInput
                            placeholder='Drawing #'
                            value={item.drawingNumber}
                            onChange={e =>
                              handleLineItemChange(
                                index,
                                'drawingNumber',
                                e.target.value
                              )
                            }
                            size='sm'
                          />
                        </Table.Td>
                        <Table.Td style={{ minWidth: 120, width: 140 }}>
                          <TextInput
                            placeholder='Revision'
                            value={item.revisionLevel}
                            onChange={e =>
                              handleLineItemChange(
                                index,
                                'revisionLevel',
                                e.target.value
                              )
                            }
                            size='sm'
                          />
                        </Table.Td>
                        <Table.Td style={{ minWidth: 120, width: 140 }}>
                          <NumberInput
                            placeholder='Qty'
                            value={item.quantity}
                            onChange={value =>
                              handleLineItemChange(
                                index,
                                'quantity',
                                value || 1
                              )
                            }
                            min={1}
                            size='sm'
                          />
                        </Table.Td>
                        <Table.Td style={{ minWidth: 160, width: 180 }}>
                          <NumberInput
                            placeholder='Unit Price'
                            value={item.unitPrice}
                            onChange={value =>
                              handleLineItemChange(
                                index,
                                'unitPrice',
                                value || 0
                              )
                            }
                            min={0}
                            size='sm'
                            step={0.01}
                          />
                        </Table.Td>
                        <Table.Td
                          style={{
                            minWidth: 80,
                            width: 100,
                            textAlign: 'center',
                          }}
                        >
                          <ActionIcon
                            color='red'
                            variant='subtle'
                            onClick={() => handleRemoveLineItem(index)}
                            size='sm'
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </div>
            )}
            <Group justify='flex-end'>
              <Button
                onClick={handleSubmit}
                loading={loading}
                disabled={
                  !form.poNumber || !form.dueDate || form.lineItems.length === 0
                }
              >
                Update Order
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Modal>
  );
};
