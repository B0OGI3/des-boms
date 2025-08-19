/**
 * Central component exports for proper hierarchy
 * This barrel file simplifies imports and establishes clear component boundaries
 */

// Core components
export { ErrorBoundary } from './ErrorBoundary';
export { LoadingScreen } from './LoadingScreen';
export { WorkOrderTracking } from './WorkOrderTracking';

// UI components - re-export everything from the ui module
export * from './ui';
