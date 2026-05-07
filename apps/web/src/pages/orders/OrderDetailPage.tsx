import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { OrderSummary, LineItemWithPart } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

function CreateBatchModal({
  open,
  onClose,
  lineItem,
  orderId,
}: {
  open: boolean;
  onClose: () => void;
  lineItem: LineItemWithPart;
  orderId: string;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    quantity: lineItem.quantity,
    priority: 'STANDARD',
    startDate: '',
    estimatedCompletion: '',
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post('/batches', {
        lineItemId: lineItem.id,
        quantity: form.quantity,
        priority: form.priority,
        startDate: form.startDate || undefined,
        estimatedCompletion: form.estimatedCompletion || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
      queryClient.invalidateQueries({ queryKey: ['batches'] });
      onClose();
    },
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Create Batch — ${lineItem.part.partNumber}`}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        <p className="text-sm text-gray-500">{lineItem.part.partName}</p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
            <input
              type="number"
              min={1}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={form.quantity}
              onChange={(e) => setForm((f) => ({ ...f, quantity: parseInt(e.target.value) || 1 }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.priority}
              onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
            >
              {['LOW', 'STANDARD', 'HIGH', 'URGENT'].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.startDate}
              onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Est. Completion</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.estimatedCompletion}
              onChange={(e) => setForm((f) => ({ ...f, estimatedCompletion: e.target.value }))}
            />
          </div>
        </div>

        {mutation.isError && <p className="text-sm text-red-600">Failed to create batch.</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating…' : 'Create Batch'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [batchTarget, setBatchTarget] = useState<LineItemWithPart | null>(null);

  const { data: order, isLoading, error } = useQuery<OrderSummary>({
    queryKey: ['orders', id],
    queryFn: () => api.get<OrderSummary>(`/orders/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-gray-500">Loading…</p>;
  if (error || !order) return <p className="text-red-600">Order not found.</p>;

  return (
    <div>
      <div className="mb-1">
        <Link to={`/customers/${order.customer.id}`} className="text-sm text-blue-600 hover:underline">
          ← {order.customer.name}
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PO: {order.poNumber}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Due {new Date(order.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge label={order.priority} />
          <Badge label={order.orderStatus} />
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Line Items</h2>
      {order.lineItems.length === 0 ? (
        <p className="text-gray-500">No line items.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Part Number', 'Part Name', 'Qty', 'Batches', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.lineItems.map((li) => (
                <tr key={li.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-800">{li.part.partNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{li.part.partName}</td>
                  <td className="px-4 py-3 text-gray-700">{li.quantity}</td>
                  <td className="px-4 py-3">
                    {li.batches.length === 0 ? (
                      <span className="text-gray-400">None</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {li.batches.map((b) => (
                          <Link
                            key={b.id}
                            to={`/batches/${b.id}`}
                            className="text-blue-600 hover:underline font-mono text-xs"
                          >
                            {b.batchId}
                          </Link>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setBatchTarget(li)}
                    >
                      + Create Batch
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {batchTarget && (
        <CreateBatchModal
          open={true}
          onClose={() => setBatchTarget(null)}
          lineItem={batchTarget}
          orderId={id!}
        />
      )}
    </div>
  );
}
