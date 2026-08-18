import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * AccordionItem — collapsible accordion panel.
 *
 * Props:
 *   title       {string}    — panel header label
 *   children    {ReactNode} — panel body content
 *   defaultOpen {boolean}   — whether the panel is open by default
 */
export default function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `accordion-panel-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="border-b border-hair transition-colors duration-300">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-ink flex w-full items-center justify-between py-4 text-left text-[13px] font-medium uppercase tracking-[0.08em] cursor-pointer"
        aria-expanded={open}
        aria-controls={panelId}
      >
        {title}
        <ChevronDown
          className={`text-stone h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="text-stone pb-4 text-[13.5px] leading-relaxed transition-colors duration-300"
        >
          {children}
        </div>
      )}
    </div>
  );
}
