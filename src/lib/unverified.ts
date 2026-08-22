/**
 * UNVERIFIED STYLE VALUES — correct these once Figma access is restored.
 *
 * The Figma account hit its Starter-plan MCP call limit partway through this
 * build, so `get_design_context` was unavailable for the Our Story block
 * (699:3212) and the footer (699:3258). Everything in this file is an
 * inference drawn from the nearest established pattern elsewhere in the design.
 *
 * What is NOT in this file is measured, not guessed:
 *   - all geometry (positions, sizes, gaps, alignment) comes from layer
 *     metadata captured before the limit was reached;
 *   - font sizes were tuned until rendered text width matched the width Figma
 *     records for each text node (see each section's comments);
 *   - the Our Story and footer backgrounds (#fcfaf3) were sampled from the
 *     full-page Figma render, calibrated against the known #e9e0d2 CTA band;
 *   - the CTA band and trust badges (699:3224) and the legal bar (699:3362)
 *     were fully retrieved and are exact.
 *
 * To correct: read the node in Figma, replace the token here, delete the entry.
 */
export const unverified = {
  /** 699:3211 — shares the section eyebrow's type spec, so likely its colour. */
  craftCtaColor: "text-gold-600 hover:text-gold-700",

  /** 699:3215 — matches the four section eyebrows elsewhere. */
  ourStoryEyebrowColor: "text-gold-600",
  /** 699:3217 — matches every other display heading. */
  ourStoryTitleColor: "text-ink-800",
  /** 699:3219 — matches the trust-badge body copy (11px / 20.9px leading). */
  ourStoryBodyColor: "text-ink-200",
  /** 699:3221 — matches the hero's standalone gold CTA. */
  ourStoryCtaColor: "text-gold-700 hover:text-gold-500",

  /** 699:3310 / 3325 / 3340 / 3353 — small-caps column headings. */
  footerHeadingColor: "text-gold-600",
  /** 699:3312 and siblings — footer link colour. */
  footerLinkColor: "text-ink-200",
  /** 699:3355 — newsletter blurb. */
  footerBodyColor: "text-ink-200",
  /** 699:3356 — newsletter field border. */
  newsletterBorderColor: "border-sand-400",
} as const;
