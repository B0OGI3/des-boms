import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { WorkOrderItemDetail } from '../../api/types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const STEP_RING: Record<string, string> = {
  PENDING: 'border-gray-200 bg-white',
  IN_PROGRESS: 'border-blue-400 bg-blue-50',
  COMPLETED: 'border-green-400 bg-green-50',
  SKIPPED: 'border-gray-200 bg-gray-50',
  FAILED: 'border-red-400 bg-red-50',
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

  if (!batchId) return <p className="text-gray-500">No batch selected.</p>;
  if (isLoading) return <p className="text-gray-500">Loading work orders…</p>;
  if (error) return <p className="text-red-600">Error loading work orders.</p>;

  return (
    <div>
      <div className="mb-1">
        <Link to={`/batches/${batchId}`} className="text-sm text-blue-600 hover:underline">
          ← Batch
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
        <span className="text-sm text-gray-400 tabular-nums">auto-refresh 10s</span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center max-w-sm mx-auto">
          <p className="text-gray-400 mb-4">No work order items yet.</p>
          <Button
            onClick={() => spawnMutation.mutate()}
            disabled={spawnMutation.isPending}
          >
            {spawnMutation.isPending ? 'Creating…' : 'Create Work Orders'}
          </Button>
          {spawnMutation.isError && <p className="text-sm text-red-600 mt-2">Failed to spawn items.</p>}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-semibold text-gray-800">{item.serialNumber}</span>
                <Badge label={item.status} />
              </div>
              <div className="flex flex-wrap gap-2">
                {item.stepProgress
                  .sort((a, b) => a.routingStep.stepNumber - b.routingStep.stepNumber)
                  .map((sp) => {
                    const isPending = sp.status === 'PENDING';
                    const isActive = sp.status === 'IN_PROGRESS';
                    return (
                      <div
                        key={sp.id}
                        className={`flex flex-col gap-1 border-2 rounded-lg p-2.5 min-w-[110px] ${STEP_RING[sp.status] ?? STEP_RING.PENDING}`}
                      >
                        <div className="text-xs font-semibold text-gray-800 leading-tight">
                          {sp.routingStep.workstation.name}
                        </div>
                        <div className="text-xs text-gray-500 leading-tight truncate">
                          {sp.routingStep.description}
                        </div>
                        <Badge label={sp.status} />
                        {(isPending || isActive) && (
                          <Button
                            size="sm"
                            variant={isActive ? 'primary' : 'secondary'}
                            className="mt-1 w-full text-xs"
                            onClick={() =>
                              isPending
                                ? startStep.mutate({ itemId: item.id, stepId: sp.routingStepId })
                                : completeStep.mutate({ itemId: item.id, stepId: sp.routingStepId })
                            }
                          >
                            {isPending ? 'Start' : 'Complete'}
                          </Button>
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
