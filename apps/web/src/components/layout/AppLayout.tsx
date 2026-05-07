import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/customers', label: 'Customers', sub: 'Accounts & orders' },
  { to: '/orders', label: 'Orders', sub: 'Purchase orders' },
  { to: '/batches', label: 'Batches', sub: 'Production runs' },
  { to: '/routing', label: 'Routing', sub: 'Templates & steps' },
  { to: '/parts', label: 'Parts', sub: 'Parts catalog' },
  { to: '/workstations', label: 'Workstations', sub: 'Shop floor' },
];

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <nav className="w-52 shrink-0 bg-slate-900 text-slate-300 flex flex-col px-3 py-5">
        <div className="px-3 mb-6">
          <span className="text-white font-bold text-sm tracking-widest block">DES-BOMS</span>
          <span className="text-slate-500 text-xs">Manufacturing Ops</span>
        </div>

        {navItems.map(({ to, label, sub }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg mb-0.5 transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className={`block text-sm font-medium`}>{label}</span>
            <span className="block text-xs text-slate-500 leading-tight">{sub}</span>
          </NavLink>
        ))}

        <div className="mt-auto pt-4 border-t border-slate-800 px-3">
          <p className="text-xs text-slate-600 font-semibold tracking-wide mb-2">WORKFLOW</p>
          <ol className="flex flex-col gap-1 text-xs text-slate-500">
            <li className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              Create a customer
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              Add a purchase order
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              Create a batch
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
              Apply routing &amp; produce
            </li>
          </ol>
        </div>
      </nav>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
