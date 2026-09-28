import { createHash, timingSafeEqual } from "crypto";
import type { UserSession } from "./session";

// TEMPORARY: one demo user from environment variables.
// Your teammate replaces verifyCredentials() with a real database lookup + hashed passwords.
const hash = (v: string) => createHash("sha256").update(v).digest();

export async function verifyCredentials(email: string, password: string): Promise<UserSession | null> {
  const isDev = process.env.NODE_ENV !== "production";
  const validEmail = process.env.AUTH_EMAIL ?? (isDev ? "admin@cooperate-desk.com" : "");
  const validPassword = process.env.AUTH_PASSWORD ?? (isDev ? "admin123" : "");
  if (!validEmail || !validPassword) return null;

  const emailOk = timingSafeEqual(hash(email.trim().toLowerCase()), hash(validEmail.toLowerCase()));
  const passOk = timingSafeEqual(hash(password), hash(validPassword));
  if (!emailOk || !passOk) return null;

  return { userId: "usr_123", organizationId: "org_abc", role: "ADMIN", email: validEmail, name: "System Admin" };
}
