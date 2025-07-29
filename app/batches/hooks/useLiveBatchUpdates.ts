import { useEffect, useState, useCallback } from 'react';
import { notifications } from '@mantine/notifications';

interface BatchUpdate {
  type: 'status_change' | 'priority_change' | 'completion' | 'overdue_alert' | 'heartbeat' | 'connected';
  batchId?: string;
  status?: string;
  priority?: string;
  message?: string;
  timestamp: string;
}

interface LiveBatchState {
  connected: boolean;
  lastUpdate: string | null;
  updates: BatchUpdate[];
}

export const useLiveBatchUpdates = (onBatchUpdate?: (update: BatchUpdate) => void) => {
  const [state, setState] = useState<LiveBatchState>({
    connected: false,
    lastUpdate: null,
    updates: []
  });

  const handleUpdate = useCallback((update: BatchUpdate) => {
    setState(prev => ({
      ...prev,
      lastUpdate: update.timestamp,
      updates: [update, ...prev.updates.slice(0, 49)] // Keep last 50 updates
    }));

    // Call external update handler
    if (onBatchUpdate) {
      onBatchUpdate(update);
    }

    // Show contextual notifications
    switch (update.type) {
      case 'status_change':
        notifications.show({
          title: 'Batch Status Updated',
          message: `Batch ${update.batchId} status changed to ${update.status}`,
          color: update.status === 'completed' ? 'green' : 'blue',
          autoClose: 5000
        });
        break;

      case 'completion':
        notifications.show({
          title: 'Batch Completed',
          message: `Batch ${update.batchId} has been completed`,
          color: 'green',
          autoClose: 7000
        });
        break;

      case 'overdue_alert':
        notifications.show({
          title: 'Batch Overdue',
          message: `Batch ${update.batchId} is now overdue`,
          color: 'red',
          autoClose: false,
          withCloseButton: true
        });
        break;
    }
  }, [onBatchUpdate]);

  useEffect(() => {
    // TEMPORARILY DISABLED - No EventSource connections to prevent server spam
    console.log('Live batch updates disabled to prevent server overload');
    
    return () => {
      // No cleanup needed since no connections are made
    };
  }, [handleUpdate]);

  const simulateUpdate = useCallback((type: BatchUpdate['type'], batchId?: string) => {
    const mockUpdate: BatchUpdate = {
      type,
      batchId,
      timestamp: new Date().toISOString(),
      ...(type === 'status_change' && { status: 'in_progress' }),
      ...(type === 'priority_change' && { priority: 'high' }),
      ...(type === 'overdue_alert' && { message: 'Batch is overdue' })
    };
    
    handleUpdate(mockUpdate);
  }, [handleUpdate]);

  return {
    ...state,
    simulateUpdate // For testing purposes
  };
};
