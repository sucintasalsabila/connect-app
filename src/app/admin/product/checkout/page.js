"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import CheckoutItem from "@/components/CheckoutItem";
import {
  IconShoppingCart,
  IconCurrencyDollar,
  IconCheck,
  IconArrowLeft,
} from "@tabler/icons-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setSuccessMessage("Troli masih kosong.");
      return;  
    }

    setSuccessMessage("Pembayaran Berhasil!");
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const total = cartItems.reduce((acc, item) => {
    const priceStr = item.status.split("Rp")[1]?.split(" ")[0]?.replace(/\./g, "").trim() || "0";
    const price = parseInt(priceStr) || 0;
    return acc + price * (item.qty || 1);
  }, 0);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl p-6 bg-white rounded shadow border">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <IconShoppingCart size={24} /> Checkout
        </h2>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center gap-2">
            <IconCheck size={18} /> {successMessage}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {cartItems.map((item, index) => (
            <CheckoutItem
              key={`${item.id}-${index}`}
              item={item}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 font-bold text-lg">
          <span className="flex items-center gap-1">
            <IconCurrencyDollar size={20} />
            Total:
          </span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>

        <button
          className="w-full mt-4 bg-green-600 text-white py-3 rounded hover:bg-green-700 flex items-center justify-center gap-2"
          onClick={handleCheckout}
        >
          <IconCheck size={18} />
          Bayar Sekarang
        </button>

        <button
          className="w-full mt-3 bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300 flex items-center justify-center gap-2"
          onClick={() => router.push("/admin/product")}
        >
          <IconArrowLeft size={18} />
          Kembali ke Halaman Produk
        </button>
      </div>
    </div>
  );
}
