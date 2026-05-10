"use client";

import { FiBell, FiLogOut, FiSearch } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-20 border-b border-zinc-800 bg-zinc-950 px-8 flex items-center justify-between">
      
      <div className="flex items-center bg-zinc-900 rounded-xl px-4 py-2 w-80 border border-zinc-800">
        <FiSearch className="text-zinc-400" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-3 text-white w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        
        <button className="relative">
          <FiBell className="text-zinc-300" size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-500" />
        </button>

        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="text-white font-medium">
              {user?.name}
            </p>

            <p className="text-zinc-400 text-sm">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all border border-zinc-800"
        >
          <FiLogOut className="text-red-400" size={18} />
        </button>
      </div>
    </header>
  );
}