import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link } from "react-router";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Truck,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────── helpers ─────────────────────────── */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);
  return isMobile;
}

function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const safeY = reduce ? 0 : isMobile ? Math.min(y, 18) : y;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: safeY }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: isMobile ? 0.45 : 0.7,
        delay: isMobile ? Math.min(delay, 0.08) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-800" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* ─────────────────────────── data ─────────────────────────── */

const HERO_IMG =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=85";
const ROAD_IMG =
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85";

const TANKER_SIZES = [
  { value: "27000", label: "27,000 L" },
  { value: "36000", label: "36,000 L" },
  { value: "45000", label: "45,000 L" },
  { value: "54000", label: "54,000 L" },
];

const CARGO_TYPES = [
  "Petroleum / Fuel (PMS, AGO, DPK)",
  "Agricultural Products",
  "Cement & Construction Materials",
  "Fertilizer & Agro-inputs",
  "Container Cargo",
  "Cross-Border / Other",
];

const TRUST_ITEMS = [
  { icon: Shield,  label: "Safety-first operations",    sub: "Compliant handling on every trip" },
  { icon: Truck,   label: "Right tanker, right route",  sub: "We match capacity to your need"  },
  { icon: Clock,   label: "Fast response",              sub: "Our team replies promptly"        },
  { icon: CheckCircle2, label: "Transparent pricing",   sub: "No hidden fees or surprises"      },
];

/* ─────────────────────────── component ─────────────────────────── */

