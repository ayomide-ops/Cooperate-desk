const fs = require("fs");
const path = require("path");

const files = {
  "tailwind.config.ts": `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#4B31BD", hover: "#33217F", tint: "#EFEBFB" },
        ink: { DEFAULT: "#1A1B23", secondary: "#5B6472" },
        surface: "#F7F6FC",
        semantic: { success: "#1F9D66", warning: "#C9820A", danger: "#D64545" },
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;`,

  "lib/auth/session.ts": `import { redirect } from "next/navigation";

export interface UserSession {
  userId: string;
  organizationId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  email: string;
  name: string;
}

export async function requireServerSession(): Promise<UserSession> {
  const session = {
    userId: "usr_123",
    organizationId: "org_abc",
    role: "ADMIN" as const,
    email: "admin@flowdesk.example.com",
    name: "System Admin",
  };

  if (!session || !session.organizationId) {
    redirect("/login");
  }

  return session;
}`,

  "components/navigation/Sidebar.tsx": `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, Users2, FileText, Settings, Workflow, BarChart3 } from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Teams", href: "/teams", icon: Users2 },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Workflows", href: "/workflows", icon: Workflow },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-primary font-bold text-xl tracking-tight">FlowDesk</span>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={\`flex items-center gap-3 px-3 py-2 rounded-md transition-colors \${isActive ? "bg-primary-tint text-primary font-medium" : "text-ink-secondary hover:bg-gray-50 hover:text-ink"}\`}
            >
              <item.icon className={\`w-5 h-5 \${isActive ? "text-primary" : "text-ink-secondary"}\`} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}`,

  "components/navigation/Header.tsx": `import { UserSession } from "@/lib/auth/session";
import { Bell } from "lucide-react";

export function Header({ session }: { session: UserSession }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-ink-secondary">Organization ID:</span>
        <span className="text-sm font-semibold text-ink px-2 py-1 bg-surface rounded">{session.organizationId}</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-ink-secondary hover:text-primary transition-colors"><Bell className="w-5 h-5" /></button>
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-ink leading-tight">{session.name}</span>
            <span className="text-xs text-ink-secondary leading-tight">{session.role}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary-tint text-primary flex items-center justify-center font-bold text-sm">
            {session.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}`,

  "components/ui/MetricCard.tsx": `import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean; };
  icon: LucideIcon;
}

export function MetricCard({ title, value, trend, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-ink-secondary">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-primary-tint flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-ink">{value}</span>
        {trend && (
          <div className={\`flex items-center text-sm font-medium \${trend.isPositive ? "text-semantic-success" : "text-semantic-danger"}\`}>
            {trend.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}`,

  "components/charts/RevenueChartPlaceholder.tsx": `import { BarChart3 } from "lucide-react";

export function RevenueChartPlaceholder() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-96">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-ink">Revenue Overview</h3>
        <p className="text-sm text-ink-secondary">Monthly recurring revenue (MRR) for the current year.</p>
      </div>
      <div className="flex-1 bg-surface rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-ink-secondary">
        <BarChart3 className="w-10 h-10 text-primary opacity-50 mb-3" />
        <p className="font-medium">Chart Module Not Initialized</p>
      </div>
    </div>
  );
}`,

  "app/dashboard/layout.tsx": `import { requireServerSession } from "@/lib/auth/session";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Header } from "@/components/navigation/Header";

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const session = await requireServerSession();
  return (
    <div className="flex h-screen w-full bg-surface text-ink font-sans overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header session={session} />
        <main className="flex-1 overflow-y-auto p-8 relative">{children}</main>
      </div>
    </div>
  );
}`,

  "app/dashboard/loading.tsx": `import { Loader2 } from "lucide-react";

export default function DashboardLoadingState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface gap-4">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <p className="text-ink-secondary text-sm animate-pulse">Loading module...</p>
    </div>
  );
}`,

  "app/dashboard/error.tsx": `"use client";
import { AlertOctagon } from "lucide-react";
import { useEffect } from "react";

export default function DashboardErrorState({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => { console.error("Dashboard Module Error:", error.message); }, [error]);
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-lg border border-red-100 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <AlertOctagon className="w-6 h-6 text-semantic-danger" />
      </div>
      <h2 className="text-lg font-semibold text-ink mb-2">Module Loading Failed</h2>
      <button onClick={() => reset()} className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium mt-4">Reload View</button>
    </div>
  );
}`,

  "app/dashboard/page.tsx": `import { requireServerSession } from "@/lib/auth/session";
import { MetricCard } from "@/components/ui/MetricCard";
import { RevenueChartPlaceholder } from "@/components/charts/RevenueChartPlaceholder";
import { DollarSign, Briefcase, FileText, Users, Activity } from "lucide-react";

async function getDashboardSummary(organizationId: string) {
  return {
    totalRevenue: "$125,430.00", activeProjects: 12, pendingInvoices: 5, activeMembers: 8,
    revenueTrend: { value: 14.5, isPositive: true }, projectsTrend: { value: 2.4, isPositive: true }, invoicesTrend: { value: 5.1, isPositive: false },
    recentActivity: [],
  };
}

export default async function DashboardPage() {
  const session = await requireServerSession();
  const data = await getDashboardSummary(session.organizationId);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-ink">Overview</h1>
        <p className="text-ink-secondary mt-1">Welcome back, {session.name}.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value={data.totalRevenue} trend={data.revenueTrend} icon={DollarSign} />
        <MetricCard title="Active Projects" value={data.activeProjects} trend={data.projectsTrend} icon={Briefcase} />
        <MetricCard title="Pending Invoices" value={data.pendingInvoices} trend={data.invoicesTrend} icon={FileText} />
        <MetricCard title="Team Members" value={data.activeMembers} icon={Users} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><RevenueChartPlaceholder /></div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-96">
          <h3 className="text-lg font-semibold text-ink mb-6">Recent Activity</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-3">
              <Activity className="w-6 h-6 text-ink-secondary" />
            </div>
            <h4 className="text-sm font-medium text-ink">No recent activity</h4>
          </div>
        </div>
      </div>
    </div>
  );
}`,
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("✅ Created: " + filePath);
});

console.log("\n🎉 All files created successfully in the correct folders!");
