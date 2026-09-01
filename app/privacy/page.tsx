import Link from "next/link";

export const metadata = { title: "Privacy Policy — Calora" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-20">
      <Link
        href="/"
        className="text-sm font-medium text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
      >
        ← Back to Calora
      </Link>
      <h1 className="mt-8 text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-mute">Last updated: 1 September 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-base leading-7 text-body">
        <p>
          Calora is a booking page. This policy explains what we collect and why.
          We keep it short because the product is simple.
        </p>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-ink">What we collect</h2>
          <p>
            Your account details (name, email) and the booking details clients
            leave when they pick a time — a name, an email, and the slot they
            chose. Nothing more is required to send a confirmation.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-ink">How we use it</h2>
          <p>
            To run your booking page: show your open hours, confirm the slot, and
            email both of you a note. We do not sell your data or your clients&rsquo;
            data.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-ink">Your control</h2>
          <p>
            You can export or delete your page and its bookings at any time. Ask
            us and it&rsquo;s done.
          </p>
        </section>
      </div>
    </main>
  );
}
