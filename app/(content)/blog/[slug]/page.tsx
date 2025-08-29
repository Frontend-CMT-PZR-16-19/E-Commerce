"use client";

import { Post } from "@/types/sanityTypes";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Image } from "@heroui/image";
import { User } from "@heroui/user";
import { Button } from "@heroui/button";
import Link from "next/link";
const ArrowLeft = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {

        const response = await fetch("/api/post");
        const data = await response.json();
        const foundPost = data.data.find((p: Post) => p.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error("Blog yazısı yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-lg">Blog yazısı yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog yazısı bulunamadı</h1>
          <Link href="/blog">
            <Button color="primary">Blog sayfasına dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

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


      <article>

        <h1 className="text-4xl font-bold mb-6 text-center">{post.title}</h1>


        <div className="flex justify-center mb-6">
          <Link href={`/author/${post.author.slug}`}>
            <User
              name={post.author.name}
              description="Yazar"
              avatarProps={{
                src: post.author.imageUrl,
                size: "lg"
              }}
              className="hover:text-primary transition-colors cursor-pointer"
            />
          </Link>
        </div>


        <div className="mb-8">
          <Image
            alt={post.title}
            src={post.imageUrl}
            width="100%"
            height={400}
            className="object-cover rounded-xl w-full"
          />
        </div>


        {post.categories && post.categories.length > 0 && (
          <div className="flex justify-center gap-2 mb-8">
            {post.categories.map((category, index) => (
              <span 
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}


        <div className="prose prose-lg max-w-none">
          {post.body && Array.isArray(post.body) ? (
            post.body.map((block: any, index: number) => {
              if (block._type === 'block') {
                const text = block.children?.map((child: any) => child.text).join('') || '';
                
                if (block.style === 'h2') {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{text}</h2>;
                } else if (block.style === 'h3') {
                  return <h3 key={index} className="text-xl font-semibold mt-6 mb-3">{text}</h3>;
                } else {
                  return (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {block.children?.map((child: any, childIndex: number) => {
                        let content = child.text;
                        if (child.marks?.includes('strong')) {
                          content = <strong key={childIndex}>{content}</strong>;
                        }
                        if (child.marks?.includes('em')) {
                          content = <em key={childIndex}>{content}</em>;
                        }
                        return content;
                      })}
                    </p>
                  );
                }
              }
              return null;
            })
          ) : (
            <p className="text-gray-700">İçerik yükleniyor...</p>
          )}
        </div>
      </article>


      <div className="mt-12 pt-8 border-t">
        <h3 className="text-xl font-semibold mb-4">Yazar Hakkında</h3>
        <Link href={`/author/${post.author.slug}`}>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <Image
              src={post.author.imageUrl}
              alt={post.author.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h4 className="font-semibold text-lg">{post.author.name}</h4>
              <p className="text-gray-600">Yazar profili için tıklayın</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
