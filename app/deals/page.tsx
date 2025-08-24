"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Chip } from "@heroui/chip";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";

const generateDealInfo = (product: Product) => {
  const discountPercentages = [20, 25, 30, 35];
  const discount = discountPercentages[Math.floor(Math.random() * discountPercentages.length)];
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - discount / 100);
  
  return {
    discount,
    originalPrice,
    discountedPrice: Math.round(discountedPrice * 100) / 100
  };
};

export default function DealsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .then(() => setLoading(false));
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full h-fit items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Special Deals</h1>
        <p className="text-gray-600">Amazing discounts on selected products</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const dealInfo = generateDealInfo(product);
          return (
            <Card 
              key={product.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer h-full"
              isPressable
              onPress={() => router.push(`/products/${product.id}`)}
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
                              <Image
                alt={product.title}
                className="object-contain w-full h-48 bg-white"
                src={product.image}
              />
                              <Badge 
                color="danger" 
                content={`-${dealInfo.discount}%`}
                className="absolute top-2 right-2"
              />
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <h4 className="font-bold text-sm mb-2 line-clamp-2 h-10 overflow-hidden">{product.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-600">${dealInfo.discountedPrice}</span>
                  <span className="text-sm text-gray-400 line-through">${dealInfo.originalPrice}</span>
                </div>

                <Button 
                  color="primary" 
                  variant="solid" 
                  size="sm"
                  className="w-full"
                  onPress={() => router.push(`/products/${product.id}`)}
                >
                  Buy Now
                </Button>
              </CardBody>
            </Card>
          );
        })}
      </div>
      

    </div>
  );
}
