import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LogoMark } from "../components/Logo";

const FEATURES = [
  {
    title: "Instant AI analysis",
    desc: "Upload a chest X-ray and get a pneumonia screening result in seconds, powered by a trained convolutional neural network.",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    title: "Confidence scoring",
    desc: "Every result ships with a confidence percentage so clinicians can gauge how certain the model is.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <rect x="7" y="13" width="3" height="5" />
        <rect x="12" y="9" width="3" height="9" />
        <rect x="17" y="5" width="3" height="13" />
      </>
    ),
  },
  {
    title: "Patient records",
    desc: "Register patients, link scans to their history, and keep a running record of every analysis performed.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Private by design",
    desc: "Patient and scan data stays in your browser session, and nothing is sent anywhere except the image itself for analysis.",
    icon: <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />,
  },
  {
    title: "Exportable reports",
    desc: "Generate CSV reports of analyzed scans for record keeping and review.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l3 3 3-3" />
        <path d="M12 11v6" />
      </>
    ),
  },
];

const STEPS = [
  { step: "01", title: "Upload", desc: "Select a chest X-ray image for a registered patient." },
  { step: "02", title: "Analyze", desc: "The CNN model processes the image and returns a prediction." },
  { step: "03", title: "Review", desc: "Inspect the confidence score and the AI attention heatmap." },
  { step: "04", title: "Record", desc: "The result is saved to the patient's history automatically." },
];

const HEAT_OPACITY = [
  0.1, 0.15, 0.3, 0.2, 0.1, 0.08,
  0.15, 0.4, 0.75, 0.55, 0.25, 0.1,
  0.2, 0.6, 0.9, 0.7, 0.35, 0.15,
  0.08, 0.2, 0.4, 0.3, 0.12, 0.06,
];

