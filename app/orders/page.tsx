/**
 * Customer Orders Page
 * 
 * Manage customer purchase orders, line items, and due dates.
 * Provides comprehensive order tracking and management functionality.
 */

"use client";

import { Title, Text, Card, Badge, Group, Stack, Loader, Alert, Button, Table, TextInput, Select, Modal, Textarea } from "@mantine/core";
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
  drawingNumber?: string;
  revisionLevel?: string;
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
  lineItems?: Array<{
    partNumber: string;
    partName: string;
    drawingNumber?: string;
    revisionLevel?: string;
    quantity: number;
  }>;
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

  // Calculate total value based on line items (placeholder calculation)
  const totalValue = purchaseOrder.lineItems.reduce((sum, item) => {
    return sum + (item.quantity * 100); // $100 per unit placeholder
  }, 0);

  return {
    orderId: purchaseOrder.systemOrderId,
    customerName: purchaseOrder.customer.name,
    orderNumber: purchaseOrder.poNumber,
    status,
    priority: priorityMap[purchaseOrder.priority],
    orderDate: new Date(purchaseOrder.createdAt).toISOString().split('T')[0],
    dueDate: new Date(purchaseOrder.dueDate).toISOString().split('T')[0],
    totalValue,
    itemCount: purchaseOrder.lineItems.length,
    assignedBatches: allBatches.length,
    completedBatches,
    lineItems: purchaseOrder.lineItems.map(item => ({
      partNumber: item.partNumber,
      partName: item.partName,
      drawingNumber: item.drawingNumber || undefined,
      revisionLevel: item.revisionLevel || undefined,
      quantity: item.quantity,
    })),
  };
};

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [sortBy, setSortBy] = useState<'all' | 'pending' | 'inProgress' | 'completed' | 'rush'>('all');

  // New order form state
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: "",
    customerId: "",
    orderNumber: "",
    priority: "STANDARD" as PurchaseOrder['priority'],
    dueDate: "",
    notes: "",
    // Line items array to support multiple parts per order
    lineItems: [{
      partNumber: "",
      partName: "",
      drawingNumber: "",
      revisionLevel: "",
      quantity: 1,
      dueDate: "", // Optional override of PO-level due date
      notes: "",
    }],
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({
    customerId: "",
    orderNumber: "",
    dueDate: "",
    lineItems: [{
      partNumber: "",
      partName: "",
      drawingNumber: "",
      revisionLevel: "",
      quantity: "",
      dueDate: "",
      notes: "",
    }],
  });

  // Customer selection mode
  const [customerMode, setCustomerMode] = useState<'select' | 'new'>('select');

  // New customer form state
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: "",
    contactName: "",
    email: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
    notes: "",
  });

  // Customer form validation state
  const [customerFormErrors, setCustomerFormErrors] = useState({
    name: "",
    contactName: "",
    email: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
    notes: "",
  });

  // Add CSS animations
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('orderPageStyles')) {
      const style = document.createElement('style');
      style.id = 'orderPageStyles';
      style.textContent = `
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes slideGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .table-row-hover:hover {
          background-color: rgba(51, 65, 85, 0.8) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
        
        .urgency-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .line-items-summary {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 6px;
          border: 1px solid rgba(51, 65, 85, 0.2);
        }
        
        @media (max-width: 768px) {
          .responsive-table {
            font-size: 0.8rem;
          }
          
          .responsive-table th,
          .responsive-table td {
            padding: 8px 12px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Fetch order data from API
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        
        // Fetch orders, customers, and stats in parallel
        const [ordersResponse, customersResponse, statsResponse] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/customers'),
          fetch('/api/orders/stats')
        ]);

        if (!ordersResponse.ok || !customersResponse.ok || !statsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const ordersData = await ordersResponse.json();
        const customersData = await customersResponse.json();
        const statsData = await statsResponse.json();

        // Convert Prisma orders to UI format
        // Handle different API response structures
        const ordersArray = ordersData.data || ordersData || [];
        const convertedOrders = Array.isArray(ordersArray) ? ordersArray.map(convertPurchaseOrderToOrder) : [];
        setOrders(convertedOrders);
        setCustomers(customersData); // customers API returns array directly
        setStats(statsData.data);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load order data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const getStatusColor = (status: string, dueDate?: string) => {
    // Check if order is overdue
    if (dueDate && new Date(dueDate) < new Date()) {
      return 'red';
    }
    
    switch (status) {
      case 'PENDING': return 'orange';
      case 'IN_PROGRESS': return 'blue';
      case 'COMPLETED': return 'green';
      case 'ON_HOLD': return 'yellow';
      case 'CANCELLED': return 'red';
      default: return 'gray';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'gray';
      case 'NORMAL': return 'blue';
      case 'HIGH': return 'orange';
      case 'RUSH': return 'red';
      default: return 'gray';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Calculate days until due date
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get urgency color based on days until due
  const getUrgencyColor = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return "#ef4444"; // Red - overdue
    if (daysUntilDue <= 2) return "#f59e0b"; // Amber - critical
    if (daysUntilDue <= 7) return "#eab308"; // Yellow - urgent
    return "#10b981"; // Green - normal
  };

  // Format line items summary
  const formatLineItemsSummary = (order: Order) => {
    const count = order.itemCount;
    return `${count} item${count !== 1 ? 's' : ''}`;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.lineItems && order.lineItems.some(item => 
                           item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.drawingNumber && item.drawingNumber.toLowerCase().includes(searchTerm.toLowerCase()))
                         ));
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    const matchesPriority = priorityFilter === "ALL" || order.priority === priorityFilter;
    
    // Apply sorting filter
    let matchesSort = true;
    if (sortBy === 'pending') {
      matchesSort = order.status === 'PENDING';
    } else if (sortBy === 'inProgress') {
      matchesSort = order.status === 'IN_PROGRESS';
    } else if (sortBy === 'completed') {
      matchesSort = order.status === 'COMPLETED';
    } else if (sortBy === 'rush') {
      matchesSort = order.priority === 'RUSH';
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesSort;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleEditOrder = (order: Order) => {
    // For now, just show the view modal - in a real app this would open an edit form
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleNewOrder = () => {
    setShowNewOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const handleCloseNewOrderModal = () => {
    setShowNewOrderModal(false);
    setNewOrderForm({
      customerName: "",
      customerId: "",
      orderNumber: "",
      priority: "STANDARD",
      dueDate: "",
      notes: "",
      lineItems: [{
        partNumber: "",
        partName: "",
        drawingNumber: "",
        revisionLevel: "",
        quantity: 1,
        dueDate: "",
        notes: "",
      }],
    });
    setFormErrors({
      customerId: "",
      orderNumber: "",
      dueDate: "",
      lineItems: [{
        partNumber: "",
        partName: "",
        drawingNumber: "",
        revisionLevel: "",
        quantity: "",
        dueDate: "",
        notes: "",
      }],
    });
    setCustomerMode('select');
  };

  const handleCloseNewCustomerModal = () => {
    setShowNewCustomerModal(false);
    setNewCustomerForm({
      name: "",
      contactName: "",
      email: "",
      phone: "",
      billingAddress: "",
      shippingAddress: "",
      notes: "",
    });
    setCustomerFormErrors({
      name: "",
      contactName: "",
      email: "",
      phone: "",
      billingAddress: "",
      shippingAddress: "",
      notes: "",
    });
  };

  const handleOpenNewCustomerModal = () => {
    setShowNewCustomerModal(true);
  };

  const validateCustomerForm = () => {
    const errors = {
      name: "",
      contactName: "",
      email: "",
      phone: "",
      billingAddress: "",
      shippingAddress: "",
      notes: "",
    };

    let isValid = true;

    // Name validation (required)
    if (!newCustomerForm.name.trim()) {
      errors.name = "Customer name is required";
      isValid = false;
    }

    // Contact name validation (required)
    if (!newCustomerForm.contactName.trim()) {
      errors.contactName = "Contact name is required";
      isValid = false;
    }

    // Email validation (required)
    if (!newCustomerForm.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newCustomerForm.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation (optional in schema, but let's keep it required for business logic)
    if (!newCustomerForm.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    // Billing address validation (optional in schema)
    // No validation needed as it's optional

    // Shipping address validation (optional in schema)
    // No validation needed as it's optional

    // Notes validation (optional in schema)
    // No validation needed as it's optional

    setCustomerFormErrors(errors);
    return isValid;
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
          contactName: newCustomerForm.contactName.trim(),
          email: newCustomerForm.email.trim(),
          phone: newCustomerForm.phone.trim(),
          billingAddress: newCustomerForm.billingAddress.trim(),
          shippingAddress: newCustomerForm.shippingAddress.trim(),
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

  const validateForm = () => {
    const errors = {
      customerId: "",
      orderNumber: "",
      dueDate: "",
      lineItems: newOrderForm.lineItems.map(() => ({
        partNumber: "",
        partName: "",
        drawingNumber: "",
        revisionLevel: "",
        quantity: "",
        dueDate: "",
        notes: "",
      })),
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

    // Line items validation
    newOrderForm.lineItems.forEach((lineItem, index) => {
      // Part number validation
      if (!lineItem.partNumber.trim()) {
        errors.lineItems[index].partNumber = "Part number is required";
        isValid = false;
      }

      // Part name validation
      if (!lineItem.partName.trim()) {
        errors.lineItems[index].partName = "Part name is required";
        isValid = false;
      }

      // Quantity validation
      if (!lineItem.quantity || lineItem.quantity < 1) {
        errors.lineItems[index].quantity = "Quantity must be at least 1";
        isValid = false;
      }

      // Line item due date validation (if provided)
      if (lineItem.dueDate) {
        const lineItemDueDate = new Date(lineItem.dueDate);
        const orderDueDate = new Date(newOrderForm.dueDate);
        if (lineItemDueDate > orderDueDate) {
          errors.lineItems[index].dueDate = "Line item due date cannot be after order due date";
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmitNewOrder = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Handle customer logic
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

      // Create the purchase order
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
          lineItems: newOrderForm.lineItems.map(item => ({
            partNumber: item.partNumber,
            partName: item.partName,
            drawingNumber: item.drawingNumber || null,
            revisionLevel: item.revisionLevel || null,
            quantity: item.quantity,
            dueDate: item.dueDate || null,
            notes: item.notes || null,
          })),
        }),
      });

      if (orderResponse.ok) {
        // Refresh the orders data
        const [ordersResponse, statsResponse] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/orders/stats')
        ]);

        if (ordersResponse.ok && statsResponse.ok) {
          const ordersData = await ordersResponse.json();
          const statsData = await statsResponse.json();
          
          // Handle different API response structures
          const ordersArray = ordersData.data || ordersData || [];
          const convertedOrders = Array.isArray(ordersArray) ? ordersArray.map(convertPurchaseOrderToOrder) : [];
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

  const handleStatClick = (statType: 'all' | 'pending' | 'inProgress' | 'completed' | 'rush') => {
    setSortBy(statType);
    // Reset other filters when clicking a stat
    setStatusFilter("ALL");
    setPriorityFilter("ALL");
    setSearchTerm("");
  };

  return (
    <main
      style={{
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: 40,
            paddingTop: 20,
            position: "relative",
          }}
        >
          {/* Subtle background gradient accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.02) 0%, transparent 70%)",
              borderRadius: "20px",
              pointerEvents: "none",
            }}
          />
          
          <Group justify="space-between" align="center" style={{ marginBottom: 20, position: "relative" }}>
            <div>
              <Group gap="md" align="center" style={{ marginBottom: 12 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    boxShadow: "0 4px 16px rgba(30, 64, 175, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                </div>
                <div>
                  <Title
                    order={1}
                    style={{
                      color: "#e2e8f0",
                      fontSize: "2rem",
                      fontWeight: 700,
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Customer Orders
                  </Title>
                  <Text
                    size="md"
                    style={{
                      color: "#64748b",
                      fontSize: "1rem",
                      marginTop: 4,
                      fontWeight: 400,
                    }}
                  >
                    Manage customer purchase orders, line items, and due dates
                  </Text>
                </div>
              </Group>
            </div>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                size="md"
                variant="light"
                leftSection={<span style={{ fontSize: "16px", marginRight: "4px" }}>←</span>}
                style={{
                  background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))",
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                  color: "#cbd5e1",
                  backdropFilter: "blur(16px)",
                  height: "40px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  paddingLeft: "16px",
                  paddingRight: "20px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.2s ease",
                }}
              >
                Back to Dashboard
              </Button>
            </Link>
          </Group>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px",
            background: "rgba(15, 23, 42, 0.8)",
            borderRadius: "12px",
            margin: "20px auto",
            maxWidth: "350px",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(30, 41, 59, 0.6)",
          }}>
            <Loader size="lg" color="#1e40af" />
            <Text size="md" style={{ color: "#94a3b8", marginTop: 16, fontWeight: 500 }}>
              Loading order data...
            </Text>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert
            color="red"
            title="Error Loading Orders"
            style={{ 
              marginBottom: 32,
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Text style={{ color: "#fca5a5" }}>{error}</Text>
          </Alert>
        )}

        {/* Order Statistics */}
        {stats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              marginBottom: 32,
            }}
          >
            {[
              {
                title: "Total Orders",
                value: stats.totalOrders,
                subtitle: `$${(stats.totalValue / 1000).toFixed(0)}K total value`,
                color: "blue",
                gradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1a365d 100%)",
                bgAccent: "rgba(30, 64, 175, 0.04)",
                shadowColor: "rgba(30, 64, 175, 0.2)",
                sortKey: 'all' as const,
              },
              {
                title: "In Progress",
                value: stats.inProgressOrders,
                subtitle: "Currently active",
                color: "blue",
                gradient: "linear-gradient(135deg, #0e7490 0%, #0c6478 50%, #155e75 100%)",
                bgAccent: "rgba(14, 116, 144, 0.04)",
                shadowColor: "rgba(14, 116, 144, 0.2)",
                sortKey: 'inProgress' as const,
              },
              {
                title: "Rush Orders",
                value: stats.rushOrders,
                subtitle: "High priority",
                color: "red",
                gradient: "linear-gradient(135deg, #b91c1c 0%, #991b1b 50%, #7f1d1d 100%)",
                bgAccent: "rgba(185, 28, 28, 0.04)",
                shadowColor: "rgba(185, 28, 28, 0.2)",
                sortKey: 'rush' as const,
              },
              {
                title: "Completed",
                value: stats.completedOrders,
                subtitle: "This period",
                color: "green",
                gradient: "linear-gradient(135deg, #047857 0%, #065f46 50%, #064e3b 100%)",
                bgAccent: "rgba(4, 120, 87, 0.04)",
                shadowColor: "rgba(4, 120, 87, 0.2)",
                sortKey: 'completed' as const,
              },
            ].map((stat) => (
              <Card
                key={stat.title}
                padding="xl"
                onClick={() => handleStatClick(stat.sortKey)}
                style={{
                  background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95))`,
                  border: sortBy === stat.sortKey ? "2px solid rgba(59, 130, 246, 0.5)" : "1px solid rgba(51, 65, 85, 0.4)",
                  borderRadius: "16px",
                  textAlign: "center",
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.02)`,
                  backdropFilter: "blur(16px)",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "120px",
                  cursor: "pointer",
                  transform: sortBy === stat.sortKey ? "translateY(-2px)" : "translateY(0)",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Subtle background accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: stat.bgAccent,
                    opacity: 0.3,
                    borderRadius: "12px",
                  }}
                />
                {/* Simple top border */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: stat.gradient,                  borderRadius: "12px 12px 0 0",
                }}
              />
              <Text size="lg" fw={700} style={{ 
                color: "#cbd5e1", 
                marginBottom: 8, 
                fontSize: "1.5rem", 
                position: "relative",
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginTop: "24px",
              }}>
                  {stat.value}
                </Text>
                <Text size="sm" style={{ 
                  color: "#94a3b8", 
                  marginBottom: 8, 
                  fontWeight: 600, 
                  position: "relative",
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  {stat.title}
                </Text>
                <Text size="xs" style={{ 
                  color: "#64748b", 
                  position: "relative",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}>
                  {stat.subtitle}
                </Text>
              </Card>
            ))}
          </div>
        )}

        {/* Filters and Search */}
        <Card
          padding="xl"
          style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))",
            border: "1px solid rgba(51, 65, 85, 0.4)",
            borderRadius: "12px",
            marginBottom: 24,
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 20% 80%, rgba(30, 64, 175, 0.015) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <div 
            style={{ 
              position: "relative", 
              zIndex: 1, 
              display: "flex", 
              gap: "16px", 
              alignItems: "flex-end",
              flexWrap: "wrap"
            }}
          >
            <div style={{ flex: 1, minWidth: 240 }}>
              <Text size="sm" fw={600} style={{ 
                color: "#94a3b8", 
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "0.8rem",
              }}>
                Search Orders
              </Text>
              <TextInput
                placeholder="Search by customer, order number, part number, or drawing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="md"
                styles={{
                  input: {
                    background: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(51, 65, 85, 0.4)",
                    color: "#cbd5e1",
                    height: "40px",
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(8px)",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  },
                }}
              />
            </div>
            <div style={{ minWidth: 140 }}>
              <Text size="sm" fw={600} style={{ 
                color: "#94a3b8", 
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "0.8rem",
              }}>
                Status
              </Text>
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value || "ALL")}
                size="md"
                data={[
                  { value: "ALL", label: "All Statuses" },
                  { value: "PENDING", label: "Pending" },
                  { value: "IN_PROGRESS", label: "In Progress" },
                  { value: "COMPLETED", label: "Completed" },
                  { value: "ON_HOLD", label: "On Hold" },
                  { value: "CANCELLED", label: "Cancelled" },
                ]}
                withCheckIcon={false}
                rightSection={<div style={{ display: "none" }} />}
                comboboxProps={{
                  withinPortal: true,
                  middlewares: {
                    flip: false,
                    shift: false,
                  }
                }}
                styles={{
                  input: {
                    background: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(51, 65, 85, 0.4)",
                    color: "#cbd5e1",
                    height: "40px",
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                    backdropFilter: "blur(8px)",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  },
                  section: { 
                    display: "none",
                  },
                  dropdown: {
                    background: "rgba(15, 23, 42, 0.98)",
                    border: "1px solid rgba(51, 65, 85, 0.4)",
                    backdropFilter: "blur(16px)",
                    zIndex: 9999,
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: "8px",
                    marginTop: "4px",
                    position: "absolute",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  },
                  option: {
                    color: "#cbd5e1",
                    fontSize: "0.9rem",
                    padding: "12px 16px",
                    minHeight: "40px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    },
                  },
                  wrapper: {
                    position: "relative",
                  }
                }}
              />
            </div>
            <div style={{ minWidth: 140 }}>
              <Text size="sm" fw={600} style={{ 
                color: "#94a3b8", 
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "0.8rem",
              }}>
                Priority
              </Text>
              <Select
                value={priorityFilter}
                onChange={(value) => setPriorityFilter(value || "ALL")}
                size="md"
                data={[
                  { value: "ALL", label: "All Priorities" },
                  { value: "LOW", label: "Low" },
                  { value: "NORMAL", label: "Normal" },
                  { value: "HIGH", label: "High" },
                  { value: "RUSH", label: "Rush" },
                ]}
                withCheckIcon={false}
                rightSection={<div style={{ display: "none" }} />}
                comboboxProps={{
                  withinPortal: true,
                  middlewares: {
                    flip: false,
                    shift: false,
                  }
                }}
                styles={{
                  input: {
                    background: "rgba(30, 41, 59, 0.7)",
                    border: "1px solid rgba(51, 65, 85, 0.4)",
                    color: "#cbd5e1",
                    height: "40px",
                    fontSize: "0.9rem",
                    borderRadius: "8px",
                    backdropFilter: "blur(8px)",
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  },
                  section: { 
                    display: "none",
                  },
                  dropdown: {
                    background: "rgba(15, 23, 42, 0.98)",
                    border: "1px solid rgba(51, 65, 85, 0.4)",
                    backdropFilter: "blur(16px)",
                    zIndex: 9999,
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: "8px",
                    marginTop: "4px",
                    position: "absolute",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                  },
                  option: {
                    color: "#cbd5e1",
                    fontSize: "0.9rem",
                    padding: "12px 16px",
                    minHeight: "40px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                    },
                  },
                  wrapper: {
                    position: "relative",
                  }
                }}
              />
            </div>
            <div>
              <Text size="sm" fw={600} style={{ 
                color: "transparent", 
                marginBottom: 8, 
                userSelect: "none",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontSize: "0.8rem",
              }}>
                Action
              </Text>
              <Button
                size="md"
                onClick={handleNewOrder}
                style={{
                  background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                  border: "none",
                  height: "40px",
                  fontSize: "0.9rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(30, 64, 175, 0.15)",
                  paddingLeft: "16px",
                  paddingRight: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s ease",
                }}
              >
                New Order
              </Button>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card
          padding="xl"
          style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))",
            border: "1px solid rgba(51, 65, 85, 0.4)",
            borderRadius: "12px",
            backdropFilter: "blur(16px)",
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            position: "relative",
            zIndex: 1,
            marginTop: "24px",
          }}
        >
          {/* Subtle background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 70% 30%, rgba(30, 64, 175, 0.01) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ overflowX: "auto", position: "relative" }}>
            <Table
              striped
              className="responsive-table"
              styles={{
                th: {
                  background: "rgba(30, 41, 59, 0.8)",
                  color: "#cbd5e1",
                  fontWeight: 600,
                  border: "1px solid rgba(51, 65, 85, 0.4)",
                  padding: "16px 20px",
                  fontSize: "0.9rem",
                  borderRadius: "0",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                },
                td: {
                  color: "#94a3b8",
                  border: "1px solid rgba(51, 65, 85, 0.2)",
                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                  padding: "16px 20px",
                  fontSize: "0.9rem",
                  borderRadius: "0",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  verticalAlign: "middle",
                },
                tr: {
                  transition: "all 0.2s ease",
                },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Order ID</Table.Th>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>Order Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Priority</Table.Th>
                  <Table.Th>Days Until Due</Table.Th>
                  <Table.Th>Due Date</Table.Th>
                  <Table.Th>Line Items</Table.Th>
                  <Table.Th>Value</Table.Th>
                  <Table.Th>Progress</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredOrders.map((order) => (
                  <Table.Tr 
                    key={order.orderId} 
                    className="table-row-hover"
                    style={isOverdue(order.dueDate) ? {
                      backgroundColor: "rgba(239, 68, 68, 0.08)",
                      borderColor: "rgba(239, 68, 68, 0.2)",
                    } : {}}
                  >
                    <Table.Td>
                      <Text fw={700} style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                        {order.orderId}
                      </Text>
                      <Text size="xs" style={{ color: "#64748b", marginTop: 2 }}>
                        {order.orderNumber}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ color: "#94a3b8", fontWeight: 500 }}>
                        {order.customerName}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ color: "#64748b", fontWeight: 500 }}>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={getStatusColor(order.status, order.dueDate)}
                        variant="light"
                        size="md"
                        style={{
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={getPriorityColor(order.priority)}
                        variant="filled"
                        size="md"
                        style={{
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {order.priority}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {(() => {
                        const daysUntilDue = getDaysUntilDue(order.dueDate);
                        const urgencyColor = getUrgencyColor(daysUntilDue);
                        return (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: urgencyColor,
                                boxShadow: `0 0 8px ${urgencyColor}40`,
                              }}
                            />
                            <Text
                              fw={daysUntilDue <= 2 ? 700 : 500}
                              style={{ 
                                color: urgencyColor,
                                fontSize: "0.9rem",
                              }}
                            >
                              {daysUntilDue < 0 
                                ? `${Math.abs(daysUntilDue)}d overdue`
                                : daysUntilDue === 0
                                ? "Due today"
                                : `${daysUntilDue}d`
                              }
                            </Text>
                          </div>
                        );
                      })()}
                    </Table.Td>
                    <Table.Td>
                      <Text style={{ 
                        color: isOverdue(order.dueDate) ? "#f87171" : "#64748b", 
                        fontWeight: isOverdue(order.dueDate) ? 700 : 500,
                        fontSize: "0.85rem",
                      }}>
                        {new Date(order.dueDate).toLocaleDateString()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "4px",
                            background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.7rem",
                            color: "white",
                            fontWeight: 600,
                          }}
                        >
                          {order.itemCount}
                        </div>
                        <Text style={{ color: "#94a3b8", fontWeight: 500, fontSize: "0.85rem" }}>
                          {formatLineItemsSummary(order)}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={700} style={{ color: "#047857", fontSize: "0.9rem" }}>
                        ${order.totalValue.toLocaleString()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                        <Text size="sm" style={{ color: "#94a3b8", fontWeight: 600 }}>
                          {order.completedBatches}/{order.assignedBatches}
                        </Text>
                        <div
                          style={{
                            width: 60,
                            height: 6,
                            background: "rgba(51, 65, 85, 0.4)",
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid rgba(51, 65, 85, 0.3)",
                          }}
                        >
                          <div
                            style={{
                              width: `${(order.completedBatches / order.assignedBatches) * 100}%`,
                              height: "100%",
                              background: "linear-gradient(90deg, #047857, #065f46)",
                              borderRadius: 3,
                              boxShadow: "0 0 6px rgba(4, 120, 87, 0.2)",
                            }}
                          />
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                        <Button 
                          size="sm" 
                          variant="light" 
                          color="blue"
                          onClick={() => handleViewOrder(order)}
                          style={{
                            fontSize: "0.8rem",
                            height: "32px",
                            borderRadius: "6px",
                            fontWeight: 600,
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="light" 
                          color="orange"
                          onClick={() => handleEditOrder(order)}
                          style={{
                            fontSize: "0.8rem",
                            height: "32px",
                            borderRadius: "6px",
                            fontWeight: 600,
                            paddingLeft: "12px",
                            paddingRight: "12px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Edit
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(51, 65, 85, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  fontSize: "32px",
                  border: "2px solid rgba(51, 65, 85, 0.3)",
                }}
              >
              </div>
              <Text size="lg" fw={600} style={{ color: "#94a3b8", marginBottom: 8 }}>
                No orders found
              </Text>
              <Text size="md" style={{ color: "#64748b" }}>
                Try adjusting your search or filter criteria
              </Text>
            </div>
          )}
        </Card>

        {/* Order Details Modal */}
        <Modal
          opened={showOrderModal}
          onClose={handleCloseModal}
          title={
            <Group gap="sm" align="center">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  boxShadow: "0 2px 8px rgba(30, 64, 175, 0.15)",
                }}
              >
              </div>
              <Text fw={600} size="lg" style={{ color: "#cbd5e1" }}>
                Order Details
              </Text>
            </Group>
          }
          size="lg"
          styles={{
            content: {
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))",
              border: "1px solid rgba(51, 65, 85, 0.4)",
              borderRadius: "12px",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            },
            header: {
              background: "transparent",
              borderBottom: "1px solid rgba(51, 65, 85, 0.2)",
              paddingBottom: "16px",
            },
            body: {
              paddingTop: "20px",
            },
          }}
        >
          {selectedOrder && (
            <Stack gap="lg">
              {/* Order Header Info */}
              <Group justify="space-between" align="center">
                <div>
                  <Text fw={600} size="xl" style={{ color: "#cbd5e1", marginBottom: 4 }}>
                    {selectedOrder.orderId}
                  </Text>
                  <Text size="sm" style={{ color: "#64748b" }}>
                    Order Number: {selectedOrder.orderNumber}
                  </Text>
                </div>
                <Group gap="sm">
                  <Badge
                    color={getStatusColor(selectedOrder.status)}
                    variant="light"
                    size="md"
                  >
                    {selectedOrder.status.replace('_', ' ')}
                  </Badge>
                  <Badge
                    color={getPriorityColor(selectedOrder.priority)}
                    variant="filled"
                    size="md"
                  >
                    {selectedOrder.priority}
                  </Badge>
                </Group>
              </Group>

              {/* Order Details Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {[
                  { label: "Customer", value: selectedOrder.customerName },
                  { label: "Order Date", value: new Date(selectedOrder.orderDate).toLocaleDateString() },
                  { label: "Due Date", value: new Date(selectedOrder.dueDate).toLocaleDateString() },
                  { label: "Days Until Due", value: (() => {
                    const days = getDaysUntilDue(selectedOrder.dueDate);
                    return days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "Due today" : `${days} days`;
                  })(), isDays: true },
                  { label: "Total Value", value: `$${selectedOrder.totalValue.toLocaleString()}`, isPrice: true },
                  { label: "Line Items", value: `${selectedOrder.itemCount} items` },
                  { label: "Batch Progress", value: `${selectedOrder.completedBatches}/${selectedOrder.assignedBatches}`, isProgress: true },
                ].map((item, index) => (
                  <Card
                    key={index}
                    padding="md"
                    style={{
                      background: "rgba(30, 41, 59, 0.4)",
                      border: "1px solid rgba(51, 65, 85, 0.2)",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Text size="xs" style={{ color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.label}
                    </Text>
                    <Text fw={item.isPrice ? 600 : 500} size={item.isPrice ? "md" : "sm"} style={{ 
                      color: item.isPrice ? "#047857" : item.isDays ? getUrgencyColor(getDaysUntilDue(selectedOrder.dueDate)) : "#cbd5e1",
                    }}>
                      {item.value}
                    </Text>
                    {item.isProgress && (
                      <div
                        style={{
                          width: "100%",
                          height: 6,
                          background: "rgba(51, 65, 85, 0.3)",
                          borderRadius: 3,
                          overflow: "hidden",
                          marginTop: 8,
                        }}
                      >
                        <div
                          style={{
                            width: `${(selectedOrder.completedBatches / selectedOrder.assignedBatches) * 100}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #047857, #065f46)",
                            borderRadius: 3,
                            boxShadow: "0 0 6px rgba(4, 120, 87, 0.2)",
                          }}
                        />
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Line Items Details */}
              {selectedOrder.lineItems && selectedOrder.lineItems.length > 0 && (
                <div>
                  <Text size="lg" fw={600} style={{ color: "#cbd5e1", marginBottom: 16 }}>
                    Line Items
                  </Text>
                  <div style={{ display: "grid", gap: 12 }}>
                    {selectedOrder.lineItems.map((item, index) => (
                      <Card
                        key={index}
                        padding="md"
                        style={{
                          background: "rgba(30, 41, 59, 0.3)",
                          border: "1px solid rgba(51, 65, 85, 0.2)",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 16, alignItems: "center" }}>
                          <div>
                            <Text size="xs" style={{ color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Part Number
                            </Text>
                            <Text fw={600} style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                              {item.partNumber}
                            </Text>
                          </div>
                          <div>
                            <Text size="xs" style={{ color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Part Name
                            </Text>
                            <Text style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                              {item.partName}
                            </Text>
                          </div>
                          <div>
                            <Text size="xs" style={{ color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Drawing
                            </Text>
                            <Text style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                              {item.drawingNumber ? `${item.drawingNumber} ${item.revisionLevel ? `Rev ${item.revisionLevel}` : ''}` : 'N/A'}
                            </Text>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <Text size="xs" style={{ color: "#64748b", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Qty
                            </Text>
                            <div
                              style={{
                                background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                                color: "white",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                minWidth: "40px",
                              }}
                            >
                              {item.quantity}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <Group justify="flex-end" gap="sm" style={{ marginTop: 16 }}>
                <Button
                  variant="light"
                  color="gray"
                  onClick={handleCloseModal}
                  style={{
                    borderRadius: "8px",
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="light"
                  color="blue"
                  style={{
                    borderRadius: "8px",
                  }}
                >
                  Edit Order
                </Button>
                <Button
                  variant="light"
                  color="green"
                  style={{
                    borderRadius: "8px",
                  }}
                >
                  View Batches
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>

        {/* New Order Modal - Custom Implementation */}
        {showNewOrderModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseNewOrderModal}
          >
            <div
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))",
                border: "1px solid rgba(51, 65, 85, 0.4)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                padding: "24px",
                width: "90%",
                maxWidth: "700px",
                maxHeight: "80vh",
                overflow: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px rgba(30, 64, 175, 0.15)",
                    color: "white",
                  }}
                >
                  +
                </div>
                <div>
                  <Text size="lg" fw={600} style={{ color: "#cbd5e1", marginBottom: "4px" }}>
                    Create New Order
                  </Text>
                  <Text size="sm" style={{ color: "#64748b" }}>
                    Fill out the form below to create a new order
                  </Text>
                </div>
              </div>
              
              {/* Customer and Order Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <Text size="sm" fw={600} style={{ color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                      Customer *
                    </Text>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerMode('select');
                          setNewOrderForm(prev => ({ ...prev, customerName: "", customerId: "" }));
                          setFormErrors(prev => ({ ...prev, customerId: "" }));
                        }}
                        style={{
                          background: customerMode === 'select' ? "rgba(30, 64, 175, 0.2)" : "transparent",
                          border: customerMode === 'select' ? "1px solid #3b82f6" : "1px solid rgba(51, 65, 85, 0.4)",
                          color: customerMode === 'select' ? "#3b82f6" : "#94a3b8",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                        }}
                      >
                        Select
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomerMode('new');
                          setNewOrderForm(prev => ({ ...prev, customerName: "", customerId: "" }));
                          setFormErrors(prev => ({ ...prev, customerId: "" }));
                        }}
                        style={{
                          background: customerMode === 'new' ? "rgba(30, 64, 175, 0.2)" : "transparent",
                          border: customerMode === 'new' ? "1px solid #3b82f6" : "1px solid rgba(51, 65, 85, 0.4)",
                          color: customerMode === 'new' ? "#3b82f6" : "#94a3b8",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          fontWeight: 500,
                          transition: "all 0.2s ease",
                        }}
                      >
                        New
                      </button>
                    </div>
                  </div>
                  
                  {customerMode === 'select' ? (
                    <Select
                      placeholder="Select customer..."
                      value={newOrderForm.customerId}
                      onChange={(value) => {
                        const customer = customers?.find(c => c.id === value);
                        setNewOrderForm(prev => ({ 
                          ...prev, 
                          customerId: value || "",
                          customerName: customer?.name || ""
                        }));
                        if (value) {
                          setFormErrors(prev => ({ ...prev, customerId: "" }));
                        }
                      }}
                      searchable
                      data={customers?.map(customer => ({
                        value: customer.id,
                        label: customer.name
                      })) || []}
                      required
                      withCheckIcon={false}
                      rightSection={<div style={{ display: "none" }} />}
                      comboboxProps={{
                        withinPortal: true,
                        middlewares: {
                          flip: false,
                          shift: false,
                        }
                      }}
                      styles={{
                        input: {
                          background: "rgba(30, 41, 59, 0.7)",
                          border: formErrors.customerId ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                          color: "#cbd5e1",
                          borderRadius: "8px",
                          backdropFilter: "blur(8px)",
                          fontWeight: 500,
                        },
                        section: { 
                          display: "none",
                        },
                        dropdown: {
                          background: "rgba(15, 23, 42, 0.98)",
                          border: "1px solid rgba(51, 65, 85, 0.4)",
                          backdropFilter: "blur(16px)",
                          zIndex: 9999,
                          maxHeight: "200px",
                          overflowY: "auto",
                          borderRadius: "8px",
                          marginTop: "4px",
                          position: "absolute",
                          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                        },
                        option: {
                          color: "#cbd5e1",
                          fontSize: "0.9rem",
                          padding: "12px 16px",
                          minHeight: "40px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          fontWeight: 500,
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                          },
                        },
                        wrapper: {
                          position: "relative",
                        }
                      }}
                    />
                  ) : (
                    <div style={{ display: "flex", gap: "8px", alignItems: "end" }}>
                      <div style={{ flex: 1 }}>
                        <TextInput
                          placeholder="Enter new customer name..."
                          value={newOrderForm.customerName}
                          onChange={(e) => {
                            setNewOrderForm(prev => ({ ...prev, customerName: e.target.value }));
                            if (e.target.value.trim()) {
                              setFormErrors(prev => ({ ...prev, customerId: "" }));
                            }
                          }}
                          required
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: formErrors.customerId ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "8px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </div>
                      <Button
                        variant="filled"
                        color="blue"
                        size="sm"
                        onClick={handleOpenNewCustomerModal}
                        style={{
                          height: "40px",
                          borderRadius: "8px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                          border: "1px solid #3b82f6",
                          color: "white",
                          boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                        }}
                      >
                        Full Customer Info
                      </Button>
                    </div>
                  )}
                  
                  {formErrors.customerId && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {formErrors.customerId}
                    </Text>
                  )}
                </div>
                <div>
                  <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                    Order Number *
                  </Text>
                  <TextInput
                    placeholder="PO-12345"
                    value={newOrderForm.orderNumber}
                    onChange={(e) => {
                      setNewOrderForm(prev => ({ ...prev, orderNumber: e.target.value }));
                      if (e.target.value.trim()) {
                        setFormErrors(prev => ({ ...prev, orderNumber: "" }));
                      }
                    }}
                    required
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: formErrors.orderNumber ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {formErrors.orderNumber && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {formErrors.orderNumber}
                    </Text>
                  )}
                </div>
              </div>

              {/* Priority and Due Date */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                    Priority
                  </Text>
                  <Select
                    value={newOrderForm.priority}
                    onChange={(value) => setNewOrderForm(prev => ({ ...prev, priority: value as PurchaseOrder['priority'] }))}
                    data={[
                      { value: "STANDARD", label: "Standard" },
                      { value: "RUSH", label: "Rush" },
                      { value: "HOLD", label: "Hold" },
                    ]}
                    withCheckIcon={false}
                    rightSection={<div style={{ display: "none" }} />}
                    comboboxProps={{
                      withinPortal: true,
                      middlewares: {
                        flip: false,
                        shift: false,
                      }
                    }}
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                      section: { 
                        display: "none",
                      },
                      dropdown: {
                        background: "rgba(15, 23, 42, 0.98)",
                        border: "1px solid rgba(51, 65, 85, 0.4)",
                        backdropFilter: "blur(16px)",
                        zIndex: 9999,
                        maxHeight: "200px",
                        overflowY: "auto",
                        borderRadius: "8px",
                        marginTop: "4px",
                        position: "absolute",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                      },
                      option: {
                        color: "#cbd5e1",
                        fontSize: "0.9rem",
                        padding: "12px 16px",
                        minHeight: "40px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontWeight: 500,
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        },
                      },
                      wrapper: {
                        position: "relative",
                      }
                    }}
                  />
                </div>
                <div>
                  <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                    Due Date *
                  </Text>
                  <TextInput
                    type="date"
                    value={newOrderForm.dueDate}
                    onChange={(e) => {
                      setNewOrderForm(prev => ({ ...prev, dueDate: e.target.value }));
                      if (e.target.value) {
                        setFormErrors(prev => ({ ...prev, dueDate: "" }));
                      }
                    }}
                    required
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: formErrors.dueDate ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {formErrors.dueDate && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {formErrors.dueDate}
                    </Text>
                  )}
                </div>
              </div>

              {/* Line Items Section */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <Text size="sm" fw={600} style={{ color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                    Line Items *
                  </Text>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => {
                      setNewOrderForm(prev => ({
                        ...prev,
                        lineItems: [...prev.lineItems, {
                          partNumber: "",
                          partName: "",
                          drawingNumber: "",
                          revisionLevel: "",
                          quantity: 1,
                          dueDate: "",
                          notes: "",
                        }]
                      }));
                      setFormErrors(prev => ({
                        ...prev,
                        lineItems: [...prev.lineItems, {
                          partNumber: "",
                          partName: "",
                          drawingNumber: "",
                          revisionLevel: "",
                          quantity: "",
                          dueDate: "",
                          notes: "",
                        }]
                      }));
                    }}
                    style={{
                      background: "rgba(30, 64, 175, 0.1)",
                      border: "1px solid rgba(30, 64, 175, 0.3)",
                      color: "#3b82f6",
                      height: "28px",
                      fontSize: "0.75rem",
                      borderRadius: "6px",
                    }}
                  >
                    + Add Line Item
                  </Button>
                </div>

                {newOrderForm.lineItems.map((lineItem, index) => (
                  <div key={index} style={{ 
                    background: "rgba(30, 41, 59, 0.3)",
                    border: "1px solid rgba(51, 65, 85, 0.3)",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "12px",
                    position: "relative"
                  }}>
                    {/* Remove button for additional line items */}
                    {newOrderForm.lineItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setNewOrderForm(prev => ({
                            ...prev,
                            lineItems: prev.lineItems.filter((_, i) => i !== index)
                          }));
                          setFormErrors(prev => ({
                            ...prev,
                            lineItems: prev.lineItems.filter((_, i) => i !== index)
                          }));
                        }}
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          background: "rgba(239, 68, 68, 0.1)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#f87171",
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        ×
                      </button>
                    )}

                    <Text size="xs" fw={600} style={{ color: "#64748b", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Line Item {index + 1}
                    </Text>

                    {/* Part Number and Part Name */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Part Number *
                        </Text>
                        <TextInput
                          placeholder="PART-001"
                          value={lineItem.partNumber}
                          onChange={(e) => {
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].partNumber = e.target.value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                            
                            if (e.target.value.trim()) {
                              const newErrors = {...formErrors};
                              newErrors.lineItems[index].partNumber = "";
                              setFormErrors(newErrors);
                            }
                          }}
                          required
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: formErrors.lineItems[index]?.partNumber ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                        {formErrors.lineItems[index]?.partNumber && (
                          <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                            {formErrors.lineItems[index].partNumber}
                          </Text>
                        )}
                      </div>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Part Name *
                        </Text>
                        <TextInput
                          placeholder="Part description..."
                          value={lineItem.partName}
                          onChange={(e) => {
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].partName = e.target.value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                            
                            if (e.target.value.trim()) {
                              const newErrors = {...formErrors};
                              newErrors.lineItems[index].partName = "";
                              setFormErrors(newErrors);
                            }
                          }}
                          required
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: formErrors.lineItems[index]?.partName ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                        {formErrors.lineItems[index]?.partName && (
                          <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                            {formErrors.lineItems[index].partName}
                          </Text>
                        )}
                      </div>
                    </div>

                    {/* Drawing Number, Revision Level, and Quantity */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Drawing Number
                        </Text>
                        <TextInput
                          placeholder="DWG-001"
                          value={lineItem.drawingNumber}
                          onChange={(e) => {
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].drawingNumber = e.target.value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                          }}
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                      </div>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Revision
                        </Text>
                        <TextInput
                          placeholder="A"
                          value={lineItem.revisionLevel}
                          onChange={(e) => {
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].revisionLevel = e.target.value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                          }}
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                      </div>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Qty *
                        </Text>
                        <TextInput
                          type="number"
                          value={lineItem.quantity.toString()}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].quantity = value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                            
                            if (value >= 1) {
                              const newErrors = {...formErrors};
                              newErrors.lineItems[index].quantity = "";
                              setFormErrors(newErrors);
                            }
                          }}
                          min={1}
                          required
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: formErrors.lineItems[index]?.quantity ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                        {formErrors.lineItems[index]?.quantity && (
                          <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                            {formErrors.lineItems[index].quantity}
                          </Text>
                        )}
                      </div>
                    </div>

                    {/* Line Item Due Date and Notes */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Due Date Override
                        </Text>
                        <TextInput
                          type="date"
                          value={lineItem.dueDate}
                          onChange={(e) => {
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].dueDate = e.target.value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                            
                            if (e.target.value) {
                              const newErrors = {...formErrors};
                              newErrors.lineItems[index].dueDate = "";
                              setFormErrors(newErrors);
                            }
                          }}
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: formErrors.lineItems[index]?.dueDate ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                        {formErrors.lineItems[index]?.dueDate && (
                          <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                            {formErrors.lineItems[index].dueDate}
                          </Text>
                        )}
                      </div>
                      <div>
                        <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                          Line Item Notes
                        </Text>
                        <TextInput
                          placeholder="Special instructions for this part..."
                          value={lineItem.notes}
                          onChange={(e) => {
                            const newLineItems = [...newOrderForm.lineItems];
                            newLineItems[index].notes = e.target.value;
                            setNewOrderForm(prev => ({ ...prev, lineItems: newLineItems }));
                          }}
                          styles={{
                            input: {
                              background: "rgba(30, 41, 59, 0.7)",
                              border: "1px solid rgba(51, 65, 85, 0.4)",
                              color: "#cbd5e1",
                              borderRadius: "6px",
                              backdropFilter: "blur(8px)",
                              fontWeight: 500,
                              fontSize: "0.85rem",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* File Attachments Section */}
              <div style={{ marginBottom: "20px" }}>
                <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                  Engineering Drawings & Attachments
                </Text>
                <div style={{ 
                  background: "rgba(30, 41, 59, 0.3)",
                  border: "2px dashed rgba(51, 65, 85, 0.4)",
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.step,.stp,.iges,.igs"
                    onChange={() => {
                      // Handle file upload logic here
                      // TODO: Implement file upload functionality
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                  <div style={{ color: "#94a3b8", marginBottom: "8px", fontSize: "24px" }}>📁</div>
                  <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "4px" }}>
                    Drop files here or click to browse
                  </Text>
                  <Text size="xs" style={{ color: "#64748b" }}>
                    Supported: PDF, DWG, DXF, Images, STEP, IGES
                  </Text>
                </div>
              </div>

              {/* Order Notes */}
              <div style={{ marginBottom: "24px" }}>
                <Text size="sm" fw={600} style={{ color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.8rem" }}>
                  Order Notes
                </Text>
                <Textarea
                  placeholder="Additional notes or special instructions..."
                  value={newOrderForm.notes}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  styles={{
                    input: {
                      background: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      color: "#cbd5e1",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                      fontWeight: 500,
                    },
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={handleCloseNewOrderModal}
                  style={{
                    borderRadius: "8px",
                    background: "rgba(71, 85, 105, 0.8)",
                    border: "1px solid rgba(100, 116, 139, 0.6)",
                    color: "#e2e8f0",
                    height: "40px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    boxShadow: "0 2px 8px rgba(71, 85, 105, 0.3)",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitNewOrder}
                  style={{
                    background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                    borderRadius: "8px",
                    border: "1px solid #3b82f6",
                    color: "white",
                    height: "40px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    boxShadow: "0 2px 8px rgba(30, 64, 175, 0.3)",
                  }}
                >
                  Create Order
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* New Customer Modal */}
        {showNewCustomerModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseNewCustomerModal}
          >
            <div
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))",
                border: "1px solid rgba(51, 65, 85, 0.4)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                padding: "24px",
                width: "90%",
                maxWidth: "800px",
                maxHeight: "80vh",
                overflow: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #1e40af, #1e3a8a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px rgba(30, 64, 175, 0.15)",
                    color: "white",
                  }}
                >
                  👤
                </div>
                <div>
                  <Text size="lg" fw={600} style={{ color: "#cbd5e1", marginBottom: "4px" }}>
                    Create New Customer
                  </Text>
                  <Text size="sm" style={{ color: "#64748b" }}>
                    Enter complete customer information matching your business requirements
                  </Text>
                </div>
              </div>

              {/* Customer Information Form */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                {/* Customer Name */}
                <div>
                  <Text size="sm" fw={600} style={{ 
                    color: "#94a3b8", 
                    marginBottom: "8px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em", 
                    fontSize: "0.8rem" 
                  }}>
                    Customer Name *
                  </Text>
                  <TextInput
                    placeholder="Enter customer/company name..."
                    value={newCustomerForm.name}
                    onChange={(e) => {
                      setNewCustomerForm(prev => ({ ...prev, name: e.target.value }));
                      if (e.target.value.trim()) {
                        setCustomerFormErrors(prev => ({ ...prev, name: "" }));
                      }
                    }}
                    required
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: customerFormErrors.name ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {customerFormErrors.name && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {customerFormErrors.name}
                    </Text>
                  )}
                </div>

                {/* Contact Name */}
                <div>
                  <Text size="sm" fw={600} style={{ 
                    color: "#94a3b8", 
                    marginBottom: "8px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em", 
                    fontSize: "0.8rem" 
                  }}>
                    Contact Name *
                  </Text>
                  <TextInput
                    placeholder="Primary contact person..."
                    value={newCustomerForm.contactName}
                    onChange={(e) => {
                      setNewCustomerForm(prev => ({ ...prev, contactName: e.target.value }));
                      if (e.target.value.trim()) {
                        setCustomerFormErrors(prev => ({ ...prev, contactName: "" }));
                      }
                    }}
                    required
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: customerFormErrors.contactName ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {customerFormErrors.contactName && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {customerFormErrors.contactName}
                    </Text>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Text size="sm" fw={600} style={{ 
                    color: "#94a3b8", 
                    marginBottom: "8px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em", 
                    fontSize: "0.8rem" 
                  }}>
                    Email Address *
                  </Text>
                  <TextInput
                    placeholder="contact@company.com"
                    value={newCustomerForm.email}
                    onChange={(e) => {
                      setNewCustomerForm(prev => ({ ...prev, email: e.target.value }));
                      if (e.target.value.trim()) {
                        setCustomerFormErrors(prev => ({ ...prev, email: "" }));
                      }
                    }}
                    required
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: customerFormErrors.email ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {customerFormErrors.email && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {customerFormErrors.email}
                    </Text>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Text size="sm" fw={600} style={{ 
                    color: "#94a3b8", 
                    marginBottom: "8px", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.05em", 
                    fontSize: "0.8rem" 
                  }}>
                    Phone Number *
                  </Text>
                  <TextInput
                    placeholder="(555) 123-4567"
                    value={newCustomerForm.phone}
                    onChange={(e) => {
                      setNewCustomerForm(prev => ({ ...prev, phone: e.target.value }));
                      if (e.target.value.trim()) {
                        setCustomerFormErrors(prev => ({ ...prev, phone: "" }));
                      }
                    }}
                    required
                    styles={{
                      input: {
                        background: "rgba(30, 41, 59, 0.7)",
                        border: customerFormErrors.phone ? "1px solid #f87171" : "1px solid rgba(51, 65, 85, 0.4)",
                        color: "#cbd5e1",
                        borderRadius: "8px",
                        backdropFilter: "blur(8px)",
                        fontWeight: 500,
                      },
                    }}
                  />
                  {customerFormErrors.phone && (
                    <Text size="xs" style={{ color: "#f87171", marginTop: "4px", fontWeight: 500 }}>
                      {customerFormErrors.phone}
                    </Text>
                  )}
                </div>
              </div>

              {/* Address Fields */}
              <div style={{ marginBottom: "20px" }}>
                <Text size="sm" fw={600} style={{ 
                  color: "#94a3b8", 
                  marginBottom: "8px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em", 
                  fontSize: "0.8rem" 
                }}>
                  Billing Address
                </Text>
                <Textarea
                  placeholder="Enter billing address..."
                  value={newCustomerForm.billingAddress}
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, billingAddress: e.target.value }))}
                  rows={3}
                  styles={{
                    input: {
                      background: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      color: "#cbd5e1",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                      fontWeight: 500,
                    },
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Text size="sm" fw={600} style={{ 
                  color: "#94a3b8", 
                  marginBottom: "8px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em", 
                  fontSize: "0.8rem" 
                }}>
                  Shipping Address
                </Text>
                <Textarea
                  placeholder="Enter shipping address (if different from billing)..."
                  value={newCustomerForm.shippingAddress}
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, shippingAddress: e.target.value }))}
                  rows={3}
                  styles={{
                    input: {
                      background: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      color: "#cbd5e1",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                      fontWeight: 500,
                    },
                  }}
                />
              </div>

              {/* Notes */}
              <div style={{ marginBottom: "24px" }}>
                <Text size="sm" fw={600} style={{ 
                  color: "#94a3b8", 
                  marginBottom: "8px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em", 
                  fontSize: "0.8rem" 
                }}>
                  Notes
                </Text>
                <Textarea
                  placeholder="Additional customer notes or special instructions..."
                  value={newCustomerForm.notes}
                  onChange={(e) => setNewCustomerForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  styles={{
                    input: {
                      background: "rgba(30, 41, 59, 0.7)",
                      border: "1px solid rgba(51, 65, 85, 0.4)",
                      color: "#cbd5e1",
                      borderRadius: "8px",
                      backdropFilter: "blur(8px)",
                      fontWeight: 500,
                    },
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px" }}>
                <Button
                  variant="filled"
                  color="gray"
                  onClick={handleCloseNewCustomerModal}
                  style={{
                    borderRadius: "8px",
                    background: "rgba(71, 85, 105, 0.8)",
                    border: "1px solid rgba(100, 116, 139, 0.6)",
                    color: "#e2e8f0",
                    height: "40px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    boxShadow: "0 2px 8px rgba(71, 85, 105, 0.3)",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitNewCustomer}
                  style={{
                    background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                    borderRadius: "8px",
                    border: "1px solid #3b82f6",
                    color: "white",
                    height: "40px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    boxShadow: "0 2px 8px rgba(30, 64, 175, 0.3)",
                  }}
                >
                  Create Customer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
