/**
 * Generation API functions
 */

import api from './client';
import type { GenerationRequest, Job, GenerationResponse } from './types';

/**
 * Create a new content generation job
 */
export async function createGeneration(request: GenerationRequest): Promise<Job | null> {
  // Use POST body instead of query params to avoid URL length limits
  const endpoint = '/api/generate';
  console.log('[generate] Calling endpoint:', endpoint, 'with body:', {
    input_type: request.input_type,
    input_value: request.input_value.substring(0, 100) + '...',
    selected_style: request.selected_style
  });

  const response = await api.post<GenerationResponse>(endpoint, request);
  console.log('[generate] API result:', response);

  return response?.data ?? null;
}

/**
 * Create a generation job from audio file upload
 */
export async function createGenerationFromAudio(file: File, selectedStyle?: string): Promise<Job | null> {
  const formData = new FormData();
  formData.append('file', file);
  if (selectedStyle) {
    formData.append('selected_style', selectedStyle);
  }

  const response = await api.postForm<GenerationResponse>('/api/generate/audio', formData);
  return response?.data ?? null;
}
