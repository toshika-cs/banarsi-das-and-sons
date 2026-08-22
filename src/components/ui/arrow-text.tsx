/**
 * Splits a Figma CTA string such as `"DISCOVER THE STORY  ⟶"` so the trailing
 * arrow can move independently on hover.
 *
 * The characters are passed through unchanged — including the two spaces the
 * design uses before the arrow — so the rendered width is identical to the
 * plain string. Pair with the `arrow-link` class on the link itself.
 */
export function ArrowText({ children }: { children: string }) {
  const i = children.lastIndexOf("⟶");
  if (i === -1) return <>{children}</>;

  return (
    <>
      {children.slice(0, i)}
      <span className="arrow">{children.slice(i)}</span>
    </>
  );
}
