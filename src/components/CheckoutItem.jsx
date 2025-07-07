export default function CheckoutItem({ item, onRemove }) {
  return (
    <div className="border rounded p-4 flex items-center gap-4 bg-white shadow-sm">
      <img src={item.image} alt={item.fullname} className="w-20 h-20 rounded object-cover" />

      <div className="flex-1">
        <h3 className="font-semibold">{item.fullname}</h3>
        <p className="text-sm text-gray-500">{item.email}</p>
        <p className="text-sm">{item.role}</p>
        <p className="text-green-600 font-bold">{item.status.split("•")[0]}</p>
        <p className="text-yellow-500">{item.status.split("•")[1]}</p>
        <p className="text-sm">Jumlah: {item.qty}</p>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Hapus
      </button>
    </div>
  );
}




