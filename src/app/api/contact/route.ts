import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";
import { sendEnquiry, shouldSend } from "@/lib/mailer";

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

  // Email the enquiry to the Gmail inbox. Without credentials (or for test data) it's only logged,
  // so the form still works in development and the tests never send real emails.
  if (!shouldSend(result.data)) {
    console.info("[contact] not emailed (no Gmail credentials, dry run or test address)", result.data);
    return NextResponse.json({ ok: true });
  }
  try {
    await sendEnquiry(result.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    // e.g. a wrong App Password. The form then shows "Sorry, something went wrong" instead of a false success.
    console.error("[contact] email failed", error);
    return NextResponse.json({ ok: false, error: "Could not send your message" }, { status: 502 });
  }
}
