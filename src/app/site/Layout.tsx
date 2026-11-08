import { useEffect, useState, type ReactNode } from "react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "../../config";
import { Link } from "../../lib/routing";
import { wrap } from "./ui";

/* One header and one footer for every PEG page (DESIGN.md). */

const NAV: [string, string][] = [
  ["/how-it-works", "How it works"],
  ["/partner", "PEG Partner"],
  ["/faq", "FAQ"],
  ["/about", "About"],
  ["/fleet", "The PEG trike"],
];

type Cta = "waitlist" | "apply";

function Header({ path, cta }: { path: string; cta: Cta }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const partner = cta === "apply";
  const button = partner ? (
    <a href="#apply" className="inline-flex h-11 items-center rounded-xl bg-green px-5 text-[15px] font-bold text-white transition-colors hover:bg-green-deep">
      Apply as a shop
    </a>
  ) : (
    <a href={path === "/" || path === "/how-it-works" || path === "/about" || path === "/faq" || path === "/fleet" ? "#waitlist" : "/#waitlist"} className="inline-flex h-11 items-center rounded-xl bg-ink px-5 text-[15px] font-bold text-white transition-colors hover:bg-black">
      Join the waitlist
    </a>
  );
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-page/95 backdrop-blur">
      <div className={`${wrap} flex h-[76px] items-center gap-8`}>
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <img src={partner ? "/assets/partner/54739.svg" : "/assets/client/4bcf8.svg"} alt={partner ? "PEG Partner" : "PEG"} className={partner ? "h-9 w-auto" : "h-9 w-[60px]"} />
        </Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`border-b-2 py-1.5 text-[15px] font-semibold transition-colors ${path === href ? (partner ? "border-green text-ink" : "border-yellow text-ink") : "border-transparent text-grey hover:text-ink"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">{button}</div>
        <button
          type="button"
          className="ml-auto grid h-11 w-11 place-items-center rounded-xl ring-1 ring-black/15 lg:hidden"
          aria-expanded={open}
          aria-controls="menu"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>
      {open ? (
        <nav id="menu" aria-label="Main" className="fixed inset-x-0 bottom-0 top-[76px] overflow-auto bg-page px-5 pb-10 pt-4 md:px-10 lg:hidden">
          <Link href="/" className="block border-b border-rule py-4 text-[24px] font-extrabold" onClick={() => setOpen(false)}>
            Home
          </Link>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={`block border-b border-rule py-4 text-[24px] font-extrabold ${path === href ? (partner ? "text-green" : "text-ink underline decoration-yellow decoration-4 underline-offset-8") : ""}`} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="mt-8" onClick={() => setOpen(false)}>
            {button}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function Footer() {
  const col = "flex flex-col gap-2.5 text-[15px] text-white/70";
  const link = "hover:text-white";
  return (
    <footer className="bg-ink text-white">
      <div className={`${wrap} grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12`}>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <img src="/assets/client/2aa0f.svg" alt="PEG" className="h-9 w-[60px]" />
          <p className="text-[24px] font-extrabold tracking-[-0.02em]">Laundry, sorted.</p>
          <p className="max-w-[34ch] text-[15px] leading-6 text-white/70">Laundry pickup for Accra. Coming soon to the App Store and Google Play.</p>
        </div>
        <div className={`${col} lg:col-span-2`}>
          <p className="mb-1 font-bold text-white">PEG</p>
          <Link className={link} href="/how-it-works">How it works</Link>
          <Link className={link} href="/partner">PEG Partner</Link>
          <Link className={link} href="/fleet">The PEG trike</Link>
          <Link className={link} href="/about">About</Link>
        </div>
        <div className={`${col} lg:col-span-2`}>
          <p className="mb-1 font-bold text-white">Help</p>
          <Link className={link} href="/faq">FAQ</Link>
          <Link className={link} href="/feedback">Feedback</Link>
          <Link className={link} href="/contact">Contact</Link>
        </div>
        <div className={`${col} lg:col-span-2`}>
          <p className="mb-1 font-bold text-white">Legal</p>
          <Link className={link} href="/terms">Terms</Link>
          <Link className={link} href="/privacy">Privacy</Link>
          <Link className={link} href="/refunds">Refunds</Link>
        </div>
        <div className={`${col} lg:col-span-2`}>
          <p className="mb-1 font-bold text-white">Contact</p>
          <a className={link} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a className={link} href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a>
          <span>Accra, Ghana</span>
        </div>
      </div>
      <div className={`${wrap} flex flex-wrap justify-between gap-3 border-t border-white/10 py-7 text-[13px] text-white/55`}>
        <span>© {new Date().getFullYear()} PEG. Operated by Falcon Solutions, Accra.</span>
        <span>Payments by Paystack: Mobile Money or card.</span>
      </div>
    </footer>
  );
}

export function PageLayout({ path, cta = "waitlist", children }: { path: string; cta?: Cta; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-page text-ink">
      <a href="#main" className="absolute -top-20 left-4 z-[60] rounded-xl bg-yellow px-4 py-2 font-bold focus:top-3">
        Skip to content
      </a>
      <Header path={path} cta={cta} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
