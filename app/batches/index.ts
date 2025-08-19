/**
 * Batches module barrel export
 * Centralizes all batch-related components, hooks, types, and utilities
 */

// Components
export { BatchDetailsModal } from './components/BatchDetailsModal';
export { BatchTable } from './components/BatchTable';
export { BulkActionsToolbar } from './components/BulkActionsToolbar';
export { DeleteBatchConfirmation } from './components/DeleteBatchConfirmation';
export { EditBatchModal } from './components/EditBatchModal';
export { EnhancedSearch } from './components/EnhancedSearch';
export { NewBatchModal } from './components/NewBatchModal';
export { RoutingEditorModal } from './components/RoutingEditorModal';
export { WorkTravelerModal } from './components/WorkTravelerModal';

// Error Components (multiple exports)
export {
  ErrorWithRetry,
  NetworkError,
  DatabaseError,
  ValidationError,
  LoadingError
} from './components/ErrorComponents';

// Loading Skeletons (multiple exports)
export {
  BatchTableSkeleton,
  StatsSkeleton,
  ModalContentSkeleton,
  FilterBarSkeleton
} from './components/LoadingSkeletons';

// Smart Notifications
export { 
  useSmartNotifications,
  type BatchNotification 
} from './components/SmartNotifications';

// Hooks
export { useBatchSearch } from './hooks/useBatchSearch';
export { useBulkSelection } from './hooks/useBulkSelection';
export { useLiveBatchUpdates } from './hooks/useLiveBatchUpdates';

// Types
export * from './types';

// Utilities
export * from './utils/batchHelpers';
