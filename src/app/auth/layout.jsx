import { redirect } from "next/navigation";

export default function AuthLayout({ children }) {
  // This layout wraps /auth/* routes. If someone hits /auth directly, redirect.
  // Note: In Next.js App Router, a route at /auth/page could also do this, but layout keeps things tidy.
  return (
    <div className="min-h-screen bg-[#070b12] text-white">{children}</div>
  );
} 