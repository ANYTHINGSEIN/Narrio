import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PostDetail } from "./PostDetail";
import type { Post } from "../types";

interface ExploreContentInfo {
  title: string;
  author: string;
}

interface ExplorePost extends Post {
  dirName: string;
  content?: string; // markdown content
}

/**
 * Load explore content from public/explore-content directory
 * Each subdirectory contains: avatar.png, info.json, and numbered PNG images
 */
function loadExploreContent(): Promise<ExplorePost[]> {
  return new Promise(async (resolve) => {
    const posts: ExplorePost[] = [];

    try {
      // Fetch directory listing from public/explore-content
      // Since we can't directly list directories in production, we use a known list
      const contentDirs = [
        "The Cure for Execution Tax",
        "Harness engineering-leveraging Codex in an agent-first world",
        "Harness design for long-running application",
        "The Gut Decision Matrix-When to Trust Instinct and Intuition",
      ];

      // Pre-configured markdown filenames for each directory (filenames are truncated by filesystem)
      const mdFileMap: Record<string, string> = {
        "The Cure for Execution Tax": "The Cure for Execution Tax.md",
        "Harness engineering-leveraging Codex in an agent-first world": "Harness engineering_ leveraging Codex in....md",
        "Harness design for long-running application": "Harness design for long-running applicat....md",
        "The Gut Decision Matrix-When to Trust Instinct and Intuition": "The Gut Decision Matrix_ When to Trust I....md",
      };

      for (const dir of contentDirs) {
        try {
          // Load info.json
          const infoRes = await fetch(`/explore-content/${encodeURIComponent(dir)}/info.json`);
          const info: ExploreContentInfo = await infoRes.json();

          // Load markdown content using pre-configured filename
          let markdownContent = "";
          try {
            const mdFileName = mdFileMap[dir];
            if (mdFileName) {
              const mdRes = await fetch(`/explore-content/${encodeURIComponent(dir)}/${encodeURIComponent(mdFileName)}`);
              if (mdRes.ok) {
                markdownContent = await mdRes.text();
              } else {
                console.warn(`Failed to load markdown ${mdFileName} for ${dir}: ${mdRes.status}`);
              }
            }
          } catch (err) {
            console.warn(`Failed to load markdown for ${dir}:`, err);
          }

          // Load images - try to find how many images exist
          const images: string[] = [];
          for (let i = 0; i < 20; i++) {
            const imgUrl = `/explore-content/${encodeURIComponent(dir)}/${i}.png`;
            const exists = await imageExists(imgUrl);
            if (exists) {
              images.push(imgUrl);
            } else {
              break;
            }
          }

          if (images.length > 0) {
            const post: ExplorePost = {
              id: `explore-${dir}`,
              title: info.title,
              cover: images[0],
              images: images,
              originalType: "article",
              originalContent: markdownContent,
              author: info.author,
              avatar: `/explore-content/${encodeURIComponent(dir)}/avatar.png`,
              likes: 0,
              dirName: dir,
            };
            posts.push(post);
          }
        } catch (err) {
          console.warn(`Failed to load content from ${dir}:`, err);
        }
      }
    } catch (err) {
      console.warn("Failed to load explore content:", err);
    }

    resolve(posts);
  });
}

/**
 * Check if an image exists by attempting to load it
 */
function imageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export function Explore() {
  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    loadExploreContent().then((result) => {
      setPosts(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="ml-3 text-white/70 text-sm">Loading content...</span>
      </div>
    );
  }

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
        {posts.map((post, idx) => (
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
