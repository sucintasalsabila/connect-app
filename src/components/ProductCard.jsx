"use client";
import {
  IconTag,
  IconBuildingStore,
  IconCategory,
  IconCurrencyDollar,
  IconStar,
  IconShoppingCartPlus,
} from "@tabler/icons-react";

export default function ProductCard({
  fullname,
  email,
  role,
  status,
  image,
  onAddToCart,
}) {
  const [price, rating] = status.split("•").map((s) => s.trim());

  return (
    <div className="border rounded-lg p-2 flex items-center gap-4 bg-white shadow-sm relative">
      <img src={image} alt={fullname} className="w-20 h-20 object-cover rounded" />

      <div className="flex justify-between items-start w-full">
        <div>
          <h2 className="text-[18px] font-bold mb-[6px] flex items-center gap-1">
            <IconTag size={18} />
            {fullname}
          </h2>
          <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
            <IconBuildingStore size={16} />
            {email}
          </p>
          <div className="flex items-center gap-1 mb-1">
            <IconCategory size={16} />
            <span className="bg-black text-white text-[11px] px-[9px] py-[4px] rounded">
              {role}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between h-full gap-1 pr-1">
          <p className="text-green-600 font-semibold text-sm flex items-center gap-1">
            <IconCurrencyDollar size={16} />
            {price}
          </p>
          <p className="text-yellow-500 text-sm flex items-center gap-1">
            <IconStar size={16} />
            {rating}
          </p>
          <button
            onClick={() =>
              onAddToCart?.({ fullname, email, role, status, image, qty: 1 })
            }
            className="mt-2 bg-gray-400 hover:bg-gray-600 text-white p-[6px] rounded-full shadow-md"
            title="Tambah ke Troli"
          >
            <IconShoppingCartPlus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
