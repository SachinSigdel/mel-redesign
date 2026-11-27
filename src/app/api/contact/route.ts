import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled in = a bot. Pretend it worked so the bot doesn't retry.
  if (typeof body === "object" && body !== null && (body as { company?: string }).company) {
    return NextResponse.json({ ok: true });
  }

  // Same schema as the browser, because browser checks can be bypassed
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message }));
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Test data only: no email service is connected. This is where you'd send an email or save to a database.
  console.info("[contact] test submission", result.data);
  return NextResponse.json({ ok: true });
}
