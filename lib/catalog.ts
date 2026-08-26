// LUMORANI — Katalog mit dem ECHTEN Sortiment (16 Produkte),
// übernommen von lumorani.com (gelesen 2026-08-25): Namen, Preise, Bilder
// (in public/assets/products/) und Beschreibungen. Copy leicht auf „du"
// normalisiert (Markenstimme). Anlass-Zuordnung für die Startseiten-Kacheln.

import type { Locale } from "@/lib/i18n";
import {
  PRODUCT_NAME_EN,
  PRODUCT_DESC_EN,
  GEM_NAME_EN,
  CATEGORY_LABEL_EN,
  GEM_LORE_EN,
  OCCASION_EN,
  VOICE_EN,
} from "@/lib/catalog.en";

const IMGBASE = "/assets/imagery/";
const P = "/assets/products/";

/** Marken-/Atmosphäre-Bilder (Hero, Story, Backgrounds). */
export const IMG = {
  hero: IMGBASE + "collection-marble.png",
  tray: IMGBASE + "collection-tray.png",
  silk: IMGBASE + "collection-gold-silk.png",
  box: IMGBASE + "box-lumorani-emerald.png",
} as const;

export type Category = "Armbänder" | "Halsketten" | "Ringe" | "Edelsteine";
export type OccasionSlug = "anfang" | "alltag" | "statement" | "geschenk";

export type Product = {
  id: string;
  slug: string;
  name: string;
  gem: string;
  price: number;
  image: string;
  description: string;
  category: Category;
  occasion: OccasionSlug;
  badge?: string;
  compareAt?: number;
};

