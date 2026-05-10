import { Link } from "react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Truck,
  Gauge,
  Zap,
  Settings,
  Droplet,
  Package,
  Container as ContainerIcon,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Navigation,
  Shield,
  Clock,
  Wrench,
  BarChart3,
  Satellite,
  Route,
  Fuel,
  Activity,
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
  tanker: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
  fleet: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
  road: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
  port: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=85",
  driver: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=900&q=85",
};

const brands = [
  {
    name: "MAN",
    description: "Durable European prime movers selected for demanding long-haul and heavy-duty operating conditions.",
  },
  {
    name: "DAF",
    description: "Fuel-efficient engineering that supports dependable haulage performance across varied routes.",
  },
  {
    name: "Volvo",
    description: "Premium reliability, driver safety, and proven performance for professional transport operations.",
  },
  {
    name: "Scania",
    description: "Heavy-duty power and operational endurance for high payloads and challenging terrains.",
  },
];

const stats = [
  { icon: Zap, value: "460-530HP", label: "Engine power range" },
  { icon: Gauge, value: "2,100-2,500Nm", label: "Torque output" },
  { icon: Fuel, value: "27,000-54,000L", label: "Fuel tanker capacities" },
  { icon: Package, value: "Up to 80T", label: "Flatbed load capacity" },
];

const capabilities = [
  {
    icon: Truck,
    title: "High-Powered Prime Movers",
    description: "Prime movers designed for long-distance and heavy-load transport across Ghana and West African routes.",
  },
  {
    icon: Gauge,
    title: "High Torque Output",
    description: "2,100 Nm to 2,500 Nm pulling power for high payloads, gradients, remote corridors, and challenging terrains.",
  },
  {
    icon: Route,
    title: "Domestic & Cross-Border Configurations",
    description: "Fleet configurations suitable for domestic distribution and cross-border haulage within the West African sub-region.",
  },
  {
    icon: Wrench,
    title: "Continuous Fleet Renewal",
    description: "The fleet is continually expanded and refreshed with newer models to strengthen capacity and reduce downtime.",
  },
  {
    icon: Shield,
    title: "Reliable Performance Across Terrain",
    description: "Robust, well-maintained equipment supports both routine logistics and high-demand operating conditions.",
  },
  {
    icon: Satellite,
    title: "GPS Tracking & Fleet Monitoring",
    description: "Technology-enabled monitoring improves visibility, operational control, and accountability across haulage activities.",
  },
];

const trailers = [
  {
    icon: Droplet,
    title: "Fuel Tankers",
    spec: "27,000L, 36,000L, 45,000L & 54,000L",
    description: "Tanker configurations for petroleum product transportation to depots, stations, industrial facilities, mines, and distribution points.",
  },
  {
    icon: Package,
    title: "Flatbed Trailers",
    spec: "Up to 80 tonnes",
    description: "Flatbeds configured for general cargo, cement, tiles, construction materials, industrial inputs, and heavy-load movement.",
  },
  {
    icon: ContainerIcon,
    title: "Container Handling",
    spec: "20ft & 40ft containers",
    description: "Container handling capability for port-to-inland logistics, import/export cargo, and distribution networks.",
  },
];

const visibility = [
  {
    icon: Navigation,
    title: "Integrated GPS Tracking",
    description: "Real-time visibility of active trips, vehicle movement, route adherence, and cargo transit status.",
  },
  {
    icon: Activity,
    title: "Fleet Performance Oversight",
    description: "Monitoring of movement patterns, utilization, operational efficiency, and potential downtime risks.",
  },
  {
    icon: Clock,
    title: "Trip Monitoring & Reporting",
    description: "Each trip is actively monitored from dispatch through delivery to support schedule adherence and reporting.",
  },
  {
    icon: Shield,
    title: "Driver Coordination",
    description: "Structured communication between drivers and operations teams throughout the delivery lifecycle.",
  },
];

const operatingBenefits = [
  "Precise matching of equipment to cargo requirements",
  "Improved load management and operational efficiency",
  "Reduced downtime through fleet renewal and maintenance discipline",
  "Consistent delivery performance across varied road conditions",
];

