import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { WorkOrderItemDetail } from '../../api/types';

const STATUS_COLOR: Record<string, string> = {
  QUEUED: '#888',
  IN_PROGRESS: '#2563eb',
  COMPLETED: '#16a34a',
  ON_HOLD: '#d97706',
  REWORK: '#dc2626',
  SCRAPPED: '#6b7280',
};

const STEP_COLOR: Record<string, string> = {
  PENDING: '#ccc',
  IN_PROGRESS: '#2563eb',
  COMPLETED: '#16a34a',
  SKIPPED: '#888',
  FAILED: '#dc2626',
};

export function WorkOrdersPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading, error } = useQuery<WorkOrderItemDetail[]>({
    queryKey: ['work-orders', batchId],
    queryFn: () => api.get<WorkOrderItemDetail[]>(`/work-orders/batch/${batchId}`),
    enabled: !!batchId,
    refetchInterval: 10_000,
  });

  const spawnMutation = useMutation({
    mutationFn: () => api.post(`/work-orders/batch/${batchId}/spawn`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['work-orders', batchId] }),
  });

  const startStep = useMutation({
    mutationFn: ({ itemId, stepId }: { itemId: string; stepId: string }) =>
      api.put(`/work-orders/item/${itemId}/start-step/${stepId}`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['work-orders', batchId] }),
  });

  const completeStep = useMutation({
    mutationFn: ({ itemId, stepId }: { itemId: string; stepId: string }) =>
      api.put(`/work-orders/item/${itemId}/complete-step/${stepId}`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['work-orders', batchId] }),
  });

  if (!batchId) return <p>No batch selected.</p>;
  if (isLoading) return <p>Loading work orders...</p>;
  if (error) return <p>Error loading work orders.</p>;

  return (
    <div>
      <p><Link to={`/batches/${batchId}`}>← Batch</Link></p>
      <h2>Work Orders</h2>

      {items.length === 0 ? (
        <div>
          <p>No work order items yet.</p>
          <button
            onClick={() => spawnMutation.mutate()}
            disabled={spawnMutation.isPending}
            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            {spawnMutation.isPending ? 'Creating...' : 'Spawn Work Order Items'}
          </button>
          {spawnMutation.isError && <p style={{ color: 'red' }}>Failed to spawn items.</p>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: '#fff', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.95rem' }}>{item.serialNumber}</h3>
                <span style={{ color: STATUS_COLOR[item.status] ?? '#888', fontWeight: 600, fontSize: '0.85rem' }}>
                  {item.status}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {item.stepProgress.map((sp) => {
                  const isActionable =
                    sp.status === 'PENDING' || sp.status === 'IN_PROGRESS';
                  return (
                    <div
                      key={sp.id}
                      style={{
                        border: `2px solid ${STEP_COLOR[sp.status] ?? '#ccc'}`,
                        borderRadius: 6,
                        padding: '0.4rem 0.6rem',
                        fontSize: '0.8rem',
                        minWidth: 100,
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{sp.routingStep.workstation.name}</div>
                      <div style={{ color: '#666', fontSize: '0.75rem' }}>{sp.routingStep.description}</div>
                      <div style={{ color: STEP_COLOR[sp.status] ?? '#ccc', fontSize: '0.75rem', marginTop: 2 }}>
                        {sp.status}
                      </div>
                      {isActionable && (
                        <button
                          onClick={() =>
                            sp.status === 'PENDING'
                              ? startStep.mutate({ itemId: item.id, stepId: sp.routingStepId })
                              : completeStep.mutate({ itemId: item.id, stepId: sp.routingStepId })
                          }
                          style={{
                            marginTop: '0.35rem',
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            width: '100%',
                          }}
                        >
                          {sp.status === 'PENDING' ? 'Start' : 'Complete'}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
