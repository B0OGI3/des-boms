import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { Part } from '@des-boms/shared';

export function PartsPage() {
  const { data: parts = [], isLoading, error } = useQuery<Part[]>({
    queryKey: ['parts'],
    queryFn: () => api.get<Part[]>('/parts'),
  });

  if (isLoading) return <p>Loading parts...</p>;
  if (error) return <p>Error loading parts.</p>;

  return (
    <div>
      <h2>Parts Master</h2>
      {parts.length === 0 ? (
        <p>No parts found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Part Number', 'Name', 'Type', 'Rev', 'Active'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: '0.5rem', fontFamily: 'monospace' }}>{p.partNumber}</td>
                <td style={{ padding: '0.5rem' }}>{p.partName}</td>
                <td style={{ padding: '0.5rem' }}>{p.partType}</td>
                <td style={{ padding: '0.5rem' }}>{p.revisionLevel ?? '—'}</td>
                <td style={{ padding: '0.5rem' }}>{p.active ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
