/**
 * Customer Orders Page - DES-BOMS Customer & Order Management Module
 * 
 * This page implements the customer and order management requirements from the 
 * DES-BOMS specification document:
 * 
 * 2. Customer & Order Management
 * 2.1 Customer Information

  const handleNavigateToWorkstation = (workstationId: string) => {
    window.location.href = `/workstations/${workstationId}`;
  }; and contact management
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

import { Title, Text, Group, Loader, Alert, Button, Progress } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

// Shared utilities and components
import { usePagination } from "../../hooks/usePagination";
import { useModal } from "../../hooks/useModal";
import { StatisticsCards } from "../components/ui/StatisticsCards";
import { FilterBar } from "../components/ui/FilterBar";
import { Pagination } from "../components/ui/Pagination";
import { OrdersTable } from "./components/OrdersTable";
import { NewOrderModal } from "./components/NewOrderModal";
import { OrderDetailsModal } from "./components/OrderDetailsModal";
import { EditOrderModal } from "./components/EditOrderModal";
import { DeleteOrderConfirmation } from "./components/DeleteOrderConfirmation";
import { CompleteOrderModal } from "./components/CompleteOrderModal";
import { ShipOrderModal } from "./components/ShipOrderModal";
import { OrderBatchIntegrationModal } from "./components/OrderBatchIntegrationModal";
import { SmartBatchGenerationModal } from "./components/SmartBatchGenerationModal";
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

// Custom hook for page initialization
const usePageInitialization = () => {
  const [mounted, setMounted] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [pageInitialization, setPageInitialization] = useState({
    orders: false,
    parts: false,
    customers: false,
    quickbooks: false
  });

  const orderSearch = useOrderSearch();

  const updateInitializationState = (updates: Partial<typeof pageInitialization>) => {
    setPageInitialization(prev => ({ ...prev, ...updates }));
  };

  const delayedStateUpdate = createDelayedStateUpdate();

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

  return {
    mounted,
    isPageReady,
    pageInitialization,
    orderSearch
  };
};

// Custom hook for modal management
const useOrderModals = () => {
  const newOrderModal = useModal();
  const detailsModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  const completeModal = useModal();
  const shipModal = useModal();
  const batchIntegrationModal = useModal();
  const smartBatchModal = useModal();
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return {
    modals: {
      newOrderModal,
      detailsModal,
      editModal,
      deleteModal,
      completeModal,
      shipModal,
      batchIntegrationModal,
      smartBatchModal
    },
    selectedOrder,
    setSelectedOrder
  };
};

// Custom hook for order stats
const useOrderStats = (orders: Order[]) => {
  const [stats, setStats] = useState<OrderStats | null>(null);

  useEffect(() => {
    if (orders.length > 0) {
      setStats(calculateOrderStats(orders));
    }
  }, [orders]);

  return stats;
};

// Custom hook for order action handlers
const useOrderActions = (modals: ReturnType<typeof useOrderModals>['modals'], setSelectedOrder: (order: Order | null) => void) => {
  const handleNewOrder = () => {
    modals.newOrderModal.open();
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    modals.detailsModal.open();
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    modals.editModal.open();
  };

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order);
    modals.deleteModal.open();
  };

  const handleCompleteOrder = (order: Order) => {
    setSelectedOrder(order);
    modals.completeModal.open();
  };

  const handleShipOrder = (order: Order) => {
    setSelectedOrder(order);
    modals.shipModal.open();
  };

  const handleBatchIntegration = (order: Order) => {
    setSelectedOrder(order);
    modals.batchIntegrationModal.open();
  };

  const handleSmartBatch = (order: Order) => {
    setSelectedOrder(order);
    modals.smartBatchModal.open();
  };

  return {
    handleNewOrder,
    handleViewOrder,
    handleEditOrder,
    handleDeleteOrder,
    handleCompleteOrder,
    handleShipOrder,
    handleBatchIntegration,
    handleSmartBatch
  };
};

// Helper function for navigation handlers
const createNavigationHandlers = () => {
  const handleNavigateToBatch = (batchId: string) => {
    // Navigate to batches page with specific batch or show all
    if (batchId === 'all') {
      window.open('/batches', '_blank');
    } else {
      window.open(`/batches?batch=${batchId}`, '_blank');
    }
  };

  const handleNavigateToWorkstation = (workstationId: string) => {
    // Navigate to workstations page with specific workstation
    window.open(`/workstations?workstation=${workstationId}`, '_blank');
  };

  return { handleNavigateToBatch, handleNavigateToWorkstation };
};

// Helper function to determine if a stat card is active
const isStatActive = (
  statType: 'all' | 'pending' | 'inProgress' | 'completed' | 'rush',
  orderSearch: ReturnType<typeof useOrderSearch>
): boolean => {
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

// Helper function to create stats cards configuration
const createStatsCards = (stats: OrderStats | null, orderSearch: ReturnType<typeof useOrderSearch>, handleStatClick: (statType: StatType) => void) => {
  if (!stats) return [];
  
  return [
    {
      id: 'all',
      title: "Total Orders",
      value: stats.totalOrders,
      subtitle: `$${(stats.totalValue / 1000).toFixed(0)}K total value`,
      gradient: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1a365d 100%)",
      bgAccent: "rgba(30, 64, 175, 0.04)",
      shadowColor: "rgba(30, 64, 175, 0.2)",
      onClick: () => handleStatClick('all'),
      isActive: isStatActive('all', orderSearch),
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
      isActive: isStatActive('inProgress', orderSearch),
    },
    {
      id: 'rush',
      title: "Rush Orders",
      value: stats.rushOrders,
      subtitle: "High priority",
      gradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)",
      bgAccent: "rgba(220, 38, 38, 0.04)",
      shadowColor: "rgba(220, 38, 38, 0.2)",
      onClick: () => handleStatClick('rush'),
      isActive: isStatActive('rush', orderSearch),
    },
    {
      id: 'completed',
      title: "Completed",
      value: stats.completedOrders,
      subtitle: "This period",
      gradient: "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
      bgAccent: "rgba(5, 150, 105, 0.04)",
      shadowColor: "rgba(5, 150, 105, 0.2)",
      onClick: () => handleStatClick('completed'),
      isActive: isStatActive('completed', orderSearch),
    },
  ];
};

// Main page content component to reduce cognitive complexity
const OrdersPageContent = ({ 
  stats, 
  statsCards, 
  orderSearch, 
  paginatedOrders, 
  pagination, 
  actions,
  modals,
  selectedOrder,
  setSelectedOrder,
  handleNavigateToBatch, 
  handleNavigateToWorkstation
}: {
  stats: OrderStats | null;
  statsCards: ReturnType<typeof createStatsCards>;
  orderSearch: ReturnType<typeof useOrderSearch>;
  paginatedOrders: Order[];
  pagination: ReturnType<typeof usePagination<Order>>;
  actions: ReturnType<typeof useOrderActions>;
  modals: ReturnType<typeof useOrderModals>['modals'];
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  handleNavigateToBatch: (batchId: string) => void;
  handleNavigateToWorkstation: (workstationId: string) => void;
}) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <Group justify="space-between" align="center">
            <div className={styles.headerContent}>
              <Group align="center" gap="lg">
                <div className={styles.titleSection}>
                  <h1 className={styles.title}>Customer Orders</h1>
                  <Text className={styles.subtitle}>
                    Manage and track all customer orders
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
            {orderSearch.error}
          </Alert>
        )}

        {/* Order Statistics using shared component */}
        {stats && (
          <StatisticsCards
            cards={statsCards}
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
            { value: 'ALL', label: 'All Status' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'SHIPPED', label: 'Shipped' },
            { value: 'CANCELLED', label: 'Cancelled' }
          ]}
          priorityFilter={orderSearch.priorityFilter}
          onPriorityChange={orderSearch.setPriorityFilter}
          priorityOptions={[
            { value: 'ALL', label: 'All Priority' },
            { value: 'STANDARD', label: 'Standard' },
            { value: 'RUSH', label: 'Rush' },
            { value: 'URGENT', label: 'Urgent' }
          ]}
        />

        {/* New Order Button */}
        <div style={{ marginBottom: '1rem' }}>
          <Button
            onClick={actions.handleNewOrder}
            style={{
              background: "#1e40af",
              border: "none",
              color: "white",
            }}
          >
            New Order
          </Button>
        </div>

        {/* Orders Table - Using shared error boundary */}
        <ErrorBoundary>
          <OrdersTable
            orders={paginatedOrders}
            onViewOrder={actions.handleViewOrder}
            onEditOrder={actions.handleEditOrder}
            onDeleteOrder={actions.handleDeleteOrder}
            onCompleteOrder={actions.handleCompleteOrder}
            onShipOrder={actions.handleShipOrder}
            onViewBatches={actions.handleBatchIntegration}
            onSmartGenerate={actions.handleSmartBatch}
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
          opened={modals.newOrderModal.isOpen}
          onClose={modals.newOrderModal.close}
          onOrderCreated={() => {
            // Refresh the orders data when a new order is created
            orderSearch.refetch();
          }}
          isPageReady={true}
        />
        
        <OrderDetailsModal
          opened={modals.detailsModal.isOpen}
          onClose={modals.detailsModal.close}
          order={selectedOrder}
          onEdit={actions.handleEditOrder}
        />
        
        <EditOrderModal
          opened={modals.editModal.isOpen}
          onClose={modals.editModal.close}
          order={selectedOrder}
          onOrderUpdated={() => {
            // Refresh the orders data when an order is updated
            orderSearch.refetch();
            setSelectedOrder(null);
          }}
        />
        
        <DeleteOrderConfirmation
          opened={modals.deleteModal.isOpen}
          onClose={modals.deleteModal.close}
          order={selectedOrder}
          onOrderDeleted={() => {
            // Refresh the orders data when an order is deleted
            orderSearch.refetch();
            setSelectedOrder(null);
          }}
        />
        
        <CompleteOrderModal
          opened={modals.completeModal.isOpen}
          onClose={modals.completeModal.close}
          order={selectedOrder}
          onOrderCompleted={() => {
            // Refresh the orders data when an order is completed
            orderSearch.refetch();
            setSelectedOrder(null);
          }}
        />
        
        <ShipOrderModal
          opened={modals.shipModal.isOpen}
          onClose={modals.shipModal.close}
          order={selectedOrder}
          onOrderShipped={() => {
            // Refresh the orders data when an order is shipped
            orderSearch.refetch();
            setSelectedOrder(null);
          }}
        />
        
        <OrderBatchIntegrationModal
          opened={modals.batchIntegrationModal.isOpen}
          onClose={modals.batchIntegrationModal.close}
          order={selectedOrder}
          onNavigateToBatch={handleNavigateToBatch}
          onNavigateToWorkstation={handleNavigateToWorkstation}
        />

        <SmartBatchGenerationModal
          opened={modals.smartBatchModal.isOpen}
          onClose={modals.smartBatchModal.close}
          order={selectedOrder}
          onBatchesCreated={() => {
            modals.smartBatchModal.close();
            orderSearch.refetch();
          }}
        />
      </div>
    </main>
  );
};

