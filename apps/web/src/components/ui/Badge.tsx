const colorMap: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-gray-100 text-gray-600',
  ON_HOLD: 'bg-yellow-100 text-yellow-800',
  QUEUED: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  REWORK: 'bg-orange-100 text-orange-800',
  SCRAPPED: 'bg-red-100 text-red-800',
  PENDING: 'bg-gray-100 text-gray-600',
  SKIPPED: 'bg-gray-100 text-gray-500',
  FAILED: 'bg-red-100 text-red-700',
  STANDARD: 'bg-gray-100 text-gray-700',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
  LOW: 'bg-green-100 text-green-700',
};

interface Props {
  label: string;
}

export function Badge({ label }: Props) {
  const color = colorMap[label] ?? 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}
