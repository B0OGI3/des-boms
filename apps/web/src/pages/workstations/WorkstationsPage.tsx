import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { WorkstationWithOperators } from '../../api/types';
import type { WorkstationCategory } from '@des-boms/shared';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

const CATEGORIES: WorkstationCategory[] = [
  'MACHINING', 'ASSEMBLY', 'WELDING', 'INSPECTION', 'PACKAGING',
];

function NewWorkstationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: '',
    category: 'ASSEMBLY' as WorkstationCategory,
    description: '',
    location: '',
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post('/workstations', {
        name: form.name,
        category: form.category,
        description: form.description || undefined,
        location: form.location || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workstations'] });
      onClose();
      setForm({ name: '', category: 'ASSEMBLY', description: '', location: '' });
    },
  });

  return (
    <Modal open={open} onClose={onClose} title="New Workstation">
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as WorkstationCategory }))}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Bay 3"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </div>
        {mutation.isError && <p className="text-sm text-red-600">Failed to create workstation.</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating…' : 'Create Workstation'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function WorkstationsPage() {
  const [showCreate, setShowCreate] = useState(false);

  const { data: workstations = [], isLoading, error } = useQuery<WorkstationWithOperators[]>({
    queryKey: ['workstations'],
    queryFn: () => api.get<WorkstationWithOperators[]>('/workstations'),
  });

  if (isLoading) return <p className="text-gray-500">Loading workstations…</p>;
  if (error) return <p className="text-red-600">Error loading workstations.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workstations</h1>
          <p className="text-sm text-gray-500 mt-0.5">Shop floor stations used in routing templates</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Workstation</Button>
      </div>

      {workstations.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center max-w-md mx-auto">
          <p className="text-gray-500 font-medium mb-1">No workstations yet</p>
          <p className="text-gray-400 text-sm mb-4">Add workstations before creating routing templates.</p>
          <Button onClick={() => setShowCreate(true)}>+ New Workstation</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workstations.map((ws) => (
            <div key={ws.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{ws.name}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                  {ws.category}
                </span>
              </div>
              {ws.description && (
                <p className="text-sm text-gray-500 mb-2">{ws.description}</p>
              )}
              <p className="text-xs text-gray-400">
                {ws.currentOperators.length > 0
                  ? `Operators: ${ws.currentOperators.map((o) => o.operatorName).join(', ')}`
                  : 'No operators logged in'}
              </p>
            </div>
          ))}
        </div>
      )}

      <NewWorkstationModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  );
}
