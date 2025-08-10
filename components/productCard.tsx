import { Product } from "@/types";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="py-4 aspect-[3/4]">
        <CardBody className="overflow-hidden py-2">
          <Image
            alt="Card background"
            className="object-contain rounded-xl self-center"
            src={product.image}
          />
        </CardBody>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold line-clamp-1">
            {product.title}
          </p>
          <small className="text-default-500">{product.category}</small>
          <h4 className="font-bold text-large">{product.price}$</h4>
        </CardHeader>
      </Card>
    </Link>
  );
}
