import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PostDetail } from "./PostDetail";
import type { Post } from "../types";

interface ExploreDirectoryInfo {
  name: string;
  md_files: string[];
  has_info: boolean;
  has_avatar: boolean;
  images: string[];
}

interface ExploreContentInfo {
  title: string;
  author: string;
}

interface ExplorePost extends Post {
  dirName: string;
  content?: string; // markdown content
}

/**
 * Load explore content from backend API
 * Each subdirectory contains: avatar.png, info.json, and numbered PNG images
 */
function loadExploreContent(): Promise<ExplorePost[]> {
  return new Promise(async (resolve) => {
    const posts: ExplorePost[] = [];

    try {
      // Fetch directory list from backend API
      const dirsRes = await fetch("/api/explore/directories");
      if (!dirsRes.ok) {
        throw new Error(`Failed to fetch directories: ${dirsRes.status}`);
      }
      const dirsData = await dirsRes.json();
      const dirInfos: ExploreDirectoryInfo[] = dirsData.data || [];

      for (const dirInfo of dirInfos) {
        try {
          const dir = dirInfo.name;

          // Skip if no markdown files
          if (dirInfo.md_files.length === 0) {
            console.warn(`No markdown files found in ${dir}, skipping`);
            continue;
          }

          // Load info.json from backend (optional, fallback to directory name)
          let info: ExploreContentInfo = { title: dir, author: "Unknown" };
          if (dirInfo.has_info) {
            try {
              const infoRes = await fetch(`/api/explore-content/${encodeURIComponent(dir)}/info.json`);
              if (infoRes.ok) {
                info = await infoRes.json();
              }
            } catch (err) {
              console.warn(`Failed to load info.json for ${dir}, using directory name as title:`, err);
            }
          }

          // Load markdown content - use the first .md file found
          let markdownContent = "";
          const mdFileName = dirInfo.md_files[0];
          try {
            const mdRes = await fetch(`/api/explore-content/${encodeURIComponent(dir)}/${encodeURIComponent(mdFileName)}`);
            if (mdRes.ok) {
              markdownContent = await mdRes.text();
            }
          } catch (err) {
            console.warn(`Failed to load markdown for ${dir}:`, err);
          }

          // Skip if no markdown content found
          if (!markdownContent) {
            console.warn(`Failed to load markdown content for ${dir}, skipping`);
            continue;
          }

          // Build image URLs from the list provided by backend
          const images: string[] = dirInfo.images.map(
            (img) => `/api/explore-content/${encodeURIComponent(dir)}/${img}`
          );

          // Create post - use first image as cover or placeholder
          const post: ExplorePost = {
            id: `explore-${dir}`,
            title: info.title,
            cover: images.length > 0 ? images[0] : "/placeholder-cover.png",
            images: images,
            originalType: "article",
            originalContent: markdownContent,
            author: info.author,
            avatar: dirInfo.has_avatar ? `/api/explore-content/${encodeURIComponent(dir)}/avatar.png` : undefined,
            likes: 0,
            dirName: dir,
          };
          posts.push(post);
        } catch (err) {
          console.warn(`Failed to load content from ${dirInfo.name}:`, err);
        }
      }
    } catch (err) {
      console.warn("Failed to load explore content:", err);
    }

    resolve(posts);
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-surface border border-white/5 group cursor-pointer flex flex-col"
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
