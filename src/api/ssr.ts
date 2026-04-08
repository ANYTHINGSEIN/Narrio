/**
 * SSR API functions
 */

import api from './client';
import type { SSRSourceListResponse, SSRScrapeResponse } from './types';

/**
 * Fetch all SSR sources and their articles
 */
export async function fetchSSRSources(): Promise<SSRSourceListResponse> {
  return api.get<SSRSourceListResponse>('/api/ssr-sources');
}

/**
 * Fetch all SSR articles (flattened list)
 */
export async function fetchSSRArticles(): Promise<SSRSourceListResponse> {
  return api.get<SSRSourceListResponse>('/api/ssr-articles');
}

/**
 * Scrape content from an SSR URL
 */
export async function scrapeSSRContent(url: string): Promise<SSRScrapeResponse> {
  return api.post<SSRScrapeResponse>('/api/ssr/scrape', { url });
}
