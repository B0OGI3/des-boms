'use client';

/**
 * NewOrderModal component for creating new customer orders
 * Includes embedded customer creation functionality
 */

import React, { useState, useEffect } from 'react';
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
  IconUser, 
  IconChevronDown,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react';
import type { Customer } from '../../../types/shared';

// Form interfaces
interface LineItemForm {
  partNumber: string;
  partName: string;
  drawingNumber: string;
  revisionLevel: string;
  quantity: number;
  unitPrice: number;
  dueDate: string;
  notes: string;
}

interface CustomerForm {
  name: string;
  contactName: string;
  email: string;
  phone: string;
  billingAddress: string;
  shippingAddress: string;
}

interface OrderForm {
  customerId: string;
  poNumber: string;
  dueDate: string;
  priority: 'HOLD' | 'STANDARD' | 'RUSH';
  notes: string;
  lineItems: LineItemForm[];
}

export interface NewOrderModalProps {
  opened: boolean;
  onClose: () => void;
  onOrderCreated?: () => void;
}

// Priority options (aligned with DES-BOMS spec: Rush / Standard / Hold)
const priorityOptions = [
  { value: 'HOLD', label: 'Hold Priority' },
  { value: 'STANDARD', label: 'Standard Priority' },
  { value: 'RUSH', label: 'Rush Priority' },
];

// Embedded customer creation component
interface NewCustomerFormProps {
  onCustomerCreated: (customer: Customer) => void;
  onCancel: () => void;
}

const NewCustomerForm: React.FC<NewCustomerFormProps> = ({ onCustomerCreated, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerForm>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    billingAddress: '',
    shippingAddress: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!customerData.name) {
      newErrors.name = 'Customer name is required';
    }
    
    if (!customerData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCustomer = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerData.name,
          contact: customerData.contactName,
          email: customerData.email,
          phone: customerData.phone,
          billingAddress: customerData.billingAddress,
          shippingAddress: customerData.shippingAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create customer');
      }

      const newCustomer = await response.json();
      alert('Customer created successfully!');
      onCustomerCreated(newCustomer);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder style={{ background: 'rgba(239, 246, 255, 0.5)' }}>
      <Stack gap="md">
        <Group gap="xs">
          <IconUser size={20} style={{ color: '#3b82f6' }} />
          <Text fw={600} size="sm" style={{ color: '#1e40af' }}>
            Create New Customer
          </Text>
        </Group>

        <Group grow>
          <TextInput
            label="Customer Name"
            placeholder="Company or individual name"
            required
            value={customerData.name}
            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            error={errors.name}
          />
          <TextInput
            label="Contact Person"
            placeholder="Primary contact name"
            value={customerData.contactName}
            onChange={(e) => setCustomerData({ ...customerData, contactName: e.target.value })}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Email"
            placeholder="contact@company.com"
            required
            value={customerData.email}
            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
            error={errors.email}
          />
          <TextInput
            label="Phone"
            placeholder="(555) 123-4567"
            value={customerData.phone}
            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
          />
        </Group>

        <TextInput
          label="Billing Address"
          placeholder="Street address, City, State, ZIP"
          value={customerData.billingAddress}
          onChange={(e) => setCustomerData({ ...customerData, billingAddress: e.target.value })}
        />

        <TextInput
          label="Shipping Address"
          placeholder="If different from billing address"
          value={customerData.shippingAddress}
          onChange={(e) => setCustomerData({ ...customerData, shippingAddress: e.target.value })}
        />

        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateCustomer}
            loading={loading}
            leftSection={<IconCheck size={16} />}
          >
            Create Customer
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

