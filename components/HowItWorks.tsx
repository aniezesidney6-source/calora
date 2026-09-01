"use client";

import * as React from "react";
import { Clock, Alarm, LinkIcon, Calendar, CheckCircle } from "./icons";

type Step = {
  n: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  side: "right" | "left";
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Set when you’re free",
    body: "Mark the hours you take work. The public page hides the rest.",
    icon: <Alarm size={28} />,
    side: "right",
  },
  {
    n: "02",
    title: "Share one URL",
    body: "calora.app/you — bio, invoice, or a Whatsapp reply.",
    icon: <LinkIcon size={28} />,
    side: "left",
  },
  {
    n: "03",
    title: "They pick a time",
    body: "Name, email, done. No account for the client.",
    icon: <Calendar size={28} />,
    side: "right",
  },
  {
    n: "04",
    title: "Show up",
    body: "They book, you both get a note. That slot comes off the calendar.",
    icon: <CheckCircle size={28} />,
    side: "left",
  },
];

// Vertical centre of each step's dot as a fraction of the timeline height.
const DOT_FRAC = [0.125, 0.375, 0.625, 0.875];

function IconTile({ step, done }: { step: Step; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={[
          "flex h-14 w-14 items-center justify-center rounded-[14px]",
          "transition-colors duration-[180ms] ease-out-soft",
          done ? "bg-ink text-surface shadow-tile" : "bg-chip-grey text-ink",
        ].join(" ")}
      >
        {step.icon}
      </div>
      <span className="flex h-7 w-7 items-center justify-center rounded-widget-inner bg-chip-grey font-mono text-[13px] font-semibold leading-[17px] text-ink">
        {step.n}
      </span>
    </div>
  );
}

function TextBlock({ step }: { step: Step }) {
  // side "right" => text sits in the right column (left-aligned).
  // side "left"  => text sits in the left column (right-aligned).
  const right = step.side === "right";
  return (
    <div
      className={`flex w-[300px] max-w-full flex-col gap-2 ${
        right ? "text-left" : "text-right"
      }`}
    >
      <h3 className="text-2xl font-semibold leading-[29px] text-ink">
        {step.title}
      </h3>
      <p className="text-base leading-5 text-body">{step.body}</p>
    </div>
  );
}

export default function HowItWorks({
  head,
}: {
  head: React.ReactNode;
}) {
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);

    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.15 }
    );
    if (timelineRef.current) io.observe(timelineRef.current);

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.55;
      const p = (line - rect.top) / rect.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      mq.removeEventListener("change", onMq);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isDone = (i: number) => {
    if (reduced) return true;
    if (i === 0) return visible;
    return visible && progress >= DOT_FRAC[i];
  };

  // Spine fill: reaches at least the first dot on enter, then follows scroll.
  const fillFrac = reduced
    ? 1
    : visible
      ? Math.max(DOT_FRAC[0], progress)
      : 0;

  return (
    <div className="flex flex-col items-center gap-12">
      {head}

      <div
        ref={timelineRef}
        className="relative mx-auto w-full max-w-[820px]"
      >
        {/* spine (hairline) */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[1.5px] -translate-x-1/2 bg-hairline lg:block" />
        {/* spine fill (ink) — follows scroll */}
        <div
          className="absolute left-1/2 top-0 hidden w-[1.5px] -translate-x-1/2 bg-ink transition-[height] duration-[180ms] ease-out-soft lg:block"
          style={{ height: `${fillFrac * 100}%` }}
        />

        {STEPS.map((step, i) => {
          const done = isDone(i);
          const right = step.side === "right";
          return (
            <div
              key={step.n}
              className="relative grid grid-cols-1 items-center gap-4 py-6 lg:min-h-[149px] lg:grid-cols-2 lg:gap-0 lg:py-0"
            >
              {/* dot on the spine */}
              <span
                className={[
                  "absolute left-1/2 top-1/2 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border lg:block",
                  "transition-colors duration-[180ms] ease-out-soft",
                  done ? "border-hairline bg-ink" : "border-hairline bg-canvas",
                ].join(" ")}
              />

              {/* Mobile: icon-first, left aligned */}
              <div className="flex items-center gap-4 lg:hidden">
                <IconTile step={step} done={done} />
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold leading-[29px] text-ink">
                    {step.title}
                  </h3>
                  <p className="text-base leading-5 text-body">{step.body}</p>
                </div>
              </div>

              {/* Desktop: icon and text on OPPOSITE sides of the spine.
                  Left column hugs the spine (justify-end); right column hugs
                  it too (justify-start). */}
              {right ? (
                <>
                  {/* 01 & 03: icon left of spine, text right of spine */}
                  <div className="hidden lg:col-start-1 lg:flex lg:items-center lg:justify-end lg:pr-12">
                    <IconTile step={step} done={done} />
                  </div>
                  <div className="hidden lg:col-start-2 lg:flex lg:items-center lg:justify-start lg:pl-12">
                    <TextBlock step={step} />
                  </div>
                </>
              ) : (
                <>
                  {/* 02 & 04: text left of spine, icon right of spine */}
                  <div className="hidden lg:col-start-1 lg:flex lg:items-center lg:justify-end lg:pr-12">
                    <TextBlock step={step} />
                  </div>
                  <div className="hidden lg:col-start-2 lg:flex lg:items-center lg:justify-start lg:pl-12">
                    <IconTile step={step} done={done} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
