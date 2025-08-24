"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Badge } from "@heroui/badge";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";

const generateDealInfo = (product: Product) => {
  const discountPercentages = [15, 20, 25, 30];
  const discount = discountPercentages[Math.floor(Math.random() * discountPercentages.length)];
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - discount / 100);
  
  return {
    discount,
    originalPrice,
    discountedPrice: Math.round(discountedPrice * 100) / 100
  };
};

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => setProducts(data.slice(0, 8)))
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

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">TasoStore</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-300">
            Premium online shopping destination offering quality products across electronics, fashion, home, and lifestyle categories.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              color="primary" 
              variant="solid" 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onPress={() => router.push('/products')}
            >
              Browse Products
            </Button>
            <Button 
              color="default" 
              variant="bordered" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-slate-900"
              onPress={() => router.push('/deals')}
            >
              Special Offers
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">Featured Products</h2>
            <p className="text-gray-600">Curated selection of premium products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => {
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
                      Add to Cart
                    </Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              color="primary" 
              variant="bordered" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onPress={() => router.push('/products')}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-800">24/7 Support</h3>
              <p className="text-gray-600">Round the clock customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
