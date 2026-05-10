"use client";

import Link from "next/link";
import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: FiHome },
  { name: "Projects", href: "/dashboard/projects", icon: FiFolder },
  { name: "Tasks", href: "/dashboard/tasks", icon: FiCheckSquare },
  { name: "Analytics", href: "/dashboard/analytics", icon: FiBarChart2 },
  { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-5">
      <h1 className="text-2xl font-bold text-white mb-10">
        ProjectManager
      </h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all"
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}