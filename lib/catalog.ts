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
/** Schliff-Art: roh (ungeschliffen), poliert/facettiert (geschliffen) oder gemischt (half & half). */
export type Cut = "ungeschliffen" | "geschliffen" | "halfhalf";

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
  cut: Cut;
  badge?: string;
  compareAt?: number;
  /**
   * Lose Steine gibt es in allen drei Schliffen. `cut` kann nur einen tragen,
   * deshalb hier die vollständige Liste. Der Shop-Filter liest `cuts ?? [cut]`,
   * sodass ein Stein unter jedem seiner Schliffe auftaucht.
   */
  cuts?: Cut[];
  /**
   * Kein Festpreis, kein Warenkorb — der Kauf läuft über eine Anfrage.
   *
   * Bei losen Steinen hängen Größe, Reinheit und Farbe am einzelnen Stück;
   * ein Festpreis wäre entweder gegriffen oder ein Verlustgeschäft. `price`
   * bleibt aus Typgründen 0 und darf bei diesen Produkten NIE angezeigt werden
   * — sonst steht „0,00 €" auf der Seite. Der Checkout überspringt sie
   * serverseitig, damit auch ein manipulierter Warenkorb nichts erzwingt.
   */
  onRequest?: boolean;
};

/** Die acht losen Steine als Anfrage-Produkte. Bilder: die Firefly-Schatullen-Renders. */
const LOOSE_STONE_PRODUCTS: Product[] = (
  [
    ["achat", "Achat", "statement", "Schichtreich gewachsen, mit einer Bänderung, die kein zweiter Stein wiederholt."],
    ["calcit", "Calcit", "anfang", "Sanfte Farben, weiche Ausstrahlung — ein stiller Stein für einen leisen Anlass."],
    ["rubin", "Rubin", "statement", "Tiefes, kraftvolles Rot. Der Stein, den man im Tageslicht gesehen haben muss."],
    ["aquamarin", "Aquamarin", "alltag", "Klares Blau mit einem Zug ins Türkis, durchscheinend und ruhig."],
    ["turmalin", "Turmalin", "statement", "Farbstark und vielseitig — manchmal zwei Farben in einem einzigen Kristall."],
    ["smaragd", "Smaragd", "anfang", "Tiefes Grün mit gewachsener Struktur. Die Einschlüsse sind der Echtheitsbeweis."],
    ["diamant", "Diamant", "geschenk", "Roh oder geschliffen. Reinheit, Härte und eine Wirkung, die keine Erklärung braucht."],
    ["quarz", "Quarz", "alltag", "Rein, klar, unkompliziert — der Stein, der zu allem passt."],
  ] as const
).map(([slug, name, occasion, teaser]) => ({
  id: `${slug}-edelstein`,
  slug: `${slug}-edelstein`,
  name: `${name} · Loser Edelstein`,
  gem: name,
  price: 0,
  onRequest: true,
  image: IMGBASE + `gem-${slug}.png`,
  category: "Edelsteine" as Category,
  occasion: occasion as OccasionSlug,
  cut: "ungeschliffen" as Cut,
  cuts: ["ungeschliffen", "geschliffen", "halfhalf"] as Cut[],
  description:
    `${teaser} Diesen Stein führen wir lose — ungeschliffen, geschliffen oder als Half & Half. ` +
    `Weil Größe, Reinheit und Farbe bei jedem Stück anders ausfallen, gibt es keinen Festpreis: ` +
    `schreib uns, wonach du suchst, und wir sagen dir, was gerade da ist und was es kostet.`,
}));

