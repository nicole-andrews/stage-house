"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-2xl border border-line bg-panel p-6 text-lg leading-8">
        Thank you. We received your consultation request and will be in touch
        shortly.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-panel p-6">
      <label className="grid gap-2 text-sm">
        Name
        <input
          required
          name="name"
          className="rounded-lg border border-line bg-background px-3 py-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Email
        <input
          required
          type="email"
          name="email"
          className="rounded-lg border border-line bg-background px-3 py-2"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Phone
        <input name="phone" className="rounded-lg border border-line bg-background px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm">
        Property details
        <textarea
          required
          name="details"
          rows={5}
          className="rounded-lg border border-line bg-background px-3 py-2"
          placeholder="Address, timeline, vacant or occupied, and anything we should know."
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-fit rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-background hover:bg-gold-strong disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a Consultation"}
      </button>
      {status === "error" ? (
        <p className="text-sm text-gold">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
