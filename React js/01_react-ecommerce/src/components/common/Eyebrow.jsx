/**
 * Eyebrow — small all-caps label placed above headings.
 *
 * Props:
 *   children {ReactNode} — label text
 *   dark     {boolean}   — use light colour for dark backgrounds
 */
export default function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${
        dark ? "text-[#D8B8A9]" : "text-rose"
      }`}
    >
      {children}
    </p>
  );
}
