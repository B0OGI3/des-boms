import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { WorkstationWithOperators } from '../../api/types';

export function WorkstationsPage() {
  const { data: workstations = [], isLoading, error } = useQuery<WorkstationWithOperators[]>({
    queryKey: ['workstations'],
    queryFn: () => api.get<WorkstationWithOperators[]>('/workstations'),
  });

  if (isLoading) return <p>Loading workstations...</p>;
  if (error) return <p>Error loading workstations.</p>;

  return (
    <div>
      <h2>Workstations</h2>
      {workstations.length === 0 ? (
        <p>No workstations found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {workstations.map((ws) => (
            <div key={ws.id} style={{ background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
              <h3 style={{ margin: '0 0 0.25rem' }}>{ws.name}</h3>
              <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '0.85rem' }}>{ws.category}</p>
              {ws.description && <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>{ws.description}</p>}
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                {ws.currentOperators.length > 0
                  ? `Operators: ${ws.currentOperators.map((o) => o.operatorName).join(', ')}`
                  : 'No operators logged in'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
