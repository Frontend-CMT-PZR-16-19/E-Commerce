"use client";

import { Post } from "@/types/sanityTypes";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      await fetch("/api/post")
        .then((response) => response.json())
        .then((jsonResponse) => setPosts(jsonResponse.data));
    };

    getPosts();
  }, []);

  if (posts.length === 0) {
    return <div>yükleniyor...</div>;
  }

  return <div>{posts[0].author.slug}</div>;
}
