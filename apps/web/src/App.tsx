import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { OrdersPage } from './pages/orders/OrdersPage';
import { OrderDetailPage } from './pages/orders/OrderDetailPage';
import { BatchesPage } from './pages/batches/BatchesPage';
import { BatchDetailPage } from './pages/batches/BatchDetailPage';
import { PartsPage } from './pages/parts/PartsPage';
import { WorkstationsPage } from './pages/workstations/WorkstationsPage';
import { CustomersPage } from './pages/customers/CustomersPage';
import { WorkOrdersPage } from './pages/work-orders/WorkOrdersPage';

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/orders" replace />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailPage />} />
        <Route path="batches" element={<BatchesPage />} />
        <Route path="batches/:id" element={<BatchDetailPage />} />
        <Route path="batches/:batchId/work-orders" element={<WorkOrdersPage />} />
        <Route path="parts" element={<PartsPage />} />
        <Route path="workstations" element={<WorkstationsPage />} />
      </Route>
    </Routes>
  );
}
