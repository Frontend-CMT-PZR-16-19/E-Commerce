'use client';
import { useCart } from './context/cartContext';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Chip } from '@heroui/chip';
import { FaDivide } from 'react-icons/fa6';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  // Sepeti temizle fonksiyonu
  const clearCart = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-white py-12 px-2">
      <Card className="w-full max-w-3xl shadow-2xl border border-primary/20">
        <CardHeader className="flex flex-col items-center gap-2 bg-primary/10 rounded-t-lg">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight">Sepetim</h1>
          <Chip color="success" variant="flat" className="text-lg">{cartItems.length} ürün</Chip>
        </CardHeader>
        <CardBody className="bg-white rounded-b-lg">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <img src="/vercel.svg" alt="Boş Sepet" className="w-24 h-24 mb-4 opacity-60 animate-bounce" />
              <p className="text-xl text-gray-500 mb-4 font-semibold">Sepetiniz şu anda boş.</p>
              <Button as="a" href="/products" color="primary" size="lg" radius="full" className="shadow-lg">Alışverişe Başla</Button>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-primary/20">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <img src={item.image || "/vercel.svg"} alt={item.name} className="w-12 h-12 object-contain" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-primary-dark">{item.name}</div>
                        <div className="text-sm text-gray-500">Adet: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-green-600 text-lg">{item.price} TL</span>
                      <span className="text-xs text-gray-400">Toplam: {item.price * item.quantity} TL</span>
                      <Button color="danger" size="sm" variant="light" className="mt-2" onClick={() => removeFromCart(item.id)}>
                        Kaldır
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <FaDivide className="my-8" />
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-3xl font-extrabold text-primary-dark">Genel Toplam: <span className="text-green-600">{total} TL</span></div>
                <div className="flex gap-3">
                  <Button color="default" variant="bordered" size="lg" radius="full" onClick={clearCart}>Sepeti Temizle</Button>
                  <Button as="a" href="/products" color="primary" size="lg" radius="full">Alışverişe Devam Et</Button>
                  <Button color="success" size="lg" radius="full" className="font-bold shadow-lg">Satın Al</Button>
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
