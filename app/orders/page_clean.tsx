/**
 * Customer Orders Page
 * 
 * Manage customer purchase orders, line items, and due dates.
 * Provides comprehensive order tracking and management functionality.
 */

"use client";

import { Title, Text, Card, Badge, Group, Stack, Loader, Alert, Button, Table, TextInput, Select, Modal, Textarea, NumberInput } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

// Types based on Prisma schema
interface Customer {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
}

interface Batch {
  id: string;
  status: 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  routingSteps: Array<{
    id: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'FAILED';
  }>;
}

interface LineItem {
  id: string;
  partNumber: string;
  partName: string;
  quantity: number;
  batches: Batch[];
}

interface PurchaseOrder {
  id: string;
  systemOrderId: string;
  poNumber: string;
  dueDate: string;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  notes?: string;
  createdAt: string;
  customer: Customer;
  lineItems: LineItem[];
}

// UI-friendly order interface
interface Order {
  orderId: string;
  customerName: string;
  orderNumber: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'RUSH';
  orderDate: string;
  dueDate: string;
  totalValue: number;
  itemCount: number;
  assignedBatches: number;
  completedBatches: number;
}

interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  rushOrders: number;
  overdueOrders: number;
  totalValue: number;
  avgOrderValue: number;
}

// New Order Form
interface NewOrderForm {
  customerId: string;
  customerName: string;
  orderNumber: string;
  dueDate: string;
  priority: 'RUSH' | 'STANDARD' | 'HOLD';
  notes: string;
  partNumber: string;
  partName: string;
  quantity: number;
}

// New Customer Form
interface NewCustomerForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  notes: string;
}

// Form Errors
interface FormErrors {
  customerId: string;
  orderNumber: string;
  dueDate: string;
  partNumber: string;
  partName: string;
  quantity: string;
}

interface CustomerFormErrors {
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  notes: string;
}

// Utility function to convert Prisma PurchaseOrder to UI Order
const convertPurchaseOrderToOrder = (purchaseOrder: PurchaseOrder): Order => {
  const allBatches = purchaseOrder.lineItems.flatMap(item => item.batches);
  const completedBatches = allBatches.filter(batch => batch.status === 'COMPLETED').length;
  const inProgressBatches = allBatches.filter(batch => batch.status === 'IN_PROGRESS').length;
  
  // Determine overall order status based on batch completion
  let status: Order['status'] = 'PENDING';
  if (allBatches.length === 0) {
    status = 'PENDING';
  } else if (completedBatches === allBatches.length) {
    status = 'COMPLETED';
  } else if (inProgressBatches > 0) {
    status = 'IN_PROGRESS';
  } else {
    status = 'PENDING';
  }

  // Convert priority mapping
  const priorityMap = {
    'RUSH': 'RUSH' as const,
    'STANDARD': 'NORMAL' as const,
    'HOLD': 'LOW' as const,
  };

  return {
    orderId: purchaseOrder.id,
    customerName: purchaseOrder.customer.name,
    orderNumber: purchaseOrder.poNumber,
    status: status,
    priority: priorityMap[purchaseOrder.priority] || 'NORMAL',
    orderDate: purchaseOrder.createdAt,
    dueDate: purchaseOrder.dueDate,
    totalValue: purchaseOrder.lineItems.reduce((sum, item) => sum + (item.quantity * 10), 0), // Placeholder calculation
    itemCount: purchaseOrder.lineItems.length,
    assignedBatches: allBatches.length,
    completedBatches: completedBatches,
  };
};

// Utility function to check if order is overdue
const isOrderOverdue = (dueDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const orderDueDate = new Date(dueDate);
  orderDueDate.setHours(0, 0, 0, 0);
  return orderDueDate < today;
};

// Utility function to format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Priority badge color mapping
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'RUSH': return 'red';
    case 'HIGH': return 'orange';
    case 'NORMAL': return 'blue';
    case 'LOW': return 'gray';
    default: return 'gray';
  }
};

