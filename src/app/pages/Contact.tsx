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
  Truck,
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
   TYPEWRITER
───────────────────────────────────────────── */
function Typewriter({
  text,
  className = "",
  startDelay = 0,
  typeSpeed = 55,
  onDone,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  typeSpeed?: number;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || done) return;
    if (displayed.length < text.length) {
      const t = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        typeSpeed
      );
      return () => clearTimeout(t);
    } else {
      setDone(true);
      onDone?.();
    }
  }, [displayed, started, done, text, typeSpeed, onDone]);

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <span
          className="inline-block h-[0.85em] w-[3px] bg-current ml-1 align-middle"
          style={{ animation: "blink 0.7s step-end infinite" }}
        />
      )}
    </span>
  );
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
  hero: "https://i.pinimg.com/1200x/95/91/91/95919143ff5e240089af6be99a868b1e.jpg",
  road: "https://i.pinimg.com/1200x/95/91/91/95919143ff5e240089af6be99a868b1e.jpg",
};

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: "+233 (0) 244 136 797",
    href: "tel:+233XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email",
    value: "Bookings@prohaul-logistics.com",
    href: "mailto:info@prohaul.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "12 Avenue B West, North Legon, Accra-Ghana",
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
   West Africa Map (unchanged)
───────────────────────────────────────────── */
const WA_IDS = new Set([
  "012","204","854","120","132","384","624","266","288","324",
  "226","430","466","478","562","566","686","694","768","270",
]);

interface City {
  name: string;
  lon: number;
  lat: number;
  primary: boolean;
  labelDy: number;
}

const CITIES: City[] = [
  { name: "DAKAR",       lon: -17.44, lat: 14.69, primary: false, labelDy: -14 },
  { name: "CONAKRY",     lon: -13.57, lat:  9.54, primary: false, labelDy: -14 },
  { name: "ABIDJAN",     lon:  -3.99, lat:  5.35, primary: false, labelDy:  18 },
  { name: "BAMAKO",      lon:  -8.00, lat: 12.65, primary: false, labelDy: -14 },
  { name: "OUAGADOUGOU", lon:  -1.52, lat: 12.37, primary: false, labelDy: -14 },
  { name: "ACCRA",       lon:  -0.19, lat:  5.55, primary: true,  labelDy:  22 },
  { name: "LOMÉ",        lon:   1.22, lat:  6.14, primary: false, labelDy:  18 },
  { name: "COTONOU",     lon:   2.37, lat:  6.37, primary: false, labelDy:  18 },
  { name: "LAGOS",       lon:   3.38, lat:  6.45, primary: false, labelDy: -14 },
];

const ROUTES: [string, string][] = [
  ["ACCRA", "LOMÉ"],
  ["LOMÉ", "COTONOU"],
  ["COTONOU", "LAGOS"],
  ["ACCRA", "ABIDJAN"],
  ["ABIDJAN", "CONAKRY"],
  ["CONAKRY", "DAKAR"],
  ["ACCRA", "OUAGADOUGOU"],
  ["OUAGADOUGOU", "BAMAKO"],
  ["OUAGADOUGOU", "LAGOS"],
];

function WestAfricaMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
        const s = document.createElement("script");
        s.src = src;
        s.onload = () => res();
        s.onerror = () => rej();
        document.head.appendChild(s);
      });

    (async () => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js");

        const d3 = (window as any).d3;
        const topojson = (window as any).topojson;

        const W = 660, H = 420;
        const world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
        const allCountries = topojson.feature(world, world.objects.countries);
        const waFeatures = allCountries.features.filter((f: any) =>
          WA_IDS.has(String(f.id).padStart(3, "0"))
        );

        const projection = d3.geoMercator().center([5, 12]).scale(1020).translate([W / 2, H / 2]);
        const path = d3.geoPath().projection(projection);
        const svg = d3.select(svgRef.current);

        const defs = svg.append("defs");
        const pat = defs.append("pattern").attr("id", "wag").attr("width", 28).attr("height", 28).attr("patternUnits", "userSpaceOnUse");
        pat.append("path").attr("d", "M28 0H0V28").attr("fill", "none").attr("stroke", "#c4a060").attr("stroke-width", "0.3").attr("stroke-opacity", "0.4");

        svg.append("rect").attr("width", W).attr("height", H).attr("fill", "#f0e8d5");
        svg.append("rect").attr("width", W).attr("height", H).attr("fill", "url(#wag)");

        svg.selectAll("path.land").data(waFeatures).enter().append("path")
          .attr("class", "land").attr("d", path).attr("fill", "#dfd0ad").attr("stroke", "#c4a060").attr("stroke-width", "0.9");

        const internalBorders = topojson.mesh(world, world.objects.countries, (a: any, b: any) => {
          const aIn = WA_IDS.has(String(a.id).padStart(3, "0"));
          const bIn = WA_IDS.has(String(b.id).padStart(3, "0"));
          return aIn && bIn && a !== b;
        });
        svg.append("path").datum(internalBorders).attr("d", path).attr("fill", "none").attr("stroke", "#c4a060").attr("stroke-width", "0.5").attr("stroke-opacity", "0.65");

        const projected = CITIES.map(c => ({
          ...c,
          px: projection([c.lon, c.lat])![0],
          py: projection([c.lon, c.lat])![1],
        }));

        const cityByName = (n: string) => projected.find(c => c.name === n)!;

        ROUTES.forEach(([a, b], i) => {
          const ca = cityByName(a), cb = cityByName(b);
          const mx = (ca.px + cb.px) / 2;
          const my = (ca.py + cb.py) / 2 - 18;
          svg.append("path")
            .attr("d", `M${ca.px},${ca.py} Q${mx},${my} ${cb.px},${cb.py}`)
            .attr("fill", "none").attr("stroke", "#c4a060").attr("stroke-width", "1.4")
            .attr("stroke-dasharray", "7 5").attr("stroke-linecap", "round").attr("opacity", "0")
            .transition().delay(100 + i * 140).duration(900).ease(d3.easeQuadOut).attr("opacity", "0.9");
        });

        projected.forEach((c, i) => {
          const outerR = c.primary ? 9 : 6.5;
          const innerR = c.primary ? 4.5 : 3;
          const delay = 700 + i * 80;
          const g = svg.append("g").attr("opacity", "0").attr("transform", `translate(${c.px},${c.py}) scale(0)`);
          g.append("circle").attr("r", outerR).attr("fill", "#f0e8d5").attr("stroke", "#c8851e").attr("stroke-width", c.primary ? 2.2 : 1.6);
          g.append("circle").attr("r", innerR).attr("fill", "#c8851e");
          g.append("text").attr("y", c.labelDy).attr("text-anchor", "middle").attr("font-family", "Georgia, 'Times New Roman', serif").attr("font-size", c.primary ? "10" : "8").attr("font-weight", "700").attr("fill", c.primary ? "#6a3e08" : "#8a6218").attr("letter-spacing", "0.09em").text(c.name);
          g.transition().delay(delay).duration(350).ease(d3.easeBackOut).attr("opacity", "1").attr("transform", `translate(${c.px},${c.py}) scale(1)`);
        });

        svg.append("text").attr("x", 28).attr("y", H - 18).attr("font-family", "Georgia, serif").attr("font-size", "9.5").attr("font-style", "italic").attr("fill", "#a08040").attr("opacity", "0.65").text("Atlantic Ocean");

        const cr = svg.append("g").attr("transform", `translate(${W - 34}, ${H - 34})`);
        cr.append("circle").attr("r", 16).attr("fill", "#dfd0ad").attr("stroke", "#c4a060").attr("stroke-width", "0.7");
        cr.append("line").attr("x1", 0).attr("y1", -11).attr("x2", 0).attr("y2", 11).attr("stroke", "#c4a060").attr("stroke-width", "0.6").attr("opacity", "0.7");
        cr.append("line").attr("x1", -11).attr("y1", 0).attr("x2", 11).attr("y2", 0).attr("stroke", "#c4a060").attr("stroke-width", "0.6").attr("opacity", "0.7");
        cr.append("polygon").attr("points", "0,-11 2.2,-4.5 -2.2,-4.5").attr("fill", "#a07020");
        cr.append("text").attr("text-anchor", "middle").attr("y", -14).attr("font-size", "8").attr("font-weight", "700").attr("fill", "#7a5010").attr("font-family", "Georgia, serif").text("N");

        const leg = svg.append("g").attr("transform", "translate(16, 390)");
        leg.append("rect").attr("width", 116).attr("height", 44).attr("rx", 5).attr("fill", "#dfd0ad").attr("stroke", "#c4a060").attr("stroke-width", "0.7");
        leg.append("line").attr("x1", 8).attr("y1", 13).attr("x2", 30).attr("y2", 13).attr("stroke", "#c4a060").attr("stroke-width", "1.4").attr("stroke-dasharray", "6 4").attr("stroke-linecap", "round");
        leg.append("text").attr("x", 36).attr("y", 17).attr("font-size", "9.5").attr("fill", "#7a5010").attr("font-family", "Georgia, serif").text("Trade route");
        leg.append("circle").attr("cx", 16).attr("cy", 32).attr("r", 5).attr("fill", "#f0e8d5").attr("stroke", "#c8851e").attr("stroke-width", "1.5");
        leg.append("circle").attr("cx", 16).attr("cy", 32).attr("r", 2.5).attr("fill", "#c8851e");
        leg.append("text").attr("x", 28).attr("y", 36).attr("font-size", "9.5").attr("fill", "#7a5010").attr("font-family", "Georgia, serif").text("City / hub");

        setReady(true);
      } catch (e) {
        console.error("Map load error:", e);
      }
    })();
  }, []);

  return (
    <div id="coverage" className="relative overflow-hidden rounded-3xl border" style={{ background: "#f0e8d5", borderColor: "#d4b87a" }}>
      <div className="relative z-10 px-5 pt-5 pb-3.5 flex items-start justify-between gap-4" style={{ borderBottom: "0.5px solid #d4b87a44" }}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5" style={{ color: "#a07020" }}>Regional Coverage</p>
          <h3 className="text-lg font-bold leading-tight" style={{ color: "#3a2a10" }}>West African Route Network</h3>
          <p className="mt-1 text-xs leading-relaxed max-w-xs" style={{ color: "#7a6040" }}>Ports, industrial zones, farms and ECOWAS trade corridors.</p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-white flex-shrink-0" style={{ background: "#c8851e" }}>
          <MapPin className="h-3 w-3" /> Accra Hub
        </span>
      </div>
      <div className="relative" style={{ background: "#f0e8d5" }}>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center z-10" style={{ minHeight: 200 }}>
            <div className="text-xs" style={{ color: "#a07020" }}>Loading map…</div>
          </div>
        )}
        <svg ref={svgRef} viewBox="0 0 660 420" width="100%" style={{ display: "block" }} />
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-4 gap-2" style={{ borderTop: "0.5px solid #d4b87a44" }}>
        {[
          { label: "Ghana", icon: MapPin },
          { label: "Togo / Benin", icon: Route },
          { label: "Nigeria", icon: Truck },
          { label: "ECOWAS", icon: Globe },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold" style={{ borderColor: "#d4a84c55", background: "rgba(255,255,255,0.55)", color: "#5a4010" }}>
              <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "#c8851e" }} />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Typewriter timing
