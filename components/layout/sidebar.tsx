"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/documents", label: "Documents" },
  { href: "/dashboard/rules", label: "Rules" },
  { href: "/dashboard/packet", label: "Packet" },
  { href: "/dashboard/voice", label: "Voice" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-teal-950 p-5 min-h-screen sticky top-0">
      <div className="font-display text-white text-lg mb-8">DoorReady</div>
      <nav className="space-y-1 text-sm">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg transition ${
                active ? "bg-teal-700 text-white font-medium" : "text-teal-200/80 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8">
        <span className="font-mono text-[10px] uppercase tracking-wider text-teal-200/60">
          Readiness assistance only
        </span>
      </div>
    </aside>
  );
}
