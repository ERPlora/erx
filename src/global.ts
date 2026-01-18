/**
 * ERX Global Script
 * Initializes the ERPlora API bridge integration
 */

import { getErploraApi, isInErploraHub } from './utils/api-bridge';

export default function () {
  // Log initialization in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('[ERX] Initializing ERPlora eXtensions');
    console.log('[ERX] Running in ERPlora Hub:', isInErploraHub());
  }
}

// Re-export utilities for consumers
export { getErploraApi, isInErploraHub };
