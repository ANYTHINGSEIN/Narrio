/**
 * Base API client with error handling and JSON parsing
 */

// API base URL configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000';

// Response cache with TTL
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface RequestConfig extends RequestInit {
  skipCache?: boolean;
}

/**
 * Base fetch wrapper with error handling and JSON envelope parsing
 */
async function request<T>(endpoint: string, config?: RequestConfig): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const cacheKey = `GET:${url}`;

  // Check cache for GET requests
  if (!config?.skipCache && config?.method !== 'POST' && config?.method !== 'PUT' && config?.method !== 'DELETE') {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T;
    }
  }

  try {
    const response = await fetch(url, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    // Handle network errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiErrorImpl(
        errorData.error?.code || `HTTP_${response.status}`,
        errorData.error?.message || response.statusText,
        response.status
      );
    }

    const result = await response.json();

    // Parse JSON envelope format: { data, error }
    if (result.error) {
      throw new ApiErrorImpl(result.error.code, result.error.message, result.error.details);
    }

    const data = result.data !== undefined ? result.data : result;

    // Cache successful GET responses
    if (!config?.skipCache && config?.method !== 'POST' && config?.method !== 'PUT' && config?.method !== 'DELETE') {
      cache.set(cacheKey, { data, timestamp: Date.now() });
    }

    return data;
  } catch (error) {
    if (error instanceof ApiErrorImpl) {
      throw error;
    }
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiErrorImpl(
        'NETWORK_ERROR',
        'Unable to connect to API. Please ensure the backend server is running.',
        0
      );
    }
    throw error;
  }
}

/**
 * API Error class
 */
class ApiErrorImpl extends Error {
  code: string;
  status?: number;
  details?: Record<string, unknown>;

  constructor(code: string, message: string, status?: number, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Invalidate cache for a specific endpoint
 */
export function invalidateCache(endpoint: string): void {
  const keysToDelete: string[] = [];
  cache.forEach((_, key) => {
    if (key.includes(endpoint)) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach((key) => cache.delete(key));
}

/**
 * Clear entire cache
 */
export function clearCache(): void {
  cache.clear();
}

// HTTP method helpers
export const api = {
  get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return request<T>(endpoint, { ...config, method: 'GET' });
  },

  post<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return request<T>(endpoint, { ...config, method: 'DELETE' });
  },

  postForm<T>(endpoint: string, formData: FormData): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}, // Don't set Content-Type - browser will set it with boundary
    });
  },
};

export { API_BASE_URL };
export default api;
