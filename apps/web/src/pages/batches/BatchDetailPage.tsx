import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { BatchSummary } from '../../api/types';

export function BatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: batch, isLoading, error } = useQuery<BatchSummary>({
    queryKey: ['batches', id],
    queryFn: () => api.get<BatchSummary>(`/batches/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !batch) return <p>Batch not found.</p>;

  return (
    <div>
      <p><Link to="/batches">← Batches</Link></p>
      <h2>{batch.batchId}</h2>
      <p>
        Part: {batch.lineItem.part.partNumber} — {batch.lineItem.part.partName}
      </p>
      <p>Status: {batch.status} | Priority: {batch.priority} | Qty: {batch.quantity}</p>

      <h3>Routing Steps</h3>
      {batch.routingSteps.length === 0 ? <p>No steps.</p> : (
        <ol>
          {batch.routingSteps.map((s) => (
            <li key={s.id}>{s.workstation.name} — {s.description} [{s.status}]</li>
          ))}
        </ol>
      )}

      <h3>Work Order Items</h3>
      {batch.workOrderItems.length === 0 ? (
        <p>
          No items yet.{' '}
          <Link to={`/batches/${batch.id}/work-orders`}>Open operator view to spawn items.</Link>
        </p>
      ) : (
        <p>
          {batch.workOrderItems.length} items —{' '}
          <Link to={`/batches/${batch.id}/work-orders`}>Open operator view</Link>
        </p>
      )}
    </div>
  );
}
