// Ladezustand beim Routenwechsel — verhindert den „nichts passiert"-Moment.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ minHeight: "60vh", display: "grid", placeItems: "center", background: "var(--surface-page)" }}
    >
      <span
        style={{
          fontSize: "var(--text-micro)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps-wide)",
          color: "var(--text-gold)",
        }}
      >
        Einen Moment
      </span>
    </div>
  );
}
