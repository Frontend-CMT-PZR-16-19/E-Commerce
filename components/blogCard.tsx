"use client";

import { Post } from "@/types/sanityTypes";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { User } from "@heroui/user";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="max-w-[400px] hover:shadow-lg transition-shadow">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Image
            alt={post.title}
            className="object-cover rounded-xl w-full h-[200px]"
            src={post.imageUrl}
            width={400}
            height={200}
          />
        </Link>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Link href={`/blog/${post.slug}`}>
          <h4 className="font-bold text-large hover:text-primary transition-colors">
            {post.title}
          </h4>
        </Link>
        <div className="mt-3">
          <Link href={`/author/${post.author.slug}`}>
            <User
              name={post.author.name}
              description="Yazar"
              avatarProps={{
                src: post.author.imageUrl,
                size: "sm"
              }}
              className="hover:text-primary transition-colors cursor-pointer"
            />
          </Link>
        </div>
        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-1 mt-2">
            {post.categories.map((category, index) => (
              <span 
                key={index}
                className="text-tiny bg-gray-100 px-2 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
