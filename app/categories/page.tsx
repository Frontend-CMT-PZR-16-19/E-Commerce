"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Latest gadgets and electronic devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    productCount: 156,
    href: "/products?category=electronics"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Trendy clothing and accessories",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    productCount: 234,
    href: "/products?category=fashion"
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Everything for your home and garden",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    productCount: 189,
    href: "/products?category=home"
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    description: "Equipment and gear for active lifestyle",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    productCount: 98,
    href: "/products?category=sports"
  },
  {
    id: 5,
    name: "Books & Media",
    description: "Books, movies, and digital content",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    productCount: 312,
    href: "/products?category=books"
  },
  {
    id: 6,
    name: "Health & Beauty",
    description: "Personal care and wellness products",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
    productCount: 145,
    href: "/products?category=health"
  }
];

export default function CategoriesPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-gray-600 text-lg">Discover products organized by category</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            isPressable
            onPress={() => router.push(category.href)}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <Image
                alt={category.name}
                className="object-cover w-full h-48"
                src={category.image}
              />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <h4 className="font-bold text-large mb-2">{category.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{category.productCount} products</span>
                <Button 
                  color="primary" 
                  variant="flat" 
                  size="sm"
                  onPress={() => router.push(category.href)}
                >
                  Browse
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
