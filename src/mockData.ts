import { Post } from "./types";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "How to Build a Great Product",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "Building a great product requires deep understanding of your users...",
    author: "Tech Innovator",
    avatar: "https://i.pravatar.cc/150?u=tech",
    likes: 1240,
  },
  {
    id: "2",
    title: "The Future of AI in Design",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
    ],
    originalType: "podcast",
    originalContent:
      "In this episode, we discuss how AI is changing the landscape of design...",
    audioUrl: "https://example.com/audio.mp3",
    author: "Design Visionary",
    avatar: "https://i.pravatar.cc/150?u=design",
    likes: 356,
  },
  {
    id: "3",
    title: "Minimalist Setup Ideas",
    cover:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "Creating a minimalist workspace helps improve focus and productivity...",
    author: "Minimalist Life",
    avatar: "https://i.pravatar.cc/150?u=minimal",
    likes: 892,
  },
  {
    id: "4",
    title: "Mastering React Performance",
    cover:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "Learn how to optimize your React applications for better performance...",
    author: "React Master",
    avatar: "https://i.pravatar.cc/150?u=react",
    likes: 2100,
  },
  {
    id: "5",
    title: "A Guide to Better Typography",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed...",
    author: "Design Studio",
    avatar: "https://i.pravatar.cc/150?u=typo",
    likes: 1530,
  },
  {
    id: "6",
    title: "Web3: What You Need to Know",
    cover:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    ],
    originalType: "podcast",
    originalContent:
      "Today we dive deep into the world of Web3, blockchain technology, and decentralized applications...",
    audioUrl: "https://example.com/audio.mp3",
    author: "Crypto Daily",
    avatar: "https://i.pravatar.cc/150?u=crypto",
    likes: 2890,
  },
  {
    id: "7",
    title: "The Art of Coffee Brewing",
    cover:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "Mastering the perfect cup of coffee takes patience, quality beans, and the right brewing technique...",
    author: "Cafe Culture",
    avatar: "https://i.pravatar.cc/150?u=coffee",
    likes: 3420,
  },
  {
    id: "8",
    title: "Remote Work Strategies",
    cover:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2069&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2069&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "How to maintain productivity and work-life balance while working from home...",
    author: "Digital Nomad",
    avatar: "https://i.pravatar.cc/150?u=remote",
    likes: 956,
  },
  {
    id: "9",
    title: "Sustainable Architecture",
    cover:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065&auto=format&fit=crop",
    ],
    originalType: "article",
    originalContent:
      "Exploring eco-friendly building materials and energy-efficient designs in modern architecture...",
    author: "Eco Builder",
    avatar: "https://i.pravatar.cc/150?u=eco",
    likes: 1840,
  },
  {
    id: "10",
    title: "Indie Game Development",
    cover:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    ],
    originalType: "podcast",
    originalContent:
      "An interview with the creators of the hit indie game about their journey and challenges...",
    audioUrl: "https://example.com/audio.mp3",
    author: "Gamer Zone",
    avatar: "https://i.pravatar.cc/150?u=game",
    likes: 4200,
  },
];

// Mock posts from explore-content directory (temporary fallback)
// Used when API data is not available
export const EXPLORE_MOCK_POSTS: Post[] = [
  {
    id: "explore-1",
    title: "The Cure for Execution Tax",
    cover: "/explore-content/The Cure for Execution Tax/0.png",
    images: Array.from(
      { length: 8 },
      (_, i) => `/explore-content/The Cure for Execution Tax/${i}.png`,
    ),
    originalType: "article",
    originalContent: `# The cure for "execution tax"

Dan Gilbert has a name for the thing quietly draining companies everywhere: **execution tax**.

It's the gap between a decision and its outcome. Between *we should do this* and *this is done*. "Every meeting creates more work," explains Dan. "More notes. More summaries of notes. More sharing those notes. Action items captured---and quietly lost."

Dan is Global CEO of Brainlabs, a 1,000-person media agency operating across seven countries. Data-driven, scientific, laser-focused on driving client revenue. The kind of company where every hour spent chasing action items is an hour not spent on strategy.

He's watched AI transform the input/output ratio of engineering work. The data bears it out: top-performing engineering teams using AI are seeing double-digit productivity gains and measurable jumps in quality. But for everyone---the strategists, account managers, and operators---the gap between deciding and doing was still achingly wide.

So Dan asked the question that changed everything at Brainlabs: **When does the 10x moment arrive for the knowledge worker?**

He stopped waiting for someone else to answer it.`,
    author: "Harness",
    avatar: "https://via.placeholder.com/100x100/4800FF/ffffff?text=H",
    likes: 0,
  },
  {
    id: "explore-2",
    title: "Harness engineering-leveraging Codex",
    cover:
      "/explore-content/Harness engineering-leveraging Codex in an agent-first world/0.png",
    images: Array.from(
      { length: 8 },
      (_, i) =>
        `/explore-content/Harness engineering-leveraging Codex in an agent-first world/${i}.png`,
    ),
    originalType: "article",
    originalContent: `# Harness Engineering: Leveraging Codex in an Agent-First World

The future of engineering is here. AI-powered agents are transforming how teams build software.

In this article, we explore how Harness is leveraging Codex and AI-first tools to accelerate development velocity.`,
    author: "Harness",
    avatar: "https://via.placeholder.com/100x100/4800FF/ffffff?text=H",
    likes: 0,
  },
  {
    id: "explore-3",
    title: "Harness Design for Long-Running Applications",
    cover: "/explore-content/Harness design for long-running application/0.png",
    images: Array.from(
      { length: 7 },
      (_, i) =>
        `/explore-content/Harness design for long-running application/${i}.png`,
    ),
    originalType: "article",
    originalContent: `# Harness Design for Long-Running Applications

Building applications that run for extended periods requires careful consideration of state management, monitoring, and recovery.

This guide covers best practices for designing resilient, long-running applications.`,
    author: "Harness",
    avatar: "https://via.placeholder.com/100x100/4800FF/ffffff?text=H",
    likes: 0,
  },
  {
    id: "explore-4",
    title: "The Gut Decision Matrix",
    cover:
      "/explore-content/The Gut Decision Matrix-When to Trust Instinct and Intuition/0.png",
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `/explore-content/The Gut Decision Matrix-When to Trust Instinct and Intuition/${i}.png`,
    ),
    originalType: "article",
    originalContent: `# The Gut Decision Matrix: When to Trust Instinct and Intuition

Knowing when to trust your gut versus when to rely on data is a critical leadership skill.

The Gut Decision Matrix provides a framework for making better decisions by understanding when intuition serves you well and when it might lead you astray.`,
    author: "Harness",
    avatar: "https://via.placeholder.com/100x100/4800FF/ffffff?text=H",
    likes: 0,
  },
];