export const PRODUCTS: Product[] = [
  {
    id: "amazonit-armband",
    slug: "amazonit-armband",
    name: "Amazonit Armband",
    gem: "Amazonit",
    price: 25,
    image: P + "amazonit-armband.jpg",
    category: "Armbänder",
    occasion: "alltag",
    description:
      "Unser Amazonit-Armband vereint polierte und unpolierte Edelsteine zu einem ausdrucksstarken Look. Einige Steine bleiben in ihrem natürlichen Zustand und strahlen eine rohe, erdige Ästhetik aus, andere sind auf Hochglanz poliert. Handgefertigt mit viel Liebe zum Detail – die Schönheit der Natur für deinen Alltag.",
  },
  {
    id: "lapislazuli-kette",
    slug: "lapislazuli-kette",
    name: "Lapislazuli Kette",
    gem: "Lapislazuli",
    price: 80,
    image: P + "lapislazuli-kette.jpg",
    category: "Halsketten",
    occasion: "statement",
    description:
      "Diese Lapislazuli-Kette vereint natürliche Schönheit mit ausdrucksstarker Eleganz. Die sorgfältig ausgewählten Steine begeistern mit tiefem Blau und charakteristischen goldenen Pyrit-Einschlüssen. Jeder Stein ist ein Unikat – ob fein poliert oder bewusst naturbelassen. Ein zeitloses Schmuckstück.",
  },
  {
    id: "lapislazuli-anhaenger",
    slug: "lapislazuli-anhaenger",
    name: "Lapislazuli · Geschliffener Anhänger",
    gem: "Lapislazuli",
    price: 10,
    image: P + "lapislazuli-anhaenger.jpg",
    category: "Halsketten",
    occasion: "geschenk",
    description:
      "Dieser geschliffene Lapislazuli-Anhänger besticht durch seine intensive, tiefblaue Farbe und feine goldfarbene Pyrit-Einschlüsse. Durch den präzisen Schliff kommt die natürliche Struktur besonders schön zur Geltung. Ob dezentes Highlight im Alltag oder besonderer Akzent – jeder Anhänger ist ein Unikat.",
  },
  {
    id: "lapislazuli-armband",
    slug: "lapislazuli-armband",
    name: "Lapislazuli Armband",
    gem: "Lapislazuli",
    price: 50,
    image: P + "lapislazuli-armband.jpg",
    category: "Armbänder",
    occasion: "alltag",
    description:
      "Dieses Lapislazuli-Armband überzeugt durch tiefes Blau und natürliche goldfarbene Pyrit-Einschlüsse, die jedem Schmuckstück Tiefe und Ausdruckskraft verleihen. Die sorgfältig ausgewählten Steine machen jedes Armband zu einem Unikat – mit Liebe zum Detail gefertigt.",
  },
  {
    id: "lapislazuli-ring",
    slug: "lapislazuli-ring",
    name: "Lapislazuli Ring",
    gem: "Lapislazuli",
    price: 60,
    image: P + "lapislazuli-ring.jpg",
    category: "Ringe",
    occasion: "anfang",
    description:
      "Unser Lapislazuli-Ring vereint zeitlose Schönheit mit handwerklicher Präzision. Manche Steine bleiben bewusst in ihrer natürlichen, rohen Form, andere werden poliert. Das Zusammenspiel von kraftvollem Blau und goldenen Pyrit-Einschlüssen macht jeden Ring zu einem Statement.",
  },
  {
    id: "malachit-edelstein",
    slug: "malachit-edelstein",
    name: "Malachit · Geschliffener Edelstein",
    gem: "Malachit",
    price: 10,
    image: P + "malachit-edelstein.jpg",
    category: "Edelsteine",
    occasion: "geschenk",
    description:
      "Ein sorgfältig geschliffener Malachit mit charakteristischer grüner Maserung. Der präzise Schliff sorgt für eleganten Glanz und eine harmonische Form. Dank der einzigartigen Musterung ist jeder Stein ein Unikat – als dekoratives Highlight, für Sammler oder zur Verarbeitung in Schmuck.",
  },
  {
    id: "lapislazuli-edelstein",
    slug: "lapislazuli-edelstein",
    name: "Lapislazuli · Geschliffener Edelstein",
    gem: "Lapislazuli",
    price: 180,
    image: P + "lapislazuli-edelstein.jpg",
    category: "Edelsteine",
    occasion: "statement",
    description:
      "Ein geschliffener Lapislazuli, sorgfältig poliert und geformt, sodass seine intensive tiefblaue Farbe und die funkelnden goldenen Pyrit-Einschlüsse perfekt zur Geltung kommen. Jeder Stein ist ein Unikat – ideal als Highlight, für Sammler oder zur Verarbeitung in Schmuck.",
  },
  {
    id: "haematitkette-tuerkis",
    slug: "haematitkette-tuerkis",
    name: "Hämatitkette mit Türkisperlen",
    gem: "Hämatit",
    price: 30,
    image: P + "haematitkette-tuerkis.jpg",
    category: "Halsketten",
    occasion: "anfang",
    description:
      "Eine handgefertigte Kette, die kraftvollen Hämatit mit zarten Türkisperlen verbindet. Der metallische Glanz des Hämatits trifft auf beruhigendes Türkisblau – ein harmonisches Zusammenspiel aus Eleganz und natürlicher Ausstrahlung. Ein Symbol für Balance und innere Stärke.",
  },
  {
    id: "rosenquarz-edelstein",
    slug: "rosenquarz-edelstein",
    name: "Rosenquarz · Geschliffener Edelstein",
    gem: "Rosenquarz",
    price: 30,
    image: P + "rosenquarz-edelstein.jpg",
    category: "Edelsteine",
    occasion: "anfang",
    description:
      "Rosenquarz steht seit Jahrhunderten für Liebe, Harmonie und emotionale Balance. Unser geschliffener Rosenquarz wurde sorgfältig poliert, um seine sanfte rosa Farbe und natürliche Klarheit perfekt zur Geltung zu bringen. Jeder Stein ist ein Unikat – als Highlight, für Meditation oder als Geschenk.",
  },
  {
    id: "jade-armband",
    slug: "jade-armband",
    name: "Jade Armband",
    gem: "Jade",
    price: 19,
    image: P + "jade-armband.jpg",
    category: "Armbänder",
    occasion: "alltag",
    description:
      "Die zeitlose Schönheit unseres Jade-Armbands, handgefertigt aus sorgfältig ausgewählten Jade-Edelsteinen. Sanfte Grüntöne und natürliche Maserung machen jedes Armband zu einem Unikat. Die Kombination aus polierten und natürlichen Steinen sorgt für einen lebendigen, charaktervollen Look.",
  },
  {
    id: "tigerauge-armband",
    slug: "tigerauge-armband",
    name: "Tigerauge Armband",
    gem: "Tigerauge",
    price: 30,
    image: P + "tigerauge-armband.jpg",
    category: "Armbänder",
    occasion: "alltag",
    description:
      "Die faszinierende Energie unseres Tigerauge-Armbands, handgefertigt aus sorgfältig ausgewählten Steinen mit charakteristischen goldbraunen Schattierungen und schimmerndem Glanz. Ein Statement für Stärke, Schutz und Selbstvertrauen – natürliche Kraft und stilvolle Eleganz in einem.",
  },
  {
    id: "tigerauge-armreif",
    slug: "tigerauge-armreif",
    name: "Tigerauge Armreif",
    gem: "Tigerauge",
    price: 30,
    image: P + "tigerauge-armreif.jpg",
    category: "Armbänder",
    occasion: "statement",
    description:
      "Spüre die Energie unseres Tigerauge-Armreifs, handgefertigt aus sorgfältig ausgewählten Steinen. Jeder zeigt seine typischen goldbraunen Schattierungen und den faszinierenden Glanz, der im Licht sanft schimmert. Ein Statement für Stärke, Selbstvertrauen und Balance.",
  },
  {
    id: "haematit-armband",
    slug: "haematit-armband",
    name: "Hämatit Armband",
    gem: "Hämatit",
    price: 25,
    image: P + "haematit-armband.jpg",
    category: "Armbänder",
    occasion: "alltag",
    description:
      "Die kraftvolle Ausstrahlung unseres Hämatit-Armbands, handgefertigt aus polierten Hämatit-Edelsteinen. Jeder Stein besticht durch seinen metallischen Glanz und eine sanfte Schwere, die das Armband elegant und präsent wirken lässt. Ein Statement für innere Stärke und Balance.",
  },
  {
    id: "amethyst-armband",
    slug: "amethyst-armband",
    name: "Amethyst Armband",
    gem: "Amethyst",
    price: 29,
    image: P + "amethyst-armband.jpg",
    category: "Armbänder",
    occasion: "anfang",
    description:
      "Spüre die beruhigende Energie unseres Amethyst-Armbands, handgefertigt aus sorgfältig ausgewählten Steinen. Jeder besticht durch sein tiefes Violett und die natürliche Strahlkraft. Ein Statement für innere Ruhe, Klarheit und Balance – jeder Stein ein einzigartiges Unikat.",
  },
  {
    id: "aquamarin-armband",
    slug: "aquamarin-armband",
    name: "Aquamarin Armband",
    gem: "Aquamarin",
    price: 30,
    image: P + "aquamarin-armband.jpg",
    category: "Armbänder",
    occasion: "statement",
    description:
      "Unser Aquamarin-Armband verbindet die sanfte, blaue Ausstrahlung des Edelsteins mit handwerklicher Präzision. Jeder Stein wurde sorgfältig ausgewählt, um seine klaren, beruhigenden Töne zu zeigen. Für Gelassenheit, Ausgeglichenheit und frische Energie – jeden Tag.",
  },
  {
    id: "kugelarmband-silber",
    slug: "kugelarmband-silber",
    name: "Kugelarmband aus 925 Sterlingsilber",
    gem: "Sterlingsilber",
    price: 25,
    image: P + "kugelarmband-silber.jpg",
    category: "Armbänder",
    occasion: "geschenk",
    badge: "Bestseller",
    description:
      "Unser Kugel-Armband aus 925er Silber vereint schlichte Eleganz mit zeitloser Raffinesse. Feine Silberkugeln verleihen einen dezenten, luxuriösen Look, der zu jedem Outfit passt. Einzeln getragen oder im Layering-Look – handgefertigt mit Liebe zum Detail.",
  },
];

