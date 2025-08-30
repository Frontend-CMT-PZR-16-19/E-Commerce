"use client";

import { BlogCard } from "@/components/blogCard";
import { Post } from "@/types/sanityTypes";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);


  const getPosts = async () => {
    await fetch("/api/post")
      .then((response) => response.json())
      .then((jsonResponse) => setPosts(jsonResponse.data));
  };

  useEffect(() => {
    getPosts();
  }, []);

  if (posts.length === 0) {
    return <div>yükleniyor...</div>;
  }

  return <div className="grid grid-cols-4 gap-4 w-full">{posts.map((post) => <BlogCard post={post} key={post._id} />)}</div>;
}
