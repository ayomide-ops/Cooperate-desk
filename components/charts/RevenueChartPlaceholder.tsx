import { BarChart3 } from "lucide-react";

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
}