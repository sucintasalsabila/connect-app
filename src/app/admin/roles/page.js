"use client";
import UserCard from "@/components/ui/user-card";
import { dataUser } from "@/mock/data-user";
import {
  IconPlus,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import useSWR from "swr";

export default function User_Page() {
  const data = dataUser;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`https://jsonplaceholder.typicode.com/users`, fetcher);

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Gagal memuat data</p>
      </div>
    );
  }

  console.log(users);

  return (
    <div>
      <input
        type="text"
        placeholder="Cari Hak Akses"
        aria-label="Cari Hak Akses"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />
      <table className="w-full text-sm mb-6">
        <thead className="bg-white-100">
          <tr className="border-b">
            <th className="text-left px-4 py-2">No</th>
            <th className="text-left px-4 py-2">Hak Akses</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {[{ id: 1, role: "Employee" }, { id: 2, role: "Admin" }].map((item, index) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.role}</td>
              <td className="px-4 py-2 space-x-2 flex items-center">
                <button
                  className="text-black-600 hover:text-black-800"
                  onClick={() => alert(`Edit: ${item.role}`)}
                >
                  <IconPencil size={18} />
                </button>
                <button
                  className="text-black-600 hover:text-black-800"
                  onClick={() => alert(`Hapus: ${item.role}`)}
                >
                  <IconTrash size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="absolute bottom-6 right-6 bg-gray-200 hover:bg-gray-300 p-3 rounded shadow text-black">
        <IconPlus size={20} />
      </button>
    </div>
  );
}
