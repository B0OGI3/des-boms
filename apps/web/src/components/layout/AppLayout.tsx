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
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ width: 200, background: '#1a1a2e', color: '#eee', padding: '1rem' }}>
        <h1 style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#fff' }}>DES-BOMS</h1>
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'block',
              padding: '0.5rem 0.75rem',
              marginBottom: '0.25rem',
              borderRadius: 4,
              color: isActive ? '#fff' : '#aaa',
              background: isActive ? '#16213e' : 'transparent',
              textDecoration: 'none',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <main style={{ flex: 1, padding: '1.5rem', background: '#f5f5f5' }}>
        <Outlet />
      </main>
    </div>
  );
}
