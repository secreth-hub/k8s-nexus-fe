import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { logout } from "./actions";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexus_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const res = await apiFetch("/api/user", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    redirect("/login");
  }

  const user = await res.json();
  const initial = user.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white/80 p-8 text-center shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-xl font-semibold text-white dark:bg-white dark:text-neutral-900">
          {initial}
        </div>

        <h1 className="mt-4 text-xl font-semibold tracking-tight">Welcome, {user.name}</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>

        <form action={logout} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            Log out
          </button>
        </form>
      </div>
    </main>
  );
}
