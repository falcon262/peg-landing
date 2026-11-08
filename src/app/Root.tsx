import { useEffect, type ComponentType } from "react";
import FleetPage from "./fleet/FleetPage";
import { ContactPage, FaqPage, FeedbackPage, NotFoundPage, PrivacyPage, RefundsPage, TermsPage } from "./pages";
import AboutPage from "./site/AboutPage";
import HomePage from "./site/HomePage";
import HowItWorksPage from "./site/HowItWorksPage";
import { PageLayout } from "./site/Layout";
import PartnerPage from "./site/PartnerPage";
import { usePath } from "../lib/routing";

/* Every route renders inside one PageLayout: the same header and footer on every page (DESIGN.md). */
const ROUTES: Record<string, ComponentType> = {
  "/": HomePage,
  "/how-it-works": HowItWorksPage,
  "/partner": PartnerPage,
  "/about": AboutPage,
  "/faq": FaqPage,
  "/fleet": FleetPage,
  "/contact": ContactPage,
  "/feedback": FeedbackPage,
  "/terms": TermsPage,
  "/privacy": PrivacyPage,
  "/refunds": RefundsPage,
};

export default function Root() {
  const path = usePath();
  const Page = ROUTES[path] ?? NotFoundPage;

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <PageLayout path={path} cta={path === "/partner" ? "apply" : "waitlist"}>
      <Page />
    </PageLayout>
  );
}
