import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePosts } from '../api/hooks';
import { PostDetail } from './PostDetail';
import type { Post } from '../types';

// Map API Post type to frontend Post type
function mapApiPostToPost(apiPost: any): Post {
  return {
    id: apiPost.id,
    title: apiPost.title,
    cover: apiPost.images?.[0]?.url || apiPost.images?.[0] || '',
    images: apiPost.images?.map((img: any) => img.url || img) || [],
    originalType: (apiPost.content_type as 'article' | 'podcast') || 'article',
    originalContent: apiPost.content || '',
    audioUrl: apiPost.audio_url || undefined,
    author: apiPost.author || 'Unknown',
    avatar: '/default-avatar.png',
    likes: apiPost.like_count || 0,
  };
}

export function Explore() {
  const { data: apiPosts, loading, error, refresh } = usePosts({ limit: 50 });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Map API posts to frontend type
  const posts = apiPosts.map(mapApiPostToPost);

  return (
    <div className="min-h-screen pb-32 px-4 pt-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 px-2"
      >
        <h1 className="text-3xl font-bold mb-2 font-sans tracking-tight">Explore</h1>
        <p className="text-white/50 text-sm">发现由 Narrio 转换的优质内容</p>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-3 text-white/70">Loading posts...</span>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-white/70 mb-4">No posts found</p>
          <p className="text-white/50 text-sm">Start by creating some content with Generate</p>
        </div>
      )}

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="break-inside-avoid rounded-2xl overflow-hidden bg-surface border border-white/5 group cursor-pointer flex flex-col"
            onClick={() => setSelectedPost(post)}
          >
            <img src={post.cover} alt={post.title} className="w-full aspect-[3/4] object-cover" />
            <div className="p-3 flex flex-col">
              <h3 className="text-sm font-medium line-clamp-2 mb-2 leading-snug">{post.title}</h3>
              <div className="flex items-center space-x-1.5 text-xs text-white/70 font-sans">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.likes} likes</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
