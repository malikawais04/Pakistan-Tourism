// Editorial content for Pakistan Tourism.
// Local placeholder art lives in /public/images — swap these paths for real
// photography whenever it's available.
export const assets = {
  hero: "/images/hero.svg",
  hunza: "/images/hunza.svg",
  lahore: "/images/lahore.svg",
  skardu: "/images/skardu.svg",
  mark: "/images/mark.svg",
};

export type Destination = {
  title: string;
  slug: string;
  region: string;
  tag: string;
  summary: string;
  image: string;
  note: string;
};

export const destinations: Destination[] = [
  { title: "Hunza Valley", slug: "hunza", region: "Gilgit-Baltistan", tag: "Mountain", summary: "Apricot orchards, high passes, and villages held between the Karakoram’s sharpest silhouettes.", image: assets.hunza, note: "Best for unhurried high-altitude days" },
  { title: "Lahore", slug: "lahore", region: "Punjab", tag: "Heritage", summary: "A city of courtyards, old-city stories, generous tables, and a creative pulse that runs late.", image: assets.lahore, note: "Best for food, history, and street life" },
  { title: "Skardu", slug: "skardu", region: "Gilgit-Baltistan", tag: "Outdoors", summary: "Granite valleys and still alpine lakes at the gateway to some of the world’s highest peaks.", image: assets.skardu, note: "Best for big skies and trail days" },
  { title: "Islamabad", slug: "islamabad", region: "Islamabad Capital Territory", tag: "City + Nature", summary: "Leafy avenues, modern galleries, and the Margalla Hills rising just beyond the city grid.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85", note: "Best for a soft landing" },
  { title: "Swat Valley", slug: "swat", region: "Khyber Pakhtunkhwa", tag: "River + Valley", summary: "A green river corridor with pine forests, old settlements, and a slower mountain rhythm.", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85", note: "Best for a road trip north" },
  { title: "Karachi", slug: "karachi", region: "Sindh", tag: "Coast + Culture", summary: "Sea air, bold architecture, and one of the country’s most layered food and arts scenes.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85", note: "Best for coastal city energy" },
];

export type DetailEntry = Destination & {
  kind: "destination" | "experience";
  kicker: string;
  body: string;
  gallery: string[];
  bestTime: string;
  review: string;
  gettingThere: string;
  highlights: string[];
  related: string[];
  duration?: string;
  difficulty?: string;
  route?: string;
};

export const detailEntries: DetailEntry[] = [
  { ...destinations[0], kind: "destination", kicker: "High valleys / Gilgit-Baltistan", body: "Hunza is a place of thresholds: between valley floor and high pass, apricot orchard and exposed rock, a long road and a quiet afternoon. Come with time to spare.", gallery: [assets.hunza, assets.hero, assets.skardu], bestTime: "April–October, with spring bloom and autumn color offering different readings of the valley.", review: "Reviewed 12 August 2026", gettingThere: "Approach via the Karakoram Highway from Gilgit. Check current road conditions and local transport advice before setting out.", highlights: ["Village walks and orchard lanes", "Baltit and Altit heritage landscapes", "High-pass views without a rushed itinerary"], related: ["Skardu", "Swat Valley"] },
  { ...destinations[2], kind: "destination", kicker: "Granite / lake country", body: "Skardu opens into a wide, mineral world: still water, bare stone, and the kind of horizon that makes a short walk feel like a route.", gallery: [assets.skardu, assets.hunza, assets.hero], bestTime: "May–October for most outdoor routes; seasonal access can shift with weather.", review: "Reviewed 12 August 2026", gettingThere: "Fly or travel overland from Islamabad or Gilgit depending on current availability. Confirm transport locally.", highlights: ["Alpine lakes and shoreline pauses", "Granite valleys and wide skies", "A useful base for longer mountain routes"], related: ["Hunza Valley", "Mountain passes"] },
  { ...destinations[1], kind: "destination", kicker: "Old city / Punjab", body: "Lahore is best read at street level: through tiled courtyards, shared tables, late-evening walks, and the layered work of a city that keeps remaking itself.", gallery: [assets.lahore, "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85", assets.hunza], bestTime: "October–March for gentler days; plan around local opening hours and heat.", review: "Reviewed 12 August 2026", gettingThere: "Lahore is well connected by air, rail, and road. Use current local guidance for neighborhoods, access, and timings.", highlights: ["Heritage courtyards and old-city texture", "Food traditions worth taking slowly", "Contemporary art and creative energy"], related: ["Karachi", "Old city tables"] },
  { ...destinations[0], kind: "experience", title: "Mountain passes", slug: "mountain-passes", kicker: "Experience / long way north", body: "A mountain route is not a checklist. It is a sequence of weather, tea stops, changing light, and the patience to let the road set the pace.", gallery: [assets.hero, assets.hunza, assets.skardu], bestTime: "June–September is a common window for higher routes, subject to conditions.", review: "Reviewed 12 August 2026", gettingThere: "Shape the route with an experienced local operator and verify access, permits, weather, and road conditions before departure.", highlights: ["Karakoram viewpoints", "Small roadside settlements", "Flexible days for weather and altitude"], related: ["Hunza Valley", "Skardu"], duration: "5–9 days", difficulty: "Moderate to demanding", route: "Gilgit → Hunza → high-pass viewpoints → Skardu" },
  { ...destinations[1], kind: "experience", title: "Old city tables", slug: "old-city-tables", kicker: "Experience / Lahore", body: "Follow the city by appetite: a courtyard, a spice market, a shared plate, a story about what changed and what stayed.", gallery: [assets.lahore, assets.hunza, "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85"], bestTime: "October–March offers more comfortable walking hours.", review: "Reviewed 12 August 2026", gettingThere: "Begin in the old city with a local guide or trusted local recommendation. This is an editorial suggestion, not a booked service.", highlights: ["Local foodways and shared tables", "Courtyard architecture", "A route shaped by conversation"], related: ["Lahore", "Karachi"], duration: "Half day–2 days", difficulty: "Easy", route: "Old city lanes → courtyard heritage → evening food streets" },
];

export const experienceTitles: Record<string, string> = {
  "mountain-passes": "Mountain passes",
  "old-city-tables": "Old city tables",
  "alpine-lake-days": "Alpine lake days",
  "garden-city-mornings": "Garden city mornings",
  "river-road-north": "River road north",
  "coastal-city-walks": "Coastal city walks",
};

export function fallbackDetail(kind: "destination" | "experience", slug: string): DetailEntry {
  const base = destinations.find((item) => item.slug === slug) || destinations[0];
  const title =
    kind === "experience"
      ? experienceTitles[slug] || slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")
      : base.title;
  return {
    ...base,
    kind,
    title,
    slug,
    kicker: kind === "experience" ? `Experience / ${base.region}` : `${base.region} / field note`,
    body: kind === "experience" ? `A considered way to spend time in ${base.title}: a route shaped by light, local knowledge, and room for the unexpected.` : base.summary,
    gallery: [base.image, assets.hero, assets.skardu],
    bestTime: "Seasonal conditions vary. Check current local guidance before setting out.",
    review: "Reviewed 12 August 2026",
    gettingThere: `Use current local transport advice for ${base.title}; this page is editorial context, not a booked service.`,
    highlights: [base.note, "A slower rhythm through place", "Room for local knowledge"],
    related: [base.title === "Hunza Valley" ? "Skardu" : "Hunza Valley"],
    duration: kind === "experience" ? "1–4 days" : undefined,
    difficulty: kind === "experience" ? "Varies by route" : undefined,
    route: kind === "experience" ? `A flexible route through ${base.title} and its surrounding landscapes.` : undefined,
  };
}

export function findDetail(kind: "destination" | "experience", slug: string): DetailEntry {
  return detailEntries.find((item) => item.kind === kind && item.slug === slug) || fallbackDetail(kind, slug);
}

const experienceMeta = [
  { slug: "mountain-passes", title: "Mountain passes", tag: "Mountains", summary: "Routes for big views and quiet footpaths across the north." },
  { slug: "old-city-tables", title: "Old city tables", tag: "Food + Culture", summary: "Courtyards, kitchens, and stories best taken one plate at a time." },
  { slug: "alpine-lake-days", title: "Alpine lake days", tag: "Outdoors", summary: "A slower rhythm around water, granite, and sky." },
  { slug: "garden-city-mornings", title: "Garden city mornings", tag: "City", summary: "A green beginning before you head towards the hills." },
  { slug: "river-road-north", title: "River road north", tag: "Road trip", summary: "A route is a destination when you give it time." },
  { slug: "coastal-city-walks", title: "Coastal city walks", tag: "Coast", summary: "Sea air, old quarters, and a city that stays awake." },
];

export function listingItems(kind: "destinations" | "experiences"): Destination[] {
  if (kind === "destinations") return destinations;
  return destinations.map((d, i) => ({ ...d, ...experienceMeta[i] }));
}
