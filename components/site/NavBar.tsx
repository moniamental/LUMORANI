"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { localeFromPath, localePath, switchLocalePath } from "@/lib/i18n";
import { getDict } from "@/lib/dict";

type NavItem = { label: string; href: string };

const SILK = [0.16, 1, 0.3, 1] as const;

export function NavBar() {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);
  const t = getDict(locale).nav;
  const cart = useCart();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuState, setMenuState] = React.useState({ open: false, path: pathname });
  const menuOpen = menuState.open && menuState.path === pathname;
  const closeMenu = () => setMenuState({ open: false, path: pathname });
  const menuRef = React.useRef<HTMLDivElement>(null);

  const LINKS: NavItem[] = [
    { label: t.shop, href: localePath(locale, "/shop") },
    { label: t.gemstones, href: localePath(locale, "/edelsteine") },
    { label: t.giftsets, href: localePath(locale, "/geschenksets") },
    { label: t.about, href: localePath(locale, "/ueber-uns") },
  ];
  const homeHref = localePath(locale, "/");

  const isHome = pathname === "/" || pathname === "/en";
  const transparent = isHome && !scrolled && !menuOpen;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body-Scroll sperren bei offenem Menü
  React.useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      const background = [document.getElementById("main-content"), document.querySelector("footer")].filter(Boolean) as HTMLElement[];
      document.body.style.overflow = "hidden";
      background.forEach((element) => element.setAttribute("inert", ""));
      const focusFrame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus());
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMenuState({ open: false, path: pathname });
      };
      window.addEventListener("keydown", onKey);
      return () => {
        cancelAnimationFrame(focusFrame);
        window.removeEventListener("keydown", onKey);
        background.forEach((element) => element.removeAttribute("inert"));
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen, pathname]);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40 }}>
      <div
        style={{
          textAlign: "center",
          padding: "9px 16px",
          fontSize: "var(--text-micro)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps)",
          color: "var(--text-secondary)",
          background: "var(--ink-1000)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        {t.announcement}
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 41,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          padding: "var(--space-3) clamp(20px, 3vw, var(--page-pad))",
          background: transparent ? "rgba(7,7,8,.35)" : "var(--ink-900)",
          backdropFilter: transparent ? "blur(var(--blur-glass))" : "none",
          WebkitBackdropFilter: transparent ? "blur(var(--blur-glass))" : "none",
          borderBottom: "1px solid var(--border-hairline)",
          transition: "background var(--duration-base) var(--ease-out-silk)",
        }}
      >
        {/* Logo links — exakt auf den Inhalt beschnitten (Diamant nicht abgeschnitten) */}
        <Link href={homeHref} aria-label={`LUMORANI — ${t.start}`} style={{ display: "flex", alignItems: "center", minHeight: 44, flexShrink: 0 }}>
          <span style={{ display: "block", width: 78, height: 40, overflow: "hidden" }}>
            <Image
              src="/assets/logo-lumorani.svg"
              alt="LUMORANI"
              width={103}
              height={103}
              priority
              style={{ display: "block", width: 103, height: 103, maxWidth: "none", marginTop: -28, marginLeft: -13 }}
            />
          </span>
        </Link>

        {/* Links mittig (Desktop) */}
        <nav className="lum-nav-links">
          {LINKS.map((l) => (
            <NavLink key={l.href} item={l} active={pathname.startsWith(l.href)} />
          ))}
        </nav>

        {/* Rechts: Sprache + Icons + Burger */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", marginLeft: "auto", flexShrink: 0 }}>
          <LangSwitch pathname={pathname} locale={locale} label={t.langLabel} />
          <IconLink label={t.search} href={`${localePath(locale, "/shop")}#produktsuche`}>
            <SearchGlyph />
          </IconLink>
          <span style={{ position: "relative" }}>
            <IconBtn label={t.cart} onClick={cart.openCart}>
              <BagGlyph />
            </IconBtn>
            {cart.count > 0 ? (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: 0,
                  minWidth: 16,
                  height: 16,
                  padding: "0 4px",
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--gradient-gold)",
                  color: "var(--text-on-gold)",
                  fontSize: "9px",
                  fontWeight: "var(--weight-semibold)",
                }}
              >
                {cart.count}
              </span>
            ) : null}
          </span>
          <button
            type="button"
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuState((v) => ({ open: !(v.open && v.path === pathname), path: pathname }))}
            className="lum-nav-burger"
            style={{ width: 44, height: 44, placeItems: "center", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)" }}
          >
            <BurgerGlyph open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile-Menü */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: SILK }}
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 39,
              background: "var(--ink-1000)",
              paddingTop: 132,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", padding: "var(--space-8) var(--page-pad-mobile)" }}>
              {[{ label: t.start, href: homeHref }, ...LINKS, { label: t.contact, href: localePath(locale, "/kontakt") }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05, duration: 0.4, ease: SILK }}
                >
                  <Link
                    href={l.href}
                    onClick={closeMenu}
                    style={{
                      display: "block",
                      padding: "var(--space-4) 0",
                      borderBottom: "1px solid var(--border-hairline)",
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-title)",
                      fontWeight: "var(--weight-light)",
                      color: pathname === l.href ? "var(--gold-200)" : "var(--text-primary)",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: "auto", padding: "var(--space-10) var(--page-pad-mobile)", fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}>
              <div style={{ marginBottom: "var(--space-6)" }}>
                <LangSwitch pathname={pathname} locale={locale} label={t.langLabel} onNavigate={closeMenu} />
              </div>
              <a href="mailto:info@lumorani.com" style={{ color: "var(--text-gold)" }}>info@lumorani.com</a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const [hover, setHover] = React.useState(false);
  const lit = active || hover;
  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--type-nav-size)",
        fontWeight: "var(--weight-regular)",
        textTransform: "uppercase",
        letterSpacing: "var(--type-nav-tracking)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        color: lit ? "var(--gold-200)" : "var(--text-secondary)",
        transition: "var(--transition-hover)",
        paddingBottom: "4px",
      }}
    >
      {item.label}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 1,
          width: lit ? "100%" : "0%",
          background: "var(--gradient-gold)",
          transition: "width var(--duration-base) var(--ease-out-silk)",
        }}
      />
    </Link>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 44,
        height: 44,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid transparent",
        background: hover ? "rgba(244,241,236,.06)" : "transparent",
        color: hover ? "var(--gold-200)" : "var(--text-secondary)",
        cursor: "pointer",
        transition: "var(--transition-hover)",
      }}
    >
      {children}
    </button>
  );
}

