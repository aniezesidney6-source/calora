import Link from "next/link";

export const metadata = { title: "Terms of Service — Calora" };

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-20">
      <Link
        href="/"
        className="text-sm font-medium text-mute underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
      >
        ← Back to Calora
      </Link>
      <h1 className="mt-8 text-4xl font-semibold text-ink">Terms of Service</h1>
      <p className="mt-2 text-sm text-mute">Last updated: 1 September 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-base leading-7 text-body">
        <p>
          By using Calora you agree to these terms. They cover what you can expect
          from us and what we expect from you.
        </p>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-ink">The service</h2>
          <p>
            Calora gives you a booking page at a link you can share. Free plans get
            one page; paid plans add reminders, extra services, and more staff
            pages. We may change features to improve the product.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-ink">Your responsibilities</h2>
          <p>
            Keep your hours accurate and honour the slots clients book. Don&rsquo;t
            use Calora for anything unlawful or to mislead the people booking with
            you.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-ink">Billing</h2>
          <p>
            Paid plans are billed monthly. Cancel any time; your page drops back to
            the free tier at the end of the period.
          </p>
        </section>
      </div>
    </main>
  );
}
