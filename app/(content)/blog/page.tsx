"use client";

import { Post } from "@/types/sanityTypes";
import { useEffect, useState } from "react";
import BlogCard from "@/components/blogCard";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        await fetch("/api/post")
          .then((response) => response.json())
          .then((jsonResponse) => setPosts(jsonResponse.data));
      } catch (error) {
        console.error("Blog yazıları yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-lg">Blog yazıları yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Blog</h1>
        <p className="text-center text-gray-600">En son blog yazılarımızı keşfedin</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center">
          <div className="text-lg">Henüz blog yazısı bulunmuyor.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
