import { useEffect, useState } from "react";
import Landing from "./App";
import FleetPage from "./fleet/FleetPage";
import { LegalShell } from "./LegalShell";
import {
  AboutPage,
  ContactPage,
  FaqPage,
  FeedbackPage,
  NotFoundPage,
  PrivacyPage,
  RefundsPage,
  TermsPage,
} from "./pages";
import { usePageMeta, usePath } from "../lib/routing";

export default function Root() {
  const path = usePath();
  const [partner, setPartner] = useState(false);

  if (path === "/") {
    return <HomeRoute partner={partner} onPartnerChange={setPartner} />;
  }

  const Page =
    path === "/about"
      ? AboutPage
      : path === "/contact"
        ? ContactPage
        : path === "/fleet"
          ? FleetPage
        : path === "/faq"
          ? FaqPage
          : path === "/feedback"
            ? FeedbackPage
            : path === "/privacy"
              ? PrivacyPage
              : path === "/refunds"
                ? RefundsPage
                : path === "/terms"
                  ? TermsPage
                  : NotFoundPage;

  return (
    <LegalShell partner={partner} onPartnerChange={setPartner}>
      <Page />
    </LegalShell>
  );
}

function HomeRoute({
  partner,
  onPartnerChange,
}: {
  partner: boolean;
  onPartnerChange: (next: boolean) => void;
}) {
  usePageMeta(
    "PEG | Laundry pickup in Ghana",
    "Book a nearby laundry shop in Ghana. Pay with Mobile Money or card through Paystack after the shop weighs the load. Operated by Falcon Solutions.",
  );

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, []);

  return <Landing partner={partner} onPartnerChange={onPartnerChange} />;
}
