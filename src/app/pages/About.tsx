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
  Shield,
  Target,
  Award,
  TrendingUp,
  Users,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight,
  Truck,
  MapPin,
  Navigation,
  Clock,
  PackageCheck,
  Fuel,
  Container,
  Building2,
  Wheat,
  Satellite,
  FileCheck2,
  Route,
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
  fleet: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
  road: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
  driver: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=900&q=85",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
  port: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=85",
  agri: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=900&q=85",
  safety: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85",
};

const stats = [
  { value: "Ghana", label: "Nationwide coverage", icon: MapPin },
  { value: "ECOWAS", label: "Cross-border corridors", icon: Globe },
  { value: "460-530HP", label: "Prime mover power", icon: Zap },
  { value: "54,000L", label: "Tanker capacity", icon: Fuel },
];

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To deliver safe, efficient, and dependable haulage solutions that support business continuity across Ghana and West Africa.",
  },
  {
    icon: Award,
    title: "Our Vision",
    description: "To become one of West Africa's most trusted logistics partners for bulk, packaged, and specialized cargo movement.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "We operate with a structured HSE framework, trained personnel, vehicle inspection routines, and disciplined cargo handling.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our experienced drivers and operations team understand regional trade routes, delivery schedules, and client expectations.",
  },
];

const services = [
  { icon: Fuel, label: "Fuel & Petroleum" },
  { icon: Wheat, label: "Agricultural Produce" },
  { icon: Building2, label: "Construction Materials" },
  { icon: Container, label: "Container Haulage" },
  { icon: PackageCheck, label: "Fertilizers & Inputs" },
  { icon: Globe, label: "Cross-Border Haulage" },
];

const differentiators = [
  {
    icon: Zap,
    title: "High-Capacity, Performance-Driven Fleet",
    description: "Our modern fleet is engineered to handle diverse and large-scale haulage requirements, giving clients flexibility, responsiveness, and scalable capacity.",
  },
  {
    icon: Route,
    title: "Strategic Route Expertise",
    description: "We understand key commercial and industrial corridors within Ghana and across West Africa, helping reduce transit delays and improve delivery reliability.",
  },
  {
    icon: Target,
    title: "Integrated Logistics Insight",
    description: "Our approach goes beyond transportation. We align cargo movement with client supply chain needs to improve coordination and overall value delivery.",
  },
  {
    icon: Globe,
    title: "Cross-Border Operational Capability",
    description: "Our experience across ECOWAS trade corridors supports compliant cargo movement, transit documentation, and smooth regional logistics execution.",
  },
  {
    icon: Shield,
    title: "Reliability, Safety & Discipline",
    description: "Our processes, personnel, and fleet are aligned to ensure cargo is delivered securely, on schedule, and in accordance with agreed standards.",
  },
  {
    icon: Satellite,
    title: "Technology-Enabled Visibility",
    description: "GPS tracking and fleet management systems provide real-time visibility, stronger operational control, and better accountability during active trips.",
  },
];

const experience = [
  {
    title: "Extensive Route Coverage",
    description: "Proven operations across key national and regional corridors linking ports, industrial zones, farms, inland markets, and commercial hubs.",
  },
  {
    title: "High-Volume & Time-Sensitive Deliveries",
    description: "Capacity to support large-scale and time-critical logistics operations while aligning delivery schedules with client operational demands.",
  },
  {
    title: "Diverse Cargo Handling Expertise",
    description: "Experience transporting petroleum products, agricultural commodities, construction materials, fertilizers, industrial inputs, and containerized cargo.",
  },
  {
    title: "Operational Consistency",
    description: "Structured processes and disciplined execution help ensure reliable service delivery across multiple assignments and operating conditions.",
  },
  {
    title: "Scalable Service Delivery",
    description: "Fleet growth, planning discipline, and resource optimization allow us to expand operations in response to increasing client demand.",
  },
];

