/**
 * Batch Management Page - DES-BOMS Batch Routing Module
 *
 * This page implements the batch routing and management requirements from the
 * DES-BOMS specification document:
 *
 * 3. Batch & Routing Management
 * 3.1 Batch Definition - System-generated batch IDs with line item linking
 * 3.2 Routing Steps - Sequential workstation routing with time estimates
 * 3.3 Work Traveler Generation - Printable routing documentation
 *
 * Features:
 * - Complete batch lifecycle management (create, start, track, complete)
 * - Routing step configuration with workstation assignments
 * - Real-time batch progress tracking
 * - Work traveler generation for shop floor
 * - Batch priority management (Rush / Standard / Hold)
 * - Manufacturing status monitoring and alerts
 */

'use client';

import { Text, Group, Loader, Button } from '@mantine/core';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { LoadingScreen } from '../components/LoadingScreen';
import { usePageInitialization } from '../../hooks/usePageInitialization';
import { StandardPage } from '../components/ui/StandardPage';
import theme from '../theme';

// Shared utilities and components
import { usePagination } from '../../hooks/usePagination';
import { useModal } from '../../hooks/useModal';
import { StatisticsCards } from '../components/ui/StatisticsCards';
import { Pagination } from '../components/ui/Pagination';

// Batch-specific components and hooks
import { BatchTable } from './components/BatchTable';
import { NewBatchModal } from './components/NewBatchModal';
import { BatchDetailsModal } from './components/BatchDetailsModal';
import { EditBatchModal } from './components/EditBatchModal';
import { DeleteBatchConfirmation } from './components/DeleteBatchConfirmation';
import { WorkTravelerModal } from './components/WorkTravelerModal';
import {
  BatchTableSkeleton,
  StatsSkeleton,
  FilterBarSkeleton,
} from './components/LoadingSkeletons';
import { ErrorWithRetry } from './components/ErrorComponents';
import { BulkActionsToolbar } from './components/BulkActionsToolbar';
import { EnhancedSearch } from './components/EnhancedSearch';
import { useBatchSearch } from './hooks/useBatchSearch';
import { useBulkSelection } from './hooks/useBulkSelection';

import type { Batch, BatchStatusFilter, BatchPriorityFilter } from './types';
import styles from './batches.module.css';

interface BatchStats {
  totalBatches: number;
  queuedBatches: number;
  inProgressBatches: number;
  completedBatches: number;
  rushBatches: number;
  overdueBatches: number;
  avgCompletionTime: number;
  activeWorkstations: number;
}

export default function BatchManagementPage() {
  return (
    <Suspense>
      <BatchManagementPageInner />
    </Suspense>
  );
}

