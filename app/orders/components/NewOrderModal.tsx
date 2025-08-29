'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Stack,
  Group,
  Button,
  TextInput,
  Select,
  Textarea,
  Card,
  Text,
  ActionIcon,
  NumberInput,
  Alert,
  Collapse,
  Badge,
  Box,
} from '@mantine/core';
import {
  IconPlus,
  IconTrash,
  IconCheck,
  IconAlertCircle,
} from '@tabler/icons-react';
import type { Customer } from '../../../types/shared';
import { QuickBooksStatus } from '../../components/ui/QuickBooksStatus';
import { PartSelector } from './PartSelector';

type LineItemForm = {
  partId?: string;
  partNumber: string;
  partName: string;
  quantity: number;
  unitPrice: number;
  dueDate?: string;
  notes?: string;
};

type OrderForm = {
  customerId: string;
  poNumber: string;
  dueDate: string;
  priority: 'HOLD' | 'STANDARD' | 'RUSH';
  notes?: string;
  lineItems: LineItemForm[];
};

export interface NewOrderModalProps {
  opened: boolean;
  onClose: () => void;
  onOrderCreated?: () => void;
  isPageReady?: boolean;
  onAdvancedPartCreation?: () => void;
}

const priorityOptions = [
  { value: 'HOLD', label: 'Hold Priority' },
  { value: 'STANDARD', label: 'Standard Priority' },
  { value: 'RUSH', label: 'Rush Priority' },
];

// Default combobox props used across Select/Autocomplete to stabilize portal/Popper
const DEFAULT_COMBOBOX_PROPS = {
  withinPortal: true,
  middlewares: { flip: false, shift: false },
} as const;

