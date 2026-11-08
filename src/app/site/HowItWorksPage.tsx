import { usePageMeta } from "../../lib/routing";
import { Button, Facts, H2, Hero, Phone, PhonePanel, RouteCard, Section, SectionHead, Split, WaitlistBand } from "./ui";

const STEPS: { title: string; text: string; facts: [string, string][]; src: string; alt: string }[] = [
  {
    title: "Choose a shop that serves you",
    text: "Book a vetted laundry shop near you. Only shops whose service area reaches your address appear, so start with your neighbourhood.",
    facts: [["Services", "Wash & Fold, Dry Clean, Iron Only, Bedding"], ["Prices", "By weight or per item, itemised"], ["Handover", "Pickup or drop-off"]],
    src: "/assets/app/feed.png",
    alt: "The PEG app home screen with laundry shops near you",
  },
  {
    title: "A PEG rider comes to you",
    text: "Your PEG rider collects your clothes and takes them to the shop. Follow them live on the map in the app.",
    facts: [["Riders", "Approved by Falcon Solutions"], ["Delivery", "Priced by road distance"], ["Or", "Drop off at the shop yourself"]],
    src: "/assets/app/orders.png",
    alt: "Your PEG orders: active pickups and recent history",
  },
  {
    title: "The shop weighs your load",
    text: "At intake, the shop weighs your clothes. The weight and the fee appear on your order before any washing starts.",
    facts: [["Weighed", "At the shop, at intake"], ["Shown", "Weight and fee on your order"], ["Example", "4.2 kg, GH₵ 42.00 (illustrative)"]],
    src: "/assets/app/tracking.png",
    alt: "The order timeline showing the final weight and fee",
  },
  {
    title: "Pay in the app. No wallet needed.",
    text: "Pay with Mobile Money or card through Paystack. PEG keeps no balance for you; your cards and MoMo stay with Paystack.",
    facts: [["Methods", "Mobile Money or card"], ["Through", "Paystack"], ["Wallet", "None, by design"]],
    src: "/assets/app/payment.png",
    alt: "Choosing MTN Mobile Money to pay for a PEG order",
  },
  {
    title: "Clothes back. Code shared. Sorted.",
    text: "When your clothes come back, give your PEG rider your 4-digit code. The app keeps you posted at every step.",
    facts: [["Hand-over", "Your 4-digit code"], ["Updates", "At every step of the order"], ["Help", "In-app support or email"]],
    src: "/assets/app/updates.png",
    alt: "PEG notifications: your clothes are ready, your payment is confirmed",
  },
];

export default function HowItWorksPage() {
  usePageMeta("How PEG works | Laundry pickup in Accra", "Five steps from your laundry pile to the hand-over: choose a shop, meet your rider, see the weight and fee, pay in the app, get it back.");
  return (
    <>
      <Hero
        pill="How it works"
        title="A little tap. A clear plan."
        lead="Five steps from your laundry pile to the hand-over. Here is how PEG connects you, your shop and your rider."
        actions={<Button href="#waitlist">Join the waitlist</Button>}
        note="App Store and Google Play: coming soon."
        visual={
          <div className="relative flex items-end pb-6">
            <Phone src="/assets/app/welcome.png" alt="The PEG app welcome screen: fresh laundry, delivered to your door" />
            <div className="absolute -left-6 bottom-0 hidden md:block lg:-left-24">
              <RouteCard title="Rider on the way" line="Collected, then straight to the shop." />
            </div>
          </div>
        }
      />
      {STEPS.map((s, i) => (
        <Section key={s.title} tone={i % 2 ? "white" : "page"} label={`Step ${i + 1} of 5`}>
          <Split
            flip={i % 2 === 1}
            visual={
              <PhonePanel tone={i % 2 ? "cream" : "white"}>
                <Phone src={s.src} alt={s.alt} />
              </PhonePanel>
            }
          >
            <span className="text-[15px] font-semibold text-grey">Step {i + 1} of 5</span>
            <H2>{s.title}</H2>
            <p className="text-[17px] leading-7 text-grey">{s.text}</p>
            <Facts items={s.facts} />
          </Split>
        </Section>
      ))}
      <Section tone="mint">
        <SectionHead title="Two ways to get it to the shop" intro="Choose PEG pickup for the rider journey, or take your laundry to the shop yourself." />
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-white p-7 ring-1 ring-rule">
            <h3 className="text-[22px] font-bold">PEG pickup</h3>
            <p className="mt-2 text-[16px] leading-7 text-grey">A PEG rider collects and returns. Pickup and delivery counts as two trips; delivery back only as one. Priced by road distance.</p>
          </article>
          <article className="rounded-3xl bg-white p-7 ring-1 ring-rule">
            <h3 className="text-[22px] font-bold">Drop-off</h3>
            <p className="mt-2 text-[16px] leading-7 text-grey">Take your load to the shop on your way. The shop still weighs it and the fee still appears in the app before you pay.</p>
          </article>
        </div>
      </Section>
      <WaitlistBand />
    </>
  );
}
