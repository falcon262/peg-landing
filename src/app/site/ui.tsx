import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT_EMAIL } from "../../config";
import { Link } from "../../lib/routing";

/* Shared parts of the PEG site (DESIGN.md). Every page is built from these. */

export const wrap = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-20";

type Tone = "ink" | "green" | "yellow" | "white" | "line" | "line-light";
const tones: Record<Tone, string> = {
  ink: "bg-ink text-white hover:bg-black",
  green: "bg-green text-white hover:bg-green-deep",
  yellow: "bg-yellow text-ink hover:bg-yellow-deep",
  white: "bg-white text-green hover:bg-mint",
  line: "border-[1.5px] border-ink/30 text-ink hover:border-ink",
  "line-light": "border-[1.5px] border-white/40 text-white hover:border-white",
};
const btnBase =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 text-[16px] font-bold transition-colors active:translate-y-px";

export function Button({ href, tone = "ink", children }: { href: string; tone?: Tone; children: ReactNode }) {
  const cls = `${btnBase} ${tones[tone]}`;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const cls = "group inline-flex items-center gap-1.5 font-bold underline decoration-2 underline-offset-[6px] decoration-current/25 hover:decoration-current";
  const arrow = <span className="transition-transform group-hover:translate-x-0.5">→</span>;
  return href.startsWith("http") || href.startsWith("#") ? (
    <a href={href} className={cls}>
      {children}
      {arrow}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}

export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex h-8 items-center rounded-full px-3.5 text-[13px] font-semibold ${
        tone === "light" ? "bg-white text-ink" : "bg-white/12 text-white ring-1 ring-white/25"
      }`}
    >
      {children}
    </span>
  );
}

export function Section({ id, tone = "page", children, label }: { id?: string; tone?: "page" | "white" | "cream" | "mint" | "navy" | "ink"; children: ReactNode; label?: string }) {
  const bg = { page: "bg-page", white: "bg-white", cream: "bg-cream", mint: "bg-mint", navy: "bg-navy text-white", ink: "bg-ink text-white" }[tone];
  return (
    <section id={id} aria-label={label} className={`${bg} py-16 md:py-24`}>
      <div className={wrap}>{children}</div>
    </section>
  );
}

export function SectionHead({ title, intro, light }: { title: ReactNode; intro?: ReactNode; light?: boolean }) {
  return (
    <div className="mb-10 grid gap-4 md:mb-14 lg:grid-cols-12 lg:gap-6">
      <h2 className="text-[30px] font-extrabold leading-[36px] tracking-[-0.025em] md:text-[44px] md:leading-[50px] lg:col-span-6">{title}</h2>
      {intro ? (
        <p className={`text-[17px] leading-7 lg:col-span-5 lg:col-start-8 lg:pt-2 ${light ? "text-white/75" : "text-grey"}`}>{intro}</p>
      ) : null}
    </div>
  );
}

/* a real PEG app screen in a phone frame */
export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`w-[230px] shrink-0 rounded-[38px] bg-ink p-[7px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="aspect-[402/874] w-full rounded-[31px] object-cover object-top" />
    </div>
  );
}

/* the signature: the rider travels the road and settles at the door */
export function RouteCard({ title = "Your rider is on the way", line = "Follow PEG riders live in the app." }: { title?: string; line?: string }) {
  return (
    <div className="w-[270px] rounded-3xl bg-white p-4 text-ink shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)]" aria-hidden="true">
      <svg viewBox="0 0 240 170" className="h-auto w-full rounded-2xl bg-[#eef0e8]">
        <g stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round">
          <path d="M0 92 H240" />
          <path d="M132 0 V170" />
          <path d="M26 0 V170" />
          <path d="M0 28 H240" />
          <path d="M190 28 V170" />
        </g>
        <path d="M 26 150 L 26 104 Q 26 92 38 92 L 120 92 Q 132 92 132 80 L 132 40 Q 132 28 144 28 L 214 28" stroke="#16276b" strokeOpacity=".18" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path className="peg-trail" pathLength={1} d="M 26 150 L 26 104 Q 26 92 38 92 L 120 92 Q 132 92 132 80 L 132 40 Q 132 28 144 28 L 214 28" stroke="#16276b" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="214" cy="28" r="9" fill="#f2cc44" stroke="#131313" strokeWidth="2.5" />
        <g className="peg-rider">
          <circle r="11" fill="#16276b" />
          <path d="M-5 2 h10 M-2 -4 l3 6 M3 -4 h2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
      </svg>
      <p className="mt-3 text-[15px] font-bold">{title}</p>
      <p className="text-[13px] text-grey">{line}</p>
    </div>
  );
}

