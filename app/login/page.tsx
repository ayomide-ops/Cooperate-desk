import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in | Cooperate Desk" };

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 font-sans text-ink">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-primary">Cooperate Desk</h1>
        <p className="mb-6 mt-1 text-sm text-ink-secondary">Sign in to your workspace.</p>
        <LoginForm />
      </div>
    </main>
  );
}
