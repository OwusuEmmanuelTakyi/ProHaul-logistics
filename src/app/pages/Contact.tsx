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
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Shield,
  Truck,
  Navigation,
  PackageCheck,
  Globe,
  Fuel,
  Wheat,
  Building2,
  Sprout,
  Container as ContainerIcon,
  CheckCircle2,
  Route,
  Warehouse,
  ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Hooks
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Motion helpers
───────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  y = 48,
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
  const reduceMotion = useReducedMotion();
  const safeY = reduceMotion ? 0 : isMobile ? Math.min(y, 20) : y;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: safeY }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: safeY }}
      transition={{
        duration: isMobile ? 0.45 : 0.7,
        delay: isMobile ? Math.min(delay, 0.1) : delay,
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
  x = -60,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const safeX = reduceMotion || isMobile ? 0 : x;
  const safeY = isMobile && !reduceMotion ? 20 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: safeX, y: safeY }}
      animate={
        inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: safeX, y: safeY }
      }
      transition={{
        duration: isMobile ? 0.45 : 0.7,
        delay: isMobile ? Math.min(delay, 0.1) : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Img({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 bg-slate-800 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const IMGS = {
  hero: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=85",
  road: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
};

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    text: "Call us for quick haulage enquiries and quote requests.",
    value: "+233 XX XXX XXXX",
    href: "tel:+233XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    text: "Send your cargo details and our team will respond.",
    value: "info@prohaul.com",
    href: "mailto:info@prohaul.com",
  },
  {
    icon: MapPin,
    title: "Location",
    text: "Regional haulage coordination hub.",
    value: "Accra, Ghana",
    href: "#coverage",
  },
];

const serviceOptions = [
  { value: "fuel", label: "Fuel Haulage", icon: Fuel },
  { value: "agricultural", label: "Agricultural Products", icon: Wheat },
  { value: "cement", label: "Cement & Construction", icon: Building2 },
  { value: "fertilizer", label: "Fertilizer & Industrial", icon: Sprout },
  { value: "container", label: "Container Haulage", icon: ContainerIcon },
  { value: "cross-border", label: "Cross-Border Haulage", icon: Globe },
];

const whyChoose = [
  "Proven reliability and on-time delivery",
  "Safety-focused operations and trained personnel",
  "Scalable capacity for bulk and specialized cargo",
  "Strong knowledge of regional logistics and cross-border trade",
  "GPS tracking and fleet management visibility",
  "Goods in Transit insurance support",
];

/* ─────────────────────────────────────────────
   West Africa Cartographic Map
   Styled like the reference: cream/tan parchment,
   gold country borders, dashed route lines,
   pin-style city markers with outer rings
───────────────────────────────────────────── */

// Cities in SVG coordinate space (viewBox 0 0 660 480)
const cities = [
  { id: "dakar",        name: "DAKAR",         x: 82,  y: 148, primary: false },
  { id: "conakry",      name: "CONAKRY",        x: 148, y: 228, primary: false },
  { id: "abidjan",      name: "ABIDJAN",        x: 248, y: 296, primary: false },
  { id: "accra",        name: "ACCRA",          x: 336, y: 298, primary: true  },
  { id: "lome",         name: "LOMÉ",           x: 374, y: 290, primary: false },
  { id: "cotonou",      name: "COTONOU",        x: 412, y: 292, primary: false },
  { id: "lagos",        name: "LAGOS",          x: 458, y: 306, primary: false },
  { id: "ouaga",        name: "OUAGADOUGOU",    x: 334, y: 196, primary: false },
  { id: "bamako",       name: "BAMAKO",         x: 200, y: 188, primary: false },
];

// Route connections as city id pairs
const routes: [string, string][] = [
  ["accra", "lome"],
  ["lome", "cotonou"],
  ["cotonou", "lagos"],
  ["accra", "abidjan"],
  ["abidjan", "conakry"],
  ["conakry", "dakar"],
  ["abidjan", "bamako"],
  ["bamako", "ouaga"],
  ["ouaga", "accra"],
  ["ouaga", "lagos"],
];

function cityById(id: string) {
  return cities.find((c) => c.id === id)!;
}

// Very detailed West Africa SVG outline (simplified but faithful)
// Using a rough but recognizable coastal + interior shape
const WEST_AFRICA_PATH = `
  M 82 100
  L 118 88  L 158 80  L 196 76  L 228 80
  L 248 86  L 268 88  L 292 90  L 314 96
  L 338 102 L 360 110 L 390 122 L 416 140
  L 440 158 L 462 178 L 486 206 L 500 232
  L 508 260 L 508 290 L 496 318 L 476 342
  L 448 360 L 416 372 L 380 380 L 342 382
  L 308 376 L 276 364 L 250 348 L 230 330
  L 210 312 L 192 294 L 174 276 L 154 256
  L 134 234 L 116 210 L 100 186 L 88 162
  L 80 140 Z
`;

// Interior country border lines (simplified separations)
const COUNTRY_LINES = [
  "M 200 76 L 196 130 L 190 180 L 186 228",          // Senegal/Mali/Guinea border region
  "M 268 88 L 264 140 L 260 190 L 255 240 L 248 296", // Mali/Burkina/Ivory Coast
  "M 338 102 L 336 150 L 334 196",                    // Burkina top
  "M 338 102 L 340 145 L 343 185 L 346 240 L 348 298", // Ghana vertical
  "M 360 110 L 364 155 L 370 200 L 373 250 L 374 290", // Togo
  "M 390 122 L 394 165 L 400 210 L 406 252 L 412 292", // Benin
  "M 334 196 L 380 190 L 416 196 L 458 210",           // Burkina/Niger border
  "M 148 228 L 186 228 L 200 250 L 210 270 L 218 296", // Guinea/Sierra Leone coast
];

function WestAfricaMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <div
      id="coverage"
      className="relative overflow-hidden rounded-3xl border border-amber-200/60"
      style={{ background: "#f5edd8" }}
    >
      {/* Subtle grid texture like the reference */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,140,60,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(180,140,60,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-6 pt-6 pb-4 flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
            style={{ color: "#b8892a" }}
          >
            Regional Coverage
          </p>
          <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
            West African Route Network
          </h3>
          <p className="mt-1.5 text-sm text-slate-600 max-w-xs leading-relaxed">
            Ports, industrial zones, farms, and ECOWAS trade corridors.
          </p>
        </div>
        <span
          className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white shadow-lg flex-shrink-0"
          style={{ background: "#c8851e" }}
        >
          <MapPin className="h-3.5 w-3.5" />
          Accra Hub
        </span>
      </div>

      {/* SVG Map */}
      <div className="relative px-2 pb-2">
        <svg
          ref={svgRef}
          viewBox="0 0 660 430"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* Land fill */}
          <path
            d={WEST_AFRICA_PATH}
            fill="#e8d9b8"
            stroke="#c9a84c"
            strokeWidth="1.5"
          />

          {/* Country interior lines */}
          {COUNTRY_LINES.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#c9a84c"
              strokeWidth="0.7"
              strokeOpacity="0.55"
            />
          ))}

          {/* Ocean label */}
          <text
            x="52"
            y="370"
            fontSize="11"
            fontStyle="italic"
            fill="#b8975a"
            fillOpacity="0.7"
            fontFamily="Georgia, serif"
            letterSpacing="0.06em"
          >
            Atlantic Ocean
          </text>

          {/* Compass rose */}
          <g transform="translate(608, 390)">
            <circle cx="0" cy="0" r="18" fill="#e8d9b8" stroke="#c9a84c" strokeWidth="1" />
            <line x1="0" y1="-13" x2="0" y2="13" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.7" />
            <line x1="-13" y1="0" x2="13" y2="0" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.7" />
            <polygon points="0,-12 2.5,-5 -2.5,-5" fill="#b8892a" />
            <text x="0" y="-16" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8a6318" fontFamily="Georgia, serif">N</text>
          </g>

          {/* Legend */}
          <g transform="translate(22, 385)">
            <rect x="0" y="0" width="118" height="38" rx="6" fill="#e8d9b8" stroke="#c9a84c" strokeWidth="0.8" />
            <line x1="8" y1="13" x2="30" y2="13" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />
            <text x="36" y="17" fontSize="10" fill="#7a5c14" fontFamily="Georgia, serif">Trade route</text>
            <circle cx="16" cy="29" r="4.5" fill="#c8851e" stroke="#f5edd8" strokeWidth="1.5" />
            <text x="26" y="33" fontSize="10" fill="#7a5c14" fontFamily="Georgia, serif">City / hub</text>
          </g>

          {/* Animated route lines */}
          {routes.map(([fromId, toId], i) => {
            const from = cityById(fromId);
            const to = cityById(toId);
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2 - 22;
            return (
              <motion.path
                key={`${fromId}-${toId}`}
                d={`M${from.x} ${from.y} Q${mx} ${my} ${to.x} ${to.y}`}
                fill="none"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeDasharray="7 6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.75 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: i * 0.08, ease: "easeOut" }}
              />
            );
          })}

          {/* City markers */}
          {cities.map((city, i) => {
            const outerR = city.primary ? 20 : 14;
            const innerR = city.primary ? 9  : 6;
            const labelY = city.y - outerR - 6;

            return (
              <g key={city.id}>
                {/* Pulse ring */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={outerR}
                  fill="#c8851e"
                  fillOpacity="0"
                  stroke="#c8851e"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                  animate={{ r: [outerR, outerR + 6, outerR], strokeOpacity: [0.25, 0, 0.25] }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
                />

                {/* Outer ring (reference style: thick border circle) */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={outerR - 2}
                  fill="#f5edd8"
                  stroke="#c8851e"
                  strokeWidth={city.primary ? 2.5 : 1.8}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease: "backOut" }}
                  style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                />

                {/* Inner filled dot */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={innerR}
                  fill="#c8851e"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.55 + i * 0.07, ease: "backOut" }}
                  style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                />

                {/* City label */}
                <motion.text
                  x={city.x}
                  y={labelY}
                  textAnchor="middle"
                  fontSize={city.primary ? 11.5 : 9.5}
                  fontWeight="700"
                  fill={city.primary ? "#8a5c10" : "#9a7230"}
                  fontFamily="Georgia, serif"
                  letterSpacing="0.12em"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.65 + i * 0.07 }}
                >
                  {city.name}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Footer pills */}
      <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: "Ghana", icon: MapPin },
          { label: "Togo / Benin", icon: Route },
          { label: "Nigeria", icon: Truck },
          { label: "ECOWAS", icon: Globe },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold text-slate-700"
              style={{ borderColor: "#d4a84c55", background: "rgba(255,255,255,0.7)" }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: "#c8851e" }} />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Contact Page
