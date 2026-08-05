import { NextResponse } from "next/server";

// Used by liveness/readiness probes in the Helm chart. Deliberately doesn't
// check the API/DB — proves the Next.js server process is alive, same
// scope/limitation as nexus-api's /up route (Lesson 9's probe lessons).
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
