import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.details) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Placeholder: wire this to email or a CRM when ready.
  console.info("Consultation request", {
    name: body.name,
    email: body.email,
    phone: body.phone ?? "",
  });

  return NextResponse.json({ ok: true });
}
