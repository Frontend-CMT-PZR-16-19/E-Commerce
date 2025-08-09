import { Product } from "@/types";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";

export default function ProductCard(product: Product) {
  return (
    <Card className="py-4 w-[400px] max-h-[500px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{product.title}</p>
        <small className="text-default-500">{product.rating.rate}</small>
        <h4 className="font-bold text-large">{product.price}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl w-fit"
          src={product.image}
          width={270}
          height={200}
        />
      </CardBody>
    </Card>
  );
}
