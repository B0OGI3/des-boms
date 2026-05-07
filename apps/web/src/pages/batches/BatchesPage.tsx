import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { BatchSummary } from '../../api/types';
import { Badge } from '../../components/ui/Badge';

export function BatchesPage() {
  const { data: batches = [], isLoading, error } = useQuery<BatchSummary[]>({
    queryKey: ['batches'],
    queryFn: () => api.get<BatchSummary[]>('/batches'),
  });

  if (isLoading) return <p className="text-gray-500">Loading batches…</p>;
  if (error) return <p className="text-red-600">Error loading batches.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
      </div>

      {batches.length === 0 ? (
        <p className="text-gray-500">No batches found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Batch ID', 'Part', 'Order', 'Qty', 'Status', 'Priority'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/batches/${b.id}`} className="font-mono font-medium text-blue-600 hover:text-blue-800">
                      {b.batchId}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-mono text-xs">{b.lineItem.part.partNumber}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/orders/${b.lineItem.purchaseOrder.id}`}
                      className="text-gray-700 hover:text-blue-600"
                    >
                      {b.lineItem.purchaseOrder.poNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{b.quantity}</td>
                  <td className="px-4 py-3"><Badge label={b.status} /></td>
                  <td className="px-4 py-3"><Badge label={b.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