export function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    tankerSize: "",
    cargoType: "",
    pickup: "",
    destination: "",
    preferredDate: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "6%"] : ["0%", "22%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.88], [1, isMobile ? 0.4 : 0]);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full overflow-x-hidden bg-background">

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70svh] items-center overflow-hidden py-28 text-white lg:min-h-[640px]"
      >
        {/* parallax background */}
        <motion.div style={{ y: reduce ? "0%" : imgY }} className="absolute inset-0 z-0">
          <Img src={HERO_IMG} alt="ProHaul truck" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/70 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
        </motion.div>

        {/* dot-grid texture */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: isMobile ? "32px 32px" : "48px 48px",
          }}
        />

        <motion.div
          style={{ opacity: reduce ? 1 : heroOp }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 flex items-center gap-2 text-[13px] text-gray-400"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Get a Quote</span>
          </motion.p>

          <div className="max-w-3xl">
            {/* eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/12 px-4 py-2 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[13px] font-semibold text-orange-200 tracking-wide">
                Request a Haulage Quote
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              initial={{ opacity: 0, y: reduce ? 0 : isMobile ? 24 : 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.4rem,9vw,4.5rem)] font-extrabold leading-[0.97] tracking-tight"
            >
              Move your cargo{" "}
              <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                with confidence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 sm:text-[17px]"
            >
              Share your route, cargo, and preferred timeline — our team will
              put together the right haulage solution for you.
            </motion.p>

            {/* scroll nudge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="h-px w-10 bg-orange-500/60" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                Fill the form below
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════ TRUST STRIP ══════════════════ */}
      <section className="relative z-10 -mt-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {TRUST_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={i * 0.07} y={20}>
                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl transition-all hover:border-orange-400/40">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                      <Icon className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-snug">{item.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ FORM + SIDEBAR ══════════════════ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-12 xl:grid-cols-[1fr_360px]">

            {/* ── FORM ── */}
            <Reveal y={36}>
              <div className="rounded-3xl border border-border bg-card shadow-xl">

                {/* form header */}
                <div className="border-b border-border px-6 py-6 sm:px-8">
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-500">
                    Quote Form
                  </p>
                  <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                    Tell us what you need moved.
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Fill in the details below and our team will prepare a
                    tailored haulage response.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center gap-4 px-8 py-20 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-extrabold text-foreground">
                        Quote request sent!
                      </h3>
                      <p className="max-w-xs text-sm text-muted-foreground">
                        Our team will review your details and respond with the
                        right haulage solution.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                      >
                        Submit another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={submit}
                      className="space-y-0 divide-y divide-border"
                    >
                      {/* ── section: contact info ── */}
                      <div className="px-6 py-6 sm:px-8">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          01 — Contact Information
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Full Name" required>
                            <input
                              name="name" type="text" value={formData.name}
                              onChange={set} required placeholder="John Doe"
                              className={INPUT}
                            />
                          </Field>
                          <Field label="Company / Organization">
                            <input
                              name="company" type="text" value={formData.company}
                              onChange={set} placeholder="Optional"
                              className={INPUT}
                            />
                          </Field>
                          <Field label="Email Address" required>
                            <input
                              name="email" type="email" value={formData.email}
                              onChange={set} required placeholder="you@example.com"
                              className={INPUT}
                            />
                          </Field>
                          <Field label="Phone Number" required>
                            <input
                              name="phone" type="tel" value={formData.phone}
                              onChange={set} required placeholder="+233 XX XXX XXXX"
                              className={INPUT}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* ── section: cargo details ── */}
                      <div className="px-6 py-6 sm:px-8">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          02 — Cargo Details
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Tanker Capacity" required>
                            <select
                              name="tankerSize" value={formData.tankerSize}
                              onChange={set} required className={INPUT}
                            >
                              <option value="">Select capacity</option>
                              {TANKER_SIZES.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                              ))}
                            </select>
                          </Field>
                          <Field label="Cargo Type" required>
                            <select
                              name="cargoType" value={formData.cargoType}
                              onChange={set} required className={INPUT}
                            >
                              <option value="">Select type</option>
                              {CARGO_TYPES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </Field>
                        </div>
                      </div>

                      {/* ── section: route ── */}
                      <div className="px-6 py-6 sm:px-8">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          03 — Route & Timeline
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field label="Pickup Location" required>
                            <input
                              name="pickup" type="text" value={formData.pickup}
                              onChange={set} required placeholder="e.g. Tema Port"
                              className={INPUT}
                            />
                          </Field>
                          <Field label="Delivery Destination" required>
                            <input
                              name="destination" type="text" value={formData.destination}
                              onChange={set} required placeholder="e.g. Kumasi / Lagos"
                              className={INPUT}
                            />
                          </Field>
                          <Field label="Preferred Date" className="sm:col-span-2 sm:max-w-xs">
                            <input
                              name="preferredDate" type="date" value={formData.preferredDate}
                              onChange={set} className={INPUT}
                            />
                          </Field>
                        </div>
                      </div>

                      {/* ── section: notes ── */}
                      <div className="px-6 py-6 sm:px-8">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          04 — Additional Notes
                        </p>
                        <textarea
                          name="notes" value={formData.notes} onChange={set}
                          rows={4}
                          placeholder="Special handling, documentation needs, delivery deadline, or any other details…"
                          className={`${INPUT} resize-none`}
                        />
                      </div>

                      {/* ── submit ── */}
                      <div className="px-6 py-6 sm:px-8">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-orange-500 px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
                        >
                          <Send className="h-4.5 w-4.5" />
                          Submit Quote Request
                          <ArrowRight className="h-4 w-4" />
                        </motion.button>
                        <p className="mt-3 text-center text-[11px] text-muted-foreground">
                          We'll respond within 1 business day.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* ── SIDEBAR ── */}
            <div className="space-y-5 lg:sticky lg:top-28">

              {/* quick contact */}
              <Reveal delay={0.1} y={28}>
                <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
                    Quick Contact
                  </p>
                  <h3 className="mb-4 text-lg font-extrabold text-foreground">
                    Prefer to talk? Reach us directly.
                  </h3>
                  <div className="space-y-2.5">
                    <a
                      href="tel:+233XXXXXXXXX"
                      className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-500/10"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <Phone className="h-4 w-4 text-orange-500" />
                      </div>
                      +233 XX XXX XXXX
                    </a>
                    <a
                      href="mailto:info@prohaul.com"
                      className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-500/10"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <Mail className="h-4 w-4 text-orange-500" />
                      </div>
                      info@prohaul.com
                    </a>
                    <div className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-muted-foreground">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <MapPin className="h-4 w-4 text-orange-500" />
                      </div>
                      Accra, Ghana
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* checklist */}
              <Reveal delay={0.18} y={28}>
                <div className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-400">
                    What to include
                  </p>
                  <h3 className="mb-5 text-lg font-extrabold">
                    Quote checklist
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Your name & contact details",
                      "Tanker capacity required",
                      "Cargo type & description",
                      "Pickup & delivery locations",
                      "Preferred delivery date",
                    ].map((step, i) => (
                      <li key={step} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-[11px] font-black text-white">
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* tanker sizes */}
              <Reveal delay={0.24} y={28}>
                <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-500">
                    Tanker Sizes
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {TANKER_SIZES.map((t) => (
                      <div
                        key={t.value}
                        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-muted py-4 text-center"
                      >
                        <p className="text-[18px] font-extrabold text-foreground leading-none">
                          {t.label.split(" ")[0]}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                          Litres
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={ROAD_IMG} alt="ProHaul road" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/85 to-orange-700/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={36}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-300">
              ProHaul Logistics
            </p>
            <h2 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Reliable quotes start with clear details.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Tanker capacities from 27,000 L to 54,000 L — serving Ghana and
              West Africa with safety-first haulage.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-[1.02]"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── sub-components ─────────────── */

const INPUT =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 dark:bg-slate-900/40";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-[13px] font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-orange-500">*</span>}
      </label>
      {children}
    </div>
  );
}