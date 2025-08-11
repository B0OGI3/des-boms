/**
 * Customer Orders Page - DES-BOMS Customer & Order Management Module
 * 
 * This page implements the customer and order management requirements from the 
 * DES-BOMS specification document:
 * 
 * 2. Customer & Order Management
 * 2.1 Customer Information - Customer details and contact management
 * 2.2 Purchase Order (PO) Header - Order-level information with unique System Order ID
 * 2.3 Order Line Items - Individual parts with quantities and specifications
 * 2.4 File Attachments - Drawing files, CAD models, and specifications per line item
 * 
 * Features:
 * - Database-driven search and filtering
 * - Real-time order status tracking based on batch completion
 * - Priority management (Rush / Standard / Hold per DES-BOMS spec)
 * - Comprehensive CRUD operations for orders and line items
 * - Manufacturing-focused dashboard with batch progress tracking
 */

"use client";

import { Title, Text, Group, Loader, Alert, Button } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

// Shared utilities and components
import { usePagination } from "../../hooks/usePagination";
import { useModal } from "../../hooks/useModal";
import { StatisticsCards } from "../components/ui/StatisticsCards";
import { FilterBar } from "../components/ui/FilterBar";
import { Pagination } from "../components/ui/Pagination";
import { QuickBooksStatus } from "../components/ui/QuickBooksStatus";
import { OrdersTable } from "./components/OrdersTable";
import { NewOrderModal } from "./components/NewOrderModal";
import { OrderDetailsModal } from "./components/OrderDetailsModal";
import { EditOrderModal } from "./components/EditOrderModal";
import { DeleteOrderConfirmation } from "./components/DeleteOrderConfirmation";
import { useOrderSearch } from "./hooks/useOrderSearch";
import type { Order } from "./hooks/useOrderSearch";

// Local types extending shared types
import styles from "./orders.module.css";

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

// Types for stat filtering
type StatType = 'all' | 'pending' | 'inProgress' | 'completed' | 'rush';

// Helper function to calculate order statistics (moved outside component)
const calculateOrderStats = (orders: Order[]): OrderStats => {
  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
  const inProgressOrders = orders.filter(order => order.status === 'IN_PROGRESS').length;
  const completedOrders = orders.filter(order => order.status === 'COMPLETED').length;
  const rushOrders = orders.filter(order => order.priority === 'RUSH').length;
  const overdueOrders = orders.filter(order => 
    new Date(order.dueDate) < new Date() && order.status !== 'COMPLETED'
  ).length;
  const totalValue = orders.reduce((sum, order) => sum + order.totalValue, 0);
  const avgOrderValue = orders.length > 0 ? totalValue / orders.length : 0;
  
  return {
    totalOrders: orders.length,
    pendingOrders,
    inProgressOrders,
    completedOrders,
    rushOrders,
    overdueOrders,
    totalValue,
    avgOrderValue,
  };
};

// Helper function for handling stat click filters (moved outside component)
const handleStatFiltering = (statType: StatType, orderSearch: any) => {
  switch (statType) {
    case 'all':
      orderSearch.setStatusFilter('ALL');
      orderSearch.setPriorityFilter('ALL');
      break;
    case 'pending':
      orderSearch.setStatusFilter('PENDING');
      orderSearch.setPriorityFilter('ALL');
      break;
    case 'inProgress':
      orderSearch.setStatusFilter('IN_PROGRESS');
      orderSearch.setPriorityFilter('ALL');
      break;
    case 'completed':
      orderSearch.setStatusFilter('COMPLETED');
      orderSearch.setPriorityFilter('ALL');
      break;
    case 'rush':
      orderSearch.setStatusFilter('ALL');
      orderSearch.setPriorityFilter('RUSH');
      break;
  }
};

// Initialization helpers (moved outside component)
const createDelayedStateUpdate = (delay: number = 100) => {
  return (updateFn: () => void): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        updateFn();
        resolve();
      }, delay);
    });
  };
};

