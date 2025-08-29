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
  Checkbox,
} from '@mantine/core';
import {
  IconPlus,
  IconTrash,
  IconCheck,
  IconAlertCircle,
  IconBuilding,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconTruck,
  IconNotes,
  IconInfoCircle,
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    billingAddress: '',
    shippingAddress: '',
    notes: '',
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Update shipping address when billing address changes and sameAsBilling is checked
  useEffect(() => {
    if (sameAsBilling) {
      setFormData(prev => ({ ...prev, shippingAddress: prev.billingAddress }));
    }
  }, [formData.billingAddress, sameAsBilling]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company/Customer name is required';
    }

    // Email is now optional, but if provided, validate format
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\d\s\-+().]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create customer');
      }

      const created = await res.json();
      onCustomerCreated(created);
    } catch (error) {
      console.error('Error creating customer:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create customer';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Card withBorder shadow='sm' p='lg' radius='md'>
      <Stack gap='lg'>
        {errors.submit && (
          <Alert color='red' icon={<IconAlertCircle size={16} />} radius='md'>
            {errors.submit}
          </Alert>
        )}

        {/* Company Information */}
        <Card withBorder shadow='xs' p='md' radius='md' bg='gray.0'>
          <Stack gap='md'>
            <Group gap='xs'>
              <IconBuilding
                size={18}
                style={{ color: 'var(--mantine-color-blue-6)' }}
              />
              <Text fw={600} size='sm' c='blue.7'>
                Company Information
              </Text>
            </Group>

            <TextInput
              label='Company/Customer Name'
              placeholder='Enter company or customer name'
              value={formData.name}
              onChange={e => updateFormData('name', e.target.value)}
              error={errors.name}
              required
              leftSection={<IconBuilding size={16} />}
              size='md'
              radius='md'
            />

            <TextInput
              label='Contact Name'
              placeholder='Primary contact person (optional)'
              value={formData.contactName}
              onChange={e => updateFormData('contactName', e.target.value)}
              leftSection={<IconUser size={16} />}
              size='md'
              radius='md'
            />

            <Group grow>
              <TextInput
                label='Email'
                placeholder='customer@company.com (optional)'
                type='email'
                value={formData.email}
                onChange={e => updateFormData('email', e.target.value)}
                error={errors.email}
                leftSection={<IconMail size={16} />}
                size='md'
                radius='md'
              />

              <TextInput
                label='Phone'
                placeholder='(555) 123-4567 (optional)'
                value={formData.phone}
                onChange={e => updateFormData('phone', e.target.value)}
                error={errors.phone}
                leftSection={<IconPhone size={16} />}
                size='md'
                radius='md'
              />
            </Group>
          </Stack>
        </Card>

        {/* Address Information */}
        <Card withBorder shadow='xs' p='md' radius='md' bg='blue.0'>
          <Stack gap='md'>
            <Group gap='xs'>
              <IconMapPin
                size={18}
                style={{ color: 'var(--mantine-color-green-6)' }}
              />
              <Text fw={600} size='sm' c='green.7'>
                Address Information
              </Text>
            </Group>

            <Textarea
              label='Billing Address'
              placeholder='Street address, City, State, ZIP (optional)'
              value={formData.billingAddress}
              onChange={e => updateFormData('billingAddress', e.target.value)}
              autosize
              minRows={3}
              leftSection={<IconMapPin size={16} />}
              size='md'
              radius='md'
            />

            <Group gap='xs' align='center'>
              <Checkbox
                checked={sameAsBilling}
                onChange={e => setSameAsBilling(e.currentTarget.checked)}
                size='md'
                color='green'
              />
              <Text size='sm' fw={500}>
                Shipping address same as billing
              </Text>
            </Group>

            <Textarea
              label='Shipping Address'
              placeholder='Street address, City, State, ZIP (optional)'
              value={formData.shippingAddress}
              onChange={e => updateFormData('shippingAddress', e.target.value)}
              autosize
              minRows={3}
              disabled={sameAsBilling}
              leftSection={<IconTruck size={16} />}
              size='md'
              radius='md'
            />
          </Stack>
        </Card>

        {/* Additional Information */}
        <Card withBorder shadow='xs' p='md' radius='md' bg='orange.0'>
          <Stack gap='md'>
            <Group gap='xs'>
              <IconNotes
                size={18}
                style={{ color: 'var(--mantine-color-orange-6)' }}
              />
              <Text fw={600} size='sm' c='orange.7'>
                Additional Information
              </Text>
            </Group>

            <Textarea
              label='Notes'
              placeholder='Additional notes about this customer (optional)'
              value={formData.notes}
              onChange={e => updateFormData('notes', e.target.value)}
              autosize
              minRows={2}
              leftSection={<IconNotes size={16} />}
              size='md'
              radius='md'
            />
          </Stack>
        </Card>

        {/* Action Buttons */}
        <Group justify='flex-end' gap='md' mt='md'>
          <Button
            variant='light'
            onClick={onCancel}
            disabled={loading}
            size='md'
            radius='md'
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            loading={loading}
            leftSection={<IconCheck size={16} />}
            disabled={!formData.name.trim()}
            size='md'
            radius='md'
            color='blue'
          >
            Create Customer
          </Button>
        </Group>

        {/* Help Text */}
        <Alert color='blue' icon={<IconInfoCircle size={16} />} radius='md'>
          <Text size='sm' fw={500}>
            This customer will be automatically synced to QuickBooks when
            created. Only the company name is required for seamless integration.
          </Text>
        </Alert>
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
        label: c.name,
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
                renderOption={({ option }) => {
                  const customer = customers.find(c => c.id === option.value);
                  return (
                    <Group gap='xs'>
                      <div>
                        <Text size='sm' fw={500}>
                          {customer?.contactName
                            ? `${customer.name} (${customer.contactName})`
                            : customer?.name || option.label}
                        </Text>
                        {customer?.email && (
                          <Text size='xs' c='dimmed'>
                            {customer.email}
                          </Text>
                        )}
                      </div>
                    </Group>
                  );
                }}
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
