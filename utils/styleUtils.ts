/**
 * Shared styling and color utility functions
 */

export type StatusType = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
export type PriorityType = 'LOW' | 'NORMAL' | 'HIGH' | 'RUSH';

export const getStatusColor = (status: StatusType, dueDate?: string): string => {
  if (dueDate && new Date(dueDate) < new Date() && status !== 'COMPLETED') {
    return "red"; // Overdue
  }
  
  switch (status) {
    case 'PENDING': return "gray";
    case 'IN_PROGRESS': return "blue";
    case 'COMPLETED': return "green";
    case 'ON_HOLD': return "yellow";
    case 'CANCELLED': return "red";
    default: return "gray";
  }
};

export const getPriorityColor = (priority: PriorityType): string => {
  switch (priority) {
    case 'LOW': return "gray";
    case 'NORMAL': return "blue";
    case 'HIGH': return "orange";
    case 'RUSH': return "red";
    default: return "gray";
  }
};

export const getStatusStyles = (status: StatusType) => {
  const colors = {
    PENDING: { bg: "rgba(107, 114, 128, 0.1)", text: "#9ca3af", border: "rgba(107, 114, 128, 0.3)" },
    IN_PROGRESS: { bg: "rgba(59, 130, 246, 0.1)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.3)" },
    COMPLETED: { bg: "rgba(34, 197, 94, 0.1)", text: "#4ade80", border: "rgba(34, 197, 94, 0.3)" },
    ON_HOLD: { bg: "rgba(245, 158, 11, 0.1)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" },
    CANCELLED: { bg: "rgba(239, 68, 68, 0.1)", text: "#f87171", border: "rgba(239, 68, 68, 0.3)" },
  };
  
  const color = colors[status] || colors.PENDING;
  return {
    backgroundColor: color.bg,
    color: color.text,
    border: `1px solid ${color.border}`,
  };
};

export const getPriorityStyles = (priority: PriorityType) => {
  const colors = {
    LOW: { bg: "rgba(107, 114, 128, 0.1)", text: "#9ca3af", border: "rgba(107, 114, 128, 0.3)" },
    NORMAL: { bg: "rgba(59, 130, 246, 0.1)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.3)" },
    HIGH: { bg: "rgba(249, 115, 22, 0.1)", text: "#fb923c", border: "rgba(249, 115, 22, 0.3)" },
    RUSH: { bg: "rgba(239, 68, 68, 0.1)", text: "#f87171", border: "rgba(239, 68, 68, 0.3)" },
  };
  
  const color = colors[priority] || colors.NORMAL;
  return {
    backgroundColor: color.bg,
    color: color.text,
    border: `1px solid ${color.border}`,
  };
};

export const getProgressColor = (percentage: number): string => {
  if (percentage === 0) return "#6b7280";
  if (percentage < 30) return "#ef4444";
  if (percentage < 70) return "#f97316";
  if (percentage < 100) return "#3b82f6";
  return "#10b981";
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
};