const process = [
  { step: "01", title: "Request & Planning", text: "Client requirements, route planning, cargo needs, and resource allocation are assessed." },
  { step: "02", title: "Load Coordination", text: "Loading schedules, supervision, documentation, and dispatch preparation are coordinated." },
  { step: "03", title: "Transit & Monitoring", text: "Trips are tracked with GPS visibility, driver coordination, and progress updates." },
  { step: "04", title: "Delivery & Confirmation", text: "Offloading, delivery verification, reporting, and documentation close the cycle." },
];

export function About() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.35 : 0]);

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[76svh] lg:min-h-[720px] flex items-center overflow-hidden py-24 text-white">
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={IMGS.hero} alt="ProHaul haulage truck on the road" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
        </motion.div>

        <div
          className="absolute inset-0 z-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "80px 80px",
          }}
        />

        <motion.div style={{ opacity: reduceMotion ? 1 : heroOpacity }} className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/15 px-3 sm:px-4 py-1.5 text-[11px] sm:text-sm text-orange-300 mb-6"
            >
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0" />
              <span className="truncate sm:whitespace-normal">Reliable Bulk Haulage · Nationwide Strength · Regional Reach</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(2.8rem,13vw,5rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">ProHaul</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              A Ghana-based haulage company delivering dependable, end-to-end transportation solutions across Ghana and the wider West African sub-region.
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
                Work With Us <ArrowRight className="h-5 w-5" />
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

      {/* QUICK STATS */}
      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Reveal key={stat.label} delay={index * 0.08} y={30}>
                  <div className="border-b border-r border-border p-5 sm:p-7 last:border-r-0 lg:border-b-0">
                    <Icon className="mb-4 h-7 w-7 text-orange-500" />
                    <div className="text-xl sm:text-2xl font-extrabold text-foreground">{stat.value}</div>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-tight">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={IMGS.fleet} alt="Modern ProHaul fleet" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute left-3 bottom-3 sm:-left-6 sm:-bottom-6 rounded-2xl bg-orange-500 p-4 sm:p-6 text-white shadow-xl shadow-orange-500/30">
                  <Truck className="h-7 w-7 mb-3 opacity-90" />
                  <p className="text-2xl sm:text-3xl font-extrabold">Built</p>
                  <p className="text-xs sm:text-sm text-orange-100">to move cargo at scale</p>
                </div>
                <div className="absolute right-3 top-3 sm:-right-5 sm:-top-5 rounded-2xl border border-white/10 bg-slate-950 p-4 text-white shadow-xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <Navigation className="h-4 w-4 text-orange-400" />
                    Ghana + West Africa
                  </div>
                </div>
              </div>
            </RevealX>

            <RevealX x={70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Who We Are</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Dependable transport for critical sectors of the economy.
              </h2>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                ProHaul delivers dependable, end-to-end transportation solutions for the safe, efficient, and timely movement of bulk and packaged goods.
              </p>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                We support businesses across petroleum distribution, agriculture, construction, industrial inputs, and containerized cargo movement.
              </p>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                With a modern fleet, experienced drivers, and a deep understanding of regional trade routes, ProHaul is built to move cargo securely, on schedule, and at scale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Modern European truck brands", "Experienced and trained drivers", "Regional route knowledge", "Secure and timely delivery"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-500" />
                    {item}
                  </div>
                ))}
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* MISSION CARDS */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Our Foundation</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Built on safety, reliability, and disciplined execution.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every ProHaul operation is guided by structured planning, trained personnel, and a commitment to consistent service delivery.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={index * 0.08} y={42}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                      <Icon className="h-6 w-6 text-orange-500 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-3 font-bold text-foreground">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE MOVE */}
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
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">Our Haulage Scope</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">Supporting Ghana's most important supply chains.</h2>
              <p className="mb-8 text-gray-400 leading-relaxed">
                ProHaul provides reliable transport for bulk and packaged goods, supporting industries that depend on timely movement from ports, farms, warehouses, depots, industrial zones, and project sites.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={service.label}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: isMobile ? 0 : index * 0.06, duration: 0.45 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-orange-400/40 hover:bg-white/10"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 text-orange-400" />
                      <span className="text-sm font-medium text-white/90">{service.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-3xl overflow-hidden aspect-[16/9] border border-white/10 shadow-2xl">
                  <Img src={IMGS.port} alt="Container haulage and port logistics" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-xl">
                  <Img src={IMGS.agri} alt="Agricultural commodities haulage" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-xl">
                  <Img src={IMGS.warehouse} alt="Warehouse and construction material logistics" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Key Differentiators</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">What sets ProHaul apart.</h2>
            <p className="text-muted-foreground leading-relaxed">
              We combine operational strength, market insight, technology, and a disciplined approach to execution.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} y={42}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-10 -translate-y-10 rounded-full bg-orange-500/10 transition-all group-hover:scale-150" />
                    <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                      <Icon className="h-6 w-6 text-orange-500 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="relative mb-3 font-bold text-foreground">{item.title}</h3>
                    <p className="relative text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <RevealX x={-70} className="lg:sticky lg:top-28">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Track Record & Experience</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">Reliable operations across major commercial and industrial corridors.</h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                ProHaul has established a strong operational track record supporting petroleum distribution, agriculture, construction, and industrial supply chains.
              </p>
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Img src={IMGS.road} alt="Long distance haulage route" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>

            <div className="space-y-5">
              {experience.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08} y={36}>
                  <div className="relative rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-orange-400/40 hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white font-extrabold shadow-lg shadow-orange-500/25">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="mb-2 font-bold text-foreground">{item.title}</h3>
                        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY + COMPLIANCE */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevealX x={-70}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
                  <Satellite className="h-7 w-7 text-orange-500" />
                </div>
                <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold text-foreground">Technology & Visibility</h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  ProHaul leverages GPS tracking and fleet management systems to provide real-time operational insight, strengthen control over fleet performance, and enhance service reliability.
                </p>
                <div className="space-y-3">
                  {["Integrated GPS tracking", "Fleet monitoring and performance oversight", "Driver coordination and communication", "Trip monitoring and reporting"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="h-full rounded-3xl border border-border bg-slate-950 p-6 sm:p-8 text-white shadow-2xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/15">
                  <FileCheck2 className="h-7 w-7 text-orange-400" />
                </div>
                <h2 className="mb-4 text-2xl sm:text-3xl font-extrabold">Compliance & Assurance</h2>
                <p className="mb-6 text-gray-400 leading-relaxed">
                  Our operations are structured around regulatory discipline, documentation control, safety compliance, environmental responsibility, and cargo security.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["DVLA requirements", "NPA standards", "EPA alignment", "ECOWAS protocols", "Audit readiness", "GIT insurance"].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-medium text-white/90">
                      <Shield className="h-4 w-4 flex-shrink-0 text-orange-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Service Delivery Process</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Clear steps from request to confirmation.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our structured process ensures efficiency, transparency, and accountability throughout the logistics chain.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
            {process.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.1} y={42}>
                <div className="relative text-center rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/40 hover:shadow-xl sm:hover:-translate-y-2">
                  <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-lg font-extrabold text-white shadow-xl shadow-orange-500/25">
                    {item.step}
                  </div>
                  <h3 className="mb-3 font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.safety} alt="ProHaul safety and operations" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/95 via-orange-600/90 to-slate-950/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-100">Corporate Assurance</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">We don't just move goods — we keep businesses moving.</h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-orange-50">
              Our services are underpinned by operational discipline, safety compliance, and a commitment to delivering consistent value to clients.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-orange-600 transition-all hover:bg-gray-100 sm:hover:scale-105"
              >
                Partner With Us <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/fleet"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                View Our Fleet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
