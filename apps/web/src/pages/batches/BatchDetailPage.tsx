import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { BatchSummary, RoutingTemplateSummary } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

function ApplyTemplateModal({
  open,
  onClose,
  batchId,
}: {
  open: boolean;
  onClose: () => void;
  batchId: string;
}) {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState('');

  const { data: templates = [], isLoading } = useQuery<RoutingTemplateSummary[]>({
    queryKey: ['routing-templates'],
    queryFn: () => api.get<RoutingTemplateSummary[]>('/routing/templates'),
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post(`/routing/batch/${batchId}/from-template/${selectedId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['batches', batchId] });
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="Apply Routing Template">
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading templates…</p>
        ) : templates.length === 0 ? (
          <p className="text-sm text-gray-500">No active templates found.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {templates.map((t) => (
              <label
                key={t.id}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedId === t.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  value={t.id}
                  checked={selectedId === t.id}
                  onChange={() => setSelectedId(t.id)}
                  className="mt-0.5"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {t.templateSteps.length} step{t.templateSteps.length !== 1 ? 's' : ''}: {' '}
                    {t.templateSteps
                      .sort((a, b) => a.stepNumber - b.stepNumber)
                      .map((s) => s.workstation.name)
                      .join(' → ')}
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
        {mutation.isError && <p className="text-sm text-red-600">Failed to apply template.</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!selectedId || mutation.isPending}>
            {mutation.isPending ? 'Applying…' : 'Apply Template'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

const STEP_COLORS: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600 border-gray-200',
  IN_PROGRESS: 'bg-blue-50 text-blue-700 border-blue-200',
  COMPLETED: 'bg-green-50 text-green-700 border-green-200',
  SKIPPED: 'bg-gray-50 text-gray-400 border-gray-100',
  FAILED: 'bg-red-50 text-red-700 border-red-200',
};

export function BatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [showTemplate, setShowTemplate] = useState(false);

  const { data: batch, isLoading, error } = useQuery<BatchSummary>({
    queryKey: ['batches', id],
    queryFn: () => api.get<BatchSummary>(`/batches/${id}`),
    enabled: !!id,
  });

  const spawnMutation = useMutation({
    mutationFn: () => api.post(`/work-orders/batch/${id}/spawn`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['batches', id] }),
  });

  if (isLoading) return <p className="text-gray-500">Loading…</p>;
  if (error || !batch) return <p className="text-red-600">Batch not found.</p>;

  const order = batch.lineItem.purchaseOrder;

  return (
    <div>
      <div className="mb-1">
        <Link to={`/orders/${order.id}`} className="text-sm text-blue-600 hover:underline">
          ← {order.poNumber}
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-mono">{batch.batchId}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {batch.lineItem.part.partNumber} — {batch.lineItem.part.partName} · qty {batch.quantity}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Badge label={batch.priority} />
          <Badge label={batch.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Routing Steps</h2>
            {batch.routingSteps.length === 0 && (
              <Button size="sm" onClick={() => setShowTemplate(true)}>Apply Template</Button>
            )}
          </div>
          {batch.routingSteps.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 text-center">
              <p className="text-gray-400 text-sm mb-3">No routing steps yet.</p>
              <Button variant="secondary" size="sm" onClick={() => setShowTemplate(true)}>
                Apply Routing Template
              </Button>
            </div>
          ) : (
            <ol className="flex flex-col gap-2">
              {batch.routingSteps
                .sort((a, b) => a.stepNumber - b.stepNumber)
                .map((s, idx) => (
                  <li
                    key={s.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${STEP_COLORS[s.status] ?? STEP_COLORS.PENDING}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white border flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{s.workstation.name}</div>
                      <div className="text-xs opacity-70 truncate">{s.description}</div>
                    </div>
                    <Badge label={s.status} />
                  </li>
                ))}
            </ol>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Work Orders</h2>
            {batch.workOrderItems.length === 0 && batch.routingSteps.length > 0 && (
              <Button
                size="sm"
                onClick={() => spawnMutation.mutate()}
                disabled={spawnMutation.isPending}
              >
                {spawnMutation.isPending ? 'Spawning…' : 'Spawn Items'}
              </Button>
            )}
          </div>
          {batch.workOrderItems.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-6 text-center">
              <p className="text-gray-400 text-sm mb-3">No work order items yet.</p>
              {batch.routingSteps.length > 0 ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => spawnMutation.mutate()}
                  disabled={spawnMutation.isPending}
                >
                  {spawnMutation.isPending ? 'Spawning…' : 'Spawn Work Order Items'}
                </Button>
              ) : (
                <p className="text-xs text-gray-400">Apply a routing template first.</p>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-3">
                {batch.workOrderItems.length} item{batch.workOrderItems.length !== 1 ? 's' : ''} spawned
              </p>
              <Link
                to={`/batches/${batch.id}/work-orders`}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium"
              >
                Open operator view →
              </Link>
            </div>
          )}
          {spawnMutation.isError && (
            <p className="text-sm text-red-600 mt-2">Failed to spawn items.</p>
          )}
        </div>
      </div>

      <ApplyTemplateModal
        open={showTemplate}
        onClose={() => setShowTemplate(false)}
        batchId={id!}
      />
    </div>
  );
}
