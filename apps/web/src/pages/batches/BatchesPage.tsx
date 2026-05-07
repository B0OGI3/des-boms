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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Production Batches</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            To create a batch, open a purchase order and click <span className="font-medium text-gray-700">+ Create Batch</span> on a line item
          </p>
        </div>
      </div>

      {batches.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center max-w-md mx-auto">
          <p className="text-gray-500 font-medium mb-1">No batches yet</p>
          <p className="text-gray-400 text-sm">Open a purchase order, then click <span className="font-medium text-gray-600">+ Create Batch</span> next to a line item to begin a production run.</p>
        </div>
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