export function Fleet() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.35 : 0]);

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[78svh] lg:min-h-[720px] flex items-center overflow-hidden py-24 text-white">
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={IMGS.hero} alt="ProHaul fleet on the road" className="absolute inset-0 h-full w-full" />
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
            <span className="text-white">Fleet</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mb-6 inline-flex max-w-full items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/15 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">Fleet & Operational Capacity</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.55rem,12vw,4.8rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              High-performance fleet built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">scale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              ProHaul operates a modern, high-performance fleet designed to deliver reliability, efficiency, and scalable capacity across a wide range of haulage requirements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-500 px-7 py-4 font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 sm:hover:scale-105"
              >
                Request Fleet Capacity <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-7 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={index * 0.08} y={30}>
                  <div className="border-b border-r border-border p-5 sm:p-7 last:border-r-0 lg:border-b-0">
                    <Icon className="mb-4 h-7 w-7 text-orange-500" />
                    <div className="text-lg sm:text-2xl font-extrabold text-foreground leading-tight">{stat.value}</div>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-tight">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLEET OVERVIEW */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Our Fleet Strategy</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Robust, well-maintained equipment for routine and high-demand operations.
              </h2>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                ProHaul’s fleet strategy is centered on deploying robust, well-maintained equipment capable of supporting both routine and high-demand logistics operations.
              </p>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                The fleet comprises trusted European truck brands: MAN, DAF, Volvo, and Scania. These brands are selected for durability, fuel efficiency, and proven performance under demanding operating conditions.
              </p>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                In line with long-term growth, the fleet is continually expanded and refreshed with newer models to strengthen operational capacity, improve efficiency, and meet evolving client requirements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {operatingBenefits.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 p-3 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-500" />
                    {item}
                  </div>
                ))}
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={IMGS.tanker} alt="ProHaul tanker truck" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute left-3 bottom-3 sm:-left-6 sm:-bottom-6 rounded-2xl bg-orange-500 p-4 sm:p-6 text-white shadow-xl shadow-orange-500/30">
                  <Zap className="h-7 w-7 mb-3 opacity-90" />
                  <p className="text-xl sm:text-2xl font-extrabold">460-530HP</p>
                  <p className="text-xs sm:text-sm text-orange-100">Power range</p>
                </div>
                <div className="absolute right-3 top-3 sm:-right-5 sm:-top-5 rounded-2xl border border-white/10 bg-slate-950 p-4 text-white shadow-xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <Gauge className="h-4 w-4 text-orange-400" />
                    2,100-2,500Nm Torque
                  </div>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Trusted European Brands</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Selected for durability, efficiency, and performance.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our truck brands are chosen to withstand demanding haulage operations while supporting reliability and operational efficiency.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brands.map((brand, index) => (
              <Reveal key={brand.name} delay={index * 0.08} y={42}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-10 -translate-y-10 rounded-full bg-orange-500/10 transition-all group-hover:scale-150" />
                  <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                    <Truck className="h-8 w-8 text-orange-500 transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="relative mb-3 text-2xl font-black text-foreground">{brand.name}</h3>
                  <p className="relative text-sm leading-relaxed text-muted-foreground">{brand.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "80px 80px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">Fleet Capability</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">
                Built for long-distance, high-payload, and challenging terrain.
              </h2>
              <p className="mb-8 text-gray-400 leading-relaxed">
                Our trucks are powered within the range of 460HP to 530HP, with torque output ranging from 2,100 Nm to 2,500 Nm. This gives the fleet the pulling power required for heavy-duty haulage across long-haul routes, gradients, and remote corridors.
              </p>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
                <Img src={IMGS.road} alt="ProHaul long distance route" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <Reveal key={capability.title} delay={index * 0.07} y={30}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-orange-400/40 hover:bg-white/10">
                      <Icon className="mb-4 h-7 w-7 text-orange-400" />
                      <h3 className="mb-2 font-bold text-white">{capability.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{capability.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TRAILER CONFIGURATION */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Trailer Configuration</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">The right trailer for the right cargo.</h2>
            <p className="text-muted-foreground leading-relaxed">
              This integrated fleet structure enables ProHaul to match equipment precisely to cargo requirements, ensuring optimal load management and consistent delivery performance.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trailers.map((trailer, index) => {
              const Icon = trailer.icon;
              return (
                <Reveal key={trailer.title} delay={index * 0.08} y={42}>
                  <div className="group h-full rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 transition-all group-hover:scale-110">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{trailer.title}</h3>
                    <p className="mb-4 text-sm font-bold text-orange-500">{trailer.spec}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{trailer.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Technology & Visibility</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Real-time visibility for stronger operational control.
              </h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                ProHaul leverages technology as a core enabler of operational excellence, driving efficiency, transparency, and accountability across haulage activities. Integrated GPS tracking and fleet management systems provide real-time visibility of active trips, route adherence, and cargo transit status.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {visibility.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.07} y={30}>
                      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-orange-400/40 hover:shadow-lg">
                        <Icon className="mb-4 h-7 w-7 text-orange-500" />
                        <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Img src={IMGS.warehouse} alt="Fleet monitoring and logistics operations" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-100">Operational Impact</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">
                Fleet capacity that supports consistent delivery performance.
              </h2>
              <p className="mb-8 text-orange-50 leading-relaxed">
                ProHaul’s fleet, trailer configurations, technology systems, and operational discipline work together to improve asset utilization, reduce downtime, strengthen accountability, and keep clients informed throughout cargo movement.
              </p>
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-orange-600 transition-all hover:bg-gray-100 sm:hover:scale-105"
              >
                Request Fleet Support <ArrowRight className="h-5 w-5" />
              </Link>
            </RevealX>

            <RevealX x={70}>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold">Fleet Performance Focus</h3>
                    <p className="text-sm text-orange-50">Monitoring, visibility, and reliability</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Fleet Utilization Visibility", value: "Real-time" },
                    { label: "Trip Monitoring", value: "Dispatch to Delivery" },
                    { label: "Route Adherence", value: "GPS Enabled" },
                  ].map((item, index) => (
                    <div key={item.label}>
                      <div className="mb-2 flex justify-between gap-4 text-sm">
                        <span>{item.label}</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/20">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${92 + index * 3}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.15 }}
                          className="h-full rounded-full bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.port} alt="Fleet capacity and port logistics" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-orange-700/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-300">Fleet & Operational Capacity</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              Ready to experience our fleet capability?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-gray-300">
              Partner with ProHaul for reliable, efficient, and scalable haulage solutions backed by a modern, high-performance fleet.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 sm:hover:scale-105"
              >
                Get in Touch <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
