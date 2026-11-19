import type { ReactNode } from "react";
import { CONTACT_EMAIL, CONTACT_LOCATION, CONTACT_PHONE, CUSTOMER_APP, OPERATOR_NAME, PARTNER_APP } from "../config";
import { Link, usePageMeta } from "../lib/routing";
import { Faq, LegalArticle, PageHeader, WaitlistBand, wrap } from "./site/ui";

function P({ children }: { children: ReactNode }) {
  return <p className="mb-5 text-[17px] leading-7 text-[#3a3a3a]">{children}</p>;
}

function H({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 mt-12 text-[24px] font-extrabold leading-8 tracking-[-0.02em]">{children}</h2>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="mb-5 list-disc space-y-2 pl-5 text-[17px] leading-7 text-[#3a3a3a]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ContactPage() {
  usePageMeta(`Contact ${CUSTOMER_APP}`, `Reach ${OPERATOR_NAME} about ${CUSTOMER_APP} at ${CONTACT_EMAIL}.`);

  return (
    <LegalArticle eyebrow="Contact" title="Talk to the team that operates Peg">
      <P>
        {OPERATOR_NAME} runs {CUSTOMER_APP} from {CONTACT_LOCATION}. Use these details for payments questions, shop
        applications, refunds, and anything else on this site.
      </P>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-rule">
          <p className="text-[14px] font-semibold text-grey">Email</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block text-[17px] font-bold">
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-rule">
          <p className="text-[14px] font-semibold text-grey">Phone</p>
          <p className="mt-2 text-[17px] font-bold">{CONTACT_PHONE}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 ring-1 ring-rule sm:col-span-2">
          <p className="text-[14px] font-semibold text-grey">Location</p>
          <p className="mt-2 text-[17px] font-bold">{CONTACT_LOCATION}</p>
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
    "Pay after the shop reviews your clothes, Paystack Mobile Money or card, no in-app wallets, Ghana Card shop KYC, and how refunds work.",
  );

  const groups: { title: string; items: { q: string; a: string }[] }[] = [
    {
      title: "Paying",
      items: [
        {
          q: "When do I pay?",
          a: "After the shop reviews your clothes and confirms the total. Peg then shows the fee. You pay that fee in the app through Paystack.",
        },
        {
          q: "Which methods can I use?",
          a: "Mobile Money and card, through Paystack. That is the customer checkout for Peg.",
        },
        {
          q: "Does the shop charge my card or MoMo themselves?",
          a: "No. The shop does not collect the customer Paystack payment. Falcon Digital Solutions is the merchant of record. You pay in Peg after the shop confirms the total.",
        },
        {
          q: "Do you store wallets or move money between users in the app?",
          a: "No. Peg does not keep a customer or shop wallet, and it does not transfer value between users in the app. If you save a card, Paystack keeps it; Peg only keeps a token to charge it again, never your card number or MoMo PIN.",
        },
        {
          q: "Why is there no price until after pickup?",
          a: "The shop has to review your clothes before anyone can quote a real fee: items priced by weight are weighed, and per-item pieces are counted.",
        },
      ],
    },
    {
      title: "Orders and delivery",
      items: [
        {
          q: "How does pickup work?",
          a: "You book a shop in Peg. A Peg rider collects your clothes, takes them to the shop and brings them back when they are ready. The order shows your rider and where they are, and you give the rider a 4-digit code when your clothes come back.",
        },
        {
          q: "How much is delivery?",
          a: "Delivery is priced by the road distance between you and the shop. Pickup and delivery counts as two trips; delivery back only counts as one. Addresses beyond the delivery range cannot book pickup, but you can still drop off at the shop.",
        },
        {
          q: "Can I cancel?",
          a: "Yes, until the shop has started washing, but not while a rider is carrying your clothes. Once washing starts, the work is underway so the order cannot be cancelled from the app.",
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
          q: "How does a shop join Peg?",
          a: `The shop applies in ${PARTNER_APP} and uploads a Ghana Card. Falcon staff review it and approve or reject. The shop cannot take Peg orders until that approval is in place.`,
        },
        {
          q: "Who operates Peg?",
          a: `${OPERATOR_NAME} operates Peg in Ghana. Contact ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        },
      ],
    },
  ];

  return (
    <>
      <PageHeader pill="FAQ" title="Questions people actually ask" lead="Paying, pickup and delivery, accounts and shops. Anything else goes to the team at Falcon Digital Solutions." />
      <div className={`${wrap} grid gap-14 py-14 md:py-20`}>
        {groups.map((group) => (
          <section key={group.title} className="grid gap-6 lg:grid-cols-12 lg:gap-6" aria-labelledby={`faq-${group.title}`}>
            <h2 id={`faq-${group.title}`} className="text-[26px] font-extrabold tracking-[-0.02em] lg:col-span-4">
              {group.title}
            </h2>
            <div className="lg:col-span-7 lg:col-start-6">
              <Faq items={group.items.map((item) => [item.q, item.a] as [string, string])} />
            </div>
          </section>
        ))}
      </div>
      <WaitlistBand />
    </>
  );
}

export function FeedbackPage() {
  usePageMeta(
    `${CUSTOMER_APP} customer feedback`,
    "Send Peg feedback to Falcon Digital Solutions. We read it against the order when you include a reference.",
  );

  const action = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Peg customer feedback")}`;

  return (
    <LegalArticle eyebrow="Customer feedback" title="Tell us what happened">
      <P>
        This form opens your email app to {CONTACT_EMAIL}. Include the order reference from Peg if this is about a
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
    `Terms for ${CUSTOMER_APP}, ${PARTNER_APP} and Peg Rider, operated by ${OPERATOR_NAME}. Pay through Paystack after the shop reviews your clothes.`,
  );

  return (
    <LegalArticle eyebrow="Terms" title="Terms of service" updated="Last updated 19 November 2026">
      <P>
        These terms cover {CUSTOMER_APP} (for customers), {PARTNER_APP} (for laundry shops) and Peg Rider (for riders),
        operated by {OPERATOR_NAME} in Ghana. By using any of the apps you agree to them.
      </P>
      <H>1. The service</H>
      <P>
        {CUSTOMER_APP} lets you book an independent laundry shop near you, have a Peg rider collect and return your
        clothes (or drop them off yourself), and pay through Paystack after the shop reviews your clothes and confirms the
        total. {PARTNER_APP} is the app shops use to take and manage orders. Peg Rider is the app riders use to take
        pickup and delivery trips.
      </P>
      <H>2. Who you contract with</H>
      <P>
        {OPERATOR_NAME} operates the apps and is the merchant of record for customer payments. The laundry work is done
        by the shop you book. Pickups and deliveries are done by Peg riders, who are approved by {OPERATOR_NAME} and paid
        per trip. The delivery fee is set by road distance and is paid to {OPERATOR_NAME}, not to the shop.
      </P>
      <H>3. Accounts</H>
      <Ul
        items={[
          "You must be 18 or older to use Peg.",
          "Customers sign in with a phone number and a one-time code. Keep your phone and codes to yourself; you are responsible for activity on your account.",
          "Shops and riders apply in their app with a Ghana Card and stay under review until Peg approves or rejects them. They cannot take orders or trips until approved.",
          "You can delete your account at any time in the app under Profile. See how to delete your Peg account on our website.",
        ]}
      />
      <H>4. Prices and payment</H>
      <Ul
        items={[
          "The shop's prices and the delivery fee are shown before you book. The final laundry total is set when the shop reviews your clothes.",
          "You are not charged until the shop confirms the total. You then pay in the app through Paystack, with Mobile Money or card.",
          "If you choose to save a card, Paystack keeps it and Peg keeps only a token to charge it again. You can remove saved cards at any time.",
          "Shops do not collect customer payments. Peg pays shops and riders their share separately.",
          "Peg does not hold money for you in a wallet.",
        ]}
      />
      <H>5. Pickup and hand-over</H>
      <P>
        Give your rider the 4-digit code shown in the app only when your clothes are handed back to you. The code confirms
        the delivery.
      </P>
      <H>6. Cancellations</H>
      <P>
        You can cancel in the app until the shop starts washing. If the shop already has your clothes when an order is
        cancelled, you can collect them free or pay for a Peg rider to bring them back.
      </P>
      <H>7. Refunds</H>
      <P>
        If a refund is due, it is sent through Paystack to the original Mobile Money wallet or card. See the{" "}
        <Link href="/refunds" className="font-semibold underline">
          refund policy
        </Link>
        .
      </P>
      <H>8. Reviews</H>
      <P>
        Reviews must be honest and about your own order. Peg may remove reviews that are abusive, false or unrelated.
      </P>
      <H>9. Acceptable use</H>
      <P>
        Do not misuse the apps, give false identity details, harass shops, riders or customers, or use Peg for anything
        other than real laundry orders and the work that goes with them. Peg may suspend accounts that break these terms.
      </P>
      <H>10. Liability</H>
      <P>
        Shops are responsible for the laundry work, and riders for the care of clothes while they carry them.{" "}
        {OPERATOR_NAME} is responsible for running the apps and taking payments. As far as Ghanaian law allows, none of us
        is liable for indirect or consequential loss. Nothing in these terms limits liability that cannot legally be
        limited.
      </P>
      <H>11. Changes</H>
      <P>
        We may update these terms. The date of the latest change is shown at the top of this page. Using Peg after a
        change means you accept the updated terms.
      </P>
      <H>12. Contact</H>
      <P>
        {OPERATOR_NAME} · {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function PrivacyPage() {
  usePageMeta(
    `${CUSTOMER_APP} privacy policy`,
    `How ${OPERATOR_NAME} collects, uses and shares data in Peg, Peg Partner and Peg Rider.`,
  );

  return (
    <LegalArticle eyebrow="Privacy" title="Privacy policy" updated="Last updated 19 November 2026">
      <P>
        {OPERATOR_NAME} operates {CUSTOMER_APP} (for customers), {PARTNER_APP} (for laundry shops) and Peg Rider (for
        riders), and this website. This policy explains what we collect in those apps, why, who we share it with and how
        you can delete it.
      </P>
      <H>What we collect</H>
      <Ul
        items={[
          "Account details: your name, phone number, email address and, if you add one, a profile photo. One-time codes sent to your phone are used to sign you in.",
          "Addresses and location: the pickup and delivery addresses you save, with their map pin. Peg can use your phone's location to place the pin if you allow it.",
          "Rider location: Peg Rider shares the rider's precise location while they are online or on a trip, so customers can follow their delivery and nearby trips can be offered. It stops when the rider goes offline.",
          "Orders: the shop, services, pickup notes, weight and total the shop confirms, status updates and the hand-over code.",
          "Payments: payment references and status from Paystack. If you choose to save a card, we keep the card brand, last four digits, expiry date and a Paystack token that lets Paystack charge it again. We never see or store your full card number, CVV or Mobile Money PIN.",
          "For shops and riders: business or vehicle details, a Ghana Card number and photo for identity checks, and payout details (Mobile Money or bank account).",
          "Reviews and ratings you leave for shops and riders, and messages you send to Peg support.",
          "A device token so we can send you notifications about your orders and trips.",
        ]}
      />
      <H>Why we use it</H>
      <Ul
        items={[
          "To run orders: match you with a shop, send a rider, show the total and track each step.",
          "To take payments and send refunds through Paystack, and to pay shops and riders.",
          "To check shops and riders before they can take orders.",
          "To send notifications about your orders, trips and account.",
          "To prevent fraud, resolve disputes and answer support requests.",
        ]}
      />
      <P>We do not sell your data and we do not show ads.</P>
      <H>Who we share it with</H>
      <Ul
        items={[
          "The shop you book: your name, phone number, order details and, for pickups, your address.",
          "The rider on your order: your name, phone number and pickup or delivery address. Customers see their rider's name, vehicle and live location during the trip.",
          "Paystack, to process Mobile Money and card payments, refunds and saved cards.",
          "Service providers who run Peg for us: Microsoft Azure (hosting), Google Maps (maps and address search) and Firebase Cloud Messaging (notifications).",
          "Authorities, where Ghanaian law requires it.",
        ]}
      />
      <H>Security</H>
      <P>
        Data is sent over encrypted connections (HTTPS). Ghana Card photos and saved card tokens are only available to
        Peg staff who need them; card tokens never leave our servers except to Paystack.
      </P>
      <H>How long we keep it</H>
      <P>
        We keep your data while your account is open. When you delete your account, we remove your name, phone number,
        email, profile photo, saved cards, Ghana Card photo and device tokens. We keep order and payment records, including
        the addresses used for them but without your name or contact details, for as long as Ghanaian tax and accounting rules require.
      </P>
      <H>Deleting your account</H>
      <P>
        In any Peg app, go to Profile and choose Delete account. You can also ask us by email; see{" "}
        <Link href="/delete-account" className="font-semibold underline">
          how to delete your Peg account
        </Link>
        .
      </P>
      <H>Your choices</H>
      <P>
        You can turn off location and notifications in your phone's settings; ordering still works if you place your
        pin by hand. Email {CONTACT_EMAIL} to ask what we hold about you, to correct it or to delete it.
      </P>
      <H>Children</H>
      <P>Peg is for adults. We do not knowingly collect data from anyone under 18.</P>
      <H>Contact</H>
      <P>
        {OPERATOR_NAME} · {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function DeleteAccountPage() {
  usePageMeta(
    "Delete your Peg account",
    "How to delete your Peg, Peg Partner or Peg Rider account and what happens to your data.",
  );

  return (
    <LegalArticle eyebrow="Your account" title="Delete your Peg account" updated="Last updated 19 November 2026">
      <P>
        This page is for {CUSTOMER_APP}, {PARTNER_APP} and Peg Rider, operated by {OPERATOR_NAME}.
      </P>
      <H>In the app</H>
      <Ul
        items={[
          "Open the Peg app you use and sign in.",
          "Go to Profile, then choose Delete account.",
          "Confirm. Your account is deleted straight away and you are signed out.",
        ]}
      />
      <P>
        If you have an order or trip in progress, or a shop payout waiting, finish it first; the app will tell you.
      </P>
      <H>By email</H>
      <P>
        If you can't use the app, email {CONTACT_EMAIL} from the email address on your account, or include the phone
        number you sign in with, and ask us to delete your account. We will confirm within 7 days.
      </P>
      <H>What is deleted</H>
      <Ul
        items={[
          "Your name, phone number, email address and profile photo.",
          "Saved cards, including the Paystack tokens for them.",
          "Ghana Card photos for shops and riders, and notification device tokens.",
        ]}
      />
      <H>What we keep</H>
      <P>
        Order and payment records, including the addresses used for them but without your name or contact details, for as long as Ghanaian tax and accounting rules
        require. Reviews you wrote stay on the shop's page without your name.
      </P>
    </LegalArticle>
  );
}

export function RefundsPage() {
  usePageMeta(
    `${CUSTOMER_APP} refund policy`,
    "Refunds go through Paystack to the original Mobile Money or card. Pay only after the shop reviews your clothes and confirms the total.",
  );

  return (
    <LegalArticle eyebrow="Refunds" title="Refund policy" updated="Last updated 29 September 2026">
      <P>
        You are not charged until the shop reviews your clothes, confirms the total and you complete Paystack checkout in {CUSTOMER_APP}.
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
          "You paid the total the shop confirmed and received the clothes.",
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
        wallet in Peg, because Peg does not keep shop wallets.
      </P>
      <H>Contact</H>
      <P>
        {CONTACT_EMAIL} · {CONTACT_PHONE} · {CONTACT_LOCATION}
      </P>
    </LegalArticle>
  );
}

export function NotFoundPage() {
  usePageMeta(`Page not found | ${CUSTOMER_APP}`, "That page is not on the Peg site.");

  return (
    <LegalArticle eyebrow="Missing page" title="That page is not here">
      <P>The Peg site has a home page, FAQ, customer feedback, and the policies Paystack asked to see.</P>
      <p className="text-[15px] font-semibold">
        <Link href="/" className="text-[#0b5c46]">
          Back to Peg
        </Link>
        {" · "}
        <Link href="/faq" className="text-[#0b5c46]">
          FAQ
        </Link>
      </p>
    </LegalArticle>
  );
}