───────────────────────────────────────────── */
export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "8%"] : ["0%", "28%"]
  );
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, isMobile ? 0.4 : 0]
  );
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.04]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full overflow-x-hidden bg-background">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[75svh] lg:min-h-[700px] flex items-center overflow-hidden py-28 text-white"
      >
        <motion.div
          style={{ y: reduceMotion ? "0%" : imageY, scale: reduceMotion ? 1 : heroScale }}
          className="absolute inset-0 z-0"
        >
          <Img src={IMGS.hero} alt="ProHaul logistics truck" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/75 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        </motion.div>

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: isMobile ? "32px 32px" : "52px 52px",
          }}
        />

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 flex items-center gap-2 text-sm"
          >
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">Contact</span>
          </motion.div>

          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-7 inline-flex items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/12 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500">
                <Send className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">Contact ProHaul</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 28 : 64 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.6rem,10vw,5rem)] font-extrabold leading-[0.97] tracking-tight"
            >
              Let's move your cargo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">
                with confidence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.34 }}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300"
            >
              Contact ProHaul for reliable, safe, and efficient haulage solutions
              across Ghana and the West African sub-region.
            </motion.p>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="tel:+233XXXXXXXXX"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-600/30 transition-all hover:bg-orange-600 hover:scale-[1.02]"
              >
                <Phone className="h-4 w-4" /> Call Us Now
              </a>
              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 hover:scale-[1.02]"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-5 w-[1px] bg-gradient-to-b from-gray-400 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.09} y={28}>
                <a
                  href={item.href}
                  className="group flex flex-col items-center text-center h-full rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all duration-300 hover:border-orange-400/40 hover:shadow-xl sm:hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                    <Icon className="h-6 w-6 text-orange-500 transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-foreground">{item.title}</h3>
                  <p className="mb-3 text-sm text-muted-foreground flex-1">{item.text}</p>
                  <p className="font-bold text-orange-500 text-sm">{item.value}</p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section id="quote-form" className="py-20 sm:py-28 bg-background scroll-mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.08fr] gap-10 lg:gap-14 items-start">

            {/* Form */}
            <RevealX x={-64}>
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  Request a Quote
                </p>
                <h2 className="mb-3 text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                  Send us your haulage details.
                </h2>
                <p className="mb-7 text-sm text-muted-foreground leading-relaxed">
                  Tell us what you need moved — cargo type, pickup point,
                  destination, and timeline. We'll respond promptly.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </div>
                      <p className="text-lg font-bold text-foreground">Message sent!</p>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        Our team will review your details and get back to you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block mb-1.5 text-xs font-semibold text-foreground">
                            Full Name <span className="text-orange-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block mb-1.5 text-xs font-semibold text-foreground">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+233 XX XXX XXXX"
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block mb-1.5 text-xs font-semibold text-foreground">
                          Email Address <span className="text-orange-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60"
                        />
                      </div>

                      <div>
                        <label htmlFor="service" className="block mb-1.5 text-xs font-semibold text-foreground">
                          Service of Interest <span className="text-orange-500">*</span>
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block mb-1.5 text-xs font-semibold text-foreground">
                          Message <span className="text-orange-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Cargo type, pickup location, destination, volume, and timeline..."
                          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-600 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <Send className="h-4 w-4" />
                        Send Message
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealX>

            {/* Map + services */}
            <RevealX x={64}>
              <div className="space-y-5">
                <WestAfricaMap />

                {/* Service chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service, i) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={service.value}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: isMobile ? 0 : i * 0.05 }}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm hover:border-orange-300/50 hover:shadow-md transition-all"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                          <Icon className="h-4.5 w-4.5 text-orange-500" />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{service.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE + HOURS ── */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Why choose (spans 2 cols) */}
            <Reveal className="lg:col-span-2" y={36}>
              <div className="h-full rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 sm:p-8 text-white shadow-xl shadow-orange-500/25">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                  Why Choose ProHaul?
                </p>
                <h2 className="mb-6 text-2xl md:text-3xl font-extrabold leading-tight">
                  A trusted logistics partner for business continuity.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whyChoose.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-orange-50 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Business hours */}
            <Reveal className="lg:col-span-1" y={36} delay={0.1}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mb-5 text-xl font-extrabold text-foreground">Business Hours</h3>
                <div className="space-y-4">
                  {[
                    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
                    { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((row, i, arr) => (
                    <div
                      key={row.day}
                      className={`flex justify-between gap-4 ${i < arr.length - 1 ? "border-b border-border pb-4" : ""}`}
                    >
                      <span className="text-sm text-muted-foreground">{row.day}</span>
                      <span
                        className={`text-sm font-bold ${
                          row.hours === "Closed" ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {row.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                  For urgent enquiries outside business hours, email us with your cargo
                  details and route requirements.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── COVERAGE DETAILS ── */}
      <section id="coverage-detail" className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              Coverage & Operational Strength
            </p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              Nationwide strength with regional reach.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              ProHaul supports cargo movement across Ghana and key West African trade
              corridors, with access to ports, industrial zones, farms, warehouses,
              markets, and commercial hubs.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: MapPin,
                title: "Nationwide Delivery",
                text: "Reliable haulage across Ghana, including high-demand commercial areas and remote project locations.",
              },
              {
                icon: Globe,
                title: "Cross-Border Capability",
                text: "Regional movement within West Africa through key ECOWAS trade corridors.",
              },
              {
                icon: Warehouse,
                title: "Port & Inland Logistics",
                text: "Cargo movement from ports to warehouses, factories, farms, depots, and distribution centres.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} y={40}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-orange-400/40 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                      <Icon className="h-5 w-5 text-orange-500 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-3 font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-24 sm:py-32 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.road} alt="ProHaul route network" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/88 to-orange-700/80" />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={40}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
              Let's Move Together
            </p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
              We don't just move goods — we keep businesses moving.
            </h2>
            <p className="mx-auto mb-9 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300">
              Partner with ProHaul for reliable, safe, and efficient haulage solutions
              across Ghana and West Africa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="tel:+233XXXXXXXXX"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 hover:scale-105"
              >
                <Phone className="h-4 w-4" /> Call Us
              </a>
              <a
                href="mailto:info@prohaul.com"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/18 hover:scale-105"
              >
                <Mail className="h-4 w-4" /> Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}