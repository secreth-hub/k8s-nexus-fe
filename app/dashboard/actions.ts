"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexus_token")?.value;

  if (token) {
    await apiFetch("/api/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }

  cookieStore.delete("nexus_token");
  redirect("/login");
}
