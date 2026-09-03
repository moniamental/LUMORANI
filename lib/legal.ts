// ─────────────────────────────────────────────────────────────────────────────
// Rechtliche Eckwerte des Shops — bewusst an EINER Stelle.
//
// ⚠️ Wer die Rücksendekosten trägt, muss ausdrücklich geregelt sein.
//    Ohne Regelung trägt sie der Händler (§ 357 Abs. 6 BGB).
//    "kunde"   → „Sie tragen die unmittelbaren Kosten der Rücksendung."
//    "haendler"→ „Wir tragen die Kosten der Rücksendung."
//
// Voreingestellt auf "kunde" — das ist bei kleinen Manufakturen der Normalfall.
// Kostenfreie Rücksendung wäre ein Verkaufsargument, ist aber eine
// Geschäftsentscheidung von Samir. Ein Wort hier, dann ändert sich alles mit.
// ─────────────────────────────────────────────────────────────────────────────

export const RUECKSENDEKOSTEN: "kunde" | "haendler" = "kunde";

/** Anbieterdaten für Widerrufsbelehrung und Muster-Widerrufsformular. */
export const ANBIETER = {
  name: "Samir Sobhani",
  marke: "LUMORANI",
  strasse: "Bussardstraße 21",
  plz: "68307",
  ort: "Mannheim",
  land: "Deutschland",
  email: "info@lumorani.com",
} as const;

export const ANBIETER_BLOCK = `${ANBIETER.name} (${ANBIETER.marke}), ${ANBIETER.strasse}, ${ANBIETER.plz} ${ANBIETER.ort}, ${ANBIETER.land}, E-Mail: ${ANBIETER.email}`;
