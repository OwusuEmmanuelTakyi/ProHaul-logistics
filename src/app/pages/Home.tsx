import { Link } from "react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import heroVideo from "../../images/hero.mp4";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Truck,
  Shield,
  Globe,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  Package,
  Fuel,
  Wheat,
  Building2,
  Container,
  ChevronDown,
  Phone,
  Star,
  Zap,
  BarChart3,
  Navigation,
  MapPin,
} from "lucide-react";

/* ══════════════════════════════════════════
   RESPONSIVE MOTION SETTINGS
══════════════════════════════════════════ */
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

/* ══════════════════════════════════════════
   TYPEWRITER — cycles through words
══════════════════════════════════════════ */
function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block h-[0.85em] w-[3px] bg-orange-400 ml-1 align-middle"
        style={{ animation: "blink 0.7s step-end infinite" }}
      />
    </span>
  );
}

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;

    let start = 0;
    const step = 16;
    const increment = numeric / (1800 / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, numeric]);

  if (Number.isNaN(numeric)) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════
   SCROLL REVEAL WRAPPERS
   Mobile fix: horizontal reveals become soft fade-up animations.
══════════════════════════════════════════ */
function Reveal({
  children,
  y = 60,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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
  x = -60,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  x?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
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

function RevealScale({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: reduceMotion ? 1 : isMobile ? 0.96 : 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduceMotion ? 1 : isMobile ? 0.96 : 0.85 }}
      transition={{
        duration: isMobile ? 0.45 : 0.65,
        delay: isMobile ? Math.min(delay, 0.12) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   LAZY IMAGE with shimmer
══════════════════════════════════════════ */
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
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   IMAGE URLS
══════════════════════════════════════════ */
const IMGS = {
  hero: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=80",
  about: "https://i.pinimg.com/736x/20/79/15/2079151e9565ece35bc2e994d880b4a0.jpg",
  fleet1: "https://i.pinimg.com/736x/86/42/b3/8642b33f667902155dedcdc0c8d7543d.jpg",
  fleet2: "https://i.pinimg.com/736x/14/d7/30/14d730be90a9f0e5d4259d47ad6bc8e5.jpg",
  agri: "https://i.pinimg.com/1200x/90/a9/15/90a915a89477e25fb4449069bac9ec11.jpg",
  port: "https://i.pinimg.com/1200x/13/13/43/131343dbf45ddc161d7e24a712df985a.jpg",
  driver: "https://i.pinimg.com/1200x/24/65/e4/2465e40ca8f0720b97ef50dccd302ff9.jpg",
  safety: "https://i.pinimg.com/1200x/6d/67/56/6d675621a2eca1098e7631e4ce74c1c8.jpg",
  warehouse: "https://i.pinimg.com/736x/6c/2e/e8/6c2ee854e49d538b2912b7b5def33e04.jpg",
  road: "https://i.pinimg.com/1200x/4c/a2/c5/4ca2c5243d2d5095295abe35e1a9fd4d.jpg",
  tanker: "https://i.pinimg.com/736x/14/d7/30/14d730be90a9f0e5d4259d47ad6bc8e5.jpg",
  fertilizer: "https://i.pinimg.com/736x/20/29/09/202909f3f401d1d0039be58392c39f37.jpg",
  scale:"https://i.pinimg.com/1200x/2f/60/1b/2f601bd6c95240de6a97a25e196fddc1.jpg",
  safety2: "https://i.pinimg.com/1200x/89/73/83/8973836e28f492882fe5aa81ea4500ba.jpg",
  safety3: "https://i.pinimg.com/736x/9a/36/f8/9a36f8145a9264848a511f35ba1d43f8.jpg"
};

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const SERVICES = [
  {
    icon: Fuel,
    title: "Bulk Fuel",
    desc: "Secure haulage of PMS, AGO & DPK — fully NPA compliant with real-time monitoring.",
    link: "/services/fuel-haulage",
    color: "from-orange-500 to-red-600",
    img: IMGS.tanker,
  },
  {
    icon: Wheat,
    title: "Agricultural Products",
    desc: "Grain, cocoa, cashew and agro-inputs from farm to market across Ghana.",
    link: "/services/agricultural",
    color: "from-green-500 to-emerald-700",
    img: IMGS.agri,
  },
  {
    icon: Building2,
    title: "Cement & Construction",
    desc: "Cement, tiles, steel and building materials delivered to sites on schedule.",
    link: "/services/cement",
    color: "from-slate-500 to-slate-800",
    img: IMGS.warehouse,
  },
  {
    icon: Container,
    title: "Container Haulage",
    desc: "20ft & 40ft container logistics from port to inland destinations.",
    link: "/services/container",
    color: "from-blue-500 to-blue-800",
    img: IMGS.port,
  },
  {
    icon: Globe,
    title: "Cross-Border Haulage",
    desc: "Compliant cargo movement across ECOWAS trade corridors into West Africa.",
    link: "/services/cross-border",
    color: "from-purple-500 to-violet-800",
    img: IMGS.road,
  },
  {
    icon: Package,
    title: "Fertilizers & Inputs",
    desc: "Safe transport of NPK, urea and industrial inputs aligned with farming cycles.",
    link: "/services/fertilizer",
    color: "from-yellow-500 to-amber-700",
    img: IMGS.fertilizer,
  },
];

const STATS = [
  { value: "500+", label: "Successful Deliveries", icon: Package },
  { value: "50+", label: "Fleet Vehicles", icon: Truck },
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "99%", label: "On-Time Delivery", icon: Clock },
];

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Proven reliability and on-time delivery",
    
  },
  {
    icon: CheckCircle2,
    title: "Safety-focused operations and trained personnel",
    
  },
  {
    icon: CheckCircle2,
    title: "Scalable capacity for bulk and specialized cargo",
    
  },
  {
    icon: Truck,
    title: "Strong knowledge of regional logistics and cross-border trade",
    
  },
];

const FLEET = [
  { label: "Bulk Tankers", specs: "27,000L – 54,000L", icon: Fuel },
  { label: "Payload Capacity", specs: "50 tons", icon: Truck },
  { label: "Engine Power", specs: "460 – 530 HP", icon: Zap },
  { label: "Torque Output", specs: "2,100 – 2,500 Nm", icon: BarChart3 },
  { label: "Containers", specs: "20ft & 40ft", icon: Container },
  { label: "Coverage", specs: "Ghana & West Africa", icon: Navigation },
];

const PROCESS = [
  {
    step: "01",
    title: "Request & Planning",
    desc: "Assessment of cargo requirements, route planning, and resource allocation tailored to you.",
  },
  {
    step: "02",
    title: "Load Coordination",
    desc: "Scheduled loading, documentation preparation, and dispatch confirmation with full transparency.",
  },
  {
    step: "03",
    title: "Transit & Monitoring",
    desc: "Real-time GPS tracking, driver coordination, and live progress updates throughout the journey.",
  },
  {
    step: "04",
    title: "Delivery & Confirmation",
    desc: "Professional offloading, delivery verification, signed documentation, and detailed reporting.",
  },
];

const TESTIMONIALS = [
  {
    name: "Kwame Asante",
    role: "Operations Manager, AgroGhana Ltd",
    text: "ProHaul has been our go-to logistics partner for over 3 years. Their on-time delivery record and professionalism is unmatched in the industry.",
  },
  {
    name: "Abena Mensah",
    role: "Supply Chain Director, BuildRight Ghana",
    text: "From cement to tiles, ProHaul handles our construction logistics with precision. Their fleet capacity gives us confidence to scale our projects.",
  },
  {
    name: "Kofi Boateng",
    role: "Procurement Lead, Delta Petroleum",
    text: "Safety and compliance are non-negotiable in fuel transport. ProHaul ticks every box — NPA compliant, GPS tracked, and always on schedule.",
  },
];

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
export function Home() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "7%"] : ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, isMobile ? 0.25 : 0]);

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] lg:min-h-[760px] flex items-center overflow-hidden py-24 sm:py-28"
      >
        <motion.div style={{ y: reduceMotion ? "0%" : videoY }} className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={IMGS.hero}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* fallback poster image behind the video */}
          <Img src={IMGS.hero} alt="ProHaul trucks" className="absolute inset-0 -z-10 w-full h-full" />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-slate-950/35 to-slate-950/10" />
