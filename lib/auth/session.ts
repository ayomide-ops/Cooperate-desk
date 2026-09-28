import { redirect } from "next/navigation";

export interface UserSession {
  userId: string;
  organizationId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  email: string;
  name: string;
}

export async function requireServerSession(): Promise<UserSession> {
  const session = {
    userId: "usr_123",
    organizationId: "org_abc",
    role: "ADMIN" as const,
    email: "admin@flowdesk.example.com",
    name: "System Admin",
  };

  if (!session || !session.organizationId) {
    redirect("/login");
  }

  return session;
}