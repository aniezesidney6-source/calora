import * as React from "react";

type Item =
  | { type: "img"; src: string; alt: string }
  | { type: "text"; label: string; className?: string };

// 8 real logos the user supplied + 2 extra wordmarks.
const ITEMS: Item[] = [
  { type: "img", src: "/logos/cleveland-clinic.svg", alt: "Cleveland Clinic" },
  { type: "img", src: "/logos/optic-eye-clinic.svg", alt: "Optic Eye Clinic" },
  { type: "img", src: "/logos/pandora.svg", alt: "Pandora" },
  { type: "img", src: "/logos/studi.svg", alt: "studi" },
  { type: "text", label: "Maison", className: "font-semibold tracking-tight" },
  { type: "img", src: "/logos/beauty-line.svg", alt: "Beauty Line" },
  { type: "img", src: "/logos/hospital-com.svg", alt: "hospital.com" },
  { type: "text", label: "AURELIA", className: "font-semibold tracking-[0.25em]" },
  { type: "img", src: "/logos/line-beauty-c.svg", alt: "Line Beauty" },
  { type: "img", src: "/logos/aveda.svg", alt: "Aveda" },
];

function LogoItem({ item }: { item: Item }) {
  if (item.type === "text") {
    return (
      <span
        className={`shrink-0 whitespace-nowrap text-[17px] leading-5 text-mute-2 ${
          item.className ?? ""
        }`}
      >
        {item.label}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      className="h-6 w-auto shrink-0 opacity-70 grayscale transition duration-[180ms] ease-out-soft hover:opacity-100 hover:grayscale-0"
      loading="lazy"
      draggable={false}
    />
  );
}

export default function LogoRow() {
  // Duplicate the set so the -50% loop is seamless.
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
      <p className="max-w-[220px] shrink-0 text-lg leading-[22px] text-body">
        Studios that trust and are already booking on Calora.
      </p>

      <div className="marquee-viewport relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14 pr-14">
          {loop.map((item, i) => (
            <LogoItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
