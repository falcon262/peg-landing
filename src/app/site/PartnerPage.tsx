import { CONTACT_EMAIL } from "../../config";
import { usePageMeta } from "../../lib/routing";
import { Button, Facts, Faq, H2, Hero, MailForm, Phone, PhonePanel, Section, SectionHead, Split, Steps } from "./ui";

const BENEFITS: [string, string, string][] = [
  ["/assets/partner/116f6.svg", "Orders from nearby", "Take orders from customers in the areas your shop serves."],
  ["/assets/partner/09ff3.svg", "A rider when you need one", "Tap Request Peg rider for pickups, right from the partner app."],
  ["/assets/partner/8418c.svg", "Earnings in view", "See what each load earns, and choose MoMo or a bank account for payouts."],
];

export default function PartnerPage() {
  usePageMeta(
    "Peg Partner | Run your laundry shop on Peg",
    "Peg Partner is the app for laundry shops in Accra: take nearby orders, request Peg riders, confirm the weight at intake and see your earnings.",
  );
  return (
    <>
      <Hero
        tone="green"
        pill="Peg Partner, for laundry shops"
        title="Good laundry deserves good company."
        lead="Take nearby orders, request a Peg rider and keep your shop's work in one app. Apply to become a Peg Partner in Accra."
        actions={
          <Button href="#apply" tone="white">
            Apply as a shop
          </Button>
        }
        note="Shop applications are reviewed by Falcon Digital Solutions."
        visual={
          <div className="flex items-end gap-4 pb-2">
            <Phone src="/assets/app/partner-dashboard.png" alt="The Peg Partner dashboard: pending, active and completed orders and earnings" />
            <Phone src="/assets/app/partner-orders.png" alt="Incoming Peg orders for a laundry shop, with accept and decline" className="mb-10 hidden sm:block" />
          </div>
        }
      />

      <Section>
        <SectionHead title="Your shop does the care. Peg connects the steps." intro="One app for the work around every load: new orders, pickups, the weigh-in and your earnings." />
        <div className="grid gap-5 md:grid-cols-3">
          {BENEFITS.map(([icon, title, text]) => (
            <article key={title} className="rounded-3xl bg-white p-7 ring-1 ring-rule">
              <img src={icon} alt="" className="h-8 w-8" />
              <h3 className="mt-5 text-[20px] font-bold">{title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-grey">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHead title="From nearby order to payout" />
        <Steps
          accent="green"
          items={[
            ["Take the order", "Accept nearby orders for the areas your shop serves."],
            ["Request the pickup", "Tap Request Peg rider. The nearest free rider collects the clothes."],
            ["Confirm the weight", "Weigh the load at intake. The customer sees the fee and pays."],
            ["Get paid", "Falcon Digital Solutions settles your shop to MoMo or a bank account."],
          ]}
        />
      </Section>

      <Section>
        <Split
          visual={
            <PhonePanel tone="mint">
              <Phone src="/assets/app/partner-weigh.png" alt="Confirming the weight of an order at intake in Peg Partner" />
              <Phone src="/assets/app/partner-earnings.png" alt="Weekly earnings and payouts in Peg Partner" className="hidden sm:block" />
            </PhonePanel>
          }
        >
          <H2>Clear at intake. Clear at payout.</H2>
          <p className="text-[17px] leading-7 text-grey">Confirm the actual weight in the app before you wash, so the customer sees the fee up front. Your earnings stay in view, and payouts go where you choose.</p>
          <Facts
            items={[
              ["Weigh-in", "Confirmed in the app at intake"],
              ["Customer pays", "Falcon Digital Solutions, through Paystack"],
              ["Your payout", "Mobile Money or a bank account"],
            ]}
          />
        </Split>
      </Section>

      <section id="apply" aria-labelledby="apply-h" className="bg-mint py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-6 lg:px-20">
          <div className="flex flex-col gap-5 lg:col-span-5">
            <H2 id="apply-h">Apply. Get approved. Get connected.</H2>
            <ol className="flex flex-col gap-3">
              {[
                ["Tell us about your shop", "Your shop, your contact details and the areas you serve."],
                ["Submit your Ghana Card", "In the Peg Partner app, as part of setup. It is never shown on this site."],
                ["Falcon Digital Solutions reviews", "Approved shops can take Peg orders."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-rule">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green text-[14px] font-extrabold text-white">{i + 1}</span>
                  <span>
                    <b className="block text-[17px]">{t}</b>
                    <span className="text-[15px] text-grey">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.35)] md:p-8 lg:col-span-6 lg:col-start-7">
            <MailForm
              subject="Peg Partner application"
              button="Apply as a shop"
              tone="green"
              note={`This opens an email to ${CONTACT_EMAIL}. We reply with the next steps in the Peg Partner app.`}
              fields={[
                { name: "shop", label: "Shop name", autoComplete: "organization", error: "Write your shop's name." },
                { name: "name", label: "Your name", autoComplete: "name", error: "Write your name." },
                { name: "area", label: "Areas you serve", error: "Write the neighbourhoods your shop serves." },
                { name: "email", label: "Email", type: "email", autoComplete: "email", error: "Write an email address, like name@example.com." },
              ]}
            />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <H2>Questions from shops</H2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq
              items={[
                ["Who is Peg Partner for?", "Laundry businesses in Accra who want nearby customers and one place to run intake, washing and hand-over."],
                ["What do I need to register?", "Your shop details and a Ghana Card, submitted in Peg Partner. Falcon staff then approve or reject. You cannot take Peg orders until approval is in place."],
                ["How do pickups reach my shop?", "Tap Request Peg rider on an accepted pickup order. Peg offers the trip to the nearest free riders; if nobody takes it you can ask again, or Peg assigns one. Confirm in the app when the clothes arrive."],
                ["Do shops collect customer payments?", "No. The customer pays Falcon Digital Solutions through Paystack after you review the clothes and confirm the total. Falcon settles shops separately. Peg keeps no shop wallet."],
              ]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
