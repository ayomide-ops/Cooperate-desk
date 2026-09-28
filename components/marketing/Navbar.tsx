import Link from "next/link";
import { getSession } from "@/lib/auth/session";

export async function Navbar() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">Cooperate Desk</Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-secondary md:flex">
          <a href="#features" className="hover:text-ink">Features</a>
          <a href="#pricing" className="hover:text-ink">Pricing</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <Link href="/dashboard" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="px-3 py-2 text-sm font-medium text-ink hover:text-primary">Log in</Link>
              <Link href="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
