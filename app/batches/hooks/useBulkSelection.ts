/**
 * Hook for managing bulk selection and bulk operations on batches
 */

import { useState, useCallback } from 'react';
import type { Batch } from '../types';

export interface BulkActions {
  updatePriority: (priority: 'RUSH' | 'STANDARD' | 'HOLD') => Promise<void>;
  updateStatus: (status: string) => Promise<void>;
  deleteBatches: () => Promise<void>;
  exportBatches: () => void;
  clearSelection: () => void;
}

export interface UseBulkSelectionReturn {
  selectedBatches: Set<string>;
  isSelected: (batchId: string) => boolean;
  selectBatch: (batchId: string) => void;
  deselectBatch: (batchId: string) => void;
  toggleBatch: (batchId: string) => void;
  selectAll: (batches: Batch[]) => void;
  clearSelection: () => void;
  selectedCount: number;
  bulkActions: BulkActions;
  isProcessing: boolean;
}

export const useBulkSelection = (
  onRefresh?: () => void
): UseBulkSelectionReturn => {
  const [selectedBatches, setSelectedBatches] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  const isSelected = useCallback((batchId: string) => {
    return selectedBatches.has(batchId);
  }, [selectedBatches]);

  const selectBatch = useCallback((batchId: string) => {
    setSelectedBatches(prev => new Set([...prev, batchId]));
  }, []);

  const deselectBatch = useCallback((batchId: string) => {
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      newSet.delete(batchId);
      return newSet;
    });
  }, []);

  const toggleBatch = useCallback((batchId: string) => {
    setSelectedBatches(prev => {
      const newSet = new Set(prev);
      if (newSet.has(batchId)) {
        newSet.delete(batchId);
      } else {
        newSet.add(batchId);
      }
      return newSet;
    });
  }, []);

  const selectAll = useCallback((batches: Batch[]) => {
    const allCurrentSelected = batches.every(batch => selectedBatches.has(batch.id));
    
    if (allCurrentSelected) {
      // If all current batches are selected, deselect them
      setSelectedBatches(prev => {
        const newSet = new Set(prev);
        batches.forEach(batch => newSet.delete(batch.id));
        return newSet;
      });
    } else {
      // Otherwise, select all current batches
      setSelectedBatches(prev => {
        const newSet = new Set(prev);
        batches.forEach(batch => newSet.add(batch.id));
        return newSet;
      });
    }
  }, [selectedBatches]);

  const clearSelection = useCallback(() => {
    setSelectedBatches(new Set());
  }, []);

  // Bulk action implementations
  const updatePriority = useCallback(async (priority: 'RUSH' | 'STANDARD' | 'HOLD') => {
    if (selectedBatches.size === 0) {
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/batches/bulk-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchIds: Array.from(selectedBatches),
          updates: { priority },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update batch priorities');
      }

      clearSelection();
      onRefresh?.();
    } catch (error) {
      console.error('Error updating batch priorities:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [selectedBatches, clearSelection, onRefresh]);

  const updateStatus = useCallback(async (status: string) => {
    if (selectedBatches.size === 0) return;

    console.log('Updating status for batches:', Array.from(selectedBatches), 'to:', status);
    setIsProcessing(true);
    try {
      const response = await fetch('/api/batches/bulk-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchIds: Array.from(selectedBatches),
          updates: { status },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update batch statuses');
      }

      clearSelection();
      onRefresh?.();
    } catch (error) {
      console.error('Error updating batch statuses:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [selectedBatches, clearSelection, onRefresh]);

  const deleteBatches = useCallback(async () => {
    if (selectedBatches.size === 0) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/batches/bulk-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchIds: Array.from(selectedBatches),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete batches');
      }

      clearSelection();
      onRefresh?.();
    } catch (error) {
      console.error('Error deleting batches:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [selectedBatches, clearSelection, onRefresh]);

  const exportBatches = useCallback(() => {
    if (selectedBatches.size === 0) return;

    // Create CSV export of selected batches
    const exportUrl = `/api/batches/export?batchIds=${Array.from(selectedBatches).join(',')}`;
    window.open(exportUrl, '_blank');
  }, [selectedBatches]);

  const bulkActions: BulkActions = {
    updatePriority,
    updateStatus,
    deleteBatches,
    exportBatches,
    clearSelection,
  };

  return {
    selectedBatches,
    isSelected,
    selectBatch,
    deselectBatch,
    toggleBatch,
    selectAll,
    clearSelection,
    selectedCount: selectedBatches.size,
    bulkActions,
    isProcessing,
  };
};
