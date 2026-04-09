/**
 * Styles API functions
 */

import api from './client';
import type { Style, StyleListResponse } from './types';

/**
 * Fetch list of available visual styles
 */
export async function fetchStyles(): Promise<Style[]> {
  const response = await api.get<StyleListResponse>('/api/styles');
  return response?.data ?? [];
}
