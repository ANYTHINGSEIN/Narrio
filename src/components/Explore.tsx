import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PostDetail } from "./PostDetail";
import { EXPLORE_MOCK_POSTS } from "../mockData";
import type { Post } from "../types";

// Use mock data for explore view (temporary fallback until API data is available)
const POSTS = EXPLORE_MOCK_POSTS;

export function Explore() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="min-h-screen pb-32 px-4 pt-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 px-2"
      >
        <h1 className="text-3xl font-bold mb-2 font-sans tracking-tight">
          Explore
        </h1>
        <p className="text-white/50 text-sm">发现由 Narrio 转换的优质内容</p>
      </motion.div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="break-inside-avoid rounded-2xl overflow-hidden bg-surface border border-white/5 group cursor-pointer flex flex-col"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.cover}
              alt={post.title}
              className="w-full aspect-[3/4] object-cover"
            />
            <div className="p-3 flex flex-col">
              <h3 className="text-sm font-medium line-clamp-2 mb-2 leading-snug">
                {post.title}
              </h3>
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
          <PostDetail
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
