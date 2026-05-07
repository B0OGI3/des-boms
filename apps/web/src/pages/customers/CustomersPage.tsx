import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { CustomerWithOrderCount } from '../../api/types';

export function CustomersPage() {
  const { data: customers = [], isLoading, error } = useQuery<CustomerWithOrderCount[]>({
    queryKey: ['customers'],
    queryFn: () => api.get<CustomerWithOrderCount[]>('/customers'),
  });

  if (isLoading) return <p>Loading customers...</p>;
  if (error) return <p>Error loading customers.</p>;

  return (
    <div>
      <h2>Customers</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Name', 'Contact', 'Email', 'Phone', 'Orders'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td style={{ padding: '0.5rem' }}>
                  <Link to={`/orders?customerId=${c.id}`}>{c.name}</Link>
                </td>
                <td style={{ padding: '0.5rem' }}>{c.contactName ?? '—'}</td>
                <td style={{ padding: '0.5rem' }}>{c.email ?? '—'}</td>
                <td style={{ padding: '0.5rem' }}>{c.phone ?? '—'}</td>
                <td style={{ padding: '0.5rem' }}>{c._count.purchaseOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
