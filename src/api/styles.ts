/**
 * Styles API functions
 */

import api from './client';
import type { Style } from './types';

/**
 * Fetch list of available visual styles
 */
export async function fetchStyles(): Promise<Style[]> {
  return api.get<Style[]>('/api/styles');
}