const NewCustomerForm: React.FC<{
  onCustomerCreated: (c: Customer) => void;
  onCancel: () => void;
}> = ({ onCustomerCreated, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Failed to create');
      const created = await res.json();
      onCustomerCreated(created);
    } catch (e) {
      // log and surface a simple alert
      // eslint-disable-next-line no-console
      console.error(e);
      // eslint-disable-next-line no-alert
      alert('Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder>
      <Stack>
        <TextInput
          label='Customer Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Group justify='flex-end'>
          <Button variant='subtle' onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleCreate} loading={loading}>
            Create
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

const LineItemCard: React.FC<{
  index: number;
  item: LineItemForm;
  onRemove: (i: number) => void;
  onUpdate: (i: number, field: keyof LineItemForm, value: any) => void;
  onPartSelect: (i: number, part: any) => void;
  errors?: Record<string, string>;
  isPageReady?: boolean;
  onAdvancedPartCreation?: () => void;
}> = ({
  index,
  item,
  onRemove,
  onUpdate,
  onPartSelect,
  errors,
  isPageReady,
  onAdvancedPartCreation,
}) => {
  return (
    <Card key={`lineitem-${index}-${item.partNumber || 'new'}`} withBorder>
      <Stack gap='md'>
        <Group justify='space-between' align='center'>
          <Badge variant='outline' size='sm'>
            Item {index + 1}
          </Badge>
          <ActionIcon
            color='red'
            variant='subtle'
            onClick={() => onRemove(index)}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>

        <PartSelector
          value={
            item.partId
              ? {
                  id: item.partId,
                  partNumber: item.partNumber,
                  partName: item.partName,
                  partType: 'FINISHED',
                }
              : null
          }
          onChange={p => onPartSelect(index, p)}
          placeholder='Select existing part or create new one'
          error={errors ? errors[`lineItems.${index}.partNumber`] : undefined}
          required
          isPageReady={isPageReady}
          onAdvancedPartCreation={onAdvancedPartCreation}
        />

        <Group grow>
          <NumberInput
            label='Quantity'
            min={1}
            value={item.quantity}
            onChange={v => onUpdate(index, 'quantity', Number(v) || 1)}
          />
          <NumberInput
            label='Unit Price ($)'
            min={0}
            decimalScale={2}
            fixedDecimalScale
            value={item.unitPrice}
            onChange={v => onUpdate(index, 'unitPrice', Number(v) || 0)}
          />
        </Group>

        <Group grow align='flex-start'>
          <TextInput
            label='Item Due Date'
            type='date'
            value={item.dueDate || ''}
            onChange={e => onUpdate(index, 'dueDate', e.target.value)}
          />
          <Textarea
            label='Item Notes'
            value={item.notes || ''}
            onChange={e => onUpdate(index, 'notes', e.target.value)}
          />
        </Group>
      </Stack>
    </Card>
  );
};

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  opened,
  onClose,
  onOrderCreated,
  isPageReady = true,
  onAdvancedPartCreation,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [orderData, setOrderData] = useState<OrderForm>({
    customerId: '',
    poNumber: '',
    dueDate: '',
    priority: 'STANDARD',
    notes: '',
    lineItems: [
      { partId: '', partNumber: '', partName: '', quantity: 1, unitPrice: 0 },
    ],
  });

  useEffect(() => {
    if (!opened) return;
    (async () => {
      try {
        const res = await fetch('/api/customers');
        if (res.ok) setCustomers(await res.json());
      } catch (e) {
        // log and continue
        // eslint-disable-next-line no-console
        console.error(e);
      }
    })();
  }, [opened]);

  const customerOptions = useMemo(
    () =>
      customers.map(c => ({
        value: c.id,
        label: c.email ? `${c.name} (${c.email})` : c.name,
      })),
    [customers]
  );

  const memoPriorityOptions = useMemo(() => priorityOptions, []);

  const addLineItem = useCallback(() => {
    setOrderData(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { partId: '', partNumber: '', partName: '', quantity: 1, unitPrice: 0 },
      ],
    }));
  }, []);

  const removeLineItem = useCallback((i: number) => {
    setOrderData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, idx) => idx !== i),
    }));
  }, []);

  const updateLineItem = useCallback(
    (i: number, field: keyof LineItemForm, v: any) => {
      setOrderData(prev => {
        const items = [...prev.lineItems];
        items[i] = { ...items[i], [field]: v } as LineItemForm;
        return { ...prev, lineItems: items };
      });
    },
    []
  );

  const handlePartSelect = useCallback(
    (i: number, part: any) => {
      updateLineItem(i, 'partId', part ? part.id : '');
      updateLineItem(i, 'partNumber', part ? part.partNumber : '');
      updateLineItem(i, 'partName', part ? part.partName : '');
    },
    [updateLineItem]
  );

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!orderData.customerId) errs.customerId = 'Customer required';
    if (!orderData.poNumber) errs.poNumber = 'PO required';
    if (!orderData.dueDate) errs.dueDate = 'Due date required';
    orderData.lineItems.forEach((li, idx) => {
      if (!li.partNumber) errs[`lineItems.${idx}.partNumber`] = 'Part required';
      if (!li.quantity || li.quantity <= 0)
        errs[`lineItems.${idx}.quantity`] = 'Quantity must be > 0';
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [orderData]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error('Failed');
      onOrderCreated?.();
      onClose();
    } catch (e) {
      // log the error and surface a simple alert
      // eslint-disable-next-line no-console
      console.error(e);
      // eslint-disable-next-line no-alert
      alert('Failed to create order');
    } finally {
      setSubmitting(false);
    }
  }, [orderData, onClose, onOrderCreated, validate]);

  return (
    <Modal opened={opened} onClose={onClose} title='Create New Order' size='xl'>
      <Stack>
        <Card withBorder>
          <Stack>
            <Group>
              <Select
                label='Customer'
                placeholder='Select customer'
                data={customerOptions}
                comboboxProps={DEFAULT_COMBOBOX_PROPS}
                maxDropdownHeight={300}
                searchable
                value={orderData.customerId}
                onChange={v =>
                  setOrderData(prev => ({ ...prev, customerId: v || '' }))
                }
                error={errors.customerId}
              />
              <Button
                size='sm'
                onClick={() => setShowNewCustomer(s => !s)}
                leftSection={<IconPlus size={14} />}
              >
                {showNewCustomer ? 'Cancel' : 'New Customer'}
              </Button>
            </Group>

            <Collapse in={showNewCustomer}>
              <Box>
                <NewCustomerForm
                  onCustomerCreated={c => {
                    setCustomers(prev => [c, ...prev]);
                    setOrderData(prev => ({ ...prev, customerId: c.id }));
                    setShowNewCustomer(false);
                  }}
                  onCancel={() => setShowNewCustomer(false)}
                />
              </Box>
            </Collapse>

            <Group>
              <TextInput
                label='PO Number'
                value={orderData.poNumber}
                onChange={e =>
                  setOrderData(prev => ({ ...prev, poNumber: e.target.value }))
                }
              />
              <TextInput
                label='Due Date'
                type='date'
                value={orderData.dueDate}
                onChange={e =>
                  setOrderData(prev => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </Group>

            <Textarea
              label='Notes'
              value={orderData.notes}
              onChange={e =>
                setOrderData(prev => ({ ...prev, notes: e.target.value }))
              }
            />

            <Group>
              <Select
                label='Priority'
                data={memoPriorityOptions}
                value={orderData.priority}
                onChange={v =>
                  setOrderData(prev => ({
                    ...prev,
                    priority: (v as OrderForm['priority']) || 'STANDARD',
                  }))
                }
                comboboxProps={DEFAULT_COMBOBOX_PROPS}
                maxDropdownHeight={200}
              />
              <QuickBooksStatus compact showActions />
            </Group>
          </Stack>
        </Card>

        <Card withBorder>
          <Stack>
            <Group justify='space-between'>
              <Text fw={600}>Line Items</Text>
              <Button
                size='sm'
                onClick={addLineItem}
                leftSection={<IconPlus size={14} />}
              >
                Add
              </Button>
            </Group>

            {orderData.lineItems.length === 0 && (
              <Alert icon={<IconAlertCircle size={16} />} color='blue'>
                Add at least one line item to create the order.
              </Alert>
            )}

            <Stack>
              {orderData.lineItems.map((li, idx) => (
                <LineItemCard
                  key={`li-${idx}-${li.partNumber || 'new'}`}
                  index={idx}
                  item={li}
                  onRemove={removeLineItem}
                  onUpdate={updateLineItem}
                  onPartSelect={handlePartSelect}
                  errors={errors}
                  isPageReady={isPageReady}
                  onAdvancedPartCreation={onAdvancedPartCreation}
                />
              ))}
            </Stack>
          </Stack>
        </Card>

        <Group justify='flex-end'>
          <Button variant='subtle' onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={submitting}
            leftSection={<IconCheck size={16} />}
          >
            Create Order
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
