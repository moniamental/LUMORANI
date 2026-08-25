import { createHmac, timingSafeEqual } from "node:crypto";
import { getResend } from "@/lib/resend";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signingSecret() {
  return process.env.NEWSLETTER_SIGNING_SECRET || "";
}

function signature(payload: string) {
  return createHmac("sha256", signingSecret()).update(payload).digest("base64url");
}

function siteOrigin() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  if (url.protocol !== "https:" && url.hostname !== "localhost") throw new Error("invalid site url");
  return url.origin;
}

export async function POST(req: Request) {
  const limit = rateLimit(`newsletter:${clientIp(req)}`, 5, 30 * 60 * 1000);
  if (!limit.allowed) {
    return Response.json(
      { error: "Zu viele Anmeldeversuche. Bitte versuch es später erneut." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: { email?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim()) return Response.json({ ok: true });
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  if (!EMAIL_RE.test(email)) return Response.json({ error: "Bitte gib eine gültige E-Mail-Adresse ein." }, { status: 400 });

  const resend = getResend();
  if (!resend || !signingSecret()) {
    return Response.json({ error: "Die Newsletter-Anmeldung ist gerade nicht verfügbar." }, { status: 503 });
  }

  const expires = Date.now() + 24 * 60 * 60 * 1000;
  const encodedEmail = Buffer.from(email).toString("base64url");
  const payload = `${encodedEmail}.${expires}`;
  const confirmUrl = `${siteOrigin()}/api/newsletter?token=${encodeURIComponent(`${payload}.${signature(payload)}`)}`;

  const created = await resend.contacts.create({ email, unsubscribed: true });
  if (created.error && !String(created.error.message).toLowerCase().includes("already")) {
    return Response.json({ error: "Die Anmeldung konnte nicht gespeichert werden." }, { status: 502 });
  }

  const from = process.env.CONTACT_FROM || "LUMORANI <onboarding@resend.dev>";
  const { error } = await resend.emails.send(
    {
      from,
      to: email,
      subject: "Bitte bestätige deine LUMORANI-Anmeldung",
      text: `Bitte bestätige deine Newsletter-Anmeldung innerhalb von 24 Stunden: ${confirmUrl}\n\nFalls du dich nicht angemeldet hast, ignoriere diese E-Mail.`,
      html: `<div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6"><h1 style="font-size:24px">Fast geschafft.</h1><p>Bestätige deine LUMORANI-Anmeldung mit einem Klick:</p><p><a href="${confirmUrl}" style="display:inline-block;padding:14px 22px;background:#0b3b2e;color:#fff;text-decoration:none">Anmeldung bestätigen</a></p><p>Der Link ist 24 Stunden gültig. Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.</p></div>`,
    },
    { idempotencyKey: `newsletter-confirm/${signature(email).slice(0, 32)}/${Math.floor(expires / 86400000)}` },
  );
  if (error) return Response.json({ error: "Die Bestätigungs-E-Mail konnte nicht gesendet werden." }, { status: 502 });

  return Response.json({ ok: true });
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") || "";
  const [encodedEmail, expiresRaw, provided] = token.split(".");
  const payload = `${encodedEmail}.${expiresRaw}`;
  const expected = signature(payload);
  const validSignature =
    Boolean(provided) &&
    provided.length === expected.length &&
    timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  const email = encodedEmail ? Buffer.from(encodedEmail, "base64url").toString("utf8") : "";

  if (!signingSecret() || !validSignature || !EMAIL_RE.test(email) || Number(expiresRaw) < Date.now()) {
    return Response.redirect(new URL("/newsletter/ungueltig", siteOrigin()));
  }

  const resend = getResend();
  if (!resend) return Response.redirect(new URL("/newsletter/ungueltig", siteOrigin()));
  const { error } = await resend.contacts.update({ email, unsubscribed: false });
  if (error) return Response.redirect(new URL("/newsletter/ungueltig", siteOrigin()));
  return Response.redirect(new URL("/newsletter/bestaetigt", siteOrigin()));
}
