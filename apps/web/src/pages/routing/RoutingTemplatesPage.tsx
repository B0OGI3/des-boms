import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { RoutingTemplateSummary, WorkstationWithOperators } from '../../api/types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

type StepDraft = {
  workstationId: string;
  description: string;
  estimatedTime: number | '';
};

function NewTemplateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState<StepDraft[]>([]);

  const { data: workstations = [] } = useQuery<WorkstationWithOperators[]>({
    queryKey: ['workstations'],
    queryFn: () => api.get<WorkstationWithOperators[]>('/workstations'),
    enabled: open,
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post('/routing/templates', {
        name,
        description: description || undefined,
        steps: steps.map((s, i) => ({
          stepNumber: i + 1,
          workstationId: s.workstationId,
          description: s.description,
          estimatedTime: s.estimatedTime !== '' ? s.estimatedTime : undefined,
        })),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routing-templates'] });
      onClose();
      setName('');
      setDescription('');
      setSteps([]);
    },
  });

  function addStep() {
    setSteps((s) => [...s, { workstationId: '', description: '', estimatedTime: '' }]);
  }

  function updateStep(i: number, patch: Partial<StepDraft>) {
    setSteps((s) => s.map((step, idx) => (idx === i ? { ...step, ...patch } : step)));
  }

  function removeStep(i: number) {
    setSteps((s) => s.filter((_, idx) => idx !== i));
  }

  function moveStep(i: number, dir: -1 | 1) {
    setSteps((s) => {
      const next = [...s];
      const j = i + dir;
      if (j < 0 || j >= next.length) return s;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="New Routing Template">
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="flex flex-col gap-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Steps</span>
            <Button type="button" variant="ghost" size="sm" onClick={addStep}>+ Add Step</Button>
          </div>
          {steps.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-lg py-4 text-center">
              <p className="text-xs text-gray-400 mb-2">No steps yet</p>
              <Button type="button" variant="secondary" size="sm" onClick={addStep}>+ Add Step</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-2 items-start p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="w-5 h-5 mt-2 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-bold shrink-0 text-gray-600">
                    {i + 1}
                  </span>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <select
                      className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={step.workstationId}
                      onChange={(e) => updateStep(i, { workstationId: e.target.value })}
                      required
                    >
                      <option value="">Select workstation…</option>
                      {workstations.map((ws) => (
                        <option key={ws.id} value={ws.id}>{ws.name}</option>
                      ))}
                    </select>
                    <div className="flex gap-1.5">
                      <input
                        placeholder="Step description"
                        className="flex-1 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={step.description}
                        onChange={(e) => updateStep(i, { description: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        min={1}
                        placeholder="Min"
                        title="Estimated time (minutes)"
                        className="w-16 border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={step.estimatedTime}
                        onChange={(e) =>
                          updateStep(i, {
                            estimatedTime: e.target.value === '' ? '' : parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveStep(i, -1)}
                      disabled={i === 0}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-xs px-1"
                    >▲</button>
                    <button
                      type="button"
                      onClick={() => moveStep(i, 1)}
                      disabled={i === steps.length - 1}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-xs px-1"
                    >▼</button>
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="text-gray-400 hover:text-red-500 text-xs px-1 mt-0.5"
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {mutation.isError && <p className="text-sm text-red-600">Failed to create template.</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating…' : 'Create Template'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function RoutingTemplatesPage() {
  const [showModal, setShowModal] = useState(false);

  const { data: templates = [], isLoading, error } = useQuery<RoutingTemplateSummary[]>({
    queryKey: ['routing-templates'],
    queryFn: () => api.get<RoutingTemplateSummary[]>('/routing/templates'),
  });

  if (isLoading) return <p className="text-gray-500">Loading templates…</p>;
  if (error) return <p className="text-red-600">Error loading templates.</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Routing Templates</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Define the sequence of workstation steps a production batch must complete
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>+ New Template</Button>
      </div>

      {templates.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center max-w-md mx-auto">
          <p className="text-gray-500 font-medium mb-1">No routing templates yet</p>
          <p className="text-gray-400 text-sm mb-4">
            Templates define the workstation steps for a batch. You need at least one before you can route a batch into production.
          </p>
          <Button onClick={() => setShowModal(true)}>+ New Template</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {templates.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  {t.description && (
                    <p className="text-sm text-gray-500 mt-0.5">{t.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0 ml-2">
                  {t.templateSteps.length} step{t.templateSteps.length !== 1 ? 's' : ''}
                </span>
              </div>
              {t.templateSteps.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 mt-3">
                  {[...t.templateSteps]
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((s, idx) => (
                      <span key={s.id} className="flex items-center gap-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                          {s.workstation.name}
                        </span>
                        {idx < t.templateSteps.length - 1 && (
                          <span className="text-gray-300 text-xs">→</span>
                        )}
                      </span>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <NewTemplateModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
