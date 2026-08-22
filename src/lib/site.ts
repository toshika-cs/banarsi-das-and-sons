/**
 * Single source of truth for brand-level strings and navigation.
 *
 * NOTE: the Figma file is inconsistent — the logo artwork, footer and section
 * name read "Banarsi Das & Sons", while the Our Story body copy (and this
 * repository's name) read "Banarasi". "Banarsi Das & Sons" is the confirmed
 * brand name and is used throughout. This is the only place it is defined.
 */
export const site = {
  name: "Banarsi Das & Sons",
  shortName: "Banarsi Das",
  tagline: "Handcrafted in Lucknow since 1957",
  description:
    "For over six decades, Banarsi Das & Sons has been a custodian of the delicate art of Lucknowi Chikankari — handcrafted kurtas, dupattas and kurta sets made by our artisans in Lucknow.",
  /** Set to the production origin before deploying; drives canonical + OG URLs. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  announcement: "Complimentary shipping on all domestic orders",
} as const;

export const mainNav = [
  { label: "Collections", href: "/collections" },
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Dupattas", href: "/dupattas" },
  { label: "Journal", href: "/journal" },
  { label: "Our Story", href: "/our-story" },
  { label: "Visit Store", href: "/visit-store" },
] as const;

export const footerNav = {
  shop: [
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Dupattas", href: "/dupattas" },
    { label: "Kurta Sets", href: "/kurta-sets" },
    { label: "Accessories", href: "/accessories" },
    { label: "New Arrivals", href: "/new-arrivals" },
  ],
  customerCare: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQs", href: "/faqs" },
    { label: "Store Locator", href: "/stores" },
  ],
  about: [
    { label: "Our Story", href: "/our-story" },
    { label: "Craftsmanship", href: "/craftsmanship" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Journal", href: "/journal" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
