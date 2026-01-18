/**
 * ERPlora API Bridge
 * Connects ERX components to the Hub's window.erplora API
 */

export interface ErploraApi {
  moduleId: string;
  query: (options: QueryOptions) => Promise<QueryResult>;
  batch: (operations: Operation[]) => Promise<BatchResult>;
  raw: (sql: string, params?: unknown[]) => Promise<RawResult>;
  navigate: (path: string) => void;
  toast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  getConfig: () => Promise<HubConfig>;
}

export interface QueryOptions {
  action: 'select' | 'insert' | 'update' | 'delete';
  table: string;
  where?: Record<string, unknown>;
  data?: Record<string, unknown>;
  orderBy?: string;
  limit?: number;
  offset?: number;
}

export interface QueryResult {
  success: boolean;
  data?: unknown[];
  error?: string;
}

export interface Operation {
  action: 'insert' | 'update' | 'delete';
  table: string;
  data?: Record<string, unknown>;
  where?: Record<string, unknown>;
}

export interface BatchResult {
  success: boolean;
  results?: unknown[];
  error?: string;
}

export interface RawResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface HubConfig {
  hubId: string;
  name: string;
  theme: 'light' | 'dark' | 'system';
  locale: string;
}

declare global {
  interface Window {
    erplora?: {
      modules: Map<string, ErploraApi>;
      getApi: (moduleId: string) => ErploraApi;
    };
  }
}

/**
 * Check if running inside ERPlora Hub
 */
export function isInErploraHub(): boolean {
  return typeof window !== 'undefined' && !!window.erplora;
}

/**
 * Get the ERPlora API for a module
 */
export function getErploraApi(moduleId: string): ErploraApi | null {
  if (isInErploraHub()) {
    return window.erplora!.getApi(moduleId);
  }
  return null;
}

/**
 * Get Hub configuration
 */
export async function getHubConfig(): Promise<HubConfig | null> {
  const api = getErploraApi('__system__');
  if (api) {
    return api.getConfig();
  }
  return null;
}
