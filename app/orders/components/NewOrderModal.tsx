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
  Switch,
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
import { QuickBooksStatus } from '../../components/ui/QuickBooksStatus';
import { PartSelector } from './PartSelector';

// Types
type ExtendedPartType = 'FINISHED' | 'RAW_MATERIAL' | 'COMPONENT' | 'SUBASSEMBLY' | 'CONSUMABLE';

interface Part {
  id: string;
  partNumber: string;
  partName: string;
  partType: ExtendedPartType;
  drawingNumber?: string;
  revisionLevel?: string;
  description?: string;
  materialSpec?: string;
  unitOfMeasure?: string;
  standardCost?: number;
  leadTime?: number;
  notes?: string;
}

// Form interfaces
interface LineItemForm {
  partId?: string; // When selecting existing part
  partNumber: string;
  partName: string;
  partType?: ExtendedPartType; // Part type for new parts
  drawingNumber: string;
  revisionLevel: string;
  description?: string; // Detailed description
  materialSpec?: string; // Material specification
  unitOfMeasure?: string; // Unit of measure
  quantity: number;
  unitPrice: number;
  dueDate: string;
  notes: string;
  isNewPart?: boolean; // Flag to track if this is a new part being created
  editMode?: boolean; // Flag to enable editing of selected part details
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
  isPageReady?: boolean; // New prop to indicate page readiness
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
  isPageReady = true, // Default to true for backward compatibility
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
        partId: '',
        partNumber: '',
        partName: '',
        partType: 'FINISHED' as ExtendedPartType,
        drawingNumber: '',
        revisionLevel: '',
        description: '',
        materialSpec: '',
        unitOfMeasure: 'EA',
        quantity: 1,
        unitPrice: 0,
        dueDate: '',
        notes: '',
        isNewPart: false,
        editMode: false,
      }
    ],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch customers on modal open
  useEffect(() => {
    if (opened) {
      fetchCustomers();
      generatePONumber();
    }
  }, [opened]);

  const generatePONumber = async () => {
    try {
      const response = await fetch('/api/orders/generate-po');
      if (response.ok) {
        const data = await response.json();
        setOrderData(prev => ({ ...prev, poNumber: data.poNumber }));
      }
    } catch (error) {
      console.error('Error generating PO number:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      // First, try to sync QuickBooks customers if connected
      try {
        const qbStatusResponse = await fetch('/api/quickbooks/status');
        if (qbStatusResponse.ok) {
          const qbStatus = await qbStatusResponse.json();
          if (qbStatus.hasValidTokens) {
            // Try to sync QuickBooks customers
            const syncResponse = await fetch('/api/quickbooks/sync-customers', { method: 'POST' });
            if (syncResponse.ok) {
              console.log('QuickBooks customers synced successfully');
            } else {
              console.warn('QuickBooks customer sync failed, using local customers only');
            }
          }
        }
      } catch (qbError) {
        console.warn('QuickBooks sync check failed:', qbError);
        // Continue with local customers even if QB sync fails
      }

      // Fetch all customers (local + synced QB customers)
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
          partId: '',
          partNumber: '',
          partName: '',
          drawingNumber: '',
          revisionLevel: '',
          quantity: 1,
          unitPrice: 0,
          dueDate: '',
          notes: '',
          editMode: false,
        }
      ]
    });
  };

  const removeLineItem = (index: number) => {
    const newLineItems = orderData.lineItems.filter((_, i) => i !== index);
    setOrderData({ ...orderData, lineItems: newLineItems });
  };

  const updateLineItem = (index: number, field: keyof LineItemForm, value: string | number | boolean) => {
    const newLineItems = [...orderData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    setOrderData({ ...orderData, lineItems: newLineItems });
  };

  const toggleEditMode = (index: number) => {
    const newLineItems = [...orderData.lineItems];
    newLineItems[index] = { ...newLineItems[index], editMode: !newLineItems[index].editMode };
    setOrderData({ ...orderData, lineItems: newLineItems });
  };

  const handlePartSelect = (index: number, part: any) => {
    const newLineItems = [...orderData.lineItems];
    if (part) {
      newLineItems[index] = {
        ...newLineItems[index],
        partId: part.id,
        partNumber: part.partNumber,
        partName: part.partName,
        drawingNumber: part.drawingNumber || '',
        revisionLevel: part.revisionLevel || '',
        description: part.description || '',
        materialSpec: part.materialSpec || '',
        unitOfMeasure: part.unitOfMeasure || 'EA',
        unitPrice: part.standardCost || newLineItems[index].unitPrice,
        // Convert the part type to our extended type
        partType: part.partType === 'SEMI_FINISHED' ? 'COMPONENT' : (part.partType as ExtendedPartType) || 'FINISHED',
        editMode: false, // Disable edit mode when part is selected
      };
    } else {
      // Clear part data when no part selected
      newLineItems[index] = {
        ...newLineItems[index],
        partId: '',
        partNumber: '',
        partName: '',
        drawingNumber: '',
        revisionLevel: '',
        description: '',
        materialSpec: '',
        unitOfMeasure: 'EA',
        partType: 'FINISHED' as ExtendedPartType,
        editMode: false, // Reset edit mode when part is cleared
      };
    }
    setOrderData({ ...orderData, lineItems: newLineItems });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!orderData.customerId) {
      newErrors.customerId = 'Please select a customer';
    }
    if (!orderData.poNumber) {
      newErrors.poNumber = 'PO Number is required (should be auto-generated)';
    }
    if (!orderData.dueDate) {
      newErrors.dueDate = 'Due date is required - please select a date';
    }
    
    orderData.lineItems.forEach((item, index) => {
      if (!item.partNumber) {
        newErrors[`lineItems.${index}.partNumber`] = `Line item ${index + 1}: Part selection or part number is required`;
      }
      if (!item.partId && !item.partName) {
        newErrors[`lineItems.${index}.partName`] = `Line item ${index + 1}: Part name is required when creating new part`;
      }
      if (!item.quantity || item.quantity <= 0) {
        newErrors[`lineItems.${index}.quantity`] = `Line item ${index + 1}: Quantity must be greater than 0`;
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
            partId: item.partId || undefined, // Include partId if selecting existing part
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
      poNumber: '', // Will be auto-generated when modal opens again
      dueDate: '',
      priority: 'STANDARD',
      notes: '',
      lineItems: [
        {
          partId: '',
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
        {/* General Error Alert */}
        {Object.keys(errors).length > 0 && (
          <Alert color="red" icon={<IconAlertCircle size={16} />} title="Please fix the following errors:">
            <Stack gap="xs">
              {Object.entries(errors).map(([field, message]) => (
                <Text key={field} size="sm">
                  • {message}
                </Text>
              ))}
            </Stack>
          </Alert>
        )}

        {/* Order Information */}
        <Card withBorder>
          <Stack gap="md">
            <Text fw={600} size="sm" c="dimmed">
              Order Information
            </Text>

            <Group grow>
              <div>
                <Group gap="xs" mb="xs" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Select
                      label="Customer"
                      placeholder="Select customer"
                      data={customerOptions}
                      searchable
                      required
                      value={orderData.customerId}
                      onChange={(value) => setOrderData({ ...orderData, customerId: value || '' })}
                      error={errors.customerId}
                    />
                    {/* QuickBooks status with reauth button */}
                    <Group gap="xs" mt={4}>
                      <QuickBooksStatus compact={true} showActions={true} />
                    </Group>
                  </div>
                  <div style={{ paddingTop: '25px' }}>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setShowNewCustomer(!showNewCustomer)}
                      leftSection={showNewCustomer ? <IconChevronDown size={16} /> : <IconPlus size={16} />}
                    >
                      {showNewCustomer ? 'Cancel' : 'New Customer'}
                    </Button>
                  </div>
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
              <div>
                <Group gap="xs" align="end">
                  <div style={{ flex: 1 }}>
                    <TextInput
                      label="PO Number"
                      placeholder="Auto-generated PO number"
                      required
                      value={orderData.poNumber}
                      onChange={(e) => setOrderData({ ...orderData, poNumber: e.target.value })}
                      error={errors.poNumber}
                      description="Auto-generated - you can edit if needed"
                    />
                  </div>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={generatePONumber}
                    title="Generate new PO number"
                  >
                    🔄
                  </Button>
                </Group>
              </div>
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

                    <PartSelector
                      value={item.partId ? {
                        id: item.partId,
                        partNumber: item.partNumber,
                        partName: item.partName,
                        partType: (item.partType === 'COMPONENT' || item.partType === 'SUBASSEMBLY' || item.partType === 'CONSUMABLE') 
                          ? 'FINISHED' 
                          : item.partType as any,
                        drawingNumber: item.drawingNumber,
                        revisionLevel: item.revisionLevel,
                      } : null}
                      onChange={(part) => handlePartSelect(index, part)}
                      placeholder="Select existing part or create new one"
                      error={errors[`lineItems.${index}.partNumber`]}
                      required
                      isPageReady={isPageReady}
                    />

                    {/* Edit button for selected parts */}
                    {item.partId && !item.editMode && (
                      <Group justify="flex-end">
                        <Button
                          variant="light"
                          size="xs"
                          onClick={() => toggleEditMode(index)}
                        >
                          Edit Part Details
                        </Button>
                      </Group>
                    )}

                    {/* Save changes button when in edit mode */}
                    {item.partId && item.editMode && (
                      <Group justify="flex-end">
                        <Button
                          variant="light"
                          size="xs"
                          color="green"
                          onClick={() => toggleEditMode(index)}
                        >
                          Save Changes
                        </Button>
                      </Group>
                    )}

                    {/* Manual part details - show if no part selected OR if editing mode is enabled */}
                    {(!item.partId || item.editMode) && (
                      <>
                        <Group grow>
                          <TextInput
                            label="Part Name"
                            placeholder="Description of the part"
                            required
                            value={item.partName}
                            onChange={(e) => updateLineItem(index, 'partName', e.target.value)}
                            error={errors[`lineItems.${index}.partName`]}
                          />
                          <Select
                            label="Part Type"
                            placeholder="Select part type"
                            data={[
                              { value: 'FINISHED', label: 'Finished Good' },
                              { value: 'RAW_MATERIAL', label: 'Raw Material' },
                              { value: 'COMPONENT', label: 'Component' },
                              { value: 'SUBASSEMBLY', label: 'Subassembly' },
                              { value: 'CONSUMABLE', label: 'Consumable' },
                            ]}
                            value={item.partType || 'FINISHED'}
                            onChange={(value) => updateLineItem(index, 'partType', value as ExtendedPartType)}
                          />
                        </Group>
                        <Group grow>
                          <Textarea
                            label="Description"
                            placeholder="Detailed part description"
                            value={item.description || ''}
                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                            minRows={2}
                          />
                          <TextInput
                            label="Material Specification"
                            placeholder="Material specs (e.g., 6061-T6 Aluminum)"
                            value={item.materialSpec || ''}
                            onChange={(e) => updateLineItem(index, 'materialSpec', e.target.value)}
                          />
                        </Group>
                        <Group grow>
                          <Select
                            label="Unit of Measure"
                            placeholder="Select unit"
                            data={[
                              { value: 'EA', label: 'Each (EA)' },
                              { value: 'LB', label: 'Pounds (LB)' },
                              { value: 'FT', label: 'Feet (FT)' },
                              { value: 'IN', label: 'Inches (IN)' },
                              { value: 'SQ FT', label: 'Square Feet (SQ FT)' },
                              { value: 'PC', label: 'Pieces (PC)' },
                              { value: 'SET', label: 'Sets (SET)' },
                            ]}
                            value={item.unitOfMeasure || 'EA'}
                            onChange={(value) => updateLineItem(index, 'unitOfMeasure', value || 'EA')}
                          />
                          <Switch
                            label="New Part"
                            description="This is a new part to be added to inventory"
                            checked={item.isNewPart}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateLineItem(index, 'isNewPart', event.currentTarget.checked)}
                          />
                        </Group>
                      </>
                    )}

                    {/* Drawing and revision - always editable */}
                    <Group grow>
                      <TextInput
                        label="Drawing Number"
                        placeholder="Engineering drawing reference"
                        value={item.drawingNumber || ''}
                        onChange={(e) => updateLineItem(index, 'drawingNumber', e.target.value)}
                      />
                      <TextInput
                        label="Revision Level"
                        placeholder="Rev A, Rev 01, etc."
                        value={item.revisionLevel || ''}
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
        <Group justify="space-between" align="center">
          <div style={{ flex: 1 }}>
            {/* Form Status Indicator */}
            {(() => {
              const hasErrors = Object.keys(errors).length > 0;
              const missingRequiredFields = [];
              
              if (!orderData.customerId) missingRequiredFields.push('Customer');
              if (!orderData.poNumber) missingRequiredFields.push('PO Number');
              if (!orderData.dueDate) missingRequiredFields.push('Due Date');
              if (orderData.lineItems.length === 0) missingRequiredFields.push('Line Items');
              
              const hasLineItemIssues = orderData.lineItems.some((item, index) => 
                !item.partNumber || (!item.partId && !item.partName) || !item.quantity || item.quantity <= 0
              );
              
              if (hasLineItemIssues) missingRequiredFields.push('Complete Line Item Details');
              
              if (missingRequiredFields.length === 0 && !hasErrors) {
                return (
                  <Group gap="xs">
                    <IconCheck size={16} color="green" />
                    <Text size="sm" c="green" fw={500}>Ready to create order</Text>
                  </Group>
                );
              } else {
                return (
                  <Group gap="xs">
                    <IconAlertCircle size={16} color="orange" />
                    <Text size="sm" c="orange">
                      Missing: {missingRequiredFields.join(', ')}
                    </Text>
                  </Group>
                );
              }
            })()}
          </div>
          
          <Group gap="sm">
            <Button variant="subtle" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={submitting}
              disabled={orderData.lineItems.length === 0 || Object.keys(errors).length > 0}
              leftSection={<IconCheck size={16} />}
            >
              Create Order
            </Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
};