// ————————————————————————————————————————————————
// Anlass-Kollektionen (Startseite) — Hybrid: emotionaler Einstieg,
// verlinken in den nach Art/Stein/Preis filterbaren Shop.
// ————————————————————————————————————————————————
export type Occasion = {
  slug: OccasionSlug;
  label: string;
  tagline: string;
  copy: string;
  image: string;
  href: string;
};

export const OCCASIONS: Occasion[] = [
  {
    slug: "anfang",
    label: "Für jeden Anfang",
    tagline: "Ein Ja. Ein Meilenstein. Ein Versprechen.",
    copy: "Besondere Stücke für die Momente, in denen alles beginnt. Handverlesen für das, was bleibt.",
    image: IMGBASE + "occ-anfang.jpg",
    href: "/shop?anlass=anfang",
  },
  {
    slug: "alltag",
    label: "Für jeden Tag",
    tagline: "Nah an der Haut. Leise. Deins.",
    copy: "Armbänder, die dich täglich begleiten, ohne je laut zu sein. Zeitlos, klar, echt.",
    image: IMGBASE + "occ-alltag.jpg",
    href: "/shop?anlass=alltag",
  },
  {
    slug: "statement",
    label: "Statement",
    tagline: "Groß. Farbstark. Unübersehbar.",
    copy: "Für den Auftritt, den nur du hinlegst. Ausdrucksstarke Steine für ausdrucksstarke Menschen.",
    image: IMGBASE + "occ-statement.jpg",
    href: "/shop?anlass=statement",
  },
  {
    slug: "geschenk",
    label: "Zum Verschenken",
    tagline: "Sorgfältig gewählt. Von Hand verpackt.",
    copy: "Ein Geschenk, das bleibt. Handgefertigte Unikate, in der emeraldgrünen LUMORANI-Box.",
    image: IMGBASE + "occ-geschenk.jpg",
    href: "/shop?anlass=geschenk",
  },
];