// Status badge color mapping
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'COMPLETED': return 'green';
    case 'IN_PROGRESS': return 'blue';
    case 'PENDING': return 'yellow';
    case 'ON_HOLD': return 'orange';
    case 'CANCELLED': return 'red';
    default: return 'gray';
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'dueDate' | 'orderDate' | 'priority'>('dueDate');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Modal states
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  
  // Customer mode for new orders
  const [customerMode, setCustomerMode] = useState<'select' | 'new'>('select');
  
  // Form states
  const [newOrderForm, setNewOrderForm] = useState<NewOrderForm>({
    customerId: '',
    customerName: '',
    orderNumber: '',
    dueDate: '',
    priority: 'STANDARD',
    notes: '',
    partNumber: '',
    partName: '',
    quantity: 1,
  });

  const [newCustomerForm, setNewCustomerForm] = useState<NewCustomerForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    notes: '',
  });

  // Form error states
  const [formErrors, setFormErrors] = useState<FormErrors>({
    customerId: '',
    orderNumber: '',
    dueDate: '',
    partNumber: '',
    partName: '',
    quantity: '',
  });

  const [customerFormErrors, setCustomerFormErrors] = useState<CustomerFormErrors>({
    name: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
    notes: '',
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const [ordersResponse, statsResponse] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/orders/stats')
      ]);

      if (!ordersResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch orders data');
      }

      const ordersData = await ordersResponse.json();
      const statsData = await statsResponse.json();
      
      // Convert Prisma orders to UI orders
      const convertedOrders = ordersData.map(convertPurchaseOrderToOrder);
      setOrders(convertedOrders);
      setStats(statsData.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

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

  // Form validation functions
  const validateForm = (): boolean => {
    const errors = {
      customerId: "",
      orderNumber: "",
      dueDate: "",
      partNumber: "",
      partName: "",
      quantity: "",
    };

    let isValid = true;

    // Customer validation
    if (customerMode === 'select' && !newOrderForm.customerId) {
      errors.customerId = "Please select a customer";
      isValid = false;
    } else if (customerMode === 'new' && !newOrderForm.customerName.trim()) {
      errors.customerId = "Customer name is required";
      isValid = false;
    }

    // Order number validation
    if (!newOrderForm.orderNumber.trim()) {
      errors.orderNumber = "Order number is required";
      isValid = false;
    }

    // Due date validation
    if (!newOrderForm.dueDate) {
      errors.dueDate = "Due date is required";
      isValid = false;
    } else {
      const dueDate = new Date(newOrderForm.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        errors.dueDate = "Due date cannot be in the past";
        isValid = false;
      }
    }

    // Part number validation
    if (!newOrderForm.partNumber.trim()) {
      errors.partNumber = "Part number is required";
      isValid = false;
    }

    // Part name validation
    if (!newOrderForm.partName.trim()) {
      errors.partName = "Part name is required";
      isValid = false;
    }

    // Quantity validation
    if (!newOrderForm.quantity || newOrderForm.quantity < 1) {
      errors.quantity = "Quantity must be at least 1";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateCustomerForm = (): boolean => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
      notes: "",
    };

    let isValid = true;

    // Name validation
    if (!newCustomerForm.name.trim()) {
      errors.name = "Customer name is required";
      isValid = false;
    }

    // Email validation
    if (!newCustomerForm.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newCustomerForm.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    // Phone validation
    if (!newCustomerForm.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    // Address validation
    if (!newCustomerForm.address.trim()) {
      errors.address = "Address is required";
      isValid = false;
    }

    // Contact person validation
    if (!newCustomerForm.contactPerson.trim()) {
      errors.contactPerson = "Contact person is required";
      isValid = false;
    }

    setCustomerFormErrors(errors);
    return isValid;
  };

  // Modal handlers
  const handleOpenNewOrderModal = () => {
    setShowNewOrderModal(true);
    setCustomerMode('select');
  };

  const handleCloseNewOrderModal = () => {
    setShowNewOrderModal(false);
    setNewOrderForm({
      customerId: '',
      customerName: '',
      orderNumber: '',
      dueDate: '',
      priority: 'STANDARD',
      notes: '',
      partNumber: '',
      partName: '',
      quantity: 1,
    });
    setFormErrors({
      customerId: '',
      orderNumber: '',
      dueDate: '',
      partNumber: '',
      partName: '',
      quantity: '',
    });
  };

  const handleOpenNewCustomerModal = () => {
    setShowNewCustomerModal(true);
  };

  const handleCloseNewCustomerModal = () => {
    setShowNewCustomerModal(false);
    setNewCustomerForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      contactPerson: '',
      notes: '',
    });
    setCustomerFormErrors({
      name: '',
      email: '',
      phone: '',
      address: '',
      contactPerson: '',
      notes: '',
    });
  };

  // Submit handlers
  const handleSubmitNewOrder = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      let customerId = newOrderForm.customerId;
      
      if (customerMode === 'new' && newOrderForm.customerName.trim()) {
        // Create new customer
        const customerResponse = await fetch('/api/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newOrderForm.customerName.trim(),
            email: `${newOrderForm.customerName.trim().replace(/\s+/g, '').toLowerCase()}@example.com`, // Placeholder email
          }),
        });

        if (customerResponse.ok) {
          const customerData = await customerResponse.json();
          customerId = customerData.data?.id || customerData.id;
          
          // Refresh customers list
          const customersResponse = await fetch('/api/customers');
          if (customersResponse.ok) {
            const customersData = await customersResponse.json();
            setCustomers(customersData);
          }
        } else {
          throw new Error('Failed to create customer');
        }
      }

      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          poNumber: newOrderForm.orderNumber,
          dueDate: newOrderForm.dueDate,
          priority: newOrderForm.priority,
          notes: newOrderForm.notes,
          lineItems: [
            {
              partNumber: newOrderForm.partNumber,
              partName: newOrderForm.partName,
              quantity: newOrderForm.quantity,
            },
          ],
        }),
      });

      if (orderResponse.ok) {
        await orderResponse.json();
        
        // Refresh orders and stats
        const [ordersResponse, statsResponse] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/orders/stats')
        ]);

        if (ordersResponse.ok && statsResponse.ok) {
          const ordersData = await ordersResponse.json();
          const statsData = await statsResponse.json();
          const convertedOrders = ordersData.map(convertPurchaseOrderToOrder);
          setOrders(convertedOrders);
          setStats(statsData.data);
        }
        
        handleCloseNewOrderModal();
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error instanceof Error ? error.message : 'Failed to create order');
    }
  };

  const handleSubmitNewCustomer = async () => {
    if (!validateCustomerForm()) {
      return;
    }

    try {
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCustomerForm.name.trim(),
          email: newCustomerForm.email.trim(),
          phone: newCustomerForm.phone.trim(),
          address: newCustomerForm.address.trim(),
          contactPerson: newCustomerForm.contactPerson.trim(),
          notes: newCustomerForm.notes.trim(),
        }),
      });

      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        const newCustomerId = customerData.data?.id || customerData.id;
        
        // Refresh customers list
        const customersResponse = await fetch('/api/customers');
        if (customersResponse.ok) {
          const customersData = await customersResponse.json();
          setCustomers(customersData);
        }

        // Select the new customer in the order form
        setNewOrderForm(prev => ({ 
          ...prev, 
          customerId: newCustomerId,
          customerName: newCustomerForm.name.trim()
        }));
        
        // Clear any customer selection errors
        setFormErrors(prev => ({ ...prev, customerId: "" }));
        
        // Close customer modal
        handleCloseNewCustomerModal();
      } else {
        throw new Error('Failed to create customer');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      setError(error instanceof Error ? error.message : 'Failed to create customer');
    }
  };

  // Sorting and filtering
  const handleSort = (statType: 'dueDate' | 'orderDate' | 'priority') => {
    setSortBy(statType);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'orderDate':
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      case 'priority':
        const priorityOrder = { 'RUSH': 4, 'HIGH': 3, 'NORMAL': 2, 'LOW': 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      default:
        return 0;
    }
  });

  const filteredOrders = sortedOrders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  if (loading) {
    return (
      <Stack align="center" justify="center" style={{ minHeight: '400px' }}>
        <Loader size="xl" />
        <Text>Loading orders...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error">
        {error}
      </Alert>
    );
  }

  return (
    <main style={{ padding: '20px' }}>
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1}>Customer Orders</Title>
          <Text c="dimmed">Manage purchase orders and track delivery schedules</Text>
        </div>
        <Button onClick={handleOpenNewOrderModal} size="sm">
          Create New Order
        </Button>
      </Group>

      {/* Order Statistics */}
      {stats && (
        <Group mb="xl" grow>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Total Orders</Text>
              <Badge color="blue">{stats.totalOrders}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              ${stats.totalValue.toLocaleString()} total value
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Pending Orders</Text>
              <Badge color="yellow">{stats.pendingOrders}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Awaiting processing
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>In Progress</Text>
              <Badge color="blue">{stats.inProgressOrders}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Currently being processed
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Completed</Text>
              <Badge color="green">{stats.completedOrders}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Successfully delivered
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Rush Orders</Text>
              <Badge color="red">{stats.rushOrders}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              High priority items
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text fw={500}>Overdue</Text>
              <Badge color="red">{stats.overdueOrders}</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Past due date
            </Text>
          </Card>
        </Group>
      )}

      {/* Filters and Controls */}
      <Group mb="md">
        <Select
          placeholder="Sort by..."
          data={[
            { value: 'dueDate', label: 'Due Date' },
            { value: 'orderDate', label: 'Order Date' },
            { value: 'priority', label: 'Priority' }
          ]}
          value={sortBy}
          onChange={(value) => handleSort(value as 'dueDate' | 'orderDate' | 'priority')}
        />
        <Select
          placeholder="Filter by status..."
          data={[
            { value: 'all', label: 'All Orders' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'ON_HOLD', label: 'On Hold' },
            { value: 'CANCELLED', label: 'Cancelled' }
          ]}
          value={filterStatus}
          onChange={(value) => setFilterStatus(value || 'all')}
        />
      </Group>

      {/* Orders Table */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Order #</Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Priority</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Progress</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredOrders.map((order) => (
              <Table.Tr key={order.orderId}>
                <Table.Td>
                  <Link href={`/orders/${order.orderId}`} style={{ textDecoration: 'none' }}>
                    <Text fw={500} c="blue">
                      {order.orderNumber}
                    </Text>
                  </Link>
                </Table.Td>
                <Table.Td>{order.customerName}</Table.Td>
                <Table.Td>
                  <Badge color={getStatusColor(order.status)} variant="light">
                    {order.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={getPriorityColor(order.priority)} variant="light">
                    {order.priority}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <div style={{ 
                    color: isOrderOverdue(order.dueDate) ? 'red' : 'inherit',
                    fontWeight: isOrderOverdue(order.dueDate) ? 'bold' : 'normal'
                  }}>
                    {formatDate(order.dueDate)}
                    {isOrderOverdue(order.dueDate) && (
                      <Badge color="red" size="xs" ml="xs">
                        OVERDUE
                      </Badge>
                    )}
                  </div>
                </Table.Td>
                <Table.Td>${order.totalValue.toLocaleString()}</Table.Td>
                <Table.Td>
                  <Text size="sm">
                    {order.completedBatches}/{order.assignedBatches} batches
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      {/* New Order Modal */}
      <Modal
        opened={showNewOrderModal}
        onClose={handleCloseNewOrderModal}
        title="Create New Order"
        size="lg"
      >
        <Stack>
          {/* Customer Selection */}
          <Group>
            <Button
              variant={customerMode === 'select' ? 'filled' : 'light'}
              onClick={() => setCustomerMode('select')}
              size="sm"
            >
              Select Customer
            </Button>
            <Button
              variant={customerMode === 'new' ? 'filled' : 'light'}
              onClick={() => setCustomerMode('new')}
              size="sm"
            >
              New Customer
            </Button>
          </Group>

          {customerMode === 'select' ? (
            <Select
              label="Customer"
              placeholder="Select a customer"
              data={customers.map(customer => ({
                value: customer.id,
                label: customer.name
              }))}
              value={newOrderForm.customerId}
              onChange={(value) => setNewOrderForm(prev => ({ ...prev, customerId: value || '' }))}
              error={formErrors.customerId}
              required
            />
          ) : (
            <Group>
              <TextInput
                label="Customer Name"
                placeholder="Enter customer name"
                value={newOrderForm.customerName}
                onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                error={formErrors.customerId}
                required
                style={{ flex: 1 }}
              />
              <Button
                variant="light"
                onClick={handleOpenNewCustomerModal}
                mt="xl"
              >
                Full Customer Info
              </Button>
            </Group>
          )}

          <TextInput
            label="Order Number"
            placeholder="Enter order number"
            value={newOrderForm.orderNumber}
            onChange={(e) => setNewOrderForm(prev => ({ ...prev, orderNumber: e.target.value }))}
            error={formErrors.orderNumber}
            required
          />

          <TextInput
            label="Due Date"
            type="date"
            value={newOrderForm.dueDate}
            onChange={(e) => setNewOrderForm(prev => ({ ...prev, dueDate: e.target.value }))}
            error={formErrors.dueDate}
            required
          />

          <Select
            label="Priority"
            data={[
              { value: 'HOLD', label: 'Hold' },
              { value: 'STANDARD', label: 'Standard' },
              { value: 'RUSH', label: 'Rush' }
            ]}
            value={newOrderForm.priority}
            onChange={(value) => setNewOrderForm(prev => ({ ...prev, priority: value as 'RUSH' | 'STANDARD' | 'HOLD' }))}
          />

          <TextInput
            label="Part Number"
            placeholder="Enter part number"
            value={newOrderForm.partNumber}
            onChange={(e) => setNewOrderForm(prev => ({ ...prev, partNumber: e.target.value }))}
            error={formErrors.partNumber}
            required
          />

          <TextInput
            label="Part Name"
            placeholder="Enter part name"
            value={newOrderForm.partName}
            onChange={(e) => setNewOrderForm(prev => ({ ...prev, partName: e.target.value }))}
            error={formErrors.partName}
            required
          />

          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            value={newOrderForm.quantity}
            onChange={(value) => setNewOrderForm(prev => ({ ...prev, quantity: Number(value) || 1 }))}
            error={formErrors.quantity}
            min={1}
            required
          />

          <Textarea
            label="Notes"
            placeholder="Enter additional notes"
            value={newOrderForm.notes}
            onChange={(e) => setNewOrderForm(prev => ({ ...prev, notes: e.target.value }))}
            minRows={3}
          />

          <Group justify="flex-end">
            <Button variant="light" onClick={handleCloseNewOrderModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewOrder}>
              Create Order
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* New Customer Modal */}
      <Modal
        opened={showNewCustomerModal}
        onClose={handleCloseNewCustomerModal}
        title="Create New Customer"
        size="lg"
      >
        <Stack>
          <TextInput
            label="Customer Name"
            placeholder="Enter customer name"
            value={newCustomerForm.name}
            onChange={(e) => setNewCustomerForm(prev => ({ ...prev, name: e.target.value }))}
            error={customerFormErrors.name}
            required
          />

          <TextInput
            label="Email"
            placeholder="Enter email address"
            value={newCustomerForm.email}
            onChange={(e) => setNewCustomerForm(prev => ({ ...prev, email: e.target.value }))}
            error={customerFormErrors.email}
            required
          />

          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            value={newCustomerForm.phone}
            onChange={(e) => setNewCustomerForm(prev => ({ ...prev, phone: e.target.value }))}
            error={customerFormErrors.phone}
            required
          />

          <TextInput
            label="Address"
            placeholder="Enter address"
            value={newCustomerForm.address}
            onChange={(e) => setNewCustomerForm(prev => ({ ...prev, address: e.target.value }))}
            error={customerFormErrors.address}
            required
          />

          <TextInput
            label="Contact Person"
            placeholder="Enter contact person name"
            value={newCustomerForm.contactPerson}
            onChange={(e) => setNewCustomerForm(prev => ({ ...prev, contactPerson: e.target.value }))}
            error={customerFormErrors.contactPerson}
            required
          />

          <Textarea
            label="Notes"
            placeholder="Enter additional notes"
            value={newCustomerForm.notes}
            onChange={(e) => setNewCustomerForm(prev => ({ ...prev, notes: e.target.value }))}
            minRows={3}
          />

          <Group justify="flex-end">
            <Button variant="light" onClick={handleCloseNewCustomerModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewCustomer}>
              Create Customer
            </Button>
          </Group>
        </Stack>
      </Modal>
    </main>
  );
}
