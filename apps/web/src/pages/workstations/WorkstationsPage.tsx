import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { WorkstationWithOperators } from '../../api/types';

export function WorkstationsPage() {
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
      </div>

      {workstations.length === 0 ? (
        <p className="text-gray-500">No workstations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workstations.map((ws) => (
            <div key={ws.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{ws.name}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
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
    </div>
  );
}
