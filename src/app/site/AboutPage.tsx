import { CONTACT_EMAIL } from "../../config";
import { usePageMeta } from "../../lib/routing";
import { Button, Facts, H2, Hero, Section, SectionHead, Split, WaitlistBand } from "./ui";

export default function AboutPage() {
  usePageMeta("About PEG | Laundry pickup in Accra", "PEG is a laundry pickup app for Accra, operated by Falcon Solutions: one place for customers, neighbourhood laundry shops and PEG riders.");
  return (
    <>
      <Hero
        pill="About PEG"
        title="A better way to bring laundry together."
        lead="PEG is a laundry pickup app for Accra, operated by Falcon Solutions. One place for you, neighbourhood laundry shops and PEG riders."
        actions={<Button href="#waitlist">Join the waitlist</Button>}
        note="App Store and Google Play: coming soon."
        visual={<img src="/assets/photos/folded.jpg" alt="Freshly folded shirts and trousers in a stack" className="aspect-[4/3] w-full max-w-[560px] rounded-3xl object-cover object-[50%_40%]" />}
      />

      <Section>
        <SectionHead title="Three parts. One laundry day." intro="PEG connects the people who make laundry day work, so each part stays simple." />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["/assets/client/c9ac7.svg", "For customers", "Choose a vetted shop that serves your area, track your rider and pay in the app."],
            ["/assets/partner/116f6.svg", "For laundry shops", "Take nearby orders, request pickups, confirm the weight at intake and see your earnings."],
            ["/assets/client/beb53.svg", "For the hand-over", "PEG riders connect pickups and returns. A 4-digit code completes the hand-over."],
          ].map(([icon, title, text]) => (
            <article key={title} className="rounded-3xl bg-white p-7 ring-1 ring-rule">
              <img src={icon} alt="" className="h-8 w-8" />
              <h3 className="mt-5 text-[20px] font-bold">{title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-grey">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <Split visual={<img src="/assets/photos/shop-folding.jpg" alt="A laundry shop owner folding a shirt" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover" />}>
          <H2>Who we are</H2>
          <p className="text-[17px] leading-7 text-grey">Falcon Solutions builds and operates PEG and PEG Partner from Accra. We are the merchant of record for customer checkout. The shops on PEG are independent businesses, and we settle them separately from the Paystack charge you make in the app.</p>
          <Facts
            items={[
              ["Wallets", "We hold no customer or shop wallets"],
              ["Transfers", "We move no money between users"],
              ["Saved methods", "Labels only; cards and MoMo stay with Paystack"],
            ]}
          />
        </Split>
      </Section>

      <Section>
        <Split flip visual={<img src="/assets/photos/rider-door.jpg" alt="A PEG rider handing folded laundry to a customer at her door" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover object-[50%_30%]" />}>
          <H2>Accra is where this starts</H2>
          <p className="text-[17px] leading-7 text-grey">PEG riders collect your clothes, take them to the shop and bring them back. Falcon staff approve each rider and each shop before they can take PEG orders.</p>
          <p className="text-[17px] leading-7 text-grey">Questions about PEG or shop applications go to {CONTACT_EMAIL}.</p>
          <div className="flex flex-wrap gap-3">
            <Button href="/partner" tone="green">
              Apply as a shop
            </Button>
            <Button href="/contact" tone="line">
              Contact us
            </Button>
          </div>
        </Split>
      </Section>

      <WaitlistBand />
    </>
  );
}
