import type { Batch, RoutingStep } from '../types';

// Generate system batch ID in format: DES-YYYY-MMDD-###
export function generateBatchId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  // Generate a random 3-digit number for uniqueness
  const sequence = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `DES-${year}-${month}${day}-${sequence}`;
}

// Calculate batch completion percentage based on routing steps
export function calculateBatchProgress(batch: Batch): number {
  if (!batch.routingSteps || batch.routingSteps.length === 0) {
    return 0;
  }
  
  const completedSteps = batch.routingSteps.filter(step => step.status === 'COMPLETED').length;
  return Math.round((completedSteps / batch.routingSteps.length) * 100);
}

// Get the current active step for a batch
export function getCurrentStep(batch: Batch): RoutingStep | null {
  if (!batch.routingSteps || batch.routingSteps.length === 0) {
    return null;
  }
  
  // Find the first step that's not completed
  const sortedSteps = [...batch.routingSteps].sort((a, b) => a.stepNumber - b.stepNumber);
  const activeStep = sortedSteps.find(step => step.status !== 'COMPLETED' && step.status !== 'SKIPPED');
    
  return activeStep || null;
}

// Get batch status color for UI
export function getBatchStatusColor(status: Batch['status']): string {
  switch (status) {
    case 'QUEUED':
      return '#6b7280'; // gray
    case 'IN_PROGRESS':
      return '#3b82f6'; // blue
    case 'COMPLETED':
      return '#10b981'; // green
    case 'ON_HOLD':
      return '#f59e0b'; // yellow
    case 'CANCELLED':
      return '#ef4444'; // red
    default:
      return '#6b7280';
  }
}

// Get priority color for UI
export function getBatchPriorityColor(priority: Batch['priority']): string {
  switch (priority) {
    case 'RUSH':
      return '#ef4444'; // red
    case 'STANDARD':
      return '#3b82f6'; // blue
    case 'HOLD':
      return '#6b7280'; // gray
    default:
      return '#3b82f6';
  }
}

// Calculate estimated completion date based on routing steps
export function calculateEstimatedCompletion(routingSteps: RoutingStep[], startDate?: Date): Date | null {
  if (!routingSteps || routingSteps.length === 0) {
    return null;
  }
  
  const totalEstimatedMinutes = routingSteps.reduce((total, step) => {
    return total + (step.estimatedTime || 0);
  }, 0);
  
  if (totalEstimatedMinutes === 0) {
    return null;
  }
  
  const start = startDate || new Date();
  const estimatedCompletion = new Date(start);
  estimatedCompletion.setMinutes(estimatedCompletion.getMinutes() + totalEstimatedMinutes);
  
  return estimatedCompletion;
}

// Format batch duration for display
export function formatBatchDuration(startDate: string | null, endDate: string | null): string {
  if (!startDate) return 'Not started';
  if (!endDate) return 'In progress';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`;
  }
  return `${diffMinutes}m`;
}

// Check if batch is overdue
export function isBatchOverdue(batch: Batch): boolean {
  if (!batch.estimatedCompletion || batch.status === 'COMPLETED') {
    return false;
  }
  
  const now = new Date();
  const estimated = new Date(batch.estimatedCompletion);
  return now > estimated;
}

// Get next available step number for a batch
export function getNextStepNumber(existingSteps: RoutingStep[]): number {
  if (!existingSteps || existingSteps.length === 0) {
    return 1;
  }
  
  const maxStepNumber = Math.max(...existingSteps.map(step => step.stepNumber));
  return maxStepNumber + 1;
}

// Validate batch form data
export function validateBatchForm(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.lineItemId) {
    errors.push('Line item is required');
  }
  
  if (!data.quantity || data.quantity <= 0) {
    errors.push('Quantity must be greater than 0');
  }
  
  if (!data.priority) {
    errors.push('Priority is required');
  }
  
  if (!data.routingSteps || data.routingSteps.length === 0) {
    errors.push('At least one routing step is required');
  }
  
  // Validate routing steps
  if (data.routingSteps) {
    data.routingSteps.forEach((step: any, index: number) => {
      if (!step.workstationId) {
        errors.push(`Workstation is required for step ${index + 1}`);
      }
      if (!step.description?.trim()) {
        errors.push(`Description is required for step ${index + 1}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format estimated time in minutes to a human-readable string
 */
export function formatEstimatedTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
}
