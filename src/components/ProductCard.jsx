import {
  IconTag,
  IconBuildingStore,
  IconCategory,
  IconCurrencyDollar,
  IconStar,
  IconShoppingCartPlus,
} from "@tabler/icons-react";

export default function ProductCard({ fullname, email, role, status, image, onAddToCart }) {
  return (
    <div className="border rounded-lg p-2 flex items-center gap-4 bg-white shadow-sm relative">
      {/* Gambar Produk */}
      <img
        src={image}
        alt={fullname}
        className="w-20 h-20 object-cover rounded"
      />

      {/* Info Produk */}
      <div className="flex justify-between items-center w-full">
        <div>
          {/* Nama Produk */}
          <h2 className="text-[18px] font-bold mb-[6px] flex items-center gap-1">
            <IconTag size={18} />
            {fullname}
          </h2>

          {/* Brand */}
          <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
            <IconBuildingStore size={16} />
            {email}
          </p>

          {/* Kategori */}
          <div className="flex items-center gap-1 mb-1">
            <IconCategory size={16} />
            <span className="bg-black text-white text-[11px] px-[9px] py-[4px] rounded">
              {role}
            </span>
          </div>
        </div>

        {/* Harga + Rating */}
        <div className="text-right space-y-1">
          <p className="text-green-600 font-semibold text-sm flex items-center gap-1 justify-end">
            <IconCurrencyDollar size={16} />
            {status.split("•")[0].trim()} {/* Harga */}
          </p>
          <p className="text-yellow-500 text-sm flex items-center gap-1 justify-end">
            <IconStar size={16} />
            {status.split("•")[1]?.trim()} {/* Rating */}
          </p>
        </div>
      </div>

      {/* Tombol Tambah ke Troli */}
      <button
        onClick={() => onAddToCart?.({ fullname, email, role, status, image })}
        className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-[6px] rounded-full shadow-md"
        title="Tambah ke Troli"
      >
        <IconShoppingCartPlus size={16} />
      </button>
    </div>
  );
}
