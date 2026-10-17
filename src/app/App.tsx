import { useState } from "react"
import { CONTACT_EMAIL } from "../config"
import { Link } from "../lib/routing"

const shell = "mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20"
const heading = "font-display font-extrabold leading-[1.12]"
const body = "text-[15px] leading-[1.8] text-muted-foreground"
const cta =
  "inline-flex min-h-13 items-center justify-center gap-8 rounded-xl bg-accent px-6 text-sm font-bold text-foreground transition hover:bg-[#e5b938] hover:-translate-y-0.5"
const eyebrow = "mb-4 text-[10px] font-bold tracking-[0.12em] text-[#7a5c15]"

function StoreBadges({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "hidden xl:flex" : ""}`}>
      {["App Store", "Google Play"].map((store) => (
        <div
          key={store}
          aria-label={`Coming soon to ${store}`}
          className="min-w-36 rounded-xl border border-white/20 bg-[#131313] px-5 py-3 text-white"
        >
          <p className="text-[9px] font-medium tracking-[0.08em] text-white/70">
            COMING SOON TO
          </p>
          <p className="mt-1 font-display text-[17px] font-semibold leading-tight">
            {store}
          </p>
        </div>
      ))}
    </div>
  )
}

function Icon({
  file,
  partner,
  className = "",
  gold = false,
}: {
  file: string
  partner: boolean
  className?: string
  gold?: boolean
}) {
  const src = `/assets/${partner ? "partner" : "client"}/${gold ? `${file}-gold` : file}.svg`
  return (
    <img src={src} alt="" className={`size-6 shrink-0 ${className}`} />
  )
}

type LandingProps = {
  partner: boolean
  onPartnerChange: (next: boolean) => void
}

export default function App({ partner, onPartnerChange }: LandingProps) {
  const [menu, setMenu] = useState(false)
  const [application, setApplication] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState("Wash & Fold")
  const [weight, setWeight] = useState("4.2")
  const tone = partner ? "bg-[#0b5c46]" : "bg-[#19296c]"
  const ink = partner ? "text-[#0b5c46]" : "text-[#19296c]"
  const folder = partner ? "partner" : "client"
  const switchPage = () => {
    onPartnerChange(!partner)
    setMenu(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const start = () => {
    setSubmitted(false)
    setApplication(true)
  }
  const features = partner
    ? [
        [
          "Be discovered",
          "Reach customers who need a trusted laundry nearby.",
          "116f6",
        ],
        [
          "Stay organised",
          "Keep orders moving from intake to collection.",
          "09ff3",
        ],
        [
          "See your earnings",
          "Know what each completed load brings in.",
          "8418c",
        ],
      ]
    : [
        [
          "Vetted providers",
          "Nearby laundry care, from people you can trust.",
          "c9ac7",
        ],
        [
          "Weight-confirmed fees",
          "Know what you pay, with no surprises.",
          "a5ca7",
        ],
        [
          "Every step in view",
          "From pickup to fresh laundry at your door.",
          "beb53",
        ],
      ]
  const cards = partner
    ? [
        [
          "Get found",
          "Set up your storefront so customers can find your laundry nearby.",
          "1b724",
        ],
        [
          "Manage the work",
          "See new orders, confirm intake, and keep your loads moving.",
          "46a56",
        ],
        [
          "Close the loop",
          "Track completed work and the earnings that come with it.",
          "8418c",
        ],
      ]
    : [
        [
          "Wash & Fold",
          "Fresh everyday laundry, clean and neatly folded.",
          "8f15d",
        ],
        [
          "Dry Clean",
          "The right care for delicate fabrics and special pieces.",
          "5034d",
        ],
        [
          "Iron Only",
          "A crisp finish for your already-clean clothes.",
          "37fed",
        ],
        [
          "Bedding",
          "Clean sheets, fresh covers, and a better night's rest.",
          "3f36b",
        ],
      ]
  const questions = partner
    ? [
        [
          "Who is PEG Partner for?",
          "Laundry businesses in Ghana who want nearby customers and one place to run intake, washing, and handoff.",
        ],
        [
          "What do I need to register?",
          "Apply in PEG Partner with your shop details and a Ghana Card. Falcon staff then approve or reject. You cannot take PEG orders until that approval is in place.",
        ],
        [
          "Where is the actual weight confirmed?",
          "At intake. Weigh the load, confirm it in the app, and the customer sees the fee before they pay through Paystack.",
        ],
        [
          "Do shops collect customer payments?",
          "No. The customer pays Falcon Solutions through Paystack after you confirm the weight. Falcon settles shops separately. PEG does not keep a shop wallet.",
        ],
      ]
    : [
        [
          "When do I pay?",
          "After the shop confirms the weight. PEG then shows the fee. You pay that fee in the app through Paystack, with Mobile Money or card.",
        ],
        [
          "Do I need to know the exact weight?",
          "No. Laundry here is priced by weight. The shop weighs the load at intake before anyone can quote a real fee.",
        ],
        [
          "Does PEG store my wallet?",
          "No. PEG does not keep a customer wallet and does not move money between users in the app. Saved methods are labels only. Cards and MoMo stay with Paystack.",
        ],
        [
          "How does pickup work?",
          "You book a shop in PEG. A rider collects the clothes. Falcon does not run its own fleet. Pickup is arranged with a partner. Yango is the stopgap while that is set up.",
        ],
      ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div
          className={`${shell} flex h-24 items-center justify-between gap-6`}
        >
          <Link href="/" aria-label="PEG home">
            <img
              src={`/assets/${folder}/${partner ? "54739" : "4bcf8"}.svg`}
              alt={partner ? "PEG Partner" : "PEG"}
              className={
                partner
                  ? "h-10 w-36 object-contain"
                  : "h-10 w-16 object-contain"
              }
            />
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 text-[12px] font-medium lg:flex"
          >
            <a className="transition hover:text-[#9a771a]" href="#why">
              {partner ? "Why PEG Partner" : "How PEG works"}
            </a>
            <a className="transition hover:text-[#9a771a]" href="#app">
              {partner ? "The partner app" : "Our services"}
            </a>
            <a className="transition hover:text-[#9a771a]" href="#join">
              {partner ? "How to join" : "Why PEG"}
            </a>
            <Link className="transition hover:text-[#9a771a]" href="/faq">
              FAQs
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <button
              onClick={switchPage}
              className={`hidden text-[12px] font-medium md:block ${ink}`}
            >
              {partner ? "Looking for laundry?" : "Become a partner"}
            </button>
            <a href="#download" className={`${cta} hidden sm:inline-flex`}>
              Get the app <span>↓</span>
            </a>
            <button
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-label="Toggle navigation"
              className="text-2xl lg:hidden"
            >
              {menu ? "×" : "☰"}
            </button>
          </div>
        </div>
        {menu && (
          <nav className="flex flex-col gap-5 border-t border-border px-6 py-6 lg:hidden">
            {[
              ["Why PEG", "/#why"],
              ["The app", "/#app"],
              ["How to join", "/#join"],
              ["FAQs", "/faq"],
            ].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </Link>
            ))}
            <button onClick={switchPage} className={`text-left ${ink}`}>
              {partner ? "Looking for laundry? →" : "Become a partner →"}
            </button>
          </nav>
        )}
      </header>

      <main>
        <section
          className={`${shell} grid items-center gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-20 lg:pt-16`}
        >
          <div>
            <p className={eyebrow}>
              {partner
                ? "FOR LAUNDRY BUSINESSES IN GHANA"
                : "EVERYDAY CARE. A LITTLE LESS EFFORT."}
            </p>
            <h1
              className={`${heading} text-[clamp(48px,5.6vw,80px)] leading-[1.06] tracking-[-0.035em]`}
            >
              {partner ? (
                <>
                  Your craft.
                  <br />A clearer way
                  <br />
                  to run it<span className="text-[#d3a33a]">.</span>
                </>
              ) : (
                <>
                  Laundry,
                  <br />
                  sorted<span className="text-[#d3a33a]">.</span>
                </>
              )}
            </h1>
            <p className="mt-7 max-w-lg text-[17px] leading-[1.7] text-muted-foreground">
              {partner
                ? "Connect your laundry business with nearby customers. Operations made simple with PEG!"
                : "Book a nearby laundry service in Ghana. Pay seamlessly, have it delivered with PEG!"}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <StoreBadges />
              <a href="#app" className={`text-xs font-semibold ${ink}`}>
                See how it works ↓
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className={ink}>✓</span>{" "}
              {partner
                ? "Built for everyday laundry businesses in Ghana."
                : "Vetted providers. Everyday care, made simpler."}
            </p>
          </div>
          <div className="relative ml-4 pb-8 md:ml-8 lg:ml-0">
            <img
              src={`/assets/${folder}/${partner ? "aad66" : "8345c"}.png`}
              alt={
                partner
                  ? "Laundry professional caring for clothes in a bright Ghanaian laundry shop"
                  : "Laundry provider handing freshly folded clothes to a customer"
              }
              className="aspect-[1/1] w-full rounded-2xl bg-muted object-cover"
            />
            <div className="absolute bottom-3 -left-4 w-[255px] rounded-xl border border-border bg-white p-5 shadow-[0_10px_35px_#00000012] md:-left-8">
              <div className="flex items-center justify-between">
                <p className="text-[8px] font-bold tracking-wider text-muted-foreground">
                  {partner
                    ? "PEG PARTNER · ORDER INTAKE"
                    : "PEG · YOUR LAUNDRY"}
                </p>
                <Icon
                  partner={partner}
                  file={partner ? "09ff3" : "beb53"}
                  className="!size-4"
                />
              </div>
              <p className="mt-3 font-display text-[17px] font-bold">
                {partner
                  ? "Weigh & Confirm Intake"
                  : "One load. A little relief."}
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {partner
                  ? "Order #PEG-1048 · Wash & Fold"
                  : "Wash & Fold · Pickup today"}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px]">
                <span>
                  {partner
                    ? "Actual weight confirmed"
                    : "Fresh clothes, on their way"}
                </span>
                <span className={`font-bold ${ink}`}>
                  {partner ? "4.5 kg ✓" : "In progress"}
                </span>
              </div>
            </div>
            <p className="absolute -bottom-1 right-0 text-[9px] tracking-wide text-muted-foreground">
              {partner ? "YOUR CRAFT. CONNECTED." : "EVERYDAY CARE. CONNECTED."}
            </p>
          </div>
        </section>

        <section className={`${tone} text-white`}>
          <div className={`${shell} grid gap-8 py-7 md:grid-cols-3`}>
            {features.map(([title, text, icon]) => (
              <div key={title} className="flex items-start gap-4">
                <Icon file={icon} partner={partner} gold className="mt-1" />
                <div>
                  <h2 className="font-display text-sm font-bold">{title}</h2>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/75">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="why" className={`${shell} py-16 lg:py-20`}>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className={eyebrow}>
                {partner
                  ? "YOUR BUSINESS. BETTER CONNECTED."
                  : "A LITTLE CARE FOR EVERY LOAD"}
              </p>
              <h2 className={`${heading} text-3xl md:text-[36px]`}>
                {partner ? (
                  <>
                    Good laundry deserves
                    <br />a clearer way to work.
                  </>
                ) : (
                  <>
                    From the daily pile
                    <br />
                    to your favourite pieces.
                  </>
                )}
              </h2>
            </div>
            <p className={`${body} max-w-[320px] text-[13px]`}>
              {partner
                ? "PEG brings together the daily work of a laundry business. A place for your shop, your orders, your loads and your earnings."
                : "Your everyday essentials deserve care that fits your routine. Choose the service and let your provider handle the rest."}
            </p>
          </div>
          <div
            className={`mt-8 grid gap-4 md:grid-cols-2 ${
              partner ? "lg:grid-cols-3" : "lg:grid-cols-4"
            }`}
          >
            {cards.map(([title, text, icon], index) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#8c6b1b]">
                    0{index + 1}
                  </span>
                  <Icon file={icon} partner={partner} />
                </div>
                <h3 className="font-display text-[17px] font-bold">{title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[10px] text-muted-foreground">
            {partner
              ? "ONE PLACE FOR THE WORK THAT GOES INTO EVERY LOAD."
              : "CARE THAT FITS YOUR CLOTHES. AND YOUR DAY."}
          </p>
        </section>

        <section className="bg-[#131313] text-white">
          <div className={`${shell} py-14`}>
            <p className="mb-4 text-[10px] font-bold tracking-wider text-accent">
              {partner ? "HOW TO JOIN" : "HOW IT WORKS"}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <h2 className={`${heading} text-3xl`}>
                {partner
                  ? "Your next chapter starts here."
                  : "Less guesswork. More fresh."}
              </h2>
              <p className="max-w-[240px] text-xs leading-relaxed text-white/60">
                {partner
                  ? "A simple path to putting your laundry business on the map."
                  : "Your laundry, handled in a few clear steps. More time for everything else."}
              </p>
            </div>
            <div className="mt-9 grid gap-8 md:grid-cols-3">
              {(partner
                ? [
                    [
                      "Register your shop",
                      "Share your business details and the services you offer.",
                    ],
                    [
                      "Set up for orders",
                      "Add your services, pricing and opening hours.",
                    ],
                    [
                      "Work in PEG Partner",
                      "Manage new orders, active loads and your earnings.",
                    ],
                  ]
                : [
                    [
                      "Choose your care",
                      "Pick a nearby provider and the service your clothes need.",
                    ],
                    [
                      "Choose your handover",
                      "Arrange a pickup or bring your load to the shop.",
                    ],
                    [
                      "Weigh, care, follow",
                      "Confirm the actual weight, then follow every step.",
                    ],
                  ]
              ).map(([title, text], index) => (
                <div key={title}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[10px] text-accent">
                      0{index + 1}
                    </span>
                    <div className="h-px grow bg-white/15" />
                  </div>
                  <h3 className="font-display text-[16px] font-bold">
                    {title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-relaxed text-white/65">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="app"
          className={`${shell} grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-24 lg:py-20`}
        >
          <div
            className={`flex min-h-[380px] items-center justify-center rounded-2xl p-8 ${
              partner ? "bg-[#e9f1ed]" : "bg-[#e9edf7]"
            }`}
          >
            <div className="w-full max-w-[300px] rounded-xl border border-black/5 bg-white p-6 shadow-[0_15px_40px_#0000000b]">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-muted-foreground">
                  {partner
                    ? "YOUR SHOP AT A GLANCE"
                    : "FIND YOUR NEXT FRESH START"}
                </span>
                <Icon
                  partner={partner}
                  file={partner ? "410ee" : "c9ac7"}
                  className="!size-5"
                />
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">
                {partner ? "Kwame Mensah" : "Good morning, Ama"}
              </h3>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {partner
                  ? "Mensah Laundry · Accra"
                  : "A little less laundry. A little more you."}
              </p>
              {partner ? (
                <>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {[
                      ["New orders", "3"],
                      ["Active loads", "5"],
                      ["Ready for pickup", "12"],
                      ["Paid this week", "GH₵ 960.00"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-[#f6f7f6] p-3">
                        <p className="text-[8px] text-muted-foreground">
                          {label}
                        </p>
                        <p className="mt-2 text-[17px] font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-[11px] font-bold">Keep things moving</p>
                    <p className="mt-2 text-[9px] text-muted-foreground">
                      3 orders need intake confirmation{" "}
                      <span className="float-right">→</span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-5 flex gap-2">
                    {["Wash & Fold", "Dry Clean"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setService(item)}
                        className={`rounded-md px-3 py-2 text-[9px] ${
                          service === item
                            ? "bg-[#19296c] text-white"
                            : "bg-muted"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <p className="mt-5 text-[11px] font-bold">
                    Providers near you
                  </p>
                  {[
                    "FreshPoint Laundry",
                    "Pristine Wash",
                    "Accra Laundry Co.",
                  ].map((name, index) => (
                    <div
                      key={name}
                      className="mt-3 flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <Icon partner={false} file="6b8b6" />
                      <div>
                        <p className="text-[10px] font-semibold">{name}</p>
                        <p className="mt-1 text-[8px] text-muted-foreground">
                          Pickup in Accra · {index + 1}.2 km away
                        </p>
                      </div>
                      <span className="ml-auto">›</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div>
            <p className={eyebrow}>
              {partner ? "THE PARTNER APP" : "CARE CLOSE TO HOME"}
            </p>
            <h2 className={`${heading} text-3xl md:text-[38px]`}>
              {partner ? (
                <>
                  Your working day,
                  <br />
                  in one view.
                </>
              ) : (
                <>
                  Find your kind
                  <br />
                  of laundry care.
                </>
              )}
            </h2>
            <p className={`${body} mt-5`}>
              {partner
                ? "From the first order to the last pickup, keep your shop in sync. PEG Partner brings the details together so you can focus on the care."
                : "PEG connects you with trusted laundry care nearby. Compare providers, choose what you need, and make room for the rest of your day."}
            </p>
            <ul className="mt-6 space-y-4">
              {(partner
                ? [
                    [
                      "Know what needs you",
                      "See new orders, intake and ready-for-pickup loads.",
                    ],
                    [
                      "Keep loads moving",
                      "Update progress, so your customers stay in the know.",
                    ],
                  ]
                : [
                    [
                      "Choose with confidence",
                      "Nearby shops you can book in the app, with pickup in Accra.",
                    ],
                    [
                      "A provider that fits",
                      "Find the services, location and handover that work for you.",
                    ],
                  ]
              ).map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className={`mt-0.5 ${ink}`}>✓</span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={start}
              className={`mt-6 text-xs font-semibold ${ink}`}
            >
              {partner ? "Explore PEG Partner" : "Find your provider"} →
            </button>
          </div>
        </section>

        <section
          className={`${shell} grid items-center gap-12 border-t border-border py-16 lg:grid-cols-2 lg:gap-24`}
        >
          <div>
            <p className={eyebrow}>
              {partner ? "A BETTER HANDOFF" : "YOUR LAUNDRY. YOUR WAY."}
            </p>
            <h2 className={`${heading} text-3xl md:text-[36px]`}>
              {partner ? (
                <>
                  Clear at intake.
                  <br />
                  Clear through the wash.
                </>
              ) : (
                <>
                  Your doorstep,
                  <br />
                  or their shop.
                </>
              )}
            </h2>
            <p className={`${body} mt-5`}>
              {partner
                ? "Confirm actual weight, record what arrives and keep the order clear from the start. The details stay together as your loads move."
                : "Choose pickup and delivery when life is busy. Or drop off at your provider on your way. Fresh laundry on terms that fit your day."}
            </p>
            <p className={`mt-5 text-sm ${ink}`}>
              ✓{" "}
              {partner
                ? "Confirm the actual weight before processing"
                : "Pickup and delivery, or easy drop-off"}
            </p>
            <p className={`mt-3 text-sm ${ink}`}>
              ✓{" "}
              {partner
                ? "Track progress, from intake to collection"
                : "A clear handover, every time"}
            </p>
          </div>
          <div
            className={`rounded-2xl p-7 md:p-10 ${
              partner ? "bg-[#e9f1ed]" : "bg-[#e9edf7]"
            }`}
          >
            <div className="rounded-xl bg-white p-6">
              <h3 className="font-display text-lg font-bold">
                {partner ? "Processing Workflow" : "Pickup / Delivery location"}
              </h3>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {partner
                  ? "Order #PEG-1048 · Wash & Fold"
                  : "Choose where your fresh start begins"}
              </p>
              {partner ? (
                <>
                  <div className="mt-5 rounded-lg border border-[#a7c3b7] bg-[#f1f7f4] p-4">
                    <p className="text-xs font-semibold">
                      Weigh & Confirm Intake
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        4.5 <span className="text-xs font-normal">kg</span>
                      </span>
                      <span className={`${ink} text-xs font-semibold`}>
                        GH₵ 45.00
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    ✓ Actual weight confirmed. Ready to wash.
                  </p>
                </>
              ) : (
                <>
                  <img
                    src="/assets/client/acaf6.png"
                    alt="Map showing your laundry pickup location"
                    className="mt-5 h-36 w-full rounded-lg object-cover"
                  />
                  <p className="mt-3 text-xs">⌖ East Legon, Accra</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className={`${tone} text-white`}>
          <div
            className={`${shell} grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-24`}
          >
            <div className="max-w-[460px] rounded-xl bg-white p-7 text-foreground">
              <p className="text-[9px] font-semibold tracking-wider text-muted-foreground">
                {partner ? "PAID ORDERS · THIS MONTH" : "YOUR LAUNDRY ESTIMATE"}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <h3 className="font-display text-3xl font-extrabold">
                  {partner ? "GH₵ 2,450.00" : `${weight || "0"} kg`}
                </h3>
                {!partner && (
                  <span className="text-sm font-semibold">
                    GH₵ {(Number(weight || 0) * 10).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                {partner
                  ? "Paid orders this month. Falcon settles shops outside the customer Paystack charge."
                  : "Estimate only. You pay the fee after the shop confirms the weight."}
              </p>
              {partner ? (
                <>
                  <div className="mt-5 flex justify-between border-t border-border pt-4 text-xs">
                    <span>Completed orders</span>
                    <span className="font-semibold">48 orders</span>
                  </div>
                  <div className="mt-3 flex justify-between text-xs">
                    <span>Awaiting Falcon payout</span>
                    <span className="font-semibold">GH₵ 2,450.00</span>
                  </div>
                  <button
                    onClick={start}
                    className={`${cta} mt-5 !min-h-10 !text-xs`}
                  >
                    View in PEG Partner ↗
                  </button>
                </>
              ) : (
                <label className="mt-5 flex items-center justify-between rounded-lg bg-[#eef1f8] p-3 text-xs">
                  Estimated weight (kg)
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    className="w-20 rounded-md border border-border bg-white p-2 text-right"
                  />
                </label>
              )}
            </div>
            <div>
              <p className="mb-4 text-[10px] font-bold tracking-wider text-accent">
                {partner
                  ? "EARNINGS WITHOUT THE GUESSWORK"
                  : "A LITTLE CLARITY BEFORE THE CARE"}
              </p>
              <h2 className={`${heading} text-3xl md:text-[36px]`}>
                {partner ? (
                  <>
                    See the work.
                    <br />
                    See the earnings.
                  </>
                ) : (
                  <>
                    Estimate first.
                    <br />
                    Pay after weighing.
                  </>
                )}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-[1.8] text-white/75">
                {partner
                  ? "Each order has a story. Know what was completed, what it earned and where your business stands. Your hard work, in clear numbers."
                  : "Choose a service and estimate your load. Your provider weighs your laundry at intake, so your final price is based on the actual weight. Simple, fair, and clear."}
              </p>
              <p className="mt-5 text-[11px] text-white/65">
                {partner
                  ? "Completed orders. Clear totals. All in PEG Partner."
                  : "Actual weight. Confirmed price. No laundry-day surprises."}
              </p>
            </div>
          </div>
        </section>

        <section
          id="join"
          className={`${shell} grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20`}
        >
          <div>
            <img
              src={`/assets/${folder}/${partner ? "afa4a" : "4840d"}.png`}
              alt={
                partner
                  ? "A laundry specialist carefully pressing clothes"
                  : "Neatly stacked soft, freshly cleaned towels"
              }
              className="aspect-[1.75] w-full rounded-xl bg-muted object-cover"
            />
            <p className="mt-3 text-[9px] tracking-wide text-muted-foreground">
              {partner
                ? "CARE IN EVERY DETAIL."
                : "FRESH CARE FOR THE EVERYDAY."}
            </p>
          </div>
          <div>
            <p className={eyebrow}>
              {partner
                ? "YOUR SHOP, READY FOR WHAT'S NEXT"
                : "CARE THAT FITS YOUR LIFE"}
            </p>
            <h2 className={`${heading} text-3xl`}>
              {partner ? (
                <>
                  Your shop details.
                  <br />A good place to start.
                </>
              ) : (
                <>
                  For the week ahead.
                  <br />
                  And the pile behind.
                </>
              )}
            </h2>
            <p className={`${body} mt-5`}>
              {partner
                ? "Tell nearby customers what makes your laundry theirs. A clear storefront is the beginning of a better connection."
                : "Work shirts, everyday favourites, the bedding that makes home feel like home. Laundry care that fits your day, without taking it over."}
            </p>
            <ul className="mt-5 space-y-3 text-xs">
              {(partner
                ? [
                    "Business name and location",
                    "Your services and prices",
                    "Opening hours and pickup options",
                  ]
                : [
                    "Vetted, nearby providers",
                    "Your choice of handover",
                    "Clear updates, from start to fresh",
                  ]
              ).map((text) => (
                <li key={text}>
                  <span className={`mr-3 ${ink}`}>✓</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="faqs"
          className={`${shell} grid gap-10 border-t border-border py-16 lg:grid-cols-[0.8fr_1.2fr]`}
        >
          <div>
            <p className={eyebrow}>A FEW THINGS TO KNOW</p>
            <h2 className={`${heading} text-3xl`}>
              {partner ? (
                "A clearer start."
              ) : (
                <>
                  Good questions.
                  <br />
                  Clear answers.
                </>
              )}
            </h2>
            <p className={`${body} mt-4 text-sm`}>
              A little clarity before your first {partner ? "order" : "load"}.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`mt-5 inline-block text-xs font-semibold ${ink}`}
            >
              Let's talk →
            </a>
          </div>
          <div>
            {questions.map(([question, answer]) => (
              <details
                key={question}
                className="group border-b border-border py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold">
                  {question}
                  <span className="text-lg font-normal group-open:hidden">
                    +
                  </span>
                  <span className="hidden text-lg font-normal group-open:block">
                    −
                  </span>
                </summary>
                <p className="mt-4 max-w-xl text-xs leading-[1.9] text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#131313] text-white">
          <div
            className={`${shell} flex flex-col justify-between gap-8 py-14 md:flex-row md:items-center`}
          >
            <div>
              <p className="mb-4 text-[10px] font-bold tracking-wider text-accent">
                {partner
                  ? "YOUR NEXT CHAPTER STARTS HERE"
                  : "LESS LAUNDRY. MORE LIFE."}
              </p>
              <h2 className={`${heading} text-3xl md:text-[40px]`}>
                {partner ? (
                  <>
                    You bring the care.
                    <br />
                    Let’s connect the rest.
                  </>
                ) : (
                  <>
                    Make room for
                    <br />
                    something else.
                  </>
                )}
              </h2>
              <p className="mt-5 text-xs text-white/65">
                {partner
                  ? "Join the PEG Partner network and put your everyday expertise in view."
                  : "Fresh laundry, without the laundry day. Make space for your life."}
              </p>
            </div>
            <div id="download">
              <StoreBadges />
              <button
                onClick={switchPage}
                className="mt-4 block text-[11px] text-white/75"
              >
                {partner
                  ? "Looking for laundry? Meet PEG →"
                  : "Run a laundry business? Meet PEG Partner →"}
              </button>
            </div>
          </div>
          <footer className={`${shell} pb-7 pt-5`}>
            <div className="grid gap-9 pb-10 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
              <div>
                <img
                  src={`/assets/${folder}/${partner ? "ba8b3" : "2aa0f"}.svg`}
                  alt={partner ? "PEG Partner" : "PEG"}
                  className={`h-10 object-contain ${partner ? "w-36" : "w-16"}`}
                />
                <p className="mt-4 text-xs text-white/60">
                  {partner
                    ? "PEG Partner is the shop app. Falcon Solutions operates PEG in Ghana."
                    : "Laundry pickup in Ghana. Pay after the shop weighs the load, through Paystack."}
                </p>
              </div>
              <div className="space-y-3 text-xs">
                <p className="font-semibold">Explore</p>
                <a href="#why" className="block text-white/60">
                  {partner ? "Why PEG Partner" : "How PEG works"}
                </a>
                <a href="#app" className="block text-white/60">
                  {partner ? "The partner app" : "Laundry services"}
                </a>
              </div>
              <div className="space-y-3 text-xs">
                <p className="font-semibold">For you</p>
                <button onClick={start} className="block text-white/60">
                  {partner ? "Join the network" : "Your laundry orders"}
                </button>
                <button onClick={switchPage} className="block text-white/60">
                  {partner ? "Looking for laundry?" : "PEG Partner"}
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <p className="font-semibold">Support</p>
                <Link href="/faq" className="block text-white/60">
                  FAQ
                </Link>
                <Link href="/feedback" className="block text-white/60">
                  Customer Feedback
                </Link>
                <a href={`mailto:${CONTACT_EMAIL}`} className="block text-white/60">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="space-y-3 text-xs">
                <p className="font-semibold">Legal</p>
                <Link href="/about" className="block text-white/60">
                  About
                </Link>
                <Link href="/terms" className="block text-white/60">
                  Terms
                </Link>
                <Link href="/privacy" className="block text-white/60">
                  Privacy
                </Link>
                <Link href="/refunds" className="block text-white/60">
                  Refunds
                </Link>
                <Link href="/contact" className="block text-white/60">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-[10px] text-white/50">
              <span>© {new Date().getFullYear()} PEG. Operated by Falcon Solutions. Accra, Ghana.</span>
              <span>Pay after weigh · MoMo and card via Paystack.</span>
            </div>
          </footer>
        </section>
      </main>

      {application && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
          onClick={() => setApplication(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-title"
            className="relative w-full max-w-lg rounded-2xl bg-background p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              autoFocus
              onClick={() => setApplication(false)}
              aria-label="Close"
              className="absolute right-5 top-4 text-2xl"
            >
              ×
            </button>
            <p className={eyebrow}>
              {partner ? "LET'S GROW TOGETHER" : "YOUR NEXT FRESH START"}
            </p>
            <h2 id="application-title" className={`${heading} text-3xl`}>
              {submitted
                ? "You're on the list."
                : partner
                  ? "Meet PEG Partner."
                  : "Make room for fresh."}
            </h2>
            {submitted ? (
              <>
                <p className={`${body} mt-5`}>
                  Your mail app should have opened to {CONTACT_EMAIL}. If it did
                  not, write us at that address with the same details.
                </p>
                <button
                  onClick={() => setApplication(false)}
                  className={`${cta} mt-6`}
                >
                  Back to PEG →
                </button>
              </>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()
                  const data = new FormData(event.currentTarget)
                  const subject = partner
                    ? "PEG Partner application"
                    : "PEG customer interest"
                  const body = [
                    `Name: ${data.get("name") || ""}`,
                    partner
                      ? `Shop: ${data.get("shop") || ""}`
                      : `Neighbourhood: ${data.get("neighbourhood") || ""}`,
                    `Email: ${data.get("email") || ""}`,
                  ].join("\n")
                  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                  setSubmitted(true)
                }}
              >
                <p className="text-xs leading-relaxed text-muted-foreground">
                  This opens an email to {CONTACT_EMAIL}. Falcon staff review
                  shop applications against a Ghana Card in PEG Partner.
                </p>
                <label className="block text-xs font-medium">
                  Your name
                  <input
                    required
                    name="name"
                    type="text"
                    className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[#b58b25]"
                  />
                </label>
                <label className="block text-xs font-medium">
                  {partner ? "Business name" : "Your neighbourhood"}
                  <input
                    required
                    name={partner ? "shop" : "neighbourhood"}
                    type="text"
                    className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[#b58b25]"
                  />
                </label>
                <label className="block text-xs font-medium">
                  Email address
                  <input
                    required
                    name="email"
                    type="email"
                    className="mt-2 block w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-[#b58b25]"
                  />
                </label>
                <button type="submit" className={`${cta} w-full`}>
                  {partner ? "Email Falcon" : "Email Falcon"} ↗
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
