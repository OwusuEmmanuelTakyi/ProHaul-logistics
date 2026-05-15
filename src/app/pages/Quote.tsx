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
  Package,
  Weight,
  Container,
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

/* ── Typewriter hook (no repeat) ── */
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
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
  "https://i.pinimg.com/1200x/b5/5b/f2/b55bf24820f5a9647f5e622d30e97790.jpg";
const ROAD_IMG =
  "https://i.pinimg.com/1200x/a4/6f/aa/a46faa47b6d9558698b94eb2cf420ebb.jpg";

const HERO_TYPEWRITER_TEXT = "tailored to every haulage requirement.";

const TANKER_SIZES = [
  { value: "27000", label: "27,000 L" },
  { value: "36000", label: "36,000 L" },
  { value: "45000", label: "45,000 L" },
  { value: "54000", label: "54,000 L" },
];

const CONTAINER_SIZES = [
  { value: "20ft", label: "20 ft Container" },
  { value: "40ft", label: "40 ft Container" },
];

const CARGO_TYPES = [
  { value: "bulk_petroleum", label: "Bulk Petroleum (PMS, AGO, DPK)" },
  { value: "container", label: "Container Cargo" },
  { value: "agricultural", label: "Agricultural Products" },
  { value: "cement", label: "Cement & Construction Materials" },
  { value: "fertilizer", label: "Fertilizer & Agro-inputs" },
  { value: "cross_border", label: "Cross-Border / Other" },
];

const TRUST_ITEMS = [
  { icon: Truck,        label: "Reliable Equipment",  sub: "We match capacity to your needs" },
  { icon: Shield,       label: "Dedicated Team",      sub: "Commitment to task"               },
  { icon: Clock,        label: "Quick Response",      sub: "24-hour response"                  },
  { icon: CheckCircle2, label: "Speed",               sub: "We meet your deadlines"            },
];

/* ─────────────────────────── component ─────────────────────────── */

