/**
 * Homepage content, transcribed from Figma node 699:2983.
 *
 * Copy, prices and imagery are the designer's placeholders. Swap this module
 * for a CMS or catalogue feed later; the section components read from here only.
 */

export type Collection = {
  slug: string;
  title: string;
  /** Figma splits some descriptions across two colours — see `descriptionAccent`. */
  description: string;
  /** Trailing fragment rendered in gold. Empty when the design uses one colour. */
  descriptionAccent?: string;
  image: string;
  href: string;
};

export const collections: Collection[] = [
  {
    slug: "the-classics",
    title: "The Classics",
    description: "Timeless whites, ",
    descriptionAccent: "forever elegant.",
    image: "/images/collections/the-classics.png",
    href: "/collections/the-classics",
  },
  {
    slug: "the-pastels",
    title: "The Pastels",
    description: "Soft hues, subtle ",
    descriptionAccent: "sophistication.",
    image: "/images/collections/the-pastels.png",
    href: "/collections/the-pastels",
  },
  {
    slug: "the-festive-edit",
    title: "The Festive Edit",
    description: "Celebrate in handcrafted luxury.",
    image: "/images/collections/the-festive-edit.png",
    href: "/collections/the-festive-edit",
  },
];

export type Category = {
  label: string;
  image: string;
  href: string;
  /**
   * Figma nudges some circle crops horizontally/vertically. Expressed as a
   * CSS object-position so the framing matches the design.
   */
  objectPosition?: string;
};

export const categories: Category[] = [
  { label: "Women", image: "/images/categories/women.png", href: "/women" },
  { label: "Men", image: "/images/categories/men.png", href: "/men" },
  {
    label: "Dupattas",
    image: "/images/categories/dupattas.png",
    href: "/dupattas",
  },
  {
    label: "Kurta Sets",
    image: "/images/categories/kurta-sets.png",
    href: "/kurta-sets",
  },
  {
    label: "Menswear",
    image: "/images/categories/menswear.png",
    href: "/menswear",
  },
  {
    label: "Accessories",
    image: "/images/categories/accessories.png",
    href: "/accessories",
  },
];

export type CraftImage = {
  /** Figma layer name, used as the alt text. */
  alt: string;
  image: string;
};

/**
 * Figma 699:3205 — four equal 320x200 tiles, full-bleed, in this order.
 * Extracted from the node's exported SVG, where each tile is a pattern fill
 * (pattern0..3 -> image0..3) painted onto rects at x = 0 / 320 / 640 / 960.
 */
export const craftImages: CraftImage[] = [
  {
    alt: "Artisan embroidering",
    image: "/images/craft/artisan-embroidering.png",
  },
  {
    alt: "Chikankari fabric detail",
    image: "/images/craft/chikankari-fabric-detail.png",
  },
  { alt: "Hands stitching", image: "/images/craft/hands-stitching.png" },
  { alt: "Thread spools", image: "/images/craft/thread-spools.png" },
];

/**
 * Figma 699:3212 — Our Story. Body copy is transcribed verbatim, including the
 * "Banarasi" spelling used in the design's prose (see the note in site.ts;
 * the brand name itself is "Banarsi Das & Sons").
 */
export const ourStory = {
  eyebrow: "Our Story",
  title: "A Legacy of Craft",
  body: "For over six decades, Banarsi Das & Sons has been a custodian of the delicate art of Lucknowi Chikankari. Every piece we create carries the hands of our artisans, the soul of our city, and a legacy that continues to inspire.",
  cta: "DISCOVER OUR JOURNEY  ⟶",
  href: "/our-story",
  /** 699:3223 "Since 1957", 496x275.59. Source is 992x551 — exactly 2x. */
  image: "/images/since-1957.jpg",
  imageAlt: "Since 1957",
} as const;

/** Figma 699:3234 / 699:3242 / 699:3250. */
export const trustBadges = [
  {
    title: "Worldwide Shipping",
    body: "Delivering elegance across the globe.",
  },
  { title: "Secure Payments", body: "Safe, secure & hassle-free checkout." },
  { title: "Customer Care", body: "We're here to help you, always." },
] as const;

/**
 * Figma 699:3295 — four 22x22 bordered buttons, each holding a 12x12 glyph
 * frame (699:3297, 3300, 3303, 3306). The glyph artwork was supplied manually
 * and is inlined in `components/ui/icons`; the source SVGs are kept in
 * public/icons/social/ as the record.
 *
 * The design names every glyph layer just "SVG", so the network each one maps
 * to was read from the artwork itself, and the order matches the buttons left
 * to right. `href` values are still placeholders pending real profile URLs.
 */
export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "YouTube", href: "#" },
] as const;

export type Product = {
  name: string;
  price: string;
  badge?: string;
  image: string;
  href: string;
};

export const newArrivals: Product[] = [
  {
    name: "Ivory Chikankari Kurta Set",
    price: "₹12,500",
    badge: "New",
    image: "/images/products/ivory-chikankari-kurta-set.png",
    href: "/products/ivory-chikankari-kurta-set",
  },
  {
    name: "Pastel Pink Chikankari Kurta Set",
    price: "₹11,800",
    badge: "New",
    image: "/images/products/pastel-pink-chikankari-kurta-set.png",
    href: "/products/pastel-pink-chikankari-kurta-set",
  },
  {
    name: "Sage Green Chikankari Kurta Set",
    price: "₹12,900",
    badge: "New",
    image: "/images/products/sage-green-chikankari-kurta-set.png",
    href: "/products/sage-green-chikankari-kurta-set",
  },
  {
    name: "Sky Blue Chikankari Kurta Set",
    price: "₹12,500",
    badge: "New",
    image: "/images/products/sky-blue-chikankari-kurta-set.png",
    href: "/products/sky-blue-chikankari-kurta-set",
  },
  {
    name: "White Chikankari Short Kurta",
    price: "₹8,900",
    badge: "New",
    image: "/images/products/white-chikankari-short-kurta.png",
    href: "/products/white-chikankari-short-kurta",
  },
];
