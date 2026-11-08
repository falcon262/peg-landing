import { usePageMeta } from "../../lib/routing";
import { Button, Facts, Faq, H2, Hero, Phone, PhonePanel, RouteCard, Section, SectionHead, Split, Steps, TextLink, WaitlistBand, wrap } from "./ui";

export const STEPS: [string, string][] = [
  ["Choose your shop", "Book a vetted laundry shop near you. Only shops that serve your area appear."],
  ["Meet your rider", "A PEG rider collects your clothes. Follow your rider live on the map."],
  ["See the weight and fee", "The shop weighs your load at intake. You see both on your order."],
  ["Pay in the app", "Use Mobile Money or card through Paystack. PEG keeps no wallet."],
  ["Get it back", "Give your rider the 4-digit code at hand-over. Laundry, sorted."],
];

const SERVICES: [string, string, string, string][] = [
  ["Wash & Fold", "Everyday clothes, washed, dried and folded.", "/assets/photos/folded.jpg", "Shirts and trousers washed and folded in a stack"],
  ["Dry Clean", "The right care for suits, dresses and delicate pieces.", "/assets/photos/shop.jpg", "Clean clothes on hangers in a laundry shop"],
  ["Iron Only", "A crisp press for clothes that are already clean.", "/assets/photos/ironing.jpg", "A laundry worker ironing a white shirt"],
  ["Bedding", "Sheets, covers and towels, fresh and folded.", "/assets/photos/towels.jpg", "Folded towels and sheets on a stool"],
];

const PROMISES: [string, string, string][] = [
  ["/assets/client/c9ac7-gold.svg", "Vetted shops near you", "Every partner shop is approved by Falcon Solutions."],
  ["/assets/client/a5ca7-gold.svg", "Pay after the weigh-in", "The fee comes from the shop's scale, never a guess."],
  ["/assets/client/beb53-gold.svg", "Every step in view", "From pickup to hand-over, the app keeps you posted."],
];

export default function HomePage() {
  usePageMeta(
    "PEG | Laundry pickup in Accra",
    "Book a nearby laundry shop in Accra. A PEG rider collects your clothes, the shop weighs them, and you pay with Mobile Money or card. Operated by Falcon Solutions.",
  );
  return (
    <>
      <Hero
        pill="Coming soon to Accra"
        title="Laundry, sorted."
        lead="Book a nearby laundry shop. A PEG rider collects your clothes, the shop weighs them, and you pay in the app with MoMo or card."
        actions={
          <>
            <Button href="#waitlist">Join the waitlist</Button>
            <Button href="/how-it-works" tone="line">
              See how it works
            </Button>
          </>
        }
        note="App Store and Google Play: coming soon."
        visual={
          <div className="relative flex items-end gap-4 pb-6">
            <Phone src="/assets/app/feed.png" alt="The PEG app home screen, with vetted laundry shops near you" />
            <Phone src="/assets/app/tracking.png" alt="A PEG order tracked from pickup to the weigh-in" className="mb-10 hidden sm:block" />
            <div className="absolute -left-6 bottom-0 hidden md:block lg:-left-16">
              <RouteCard />
            </div>
          </div>
        }
      />

      <section className="bg-navy text-white" aria-label="What PEG promises">
        <div className={`${wrap} grid gap-8 py-10 md:grid-cols-3`}>
          {PROMISES.map(([icon, title, text]) => (
            <div key={title} className="flex items-start gap-4">
              <img src={icon} alt="" className="mt-1 h-7 w-7" />
              <div>
                <h2 className="text-[18px] font-bold">{title}</h2>
                <p className="mt-1 text-[15px] leading-6 text-white/75">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section id="steps">
        <SectionHead title="Your laundry day, in five steps" intro="From choosing a nearby shop to the final hand-over, PEG brings the moving parts together." />
        <Steps items={STEPS} />
        <div className="mt-8">
          <TextLink href="/how-it-works">See how it works</TextLink>
        </div>
      </Section>

      <Section tone="white" id="services">
        <SectionHead title="The everyday load. The special pieces." intro="Choose the care your clothes need. Services are priced by weight or per item, and itemised on your order." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(([title, text, img, alt]) => (
            <article key={title} className="overflow-hidden rounded-3xl bg-page ring-1 ring-rule">
              <img src={img} alt={alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <h3 className="text-[20px] font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-grey">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <Split
          visual={
            <PhonePanel>
              <Phone src="/assets/app/order.png" alt="Booking a PEG pickup: estimated weight, pickup and delivery, and your location" />
              <Phone src="/assets/app/tracking.png" alt="The order timeline: picked up, at the shop, weighed" className="hidden sm:block" />
            </PhonePanel>
          }
        >
          <H2>Follow the rider. See the fee.</H2>
          <p className="text-[17px] leading-7 text-grey">Watch your PEG rider on the map. When the shop weighs your load at intake, the weight and the fee appear on your order.</p>
          <Facts
            items={[
              ["Delivery", "Priced by road distance"],
              ["Drop-off", "Take it to the shop yourself"],
              ["Hand-over", "A 4-digit code for your rider"],
            ]}
          />
        </Split>
      </Section>

      <Section tone="white">
        <Split
          flip
          visual={
            <PhonePanel>
              <Phone src="/assets/app/payment.png" alt="Choosing MTN Mobile Money or a card to pay for a PEG order" />
            </PhonePanel>
          }
        >
          <H2>Your payment. No extra wallet.</H2>
          <p className="text-[17px] leading-7 text-grey">Pay in the app with Mobile Money or card through Paystack. PEG keeps no wallet: your cards and MoMo stay with Paystack.</p>
          <Facts
            items={[
              ["Methods", "Mobile Money or card"],
              ["When", "After the shop confirms the weight"],
              ["Refunds", "Back to the original method"],
            ]}
          />
        </Split>
      </Section>

      <section className="bg-mint" aria-labelledby="partner-h">
        <div className={`${wrap} grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-6`}>
          <div className="flex flex-col items-start gap-5 lg:col-span-5">
            <span className="inline-flex h-8 items-center rounded-full bg-green px-3.5 text-[13px] font-semibold text-white">For laundry shops</span>
            <H2 id="partner-h">Your neighbourhood. Your next order.</H2>
            <p className="text-[17px] leading-7 text-grey">Join PEG Partner to take nearby orders, request PEG riders and see your earnings. Shop applications are reviewed by Falcon Solutions.</p>
            <Button href="/partner" tone="green">
              See PEG Partner
            </Button>
          </div>
          <img src="/assets/photos/shop-folding.jpg" alt="A laundry shop owner folding a shirt at his counter" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover lg:col-span-6 lg:col-start-7" />
        </div>
      </section>

      <Section id="faq">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col items-start gap-4 lg:col-span-4">
            <H2>Good questions</H2>
            <p className="text-[17px] leading-7 text-grey">Payments, pickup and shops, answered.</p>
            <TextLink href="/faq">Read all the questions</TextLink>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq
              items={[
                ["When do I pay?", "After the shop confirms the weight. PEG then shows the fee, and you pay it in the app through Paystack with Mobile Money or card."],
                ["Do I need to know the weight?", "No. Laundry is priced by weight, so the shop weighs the load at intake before anyone quotes a fee."],
                ["Who collects my laundry?", "A PEG rider. The app shows your rider and where they are, and you give them a 4-digit code when your clothes come back."],
                ["When can I download PEG?", "PEG is coming to the App Store and Google Play. Join the waitlist and we email you when it is out."],
              ]}
            />
          </div>
        </div>
      </Section>

      <WaitlistBand />
    </>
  );
}
