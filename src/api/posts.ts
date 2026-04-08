/**
 * Posts API functions
 */

import api from './client';
import type { Post, PostListParams, PostListResponse } from './types';

/**
 * Fetch list of posts with pagination and filtering
 */
export async function fetchPosts(params?: PostListParams): Promise<PostListResponse> {
  const searchParams = new URLSearchParams();

  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.offset) searchParams.set('offset', params.offset.toString());
  if (params?.type) searchParams.set('type', params.type);
  if (params?.from_date) searchParams.set('from_date', params.from_date);
  if (params?.to_date) searchParams.set('to_date', params.to_date);
  if (params?.q) searchParams.set('q', params.q);

  const queryString = searchParams.toString();
  const endpoint = `/api/posts${queryString ? `?${queryString}` : ''}`;

  return api.get<PostListResponse>(endpoint);
}

/**
 * Fetch a single post by ID
 */
export async function fetchPostById(postId: string): Promise<Post | null> {
  const result = await api.get<{ data: Post | null; error?: unknown }>(`/api/posts/${postId}`);
  return result?.data ?? null;
}

/**
 * Search posts by keyword
 */
export async function searchPosts(query: string, params?: Omit<PostListParams, 'q'>): Promise<PostListResponse> {
  return fetchPosts({ ...params, q: query });
}
