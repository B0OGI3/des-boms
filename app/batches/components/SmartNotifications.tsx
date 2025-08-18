import { useEffect, useCallback } from 'react';

export interface BatchNotification {
  id: string;
  type: 'overdue' | 'high_priority' | 'completion' | 'efficiency';
  title: string;
  message: string;
  batchId?: string;
  severity: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface SmartNotificationsProps {
  batches: any[];
  enabled?: boolean;
  onNotification?: (notification: BatchNotification) => void;
}

export const useSmartNotifications = ({ batches, enabled = true, onNotification }: SmartNotificationsProps) => {
  const notifyUser = useCallback((notification: BatchNotification) => {
    if (onNotification) {
      onNotification(notification);
      return;
    }
    
    // Log notification for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Smart Notification:', notification);
    }
  }, [onNotification]);

  const checkOverdueBatches = useCallback(() => {
    if (!batches || !enabled) return;

    const now = new Date();
    const overdueBatches = batches.filter(batch => 
      batch.estimatedCompletion && 
      new Date(batch.estimatedCompletion) < now &&
      batch.status !== 'COMPLETED'
    );

    overdueBatches.forEach(batch => {
      const daysOverdue = Math.ceil(
        (now.getTime() - new Date(batch.estimatedCompletion).getTime()) / (1000 * 60 * 60 * 24)
      );

      notifyUser({
        id: `overdue-${batch.id}`,
        type: 'overdue',
        title: 'Batch Overdue',
        message: `Batch ${batch.batchId} is ${daysOverdue} day(s) overdue`,
        batchId: batch.batchId,
        severity: daysOverdue > 3 ? 'high' : 'medium',
        actionUrl: `/batches?focus=${batch.id}`
      });
    });
  }, [batches, enabled, notifyUser]);

  const checkHighPriorityBatches = useCallback(() => {
    if (!batches || !enabled) return;

    const highPriorityBatches = batches.filter(batch => 
      batch.priority === 'HIGH' && 
      batch.status === 'PENDING'
    );

    if (highPriorityBatches.length > 0) {
      notifyUser({
        id: 'high-priority-alert',
        type: 'high_priority',
        title: 'High Priority Batches',
        message: `${highPriorityBatches.length} high priority batch(es) awaiting start`,
        severity: 'medium',
        actionUrl: '/batches?filter=priority:HIGH'
      });
    }
  }, [batches, enabled, notifyUser]);

  const checkEfficiencyMetrics = useCallback(() => {
    if (!batches || !enabled) return;

    const completedBatches = batches.filter(batch => batch.status === 'COMPLETED');
    const totalBatches = batches.length;
    
    if (totalBatches > 0) {
      const completionRate = (completedBatches.length / totalBatches) * 100;
      
      if (completionRate < 70 && totalBatches >= 5) {
        notifyUser({
          id: 'efficiency-warning',
          type: 'efficiency',
          title: 'Efficiency Alert',
          message: `Completion rate is ${completionRate.toFixed(1)}%. Consider reviewing workflow.`,
          severity: 'medium',
          actionUrl: '/analytics/batches'
        });
      } else if (completionRate > 90 && totalBatches >= 5) {
        notifyUser({
          id: 'efficiency-excellent',
          type: 'efficiency',
          title: 'Excellent Performance',
          message: `Outstanding completion rate of ${completionRate.toFixed(1)}%!`,
          severity: 'low',
          actionUrl: '/analytics/batches'
        });
      }
    }
  }, [batches, enabled, notifyUser]);

  const checkRecentCompletions = useCallback(() => {
    if (!batches || !enabled) return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const todayCompletions = batches.filter(batch => 
      batch.status === 'COMPLETED' &&
      batch.actualCompletion &&
      new Date(batch.actualCompletion) >= today
    );

    if (todayCompletions.length >= 3) {
      notifyUser({
        id: 'daily-completions',
        type: 'completion',
        title: 'Great Progress Today',
        message: `${todayCompletions.length} batches completed today!`,
        severity: 'low',
        actionUrl: '/batches?filter=status:COMPLETED'
      });
    }
  }, [batches, enabled, notifyUser]);

  // Run smart checks periodically
  useEffect(() => {
    if (!enabled) return;

    // Initial check
    checkOverdueBatches();
    checkHighPriorityBatches();
    checkEfficiencyMetrics();
    checkRecentCompletions();

    // Set up periodic checks (every 5 minutes)
    const interval = setInterval(() => {
      checkOverdueBatches();
      checkHighPriorityBatches();
    }, 5 * 60 * 1000);

    // Check efficiency metrics less frequently (every 30 minutes)
    const efficiencyInterval = setInterval(() => {
      checkEfficiencyMetrics();
      checkRecentCompletions();
    }, 30 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(efficiencyInterval);
    };
  }, [checkOverdueBatches, checkHighPriorityBatches, checkEfficiencyMetrics, checkRecentCompletions, enabled]);

  const manualCheck = useCallback(() => {
    checkOverdueBatches();
    checkHighPriorityBatches();
    checkEfficiencyMetrics();
    checkRecentCompletions();
  }, [checkOverdueBatches, checkHighPriorityBatches, checkEfficiencyMetrics, checkRecentCompletions]);

  const showCustomNotification = useCallback((notification: BatchNotification) => {
    notifyUser(notification);
  }, [notifyUser]);

  return {
    manualCheck,
    showCustomNotification,
    checkOverdueBatches,
    checkHighPriorityBatches,
    checkEfficiencyMetrics,
    checkRecentCompletions
  };
};