const STATS = [
  {
    num: "<5s",
    label: "Per scan analysis",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    num: "GradCAM",
    label: "Visual explainability",
    icon: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    num: "CNN",
    label: "Deep learning model",
    icon: (
      <>
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="12" cy="19" r="2" />
        <circle cx="19" cy="12" r="2" />
        <path d="M7 12h10M12 7v10" />
      </>
    ),
  },
  {
    num: "100%",
    label: "Data stays on device",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="6" rx="1.5" />
        <rect x="4" y="14" width="16" height="6" rx="1.5" />
        <circle cx="7.5" cy="7" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="7.5" cy="17" r="0.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

function Icon({ children, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

const SCAN_CENTER_X = 220;
const SCAN_MIN_X = 70;
const SCAN_MAX_X = 370;
const SCAN_MAX_DIST = SCAN_CENTER_X - SCAN_MIN_X;
const BADGE_ANCHOR = { x: 428, y: 428 };

function ScanVisual() {
  const svgRef = useRef(null);
  const [dotX, setDotX] = useState(300);

  const confidence = Math.max(
    88,
    99 - (Math.abs(dotX - SCAN_CENTER_X) / SCAN_MAX_DIST) * 11
  ).toFixed(1);

  const handleMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    const nextX = Math.min(SCAN_MAX_X, Math.max(SCAN_MIN_X, fraction * 440));
    setDotX(nextX);
  };

  const handleLeave = () => setDotX(300);

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 440 440"
        className="w-full h-auto cursor-crosshair"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <circle cx="220" cy="220" r="200" fill="none" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="220" cy="220" r="150" fill="none" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="220" cy="220" r="100" fill="none" stroke="#1f2733" strokeWidth="1" strokeDasharray="2 6" />

        <path
          d="M210,110 C170,110 150,160 150,220 C150,280 170,330 198,338 C214,343 222,330 222,302 L222,128 C222,116 220,110 210,110 Z"
          fill="none" stroke="#9aa4b2" strokeWidth="1.6" strokeLinejoin="round"
        />
        <path
          d="M230,110 C270,110 290,160 290,220 C290,280 270,330 242,338 C226,343 218,330 218,302 L218,128 C218,116 220,110 230,110 Z"
          fill="none" stroke="#9aa4b2" strokeWidth="1.6" strokeLinejoin="round"
        />
        <path d="M220,80 L220,128" stroke="#9aa4b2" strokeWidth="1.6" strokeLinecap="round" />

        <line x1="40" y1="220" x2="400" y2="220" stroke="#38bdf8" strokeWidth="1.4" />
        {Array.from({ length: 19 }).map((_, i) => (
          <line key={i} x1={40 + i * 20} y1="214" x2={40 + i * 20} y2="226" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
        ))}

        <line
          x1={dotX} y1="220" x2={BADGE_ANCHOR.x} y2={BADGE_ANCHOR.y}
          stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 4"
          style={{ transition: "x1 0.12s ease-out" }}
        />
        <circle cx={dotX} cy="220" r="5" fill="#38bdf8" style={{ transition: "cx 0.12s ease-out" }} />
        <circle
          cx={dotX} cy="220" r="10" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5"
          style={{ transition: "cx 0.12s ease-out" }}
        />
      </svg>

      <div className="absolute -bottom-2 -right-2 sm:right-2 bg-deep-panel border border-deep-line rounded-xl px-4 py-3">
        <p className="text-[10.5px] font-medium text-deep-text-soft uppercase tracking-wide mb-0.5">Result</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-sm font-semibold text-deep-text">Normal</span>
          <span className="text-sm font-bold text-accent ml-1 tabular-nums">{confidence}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white text-ink">
      <Navbar />

      {/* Hero */}
      <section
        className="relative bg-deep overflow-hidden"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <p className="text-[12.5px] font-semibold tracking-wider uppercase text-accent mb-5">
              AI powered chest X-ray screening
            </p>
            <h1
              className="text-[44px] sm:text-[58px] leading-[1.05] font-semibold text-deep-text mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              See what the model sees.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-deep-text-soft max-w-[460px] mb-9">
              PneumoAI reads a chest X-ray with a trained CNN and overlays exactly where it
              looked, giving you a fast second read you can actually verify instead of a black box.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                to="/signup"
                className="bg-accent hover:bg-accent-dark text-deep px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                Get started free
              </Link>
              <Link
                to="/about"
                className="border border-deep-line hover:border-deep-text-dim text-deep-text px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-6 text-xs text-deep-text-dim">
              Research and educational project, not a certified medical device.
            </p>
          </div>

          <ScanVisual />
        </div>

        {/* Stats marquee */}
        <div className="border-t border-deep-line relative">
          <div
            className="overflow-hidden py-6"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <span className="flex w-max items-baseline animate-marquee">
              {[...STATS, ...STATS].map((s, i) => (
                <span key={i} className="flex items-baseline shrink-0">
                  <span className="text-lg font-bold text-deep-text" style={{ fontFamily: "var(--font-display)" }}>
                    {s.num}
                  </span>
                  <span className="text-[12.5px] text-deep-text-soft ml-2 mr-8 whitespace-nowrap">{s.label}</span>
                  <span className="text-deep-line mr-8">/</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20 sm:py-24">
        <div className="max-w-xl mb-10">
          <p className="text-[12.5px] font-semibold tracking-wider uppercase text-brand mb-3">Capabilities</p>
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-ink mb-3 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Built for clinical workflows
          </h2>
          <p className="text-[15px] text-ink-muted">
            Everything a small clinic needs to screen, explain, and track chest X-ray results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 01 — Explainable results */}
          <div className="group lg:col-span-2 bg-deep text-deep-text rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 min-h-[200px] border border-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(56,189,248,0.35)]">
            <div className="max-w-xs">
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-accent">
                  <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                </Icon>
                <span className="text-xs font-semibold text-deep-text-dim" style={{ fontFamily: "var(--font-display)" }}>01</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Explainable results</h3>
              <p className="text-sm text-deep-text-soft leading-relaxed">
                Every scan ships with a GradCAM heatmap showing exactly which lung regions
                influenced the call, so it can be reviewed, not just trusted.
              </p>
            </div>
            <div className="grid grid-cols-6 gap-1 shrink-0">
              {HEAT_OPACITY.map((o, i) => (
                <span key={i} className="w-4 h-4 sm:w-5 sm:h-5 rounded-[3px] transition-opacity duration-500 group-hover:opacity-100" style={{ background: "#38bdf8", opacity: o }} />
              ))}
            </div>
          </div>

          {/* 02 — Instant AI analysis */}
          <div className="group bg-white border border-line rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_12px_28px_-16px_rgba(16,24,40,0.18)]">
            <div className="flex items-start justify-between mb-3.5">
              <Icon className="text-ink-muted">{FEATURES[0].icon}</Icon>
              <span className="text-xs font-semibold text-ink-faint" style={{ fontFamily: "var(--font-display)" }}>02</span>
            </div>
            <h3 className="text-[15.5px] font-semibold mb-1.5">{FEATURES[0].title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{FEATURES[0].desc}</p>
            <svg viewBox="0 0 36 36" className="w-9 h-9 text-brand">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                strokeDasharray="80 94.2" transform="rotate(-90 18 18)"
              />
            </svg>
          </div>

          {/* 03 — Confidence scoring */}
          <div className="group bg-white border border-line rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_12px_28px_-16px_rgba(16,24,40,0.18)]">
            <div className="flex items-start justify-between mb-3.5">
              <Icon className="text-ink-muted">{FEATURES[1].icon}</Icon>
              <span className="text-xs font-semibold text-ink-faint" style={{ fontFamily: "var(--font-display)" }}>03</span>
            </div>
            <h3 className="text-[15.5px] font-semibold mb-1.5">{FEATURES[1].title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{FEATURES[1].desc}</p>
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 36 36" className="w-9 h-9 text-brand shrink-0">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray="88 94.2" transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="text-sm font-bold text-ink" style={{ fontFamily: "var(--font-display)" }}>94%</span>
            </div>
          </div>

          {/* 04 — Patient records */}
          <div className="group bg-white border border-line rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_12px_28px_-16px_rgba(16,24,40,0.18)]">
            <div className="flex items-start justify-between mb-3.5">
              <Icon className="text-ink-muted">{FEATURES[2].icon}</Icon>
              <span className="text-xs font-semibold text-ink-faint" style={{ fontFamily: "var(--font-display)" }}>04</span>
            </div>
            <h3 className="text-[15.5px] font-semibold mb-1.5">{FEATURES[2].title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{FEATURES[2].desc}</p>
            <div className="flex -space-x-2.5">
              {["JM", "SK", "LT"].map((label) => (
                <span key={label} className="w-7 h-7 rounded-full bg-app border-2 border-white flex items-center justify-center text-[9.5px] font-semibold text-ink-soft ring-1 ring-line">
                  {label}
                </span>
              ))}
              <span className="w-7 h-7 rounded-full bg-brand text-white border-2 border-white flex items-center justify-center text-[9.5px] font-semibold">
                +9
              </span>
            </div>
          </div>

          {/* 05 — Private by design */}
          <div className="group bg-sky-50 border border-sky-100 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_12px_28px_-16px_rgba(2,132,199,0.2)]">
            <div className="flex items-start justify-between mb-3.5">
              <Icon className="text-sky-600">{FEATURES[3].icon}</Icon>
              <span className="text-xs font-semibold text-sky-400" style={{ fontFamily: "var(--font-display)" }}>05</span>
            </div>
            <h3 className="text-[15.5px] font-semibold mb-1.5">{FEATURES[3].title}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{FEATURES[3].desc}</p>
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-sky-700 bg-white border border-sky-200 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              On-device only
            </span>
          </div>

          {/* 06 — Exportable reports */}
          <div className="group lg:col-span-3 bg-white border border-line rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_12px_28px_-16px_rgba(16,24,40,0.18)]">
            <div className="flex items-center gap-4">
              <Icon className="text-ink-muted shrink-0">{FEATURES[4].icon}</Icon>
              <div>
                <h3 className="text-[15.5px] font-semibold mb-1">{FEATURES[4].title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed max-w-md">{FEATURES[4].desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 pl-11 sm:pl-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft bg-app border border-line rounded-full px-3 py-1.5">
                pneumoai_report.csv
              </span>
              <span className="text-xs font-semibold text-ink-faint" style={{ fontFamily: "var(--font-display)" }}>06</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-deep text-deep-text">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-20 sm:py-24">
          <h2 className="text-[28px] sm:text-[32px] font-semibold mb-3 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            How it works
          </h2>
          <p className="text-[15px] text-deep-text-soft mb-14">From upload to recorded result in four steps.</p>

          <div className="relative">
            <div className="hidden sm:block absolute top-[18px] left-0 right-0 h-px bg-deep-line" />
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 sm:gap-6 relative">
              {STEPS.map((s) => (
                <div key={s.step}>
                  <div className="relative z-10 w-9 h-9 rounded-full border-2 border-accent bg-deep text-accent flex items-center justify-center text-xs font-bold mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-[15.5px] font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-sm text-deep-text-soft leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-20 text-center">
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-deep mb-3 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Ready to try it on a real scan?
          </h2>
          <p className="text-[15px] text-deep/80 mb-8">
            Create a free account and analyze your first chest X-ray in under a minute.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-deep hover:bg-black text-white px-7 py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Create account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep border-t border-deep-line">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 py-7 flex flex-col sm:flex-row justify-between items-center gap-3.5">
          <div className="flex items-center gap-2">
            <LogoMark size={16} className="text-accent" />
            <span className="font-semibold text-[13px] text-deep-text">PneumoAI</span>
          </div>
          <p className="text-xs text-deep-text-dim text-center sm:text-right max-w-md">
            PneumoAI is a research/educational project and is not a certified medical device.
            Results should not be used as a substitute for professional diagnosis.
          </p>
        </div>
      </footer>
    </div>
  );
}