// ————————————————————————————————————————————————
// Edelstein-Wissen (Edelsteine-Seite + Produktseite): Samir-Stimme & Lore
// für die ECHTEN Steine im Sortiment.
// ————————————————————————————————————————————————
export type Gem = { name: string; description: string; image: string };

export type GemLore = {
  samir: string;
  bedeutung: string;
  herkunft: string;
  pflege: string;
};

export const GEM_LORE: Record<string, GemLore> = {
  Amazonit: {
    samir: "Amazonit hat diese ruhige, türkisgrüne Farbe, die ich sofort mochte. Poliert und roh zusammen – so zeige ich, dass ein Stein nicht perfekt sein muss, um schön zu sein.",
    bedeutung: "Mut, Balance und Klarheit. Ein sanftes Türkisgrün, das beruhigt.",
    herkunft: "Naturstein, teils poliert, teils naturbelassen. Handgefertigt.",
    pflege: "Mit weichem Tuch reinigen, vor harten Stößen schützen.",
  },
  Lapislazuli: {
    samir: "Lapislazuli ist mein Klassiker. Dieses tiefe Blau mit den goldenen Pyrit-Funken – kein Stein wirkt so königlich und gleichzeitig so echt.",
    bedeutung: "Tiefe, Wahrheit und Weisheit. Intensives Blau mit goldenen Pyrit-Einschlüssen.",
    herkunft: "Naturstein mit Pyrit-Einschlüssen, poliert oder naturbelassen.",
    pflege: "Weiches Tuch, kein Ultraschall. Vor Chemikalien schützen.",
  },
  Malachit: {
    samir: "Kein Malachit gleicht dem anderen – diese grünen Bänder sind wie Fingerabdrücke. Ich wähle die mit dem schönsten Muster.",
    bedeutung: "Wandlung, Schutz und Wachstum. Sattes Grün mit lebendiger Maserung.",
    herkunft: "Naturstein, geschliffen. Einzigartige Maserung.",
    pflege: "Nur trocken oder mit weichem Tuch. Empfindlich gegen Wasser und Säure.",
  },
  Hämatit: {
    samir: "Hämatit hat dieses metallische Schimmern und eine angenehme Schwere – man spürt den Stein am Handgelenk. Für mich ein Stein, der erdet.",
    bedeutung: "Erdung, Stärke und Schutz. Metallischer Glanz, spürbare Schwere.",
    herkunft: "Naturstein, poliert. Metallischer Glanz.",
    pflege: "Trocken halten, mit weichem Tuch reinigen. Nicht lange in Wasser legen.",
  },
  Rosenquarz: {
    samir: "Rosenquarz ist der sanfteste Stein, den ich führe. Dieses weiche Rosa passt zu Menschen, die Ruhe suchen. Ein schönes Geschenk.",
    bedeutung: "Liebe, Harmonie und emotionale Balance. Sanftes Rosé, seit Jahrhunderten geschätzt.",
    herkunft: "Naturstein, geschliffen und poliert.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Vor langer Sonne schützen.",
  },
  Jade: {
    samir: "Jade steht in vielen Kulturen für Glück. Ich mag die weichen Grüntöne – poliert und natürlich gemischt, wird jedes Stück lebendig.",
    bedeutung: "Harmonie, Glück und innere Stärke. Sanfte Grüntöne, natürliche Maserung.",
    herkunft: "Naturstein, teils poliert, teils naturbelassen.",
    pflege: "Weiches Tuch, lauwarmes Wasser. Robust im Alltag.",
  },
  Tigerauge: {
    samir: "Das Tigerauge fasziniert durch dieses schimmernde Lichtband, das im Licht wandert. Ein Stein für Selbstvertrauen.",
    bedeutung: "Mut, Schutz und Selbstvertrauen. Goldbraune Schattierungen mit schimmerndem Glanz.",
    herkunft: "Naturstein, poliert. Charakteristischer Schimmer.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Robust.",
  },
  Amethyst: {
    samir: "Amethyst wähle ich nach der Tiefe des Violetts. Je satter, desto ruhiger wirkt er. Ein Stein, der den Kopf frei macht.",
    bedeutung: "Ruhe, Klarheit und Balance. Tiefes Violett mit natürlicher Strahlkraft.",
    herkunft: "Naturstein, poliert. Tiefes Violett.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Vor langer Sonne schützen.",
  },
  Aquamarin: {
    samir: "Aquamarin ist der ruhigste Stein, den ich führe. Dieses klare Blau erinnert mich an flaches Wasser im Morgenlicht – ein Stück, das du jeden Tag tragen kannst.",
    bedeutung: "Klarheit, Ruhe und Weite. Helle Blau- und Türkistöne, die den Kopf frei machen.",
    herkunft: "Naturaquamarin, poliert. In feiner Handarbeit gefasst.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Vor langer Sonne schützen.",
  },
  Sterlingsilber: {
    samir: "Manchmal braucht es keinen Stein. Feine Silberkugeln, schlicht und edel – mein Allrounder zum Kombinieren.",
    bedeutung: "Zeitlose, minimalistische Eleganz. 925er Silber, das zu allem passt.",
    herkunft: "925er Sterlingsilber, handgefertigt.",
    pflege: "Mit Silbertuch polieren, trocken lagern.",
  },
};

