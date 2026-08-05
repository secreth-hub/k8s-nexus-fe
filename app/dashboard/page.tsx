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

  return (
    <main style={{ maxWidth: 480, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
