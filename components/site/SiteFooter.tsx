"use client";

import Link from "next/link";
import Image from "next/image";
import { localePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { useLocale } from "@/lib/useLocale";

export function SiteFooter() {
  const locale = useLocale();
  const t = getDict(locale).footer;
  const lp = (p: string) => localePath(locale, p);

  const cols: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: t.colCollections,
      links: [
        { label: getDict(locale).common.allProducts, href: lp("/shop") },
        { label: t.occ_anfang, href: lp("/shop?anlass=anfang") },
        { label: t.occ_alltag, href: lp("/shop?anlass=alltag") },
        { label: t.occ_statement, href: lp("/shop?anlass=statement") },
        { label: t.occ_geschenk, href: lp("/shop?anlass=geschenk") },
      ],
    },
    {
      title: t.colService,
      links: [
        { label: t.l_shipping, href: lp("/versand") },
        { label: t.l_returns, href: lp("/rueckgabe") },
        { label: t.l_faq, href: lp("/faq") },
        { label: t.l_contact, href: lp("/kontakt") },
      ],
    },
    {
      title: t.colLegal,
      links: [
        { label: t.l_imprint, href: lp("/impressum") },
        { label: t.l_privacy, href: lp("/datenschutz") },
        { label: t.l_terms, href: lp("/agb") },
        { label: t.l_accessibility, href: lp("/barrierefreiheit") },
      ],
    },
  ];

  return (
    <footer style={{ borderTop: "1px solid var(--border-hairline)", background: "var(--ink-1000)" }}>
      <div
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-20) var(--page-pad) var(--space-10)",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: "var(--space-16)",
        }}
        className="lum-footer-grid"
      >
        <div>
          <span style={{ display: "block", width: 102, height: 52, overflow: "hidden" }}>
            <Image
              src="/assets/logo-lumorani.svg"
              alt="LUMORANI"
              width={134}
              height={134}
              style={{ display: "block", width: 134, height: 134, maxWidth: "none", marginTop: -36, marginLeft: -18 }}
            />
          </span>
          <p style={{ marginTop: "var(--space-5)", maxWidth: 300, fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "var(--text-muted)" }}>
            {t.blurb}
          </p>
          <a href="mailto:info@lumorani.com" style={{ display: "inline-block", marginTop: "var(--space-5)", fontSize: "var(--text-body-sm)" }}>
            info@lumorani.com
          </a>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div
              style={{
                fontSize: "var(--text-micro)",
                fontWeight: "var(--weight-medium)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-caps-tight)",
                color: "var(--text-gold)",
              }}
            >
              {c.title}
            </div>
            <ul style={{ listStyle: "none", margin: "var(--space-6) 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--weight-light)", color: "var(--text-secondary)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        className="lum-footer-bottom"
        style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-6) var(--page-pad) var(--space-10)",
          borderTop: "1px solid var(--border-hairline)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          fontSize: "var(--text-micro)",
          letterSpacing: "var(--tracking-caps-tight)",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        <span>© {t.rights}, {new Date().getFullYear()}</span>
        <span>{t.handmade}</span>
      </div>
    </footer>
  );
}
