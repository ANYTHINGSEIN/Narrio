/**
 * React hooks for SSR content
 */

import { useEffect, useState, useCallback } from 'react';
import { fetchSSRSources, scrapeSSRContent } from '../api/ssr';
import type { SSRSource, SSRScrapeResponse } from '../api/types';

interface UseSSRSourcesResult {
  sources: SSRSource[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Hook to fetch and manage SSR sources
 */
export function useSSRSources(): UseSSRSourcesResult {
  const [sources, setSources] = useState<SSRSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchSSRSources();
      setSources(result.data || []);
      if (result.error) {
        setError(result.error.message || 'Failed to fetch SSR sources');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  return {
    sources,
    loading,
    error,
    refresh: fetchSources,
  };
}

interface UseSSRScrapeResult {
  scraping: boolean;
  error: string | null;
  scrapeUrl: (url: string) => Promise<SSRScrapeResponse['data']>;
}

/**
 * Hook to scrape SSR content from a URL
 */
export function useSSRScrape(): UseSSRScrapeResult {
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrapeUrl = useCallback(async (url: string): Promise<SSRScrapeResponse['data']> => {
    try {
      setScraping(true);
      setError(null);
      const result = await scrapeSSRContent(url);
      if (result.error) {
        throw new Error(result.error.message);
      }
      return result.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scrape content');
      throw err;
    } finally {
      setScraping(false);
    }
  }, []);

  return {
    scraping,
    error,
    scrapeUrl,
  };
}
