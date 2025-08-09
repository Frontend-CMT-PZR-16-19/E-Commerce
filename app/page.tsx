"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/spinner";
import ProductCard from "@/components/productCard";

export default function Home() {
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

  if (products) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
            rating={{
              rate: product.rating.rate,
              count: product.rating.count,
            }}
          />
        ))}
      </div>
    );
  }

  return <div>Ürün Bulunamadı</div>;
}
