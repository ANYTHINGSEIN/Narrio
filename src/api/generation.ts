/**
 * Generation API functions
 */

import api from './client';
import type { GenerationRequest, Job } from './types';

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
  const result = await api.post<{ data: Job | null; error?: unknown }>(endpoint);

  return result?.data ?? null;
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

  const result = await api.postForm<{ data: Job | null; error?: unknown }>('/api/generate/audio', formData);
  return result?.data ?? null;
}
