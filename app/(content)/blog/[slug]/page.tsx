"use client"

import { Post } from "@/types/sanityTypes";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SingleBlogPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    
    const getPost = async() => {
        await fetch(`/api/post/${slug}`).then(response => response.json()).then(post => setPost(post.data))
    } 

    useEffect(() => {
        getPost()
    }, [])
    
    if(post === null){
        return <div>Yükleniyor...</div>
    }

    if (post) return <div className="text-black text-2xl">{post.title}</div>
}