// Main NewOrderModal component
export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  opened,
  onClose,
  onOrderCreated,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [orderData, setOrderData] = useState<OrderForm>({
    customerId: '',
    poNumber: '',
    dueDate: '',
    priority: 'STANDARD',
    notes: '',
    lineItems: [
      {
        partNumber: '',
        partName: '',
        drawingNumber: '',
        revisionLevel: '',
        quantity: 1,
        unitPrice: 0,
        dueDate: '',
        notes: '',
      }
    ],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch customers on modal open
  useEffect(() => {
    if (opened) {
      fetchCustomers();
    }
  }, [opened]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const customersData = await response.json();
        setCustomers(customersData);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCustomerCreated = (newCustomer: Customer) => {
    setCustomers(prev => [...prev, newCustomer]);
    setOrderData({ ...orderData, customerId: newCustomer.id });
    setShowNewCustomer(false);
  };

  const addLineItem = () => {
    setOrderData({
      ...orderData,
      lineItems: [
        ...orderData.lineItems,
        {
          partNumber: '',
          partName: '',
          drawingNumber: '',
          revisionLevel: '',
          quantity: 1,
          unitPrice: 0,
          dueDate: '',
          notes: '',
        }
      ]
    });
  };

  const removeLineItem = (index: number) => {
    const newLineItems = orderData.lineItems.filter((_, i) => i !== index);
    setOrderData({ ...orderData, lineItems: newLineItems });
  };

  const updateLineItem = (index: number, field: keyof LineItemForm, value: string | number) => {
    const newLineItems = [...orderData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    setOrderData({ ...orderData, lineItems: newLineItems });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!orderData.customerId) {
      newErrors.customerId = 'Customer is required';
    }
    if (!orderData.poNumber) {
      newErrors.poNumber = 'PO Number is required';
    }
    if (!orderData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    orderData.lineItems.forEach((item, index) => {
      if (!item.partNumber) {
        newErrors[`lineItems.${index}.partNumber`] = 'Part number is required';
      }
      if (!item.partName) {
        newErrors[`lineItems.${index}.partName`] = 'Part name is required';
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`lineItems.${index}.quantity`] = 'Quantity must be greater than 0';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: orderData.customerId,
          poNumber: orderData.poNumber,
          dueDate: orderData.dueDate,
          priority: orderData.priority,
          notes: orderData.notes,
          lineItems: orderData.lineItems.map(item => ({
            partNumber: item.partNumber,
            partName: item.partName,
            drawingNumber: item.drawingNumber,
            revisionLevel: item.revisionLevel,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            dueDate: item.dueDate,
            notes: item.notes,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      alert('Order created successfully!');
      onOrderCreated?.();
      handleClose();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create order');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOrderData({
      customerId: '',
      poNumber: '',
      dueDate: '',
      priority: 'STANDARD',
      notes: '',
      lineItems: [
        {
          partNumber: '',
          partName: '',
          drawingNumber: '',
          revisionLevel: '',
          quantity: 1,
          unitPrice: 0,
          dueDate: '',
          notes: '',
        }
      ],
    });
    setShowNewCustomer(false);
    setErrors({});
    onClose();
  };

  const customerOptions = customers.map(customer => ({
    value: customer.id,
    label: `${customer.name} (${customer.email})`,
  }));

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Create New Order"
      size="xl"
      styles={{
        content: { maxHeight: '90vh', overflow: 'hidden' },
        body: { height: 'calc(90vh - 60px)', overflow: 'auto', padding: '24px' },
      }}
    >
      <Stack gap="lg">
        {/* Order Information */}
        <Card withBorder>
          <Stack gap="md">
            <Text fw={600} size="sm" c="dimmed">
              Order Information
            </Text>

            <Group grow>
              <div>
                <Group gap="xs" mb="xs">
                  <Select
                    label="Customer"
                    placeholder="Select customer"
                    data={customerOptions}
                    searchable
                    required
                    value={orderData.customerId}
                    onChange={(value) => setOrderData({ ...orderData, customerId: value || '' })}
                    error={errors.customerId}
                    style={{ flex: 1 }}
                  />
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => setShowNewCustomer(!showNewCustomer)}
                    style={{ marginTop: '24px' }}
                    leftSection={showNewCustomer ? <IconChevronDown size={16} /> : <IconPlus size={16} />}
                  >
                    {showNewCustomer ? 'Cancel' : 'New Customer'}
                  </Button>
                </Group>

                <Collapse in={showNewCustomer}>
                  <Box mb="md">
                    <NewCustomerForm
                      onCustomerCreated={handleCustomerCreated}
                      onCancel={() => setShowNewCustomer(false)}
                    />
                  </Box>
                </Collapse>
              </div>
            </Group>

            <Group grow>
              <TextInput
                label="PO Number"
                placeholder="Customer purchase order number"
                required
                value={orderData.poNumber}
                onChange={(e) => setOrderData({ ...orderData, poNumber: e.target.value })}
                error={errors.poNumber}
              />
              <Select
                label="Priority"
                data={priorityOptions}
                required
                value={orderData.priority}
                onChange={(value) => setOrderData({ ...orderData, priority: (value as 'HOLD' | 'STANDARD' | 'RUSH') || 'STANDARD' })}
              />
            </Group>

            <Group grow align="flex-start">
              <TextInput
                label="Due Date"
                type="date"
                required
                value={orderData.dueDate}
                onChange={(e) => setOrderData({ ...orderData, dueDate: e.target.value })}
                error={errors.dueDate}
              />
              <Textarea
                label="Order Notes"
                placeholder="Additional notes or special instructions"
                value={orderData.notes}
                onChange={(e) => setOrderData({ ...orderData, notes: e.target.value })}
              />
            </Group>
          </Stack>
        </Card>

        {/* Line Items */}
        <Card withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Text fw={600} size="sm" c="dimmed">
                Line Items ({orderData.lineItems.length})
              </Text>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconPlus size={16} />}
                onClick={addLineItem}
              >
                Add Item
              </Button>
            </Group>

            {orderData.lineItems.length === 0 && (
              <Alert icon={<IconAlertCircle size={16} />} color="blue">
                Add at least one line item to create the order.
              </Alert>
            )}

            <Stack gap="md">
              {orderData.lineItems.map((item, index) => (
                <Card key={`lineitem-${index}-${item.partNumber || 'new'}`} withBorder style={{ background: 'rgba(248, 250, 252, 0.5)' }}>
                  <Stack gap="md">
                    <Group justify="space-between" align="center">
                      <Badge variant="outline" size="sm">
                        Item {index + 1}
                      </Badge>
                      {orderData.lineItems.length > 1 && (
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => removeLineItem(index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      )}
                    </Group>

                    <Group grow>
                      <TextInput
                        label="Part Number"
                        placeholder="SKU or part identifier"
                        required
                        value={item.partNumber}
                        onChange={(e) => updateLineItem(index, 'partNumber', e.target.value)}
                        error={errors[`lineItems.${index}.partNumber`]}
                      />
                      <TextInput
                        label="Part Name"
                        placeholder="Description of the part"
                        required
                        value={item.partName}
                        onChange={(e) => updateLineItem(index, 'partName', e.target.value)}
                        error={errors[`lineItems.${index}.partName`]}
                      />
                    </Group>

                    <Group grow>
                      <TextInput
                        label="Drawing Number"
                        placeholder="Engineering drawing reference"
                        value={item.drawingNumber}
                        onChange={(e) => updateLineItem(index, 'drawingNumber', e.target.value)}
                      />
                      <TextInput
                        label="Revision Level"
                        placeholder="Rev A, Rev 01, etc."
                        value={item.revisionLevel}
                        onChange={(e) => updateLineItem(index, 'revisionLevel', e.target.value)}
                      />
                    </Group>

                    <Group grow>
                      <NumberInput
                        label="Quantity"
                        placeholder="Number of units"
                        min={1}
                        required
                        value={item.quantity}
                        onChange={(value) => updateLineItem(index, 'quantity', Number(value) || 1)}
                        error={errors[`lineItems.${index}.quantity`]}
                      />
                      <NumberInput
                        label="Unit Price ($)"
                        placeholder="0.00"
                        min={0}
                        decimalScale={2}
                        fixedDecimalScale
                        value={item.unitPrice}
                        onChange={(value) => updateLineItem(index, 'unitPrice', Number(value) || 0)}
                      />
                    </Group>

                    <Group grow align="flex-start">
                      <TextInput
                        label="Item Due Date"
                        type="date"
                        placeholder="If different from order due date"
                        value={item.dueDate}
                        onChange={(e) => updateLineItem(index, 'dueDate', e.target.value)}
                      />
                      <Textarea
                        label="Item Notes"
                        placeholder="Specific notes for this item"
                        value={item.notes}
                        onChange={(e) => updateLineItem(index, 'notes', e.target.value)}
                      />
                    </Group>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>

        {/* Action Buttons */}
        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={submitting}
            disabled={orderData.lineItems.length === 0}
            leftSection={<IconCheck size={16} />}
          >
            Create Order
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
