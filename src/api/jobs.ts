/**
 * Jobs API functions
 */

import api, { invalidateCache } from './client';
import type { Job, JobStatus } from './types';

interface JobListParams {
  status?: JobStatus;
  date?: string;
  limit?: number;
  offset?: number;
}

interface JobListResponse {
  data: Job[];
  total: number;
  error?: { code: string; message: string } | null;
}

/**
 * Fetch list of jobs with filtering and pagination
 */
export async function fetchJobs(params?: JobListParams): Promise<JobListResponse> {
  const searchParams = new URLSearchParams();

  if (params?.status) searchParams.set('status', params.status);
  if (params?.date) searchParams.set('date', params.date);
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());

  const queryString = searchParams.toString();
  const endpoint = `/api/jobs${queryString ? `?${queryString}` : ''}`;

  return api.get<JobListResponse>(endpoint);
}

/**
 * Get job status and progress
 */
export async function getJobStatus(jobId: string): Promise<Job | null> {
  const result = await api.get<{ data: Job | null; error?: unknown }>(`/api/jobs/${jobId}`);
  return result?.data ?? null;
}

/**
 * Get job result data (for completed jobs)
 */
export async function getJobResult(jobId: string): Promise<unknown | null> {
  const result = await api.get<{ data: unknown | null; error?: unknown }>(`/api/jobs/${jobId}/result`);
  return result?.data ?? null;
}

/**
 * Cancel a running job
 */
export async function cancelJob(jobId: string): Promise<Job | null> {
  invalidateCache('/api/jobs');
  const result = await api.post<{ data: Job | null; error?: unknown }>(`/api/jobs/${jobId}/cancel`);
  return result?.data ?? null;
}

/**
 * Retry a failed or completed job
 */
export async function retryJob(jobId: string): Promise<Job | null> {
  invalidateCache('/api/jobs');
  const result = await api.post<{ data: Job | null; error?: unknown }>(`/api/jobs/${jobId}/retry`);
  return result?.data ?? null;
}