export const PRODUCTS: Product[] = [
  {
    id: "amazonit-armband",
    slug: "amazonit-armband",
    cut: "halfhalf",
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
    cut: "halfhalf",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "halfhalf",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "halfhalf",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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
    cut: "geschliffen",
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

  // ————————————————————————————————————————————————
  // LOSE EDELSTEINE — auf Anfrage.
  //
  // Diese acht sind Sortiment, aber keine Lagerware mit Festpreis: jeder Stein
  // ist ein Einzelstück, Preis und Verfügbarkeit hängen an Größe, Reinheit und
  // Farbe. Sie stehen im Shop, damit sie über Filter und Suche auffindbar sind
  // — nur eben ohne Warenkorb.
  //
  // `cuts` trägt alle drei Schliffe, weil LUMORANI jeden Stein roh, geschliffen
  // und als Half & Half führt.
  // ————————————————————————————————————————————————
  ...LOOSE_STONE_PRODUCTS,
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

  // ————————————————————————————————————————————————
  // Lose Edelsteine — die zweite Produktlinie neben dem Schmuck.
  // Diese Steine führt LUMORANI als Rohstein, geschliffen oder Half & Half;
  // sie sind nicht in den Armbändern verarbeitet. Übernommen von der
  // Edelsteine-Seite auf lumorani.com (gelesen 04.09.2026).
  // ————————————————————————————————————————————————
  Achat: {
    samir: "Achat ist geduldig. Jede Schicht ist eine Ablagerung, die Jahrtausende gebraucht hat — deshalb gleicht kein Stein dem anderen.",
    bedeutung: "Ein schichtreicher, erdender Stein mit natürlichem Muster.",
    herkunft: "Naturachat mit gewachsener Bänderung, roh oder poliert.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Keine Ultraschallreinigung.",
  },
  Calcit: {
    samir: "Calcit hat eine Ruhe, die man erst auf den zweiten Blick sieht. Sanfte Farben, nichts Lautes — für Leute, die es leise mögen.",
    bedeutung: "Sanfte Farben und eine weiche, natürliche Ausstrahlung.",
    herkunft: "Naturcalcit, roh oder facettiert geschliffen.",
    pflege: "Weich und empfindlich. Trocken lagern, nur trocken abwischen.",
  },
  Rubin: {
    samir: "Beim Rubin geht es um Farbe. Dieses tiefe Rot musst du einmal im Tageslicht gesehen haben, dann verstehst du, warum er seit jeher der Stein der Könige ist.",
    bedeutung: "Energie, Mut und Leidenschaft. Intensiv rot und kraftvoll.",
    herkunft: "Naturrubin, roh oder geschliffen.",
    pflege: "Sehr hart und alltagstauglich. Lauwarmes Wasser, weiches Tuch.",
  },
  Turmalin: {
    samir: "Turmalin ist der vielseitigste Stein im Sortiment. Es gibt ihn in fast jeder Farbe, manchmal sogar zwei in einem Kristall.",
    bedeutung: "Farbstark, vielseitig und voller Leben.",
    herkunft: "Naturturmalin in verschiedenen Farbvarianten, roh oder geschliffen.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Vor starker Hitze schützen.",
  },
  Smaragd: {
    samir: "Ein Smaragd ohne Einschlüsse wäre verdächtig. Dieser „Jardin“ im Inneren ist kein Makel, sondern der Beweis, dass er echt ist.",
    bedeutung: "Tiefes Grün, gewachsene Struktur, unverwechselbarer Charakter.",
    herkunft: "Natursmaragd, roh oder geschliffen. Einschlüsse sind natürlich.",
    pflege: "Empfindlicher als er aussieht. Nur trocken oder mit weichem Tuch.",
  },
  Diamant: {
    samir: "Der Diamant braucht keine Erklärung. Aber roh ist er fast noch spannender als geschliffen — dann sieht man, was die Natur abgeliefert hat.",
    bedeutung: "Symbol für Reinheit, Stärke und zeitlose Eleganz.",
    herkunft: "Naturdiamant, roh oder geschliffen.",
    pflege: "Härtester Naturstoff. Lauwarmes Wasser, weiche Bürste.",
  },
  Quarz: {
    samir: "Klarer Quarz ist mein Einstiegsstein. Rein, ehrlich, ohne Firlefanz — und er passt zu allem.",
    bedeutung: "Rein, klar und vielseitig.",
    herkunft: "Naturquarz, roh oder facettiert geschliffen.",
    pflege: "Lauwarmes Wasser, weiches Tuch. Unempfindlich im Alltag.",
  },
};

/**
 * LOSE EDELSTEINE — die eigenständige Produktlinie.
 *
 * Diese acht führt LUMORANI als Stein: ungeschliffen, geschliffen oder
 * Half & Half. Sie stehen so auf lumorani.com/edelsteine und es sind exakt
 * die acht, für die Firefly-Renders existieren — die Bilder wurden für
 * diese Seite gemacht.
 *
 * Wichtig: Diese Steine sind NICHT im Schmuck verarbeitet. Sie tauchen
 * deshalb nicht im Shop-Filter auf, sondern führen zur Anfrage.
 */
export const LOOSE_GEMS: Gem[] = [
  { name: "Achat", description: GEM_LORE.Achat.bedeutung, image: IMGBASE + "gem-achat.png" },
  { name: "Calcit", description: GEM_LORE.Calcit.bedeutung, image: IMGBASE + "gem-calcit.png" },
  { name: "Rubin", description: GEM_LORE.Rubin.bedeutung, image: IMGBASE + "gem-rubin.png" },
  { name: "Aquamarin", description: GEM_LORE.Aquamarin.bedeutung, image: IMGBASE + "gem-aquamarin.png" },
  { name: "Turmalin", description: GEM_LORE.Turmalin.bedeutung, image: IMGBASE + "gem-turmalin.png" },
  { name: "Smaragd", description: GEM_LORE.Smaragd.bedeutung, image: IMGBASE + "gem-smaragd.png" },
  { name: "Diamant", description: GEM_LORE.Diamant.bedeutung, image: IMGBASE + "gem-diamant.png" },
  { name: "Quarz", description: GEM_LORE.Quarz.bedeutung, image: IMGBASE + "gem-quarz.png" },
];

/**
 * STEINE IM SCHMUCK — die neun, aus denen die 16 Produkte bestehen.
 *
 * Diese führen in den gefilterten Shop, weil es zu jedem Produkte gibt.
 * Wo kein Bild des losen Steins vorliegt, steht ein Makro-Ausschnitt aus dem
 * Produktbild (`-nahaufnahme`): gleiche Bildsprache, aber der Stein füllt das
 * Bild statt des ganzen Armbands. Der Alt-Text benennt das.
 */
export const JEWELLERY_GEMS: Gem[] = [
  { name: "Amazonit", description: GEM_LORE.Amazonit.bedeutung, image: P + "amazonit-nahaufnahme.jpg" },
  { name: "Lapislazuli", description: GEM_LORE.Lapislazuli.bedeutung, image: P + "lapislazuli-edelstein.jpg" },
  { name: "Malachit", description: GEM_LORE.Malachit.bedeutung, image: P + "malachit-edelstein.jpg" },
  { name: "Hämatit", description: GEM_LORE.Hämatit.bedeutung, image: P + "haematit-nahaufnahme.jpg" },
  { name: "Rosenquarz", description: GEM_LORE.Rosenquarz.bedeutung, image: P + "rosenquarz-edelstein.jpg" },
  { name: "Jade", description: GEM_LORE.Jade.bedeutung, image: P + "jade-nahaufnahme.jpg" },
  { name: "Tigerauge", description: GEM_LORE.Tigerauge.bedeutung, image: P + "tigerauge-nahaufnahme.jpg" },
  { name: "Amethyst", description: GEM_LORE.Amethyst.bedeutung, image: P + "amethyst-nahaufnahme.jpg" },
  { name: "Aquamarin", description: GEM_LORE.Aquamarin.bedeutung, image: P + "aquamarin-nahaufnahme.jpg" },
];

/** @deprecated Alias auf {@link JEWELLERY_GEMS} — bestehende Importe brechen nicht. */
export const GEMS: Gem[] = JEWELLERY_GEMS;

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

/** Schliff-Arten in Anzeige-Reihenfolge. */
export const CUTS: Cut[] = ["geschliffen", "halfhalf", "ungeschliffen"];

const CUT_LABEL_DE: Record<Cut, string> = {
  geschliffen: "Geschliffen",
  halfhalf: "Half & Half",
  ungeschliffen: "Ungeschliffen",
};
const CUT_LABEL_EN: Record<Cut, string> = {
  geschliffen: "Faceted",
  halfhalf: "Half & Half",
  ungeschliffen: "Uncut",
};
export function cutLabel(cut: Cut, locale: Locale): string {
  return (locale === "en" ? CUT_LABEL_EN : CUT_LABEL_DE)[cut];
}
export function isCut(value: string | null | undefined): value is Cut {
  return value === "geschliffen" || value === "halfhalf" || value === "ungeschliffen";
}

/**
 * Steinfilter im Shop.
 *
 * Aus PRODUCTS abgeleitet statt von Hand gepflegt — eine handgeschriebene Liste
 * läuft sonst irgendwann auseinander, und ein Filtereintrag ohne Produkte oder
 * ein Produkt ohne Filtereintrag fällt erst der Kundschaft auf. Reihenfolge wie
 * im Katalog: erst der Schmuck, dann die losen Steine.
 */
export const STONES: string[] = [...new Set(PRODUCTS.map((p) => p.gem))];

/** Alle Schliffe eines Produkts — lose Steine tragen mehrere. */
export function productCuts(p: Product): Cut[] {
  return p.cuts ?? [p.cut];
}

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
