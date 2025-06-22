"use client";
import UserCard from "@/components/ui/user-card";
import { dataUser } from "@/mock/data-user";
import {
IconNews
} from "@tabler/icons-react";
import useSWR from "swr";

export default function news_page() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`https://jsonplaceholder.typicode.com/posts`, fetcher);

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
        placeholder="Cari Berita"
        aria-label="Cari Berita"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />
      <div className="flex flex-col gap-4">
        {users.map((employee, index) => (
          <UserCard
            key={index}
            fullname={employee.title}
            email={employee.body}
            role={employee.UserID}
            status={employee.id}
          />
        ))}
      </div>
    </div>
  );
}
