export interface Post {
  id: string;
  title: string;
  cover: string;
  images: string[];
  originalType: 'article' | 'podcast';
  originalContent: string;
  audioUrl?: string;
  author: string;
  avatar: string;
  likes: number;
}