export function Steps({ items, accent = "yellow" }: { items: [string, string][]; accent?: "yellow" | "green" }) {
  const cols = items.length === 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
      {items.map(([title, text], i) => (
        <li key={title} className="flex flex-col gap-3 rounded-3xl bg-white p-6 ring-1 ring-rule">
          <span className={`grid h-9 w-9 place-items-center rounded-full text-[15px] font-extrabold ${accent === "yellow" ? "bg-yellow text-ink" : "bg-green text-white"}`}>{i + 1}</span>
          <h3 className="text-[20px] font-bold leading-7 tracking-[-0.01em]">{title}</h3>
          <p className="text-[15px] leading-6 text-grey">{text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Facts({ items, light }: { items: [string, string][]; light?: boolean }) {
  return (
    <ul className={`border-t ${light ? "border-white/15" : "border-rule"}`}>
      {items.map(([a, b]) => (
        <li key={a} className={`grid gap-1 border-b py-3 text-[16px] leading-6 sm:grid-cols-[150px_1fr] sm:gap-4 ${light ? "border-white/15" : "border-rule"}`}>
          <span className={light ? "text-white/70" : "text-grey"}>{a}</span>
          <span className="font-semibold">{b}</span>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div>
      {items.map(([q, a]) => (
        <details key={q} className="group border-t border-rule last:border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-bold leading-7 md:text-[20px] [&::-webkit-details-marker]:hidden">
            {q}
            <span className="relative h-4 w-4 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">
              <span className="absolute left-0 top-[7px] h-[2px] w-4 bg-current" />
              <span className="absolute left-[7px] top-0 h-4 w-[2px] bg-current" />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-[16px] leading-7 text-grey">{a}</p>
        </details>
      ))}
    </div>
  );
}

/* a form that opens an email to Falcon with the details filled in (there is no form service yet) */
type Field = { name: string; label: string; type?: string; autoComplete?: string; error: string; wide?: boolean };
export function MailForm({ fields, subject, button, tone, note }: { fields: Field[]; subject: string; button: string; tone: "ink" | "green"; note: string }) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, boolean> = {};
    for (const f of fields) {
      const v = String(data.get(f.name) || "").trim();
      next[f.name] = f.type === "email" ? !/\S+@\S+\.\S+/.test(v) : v === "";
    }
    setErrors(next);
    const firstBad = fields.find((f) => next[f.name]);
    if (firstBad) {
      (event.currentTarget.elements.namedItem(firstBad.name) as HTMLInputElement | null)?.focus();
      return;
    }
    const body = fields.map((f) => `${f.label}: ${data.get(f.name)}`).join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
          <label htmlFor={`f-${f.name}`} className="mb-2 block text-[14px] font-semibold">
            {f.label}
          </label>
          <input
            id={`f-${f.name}`}
            name={f.name}
            type={f.type || "text"}
            autoComplete={f.autoComplete}
            aria-invalid={errors[f.name] || undefined}
            aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
            className={`h-12 w-full rounded-xl border bg-white px-4 text-[16px] outline-none focus:border-ink focus:ring-2 focus:ring-yellow ${errors[f.name] ? "border-2 border-[#b42318]" : "border-[#d4d4d4]"}`}
          />
          {errors[f.name] ? (
            <p id={`e-${f.name}`} className="mt-1.5 text-[14px] text-[#b42318]">
              {f.error}
            </p>
          ) : null}
        </div>
      ))}
      <div className="sm:col-span-2">
        <button type="submit" className={`${btnBase} ${tones[tone]}`}>
          {button}
        </button>
      </div>
      <p className="text-[14px] leading-5 text-grey sm:col-span-2" role="status">
        {sent ? `Your email app should open with the details filled in. If it does not, write to ${CONTACT_EMAIL}.` : note}
      </p>
    </form>
  );
}

export function WaitlistBand() {
  return (
    <section id="waitlist" aria-labelledby="waitlist-h" className="bg-yellow py-16 md:py-24">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-12`}>
        <div className="flex flex-col items-start gap-5 lg:col-span-5">
          <Pill>Coming soon to Accra</Pill>
          <h2 id="waitlist-h" className="text-[34px] font-extrabold leading-[40px] tracking-[-0.03em] md:text-[52px] md:leading-[56px]">
            Your next laundry day? Peg it!
          </h2>
          <p className="text-[18px] leading-7">Join the waitlist and we email you when PEG is in the App Store and Google Play.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.4)] md:p-8 lg:col-span-6 lg:col-start-7">
          <MailForm
            subject="PEG waitlist"
            button="Join the waitlist"
            tone="ink"
            note={`This opens an email to ${CONTACT_EMAIL}. We write once, when the apps are out.`}
            fields={[
              { name: "name", label: "Name", autoComplete: "name", error: "Write your name." },
              { name: "neighbourhood", label: "Neighbourhood", autoComplete: "address-level3", error: "Write the part of Accra you live in." },
              { name: "email", label: "Email", type: "email", autoComplete: "email", error: "Write an email address, like name@example.com.", wide: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* the band at the top of every page: yellow for customers, green for partners */
export function Hero({ tone = "yellow", pill, title, lead, actions, note, visual }: { tone?: "yellow" | "green"; pill: string; title: ReactNode; lead: ReactNode; actions: ReactNode; note?: string; visual: ReactNode }) {
  const dark = tone === "green";
  return (
    <section className={`${dark ? "bg-green text-white" : "bg-yellow text-ink"} overflow-hidden`}>
      <div className={`${wrap} grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-6`}>
        <div className="flex flex-col items-start gap-6 lg:col-span-6">
          <Pill tone={dark ? "dark" : "light"}>{pill}</Pill>
          <h1 className="text-[44px] font-extrabold leading-[48px] tracking-[-0.035em] md:text-[76px] md:leading-[80px]">{title}</h1>
          <p className={`max-w-[34ch] text-[18px] leading-7 md:text-[20px] md:leading-[31px] ${dark ? "text-white/85" : ""}`}>{lead}</p>
          <div className="flex flex-wrap gap-3">{actions}</div>
          {note ? <p className={`text-[14px] ${dark ? "text-white/75" : "text-ink/70"}`}>{note}</p> : null}
        </div>
        <div className="relative flex justify-center lg:col-span-6">{visual}</div>
      </div>
    </section>
  );
}

/* the band at the top of a content page (FAQ, legal, contact): the same yellow, no picture */
export function PageHeader({ pill, title, lead, tone = "yellow" }: { pill: string; title: ReactNode; lead?: ReactNode; tone?: "yellow" | "green" }) {
  return (
    <section className={tone === "green" ? "bg-green text-white" : "bg-yellow text-ink"}>
      <div className={`${wrap} flex flex-col items-start gap-5 py-14 md:py-20`}>
        <Pill tone={tone === "green" ? "dark" : "light"}>{pill}</Pill>
        <h1 className="max-w-[18ch] text-[40px] font-extrabold leading-[44px] tracking-[-0.035em] md:text-[64px] md:leading-[68px]">{title}</h1>
        {lead ? <p className="max-w-[52ch] text-[18px] leading-7 md:text-[20px] md:leading-[31px]">{lead}</p> : null}
      </div>
    </section>
  );
}

export function LegalArticle({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated?: string; children: ReactNode }) {
  return (
    <>
      <PageHeader pill={eyebrow} title={title} lead={updated} />
      <article className={`${wrap} py-14 md:py-20`}>
        <div className="max-w-[720px]">{children}</div>
      </article>
    </>
  );
}

/* a phone (or two) on a soft panel: the visual of a feature split */
export function PhonePanel({ tone = "cream", children }: { tone?: "cream" | "mint" | "white"; children: ReactNode }) {
  const bg = { cream: "bg-cream", mint: "bg-mint", white: "bg-white ring-1 ring-rule" }[tone];
  return <div className={`flex items-end justify-center gap-5 overflow-hidden rounded-3xl px-6 pt-10 ${bg} [&>div]:mb-[-48px]`}>{children}</div>;
}

export function Split({ flip, visual, children }: { flip?: boolean; visual: ReactNode; children: ReactNode }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
      <div className={`flex flex-col gap-5 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>{children}</div>
      <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>{visual}</div>
    </div>
  );
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return <h2 id={id} className="text-[30px] font-extrabold leading-[36px] tracking-[-0.025em] md:text-[44px] md:leading-[50px]">{children}</h2>;
}
