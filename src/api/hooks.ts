/**
 * React hooks for API calls with loading/error state management
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { JobStatus, Style } from './types';

// Import API functions
import { fetchPosts } from './posts';
import { createGeneration as createGenerationApi, createGenerationFromAudio } from './generation';
import { fetchJobs, getJobStatus, cancelJob as cancelJobApi, retryJob as retryJobApi } from './jobs';
import { fetchStyles } from './styles';
import type { Post, PostListParams } from './types';
import type { Job } from './types';

/**
 * Hook for fetching posts with pagination and filtering
 */
export function usePosts(params?: PostListParams) {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchPosts(params);
      setData(result.data || []);
      setTotal(result.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [params?.limit, params?.offset, params?.type, params?.q, params?.from_date, params?.to_date]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, total, refresh: fetch };
}

/**
 * Hook for creating generation jobs
 */
export function useGeneration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<Job | null>(null);

  const createGenerationHook = useCallback(
    async (inputType: 'text' | 'url' | 'audio', inputValue: string, selectedStyle?: string) => {
      setLoading(true);
      setError(null);

      try {
        const result = await createGenerationApi({ input_type: inputType, input_value: inputValue, selected_style: selectedStyle });
        setJob(result);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create generation';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createGenerationFromAudioFile = useCallback(
    async (file: File, selectedStyle?: string) => {
      setLoading(true);
      setError(null);

      try {
        const result = await createGenerationFromAudio(file, selectedStyle);
        setJob(result);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create generation from audio';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { job, loading, error, createGeneration: createGenerationHook, createGenerationFromAudio: createGenerationFromAudioFile };
}

/**
 * Hook for WebSocket connection with automatic reconnection
 */
export function useWebSocket(jobId: string | null) {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!jobId) {
      return;
    }

    const connect = () => {
      const wsUrl = `${(import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000'}`.replace(
        'http',
        'ws'
      ).replace('https', 'wss');
      const ws = new WebSocket(`${wsUrl}/ws/jobs/${jobId}`);

      ws.onopen = () => {
        setConnected(true);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.status) setStatus(data.status);
          if (data.progress !== undefined) setProgress(data.progress);
          if (data.stage) setStage(data.stage);

          // Handle initial status message
          if (data.type === 'initial') {
            setStatus(data.status);
            setProgress(data.progress);
            setStage(data.stage);
          }
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };

      ws.onclose = () => {
        setConnected(false);
        // Attempt reconnection with exponential backoff
        setTimeout(connect, Math.min(1000 * Math.pow(2, 5), 30000));
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      wsRef.current = ws;
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [jobId]);

  return { connected, status, progress, stage };
}

/**
 * Hook for polling job status (WebSocket fallback)
 */
export function useJobStatus(jobId: string | null, pollInterval: number = 2000) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      return;
    }

    let cancelled = false;
    const abortController = new AbortController();

    const poll = async () => {
      setLoading(true);
      try {
        const result = await getJobStatus(jobId);
        if (!cancelled) {
          setJob(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch job status');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    poll();

    const intervalId = setInterval(poll, pollInterval);

    return () => {
      cancelled = true;
      abortController.abort();
      clearInterval(intervalId);
    };
  }, [jobId, pollInterval]);

  return { job, loading, error };
}

/**
 * Hook for fetching job list with filters
 */
export function useJobs(filters?: { status?: JobStatus; date?: string; limit?: number; offset?: number }) {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchJobs(filters);
      setData(result.data || []);
      setTotal(result.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [filters?.status, filters?.date, filters?.limit, filters?.offset]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, total, refresh: fetch };
}

/**
 * Hook for job actions (cancel, retry)
 */
export function useJobActions() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cancelJob = useCallback(async (jobId: string) => {
    setLoading(jobId);
    setError(null);

    try {
      const result = await cancelJobApi(jobId);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel job';
      setError(message);
      throw err;
    } finally {
      setLoading(null);
    }
  }, []);

  const retryJob = useCallback(async (jobId: string) => {
    setLoading(jobId);
    setError(null);

    try {
      const result = await retryJobApi(jobId);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to retry job';
      setError(message);
      throw err;
    } finally {
      setLoading(null);
    }
  }, []);

  return { cancelJob, retryJob, loading, error };
}

/**
 * Hook for fetching available visual styles
 */
export function useStyles() {
  const [data, setData] = useState<Style[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchStyles();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch styles');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchStyles]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