const createPreloadParts = (updateInitializationState: (updates: any) => void) => async () => {
  try {
    await fetch('/api/parts');
  } catch (error) {
    console.warn('Parts preload failed:', error);
  }
  updateInitializationState({ parts: true });
};

const createSyncCustomers = (updateInitializationState: (updates: any) => void) => async () => {
  try {
    await fetch('/api/quickbooks/sync-customers', { method: 'POST' });
  } catch (error) {
    console.warn('QuickBooks sync failed:', error);
  }
  updateInitializationState({ customers: true, quickbooks: true });
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function CustomerOrdersPage() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [isPageReady, setIsPageReady] = useState(false);
  const [pageInitialization, setPageInitialization] = useState({
    orders: false,
    parts: false,
    customers: false,
    quickbooks: false
  });

  // Use database search instead of client-side filtering
  const orderSearch = useOrderSearch();

  // Helper functions for initialization
  const updateInitializationState = (updates: Partial<typeof pageInitialization>) => {
    setPageInitialization(prev => ({ ...prev, ...updates }));
  };

  const delayedStateUpdate = createDelayedStateUpdate();

  // Preload critical data before rendering components
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const preloadParts = createPreloadParts(updateInitializationState);
    const syncCustomers = createSyncCustomers(updateInitializationState);
    const initializeOrders = async () => {
      orderSearch.refetch();
      return delayedStateUpdate(() => updateInitializationState({ orders: true }));
    };

    const initializePage = async () => {
      setMounted(true);
      await Promise.allSettled([preloadParts(), syncCustomers(), initializeOrders()]);
      return delayedStateUpdate(() => setIsPageReady(true));
    };

    initializePage().catch(error => {
      console.error('Page initialization error:', error);
      delayedStateUpdate(() => setIsPageReady(true));
    });
  }, []);

  // Calculate stats when orders change
  useEffect(() => {
    if (orderSearch.orders.length > 0) {
      setStats(calculateOrderStats(orderSearch.orders));
    }
  }, [orderSearch.orders]);

  // Shared hooks for functionality
  const pagination = usePagination(orderSearch.orders, { 
    initialPage: 1, 
    initialItemsPerPage: 10 
  });

  // Modal management using shared hook
  const newOrderModal = useModal();
  const detailsModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  
  // Selected order for modals
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleNewOrder = () => {
    newOrderModal.open();
  };

  const handleStatClick = (statType: StatType) => {
    handleStatFiltering(statType, orderSearch);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    detailsModal.open();
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    editModal.open();
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    deleteModal.open();
  };

  // Get paginated data
  const paginatedOrders = pagination.getPaginatedData(orderSearch.orders);
  
  // Helper function to determine if a stat card is active
  const isStatActive = (statType: 'all' | 'pending' | 'inProgress' | 'completed' | 'rush'): boolean => {
    switch (statType) {
      case 'all':
        return orderSearch.statusFilter === 'ALL' && orderSearch.priorityFilter === 'ALL';
      case 'pending':
        return orderSearch.statusFilter === 'PENDING';
      case 'inProgress':
        return orderSearch.statusFilter === 'IN_PROGRESS';
      case 'completed':
        return orderSearch.statusFilter === 'COMPLETED';
      case 'rush':
        return orderSearch.priorityFilter === 'RUSH';
      default:
        return false;
    }
  };

  // Enhanced loading screen with initialization progress
  if (!mounted || !isPageReady) {
    const completedTasks = Object.values(pageInitialization).filter(Boolean).length;
    const totalTasks = Object.keys(pageInitialization).length;
    const progress = (completedTasks / totalTasks) * 100;

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))',
        color: '#cbd5e1'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ 
            marginBottom: '24px',
            fontSize: '3rem',
            filter: 'drop-shadow(0 4px 8px rgba(30, 64, 175, 0.3))'
          }}>
            📋
          </div>
          
          <Title order={2} style={{ 
            color: '#f1f5f9', 
            marginBottom: '16px',
            fontWeight: 600
          }}>
            Loading DES-BOMS Orders
          </Title>
          
          <Text size="md" style={{ 
            color: '#94a3b8', 
            marginBottom: '32px',
            lineHeight: 1.5
          }}>
            Initializing order management system...
          </Text>

          <div style={{ marginBottom: '24px' }}>
            <Loader size="lg" color="#1e40af" />
          </div>

          {/* Progress indicator */}
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: 'rgba(51, 65, 85, 0.5)',
            borderRadius: '2px',
            marginBottom: '16px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#1e40af',
              borderRadius: '2px',
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>

          {/* Status indicators */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            fontSize: '0.875rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              color: pageInitialization.parts ? '#10b981' : '#64748b'
            }}>
              <span>Loading parts database</span>
              <span>{pageInitialization.parts ? '✓' : '⋯'}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              color: pageInitialization.customers ? '#10b981' : '#64748b'
            }}>
              <span>Syncing customer data</span>
              <span>{pageInitialization.customers ? '✓' : '⋯'}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              color: pageInitialization.quickbooks ? '#10b981' : '#64748b'
            }}>
              <span>QuickBooks integration</span>
              <span>{pageInitialization.quickbooks ? '✓' : '⋯'}</span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              color: pageInitialization.orders ? '#10b981' : '#64748b'
            }}>
              <span>Loading order data</span>
              <span>{pageInitialization.orders ? '✓' : '⋯'}</span>
            </div>
          </div>

          <Text size="xs" style={{ 
            color: '#64748b', 
            marginTop: '24px',
            fontStyle: 'italic'
          }}>
            Ensuring all components are ready for optimal performance
          </Text>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerAccent} />
          
          <Group justify="space-between" align="center" style={{ marginBottom: 20, position: "relative" }}>
            <div>
              <Group gap="md" align="center" style={{ marginBottom: 12 }}>
                <div className={styles.iconBox}>
                  📋
                </div>
                <div>
                  <Title order={1} className={styles.title}>
                    DES-BOMS Order Management
                  </Title>
                  <Text size="md" className={styles.subtitle}>
                    Customer Orders • Line Items • Manufacturing Tracking • Priority Management (Rush/Standard/Hold)
                  </Text>
                  {/* QuickBooks Connection Status */}
                  <div style={{ marginTop: 8 }}>
                    <QuickBooksStatus 
                      compact={true}
                      showActions={false}
                      onConnectionChange={(connected) => {
                        // Optional: Handle connection status changes
                        if (connected) {
                          // Optionally refresh customer data when connected
                          orderSearch.refetch();
                        }
                      }}
                    />
                  </div>
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
        {orderSearch.loading && (
          <div className={styles.loadingContainer}>
            <Loader size="lg" color="#1e40af" />
            <Text size="md" className={styles.loadingText}>
              Loading order data...
            </Text>
          </div>
        )}

        {/* Error State */}
        {orderSearch.error && (
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
            <Text style={{ color: "#fca5a5" }}>{orderSearch.error}</Text>
          </Alert>
        )}

        {/* Order Statistics using shared component */}
        {stats && (
          <StatisticsCards
            cards={[
              {
                id: 'total',
                title: "Total Orders",
                value: stats.totalOrders,
                subtitle: `$${(stats.totalValue / 1000).toFixed(0)}K total value`,
                gradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1a365d 100%)",
                bgAccent: "rgba(30, 64, 175, 0.04)",
                shadowColor: "rgba(30, 64, 175, 0.2)",
                onClick: () => handleStatClick('all'),
                isActive: isStatActive('all'),
              },
              {
                id: 'inProgress',
                title: "In Progress",
                value: stats.inProgressOrders,
                subtitle: "Currently active",
                gradient: "linear-gradient(135deg, #0e7490 0%, #0c6478 50%, #155e75 100%)",
                bgAccent: "rgba(14, 116, 144, 0.04)",
                shadowColor: "rgba(14, 116, 144, 0.2)",
                onClick: () => handleStatClick('inProgress'),
                isActive: isStatActive('inProgress'),
              },
              {
                id: 'rush',
                title: "Rush Orders",
                value: stats.rushOrders,
                subtitle: "High priority",
                gradient: "linear-gradient(135deg, #b91c1c 0%, #991b1b 50%, #7f1d1d 100%)",
                bgAccent: "rgba(185, 28, 28, 0.04)",
                shadowColor: "rgba(185, 28, 28, 0.2)",
                onClick: () => handleStatClick('rush'),
                isActive: isStatActive('rush'),
              },
              {
                id: 'completed',
                title: "Completed",
                value: stats.completedOrders,
                subtitle: "This period",
                gradient: "linear-gradient(135deg, #047857 0%, #065f46 50%, #064e3b 100%)",
                bgAccent: "rgba(4, 120, 87, 0.04)",
                shadowColor: "rgba(4, 120, 87, 0.2)",
                onClick: () => handleStatClick('completed'),
                isActive: isStatActive('completed'),
              },
            ]}
          />
        )}

        {/* Filters using shared component */}
        <FilterBar
          searchTerm={orderSearch.searchTerm}
          onSearchChange={orderSearch.setSearchTerm}
          searchPlaceholder="Search by customer, order number, part number, or drawing..."
          statusFilter={orderSearch.statusFilter}
          onStatusChange={orderSearch.setStatusFilter}
          statusOptions={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'ON_HOLD', label: 'On Hold' },
            { value: 'CANCELLED', label: 'Cancelled' },
          ]}
          priorityFilter={orderSearch.priorityFilter}
          onPriorityChange={orderSearch.setPriorityFilter}
          priorityOptions={[
            { value: 'ALL', label: 'All Priorities' },
            { value: 'LOW', label: 'Low' },
            { value: 'NORMAL', label: 'Normal' },
            { value: 'HIGH', label: 'High' },
            { value: 'RUSH', label: 'Rush' },
          ]}
          actionButton={{
            label: 'New Order',
            onClick: handleNewOrder,
            variant: 'primary'
          }}
        />

        {/* Orders Table - Using shared error boundary */}
        <ErrorBoundary>
          <OrdersTable
            orders={paginatedOrders}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
            onDeleteOrder={handleDeleteOrder}
            loading={orderSearch.loading}
            emptyMessage="No orders found matching your criteria"
          />

          {/* Pagination using shared component */}
          {orderSearch.orders.length > 0 && (
            <Pagination
              pagination={pagination}
              totalItems={orderSearch.orders.length}
            />
          )}
        </ErrorBoundary>

        {/* Modals */}
        <NewOrderModal
          opened={newOrderModal.isOpen}
          onClose={newOrderModal.close}
          onOrderCreated={() => {
            // Refresh the orders data when a new order is created
            orderSearch.refetch();
          }}
          isPageReady={isPageReady}
        />
        
        <OrderDetailsModal
          opened={detailsModal.isOpen}
          onClose={detailsModal.close}
          order={selectedOrder}
          onEdit={handleEditOrder}
        />
        
        <EditOrderModal
          opened={editModal.isOpen}
          onClose={editModal.close}
          order={selectedOrder}
          onOrderUpdated={() => {
            // Refresh the orders data when an order is updated
            orderSearch.refetch();
            setSelectedOrder(null);
          }}
        />
        
        <DeleteOrderConfirmation
          opened={deleteModal.isOpen}
          onClose={deleteModal.close}
          order={selectedOrder}
          onOrderDeleted={() => {
            // Refresh the orders data when an order is deleted
            orderSearch.refetch();
            setSelectedOrder(null);
          }}
        />
      </div>
    </main>
  );
}
