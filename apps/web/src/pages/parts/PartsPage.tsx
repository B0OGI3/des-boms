import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { Part } from '@des-boms/shared';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

const PART_TYPES = ['FINISHED', 'SEMI_FINISHED', 'RAW_MATERIAL'] as const;

type PartFormState = {
  partNumber: string;
  partName: string;
  partType: string;
  revisionLevel: string;
  description: string;
};

const EMPTY_FORM: PartFormState = {
  partNumber: '',
  partName: '',
  partType: 'FINISHED',
  revisionLevel: '',
  description: '',
};

function PartModal({
  open,
  onClose,
  initial,
  partId,
}: {
  open: boolean;
  onClose: () => void;
  initial?: PartFormState;
  partId?: string;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<PartFormState>(initial ?? EMPTY_FORM);
  const isEdit = !!partId;

  const mutation = useMutation({
    mutationFn: () =>
      isEdit
        ? api.put(`/parts/${partId}`, {
            partName: form.partName,
            partType: form.partType,
            revisionLevel: form.revisionLevel || undefined,
            description: form.description || undefined,
          })
        : api.post('/parts', {
            partNumber: form.partNumber,
            partName: form.partName,
            partType: form.partType,
            revisionLevel: form.revisionLevel || undefined,
            description: form.description || undefined,
          }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parts'] });
      onClose();
    },
  });

  function field(key: keyof PartFormState) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Part' : 'New Part'}>
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Part Number *</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              required
              disabled={isEdit}
              {...field('partNumber')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Revision</label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. A, B, 1.0"
              {...field('revisionLevel')}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Part Name *</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            {...field('partName')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...field('partType')}
          >
            {PART_TYPES.map((t) => (
              <option key={t} value={t}>{t.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            {...field('description')}
          />
        </div>
        {mutation.isError && <p className="text-sm text-red-600">Failed to save part.</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Part'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function PartsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Part | null>(null);

  const { data: parts = [], isLoading, error } = useQuery<Part[]>({
    queryKey: ['parts'],
    queryFn: () => api.get<Part[]>('/parts'),
  });

  if (isLoading) return <p className="text-gray-500">Loading parts…</p>;
  if (error) return <p className="text-red-600">Error loading parts.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parts Catalog</h1>
          <p className="text-sm text-gray-500 mt-0.5">Parts available for use in purchase orders</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>+ New Part</Button>
      </div>

      {parts.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center max-w-md mx-auto">
          <p className="text-gray-500 font-medium mb-1">No parts yet</p>
          <p className="text-gray-400 text-sm mb-4">Add parts to the catalog before creating purchase orders.</p>
          <Button onClick={() => setShowCreate(true)}>+ New Part</Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Part Number', 'Name', 'Type', 'Rev', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-800">{p.partNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{p.partName}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{p.partType.replace('_', ' ')}</td>
                  <td className="px-4 py-3 text-gray-600">{p.revisionLevel ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="secondary" size="sm" onClick={() => setEditing(p)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PartModal open={showCreate} onClose={() => setShowCreate(false)} />
      {editing && (
        <PartModal
          open={true}
          onClose={() => setEditing(null)}
          partId={editing.id}
          initial={{
            partNumber: editing.partNumber,
            partName: editing.partName,
            partType: editing.partType,
            revisionLevel: editing.revisionLevel ?? '',
            description: (editing as Part & { description?: string }).description ?? '',
          }}
        />
      )}
    </div>
  );
}
