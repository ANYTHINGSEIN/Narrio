/**
 * API types - TypeScript interfaces matching backend API response schemas
 */

// Job types
export type JobStatus =
  | "PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED";
export type JobStage = "chunkify" | "stylify" | "render";

export interface Job {
  id: string;
  status: JobStatus;
  stage: JobStage | null;
  progress: number; // 0-100
  input_type: "text" | "url" | "audio";
  input_value: string;
  selected_style: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  result: JobResult | null;
  error: string | null;
  metadata: Record<string, unknown>;
}

export interface JobResult {
  status: string;
  output_url: string;
  images: Array<{ url: string; page: number }>;
  metadata: Record<string, unknown> & {
    original_content?: string;
    source_url?: string;
  };
}

export interface JobCreate {
  input_type: "text" | "url" | "audio";
  input_value: string;
  selected_style?: string;
}

// Post types
export interface Post {
  id: string;
  title: string;
  content: string | null;
  content_type: "article" | "podcast";
  images: Array<{ url: string; alt?: string }>;
  audio_url: string | null;
  author: string | null;
  created_at: string;
  like_count: number;
  metadata?: Record<string, unknown>;
}

export interface PostListParams {
  limit?: number;
  offset?: number;
  type?: "article" | "podcast";
  from_date?: string;
  to_date?: string;
  q?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PostListResponse {
  data: Post[];
  total: number;
  limit: number;
  offset: number;
  error?: ApiError | null;
}

export interface JobListResponse {
  data: Job[];
  total: number;
  error?: ApiError | null;
}

// Generation types
export interface GenerationRequest {
  input_type: "text" | "url" | "audio";
  input_value: string;
  selected_style?: string;
}

export interface GenerationResponse {
  data: Job | null;
  error: ApiError | null;
}

// SSR types
export interface SSRSource {
  id: string;
  name: string;
  avatar: string;
  description: string;
  articles: SSRSourceArticle[];
}

export interface SSRSourceArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  cover: string;
}

export interface SSRSourceListResponse {
  data: SSRSource[];
  error: ApiError | null;
}

export interface SSRScrapeRequest {
  url: string;
}

export interface SSRScrapeResponse {
  data: {
    title: string;
    content: string;
    cover: string;
    url: string;
    input_type: "url";
  } | null;
  error: ApiError | null;
}

// Style types
export interface Style {
  id: string;
  name: string;
  cover: string;
  description: string;
}

export interface StyleListResponse {
  data: Style[];
  error: ApiError | null;
}