/** Steine für die Edelsteine-Seite (ohne Sterlingsilber = Material). */
export const GEMS: Gem[] = [
  { name: "Amazonit", description: GEM_LORE.Amazonit.bedeutung, image: P + "amazonit-armband.jpg" },
  { name: "Lapislazuli", description: GEM_LORE.Lapislazuli.bedeutung, image: P + "lapislazuli-edelstein.jpg" },
  { name: "Malachit", description: GEM_LORE.Malachit.bedeutung, image: P + "malachit-edelstein.jpg" },
  { name: "Hämatit", description: GEM_LORE.Hämatit.bedeutung, image: P + "haematit-armband.jpg" },
  { name: "Rosenquarz", description: GEM_LORE.Rosenquarz.bedeutung, image: P + "rosenquarz-edelstein.jpg" },
  { name: "Jade", description: GEM_LORE.Jade.bedeutung, image: P + "jade-armband.jpg" },
  { name: "Tigerauge", description: GEM_LORE.Tigerauge.bedeutung, image: P + "tigerauge-armband.jpg" },
  { name: "Amethyst", description: GEM_LORE.Amethyst.bedeutung, image: P + "amethyst-armband.jpg" },
  { name: "Aquamarin", description: GEM_LORE.Aquamarin.bedeutung, image: P + "aquamarin-armband.jpg" },
];

