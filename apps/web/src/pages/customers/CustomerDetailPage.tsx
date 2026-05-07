import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { CustomerDetail, PartSummary } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';

function NewOrderModal({
  open,
  onClose,
  customerId,
}: {
  open: boolean;
  onClose: () => void;
  customerId: string;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    poNumber: '',
    dueDate: '',
    priority: 'STANDARD',
  });
  const [lineItems, setLineItems] = useState<{ partId: string; quantity: number; unitPrice: number }[]>([]);

  const { data: parts = [] } = useQuery<PartSummary[]>({
    queryKey: ['parts'],
    queryFn: () => api.get<PartSummary[]>('/parts'),
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post('/orders', {
        ...form,
        customerId,
        lineItems: lineItems.length > 0 ? lineItems : undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', customerId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      onClose();
      setForm({ poNumber: '', dueDate: '', priority: 'STANDARD' });
      setLineItems([]);
    },
  });

  function addLineItem() {
    setLineItems((li) => [...li, { partId: '', quantity: 1, unitPrice: 0 }]);
  }

  function updateLineItem(i: number, patch: Partial<typeof lineItems[0]>) {
    setLineItems((li) => li.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function removeLineItem(i: number) {
    setLineItems((li) => li.filter((_, idx) => idx !== i));
  }

  return (
    <Modal open={open} onClose={onClose} title="New Purchase Order">
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PO Number *</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={form.poNumber}
              onChange={(e) => setForm((f) => ({ ...f, poNumber: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </div>
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Line Items</span>
            <Button type="button" variant="ghost" size="sm" onClick={addLineItem}>+ Add Part</Button>
          </div>
          {lineItems.length > 0 && (
            <div className="flex flex-col gap-2">
              {lineItems.map((li, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <select
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={li.partId}
                    onChange={(e) => updateLineItem(i, { partId: e.target.value })}
                    required
                  >
                    <option value="">Select part…</option>
                    {parts.map((p) => (
                      <option key={p.id} value={p.id}>{p.partNumber} — {p.partName}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    placeholder="Qty"
                    className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={li.quantity}
                    onChange={(e) => updateLineItem(i, { quantity: parseInt(e.target.value) || 1 })}
                    required
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Unit $"
                    className="w-20 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={li.unitPrice}
                    onChange={(e) => updateLineItem(i, { unitPrice: parseFloat(e.target.value) || 0 })}
                  />
                  <button
                    type="button"
                    onClick={() => removeLineItem(i)}
                    className="text-gray-400 hover:text-red-500 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {mutation.isError && <p className="text-sm text-red-600">Failed to create order.</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating…' : 'Create Order'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);

  const { data: customer, isLoading, error } = useQuery<CustomerDetail>({
    queryKey: ['customers', id],
    queryFn: () => api.get<CustomerDetail>(`/customers/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-gray-500">Loading…</p>;
  if (error || !customer) return <p className="text-red-600">Customer not found.</p>;

  return (
    <div>
      <div className="mb-1">
        <Link to="/customers" className="text-sm text-blue-600 hover:underline">← Customers</Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {customer.contactName && <span>{customer.contactName} · </span>}
            {customer.email && <span>{customer.email} · </span>}
            {customer.phone && <span>{customer.phone}</span>}
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ New Order</Button>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Purchase Orders</h2>
      {customer.purchaseOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['PO Number', 'Status', 'Priority', 'Due Date', 'Line Items'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customer.purchaseOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/orders/${o.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                      {o.poNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><Badge label={o.orderStatus} /></td>
                  <td className="px-4 py-3"><Badge label={o.priority} /></td>
                  <td className="px-4 py-3 text-gray-700">{new Date(o.dueDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-gray-700">{o.lineItems.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewOrderModal open={showModal} onClose={() => setShowModal(false)} customerId={id!} />
    </div>
  );
}
