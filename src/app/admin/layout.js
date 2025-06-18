import Link from "next/link";

import {
  IconUser,
  IconUserCog,
  IconNews,
  IconLogout,
  IconMessage,
  IconMessage2,
  IconMessageCircle,
  IconBrandProducthunt,
  IconPackage,
} from "@tabler/icons-react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <aside className="w-[200px] bg-white border-r border-gray-300 p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-center">Connect</h1>
        <nav className="flex flex-col gap-3 mt-6">
          <Link href="/admin/users">
            <button
              type="button"
              aria-label="User Page"
              className="flex items-center gap-2 px-2 py-1 bg-black w-[150px] text-white rounded-md"
            >
              <IconUser size={20} />
              User{" "}
            </button>
          </Link>
          <Link href="/admin/roles">
            <button
              type="button"
              aria-label="Manage Access Rights"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 w-[150px] rounded-md"
            >
              <IconUserCog size={20} />
              Hak Akses{" "}
            </button>
          </Link>
          <Link href="/admin/news">
            <button
              type="button"
              aria-label="News"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 w-[150px] rounded-md"
            >
              <IconNews size={20} />
              Berita{" "}
            </button>
          </Link>
          <Link href="/admin/chat">
            <button
              type="button"
              aria-label="Chat Dokter"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 w-[150px] rounded-md"
            >
              <IconMessage size={20} />
              Chat Dokter
            </button>
          </Link>
          <Link href="/admin/comments">
            <button
              type="button"
              aria-label="Chat Dokter"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 w-[150px] rounded-md"
            >
              <IconMessageCircle size={20} />
              Comments
            </button>
          </Link>
          <Link href="/admin/product">
            <button
              type="button"
              aria-label="Chat Dokter"
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 w-[150px] rounded-md"
            >
              <IconPackage size={20} />
              Product
            </button>
          </Link>
          <button
            type="button"
            aria-label="Logout"
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 w-[150px] rounded-md"
          >
            <IconLogout size={20} />
            Logout{" "}
          </button>
        </nav>
      </aside>
      <section id="content" className=" w-[100%] p-5">
        {children}
      </section>
    </div>
  );
}