export type Voice = { name: string; quote: string };

export const VOICES: Voice[] = [
  { name: "Juma Aydin", quote: "Ich habe hier das perfekte Geschenk für meine Frau gefunden. Vielen Dank!" },
  { name: "Sophia Dulatov", quote: "Die Qualität der Schmuckstücke ist beeindruckend." },
  { name: "Elena Dimitriovic", quote: "Ein Besuch bei LUMORANI lohnt sich immer. Tolle Auswahl und hochwertiger Schmuck." },
];

// ————————————————————————————————————————————————
// Helfer
// ————————————————————————————————————————————————
export const CATEGORIES: Category[] = ["Armbänder", "Halsketten", "Ringe", "Edelsteine"];

export const STONES: string[] = [
  "Amazonit",
  "Lapislazuli",
  "Malachit",
  "Hämatit",
  "Rosenquarz",
  "Jade",
  "Tigerauge",
  "Amethyst",
  "Aquamarin",
  "Sterlingsilber",
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getGemLore(gem: string): GemLore | undefined {
  return GEM_LORE[gem];
}

export function getOccasion(slug: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.slug === slug);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  const sameGem = PRODUCTS.filter((p) => p.id !== product.id && p.gem === product.gem);
  const sameOccasion = PRODUCTS.filter(
    (p) => p.id !== product.id && p.gem !== product.gem && p.occasion === product.occasion,
  );
  const rest = PRODUCTS.filter(
    (p) => p.id !== product.id && p.gem !== product.gem && p.occasion !== product.occasion,
  );
  return [...sameGem, ...sameOccasion, ...rest].slice(0, count);
}

export const PRICE_MIN = Math.min(...PRODUCTS.map((p) => p.price));
export const PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));

const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});
const eurEN = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

/** „25,00 €" — deutsches Format. */
export function formatEUR(value: number): string {
  return eur.format(value);
}

/** Preis sprachabhängig: DE „25,00 €", EN „€25.00". */
export function formatPrice(value: number, locale: Locale): string {
  return (locale === "en" ? eurEN : eur).format(value);
}

// ————————————————————————————————————————————————
// Sprachbewusste Accessoren (DE = Original, EN = lib/catalog.en.ts)
// ————————————————————————————————————————————————
export function productName(p: Product, locale: Locale): string {
  return locale === "en" ? PRODUCT_NAME_EN[p.slug] ?? p.name : p.name;
}
export function productDescription(p: Product, locale: Locale): string {
  return locale === "en" ? PRODUCT_DESC_EN[p.slug] ?? p.description : p.description;
}
export function gemName(name: string, locale: Locale): string {
  return locale === "en" ? GEM_NAME_EN[name] ?? name : name;
}
export function categoryLabel(cat: Category, locale: Locale): string {
  return locale === "en" ? CATEGORY_LABEL_EN[cat] ?? cat : cat;
}
export function gemLoreFor(gem: string, locale: Locale): GemLore | undefined {
  return locale === "en" ? GEM_LORE_EN[gem] : GEM_LORE[gem];
}
export function occasionLabel(o: Occasion, locale: Locale): string {
  return locale === "en" ? OCCASION_EN[o.slug]?.label ?? o.label : o.label;
}
export function occasionTagline(o: Occasion, locale: Locale): string {
  return locale === "en" ? OCCASION_EN[o.slug]?.tagline ?? o.tagline : o.tagline;
}
export function occasionCopy(o: Occasion, locale: Locale): string {
  return locale === "en" ? OCCASION_EN[o.slug]?.copy ?? o.copy : o.copy;
}
export function voiceQuote(v: Voice, locale: Locale): string {
  return locale === "en" ? VOICE_EN[v.name] ?? v.quote : v.quote;
}
