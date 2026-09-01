"use client";

import * as React from "react";
import { CaretDown } from "./icons";
import { PrimaryButton } from "./Buttons";

const LINKS = [
  { label: "Home", href: "#" },
  { label: "Product", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="relative flex h-12 w-full items-center justify-between text-surface">
      <a href="#" className="on-photo text-2xl font-semibold leading-[29px]">
        Calora
      </a>

      {/* Desktop links */}
      <div className="hidden items-center gap-[226px] md:flex">
        <div className="flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="on-photo text-base font-medium leading-5 text-white transition-colors duration-[180ms] ease-out-soft hover:text-white/80"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            className="on-photo flex items-center gap-1 text-base font-medium leading-5 text-white transition-colors duration-[180ms] ease-out-soft hover:text-white/80"
          >
            Solutions
            <CaretDown size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="on-photo text-base font-medium leading-5 text-white transition-colors duration-[180ms] ease-out-soft hover:text-white/80"
          >
            Log in
          </a>
          <PrimaryButton as="a" href="#" onPhoto>
            Get started for free
          </PrimaryButton>
        </div>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="on-photo flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
      >
        <span
          className={`h-0.5 w-6 bg-white transition-transform duration-[180ms] ease-out-soft ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-opacity duration-[180ms] ease-out-soft ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-transform duration-[180ms] ease-out-soft ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile menu sheet — glass */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-30 mt-8 flex flex-col rounded-[16px] border border-white/45 bg-white/[0.18] p-6 shadow-2xl backdrop-blur-[16px] md:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium leading-5 text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="text-base font-medium leading-5 text-white"
            >
              Log in
            </a>
          </div>
          <PrimaryButton as="a" href="#" fullWidth className="mt-6">
            Get started for free
          </PrimaryButton>
        </div>
      )}
    </nav>
  );
}
