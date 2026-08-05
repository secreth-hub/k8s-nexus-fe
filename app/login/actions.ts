"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";

export async function login(formData: FormData) {
  const res = await apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.message ?? "Invalid credentials";
    redirect(`/login?error=${encodeURIComponent(message)}`);
  }

  const { token } = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("nexus_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/dashboard");
}
