import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import type { CustomerWithOrderCount } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

function NewCustomerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: '', contactName: '', email: '', phone: '' });

  const mutation = useMutation({
    mutationFn: () => api.post('/customers', form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      onClose();
      setForm({ name: '', contactName: '', email: '', phone: '' });
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="New Customer">
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.contactName}
            onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
        </div>
        {mutation.isError && (
          <p className="text-sm text-red-600">Failed to create customer.</p>
        )}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating…' : 'Create Customer'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function CustomersPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data: customers = [], isLoading, error } = useQuery<CustomerWithOrderCount[]>({
    queryKey: ['customers'],
    queryFn: () => api.get<CustomerWithOrderCount[]>('/customers'),
  });

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.contactName ?? '').toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) return <p className="text-gray-500">Loading customers…</p>;
  if (error) return <p className="text-red-600">Error loading customers.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <Button onClick={() => setShowModal(true)}>+ New Customer</Button>
      </div>

      <div className="mb-4">
        <input
          type="search"
          placeholder="Search customers…"
          className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No customers found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Company', 'Contact', 'Email', 'Phone', 'Orders'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/customers/${c.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{c.contactName ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-700">{c.email ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-700">{c.phone ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-700">{c._count.purchaseOrders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewCustomerModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
