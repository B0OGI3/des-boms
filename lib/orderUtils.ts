// Utility functions for the Orders page

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDate: string): boolean => {
  return getDaysUntilDue(dueDate) < 0;
};

export const getUrgencyColor = (daysUntilDue: number): string => {
  if (daysUntilDue < 0) return "#ef4444"; // Red - overdue
  if (daysUntilDue === 0) return "#f97316"; // Orange - due today
  if (daysUntilDue <= 2) return "#eab308"; // Yellow - due soon
  if (daysUntilDue <= 7) return "#22c55e"; // Green - due this week
  return "#64748b"; // Gray - not urgent
};

export const getStatusColor = (status: string, dueDate: string): string => {
  if (isOverdue(dueDate)) return "red";
  
  switch (status) {
    case "PENDING":
      return "yellow";
    case "IN_PROGRESS":
      return "blue";
    case "COMPLETED":
      return "green";
    case "ON_HOLD":
      return "orange";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "LOW":
      return "gray";
    case "NORMAL":
      return "blue";
    case "HIGH":
      return "orange";
    case "RUSH":
      return "red";
    default:
      return "gray";
  }
};

export const formatCurrency = (value: number): string => {
  return `$${(value / 1000).toFixed(0)}K`;
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Fetch utility with timeout
export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
  }
};

// Type guards and validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};
