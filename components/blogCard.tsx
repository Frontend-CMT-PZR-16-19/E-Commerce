"use client"

import { Post } from "@/types/sanityTypes";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";

export const BlogCard = ({post}: {post: Post}) => {
    console.log("date time:", post.publishedAt)
    return (
        <Card as={Link} href={`/blog/${post.slug}`} className="h-fit py-4 px-2">
            {post.imageUrl && <CardHeader>
                <div className="relative h-[400] w-[400]"><Image src={post.imageUrl} alt={post.title} fill className="object-cover rounded-md" /></div>
            </CardHeader>}
            <CardBody>
                <h1 className="font-semibold text-gray-700 dark:text-gray-200 uppercase">{post.title}</h1>
            </CardBody>
            <CardFooter className="text-tiny font-normal text-gray-600 dark:text-gray-400 justify-between">
                <h4>{post.author.name}</h4>
                <h4>{new Date(post.publishedAt).toLocaleDateString("tr-TR")}</h4>
            </CardFooter>
        </Card>
    )
}