───────────────────────────────────────────── */
const TYPE_SPEED      = 55;
const LINE1_TEXT      = "Let's move your cargo";
const LINE2_TEXT      = "with confidence.";
const LINE1_START     = 350;
const LINE1_DURATION  = LINE1_TEXT.length * TYPE_SPEED;
const LINE2_START     = LINE1_START + LINE1_DURATION + 80;
const LINE2_DURATION  = LINE2_TEXT.length * TYPE_SPEED;

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
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, isMobile ? 0.4 : 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.04]);

  const subtitleDelay = (LINE2_START + LINE2_DURATION + 120) / 1000;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full overflow-x-hidden bg-background">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[75svh] lg:min-h-[700px] flex items-center overflow-hidden py-28 text-white">
        <motion.div
          style={{ y: reduceMotion ? "0%" : imageY, scale: reduceMotion ? 1 : heroScale }}
          className="absolute inset-0 z-0"
        >
          <Img src={IMGS.hero} alt="ProHaul logistics truck" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/75 to-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        </motion.div>

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
              <span className="text-sm font-semibold text-orange-200">Get in Touch</span>
            </motion.div>

            {/* Line 1 — white */}
            <div className="min-h-[1.0em] text-[clamp(2.6rem,10vw,5rem)] font-extrabold leading-[0.97] tracking-tight text-white mb-1">
              <Typewriter
                text={LINE1_TEXT}
                startDelay={LINE1_START}
                typeSpeed={TYPE_SPEED}
                className="inline"
              />
            </div>

            {/* Line 2 — orange gradient */}
            <div className="min-h-[1.1em] text-[clamp(2.6rem,10vw,5rem)] font-extrabold leading-[0.97] tracking-tight mb-6">
              <Typewriter
                text={LINE2_TEXT}
                startDelay={LINE2_START}
                typeSpeed={TYPE_SPEED}
                className="inline text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: subtitleDelay }}
              className="mt-2 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300"
            >
              Contact ProHaul for reliable, safe, and efficient haulage solutions
              across Ghana and the West African sub-region.
            </motion.p>

            {/* CTA strip */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: subtitleDelay + 0.15 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <a
                href="tel:+233 (0) 244 136 797"
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
          transition={{ delay: subtitleDelay + 0.3 }}
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
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Request a Quote</p>
                <h2 className="mb-3 text-2xl md:text-3xl font-extrabold text-foreground leading-tight">Send us your haulage details.</h2>
                <p className="mb-7 text-sm text-muted-foreground leading-relaxed">
                  Tell us what you need moved — cargo type, pickup point, destination, and timeline. We'll respond promptly.
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
                      <p className="text-sm text-muted-foreground max-w-xs">Our team will review your details and get back to you shortly.</p>
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
                          <label htmlFor="name" className="block mb-1.5 text-xs font-semibold text-foreground">Full Name <span className="text-orange-500">*</span></label>
                          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block mb-1.5 text-xs font-semibold text-foreground">Phone Number</label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+233 XX XXX XXXX" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block mb-1.5 text-xs font-semibold text-foreground">Email Address <span className="text-orange-500">*</span></label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60" />
                      </div>
                      <div>
                        <label htmlFor="service" className="block mb-1.5 text-xs font-semibold text-foreground">Service of Interest <span className="text-orange-500">*</span></label>
                        <select id="service" name="service" value={formData.service} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20">
                          <option value="">Select a service</option>
                          {serviceOptions.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block mb-1.5 text-xs font-semibold text-foreground">Message <span className="text-orange-500">*</span></label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Cargo type, pickup location, destination, volume, and timeline..." className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 placeholder:text-muted-foreground/60" />
                      </div>
                      <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-600 hover:scale-[1.01] active:scale-[0.99]">
                        <Send className="h-4 w-4" /> Send Message
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
            <Reveal className="lg:col-span-2" y={36}>
              <div className="h-full rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 sm:p-8 text-white shadow-xl shadow-orange-500/25">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-100">Why Choose ProHaul?</p>
                <h2 className="mb-6 text-2xl md:text-3xl font-extrabold leading-tight">A trusted logistics partner for business continuity.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whyChoose.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-shrink-0" />
                      <span className="text-sm font-medium text-orange-50 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

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
                    <div key={row.day} className={`flex justify-between gap-4 ${i < arr.length - 1 ? "border-b border-border pb-4" : ""}`}>
                      <span className="text-sm text-muted-foreground">{row.day}</span>
                      <span className={`text-sm font-bold ${row.hours === "Closed" ? "text-muted-foreground" : "text-foreground"}`}>{row.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                  For urgent enquiries outside business hours, email us with your cargo details and route requirements.
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">Coverage & Operational Strength</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground leading-tight">Nationwide strength with regional reach.</h2>
            <p className="text-muted-foreground leading-relaxed">
              ProHaul supports cargo movement across Ghana and key West African trade corridors, with access to ports, industrial zones, farms, warehouses, markets, and commercial hubs.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: MapPin, title: "Nationwide Delivery", text: "Reliable haulage across Ghana, including high-demand commercial areas and remote project locations." },
              { icon: Globe, title: "Cross-Border Capability", text: "Regional movement within West Africa through key ECOWAS trade corridors." },
              { icon: Warehouse, title: "Port & Inland Logistics", text: "Cargo movement from ports to warehouses, factories, farms, depots, and distribution centres." },
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
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={40}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Let's Move Together</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-4xl mx-auto">
              We don't just move goods — we keep businesses moving.
            </h2>
            <p className="mx-auto mb-9 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-300">
              Partner with ProHaul for reliable, safe, and efficient haulage solutions across Ghana and West Africa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="tel:+233XXXXXXXXX" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 hover:scale-105">
                <Phone className="h-4 w-4" /> Call Us
              </a>
              <a href="mailto:info@prohaul.com" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/18 hover:scale-105">
                <Mail className="h-4 w-4" /> Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}