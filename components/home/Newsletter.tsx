"use client";

import React from "react";
import { Button } from "@/components/ds/core/Button.jsx";
import { Input } from "@/components/ds/core/Input.jsx";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

export function Newsletter() {
  const t = getDict(useLocale()).newsletter;
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO Stufe 2: an echten Newsletter-Dienst anbinden
    setSent(true);
  };

  return (
    <section style={{ background: "var(--surface-inverse)", color: "var(--text-on-inverse)" }}>
      <div
        className="lum-newsletter-grid"
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-20) var(--page-pad)",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "var(--space-24)",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: "var(--text-micro)", fontWeight: "var(--weight-medium)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps-wide)", color: "var(--gold-600)" }}>
            {t.eyebrow}
          </div>
          <h2 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--text-display-3)", fontWeight: "var(--weight-light)", color: "var(--text-on-inverse)" }}>
            {t.title}
          </h2>
          <p style={{ marginTop: "var(--space-5)", fontSize: "var(--text-body)", fontWeight: "var(--weight-light)", lineHeight: "var(--leading-body)", color: "var(--text-on-inverse-muted)", maxWidth: 420 }}>
            {t.body}
          </p>
        </div>
        {sent ? (
          <p style={{ fontSize: "var(--text-body-lg)", fontWeight: "var(--weight-light)", color: "var(--text-on-inverse)", lineHeight: "var(--leading-body)" }}>
            {t.thanks}
          </p>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <Input
                tone="light"
                label={t.emailLabel}
                type="email"
                required
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <Button variant="inverse" type="submit">
              {t.submit}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
