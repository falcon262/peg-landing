import { useState, type ReactNode } from "react";
import { CONTACT_EMAIL, CONTACT_LOCATION, CONTACT_PHONE, CONTACT_PHONE_TEL, CUSTOMER_APP, PARTNER_APP } from "../config";
import { Link } from "../lib/routing";

type LegalShellProps = {
  partner: boolean;
  onPartnerChange: (next: boolean) => void;
  children: ReactNode;
};

export function LegalShell({ partner, onPartnerChange, children }: LegalShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  const folder = partner ? "partner" : "client";
  const wordmark = partner ? "54739" : "4bcf8";
  const footerMark = partner ? "ba8b3" : "2aa0f";

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#131313]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f8f8f8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <img
              src={`/assets/${folder}/${wordmark}.svg`}
              alt={partner ? PARTNER_APP : CUSTOMER_APP}
              className={partner ? "h-8 w-32 object-contain" : "h-8 w-14 object-contain"}
            />
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#5a5a5a] md:flex">
            <Link href="/#why" className="transition-colors hover:text-[#131313]">
              How it works
            </Link>
            <Link href="/faq" className="transition-colors hover:text-[#131313]">
              FAQ
            </Link>
            <Link href="/#join" className="transition-colors hover:text-[#131313]">
              {partner ? "Apply" : "Join as a shop"}
            </Link>
            <button
              type="button"
              onClick={() => onPartnerChange(!partner)}
              className="rounded-full border border-[#0b5c46]/20 px-3 py-1.5 text-[12px] font-semibold text-[#0b5c46] transition-colors hover:bg-[#0b5c46] hover:text-white"
            >
              {partner ? "Customer site" : "For shops"}
            </button>
          </nav>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xl md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-black/5 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-[14px] font-medium">
              <Link href="/#why" onClick={close}>
                How it works
              </Link>
              <Link href="/faq" onClick={close}>
                FAQ
              </Link>
              <Link href="/#join" onClick={close}>
                {partner ? "Apply" : "Join as a shop"}
              </Link>
              <button
                type="button"
                className="text-left text-[#0b5c46]"
                onClick={() => {
                  onPartnerChange(!partner);
                  close();
                }}
              >
                {partner ? "Customer site" : "For shops"}
              </button>
            </div>
          </div>
        )}
      </header>

      {children}

      <footer className="bg-[#0d0d0d] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
          <div>
            <img
              src={`/assets/${folder}/${footerMark}.svg`}
              alt={partner ? PARTNER_APP : CUSTOMER_APP}
              className={`h-8 object-contain ${partner ? "w-32" : "w-14"}`}
            />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/50">
              Laundry pickup in Ghana. Falcon Solutions operates PEG. You pay after the shop weighs the load, through
              Paystack.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Product</p>
            <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-white/60">
              <Link href="/about" className="hover:text-white">
                About
              </Link>
              <Link href="/#why" className="hover:text-white">
                How it works
              </Link>
              <Link href="/#join" className="hover:text-white">
                Become a partner
              </Link>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Legal</p>
            <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-white/60">
              <Link href="/feedback" className="hover:text-white">
                Customer Feedback
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/refunds" className="hover:text-white">
                Refunds
              </Link>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">Contact</p>
            <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-white/60">
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:text-white">
                {CONTACT_PHONE}
              </a>
              <Link href="/contact" className="hover:text-white">
                Contact page
              </Link>
              <span>{CONTACT_LOCATION}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-5 py-5 text-center text-[11px] text-white/35 md:px-8">
          © {new Date().getFullYear()} {partner ? PARTNER_APP : CUSTOMER_APP}. Operated by Falcon Solutions. Accra,
          Ghana.
        </div>
      </footer>
    </div>
  );
}

type LegalArticleProps = {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
};

export function LegalArticle({ eyebrow, title, updated, children }: LegalArticleProps) {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b5c46]">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
      {updated ? <p className="mt-3 text-[13px] text-[#5a5a5a]">{updated}</p> : null}
      <div className="mt-10">{children}</div>
    </main>
  );
}
