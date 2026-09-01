import * as React from "react";
import Nav from "@/components/Nav";
import BookingWidget from "@/components/BookingWidget";
import LogoRow from "@/components/LogoRow";
import Faq from "@/components/Faq";
import HowItWorks from "@/components/HowItWorks";
import { PrimaryButton, GhostButton } from "@/components/Buttons";
import {
  LinkIcon,
  Clock,
  ClockFill,
  CalendarCheck,
  Package,
  Coins,
  SealQuestion,
  Check,
  XLogo,
  InstagramLogo,
  LinkedinLogo,
  DiscordLogo,
  Copyright,
} from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function Chip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-hairline bg-surface px-3 text-sm font-medium leading-none text-ink">
      <span className="text-ink">{icon}</span>
      {children}
    </span>
  );
}

function SectionHead({
  chipIcon,
  chip,
  title,
  sub,
  align = "center",
}: {
  chipIcon: React.ReactNode;
  chip: string;
  title: string;
  sub: string;
  align?: "center" | "left";
}) {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 ${alignCls}`}>
      <Chip icon={chipIcon}>{chip}</Chip>
      <div className={`flex flex-col gap-3 ${alignCls}`}>
        <h2 className="max-w-[780px] text-[32px] font-semibold leading-tight text-ink sm:text-[40px] lg:text-5xl lg:leading-[59px]">
          {title}
        </h2>
        <p className="max-w-[780px] text-lg leading-[22px] text-body">{sub}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bento card (What you hand them)                                     */
/* ------------------------------------------------------------------ */

function BentoCard({
  n,
  title,
  body,
  icon,
  dark,
  tall,
}: {
  n: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  dark?: boolean;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative isolate flex flex-col justify-between overflow-hidden rounded-close p-5 ${
        dark ? "bg-ink" : "border border-hairline bg-surface"
      } ${tall ? "min-h-[374px]" : "min-h-[177px]"}`}
    >
      <div className="pointer-events-none absolute right-5 top-1/2 -z-10 -translate-y-1/2 text-sand opacity-10">
        {icon}
      </div>
      <span className="font-mono text-[32px] font-medium leading-[42px] text-sand">
        {n}
      </span>
      <div className="flex flex-col gap-2">
        <h3
          className={`text-lg font-semibold leading-[22px] ${
            dark ? "text-surface" : "text-ink"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm font-medium leading-[17px] ${
            dark ? "text-hairline" : "text-body"
          }`}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing card                                                        */
/* ------------------------------------------------------------------ */

