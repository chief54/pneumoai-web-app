import { useState } from "react";
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

const CHANNELS = [
  {
    label: "Email",
    value: "aboagyegerald56@gmail.com",
    href: "mailto:aboagyegerald56@gmail.com",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2.5" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
  },
  {
    label: "Phone",
    value: "+233 534 559 830",
    href: "tel:+233534559830",
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
    ),
  },
  {
    label: "Location",
    value: "Kumasi, Ghana",
    href: null,
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name || "the PneumoAI site"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:aboagyegerald56@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="bg-white text-ink">
      <Navbar />

      {/* Hero */}
      <section
        className="relative bg-deep overflow-hidden"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      >
        <div className="max-w-3xl mx-auto px-6 sm:px-12 py-20 sm:py-24 text-center">
          <p className="text-[12.5px] font-semibold tracking-wider uppercase text-accent mb-4">Get in touch</p>
          <h1
            className="text-[34px] sm:text-[44px] leading-[1.15] font-semibold text-deep-text mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions, feedback, or a scan<br className="hidden sm:block" /> you want to talk through?
          </h1>
          <p className="text-base text-deep-text-soft max-w-xl mx-auto">
            Reach out directly — this is a small, independent project, so messages go
            straight to a real inbox, not a queue.
          </p>
        </div>
      </section>

      {/* Form + channels */}
      <section className="max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Form card */}
          <div className="bg-white border border-line rounded-2xl p-7 sm:p-9 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <span className="w-14 h-14 rounded-full bg-sky-50 border border-sky-100 text-brand flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6">
                    <path d="M20 6 9 17l-5-5" />
                  </Icon>
                </span>
                <h2 className="text-lg font-semibold text-ink mb-1.5">Your email app should be open</h2>
                <p className="text-sm text-ink-muted max-w-xs mb-6">
                  Finish sending it from there. Didn't open? Email directly at{" "}
                  <a href="mailto:aboagyegerald56@gmail.com" className="text-brand font-medium">
                    aboagyegerald56@gmail.com
                  </a>
                  .
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                >
                  &larr; Back to the form
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-ink mb-1">Send a message</h2>
                <p className="text-[13px] text-ink-muted mb-6">
                  Fill this in and it'll open as a ready-to-send email.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        placeholder="Ada Lovelace"
                        className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="you@clinic.com"
                        className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      placeholder="What's on your mind?"
                      className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                      value={form.message}
                      onChange={update("message")}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-brand hover:bg-brand-dark text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
                  >
                    Send message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-4">
            <div className="bg-deep text-deep-text rounded-2xl p-6 sm:p-7">
              <p className="text-[11.5px] font-semibold tracking-wider uppercase text-accent mb-5">Direct channels</p>
              <div className="space-y-4">
                {CHANNELS.map((c) => {
                  const Wrapper = c.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={c.label}
                      href={c.href || undefined}
                      className={`flex items-center gap-3.5 group ${c.href ? "cursor-pointer" : ""}`}
                    >
                      <span className="w-10 h-10 rounded-xl bg-deep-panel border border-deep-line flex items-center justify-center text-accent shrink-0 transition-colors group-hover:border-accent/50">
                        <Icon>{c.icon}</Icon>
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10.5px] font-medium text-deep-text-dim uppercase tracking-wide">{c.label}</p>
                        <p className="text-sm font-medium text-deep-text truncate">{c.value}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-2xl p-5">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-sm text-ink-soft leading-relaxed">
                <span className="font-semibold text-ink">Usually replies within a day.</span>{" "}
                Built and maintained by one person, so thanks for your patience.
              </p>
            </div>
          </div>
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
