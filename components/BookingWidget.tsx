"use client";

import * as React from "react";
import { Clock, CaretLeft, CheckCircle } from "./icons";
import { PrimaryButton } from "./Buttons";

const DURATIONS = ["30 Mins", "1 Hr", "2 Hrs", "3 Hrs"] as const;
type Duration = (typeof DURATIONS)[number];

const AM_SLOTS = ["09:00", "10:00", "11:00", "11:30"];
const PM_SLOTS = ["12:00", "1:00", "2:00", "3:00", "4:00"];

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Cell = { day: number; current: boolean; date: Date };

/** Monday-first month grid with leading/trailing days from adjacent months. */
function buildMonth(year: number, month: number): Cell[] {
  const first = new Date(year, month, 1);
  // JS getDay: 0=Sun..6=Sat -> shift to Monday-first index 0..6
  const lead = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - lead);
  const cells: Cell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push({ day: d.getDate(), current: d.getMonth() === month, date: d });
  }
  // Trim a fully-trailing 6th week if it isn't needed.
  if (cells.slice(35).every((c) => !c.current)) cells.length = 35;
  return cells;
}

function fmt(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function BookingWidget() {
  // Default view: August 2026, with the 28th selected (matches the design).
  const [view, setView] = React.useState({ year: 2026, month: 7 });
  const [duration, setDuration] = React.useState<Duration>("30 Mins");
  const [selected, setSelected] = React.useState<Date>(new Date(2026, 7, 28));
  const [time, setTime] = React.useState<string>("09:00");
  const [confirmed, setConfirmed] = React.useState(false);

  const cells = React.useMemo(
    () => buildMonth(view.year, view.month),
    [view.year, view.month]
  );

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const changeMonth = (delta: number) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  // ---- Glass shell ----
  return (
    <div className="w-full max-w-[634px] rounded-widget bg-white/50 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] backdrop-blur-lg">
      <div className="rounded-widget-inner bg-surface p-4">
        {confirmed ? (
          <Confirmation
            duration={duration}
            date={selected}
            time={time}
            onBack={() => setConfirmed(false)}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Header + service well */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-medium leading-[29px] text-ink">
                  Calora
                </span>
                <div className="h-px w-full bg-hairline" />
              </div>

              <div className="flex min-h-[92px] flex-col justify-center gap-4 rounded-btn bg-well-grey px-5 py-2.5">
                <div className="flex items-center gap-4">
                  <span className="text-base font-medium leading-5 text-ink">
                    Book a consultation with Victory
                  </span>
                  <span className="inline-flex h-6 items-center justify-center rounded-full bg-available px-2.5 text-xs font-normal leading-[15px] text-surface">
                    Available
                  </span>
                </div>

                {/* Duration pills */}
                <div className="flex flex-wrap items-start gap-2">
                  {DURATIONS.map((d) => {
                    const active = d === duration;
                    return (
                      <button
                        key={d}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDuration(d)}
                        className={[
                          "inline-flex h-8 items-center gap-1.5 rounded-full px-3",
                          "text-base font-medium leading-none",
                          "transition-colors duration-[180ms] ease-out-soft",
                          active
                            ? "bg-chip-blue text-surface"
                            : "bg-chip-grey text-ink hover:bg-[#dfe1e4]",
                        ].join(" ")}
                      >
                        <Clock size={14} aria-hidden />
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Calendar + time slots */}
            <div className="flex flex-col gap-8 rounded-btn bg-well-grey p-5 md:flex-row">
              {/* Calendar */}
              <div className="flex w-full flex-col items-center gap-2 md:w-[220px]">
                <div className="flex h-6 w-full items-center justify-center">
                  <div className="flex items-center gap-6 rounded-md px-2 py-0.5">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => changeMonth(-1)}
                      className="text-ink transition-opacity hover:opacity-60"
                    >
                      <CaretLeft size={16} />
                    </button>
                    <span className="min-w-[64px] text-center text-sm font-medium leading-[17px] text-ink">
                      {MONTHS[view.month]}
                    </span>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => changeMonth(1)}
                      className="rotate-180 text-ink transition-opacity hover:opacity-60"
                    >
                      <CaretLeft size={16} />
                    </button>
                  </div>
                </div>

                {/* Weekday header */}
                <div className="grid w-full grid-cols-7 gap-x-2 gap-y-2">
                  {WEEKDAYS.map((w) => (
                    <span
                      key={w}
                      className="flex h-6 items-center justify-center text-sm font-medium leading-[17px] text-mute"
                    >
                      {w}
                    </span>
                  ))}
                  {cells.map((c, i) => {
                    const isSel = c.current && sameDay(c.date, selected);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          if (!c.current) {
                            setView({
                              year: c.date.getFullYear(),
                              month: c.date.getMonth(),
                            });
                          }
                          setSelected(c.date);
                        }}
                        aria-pressed={isSel}
                        className={[
                          "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                          "text-sm font-medium leading-[17px]",
                          "transition-colors duration-[180ms] ease-out-soft",
                          isSel
                            ? "bg-chip-blue text-surface"
                            : c.current
                              ? "text-ink hover:bg-black/5"
                              : "text-mute-2 hover:bg-black/5",
                        ].join(" ")}
                      >
                        {c.day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* vertical rule */}
              <div className="hidden w-px self-stretch bg-hairline md:block" />

              {/* Time slots */}
              <div className="flex w-full flex-col gap-4 md:w-[246px]">
                <span className="text-sm font-medium leading-[17px] text-ink">
                  Time slots
                </span>

                <SlotGroup
                  label="Morning"
                  slots={AM_SLOTS}
                  value={time}
                  onSelect={setTime}
                />
                <SlotGroup
                  label="Afternoon"
                  slots={PM_SLOTS}
                  value={time}
                  onSelect={setTime}
                />
              </div>
            </div>

            {/* Continue */}
            <PrimaryButton fullWidth onClick={() => setConfirmed(true)}>
              Continue
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
}

function SlotGroup({
  label,
  slots,
  value,
  onSelect,
}: {
  label: string;
  slots: string[];
  value: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase leading-3 tracking-wide text-mute">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {slots.map((s) => {
          const active = s === value;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(s)}
              className={[
                "inline-flex h-8 items-center justify-center rounded-full px-3",
                "text-sm font-medium leading-none",
                "transition-colors duration-[180ms] ease-out-soft",
                active
                  ? "bg-chip-blue text-surface"
                  : "bg-chip-grey text-ink hover:bg-[#dfe1e4]",
              ].join(" ")}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Confirmation({
  duration,
  date,
  time,
  onBack,
}: {
  duration: Duration;
  date: Date;
  time: string;
  onBack: () => void;
}) {
  return (
    <div className="flex min-h-[526px] flex-col">
      <div className="flex flex-col gap-3">
        <span className="text-2xl font-medium leading-[29px] text-ink">
          Calora
        </span>
        <div className="h-px w-full bg-hairline" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
        <span className="text-available">
          <CheckCircle size={56} />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold leading-[29px] text-ink">
            You&rsquo;re booked with Victory
          </h3>
          <p className="max-w-[360px] text-base leading-5 text-body">
            We sent a confirmation. That slot is now off the calendar — no
            &ldquo;are we still on?&rdquo; text needed.
          </p>
        </div>

        <div className="w-full max-w-[420px] rounded-btn bg-well-grey px-5 py-4 text-left">
          <Row label="Service">Consultation · {duration}</Row>
          <div className="my-3 h-px w-full bg-hairline" />
          <Row label="When">
            {fmt(date)} · {time}
          </Row>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium leading-[17px] text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
        >
          Pick a different time
        </button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-mute">{label}</span>
      <span className="text-sm font-medium text-ink">{children}</span>
    </div>
  );
}
