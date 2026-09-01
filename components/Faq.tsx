"use client";

import * as React from "react";
import { Plus } from "./icons";

const ITEMS = [
  {
    q: "Do clients need an account?",
    a: "No. They open the link, pick a time, leave a name and email.",
  },
  {
    q: "What if I need a Tuesday off?",
    a: "Close the day on your hours. It simply stops showing as available — clients never see a blocked date.",
  },
  {
    q: "Does Calora take a cut?",
    a: "No. Your plan is a flat monthly fee. What clients pay you is yours.",
  },
  {
    q: "Can I use my own domain later?",
    a: "Yes. Start on calora.app/you and point a custom domain at your page whenever you're ready.",
  },
  {
    q: "What happens if they don't show?",
    a: "You both got the note in writing, and the slot was held. Reopen it in a tap if it frees up.",
  },
];

export default function Faq() {
  const [open, setOpen] = React.useState(0);

  return (
    <div className="flex w-full flex-col">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-hairline">
            {/* padding: 24px; content row inset 24px, divider full width */}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className={`flex w-full items-center justify-between gap-6 px-6 pt-6 text-left ${
                isOpen ? "pb-3" : "pb-6"
              }`}
            >
              <span className="text-base font-semibold leading-5 text-ink">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-ink transition-transform duration-[180ms] ease-out-soft ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <Plus size={24} />
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-[180ms] ease-out-soft"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-base leading-5 text-body">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
