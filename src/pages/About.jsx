import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { LogoMark } from "../components/Logo";

function Icon({ children, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

const STEPS = [
  {
    step: "01",
    title: "Upload",
    desc: "Select a chest X-ray image (PNG or JPG) for a registered patient. Everything else stays in your browser — only the image itself leaves it, to be analyzed.",
    icon: (
      <>
        <path d="M16 16l-4-4-4 4" />
        <path d="M12 12v9" />
        <path d="M20.4 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 1 0 4 15.3" />
      </>
    ),
  },
  {
    step: "02",
    title: "Analyze",
    desc: "A convolutional neural network trained on chest X-rays processes the image and outputs a probability of pneumonia, in well under five seconds.",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    step: "03",
    title: "Review",
    desc: "A GradCAM heatmap overlays the regions that most influenced the call, alongside a confidence score and a list of attention regions, so the result can be sanity-checked instead of just trusted.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </>
    ),
  },
  {
    step: "04",
    title: "Record",
    desc: "The prediction, confidence, and heatmap save to the patient's scan history automatically, ready to export as a CSV report later.",
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

const SPECS = [
  {
    title: "Architecture",
    desc: "A convolutional neural network trained on grayscale, 150×150 chest X-rays.",
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
    title: "Explainability",
    desc: "Gradient-weighted class activation mapping (GradCAM), smoothed into focused attention zones rather than noisy pixels.",
    icon: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: "Dataset",
    desc: "Trained on the widely used public chest X-ray pneumonia dataset: thousands of labeled NORMAL and PNEUMONIA scans.",
    icon: <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z" />,
  },
  {
    title: "Output",
    desc: "A prediction label, a confidence score, a heatmap overlay, and named attention regions — not just a single number.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <rect x="7" y="13" width="3" height="5" />
        <rect x="12" y="9" width="3" height="9" />
        <rect x="17" y="5" width="3" height="13" />
      </>
    ),
  },
];

export default function About() {
  return (
    <div className="bg-white text-ink">
      <Navbar />

      {/* Hero */}
      <section
        className="bg-deep text-deep-text"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-12 py-20 sm:py-24 text-center">
          <p className="text-[12.5px] font-semibold tracking-wider uppercase text-accent mb-4">How it works</p>
          <h1
            className="text-[34px] sm:text-[44px] leading-[1.15] font-semibold mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From X-ray to explained result.
          </h1>
          <p className="text-base text-deep-text-soft max-w-xl mx-auto">
            A walk through what actually happens between uploading a scan and getting
            a prediction you can verify, not just trust.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
        {STEPS.map((s, i) => (
          <div
            key={s.step}
            className={`flex flex-col sm:flex-row gap-6 sm:gap-10 items-start py-9 ${i > 0 ? "border-t border-line" : ""}`}
          >
            <div className="flex items-center gap-4 sm:w-44 shrink-0">
              <span className="text-3xl font-bold text-line" style={{ fontFamily: "var(--font-display)" }}>{s.step}</span>
              <span className="w-10 h-10 rounded-xl bg-app border border-line flex items-center justify-center text-brand shrink-0">
                <Icon>{s.icon}</Icon>
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-[15px] text-ink-muted leading-relaxed max-w-xl">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Under the hood */}
      <section className="bg-deep text-deep-text">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
          <p className="text-[12.5px] font-semibold tracking-wider uppercase text-accent mb-3">Under the hood</p>
          <h2 className="text-2xl sm:text-[28px] font-semibold mb-10 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            What's actually running
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SPECS.map((spec) => (
              <div key={spec.title} className="bg-deep-panel border border-deep-line rounded-2xl p-6">
                <Icon className="text-accent mb-3.5">{spec.icon}</Icon>
                <h3 className="text-[15.5px] font-semibold mb-1.5">{spec.title}</h3>
                <p className="text-sm text-deep-text-soft leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + disclaimer */}
      <section className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-20">
        <p className="text-[12.5px] font-semibold tracking-wider uppercase text-brand mb-3">About the project</p>
        <h2 className="text-2xl font-semibold text-ink mb-5 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          A final-year project, built to be checked, not just believed
        </h2>
        <p className="text-[15px] text-ink-muted leading-relaxed mb-4">
          PneumoAI pairs a trained deep learning model with a simple web interface for
          uploading scans, tracking patients, and reviewing results. Alongside a prediction
          and confidence score, it generates a GradCAM heatmap that highlights the regions
          of the image the model focused on, so the result can be sanity-checked rather than
          treated as a black box.
        </p>
        <p className="text-[15px] text-ink-muted leading-relaxed mb-8">
          It started as an academic project and stayed one: a way to pair a real model
          with a real interface, in the open, with its reasoning visible at every step.
        </p>

        <div className="flex gap-3.5 items-start bg-warning-bg border border-warning-border rounded-xl p-5">
          <Icon className="text-warning shrink-0 mt-0.5">
            <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            <path d="M12 9v4" /><path d="M12 17h.01" />
          </Icon>
          <p className="text-sm text-warning leading-relaxed">
            This is a research and educational tool, not a certified medical device.
            It is not a substitute for diagnosis by a qualified healthcare professional.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-xl mx-auto px-6 sm:px-12 pb-20 text-center">
        <Link
          to="/signup"
          className="inline-block bg-brand hover:bg-brand-dark text-white px-7 py-3 rounded-lg font-semibold text-sm transition-colors"
        >
          Try it on a real scan
        </Link>
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
