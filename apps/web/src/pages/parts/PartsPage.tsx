import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import type { Part } from '@des-boms/shared';

export function PartsPage() {
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
      </div>

      {parts.length === 0 ? (
        <p className="text-gray-500">No parts found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Part Number', 'Name', 'Type', 'Rev', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-800">{p.partNumber}</td>
                  <td className="px-4 py-3 text-gray-700">{p.partName}</td>
                  <td className="px-4 py-3 text-gray-600">{p.partType}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