function PriceCard({
  tag,
  price,
  cta,
  subline,
  featuresTitle,
  features,
  studio,
}: {
  tag: string;
  price: string;
  cta: string;
  subline: string;
  featuresTitle: string;
  features: string[];
  studio?: boolean;
}) {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-6 rounded-close border border-hairline bg-surface p-3 pb-12">
      {/* price header well */}
      {studio ? (
        <div className="relative isolate flex flex-col gap-4 overflow-hidden rounded-btn p-5">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: "url(/hero.png)" }}
          />
          <div className="absolute inset-0 -z-10 bg-black/10 backdrop-blur-[2px]" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold leading-3 text-surface">
              {tag}
            </span>
            <span className="inline-flex h-[18px] items-center rounded-full bg-available px-2.5 text-[10px] font-semibold leading-3 text-surface">
              Most used
            </span>
          </div>
          <span className="text-[32px] font-bold leading-[39px] text-surface">
            {price}
            <span className="text-base font-medium text-white/80"> / month</span>
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 rounded-btn bg-[#F5F5F4] p-5">
          <span className="text-[11px] font-semibold leading-3 text-ink">
            {tag}
          </span>
          <span className="text-[32px] font-bold leading-[39px] text-ink">
            {price}
            <span className="text-base font-medium text-mute"> / month</span>
          </span>
        </div>
      )}

      <PrimaryButton fullWidth>{cta}</PrimaryButton>

      <p className="text-sm font-medium leading-[17px] text-ink">{subline}</p>

      <div className="h-px w-full bg-hairline" />

      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold leading-[17px] text-ink">
          {featuresTitle}
        </span>
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2">
            <span className="text-body">
              <Check size={16} />
            </span>
            <span className="text-sm font-medium leading-[17px] text-body">
              {f}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <>
    <main className="overflow-x-clip bg-canvas">
      {/* ============================= HERO ============================= */}
      <section className="px-[15px] pt-[15px]">
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[12px] bg-cover bg-center"
            style={{ backgroundImage: "url(/hero.png)" }}
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/hero.png"
              aria-hidden
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 mx-auto max-w-content px-6 pb-[300px] pt-10 lg:px-20 lg:pb-[430px]">
              <Nav />

              <div className="mx-auto mt-16 flex max-w-[786px] flex-col items-center gap-6 text-center lg:mt-24">
                <p className="text-sm font-medium leading-[17px] text-white/70">
                  Booking for people who sell online
                </p>

                <div className="flex flex-col items-center gap-3">
                  <h1 className="flex flex-col items-center text-[40px] font-semibold leading-[1.05] text-surface sm:text-5xl lg:text-[64px] lg:leading-[78px]">
                    <span className="inline-flex items-center gap-3">
                      One link.
                      <LinkIcon size={52} className="hidden sm:block" />
                    </span>
                    <span>Clients Book Themselves.</span>
                  </h1>
                  <p className="max-w-[786px] text-lg leading-6 text-sky-sub lg:text-xl">
                    Share a Calora page. They pick a time that already works for
                    you. You get a confirmed slot, not another &ldquo;are you
                    free Thursday?&rdquo; thread.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <PrimaryButton as="a" href="#" onPhoto>
                    Get started for free
                  </PrimaryButton>
                  <GhostButton as="a" href="#pricing">
                    See a live page
                  </GhostButton>
                </div>

                <p className="text-sm font-medium leading-[17px] text-white/70">
                  Free for one booking page. No card required
                </p>
              </div>
            </div>
          </div>

          {/* Booking widget — 52px below the hero text, overflowing the photo */}
          <div className="relative z-20 -mt-[248px] flex justify-center px-2 pb-4 lg:-mt-[378px]">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* ============================ LOGO ROW ========================= */}
      <section className="mx-auto max-w-content px-6 py-12 lg:px-20 lg:py-16">
        <LogoRow />
      </section>

      {/* ========================== HOW IT WORKS ======================= */}
      <section id="how" className="mx-auto max-w-content px-6 py-16 lg:px-20 lg:py-24">
        <HowItWorks
          head={
            <SectionHead
              chipIcon={<ClockFill size={16} />}
              chip="How it works"
              title="Four steps. Then you send the link."
              sub="Set the hours. Send the link. They pick a time. You show up."
            />
          }
        />
      </section>

      {/* ======================= WHAT YOU HAND THEM ==================== */}
      <section className="mx-auto max-w-content px-6 py-16 lg:px-20 lg:py-24">
        <div className="flex flex-col items-center gap-12">
          <SectionHead
            chipIcon={<Package size={16} />}
            chip="What you get"
            title="What you hand them."
            sub="Hours they can see. A note they can keep. One link you reuse."
          />

          <div className="grid w-full max-w-[1084px] grid-cols-1 gap-5 lg:grid-cols-2">
            <BentoCard
              n="01"
              title="Your Hours"
              body="You mark when you’re free. They never see a closed day."
              icon={<Clock size={150} />}
              dark
              tall
            />
            <div className="flex flex-col gap-5">
              <BentoCard
                n="02"
                title="A Reminder"
                body={
                  "Both of you get the time in writing. The “are we still on?” text stops."
                }
                icon={<CalendarCheck size={100} />}
              />
              <BentoCard
                n="03"
                title="Your Link"
                body="One URL. Bio, invoice, WhatsApp. Same page every time."
                icon={<LinkIcon size={100} />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ PRICING ========================== */}
      <section id="pricing" className="mx-auto max-w-content px-6 py-16 lg:px-20 lg:py-24">
        <div className="flex flex-col items-center gap-12">
          <SectionHead
            chipIcon={<Coins size={16} />}
            chip="Pricing"
            title="One link. Three plans."
            sub="Start free. Pay when the book fills up."
          />

          <div className="flex w-full max-w-[907px] flex-col items-center justify-center gap-5 lg:flex-row lg:items-stretch">
            <PriceCard
              tag="FREE PLAN"
              price="₦0"
              cta="Get your link"
              subline="For a single chair."
              featuresTitle="Free includes:"
              features={["One booking page.", "Your hours.", "Email confirmations."]}
            />
            <PriceCard
              studio
              tag="STUDIO"
              price="₦6,500"
              cta="Start Studio"
              subline="For a book that stays full."
              featuresTitle="Everything in Free, plus:"
              features={["Reminders", "Extra services", "Custom slug"]}
            />
            <PriceCard
              tag="HOUSE"
              price="₦14,500"
              cta="Start House"
              subline="For a floor with more than one chair."
              featuresTitle="Everything in Studio, plus:"
              features={["Two extra staff pages", "Shared hours", "One floor book"]}
            />
          </div>
        </div>
      </section>

      {/* ============================== FAQ ============================ */}
      <section id="faq" className="mx-auto max-w-content px-6 py-16 lg:px-20 lg:py-24">
        <div className="mx-auto flex max-w-[1199px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-[100px]">
          <div className="flex w-full flex-col gap-12 lg:w-[460px] lg:shrink-0 lg:gap-[71px]">
            <SectionHead
              chipIcon={<SealQuestion size={16} />}
              chip="Questions"
              title="Before you send the link."
              sub="The things people ask before they switch off WhatsApp."
              align="left"
            />
            <div className="flex w-[328px] max-w-full flex-col gap-6 rounded-card bg-faq-card p-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold leading-[29px] text-ink">
                  Still have a question?
                </h3>
                <p className="text-base leading-5 text-body">
                  Send the link first. If the page isn&rsquo;t right, write us.
                </p>
              </div>
              <PrimaryButton as="a" href="#" className="w-fit">
                Get in touch
              </PrimaryButton>
            </div>
          </div>

          <div className="w-full lg:w-[639px]">
            <Faq />
          </div>
        </div>
      </section>

      {/* ============================= CLOSE =========================== */}
      <section className="mx-auto max-w-content px-6 py-8 lg:px-20 lg:py-12">
        <div
          className="relative isolate flex min-h-[420px] items-center justify-center overflow-hidden rounded-close bg-cover bg-center px-6 text-center"
          style={{ backgroundImage: "url(/close.png)" }}
        >
          <div className="absolute inset-0 z-0 bg-black/10 backdrop-blur-[10px]" />
          {/* grain / texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "160px 160px",
            }}
          />
          <div className="relative z-10 flex w-[484px] max-w-full flex-col items-center gap-7 p-5">
            <div className="flex max-w-[444px] flex-col items-center gap-3 [filter:drop-shadow(0_4px_18px_rgba(0,0,0,0.25))]">
              <h2 className="text-[32px] font-semibold leading-tight text-surface sm:text-5xl sm:leading-[59px]">
                Send the link.
              </h2>
              <p className="text-lg font-medium leading-[22px] text-surface [text-shadow:0_4px_100px_rgba(0,0,0,0.5)]">
                Set the hours. Share{" "}
                <span className="underline decoration-white decoration-1 underline-offset-2">
                  calora.app/you
                </span>
                . They pick a time.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <PrimaryButton as="a" href="#" onPhoto>
                Get your link
              </PrimaryButton>
              <GhostButton as="a" href="#pricing">
                See pricing
              </GhostButton>
            </div>
          </div>
        </div>
      </section>

    </main>

    {/* ============================ FOOTER ========================== */}
    <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-base font-semibold leading-5 text-surface">
        {heading}
      </span>
      <div className="flex flex-col gap-2.5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-base leading-5 text-mute transition-colors duration-[180ms] ease-out-soft hover:text-white/80"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto flex max-w-content flex-col gap-16 px-6 py-10 lg:px-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="flex flex-col gap-4">
            <span className="text-[32px] font-medium leading-[39px] text-surface">
              Calora
            </span>
            <div className="flex items-center gap-4 text-surface">
              <a href="#" aria-label="X" className="transition-opacity hover:opacity-70">
                <XLogo size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-70">
                <InstagramLogo size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition-opacity hover:opacity-70">
                <LinkedinLogo size={24} />
              </a>
              <a href="#" aria-label="Discord" className="transition-opacity hover:opacity-70">
                <DiscordLogo size={24} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-12">
            <FooterCol
              heading="Product"
              links={[
                { label: "How it works", href: "#how" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ]}
            />
            <FooterCol
              heading="Account"
              links={[
                { label: "Get your link", href: "#" },
                { label: "Sign in", href: "#" },
              ]}
            />
            <FooterCol
              heading="Legal"
              links={[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookies Settings", href: "#" },
              ]}
            />
          </div>
        </div>

        <div className="h-px w-full bg-mute/20" />

        <div className="flex items-center gap-1 text-mute">
          <Copyright size={20} />
          <span className="text-base leading-5">2026 Calora</span>
        </div>
      </div>
    </footer>
  );
}
