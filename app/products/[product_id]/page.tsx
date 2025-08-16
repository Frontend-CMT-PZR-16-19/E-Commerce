"use client";
import { Spinner } from "@heroui/spinner";
import { Product } from "@/types";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NumberInput } from "@heroui/number-input";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const { product_id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const addToCart = useCartStore((state) => state.addProductToCart);
  const router = useRouter();
  // Rating component
  const RatingStars = ({ rate, count }: { rate: number; count: number }) => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {/* Full stars */}
          {Array.from({ length: fullStars }).map((_, i) => (
            <svg
              key={`full-${i}`}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          {/* Half star */}
          {hasHalfStar && (
            <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half)"
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          )}
          {/* Empty stars */}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <svg
              key={`empty-${i}`}
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {rate} ({count} değerlendirme)
        </span>
      </div>
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      fetch(`https://fakestoreapi.com/products/${product_id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
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

  if (!product) {
    return <div>Bu ürün bulunamadı</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-6xl mx-auto">
        <CardBody className="p-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex justify-center items-center bg-white rounded-lg p-4">
              <Image
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
                width={400}
                height={400}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {/* Category */}
              <div>
                <Chip variant="flat" color="primary" className="capitalize">
                  {product.category}
                </Chip>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>

              {/* Rating */}
              <RatingStars
                rate={product.rating.rate}
                count={product.rating.count}
              />

              {/* Price */}
              <div className="text-3xl font-bold text-green-600">
                ${product.price * quantity}
              </div>

              {/* Description */}
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <h3 className="text-lg font-semibold mb-2">Açıklama</h3>
                <p>{product.description}</p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Adet:</label>
                  <NumberInput
                    className="w-24"
                    value={quantity}
                    onValueChange={(value) => setQuantity(value as number)}
                    variant="bordered"
                    minValue={1}
                    maxValue={99}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    color="primary"
                    size="lg"
                    className="flex-1"
                    onPress={() => addToCart(product, quantity)}
                  >
                    Sepete Ekle
                  </Button>

                  <Button
                    color="secondary"
                    variant="bordered"
                    size="lg"
                    onPress={() => {
                      addToCart(product, quantity);
                      router.push("/cart");
                    }}
                  >
                    Hemen Al
                  </Button>
                </div>
              </div>

              {/* Additional Product Info */}
              <div className="border-t pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ürün ID:</span>
                  <span className="font-medium">#{product.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kategori:</span>
                  <span className="font-medium capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stok Durumu:</span>
                  <span className="font-medium text-green-600">Stokta Var</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
