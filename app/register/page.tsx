import Link from "next/link";
import { register } from "./actions";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main style={{ maxWidth: 360, margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1>Register</h1>
      <form action={register} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password (min 8 chars)" required minLength={8} />
        <button type="submit">Register</button>
      </form>
      <ErrorMessage searchParams={searchParams} />
      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </main>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!error) return null;
  return <p style={{ color: "crimson" }}>{error}</p>;
}
