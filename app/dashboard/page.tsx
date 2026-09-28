import { requireServerSession } from "@/lib/auth/session";
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
}