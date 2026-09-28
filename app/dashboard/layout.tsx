import { requireServerSession } from "@/lib/auth/session";
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
}