export function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    tankerSize: "",
    containerSize: "",
    cargoWeight: "",
    cargoType: "",
    pickup: "",
    destination: "",
    pickupDate: "",
    deliveryDate: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY   = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "6%"] : ["0%", "22%"]);
  const heroOp = useTransform(scrollYProgress, [0, 0.88], [1, isMobile ? 0.4 : 0]);

  const { displayed: twDisplayed, done: twDone } = useTypewriter(HERO_TYPEWRITER_TEXT, 36, 700);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* cargo type helpers */
  const isBulkPetroleum = formData.cargoType === "bulk_petroleum";
  const isContainer     = formData.cargoType === "container";
  const isWeightCargo   = formData.cargoType !== "" && !isBulkPetroleum && !isContainer;

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

            {/* headline with typewriter on gradient span */}
            <motion.h1
              initial={{ opacity: 0, y: reduce ? 0 : isMobile ? 24 : 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.4rem,9vw,4.5rem)] font-extrabold leading-[0.97] tracking-tight"
            >
              Appropriate equipment{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                {twDisplayed}
                {/* blinking cursor while typing */}
                {!twDone && (
                  <span
                    className="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-orange-400"
                    style={{ animation: "blink 0.7s steps(1) infinite" }}
                  />
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 sm:text-[17px]"
            >
              A diverse fleet equipped to handle cargo transportation needs safely, efficiently, and reliably.
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

      {/* blink keyframe injected inline */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

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
                        right haulage solution within 1 business day.
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
                    >

                      {/* ── 01: Contact Info ── */}
                      <FormSection number="01" label="Contact Information">
                        {/* Row 1: Name + Company */}
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
                        </div>
                        {/* Row 2: Email + Phone */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                          <Field label="Email Address" required>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                              <input
                                name="email" type="email" value={formData.email}
                                onChange={set} required placeholder="you@example.com"
                                className={`${INPUT} pl-9`}
                              />
                            </div>
                          </Field>
                          <Field label="Phone Number" required>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                              <input
                                name="phone" type="tel" value={formData.phone}
                                onChange={set} required placeholder="+233 XX XXX XXXX"
                                className={`${INPUT} pl-9`}
                              />
                            </div>
                          </Field>
                        </div>
                      </FormSection>

                      {/* ── 02: Cargo Details ── */}
                      <FormSection number="02" label="Cargo Details">

                        {/* Cargo Type — full width */}
                        <Field label="Cargo Type" required>
                          <select
                            name="cargoType" value={formData.cargoType}
                            onChange={(e) => {
                              setFormData((p) => ({
                                ...p,
                                cargoType: e.target.value,
                                tankerSize: "",
                                containerSize: "",
                                cargoWeight: "",
                              }));
                            }}
                            required className={INPUT}
                          >
                            <option value="">Select cargo type…</option>
                            {CARGO_TYPES.map((c) => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                        </Field>

                        {/* ── Bulk Petroleum: tank capacity radio cards ── */}
                        <AnimatePresence>
                          {isBulkPetroleum && (
                            <motion.div
                              key="tanker"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden mt-4"
                            >
                              <Field label="Bulk Tank Capacity" required>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mt-1">
                                  {TANKER_SIZES.map((t) => (
                                    <label
                                      key={t.value}
                                      className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 py-4 text-sm font-semibold transition-all
                                        ${formData.tankerSize === t.value
                                          ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-sm shadow-orange-500/10"
                                          : "border-border bg-muted/40 text-muted-foreground hover:border-orange-300 hover:bg-muted"
                                        }`}
                                    >
                                      <input
                                        type="radio" name="tankerSize" value={t.value}
                                        checked={formData.tankerSize === t.value}
                                        onChange={set} className="sr-only"
                                      />
                                      <Truck className={`h-4 w-4 ${formData.tankerSize === t.value ? "text-orange-500" : "text-muted-foreground"}`} />
                                      <span>{t.label}</span>
                                    </label>
                                  ))}
                                </div>
                              </Field>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* ── Container Cargo: 20ft / 40ft cards ── */}
                        <AnimatePresence>
                          {isContainer && (
                            <motion.div
                              key="container"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden mt-4"
                            >
                              <Field label="Container Size" required>
                                <div className="grid grid-cols-2 gap-3 mt-1">
                                  {CONTAINER_SIZES.map((c) => (
                                    <label
                                      key={c.value}
                                      className={`flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 py-4 text-sm font-semibold transition-all
                                        ${formData.containerSize === c.value
                                          ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 shadow-sm shadow-orange-500/10"
                                          : "border-border bg-muted/40 text-muted-foreground hover:border-orange-300 hover:bg-muted"
                                        }`}
                                    >
                                      <input
                                        type="radio" name="containerSize" value={c.value}
                                        checked={formData.containerSize === c.value}
                                        onChange={set} className="sr-only"
                                      />
                                      <Container className={`h-4 w-4 ${formData.containerSize === c.value ? "text-orange-500" : "text-muted-foreground"}`} />
                                      {c.label}
                                    </label>
                                  ))}
                                </div>
                              </Field>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* ── Other cargo: weight input ── */}
                        <AnimatePresence>
                          {isWeightCargo && (
                            <motion.div
                              key="weight"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden mt-4"
                            >
                              <Field label="Estimated Cargo Weight (tonnes)" required>
                                <div className="relative mt-1">
                                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                  <input
                                    name="cargoWeight" type="number" min="0" step="0.1"
                                    value={formData.cargoWeight} onChange={set} required
                                    placeholder="e.g. 25.5"
                                    className={`${INPUT} pl-9`}
                                  />
                                </div>
                              </Field>
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </FormSection>

                      {/* ── 03: Route & Timeline ── */}
                      <FormSection number="03" label="Route & Timeline">
                        {/* Pickup + Delivery addresses */}
                        <div className="relative">
                          {/* vertical connector line */}
                          <div className="absolute left-[17px] top-[44px] bottom-[44px] w-px bg-gradient-to-b from-orange-400/60 to-orange-400/20 hidden sm:block" />
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Field label="Pickup Address" required>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-400 pointer-events-none" />
                                <input
                                  name="pickup" type="text" value={formData.pickup}
                                  onChange={set} required placeholder="e.g. Tema Port"
                                  className={`${INPUT} pl-9`}
                                />
                              </div>
                            </Field>
                            <Field label="Delivery Address" required>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                <input
                                  name="destination" type="text" value={formData.destination}
                                  onChange={set} required placeholder="e.g. Kumasi / Lagos"
                                  className={`${INPUT} pl-9`}
                                />
                              </div>
                            </Field>
                          </div>
                        </div>
                        {/* Pickup + Delivery dates */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
                          <Field label="Pickup Date">
                            <input
                              name="pickupDate" type="date" value={formData.pickupDate}
                              onChange={set} className={INPUT}
                            />
                          </Field>
                          <Field label="Delivery Date">
                            <input
                              name="deliveryDate" type="date" value={formData.deliveryDate}
                              onChange={set} className={INPUT}
                            />
                          </Field>
                        </div>
                      </FormSection>

                      {/* ── 04: Notes ── */}
                      <FormSection number="04" label="Additional Notes">
                        <textarea
                          name="notes" value={formData.notes} onChange={set}
                          rows={4}
                          placeholder="Special handling, documentation needs, delivery deadline, or any other details…"
                          className={`${INPUT} resize-none`}
                        />
                      </FormSection>

                      {/* ── Submit ── */}
                      <div className="px-6 pb-8 pt-2 sm:px-8">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-orange-500 px-8 py-4 text-[15px] font-bold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
                        >
                          <Send className="h-4 w-4" />
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
                      href="tel:+233244136797"
                      className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-500/10"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <Phone className="h-4 w-4 text-orange-500" />
                      </div>
                      +233 (0) 244 136 797
                    </a>
                    <a
                      href="mailto:Bookings@prohaul-logistics.com"
                      className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-500/10"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <Mail className="h-4 w-4 text-orange-500" />
                      </div>
                      Bookings@prohaul-logistics.com
                    </a>
                    <div className="flex items-start gap-3 rounded-2xl bg-muted px-4 py-3.5 text-sm font-semibold text-muted-foreground">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <MapPin className="h-4 w-4 text-orange-500" />
                      </div>
                      12 Avenue B West, North Legon, Accra — Ghana
                    </div>
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-slate-950/60" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={36}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-300">
              Have a question first?
            </p>
            <h2 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Our team is ready to help.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Whether it's a complex cross-border route or a local delivery, we have the fleet and expertise to get it done.
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

function FormSection({ number, label, children }: { number: string; label: string; children: ReactNode }) {
  return (
    <div className="px-6 py-7 sm:px-8 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3 mb-5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-[10px] font-extrabold text-white flex-shrink-0">
          {number}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500/15 text-[10px] font-extrabold text-orange-500">
        {number}
      </span>
      {label}
    </p>
  );
}

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