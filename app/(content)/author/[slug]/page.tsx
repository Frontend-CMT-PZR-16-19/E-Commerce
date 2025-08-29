"use client";

import { Post } from "@/types/sanityTypes";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import Link from "next/link";
const ArrowLeft = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);
import BlogCard from "@/components/blogCard";

export default function AuthorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [author, setAuthor] = useState<any>(null);
  const [authorPosts, setAuthorPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuthorData = async () => {
      try {

        const response = await fetch("/api/post");
        const data = await response.json();
        const posts = data.data;
        

        const authorPosts = posts.filter((post: Post) => post.author.slug === slug);
        
        if (authorPosts.length > 0) {
          setAuthor(authorPosts[0].author);
          setAuthorPosts(authorPosts);
        }
      } catch (error) {
        console.error("Yazar bilgileri yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getAuthorData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-lg">Yazar bilgileri yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Yazar bulunamadı</h1>
          <Link href="/blog">
            <Button color="primary">Blog sayfasına dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">

      <div className="mb-6">
        <Link href="/blog">
          <Button 
            variant="light" 
            startContent={<ArrowLeft size={16} />}
            className="text-gray-600 hover:text-gray-800"
          >
            Blog'a geri dön
          </Button>
        </Link>
      </div>


      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          <div className="flex-shrink-0">
            <Image
              src={author.imageUrl}
              alt={author.name}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
            

            <div className="text-gray-600 mb-4">
              {author.bio && Array.isArray(author.bio) ? (
                author.bio.map((block: any, index: number) => {
                  if (block._type === 'block') {
                    const text = block.children?.map((child: any) => child.text).join('') || '';
                    return (
                      <p key={index} className="mb-2">
                        {block.children?.map((child: any, childIndex: number) => {
                          let content = child.text;
                          if (child.marks?.includes('strong')) {
                            content = <strong key={childIndex}>{content}</strong>;
                          }
                          if (child.marks?.includes('underline')) {
                            content = <u key={childIndex}>{content}</u>;
                          }
                          return content;
                        })}
                      </p>
                    );
                  }
                  return null;
                })
              ) : (
                <p>Yazar hakkında bilgi mevcut değil.</p>
              )}
            </div>
            

            <div className="flex justify-center md:justify-start gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{authorPosts.length}</div>
                <div className="text-sm text-gray-500">Blog Yazısı</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-8" />


      <div>
        <h2 className="text-2xl font-bold mb-6">
          {author.name} tarafından yazılan blog yazıları
        </h2>
        
        {authorPosts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Bu yazar henüz blog yazısı yayınlamamış.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorPosts.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
