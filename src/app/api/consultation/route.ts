import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = asString(body?.name).slice(0, 200);
  const email = asString(body?.email).slice(0, 320);
  const phone = asString(body?.phone).slice(0, 50);
  const details = asString(body?.details).slice(0, 5000);

  if (!name || !email || !details || !email.includes("@")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  const phoneLine = phone || "(not provided)";
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phoneLine}`,
    "",
    "Property details:",
    details,
  ].join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to: site.contact.email,
      replyTo: email,
      subject: `Consultation request from ${name}`,
      text,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phoneLine)}</p>
        <p><strong>Property details:</strong></p>
        <p>${escapeHtml(details).replaceAll("\n", "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } catch (error) {
    console.error("Resend request failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
