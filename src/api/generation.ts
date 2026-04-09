/**
 * Generation API functions
 */

import api from './client';
import type { GenerationRequest, Job, GenerationResponse } from './types';

/**
 * Create a new content generation job
 */
export async function createGeneration(request: GenerationRequest): Promise<Job | null> {
  const searchParams = new URLSearchParams();
  searchParams.set('input_type', request.input_type);
  searchParams.set('input_value', request.input_value);
  if (request.selected_style) {
    searchParams.set('selected_style', request.selected_style);
  }

  const endpoint = `/api/generate?${searchParams.toString()}`;
  console.log('[generate] Calling endpoint:', endpoint);
  const response = await api.post<GenerationResponse>(endpoint);
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
