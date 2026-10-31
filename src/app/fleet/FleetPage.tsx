import { lazy, Suspense } from "react"
import { Link, usePageMeta } from "../../lib/routing"

// three.js is only downloaded when someone opens this page.
const FleetViewer = lazy(() => import("./FleetViewer"))

const notes = [
  {
    title: "Built on the SL150ZH-200L",
    body: "A 150cc-class cargo tricycle with a live rear axle on leaf springs. It is common on Accra roads and easy to service.",
  },
  {
    title: "A closed laundry box",
    body: "The open cage is replaced by a closed box with twin rear doors. Orders stay dry and clean, and every side carries the PEG livery.",
  },
  {
    title: "A rail for pressed clothes",
    body: "Shirts, kaftans and suits hang from a rail fixed to the roof of the box. Bagged and folded orders ride on the floor beside them.",
  },
]

export default function FleetPage() {
  usePageMeta(
    "PEG cargo trike | PEG",
    "Explore the PEG cargo trike in 3D: a concept laundry pickup vehicle built on the SL150ZH-200L, with a closed box and a garment rail.",
  )

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:px-8 md:pt-20">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a5c15]">
          PEG fleet · Concept
        </p>
        <h1 className="mt-3 max-w-3xl text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.05] tracking-[-0.035em] [text-wrap:balance]">
          The PEG cargo trike<span className="text-[#d3a33a]">.</span>
        </h1>
        <p
          className="mt-5 max-w-2xl text-[16px] leading-[1.7] text-[#5a5a5a]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          A concept for laundry pickup and delivery in Ghana, in PEG colours.
          Turn it around, switch the livery, open the doors and look inside.
          Today, pickup is arranged with a delivery partner. This is how a PEG
          trike could look.
        </p>
      </section>

      <section
        className="mx-auto max-w-6xl px-5 md:px-8"
        aria-label="3D trike viewer"
      >
        <Suspense
          fallback={
            <div className="grid h-[min(440px,52svh)] place-items-center rounded-2xl border border-black/5 bg-[#eeeeea] text-sm text-[#5a5a5a] sm:h-[min(540px,55svh)] lg:h-[620px]">
              Loading the 3D model…
            </div>
          }
        >
          <FleetViewer />
        </Suspense>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {notes.map((n) => (
            <div key={n.title} className="border-t-2 border-[#f0c749] pt-5">
              <h2 className="text-lg font-extrabold tracking-tight">
                {n.title}
              </h2>
              <p
                className="mt-2 text-[14px] leading-[1.7] text-[#5a5a5a]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {n.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#131313] p-7 text-white md:flex-row md:items-center md:p-9">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0c749]">
              Laundry, sorted.
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
              Book a pickup in the PEG app.
            </p>
          </div>
          <Link
            href="/#download"
            className="inline-flex min-h-12 items-center rounded-xl bg-[#f0c749] px-6 text-sm font-bold text-[#131313] transition hover:-translate-y-0.5 hover:bg-[#e5b938]"
          >
            Get the app ↓
          </Link>
        </div>
      </section>
    </main>
  )
}