<div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
        </motion.div>

        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "80px 80px",
          }}
        />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex max-w-full items-center gap-2 px-3 sm:px-4 py-1.5 bg-orange-500/20 border border-orange-500/40 rounded-full text-orange-300 text-[11px] sm:text-sm mb-6 sm:mb-8 leading-relaxed"
            >
              
            </motion.div>

            <div className="mb-2 sm:mb-4 overflow-visible text-sm">
              {"Reliable Bulk Haulage.   Nationwide Strength.".split(" ").map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 26 : 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-2 sm:mr-3 lg:mr-4 text-[clamp(2rem,10vw,4rem)] md:text-5xl lg:text-6xl font-extrabold text-white leading-[0.98] tracking-tight"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="min-h-[1.15em] text-[clamp(2.2rem,11vw,4.5rem)] md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight mb-6 sm:mb-8"
            >
              <Typewriter
                words={[ "Regional Reach" ]}
                className="block max-w-full break-words text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-xl"
            >
              ProHaul delivers reliable bulk haulage solutions across Ghana and West Africa, ensuring safe and efficient cargo movement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/quote"
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 sm:hover:scale-105 active:scale-100 transition-all gap-2 font-bold shadow-xl shadow-orange-600/40"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-4 bg-white/10 text-white border border-white/25 rounded-lg hover:bg-white/20 sm:hover:scale-105 transition-all gap-2 backdrop-blur-sm"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-white/40 text-xs"
        >
          <span>Scroll</span>
          <motion.div animate={reduceMotion ? undefined : { y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="py-10 sm:py-14 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 0.08} y={32}>
                  <div className="text-center text-white">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 mx-auto mb-3 opacity-80" />
                    <div className="text-3xl sm:text-4xl font-extrabold mb-1">
                      <AnimatedCounter value={s.value} />
                    </div>
                    <div className="text-xs sm:text-sm text-orange-100 font-medium leading-tight">{s.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT STRIP ══════════ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <div className="relative pb-4 sm:pb-0">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Img src={IMGS.about} alt="ProHaul fleet" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 bg-orange-500 text-white rounded-2xl p-4 sm:p-5 shadow-xl shadow-orange-500/30"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold">10+</div>
                  <div className="text-xs sm:text-sm text-orange-100">Years of Excellence</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="absolute top-2 left-2 sm:-top-5 sm:-left-5 bg-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-xl border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    <span className="text-xs sm:text-sm font-semibold">Ghana & West Africa</span>
                  </div>
                </motion.div>
              </div>
            </RevealX>

            <RevealX x={70}>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">About ProHaul</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">Ghana's Trusted Partner for Bulk Haulage</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                ProHaul is a Ghana-based haulage company delivering dependable, end-to-end transportation solutions across Ghana and the wider West African sub-region. We specialize in the safe, efficient, and timely movement of bulk and packaged goods, supporting businesses across critical sectors of the economy.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With a modern fleet, experienced drivers, and a deep understanding of regional trade routes, ProHaul is built to move your cargo securely, on schedule, and at scale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {["NPA Certified Operations","MPS Certified", "GPS Fleet Tracking", "ECOWAS Cross-Border Ready", "Goods in Transit Insurance"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 sm:hover:scale-105 transition-all font-semibold"
              >
                Learn About Us <ArrowRight className="w-5 h-5" />
              </Link>
            </RevealX>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES — image cards ══════════ */}
      {/* ══════════ SERVICES — image cards ══════════ */}
<section className="py-16 sm:py-24 bg-muted">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Reveal className="text-center mb-10 sm:mb-16">
      <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">
        What We Do
      </p>
      <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
        Our Haulage Services
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
        A comprehensive haulage solution engineered for Ghana's and West Africa’s  most critical industries
      </p>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {SERVICES.map((svc, i) => {
        const Icon = svc.icon;

        return (
          <Reveal key={svc.title} delay={i * 0.08} y={48}>
            <Link
              to={svc.link}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 block min-h-[21rem] sm:h-72"
            >
              <Img
                src={svc.img}
                alt={svc.title}
                className="absolute inset-0 w-full h-full md:group-hover:scale-110 transition-transform duration-700"
              />

              {/* Reduced dark overlay so image shows better */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

              {/* Small soft bottom shade only for text readability */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />

              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${svc.color}`}
              />

              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-4 shadow-lg md:group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">
                  {svc.title}
                </h3>

                <p className="text-sm text-white/90 leading-relaxed mb-4 drop-shadow-lg opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                  {svc.desc}
                </p>

                <span className="inline-flex items-center gap-1.5 text-orange-300 text-sm font-semibold md:group-hover:gap-3 transition-all drop-shadow-lg">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  </div>
</section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <RevealX x={-60}>
                <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Our Strengths</p>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Why Choose ProHaul?</h2>
                <p className="text-muted-foreground leading-relaxed mb-8 sm:mb-10">
                  Modern high-capacity fleet, nationwide and cross-border reach, technology-driven operations, and a strong commitment to safety, reliability, and timely delivery.
                </p>
              </RevealX>

              <div className="space-y-4">
                {FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <Reveal key={f.title} delay={i * 0.08} y={28}>
                      <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl bg-muted border border-border hover:border-orange-400/40 hover:shadow-lg sm:hover:-translate-y-1 transition-all duration-300">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{f.title}</h3>
                          
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <RevealX x={70}>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-xl">
                  <Img src={IMGS.driver} alt="Professional ProHaul driver" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden aspect-square shadow-lg">
                    <Img src={IMGS.safety} alt="Safety compliance" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square shadow-lg">
                    <Img src={IMGS.fleet1} alt="ProHaul fleet truck" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* ══════════ FLEET ══════════ */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-10 sm:mb-16">
            <RevealX x={-70}>
              <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-3">Built for Scale</p>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Fleet & Operational Capacity</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                ProHaul operates a modern, high-performance fleet designed to deliver reliability, efficiency, and scalable capacity across a wide range of haulage requirements. Our fleet strategy is centered on deploying robust, well-maintained equipment capable of supporting both routine and high-demand logistics operations
              </p>
              <div className="flex flex-wrap gap-3">
                {["MAN", "DAF", "VOLVO", "SCANIA"].map((brand, i) => (
                  <motion.span
                    key={brand}
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? 0 : 0.2 + i * 0.1 }}
                    className="px-5 py-2 border border-white/20 rounded-full text-sm font-bold text-white/60 hover:text-orange-400 hover:border-orange-400/40 transition-colors cursor-default"
                  >
                    {brand}
                  </motion.span>
                ))}
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/10">
                <Img src={IMGS.scale} alt="ProHaul tanker truck" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FLEET.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <Reveal key={spec.label} delay={i * 0.08} y={36}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/10 hover:border-orange-500/30 sm:hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-8 h-8 text-orange-400 mb-3" />
                    <div className="text-lg sm:text-xl font-extrabold mb-1">{spec.specs}</div>
                    <div className="text-sm text-gray-400">{spec.label}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Simple & Transparent</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Our Service Process</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured model ensuring efficiency and reliability from request to delivery
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1} y={42}>
                <div className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500 text-white flex items-center justify-center font-extrabold text-xl sm:text-2xl mx-auto mb-5 sm:mb-6 shadow-xl shadow-orange-500/30 sm:group-hover:scale-110 sm:group-hover:shadow-orange-500/50 transition-all duration-300 relative z-10">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-lg mb-3">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} y={40} className="mt-12 sm:mt-16">
            <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-2xl">
              <Img src={IMGS.warehouse} alt="ProHaul logistics operations" className="w-full h-full sm:hover:scale-105 transition-transform duration-1000" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ HSE & COMPLIANCE ══════════ */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/4] col-span-1 shadow-xl">
                  <Img src={IMGS.safety2} alt="Safety gear" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col gap-4 col-span-1">
                  <div className="rounded-xl overflow-hidden min-h-[180px] sm:flex-1 shadow-xl">
                    <Img src={IMGS.safety3} alt="Certified driver" className="w-full h-full sm:hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="rounded-xl bg-orange-500 p-5 text-white shadow-xl shadow-orange-500/20">
                    <Shield className="w-8 h-8 mb-2 opacity-80" />
                    <div className="text-2xl font-extrabold">Zero</div>
                    <div className="text-sm text-orange-100">Incident Target</div>
                  </div>
                </div>
              </div>
            </RevealX>

            <RevealX x={70}>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Safety & Compliance</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">Health, Safety & Environment</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Safety is a core pillar of ProHaul's operations. We maintain a structured HSE framework designed to protect personnel, cargo, and the communities within which we operate — with a zero-incident objective embedded in every process.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { label: "Driver safety training and certification programs", icon: CheckCircle2 },
                  { label: "Enforcement of personal protective equipment (PPE) usage", icon: CheckCircle2 },
                  { label: "Routine vehicle inspection and maintenance protocols", icon: CheckCircle2 },
                  { label: "Incident reporting, investigation, and response procedures", icon: CheckCircle2 },
                  { label: "Compliance with applicable environmental and safety regulations", icon: Shield },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.label} delay={i * 0.05} y={20}>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border hover:border-orange-400/40 transition-colors">
                        <Icon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Link
                to="/hse"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white sm:hover:scale-105 transition-all font-semibold"
              >
                Our HSE Framework <ArrowRight className="w-5 h-5" />
              </Link>
            </RevealX>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10 sm:mb-16">
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-3">Client Trust</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">What Our Clients Say</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <RevealScale key={t.name} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 hover:shadow-xl hover:border-orange-400/30 sm:hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 italic">&quot;{t.text}&quot;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              </RevealScale>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="relative py-20 sm:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.port} alt="West Africa port" className="w-full h-full" />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={48}>
            <p className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-4">Let's Move Together</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Ready to Move Your Cargo?</h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto">
              Partner with ProHaul for reliable, safe, and efficient haulage solutions across Ghana and West Africa. We don't just move goods — we keep businesses moving.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                to="/quote"
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 sm:hover:scale-105 transition-all gap-2 font-bold shadow-xl shadow-orange-600/40"
              >
                Get a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+233000000000"
                className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-8 py-4 bg-white/10 text-white border border-white/25 rounded-lg hover:bg-white/20 sm:hover:scale-105 transition-all gap-2 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" /> Call Us Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