function BatchManagementPageInner() {
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<BatchStats | null>(null);
  const [bulkSelectionMode, setBulkSelectionMode] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Page initialization
  const { mounted, isPageReady, pageInitialization, initializePage } =
    usePageInitialization({
      initialTasks: ['batches', 'workstations', 'components'],
      autoStart: false,
    });

  // Use batch search hook for database-driven filtering
  const batchSearch = useBatchSearch();

  // Bulk selection for batch operations
  const bulkSelection = useBulkSelection(() => batchSearch.refetch());

  // Real-time updates via Server-Sent Events (temporarily disabled to reduce server load)
  // const liveUpdates = useLiveBatchUpdates((update) => {
  //   // Refresh data when updates are received
  //   if (update.type !== 'heartbeat' && update.type !== 'connected') {
  //     batchSearch.refetch();
  //   }
  // });

  // Ensure component is mounted before rendering
  useEffect(() => {
    if (typeof window === 'undefined') return;

    initializePage([
      {
        name: 'batches',
        fn: async () => {
          batchSearch.refetch();
        },
      },
      {
        name: 'workstations',
        fn: async () => {
          // Preload workstation data if needed
          try {
            await fetch('/api/workstations');
          } catch (error) {
            console.warn('Workstations preload failed:', error);
          }
        },
      },
      { name: 'components' },
    ]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle QR code batch lookup and order filtering
  useEffect(() => {
    if (mounted) {
      const batchId = searchParams.get('batch');
      const orderId = searchParams.get('order');

      if (batchId) {
        // Set search term to the batch ID to filter the results
        batchSearch.setSearchTerm(batchId);

        // After batches are loaded, try to find and open the specific batch
        setTimeout(() => {
          const targetBatch = batchSearch.batches.find(
            batch => batch.batchId === batchId
          );
          if (targetBatch) {
            handleViewBatch(targetBatch);
          }
        }, 1000);
      }

      if (orderId) {
        // Filter batches by order ID
        batchSearch.setOrderFilter(orderId);
      }
    }
  }, [mounted, searchParams, batchSearch, initializePage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shared hooks for functionality
  const pagination = usePagination(batchSearch.batches, {
    initialPage: 1,
    initialItemsPerPage: 15,
  });

  // Modal management
  const newBatchModal = useModal();
  const detailsModal = useModal();
  const editModal = useModal();
  const deleteModal = useModal();
  const workTravelerModal = useModal();

  // Selected batch for modals
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  // Helper function to calculate batch statistics
  const calculateBatchStats = (batches: Batch[]): BatchStats => {
    const queuedBatches = batches.filter(
      batch => batch.status === 'QUEUED'
    ).length;
    const inProgressBatches = batches.filter(
      batch => batch.status === 'IN_PROGRESS'
    ).length;
    const completedBatches = batches.filter(
      batch => batch.status === 'COMPLETED'
    ).length;
    const rushBatches = batches.filter(
      batch => batch.priority === 'RUSH'
    ).length;

    // Calculate overdue batches
    const now = new Date();
    const overdueBatches = batches.filter(
      batch =>
        batch.estimatedCompletion &&
        new Date(batch.estimatedCompletion) < now &&
        batch.status !== 'COMPLETED'
    ).length;

    // Calculate average completion time from completed batches
    const completedBatchesWithTimes = batches.filter(
      batch =>
        batch.status === 'COMPLETED' &&
        batch.startDate &&
        batch.actualCompletion
    );

    let avgCompletionTime = 0;
    if (completedBatchesWithTimes.length > 0) {
      const totalTime = completedBatchesWithTimes.reduce((total, batch) => {
        const start = new Date(batch.startDate!).getTime();
        const end = new Date(batch.actualCompletion!).getTime();
        return total + (end - start);
      }, 0);
      avgCompletionTime = Math.round(
        totalTime / completedBatchesWithTimes.length / (1000 * 60)
      ); // Convert to minutes
    }

    // Count active workstations from in-progress batches
    const activeWorkstationIds = new Set(
      batches
        .filter(batch => batch.status === 'IN_PROGRESS')
        .flatMap(
          batch =>
            batch.routingSteps
              ?.filter(step => step.status === 'IN_PROGRESS')
              ?.map(step => step.workstationId) || []
        )
    );
    const activeWorkstations = activeWorkstationIds.size;

    return {
      totalBatches: batches.length,
      queuedBatches,
      inProgressBatches,
      completedBatches,
      rushBatches,
      overdueBatches,
      avgCompletionTime,
      activeWorkstations,
    };
  };

  // Update stats when batches change
  useEffect(() => {
    if (batchSearch.batches.length > 0) {
      setStats(calculateBatchStats(batchSearch.batches));
    } else if (batchSearch.batches.length === 0 && !batchSearch.loading) {
      // Show empty stats when no batches and not loading
      setStats({
        totalBatches: 0,
        queuedBatches: 0,
        inProgressBatches: 0,
        completedBatches: 0,
        rushBatches: 0,
        overdueBatches: 0,
        avgCompletionTime: 0,
        activeWorkstations: 0,
      });
    }
  }, [batchSearch.batches, batchSearch.loading]);

  const handleStatClick = (
    statType: 'all' | 'queued' | 'inProgress' | 'completed' | 'rush' | 'overdue'
  ) => {
    // Map stat types to database status filters
    switch (statType) {
      case 'all':
        batchSearch.setStatusFilter('ALL');
        batchSearch.setPriorityFilter('ALL');
        break;
      case 'queued':
        batchSearch.setStatusFilter('QUEUED');
        batchSearch.setPriorityFilter('ALL');
        break;
      case 'inProgress':
        batchSearch.setStatusFilter('IN_PROGRESS');
        batchSearch.setPriorityFilter('ALL');
        break;
      case 'completed':
        batchSearch.setStatusFilter('COMPLETED');
        batchSearch.setPriorityFilter('ALL');
        break;
      case 'rush':
        // For rush batches, filter by priority, not status
        batchSearch.setStatusFilter('ALL');
        batchSearch.setPriorityFilter('RUSH');
        break;
      case 'overdue':
        // For overdue batches, use the new overdue filter
        batchSearch.setStatusFilter('ALL');
        batchSearch.setPriorityFilter('ALL');
        batchSearch.setOverdueFilter(true);
        break;
    }
  };

  const handleClearFilters = () => {
    batchSearch.setSearchTerm('');
    batchSearch.setStatusFilter('ALL');
    batchSearch.setPriorityFilter('ALL');
    batchSearch.setOverdueFilter(false);
    setShowAdvancedFilters(false);
    bulkSelection.clearSelection();
  };

  const handleNewBatch = () => {
    newBatchModal.open();
  };

  const handleViewBatch = (batch: Batch) => {
    setSelectedBatch(batch);
    detailsModal.open();
  };

  const handleEditBatch = (batch: Batch) => {
    setSelectedBatch(batch);
    editModal.open();
  };

  const handleDeleteBatch = (batch: Batch) => {
    setSelectedBatch(batch);
    deleteModal.open();
  };

  const handleStartBatch = async (batch: Batch) => {
    try {
      const response = await fetch(`/api/batches/${batch.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'IN_PROGRESS',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start batch');
      }

      // Refresh the data to show updated status
      batchSearch.refetch();
    } catch (error) {
      console.error('Error starting batch:', error);
      // You might want to show a notification here
    }
  };

  const handleViewWorkTraveler = (batch: Batch) => {
    setSelectedBatch(batch);
    workTravelerModal.open();
  };

  // Get paginated data
  const paginatedBatches = pagination.getPaginatedData(batchSearch.batches);

  // Helper function to determine if a stat card is active
  const isStatActive = (
    statType: 'all' | 'queued' | 'inProgress' | 'completed' | 'rush' | 'overdue'
  ): boolean => {
    switch (statType) {
      case 'all':
        return (
          batchSearch.statusFilter === 'ALL' &&
          batchSearch.priorityFilter === 'ALL'
        );
      case 'queued':
        return batchSearch.statusFilter === 'QUEUED';
      case 'inProgress':
        return batchSearch.statusFilter === 'IN_PROGRESS';
      case 'completed':
        return batchSearch.statusFilter === 'COMPLETED';
      case 'rush':
        return batchSearch.priorityFilter === 'RUSH';
      case 'overdue':
        return batchSearch.overdueFilter;
      default:
        return false;
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background:
            'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98))',
        }}
      >
        <Loader size='lg' color='#14b8a6' />
      </div>
    );
  }

  // Show loading screen during initial page load
  if (!mounted || !isPageReady) {
    return (
      <LoadingScreen
        title='Loading Batch Management'
        description='Initializing batch tracking and routing systems...'
        icon='🏭'
        pageInitialization={pageInitialization}
      />
    );
  }

  return (
    <StandardPage
      title='Batch Routing Management'
      subtitle='Track and manage manufacturing batches through workstations'
      icon='🔄'
      accentColor={theme.pageAccents.batches}
      showBackButton={true}
    >
      <div className={styles.container}>
        {/* Loading State with Skeletons */}
        {batchSearch.loading && (
          <>
            <StatsSkeleton />
            <FilterBarSkeleton />
            <BatchTableSkeleton />
          </>
        )}

        {/* Error State with Retry */}
        {batchSearch.error && (
          <ErrorWithRetry
            error={batchSearch.error}
            onRetry={() => batchSearch.refetch()}
            title='Error Loading Batches'
            type='database'
          />
        )}

        {/* Batch Statistics */}
        {!batchSearch.loading && !batchSearch.error && stats && (
          <StatisticsCards
            cards={[
              {
                id: 'total',
                title: 'Total Batches',
                value: stats.totalBatches,
                subtitle: `${stats.activeWorkstations} active workstations`,
                gradient:
                  'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)',
                bgAccent: 'rgba(20, 184, 166, 0.04)',
                shadowColor: 'rgba(20, 184, 166, 0.2)',
                onClick: () => handleStatClick('all'),
                isActive: isStatActive('all'),
              },
              {
                id: 'inProgress',
                title: 'In Progress',
                value: stats.inProgressBatches,
                subtitle: 'Currently routing',
                gradient:
                  'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                bgAccent: 'rgba(59, 130, 246, 0.04)',
                shadowColor: 'rgba(59, 130, 246, 0.2)',
                onClick: () => handleStatClick('inProgress'),
                isActive: isStatActive('inProgress'),
              },
              {
                id: 'rush',
                title: 'Rush Batches',
                value: stats.rushBatches,
                subtitle: 'High priority',
                gradient:
                  'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                bgAccent: 'rgba(239, 68, 68, 0.04)',
                shadowColor: 'rgba(239, 68, 68, 0.2)',
                onClick: () => handleStatClick('rush'),
                isActive: isStatActive('rush'),
              },
              {
                id: 'completed',
                title: 'Completed',
                value: stats.completedBatches,
                subtitle: `${stats.avgCompletionTime}min avg`,
                gradient:
                  'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                bgAccent: 'rgba(16, 185, 129, 0.04)',
                shadowColor: 'rgba(16, 185, 129, 0.2)',
                onClick: () => handleStatClick('completed'),
                isActive: isStatActive('completed'),
              },
            ]}
          />
        )}

        {/* Filters - Custom filter bar for batch-specific types */}
        {!batchSearch.loading && !batchSearch.error && (
          <div
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
              border: '1px solid rgba(51, 65, 85, 0.4)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Group gap='lg' align='flex-end'>
              {/* Enhanced Search with Autocomplete */}
              <EnhancedSearch
                value={batchSearch.searchTerm}
                onChange={value => batchSearch.setSearchTerm(value)}
                onFilterToggle={() =>
                  setShowAdvancedFilters(!showAdvancedFilters)
                }
                onClearFilters={handleClearFilters}
                showAdvancedFilters={showAdvancedFilters}
              />

              {/* Status Filter - Always Visible */}
              <div style={{ minWidth: '160px' }}>
                <Text
                  size='sm'
                  style={{
                    color: '#94a3b8',
                    marginBottom: '8px',
                    fontWeight: 500,
                  }}
                >
                  Status
                </Text>
                <select
                  value={batchSearch.statusFilter}
                  onChange={e =>
                    batchSearch.setStatusFilter(
                      e.target.value as BatchStatusFilter
                    )
                  }
                  style={{
                    width: '100%',
                    height: '44px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderRadius: '8px',
                    padding: '0 16px',
                    color: '#e2e8f0',
                    fontSize: '14px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value='ALL'>All Statuses</option>
                  <option value='QUEUED'>Queued</option>
                  <option value='IN_PROGRESS'>In Progress</option>
                  <option value='COMPLETED'>Completed</option>
                  <option value='ON_HOLD'>On Hold</option>
                  <option value='CANCELLED'>Cancelled</option>
                </select>
              </div>

              {/* Advanced Filters - Conditional */}
              {showAdvancedFilters && (
                <div style={{ minWidth: '140px' }}>
                  <Text
                    size='sm'
                    style={{
                      color: '#94a3b8',
                      marginBottom: '8px',
                      fontWeight: 500,
                    }}
                  >
                    Priority
                  </Text>
                  <select
                    value={batchSearch.priorityFilter}
                    onChange={e =>
                      batchSearch.setPriorityFilter(
                        e.target.value as BatchPriorityFilter
                      )
                    }
                    style={{
                      width: '100%',
                      height: '44px',
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(51, 65, 85, 0.5)',
                      borderRadius: '8px',
                      padding: '0 16px',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value='ALL'>All Priorities</option>
                    <option value='RUSH'>Rush</option>
                    <option value='STANDARD'>Standard</option>
                    <option value='HOLD'>Hold</option>
                  </select>
                </div>
              )}

              {/* Bulk Selection Toggle */}
              <Button
                onClick={() => {
                  setBulkSelectionMode(!bulkSelectionMode);
                }}
                size='md'
                variant={bulkSelectionMode ? 'filled' : 'light'}
                style={{
                  background: bulkSelectionMode
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                    : 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '8px',
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '0 20px',
                  color: bulkSelectionMode ? '#ffffff' : '#a78bfa',
                  boxShadow: bulkSelectionMode
                    ? '0 4px 12px rgba(139, 92, 246, 0.3)'
                    : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {bulkSelectionMode ? 'Exit Selection' : 'Select Multiple'}
              </Button>

              {/* New Batch Button */}
              <Button
                onClick={handleNewBatch}
                size='md'
                style={{
                  background:
                    'linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  height: '44px',
                  fontSize: '14px',
                  fontWeight: 600,
                  padding: '0 24px',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                New Batch
              </Button>
            </Group>
          </div>
        )}

        {/* Batches Table */}
        {!batchSearch.loading && !batchSearch.error && (
          <ErrorBoundary>
            <BatchTable
              batches={paginatedBatches}
              onViewBatch={handleViewBatch}
              onEditBatch={handleEditBatch}
              onDeleteBatch={handleDeleteBatch}
              onStartBatch={handleStartBatch}
              onViewWorkTraveler={handleViewWorkTraveler}
              loading={batchSearch.loading}
              emptyMessage='No batches found matching your criteria'
              bulkSelectionMode={bulkSelectionMode}
              selectedBatches={bulkSelection.selectedBatches}
              onSelectBatch={bulkSelection.toggleBatch}
              onSelectAll={() => bulkSelection.selectAll(paginatedBatches)}
            />

            {/* Pagination */}
            {batchSearch.batches.length > 0 && (
              <Pagination
                pagination={pagination}
                totalItems={batchSearch.batches.length}
              />
            )}
          </ErrorBoundary>
        )}

        {/* Bulk Actions Toolbar */}
        {bulkSelectionMode && (
          <BulkActionsToolbar
            selectedCount={bulkSelection.selectedCount}
            bulkActions={bulkSelection.bulkActions}
            isProcessing={bulkSelection.isProcessing}
          />
        )}

        {/* Modal Components - Fully Implemented */}
        <NewBatchModal
          opened={newBatchModal.isOpen}
          onClose={newBatchModal.close}
          onBatchCreated={() => {
            batchSearch.refetch();
          }}
        />

        <BatchDetailsModal
          opened={detailsModal.isOpen}
          onClose={detailsModal.close}
          batch={selectedBatch}
          onEdit={handleEditBatch}
        />

        <EditBatchModal
          opened={editModal.isOpen}
          onClose={editModal.close}
          batch={selectedBatch}
          onBatchUpdated={() => {
            batchSearch.refetch();
            setSelectedBatch(null);
          }}
        />

        <DeleteBatchConfirmation
          opened={deleteModal.isOpen}
          onClose={deleteModal.close}
          batch={selectedBatch}
          onBatchDeleted={() => {
            batchSearch.refetch();
            setSelectedBatch(null);
          }}
        />

        <WorkTravelerModal
          opened={workTravelerModal.isOpen}
          onClose={workTravelerModal.close}
          batch={selectedBatch}
        />
      </div>
    </StandardPage>
  );
}
