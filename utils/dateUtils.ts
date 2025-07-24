/**
 * Shared date utility functions
 */

export const isOverdue = (dueDate: string): boolean => {
  return new Date(dueDate) < new Date();
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUrgencyColor = (daysUntilDue: number): string => {
  if (daysUntilDue < 0) return "#ef4444"; // Overdue - red
  if (daysUntilDue <= 2) return "#f97316"; // Critical - orange
  if (daysUntilDue <= 7) return "#eab308"; // Warning - yellow
  return "#10b981"; // Good - green
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};

export const formatDateRange = (startDate: string | Date, endDate: string | Date): string => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

export const isToday = (date: string | Date): boolean => {
  const today = new Date();
  const checkDate = new Date(date);
  return today.toDateString() === checkDate.toDateString();
};

export const isThisWeek = (date: string | Date): boolean => {
  const today = new Date();
  const checkDate = new Date(date);
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  return checkDate >= weekStart && checkDate <= weekEnd;
};
