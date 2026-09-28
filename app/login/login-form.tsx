"use client";
import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Email
        <input name="email" type="email" required autoComplete="email"
          className="rounded-md border border-gray-300 px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary-tint" />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-ink">
        Password
        <input name="password" type="password" required autoComplete="current-password"
          className="rounded-md border border-gray-300 px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary-tint" />
      </label>
      {state.error && <p role="alert" className="text-sm text-semantic-danger">{state.error}</p>}
      <button type="submit" disabled={pending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-60">
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
