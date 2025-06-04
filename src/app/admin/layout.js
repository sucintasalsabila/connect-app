import { IconUser, IconUserCog, IconLogout } from "@tabler/icons-react";
export default function AdminLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <aside className="w-[200px] bg-white border-r border-gray-300 p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-center">Connect</h1>
        <nav className="flex flex-col gap-3 mt-6">
          <button
            type="button"
            aria-label="User Page"
            className="flex items-center gap-2 px-2 py-1 bg-black text-white rounded-md"
          >
            <IconUser size={20} />
            User{" "}
          </button>
          <button
            type="button"
            aria-label="Manage Access Rights"
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md"
          >
            <IconUserCog size={20} />
            Hak Akses{" "}
          </button>
          <button
            type="button"
            aria-label="Logout"
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-200 rounded-md"
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
