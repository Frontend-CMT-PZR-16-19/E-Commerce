"use client";

import { title } from "@/components/primitives";
import getAllPosts from "@/sanity/lib/postQueries";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      await fetch("http:/localhost:3000/api/post")
        .then((response) => response.json())
        .then((data) => setPosts(data));
    };
  }, []);

  return (
    <div>
      <h1 className={title()}>Blog</h1>
    </div>
  );
}
