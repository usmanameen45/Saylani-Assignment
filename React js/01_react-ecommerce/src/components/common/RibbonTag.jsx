/**
 * RibbonTag — folded-fabric badge used for discount/label callouts.
 *
 * Props:
 *   children {ReactNode} — label text (e.g. "−15%", "New", "Bestseller")
 */
export default function RibbonTag({ children }) {
  return (
    <span
      className="bg-rose inline-flex items-center px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
      }}
    >
      {children}
    </span>
  );
}
