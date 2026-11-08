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
import { navigate, usePageMeta, usePath } from "../lib/routing";

export default function Root() {
  const path = usePath();
  const [partner, setPartner] = useState(false);

  if (path === "/") {
    // back to the home page from an app route: load the static home
    window.location.replace(window.location.href);
    return null;
  }

  if (path === "/partner") {
    return <PartnerRoute />;
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

function PartnerRoute() {
  usePageMeta(
    "PEG Partner | Run your laundry shop on PEG",
    "PEG Partner is the app for laundry shops in Ghana: take nearby orders, confirm the weight at intake and track your earnings. Operated by Falcon Solutions.",
  );

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) {
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    }
  }, []);

  return <Landing partner onPartnerChange={(next) => navigate(next ? "/partner" : "/")} />;
}
