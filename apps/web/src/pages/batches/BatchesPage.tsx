import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { BatchSummary } from '../../api/types';

export function BatchesPage() {
  const { data: batches = [], isLoading, error } = useQuery<BatchSummary[]>({
    queryKey: ['batches'],
    queryFn: () => api.get<BatchSummary[]>('/batches'),
  });

  if (isLoading) return <p>Loading batches...</p>;
  if (error) return <p>Error loading batches.</p>;

  return (
    <div>
      <h2>Batches</h2>
      {batches.length === 0 ? (
        <p>No batches found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Batch ID', 'Part', 'Qty', 'Status', 'Priority'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b.id}>
                <td style={{ padding: '0.5rem' }}>
                  <Link to={`/batches/${b.id}`}>{b.batchId}</Link>
                </td>
                <td style={{ padding: '0.5rem' }}>{b.lineItem.part.partNumber}</td>
                <td style={{ padding: '0.5rem' }}>{b.quantity}</td>
                <td style={{ padding: '0.5rem' }}>{b.status}</td>
                <td style={{ padding: '0.5rem' }}>{b.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
