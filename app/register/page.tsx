import Link from "next/link";
import { register } from "./actions";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Get started with Nexus.
        </p>

        <form action={register} className="mt-6 flex flex-col gap-4">
          <Field label="Name">
            <input
              name="name"
              type="text"
              placeholder="Jane Doe"
              required
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400/30 dark:border-white/15 dark:bg-neutral-900"
            />
          </Field>
          <Field label="Email">
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400/30 dark:border-white/15 dark:bg-neutral-900"
            />
          </Field>
          <Field label="Password">
            <input
              name="password"
              type="password"
              placeholder="Min 8 characters"
              required
              minLength={8}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400/30 dark:border-white/15 dark:bg-neutral-900"
            />
          </Field>

          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Register
          </button>
        </form>

        <ErrorMessage searchParams={searchParams} />

        <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-neutral-900 underline underline-offset-2 dark:text-white">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
      {children}
    </label>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!error) return null;
  return (
    <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400">
      {error}
    </p>
  );
}
