import { UserSession } from "@/lib/auth/session";
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
}