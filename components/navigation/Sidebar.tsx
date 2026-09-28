"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, Users2, FileText, Workflow, BarChart3 } from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Teams", href: "/dashboard/teams", icon: Users2 },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { name: "Workflows", href: "/dashboard/workflows", icon: Workflow },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-primary font-bold text-xl tracking-tight">Cooperate Desk</span>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? "bg-primary-tint text-primary font-medium" : "text-ink-secondary hover:bg-gray-50 hover:text-ink"}`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-ink-secondary"}`} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}