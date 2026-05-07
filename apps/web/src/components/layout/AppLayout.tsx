import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/customers', label: 'Customers' },
  { to: '/orders', label: 'Orders' },
  { to: '/batches', label: 'Batches' },
  { to: '/parts', label: 'Parts' },
  { to: '/workstations', label: 'Workstations' },
];

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <nav className="w-52 shrink-0 bg-slate-900 text-slate-300 flex flex-col px-3 py-5">
        <span className="text-white font-bold text-sm tracking-widest mb-6 px-3">DES-BOMS</span>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${
                isActive
                  ? 'bg-slate-700 text-white font-medium'
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
