"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import ProductCard from "@/components/productCard";

export default function PricingPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .then(() => setLoading(false));
    };

    getProducts();
  }, []);

  useEffect(() => {
    // ÜRÜNLER VAR MI?
    if (products) {
      products.map((product) => {
        // Kategori listesini set etmek için bir fonksiyon
        setCategories((prev) => {
          // eğer kategoriler listesinde product.category stringi yoksa çalışsın
          if (!prev.includes(product.category)) {
            return [...prev, product.category]; // yeni karşılaştığımız kategori stringi eklenilerek yeni liste set edildi
          }
          return [...prev]; // eğer if'e girilmezse liste aynen geri döndürülür
        });
      });
    }
  }, [products]);

  if (loading) {
    return (
      <div className="flex w-full h-fit items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!products) {
    return <div>Hiç ürün bulunamadı</div>;
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex space-x-2 justify-center">
        {categories.map((a, idx) => (
          <div
            key={idx}
            className="p-2 bg-gray-500 text-white rounded-full text-sm cursor-pointer hover:scale-105 transition-all duration-250 hover:bg-gray-200 hover:text-black"
          >
            {a}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
