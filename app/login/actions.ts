"use server";
import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth/users";
import { createSession, destroySession } from "@/lib/auth/session";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const session = await verifyCredentials(email, password);
  if (!session) return { error: "Incorrect email or password." };

  await createSession(session);
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
