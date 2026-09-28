"use client";
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
}