"use client";

import React from "react";
import { Button } from "@/components/ds/core/Button.jsx";
import { Input } from "@/components/ds/core/Input.jsx";
import { useLocale } from "@/lib/useLocale";

const COPY = {
  de: {
    nameLabel: "Name*",
    namePh: "Dein Name",
    emailLabel: "E-Mail*",
    emailPh: "name@mail.de",
    msgLabel: "Nachricht*",
    msgPh: "Wonach suchst du? Erzähl uns von deinem Stein, Anlass oder Wunsch.",
    honeypot: "Firma",
    errGeneric: "Nachricht konnte nicht gesendet werden.",
    errNetwork: "Netzwerkfehler. Bitte versuch es noch einmal.",
    submit: "Nachricht senden",
    submitting: "Wird gesendet …",
    sentTitle: (n: string) => `Danke, ${n || "dir"}.`,
    sentBody:
      "Deine Nachricht ist bei uns. Wir melden uns so schnell wie möglich – meist innerhalb von ein bis zwei Werktagen.",
  },
  en: {
    nameLabel: "Name*",
    namePh: "Your name",
    emailLabel: "Email*",
    emailPh: "name@mail.com",
    msgLabel: "Message*",
    msgPh: "What are you looking for? Tell us about your stone, occasion or wish.",
    honeypot: "Company",
    errGeneric: "Your message could not be sent.",
    errNetwork: "Network error. Please try again.",
    submit: "Send message",
    submitting: "Sending …",
    sentTitle: (n: string) => `Thank you, ${n || "there"}.`,
    sentBody:
      "Your message has reached us. We’ll get back to you as soon as we can — usually within one to two business days.",
  },
} as const;

export function ContactForm() {
  const t = COPY[useLocale()];
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [company, setCompany] = React.useState(""); // Honeypot
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.errGeneric);
        setLoading(false);
        return;
      }
      setSent(true);
    } catch {
      setError(t.errNetwork);
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ border: "1px solid var(--border-gold)", borderRadius: "var(--radius-card)", padding: "var(--space-10)", background: "rgba(201,162,74,.06)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-subtitle)", fontWeight: "var(--weight-light)" }}>
          {t.sentTitle(name.split(" ")[0])}
        </div>
        <p style={{ margin: "var(--space-4) 0 0", color: "var(--text-secondary)", fontSize: "var(--text-body-sm)", lineHeight: "var(--leading-body)" }}>
          {t.sentBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <Input label={t.nameLabel} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder={t.namePh} required />
      <Input label={t.emailLabel} type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder={t.emailPh} required />
      <label style={{ display: "block" }}>
        <span style={{ display: "block", marginBottom: 10, fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-tight)", color: "var(--text-muted)" }}>
          {t.msgLabel}
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder={t.msgPh}
          style={{
            width: "100%",
            background: "transparent",
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--weight-light)",
            lineHeight: "var(--leading-body)",
            letterSpacing: "var(--tracking-body)",
            padding: "12px 0",
            border: "none",
            borderBottom: "1px solid var(--border-hairline)",
            borderRadius: 0,
            outline: "none",
            resize: "vertical",
          }}
        />
      </label>
      {/* Honeypot – für Menschen unsichtbar, fängt Bots ab */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          {t.honeypot}
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>

      {error ? (
        <div style={{ fontSize: "var(--text-caption)", color: "var(--status-error)" }}>{error}</div>
      ) : null}

      <div>
        <Button size="lg" type="submit" disabled={loading}>
          {loading ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  );
}
