import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";

export interface UserSession {
  userId: string;
  organizationId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  email: string;
  name: string;
}

const COOKIE = "cd_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") throw new Error("AUTH_SECRET is not set");
  return "dev-only-secret-change-me";
}

const sign = (data: string) => createHmac("sha256", secret()).update(data).digest("base64url");

function encode(session: UserSession): string {
  const payload = Buffer.from(JSON.stringify({ ...session, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return payload + "." + sign(payload);
}

function decode(token: string): UserSession | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { exp, ...session } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return exp > Date.now() ? (session as UserSession) : null;
  } catch {
    return null;
  }
}

export async function createSession(session: UserSession) {
  (await cookies()).set(COOKIE, encode(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<UserSession | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  return token ? decode(token) : null;
}

export async function requireServerSession(): Promise<UserSession> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}
