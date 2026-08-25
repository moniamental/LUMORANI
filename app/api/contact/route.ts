import { getResend } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const b = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown; // Honeypot
  };

  // Honeypot: von Menschen nie ausgefüllt → als Bot behandeln, aber „Erfolg" vortäuschen.
  if (typeof b.company === "string" && b.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = typeof b.name === "string" ? b.name.trim().slice(0, 120) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 160) : "";
  const message = typeof b.message === "string" ? b.message.trim().slice(0, 4000) : "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Bitte fülle Name, gültige E-Mail und Nachricht aus." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return Response.json(
      { error: "Der Nachrichtenversand ist noch nicht konfiguriert. Bitte RESEND_API_KEY setzen." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO || "info@lumorani.com";
  const from = process.env.CONTACT_FROM || "LUMORANI <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>E-Mail:</strong> ${esc(email)}</p>
          <p><strong>Nachricht:</strong></p>
          <p style="white-space:pre-wrap">${esc(message)}</p>
        </div>`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
    });
    if (error) {
      return Response.json({ error: "Nachricht konnte nicht gesendet werden." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Nachricht konnte nicht gesendet werden." }, { status: 502 });
  }
}
