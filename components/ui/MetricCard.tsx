import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

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
          <div className={`flex items-center text-sm font-medium ${trend.isPositive ? "text-semantic-success" : "text-semantic-danger"}`}>
            {trend.isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}