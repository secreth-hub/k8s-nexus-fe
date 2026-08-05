import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("nexus_token");
  redirect(hasToken ? "/dashboard" : "/login");
}
