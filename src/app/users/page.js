"use client";
import UserCard from "@/components/ui/user-card";
import {
  IconUser,
  IconUserCog,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";

export default function User_Page() {
  return (
    <div className="flex h-screen">
      <aside className="w-[200px] bg-white border-r border-gray-300 p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-center">Connect</h1>
        <nav className="flex flex-col gap-3 mt-6">
          <button
            type="button"
            aria-label="User Page"
            className="flex items-center gap-2 px-2 py-1 bg-black text-white rounded-md"
          >
            <IconUser size={20} />
            User
          </button>
          <button
            type="button"
            aria-label="Manage Access Rights"
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md"
          >
            <IconUserCog size={20} />
            Hak Akses
          </button>
          <button
            type="button"
            aria-label="Logout"
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md"
          >
            <IconLogout size={20} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-white relative">
        <div className="w-full px-6">
          <input
            type="text"
            placeholder="Cari user"
            aria-label="Cari user"
            className="w-full border border-gray-300 rounded-md p-2 mb-6"
          />
          <UserCard/>
           <UserCard/>
        </div>

        <button
          type="button"
          aria-label="Tambah User"
          className="absolute bottom-6 right-6 bg-gray-200 hover:bg-gray-300 p-2 w-10 h-10 flex items-center justify-center rounded"
        >
          <IconPlus size={20} />
        </button>
      </main>
    </div>
  );
}
