import { Post } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'How to Build a Great Product',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'Building a great product requires deep understanding of your users...',
    author: 'Tech Innovator',
    avatar: 'https://i.pravatar.cc/150?u=tech',
    likes: 1240
  },
  {
    id: '2',
    title: 'The Future of AI in Design',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop'
    ],
    originalType: 'podcast',
    originalContent: 'In this episode, we discuss how AI is changing the landscape of design...',
    audioUrl: 'https://example.com/audio.mp3',
    author: 'Design Visionary',
    avatar: 'https://i.pravatar.cc/150?u=design',
    likes: 356
  },
  {
    id: '3',
    title: 'Minimalist Setup Ideas',
    cover: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'Creating a minimalist workspace helps improve focus and productivity...',
    author: 'Minimalist Life',
    avatar: 'https://i.pravatar.cc/150?u=minimal',
    likes: 892
  },
  {
    id: '4',
    title: 'Mastering React Performance',
    cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'Learn how to optimize your React applications for better performance...',
    author: 'React Master',
    avatar: 'https://i.pravatar.cc/150?u=react',
    likes: 2100
  }
];
