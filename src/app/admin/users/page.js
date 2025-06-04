"use client";
import UserCard from "@/components/ui/user-card";
import { dataUser } from "@/mock/data-user";
import {
  IconUser,
  IconUserCog,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";

export default function User_Page() {
  const data = dataUser;

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Cari user"
        aria-label="Cari user"
        className="w-full border border-gray-300 rounded-md p-2 mb-6"
      />
      {data.map((employee, index) => (
        <UserCard
          key={index}
          fullname={employee.fullname}
          email={"2313086@students.universitasmulia.ac.id"}
          role={"Admin"}
          status={"Aktif"}
        />
      ))}
    </div>
  );
}
