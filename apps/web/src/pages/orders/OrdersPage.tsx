import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../../api/client';
import type { OrderSummary } from '../../api/types';
import { Badge } from '../../components/ui/Badge';

export function OrdersPage() {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get('customerId') ?? undefined;

  const { data: orders = [], isLoading, error } = useQuery<OrderSummary[]>({
    queryKey: ['orders', customerId],
    queryFn: () => api.get<OrderSummary[]>(`/orders${customerId ? `?customerId=${customerId}` : ''}`),
  });

  if (isLoading) return <p className="text-gray-500">Loading orders…</p>;
  if (error) return <p className="text-red-600">Error loading orders.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Purchase Orders</h1>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['PO Number', 'Customer', 'Status', 'Priority', 'Due Date', 'Items'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/orders/${o.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                      {o.poNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/customers/${o.customer.id}`} className="text-gray-700 hover:text-blue-600">
                      {o.customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><Badge label={o.orderStatus} /></td>
                  <td className="px-4 py-3"><Badge label={o.priority} /></td>
                  <td className="px-4 py-3 text-gray-700">{new Date(o.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-700">{o.lineItems.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
