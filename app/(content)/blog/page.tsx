"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";

interface Post {
  _id: string;
  title: string;
  summary?: string;
  publishedAt: string;
  author?: {
    name: string;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("/api/post");
        const jsonResponse = await response.json();
        setPosts(jsonResponse.data || []);
      } catch (error) {
        console.error("Blog yazıları yüklenemedi:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-8">Blog</h1>
          <p className="text-lg">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Blog Yazıları</h1>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Henüz blog yazısı bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <h2 className="text-xl font-semibold line-clamp-2">
                  {post.title}
                </h2>
              </CardHeader>
              <CardBody className="pt-0">
                {post.summary && (
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {post.summary}
                  </p>
                )}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  {post.author?.name && (
                    <span>Yazar: {post.author.name}</span>
                  )}
                  {post.publishedAt && (
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                    </span>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
