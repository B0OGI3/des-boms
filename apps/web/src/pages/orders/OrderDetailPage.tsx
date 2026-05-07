import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { OrderSummary } from '../../api/types';

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useQuery<OrderSummary>({
    queryKey: ['orders', id],
    queryFn: () => api.get<OrderSummary>(`/orders/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !order) return <p>Order not found.</p>;

  return (
    <div>
      <p><Link to="/orders">← Orders</Link></p>
      <h2>PO: {order.poNumber}</h2>
      <p>Customer: {order.customer.name}</p>
      <p>Status: {order.orderStatus} | Priority: {order.priority}</p>
      <p>Due: {new Date(order.dueDate).toLocaleDateString()}</p>

      <h3>Line Items</h3>
      {order.lineItems.length === 0 ? (
        <p>No line items.</p>
      ) : (
        <ul>
          {order.lineItems.map((li) => (
            <li key={li.id}>
              {li.part.partNumber} — {li.part.partName} × {li.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
