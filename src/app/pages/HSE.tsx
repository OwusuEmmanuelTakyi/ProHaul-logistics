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
  Users,
  FileCheck,
  AlertTriangle,
  Settings,
  CheckCircle2,
  Leaf,
  ArrowRight,
  Truck,
  HardHat,
  ClipboardCheck,
  Siren,
  Scale,
  Globe,
  Fuel,
  FileText,
  LockKeyhole,
  BadgeCheck,
  MapPin,
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
  hero: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=85",
  safety: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=85",
  driver: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?w=1200&q=85",
  truck: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85",
  fuel: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
  road: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
};

const stats = [
  { icon: Shield, value: "Zero", label: "Incident operating objective" },
  { icon: Users, value: "Trained", label: "Driver safety personnel" },
  { icon: ClipboardCheck, value: "Routine", label: "Vehicle inspection protocols" },
  { icon: FileCheck, value: "Audit Ready", label: "Documentation control" },
];

const focusAreas = [
  {
    icon: Users,
    title: "Driver Safety Training",
    description: "Driver safety training and certification programs support safe conduct across all haulage assignments.",
  },
  {
    icon: HardHat,
    title: "Personal Protective Equipment",
    description: "Strict enforcement of PPE usage helps protect personnel during loading, discharge, and operational activities.",
  },
  {
    icon: Settings,
    title: "Vehicle Inspection & Maintenance",
    description: "Routine vehicle inspections and maintenance protocols reduce operational risk and help maintain roadworthiness.",
  },
  {
    icon: Siren,
    title: "Incident Reporting & Response",
    description: "Incident reporting, investigation, and response procedures promote accountability and continuous improvement.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description: "Operational practices align with applicable environmental, transport, and safety regulations.",
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    description: "Responsible handling and transportation practices support environmental protection and safer community operations.",
  },
];

const compliance = [
  {
    icon: Truck,
    title: "Ghanaian Transport & Safety Regulations",
    description: "Compliance with vehicle licensing, roadworthiness standards, and transport safety requirements enforced by relevant authorities such as DVLA.",
  },
  {
    icon: Fuel,
    title: "Petroleum Transportation Standards",
    description: "Fuel haulage operations are aligned with NPA-related safety protocols, handling procedures, and petroleum transport requirements.",
  },
  {
    icon: Leaf,
    title: "Environmental Compliance",
    description: "Operations follow environmental guidelines and best practices, including responsible handling of potentially hazardous materials.",
  },
  {
    icon: Globe,
    title: "ECOWAS Transit & Cross-Border Protocols",
    description: "Cross-border operations observe customs documentation, cargo clearance procedures, and regional transit expectations.",
  },
  {
    icon: FileText,
    title: "Documentation & Audit Readiness",
    description: "Transport documentation, permits, and compliance records are controlled to support transparency and inspection readiness.",
  },
  {
    icon: Scale,
    title: "Operational Risk Management",
    description: "Compliance is integrated into risk management to reduce regulatory, operational, and transit-related exposure.",
  },
];

const insurance = [
  {
    icon: LockKeyhole,
    title: "Financial Protection",
    description: "Protection against loss or damage during transit under Goods in Transit insurance coverage.",
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    description: "Enhanced risk control across all haulage operations, especially for high-value cargo movement.",
  },
  {
    icon: BadgeCheck,
    title: "Credible Claims Support",
    description: "Insurance support provides clients with stronger financial backing and claims assistance.",
  },
  {
    icon: CheckCircle2,
    title: "Client Assurance",
    description: "Clients can rely on secured and protected cargo throughout the transportation lifecycle.",
  },
];

const process = [
  {
    step: "01",
    title: "Prevent",
    text: "Training, inspection, PPE enforcement, and route discipline reduce risk before operations begin.",
  },
  {
    step: "02",
    title: "Monitor",
    text: "Drivers, trucks, trips, and documentation are monitored to maintain safety and accountability.",
  },
  {
    step: "03",
    title: "Respond",
    text: "Incident reporting and response procedures guide quick action when operational issues arise.",
  },
  {
    step: "04",
    title: "Improve",
    text: "Investigation, review, and corrective action strengthen future operational performance.",
  },
];

