"use client";
import UserCard from "@/components/ui/user-card";
import { dataUser } from "@/mock/data-user";
import {
  IconUser,
  IconPlus,
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
        placeholder="Cari user"
        aria-label="Cari user"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />
      <div className="flex flex-col gap-4">
        {users.map((employee, index) => (
          <UserCard
            key={index}
            fullname={employee.name}
            email={employee.email}
            role={employee.address.street}
            status={employee.address.city}
          />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded shadow text-black">
          <IconPlus size={20} />
        </button>
      </div>

    </div>
  );
}