function IconLink({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      aria-label={label}
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 44,
        height: 44,
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-pill)",
        border: "1px solid transparent",
        background: hover ? "rgba(244,241,236,.06)" : "transparent",
        color: hover ? "var(--gold-200)" : "var(--text-secondary)",
        transition: "var(--transition-hover)",
      }}
    >
      {children}
    </Link>
  );
}

function LangSwitch({
  pathname,
  locale,
  label,
  onNavigate,
}: {
  pathname: string;
  locale: "de" | "en";
  label: string;
  onNavigate?: () => void;
}) {
  const items: { code: "de" | "en"; text: string }[] = [
    { code: "de", text: "DE" },
    { code: "en", text: "EN" },
  ];
  return (
    <div
      role="group"
      aria-label={label}
      style={{ display: "flex", alignItems: "center", gap: 2, marginRight: "var(--space-2)" }}
    >
      {items.map((it, i) => {
        const active = it.code === locale;
        return (
          <React.Fragment key={it.code}>
            {i === 1 ? <span aria-hidden style={{ color: "var(--text-muted)", opacity: 0.5, fontSize: 11 }}>/</span> : null}
            <Link
              href={switchLocalePath(pathname, it.code)}
              onClick={onNavigate}
              hrefLang={it.code}
              aria-current={active ? "true" : undefined}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-micro)",
                fontWeight: active ? "var(--weight-medium)" : "var(--weight-regular)",
                letterSpacing: "var(--tracking-caps-tight)",
                textDecoration: "none",
                minWidth: 44,
                minHeight: 44,
                display: "grid",
                placeItems: "center",
                padding: "6px",
                color: active ? "var(--gold-200)" : "var(--text-muted)",
                transition: "var(--transition-hover)",
              }}
            >
              {it.text}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4.2-4.2" />
    </svg>
  );
}

function BagGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function BurgerGlyph({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        </>
      )}
    </svg>
  );
}
