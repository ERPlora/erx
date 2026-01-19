/**
 * ERX - ERPlora eXtensions
 * Web Components library for ERP desktop/web
 */

// Components
export { ErxDataGrid } from './components/erx-data-grid/erx-data-grid';
export { ErxSplitPane } from './components/erx-split-pane/erx-split-pane';
export { ErxPinPad } from './components/erx-pin-pad/erx-pin-pad';
export { ErxQuantityBadge } from './components/erx-quantity-badge/erx-quantity-badge';

// Types
export * from './components/erx-data-grid/erx-data-grid.types';
export * from './components/erx-split-pane/erx-split-pane.types';
export * from './components/erx-pin-pad/erx-pin-pad.types';

// Utilities
export { getErploraApi, isInErploraHub, getHubConfig } from './utils/api-bridge';
export type { ErploraApi, QueryOptions, QueryResult, HubConfig } from './utils/api-bridge';
