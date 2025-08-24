"use client";

import { useEffect, useState } from "react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

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

  return <div>{JSON.stringify(posts)}</div>;
}
