import type { ReactNode } from "react";
import { CONTACT_EMAIL, CONTACT_LOCATION, CONTACT_PHONE, CUSTOMER_APP, OPERATOR_NAME, PARTNER_APP } from "../config";
import { Link, usePageMeta } from "../lib/routing";
import { LegalArticle } from "./LegalShell";

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[15px] leading-7 text-[#3a3a3a]">{children}</p>;
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 mt-10 text-xl font-extrabold tracking-tight">{children}</h2>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[#3a3a3a]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function AboutPage() {
  usePageMeta(
    `About ${CUSTOMER_APP}`,
    `${CUSTOMER_APP} is a Ghana laundry marketplace operated by ${OPERATOR_NAME}. Book a nearby shop, pay after the load is weighed.`,
  );

  return (
    <LegalArticle eyebrow="About" title={`${CUSTOMER_APP} is laundry pickup for Ghana`}>
      <P>
        {CUSTOMER_APP} is the customer app. {PARTNER_APP} is the shop app. Both are operated by {OPERATOR_NAME} in{" "}
        {CONTACT_LOCATION}.
      </P>
      <P>
        You book a nearby laundry shop, a rider collects the clothes, the shop weighs the load, then you pay the fee
        through Paystack with Mobile Money or card. Shops do not collect that customer payment themselves.
      </P>
      <H>Who we are</H>
      <P>
        {OPERATOR_NAME} builds and operates {CUSTOMER_APP}. We are the merchant of record for customer checkout. Shops
        on the marketplace are independent businesses. We settle them separately from the Paystack charge you make in
        the app.
      </P>
      <H>What we do not do</H>
      <Ul
        items={[
          "We do not hold customer or shop wallets in the apps.",
          "We do not move money between users inside PEG.",
          "We do not run our own delivery fleet. Pickup is arranged with a partner. Yango is the stopgap while that partnership is set up.",
          "Saved payment methods in the app are labels only. Cards and Mobile Money stay with Paystack.",
        ]}
      />
      <H>How shops join</H>
      <P>
        A shop applies in {PARTNER_APP}, uploads a Ghana Card, and sits in review until Falcon staff approve or reject
        the application. A shop cannot take {CUSTOMER_APP} orders until that approval is in place.
      </P>
      <H>Contact</H>
      <P>
        {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function ContactPage() {
  usePageMeta(`Contact ${CUSTOMER_APP}`, `Reach ${OPERATOR_NAME} about ${CUSTOMER_APP} at ${CONTACT_EMAIL}.`);

  return (
    <LegalArticle eyebrow="Contact" title="Talk to the team that operates PEG">
      <P>
        {OPERATOR_NAME} runs {CUSTOMER_APP} from {CONTACT_LOCATION}. Use these details for payments questions, shop
        applications, refunds, and anything else on this site.
      </P>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-black/8 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a5a5a]">Email</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block text-[15px] font-semibold text-[#0b5c46]">
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="rounded-2xl border border-black/8 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a5a5a]">Phone</p>
          <p className="mt-2 text-[15px] font-semibold">{CONTACT_PHONE}</p>
        </div>
        <div className="rounded-2xl border border-black/8 bg-white p-5 sm:col-span-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a5a5a]">Location</p>
          <p className="mt-2 text-[15px] font-semibold">{CONTACT_LOCATION}</p>
        </div>
      </div>
      <P>
        For checkout or refund issues, include the order reference from {CUSTOMER_APP}. We look up the Paystack
        transaction from that.
      </P>
    </LegalArticle>
  );
}

export function FaqPage() {
  usePageMeta(
    `${CUSTOMER_APP} FAQ`,
    "Pay after weigh, Paystack Mobile Money or card, no in-app wallets, Ghana Card shop KYC, and how refunds work.",
  );

  const groups: { title: string; items: { q: string; a: string }[] }[] = [
    {
      title: "Paying",
      items: [
        {
          q: "When do I pay?",
          a: "After the shop confirms the weight. PEG then shows the fee. You pay that fee in the app through Paystack.",
        },
        {
          q: "Which methods can I use?",
          a: "Mobile Money and card, through Paystack. That is the customer checkout for PEG.",
        },
        {
          q: "Does the shop charge my card or MoMo themselves?",
          a: "No. The shop does not collect the customer Paystack payment. Falcon Solutions is the merchant of record. You pay in PEG after the weight is confirmed.",
        },
        {
          q: "Do you store wallets or move money between users in the app?",
          a: "No. PEG does not keep a customer or shop wallet, and it does not transfer value between users in the app. Saved methods you see are labels only. The card or MoMo stays with Paystack.",
        },
        {
          q: "Why is there no price until after pickup?",
          a: "Laundry here is priced by weight. The shop has to weigh the load before anyone can quote a real fee.",
        },
      ],
    },
    {
      title: "Orders and delivery",
      items: [
        {
          q: "How does pickup work?",
          a: "You book a shop in PEG. A rider collects the clothes and takes them there. Falcon does not run its own fleet. Pickup is arranged with a partner. Yango is the stopgap while that is set up.",
        },
        {
          q: "Can I cancel?",
          a: "Yes, until the shop has started washing. After that, the work is underway so the order cannot be cancelled from the app.",
        },
        {
          q: "What if clothes are damaged or missing?",
          a: `Use in-app support or email ${CONTACT_EMAIL}. We review the order with the shop. If a refund is due, it goes through Paystack to the original method.`,
        },
      ],
    },
    {
      title: "Account and shops",
      items: [
        {
          q: "How do I sign in?",
          a: "With your phone number and a one-time code. There is no password.",
        },
        {
          q: "How does a shop join PEG?",
          a: `The shop applies in ${PARTNER_APP} and uploads a Ghana Card. Falcon staff review it and approve or reject. The shop cannot take PEG orders until that approval is in place.`,
        },
        {
          q: "Who operates PEG?",
          a: `${OPERATOR_NAME} operates PEG in Ghana. Contact ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        },
      ],
    },
  ];

  return (
    <LegalArticle eyebrow="FAQ" title="Questions people actually ask">
      {groups.map((group) => (
        <section key={group.title} className="mb-4">
          <H>{group.title}</H>
          <div className="divide-y divide-black/8 overflow-hidden rounded-2xl border border-black/8 bg-white">
            {group.items.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none text-[15px] font-semibold">
                  {item.q}
                </summary>
                <p className="mt-2 text-[14px] leading-7 text-[#5a5a5a]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </LegalArticle>
  );
}

export function FeedbackPage() {
  usePageMeta(
    `${CUSTOMER_APP} customer feedback`,
    "Send PEG feedback to Falcon Solutions. We read it against the order when you include a reference.",
  );

  const action = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("PEG customer feedback")}`;

  return (
    <LegalArticle eyebrow="Customer feedback" title="Tell us what happened">
      <P>
        This form opens your email app to {CONTACT_EMAIL}. Include the order reference from PEG if this is about a
        payment or a specific load. We match that to the Paystack transaction.
      </P>
      <form
        className="rounded-2xl border border-black/8 bg-white p-6"
        action={action}
        method="post"
        encType="text/plain"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const body = [
            `Name: ${data.get("name") || ""}`,
            `Phone: ${data.get("phone") || ""}`,
            `Order: ${data.get("order") || ""}`,
            "",
            String(data.get("message") || ""),
          ].join("\n");
          window.location.href = `${action}&body=${encodeURIComponent(body)}`;
        }}
      >
        <label className="mb-4 block text-[13px] font-semibold">
          Name
          <input
            name="name"
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f8f8f8] px-3 py-2.5 text-[14px] font-normal"
          />
        </label>
        <label className="mb-4 block text-[13px] font-semibold">
          Phone
          <input
            name="phone"
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f8f8f8] px-3 py-2.5 text-[14px] font-normal"
          />
        </label>
        <label className="mb-4 block text-[13px] font-semibold">
          Order reference (optional)
          <input
            name="order"
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f8f8f8] px-3 py-2.5 text-[14px] font-normal"
          />
        </label>
        <label className="mb-5 block text-[13px] font-semibold">
          What happened
          <textarea
            name="message"
            required
            rows={6}
            className="mt-1.5 w-full rounded-xl border border-black/10 bg-[#f8f8f8] px-3 py-2.5 text-[14px] font-normal"
          />
        </label>
        <button
          type="submit"
          className="rounded-full bg-[#0b5c46] px-5 py-2.5 text-[13px] font-bold text-white"
        >
          Email Falcon
        </button>
      </form>
      <p className="mt-4 text-[13px] text-[#5a5a5a]">
        If mail does not open, write {CONTACT_EMAIL} directly. {CONTACT_PHONE}, {CONTACT_LOCATION}.
      </p>
    </LegalArticle>
  );
}

export function TermsPage() {
  usePageMeta(
    `${CUSTOMER_APP} terms of service`,
    `${CUSTOMER_APP} marketplace terms. ${OPERATOR_NAME} is merchant of record. Pay after weigh through Paystack.`,
  );

  return (
    <LegalArticle eyebrow="Terms" title="Terms of service" updated="Last updated 29 September 2026">
      <P>
        These terms cover {CUSTOMER_APP} and {PARTNER_APP}, operated by {OPERATOR_NAME} in Ghana. Using either app
        means you agree to them. This is a working template, not a substitute for advice from a Ghanaian lawyer.
      </P>
      <H>1. The service</H>
      <P>
        {CUSTOMER_APP} lets you book an independent laundry shop, arrange pickup, see the fee after the shop weighs the
        load, and pay that fee through Paystack. {PARTNER_APP} is the shop side of the same marketplace.
      </P>
      <H>2. Who you contract with</H>
      <P>
        {OPERATOR_NAME} operates the apps and is the merchant of record for customer checkout. Laundry work is
        performed by the shop you book. Delivery is arranged with a partner. Yango is the stopgap. Falcon does not
        operate its own rider fleet.
      </P>
      <H>3. Accounts</H>
      <P>
        Customers sign in with a phone number and one-time code. Shops apply in {PARTNER_APP}, upload a Ghana Card, and
        remain under review until Falcon staff approve or reject. A shop cannot accept {CUSTOMER_APP} orders until
        approved.
      </P>
      <H>4. Fees and payment</H>
      <Ul
        items={[
          "There is no customer charge until the shop confirms the weight.",
          "You then pay the displayed fee in PEG through Paystack, with Mobile Money or card.",
          "The shop does not collect that customer Paystack payment.",
          "PEG does not keep customer or shop wallets and does not transfer value between users in the app.",
          "Saved payment methods are labels only.",
          "Shops are settled by Falcon separately from the customer Paystack charge.",
        ]}
      />
      <H>5. Cancellations</H>
      <P>You may cancel in the app until the shop has started washing. After that, cancellation in the app is closed.</P>
      <H>6. Refunds</H>
      <P>
        If we agree a refund is due, it is sent through Paystack to the original payment method. See the Refund Policy.
      </P>
      <H>7. Acceptable use</H>
      <P>
        Do not abuse the apps, submit false KYC, interfere with other users, or use PEG for anything other than
        legitimate laundry bookings and related shop operations.
      </P>
      <H>8. Liability</H>
      <P>
        Shops are responsible for the laundry work. Falcon is responsible for operating the apps and customer checkout.
        Neither party is liable for indirect or consequential loss so far as Ghanaian law allows. Nothing here limits
        liability that cannot legally be limited.
      </P>
      <H>9. Contact</H>
      <P>
        {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function PrivacyPage() {
  usePageMeta(
    `${CUSTOMER_APP} privacy policy`,
    `How ${OPERATOR_NAME} handles PEG account, order, Ghana Card KYC, and Paystack payment data.`,
  );

  return (
    <LegalArticle eyebrow="Privacy" title="Privacy policy" updated="Last updated 29 September 2026">
      <P>
        {OPERATOR_NAME} operates {CUSTOMER_APP} and {PARTNER_APP}. This policy describes what we collect, why, and who
        we share it with. It is a working template, not a signed legal opinion.
      </P>
      <H>What we collect</H>
      <Ul
        items={[
          "Phone number and one-time codes used to sign in.",
          "Order details: shop, pickup notes, weight once the shop confirms it, fee, and status.",
          "Support messages you send us.",
          "For shops: application details and Ghana Card images used for KYC review.",
          "Payment references returned by Paystack. We do not store full card numbers or MoMo PINs in PEG.",
        ]}
      />
      <H>Why we collect it</H>
      <P>
        To run bookings, show the fee after weigh, take Paystack checkout, review shop applications, settle shops,
        handle refunds, and respond to support.
      </P>
      <H>Who we share it with</H>
      <Ul
        items={[
          "Paystack, to process Mobile Money and card payments and refunds.",
          "The shop you booked, so they can wash the load. They do not receive your card or MoMo secrets.",
          "The pickup partner (Yango as stopgap) for collection and return.",
          "Falcon staff who approve or reject shop KYC.",
        ]}
      />
      <H>Wallets</H>
      <P>
        PEG does not keep a stored-value wallet for customers or shops. Saved methods in the app are labels. Payment
        credentials stay with Paystack.
      </P>
      <H>Retention</H>
      <P>
        We keep order and KYC records as long as needed to operate the service, handle disputes, and meet Ghanaian
        record-keeping duties, then delete or anonymise them.
      </P>
      <H>Your requests</H>
      <P>
        Email {CONTACT_EMAIL} to ask what we hold, to correct it, or to request deletion where we are not required to
        keep it.
      </P>
      <H>Contact</H>
      <P>
        {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function RefundsPage() {
  usePageMeta(
    `${CUSTOMER_APP} refund policy`,
    "Refunds go through Paystack to the original Mobile Money or card. Pay only after the shop confirms weight.",
  );

  return (
    <LegalArticle eyebrow="Refunds" title="Refund policy" updated="Last updated 29 September 2026">
      <P>
        You are not charged until the shop confirms the weight and you complete Paystack checkout in {CUSTOMER_APP}.
        If we agree a refund is due after that, it is sent through Paystack to the original Mobile Money wallet or
        card.
      </P>
      <H>When a refund can apply</H>
      <Ul
        items={[
          "The order was paid and later cancelled in a state where Falcon agrees no service was delivered.",
          "Clothes are damaged or missing and Falcon agrees a refund is the right outcome after review with the shop.",
          "A duplicate or failed Paystack charge that still captured funds.",
        ]}
      />
      <H>When a refund usually does not apply</H>
      <Ul
        items={[
          "The shop has started washing and the work was done as booked.",
          "You paid the fee that matched the confirmed weight and received the clothes.",
          "A Paystack attempt that never succeeded. In that case there is nothing to refund.",
        ]}
      />
      <H>How to request one</H>
      <P>
        Use in-app support or email {CONTACT_EMAIL} with the order reference. We look up the Paystack transaction from
        that. Approved refunds go to the original method. Timing depends on Paystack and your bank or MoMo provider.
      </P>
      <H>Shops</H>
      <P>
        Shop payouts are separate from the customer Paystack charge. A customer refund does not pull funds from a shop
        wallet in PEG, because PEG does not keep shop wallets.
      </P>
      <H>Contact</H>
      <P>
        {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function NotFoundPage() {
  usePageMeta(`Page not found | ${CUSTOMER_APP}`, "That page is not on the PEG site.");

  return (
    <LegalArticle eyebrow="Missing page" title="That page is not here">
      <P>The PEG site has a home page, FAQ, customer feedback, and the policies Paystack asked to see.</P>
      <p className="text-[15px] font-semibold">
        <Link href="/" className="text-[#0b5c46]">
          Back to PEG
        </Link>
        {" · "}
        <Link href="/faq" className="text-[#0b5c46]">
          FAQ
        </Link>
      </p>
    </LegalArticle>
  );
}
