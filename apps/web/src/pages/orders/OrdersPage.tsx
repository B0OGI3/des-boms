import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { OrderSummary } from '../../api/types';

export function OrdersPage() {
  const { data: orders = [], isLoading, error } = useQuery<OrderSummary[]>({
    queryKey: ['orders'],
    queryFn: () => api.get<OrderSummary[]>('/orders'),
  });

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;

  return (
    <div>
      <h2>Purchase Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['PO Number', 'Customer', 'Status', 'Priority', 'Due Date'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ padding: '0.5rem' }}>
                  <Link to={`/orders/${o.id}`}>{o.poNumber}</Link>
                </td>
                <td style={{ padding: '0.5rem' }}>{o.customer.name}</td>
                <td style={{ padding: '0.5rem' }}>{o.orderStatus}</td>
                <td style={{ padding: '0.5rem' }}>{o.priority}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(o.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
