import { Product } from "@/types";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { useAppDispatch } from "@/store/hooks";
import { addProductToCart, removeProductFromCart } from "@/store/cartSlice";

interface CartProductProps {
  product: Product;
  quantity: number;
}

export const CartProduct = ({ product, quantity }: CartProductProps) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(addProductToCart({ product, piece: 1 }));
  };

  const handleDecrement = () => {
    dispatch(removeProductFromCart(product));
  };

  return (
    <Card className="flex flex-row p-4 items-center gap-4 w-full">
      {/* Ürün Resmi */}
      <div className="flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          className="w-16 h-16 object-contain rounded-lg"
        />
      </div>

      {/* Ürün Başlığı ve Detayları */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-foreground truncate">
          {product.title}
        </h3>
        <p className="text-xs text-default-500 mt-1">${product.price}</p>
        <div className="text-xs text-default-400 mt-1 line-clamp-2">
          {product.description}
        </div>
      </div>

      {/* Miktar Kontrolü */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          isIconOnly
          size="sm"
          variant="bordered"
          className="w-8 h-8 min-w-8"
          onPress={handleDecrement}
        >
          -
        </Button>

        <span className="text-sm font-medium min-w-[20px] text-center">
          {quantity}
        </span>

        <Button
          isIconOnly
          size="sm"
          variant="bordered"
          className="w-8 h-8 min-w-8"
          onPress={handleIncrement}
        >
          +
        </Button>
      </div>
    </Card>
  );
};