// Simple loading screen component
const LoadingScreen = ({ pageInitialization }: { pageInitialization: Record<string, boolean> }) => {
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
        <div style={{ marginBottom: '24px', fontSize: '3rem' }}>📋</div>
        <Title order={2} style={{ marginBottom: '16px', fontWeight: 700 }}>
          Loading Orders System
        </Title>
        <Text style={{ marginBottom: '32px', opacity: 0.8, fontSize: '1.1rem' }}>
          Initializing customer orders and system components...
        </Text>
        <Progress value={progress} size="lg" radius="xl" style={{ marginBottom: '20px' }} />
        <Text style={{ fontSize: '0.95rem', opacity: 0.6 }}>
          {completedTasks} of {totalTasks} components ready
        </Text>
      </div>
    </div>
  );
};

export default function CustomerOrdersPage() {
  const { mounted, isPageReady, pageInitialization, orderSearch } = usePageInitialization();
  const { modals, selectedOrder, setSelectedOrder } = useOrderModals();
  const stats = useOrderStats(orderSearch.orders);
  const pagination = usePagination(orderSearch.orders, { initialPage: 1, initialItemsPerPage: 10 });
  const actions = useOrderActions(modals, setSelectedOrder);
  const { handleNavigateToBatch, handleNavigateToWorkstation } = createNavigationHandlers();
  
  const handleStatClick = (statType: StatType) => handleStatFiltering(statType, orderSearch);
  const paginatedOrders = pagination.getPaginatedData(orderSearch.orders);
  const statsCards = createStatsCards(stats, orderSearch, handleStatClick);

  if (!mounted || !isPageReady) {
    return <LoadingScreen pageInitialization={pageInitialization} />;
  }

  return (
    <OrdersPageContent
      stats={stats}
      statsCards={statsCards}
      orderSearch={orderSearch}
      paginatedOrders={paginatedOrders}
      pagination={pagination}
      actions={actions}
      modals={modals}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      handleNavigateToBatch={handleNavigateToBatch}
      handleNavigateToWorkstation={handleNavigateToWorkstation}
    />
  );
}
