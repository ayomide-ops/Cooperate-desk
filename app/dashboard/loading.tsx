import { Loader2 } from "lucide-react";

export default function DashboardLoadingState() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface gap-4">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <p className="text-ink-secondary text-sm animate-pulse">Loading module...</p>
    </div>
  );
}