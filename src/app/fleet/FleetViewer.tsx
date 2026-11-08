import { useEffect, useRef, useState } from "react";
import {
  LIVERIES,
  OPTION_LABELS,
  PARTS,
  VIEWS,
  type LiveryId,
  type PartId,
  type TrikeOptions,
  type ViewId,
} from "./trikeData";
import { createTrikeScene, type TrikeController } from "./trikeScene";

const reduceMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
const coarsePointer = () => window.matchMedia?.("(pointer: coarse)").matches ?? false;

const defaultOptions = (): TrikeOptions => ({
  spin: !reduceMotion(),
  drive: false,
  doors: false,
  cut: false,
  lights: false,
  canopy: true,
});

const label = "text-[10px] font-bold uppercase tracking-[0.14em] text-[#5a5a5a]";

export default function FleetViewer() {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ctrl = useRef<TrikeController | null>(null);
  const [failed, setFailed] = useState(false);
  const [view, setView] = useState<ViewId | null>("hero");
  const [part, setPart] = useState<PartId | null>(null);
  const [livery, setLivery] = useState<LiveryId>("onyx");
  const [options, setOptions] = useState<TrikeOptions>(defaultOptions);
  const [touch] = useState(coarsePointer);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    try {
      ctrl.current = createTrikeScene(host, options, {
        onInteract: () => {
          setView(null);
          setOptions((o) => (o.spin ? { ...o, spin: false } : o));
        },
      });
    } catch {
      setFailed(true);
    }
    return () => {
      ctrl.current?.dispose();
      ctrl.current = null;
    };
    // The scene is built once; later option and livery changes are pushed by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => ctrl.current?.setOptions(options), [options]);
  useEffect(() => ctrl.current?.setLivery(livery), [livery]);

  const activePart = PARTS.find((p) => p.id === part) ?? null;

  // The controls sit below the model. If a control changes something that is scrolled out of view, bring the model back.
  const reveal = () => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 60 || r.bottom > window.innerHeight + 40) {
      el.scrollIntoView({
        behavior: reduceMotion() ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  const chooseView = (id: ViewId) => {
    reveal();
    setView(id);
    setPart(null);
    setOptions((o) => ({ ...o, spin: false }));
    ctrl.current?.setView(id);
  };

  const inspect = (id: PartId) => {
    const p = PARTS.find((x) => x.id === id);
    if (!p) return;
    reveal();
    setPart(id);
    setView(null);
    setOptions((o) => ({
      ...o,
      spin: false,
      doors: p.doors ? true : o.doors,
      cut: p.cutaway ? true : o.cut,
      canopy: p.canopy ? true : o.canopy,
    }));
    ctrl.current?.inspect(id);
  };

  const reset = () => {
    setPart(null);
    setView("hero");
    setLivery("onyx");
    setOptions(defaultOptions());
    ctrl.current?.setView("hero");
  };

  const toggle = (key: keyof TrikeOptions) => {
    reveal();
    setOptions((o) => ({ ...o, [key]: !o[key] }));
  };
  const chooseLivery = (id: LiveryId) => {
    reveal();
    setLivery(id);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* On phones and tablets the model sticks under the header while the controls scroll beneath it. */}
      <div
        ref={stageRef}
        className="sticky top-[76px] z-10 h-[min(440px,52svh)] overflow-hidden rounded-2xl border border-black/5 shadow-[0_12px_30px_#13131312] sm:h-[min(540px,55svh)] lg:relative lg:top-auto lg:h-[620px] lg:shadow-none"
        style={{
          background: "radial-gradient(120% 90% at 45% 40%, #ffffff 0%, #e6e6e1 100%)",
        }}
      >
        <div
          ref={hostRef}
          className="absolute inset-0"
          role="img"
          aria-label="3D model of the PEG cargo trike. Drag to rotate it."
        />

        {failed ? (
          <div className="absolute inset-0 grid place-items-center p-8 text-center text-sm text-[#5a5a5a]">
            This browser could not start WebGL, so the 3D model cannot be shown.
          </div>
        ) : (
          <>
            <p className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-medium text-[#5a5a5a] shadow-sm backdrop-blur">
              {touch ? "Drag to rotate. Pinch to zoom." : "Drag to rotate. Ctrl + scroll to zoom."}
            </p>
            <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white/90 shadow-sm backdrop-blur">
              <button
                type="button"
                aria-label="Zoom in"
                className="grid h-10 w-10 place-items-center text-lg font-semibold text-[#131313] hover:bg-[#f0f0ee]"
                onClick={() => ctrl.current?.zoom(0.8)}
              >
                +
              </button>
              <span className="h-px bg-black/5" />
              <button
                type="button"
                aria-label="Zoom out"
                className="grid h-10 w-10 place-items-center text-lg font-semibold text-[#131313] hover:bg-[#f0f0ee]"
                onClick={() => ctrl.current?.zoom(1.25)}
              >
                −
              </button>
            </div>
          </>
        )}

        {activePart && (
          <div
            className="absolute bottom-3 left-3 right-3 rounded-xl border border-black/5 bg-white p-4 pr-10 shadow-[0_18px_50px_#13131318] sm:bottom-5 sm:left-5 sm:right-auto sm:w-[360px]"
            aria-live="polite"
          >
            <button
              type="button"
              aria-label="Close part details"
              className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg text-lg text-[#5a5a5a] hover:bg-[#f0f0ee]"
              onClick={() => setPart(null)}
            >
              ×
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7a5c15]">
              {activePart.kicker}
            </p>
            <h3 className="mt-1 text-lg font-extrabold tracking-tight">{activePart.title}</h3>
            <p
              className="mt-1 text-[13px] leading-relaxed text-[#5a5a5a]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {activePart.body}
            </p>
          </div>
        )}
      </div>

      <aside
        className="grid gap-x-8 gap-y-7 rounded-2xl border border-black/5 bg-white p-5 sm:grid-cols-2 md:p-6 lg:grid-cols-4"
        style={{ fontFamily: "Inter, sans-serif" }}
        aria-label="Trike viewer controls"
      >
        <div className="flex flex-col gap-2.5">
          <p className={label}>Camera</p>
          <div className="grid grid-cols-3 gap-1.5">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={view === v.id}
                onClick={() => chooseView(v.id)}
                className={`rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors ${
                  view === v.id
                    ? "border-[#131313] bg-[#131313] text-white"
                    : "border-black/8 bg-[#f6f6f4] text-[#131313] hover:border-[#b58b25]"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className={label}>Inspect a part</p>
          <ul className="flex flex-col gap-1">
            {PARTS.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={part === p.id}
                  onClick={() => inspect(p.id)}
                  className={`grid w-full grid-cols-[22px_1fr_auto] items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left text-[13px] font-medium transition-colors ${
                    part === p.id
                      ? "border-black/8 bg-[#f6f6f4]"
                      : "border-transparent hover:bg-[#f6f6f4]"
                  }`}
                >
                  <span className="grid h-[22px] w-[22px] place-items-center rounded-md bg-[#131313] text-[11px] font-bold tabular-nums text-[#f0c749]">
                    {i + 1}
                  </span>
                  <span>{p.title}</span>
                  <span aria-hidden="true" className="text-xs text-[#5a5a5a]">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className={label}>Livery</p>
          <div className="grid grid-cols-3 gap-1.5 lg:grid-cols-1">
            {LIVERIES.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={livery === l.id}
                onClick={() => chooseLivery(l.id)}
                className={`flex flex-col items-start gap-2 rounded-xl border p-2.5 text-left text-[13px] font-semibold leading-tight transition-colors lg:grid lg:grid-cols-[36px_1fr] lg:items-center lg:gap-3 ${
                  livery === l.id
                    ? "border-[#b58b25] shadow-[inset_0_0_0_1px_#b58b25]"
                    : "border-black/8 hover:border-[#b58b25]/60"
                }`}
              >
                <span
                  className="relative h-7 w-9 overflow-hidden rounded-md"
                  style={{
                    background: `linear-gradient(${l.box} 0 78%, #f0c749 78%)`,
                  }}
                />
                <span>
                  {l.name}
                  <small className="mt-0.5 hidden text-[11px] font-normal text-[#5a5a5a] lg:block">
                    {l.note}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className={label}>Options</p>
          {OPTION_LABELS.map(({ key, label: text }) => (
            <button
              key={key}
              type="button"
              role="switch"
              aria-checked={options[key]}
              onClick={() => toggle(key)}
              className="flex items-center justify-between gap-3 rounded-lg px-0.5 py-2 text-left text-[13px] font-medium"
            >
              {text}
              <span
                aria-hidden="true"
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  options[key] ? "bg-[#131313]" : "bg-[#e3e3de]"
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full shadow transition-transform ${
                    options[key] ? "translate-x-4 bg-[#f0c749]" : "bg-white"
                  }`}
                />
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="mt-1 self-start py-1.5 text-xs font-semibold text-[#5a5a5a] underline underline-offset-4 hover:text-[#131313]"
          >
            Reset view
          </button>
        </div>
      </aside>
    </div>
  );
}
