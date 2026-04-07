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
  },
  {
    id: '5',
    title: 'A Guide to Better Typography',
    cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed...',
    author: 'Design Studio',
    avatar: 'https://i.pravatar.cc/150?u=typo',
    likes: 1530
  },
  {
    id: '6',
    title: 'Web3: What You Need to Know',
    cover: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop'
    ],
    originalType: 'podcast',
    originalContent: 'Today we dive deep into the world of Web3, blockchain technology, and decentralized applications...',
    audioUrl: 'https://example.com/audio.mp3',
    author: 'Crypto Daily',
    avatar: 'https://i.pravatar.cc/150?u=crypto',
    likes: 2890
  },
  {
    id: '7',
    title: 'The Art of Coffee Brewing',
    cover: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'Mastering the perfect cup of coffee takes patience, quality beans, and the right brewing technique...',
    author: 'Cafe Culture',
    avatar: 'https://i.pravatar.cc/150?u=coffee',
    likes: 3420
  },
  {
    id: '8',
    title: 'Remote Work Strategies',
    cover: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2069&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2069&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'How to maintain productivity and work-life balance while working from home...',
    author: 'Digital Nomad',
    avatar: 'https://i.pravatar.cc/150?u=remote',
    likes: 956
  },
  {
    id: '9',
    title: 'Sustainable Architecture',
    cover: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065&auto=format&fit=crop'
    ],
    originalType: 'article',
    originalContent: 'Exploring eco-friendly building materials and energy-efficient designs in modern architecture...',
    author: 'Eco Builder',
    avatar: 'https://i.pravatar.cc/150?u=eco',
    likes: 1840
  },
  {
    id: '10',
    title: 'Indie Game Development',
    cover: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop'
    ],
    originalType: 'podcast',
    originalContent: 'An interview with the creators of the hit indie game about their journey and challenges...',
    audioUrl: 'https://example.com/audio.mp3',
    author: 'Gamer Zone',
    avatar: 'https://i.pravatar.cc/150?u=game',
    likes: 4200
  }
];
