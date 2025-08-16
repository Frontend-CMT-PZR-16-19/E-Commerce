"use client";

import { CartProduct } from "@/components/cartProduct";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useEffect, useState } from "react";

interface CartProductState {
  product: Product;
  quantity: number;
}

export default function Cart() {
  const cart = useCartStore((state) => state.productList);
  const [state, setState] = useState<CartProductState[]>([]);

  let totalPrice = cart.reduce(function (acc, curr) {
    return acc + curr.price;
  }, 0);

  useEffect(() => {
    // Ürünleri ID'ye göre grupla ve sayılarını hesapla
    const productMap = new Map<number, CartProductState>();

    cart.forEach((product) => {
      if (productMap.has(product.id)) {
        const existing = productMap.get(product.id)!;
        productMap.set(product.id, {
          ...existing,
          quantity: existing.quantity + 1,
        });
      } else {
        productMap.set(product.id, {
          product,
          quantity: 1,
        });
      }
    });

    setState(Array.from(productMap.values()));
  }, [cart]);

  return (
    <div className="flex w-full justify-between p-6">
      <div className="w-[75%] space-y-4">
        {state.map((item, index) => (
          <CartProduct
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
      <Card className="w-[24%] p-4 h-fit ">
        <h3 className="text-xl">Total price: {totalPrice.toFixed(2)}$</h3>
        <Button color="primary">Complete Order</Button>
      </Card>
    </div>
  );
}
