"use client";

import UserCard from "@/components/ui/user-card";
import { IconPlus, IconMassage } from "@tabler/icons-react";
import useSWR from "swr";

export default function User_Page() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const {
    data: commentsData,
    error,
    isLoading,
  } = useSWR("https://dummyjson.com/comments", fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Gagal memuat data</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Cari komentar"
        aria-label="Cari komentar"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />

      <div className="flex flex-col gap-4">
        {commentsData.comments.map((comment) => (
          <UserCard
            key={comment.id}
            fullname={comment.user.username}
            email={`postId: ${comment.postId}`}
            role="Komentar"
            status={comment.body}
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