export function HSE() {
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
          <Img src={IMGS.hero} alt="Health safety and environment operations" className="absolute inset-0 h-full w-full" />
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
            <span className="text-white">HSE</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mb-6 inline-flex max-w-full items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/15 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">Health, Safety & Environment</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.55rem,12vw,4.8rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              Safety-led operations for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">secure delivery.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              Safety is a core pillar of ProHaul’s operations. Our HSE framework is designed to protect personnel, cargo, and the communities within which we operate.
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
                Speak to Our Team <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/fleet"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-7 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                View Fleet
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

      {/* FRAMEWORK */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Our HSE Framework</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Preventive measures, continuous training, and strict safety discipline.
              </h2>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                ProHaul maintains a structured Health, Safety, and Environment framework designed to protect personnel, cargo, and communities across every haulage assignment.
              </p>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                Our approach integrates preventive measures, continuous training, and strict adherence to industry safety standards.
              </p>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                The objective is to maintain a zero-incident operating environment while ensuring consistent service delivery.
              </p>

              <div className="rounded-3xl bg-orange-500 p-6 sm:p-8 text-white shadow-xl shadow-orange-500/20">
                <Activity className="mb-5 h-10 w-10" />
                <h3 className="mb-3 text-2xl sm:text-3xl font-extrabold">Zero-incident objective</h3>
                <p className="text-orange-50 leading-relaxed">
                  Safety is embedded in driver conduct, vehicle inspection, cargo handling, incident reporting, and compliance management.
                </p>
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={IMGS.safety} alt="Safety and HSE operations" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute left-3 bottom-3 sm:-left-6 sm:-bottom-6 rounded-2xl bg-orange-500 p-4 sm:p-6 text-white shadow-xl shadow-orange-500/30">
                  <HardHat className="h-7 w-7 mb-3 opacity-90" />
                  <p className="text-xl sm:text-2xl font-extrabold">HSE First</p>
                  <p className="text-xs sm:text-sm text-orange-100">Personnel · Cargo · Community</p>
                </div>
                <div className="absolute right-3 top-3 sm:-right-5 sm:-top-5 rounded-2xl border border-white/10 bg-slate-950 p-4 text-white shadow-xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <Shield className="h-4 w-4 text-orange-400" />
                    Safety-focused execution
                  </div>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">HSE Focus Areas</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Safety control across every stage of operations.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our focus areas cover driver readiness, protective equipment, vehicle condition, response procedures, compliance, and environmental responsibility.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.title} delay={index * 0.08} y={42}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                      <Icon className="h-6 w-6 text-orange-500 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-3 font-bold text-foreground">{area.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{area.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: isMobile ? "48px 48px" : "80px 80px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <RevealX x={-70} className="lg:sticky lg:top-28">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">Compliance & Regulatory Standards</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">
                A compliance framework for lawful, safe, and seamless cargo movement.
              </h2>
              <p className="mb-8 text-gray-400 leading-relaxed">
                ProHaul operates within a robust compliance framework, ensuring adherence to applicable laws and regulations governing haulage, petroleum transportation, and cross-border trade.
              </p>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
                <Img src={IMGS.fuel} alt="Regulated haulage operations" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {compliance.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.07} y={30}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-orange-400/40 hover:bg-white/10">
                      <Icon className="mb-4 h-7 w-7 text-orange-400" />
                      <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Risk Control Flow</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Prevent, monitor, respond, and improve.</h2>
            <p className="text-muted-foreground leading-relaxed">
              HSE is treated as a continuous system, not a one-time checklist.
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

      {/* INSURANCE */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Cargo Security & Insurance</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Cargo protection is part of the service promise.
              </h2>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                All cargo transported under ProHaul operations is covered by a comprehensive Goods in Transit insurance policy.
              </p>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                This coverage forms part of a broader operational framework combining safety protocols, trained personnel, and disciplined haulage execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {insurance.map((item, index) => {
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
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={IMGS.warehouse} alt="Cargo security and protected logistics" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute left-3 bottom-3 sm:-left-6 sm:-bottom-6 rounded-2xl bg-orange-500 p-4 sm:p-6 text-white shadow-xl shadow-orange-500/30">
                  <LockKeyhole className="h-7 w-7 mb-3 opacity-90" />
                  <p className="text-xl sm:text-2xl font-extrabold">GIT Cover</p>
                  <p className="text-xs sm:text-sm text-orange-100">Goods in Transit insurance</p>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* ASSURANCE */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-100">Client Assurance</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">
                Secure movement, full accountability, and safety-focused execution.
              </h2>
              <p className="text-orange-50 leading-relaxed">
                This compliance-driven approach provides clients with the assurance that cargo is handled in accordance with applicable laws, industry standards, and best practices across the transportation lifecycle.
              </p>
            </RevealX>

            <RevealX x={70}>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
                <Shield className="mb-6 h-12 w-12 text-white" />
                <h3 className="mb-4 text-2xl sm:text-3xl font-extrabold">Operational discipline at every stage.</h3>
                <div className="space-y-4">
                  {[
                    "Safety protocols guide people, vehicles, cargo, and routes.",
                    "Compliance records support transparency and audit readiness.",
                    "Insurance coverage helps protect clients against transit-related risks.",
                    "Incident response procedures support faster action and accountability.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-orange-50">{item}</span>
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
          <Img src={IMGS.road} alt="Safety driven haulage operations" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-orange-700/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-300">Safety-Driven Operations</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              Move your cargo with safety and confidence.
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-gray-300">
              ProHaul combines safety protocols, compliance discipline, insurance protection, and trained personnel to deliver secure logistics support across Ghana and West Africa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 sm:hover:scale-105"
              >
                Learn More <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/fleet"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                View Fleet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
