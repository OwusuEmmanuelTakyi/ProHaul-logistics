import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Container,
  Droplet,
  FileCheck2,
  Globe,
  Mail,
  MapPin,
  Package,
  Phone,
  Send,
  Shield,
  Truck,
} from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function Reveal({
  children,
  delay = 0,
  y = 56,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-45px" });
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const safeY = reduceMotion ? 0 : isMobile ? Math.min(y, 24) : y;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: safeY }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: safeY }}
      transition={{
        duration: isMobile ? 0.5 : 0.75,
        delay: isMobile ? Math.min(delay, 0.12) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealX({
  children,
  delay = 0,
  x = -64,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-45px" });
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const safeX = reduceMotion || isMobile ? 0 : x;
  const safeY = reduceMotion ? 0 : isMobile ? 24 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: safeX, y: safeY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: safeX, y: safeY }}
      transition={{
        duration: isMobile ? 0.5 : 0.75,
        delay: isMobile ? Math.min(delay, 0.12) : delay,
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
      {!loaded && <div className="absolute inset-0 bg-slate-700 animate-pulse" />}
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

const IMGS = {
  hero: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=85",
  cargo: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
  road: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
};

const cargoTypes = [
  { value: "27000L", label: "27,000L", icon: Droplet },
  { value: "36000L", label: "36,000L", icon: Droplet },
  { value: "45000L", label: "45,000L", icon: Droplet },
  { value: "54000L", label: "54,000L", icon: Droplet },
];

const benefits = [
  {
    icon: Shield,
    title: "Safety-led pricing",
    text: "Your quote reflects the correct cargo handling, insurance, compliance, and route requirements.",
  },
  {
    icon: Truck,
    title: "Right tanker allocation",
    text: "We match your request to the right tanker size, route, schedule, and operational requirement.",
  },
  {
    icon: Clock,
    title: "Fast response",
    text: "Share your route, tanker size, pickup point, destination, and timeline so our team can respond.",
  },
  {
    icon: FileCheck2,
    title: "Clear requirements",
    text: "We use your pickup, destination, cargo details, volume, and date to plan the movement properly.",
  },
];

const requestSteps = [
  "Choose the tanker/cargo capacity you need.",
  "Add pickup and delivery locations.",
  "Describe your cargo and quantity details.",
  "Submit and wait for our team to respond.",
];

export function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    cargoType: "",
    pickup: "",
    destination: "",
    cargoDescription: "",
    cargoVolume: "",
    preferredDate: "",
    message: "",
  });

  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.35 : 0]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Quote request submitted:", formData);
  };

  return (
    <div className="w-full overflow-x-hidden bg-background">
      <section ref={heroRef} className="relative min-h-[72svh] lg:min-h-[680px] flex items-center overflow-hidden py-24 text-white">
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={IMGS.hero} alt="ProHaul haulage quote request" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/72 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-transparent to-transparent" />
        </motion.div>

        <div
          className="absolute inset-0 z-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "80px 80px",
          }}
        />

        <motion.div style={{ opacity: reduceMotion ? 1 : heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex flex-wrap items-center gap-2 text-sm"
          >
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <span className="text-white">Get a Quote</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mb-6 inline-flex max-w-full items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/15 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">Request a Haulage Quote</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.55rem,12vw,4.8rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              Get a quote for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">cargo movement.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              Share your tanker capacity, cargo details, pickup point, destination, and preferred delivery timeline. ProHaul will review your request and prepare a suitable haulage response.
            </motion.p>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.08} y={30}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-2xl transition-all hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
                  <Icon className="mb-4 h-7 w-7 text-orange-500" />
                  <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-start">
            <RevealX x={-70}>
              <div className="rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Quote Form</p>
                <h2 className="mb-4 text-3xl md:text-4xl font-extrabold text-foreground">Tell us what you need moved.</h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  Select the tanker capacity and provide your pickup, destination, cargo details, and preferred delivery date.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-semibold text-foreground">Full Name *</label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block mb-2 text-sm font-semibold text-foreground">Company / Organization</label>
                      <input id="company" name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Company name" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-semibold text-foreground">Email Address *</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-foreground">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+233 XX XXX XXXX" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cargoType" className="block mb-2 text-sm font-semibold text-foreground">Type of Cargo *</label>
                    <select id="cargoType" name="cargoType" value={formData.cargoType} onChange={handleChange} required className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20">
                      <option value="">Select cargo/tanker capacity</option>
                      {cargoTypes.map((cargo) => (
                        <option key={cargo.value} value={cargo.value}>{cargo.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="pickup" className="block mb-2 text-sm font-semibold text-foreground">Pickup Location *</label>
                      <input id="pickup" name="pickup" type="text" value={formData.pickup} onChange={handleChange} required placeholder="e.g. Tema Port" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div>
                      <label htmlFor="destination" className="block mb-2 text-sm font-semibold text-foreground">Delivery Destination *</label>
                      <input id="destination" name="destination" type="text" value={formData.destination} onChange={handleChange} required placeholder="e.g. Kumasi, Lagos, Abidjan" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label htmlFor="cargoDescription" className="block mb-2 text-sm font-semibold text-foreground">Cargo Description</label>
                      <input id="cargoDescription" name="cargoDescription" type="text" value={formData.cargoDescription} onChange={handleChange} placeholder="PMS, AGO, DPK..." className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div>
                      <label htmlFor="cargoVolume" className="block mb-2 text-sm font-semibold text-foreground">Volume / Quantity</label>
                      <input id="cargoVolume" name="cargoVolume" type="text" value={formData.cargoVolume} onChange={handleChange} placeholder="e.g. full tanker / 2 trips" className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                    <div>
                      <label htmlFor="preferredDate" className="block mb-2 text-sm font-semibold text-foreground">Preferred Date</label>
                      <input id="preferredDate" name="preferredDate" type="date" value={formData.preferredDate} onChange={handleChange} className="w-full rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-semibold text-foreground">Additional Details</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Add special handling requirements, loading details, delivery deadline, documentation needs, or other notes..." className="w-full resize-none rounded-xl border border-border bg-input-background px-4 py-3 outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                  </div>

                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-600 sm:hover:scale-[1.01]">
                    <Send className="h-5 w-5" />
                    Submit Quote Request
                  </button>
                </form>
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={IMGS.cargo} alt="Cargo handling and logistics" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 text-white shadow-2xl">
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">What to include</p>
                  <h3 className="mb-5 text-2xl font-extrabold">Quote request checklist</h3>
                  <div className="space-y-4">
                    {requestSteps.map((step, index) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-extrabold text-foreground">Need quick assistance?</h3>
                  <div className="space-y-3">
                    <a href="tel:+233XXXXXXXXX" className="flex items-center gap-3 rounded-2xl bg-muted p-4 text-sm font-bold text-foreground transition-colors hover:text-orange-500">
                      <Phone className="h-5 w-5 text-orange-500" />
                      +233 XX XXX XXXX
                    </a>
                    <a href="mailto:info@prohaul.com" className="flex items-center gap-3 rounded-2xl bg-muted p-4 text-sm font-bold text-foreground transition-colors hover:text-orange-500">
                      <Mail className="h-5 w-5 text-orange-500" />
                      info@prohaul.com
                    </a>
                    <div className="flex items-center gap-3 rounded-2xl bg-muted p-4 text-sm font-bold text-foreground">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      Accra, Ghana
                    </div>
                  </div>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.road} alt="ProHaul haulage routes" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-orange-700/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-300">ProHaul Logistics Solutions</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              Reliable quotes start with clear cargo details.
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-gray-300">
              ProHaul supports fuel haulage with tanker capacities of 27,000L, 36,000L, 45,000L, and 54,000L, together with broader haulage solutions across Ghana and West Africa.
            </p>
            <Link to="/contact" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105">
              Contact Us <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
