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
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Globe,
  LockKeyhole,
  Map,
  PackageCheck,
  ShieldCheck,
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
  compliance: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
  road: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=85",
  cargo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
};

const experienceHighlights = [
  {
    icon: Map,
    title: "Extensive Route Coverage",
    text: "Proven operations across key national and regional corridors, including high-volume and strategically important trade routes linking ports, industrial zones, and inland markets.",
  },
  {
    icon: Truck,
    title: "High-Volume & Time-Sensitive Deliveries",
    text: "Demonstrated capability to support large-scale and time-critical logistics operations, ensuring timely delivery aligned with client schedules and operational demands.",
  },
  {
    icon: PackageCheck,
    title: "Diverse Cargo Handling Expertise",
    text: "Experience transporting a wide range of cargo types—including petroleum products, agricultural commodities, construction materials, fertilizers, and containerized goods—under varying terrain, weather, and operational conditions.",
  },
];

const clientBenefits = [
  "Financial protection against loss or damage during transit",
  "Coverage for unforeseen incidents beyond operational control",
  "Enhanced risk mitigation across all haulage operations",
  "Confidence in the secure movement of high-value cargo",
];

export function ComplianceRegulatory() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.35 : 0]);

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[70svh] lg:min-h-[660px] flex items-center overflow-hidden py-24 text-white">
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={IMGS.hero} alt="ProHaul compliance and regulatory standards" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/55 to-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: reduceMotion ? 1 : heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex flex-wrap items-center gap-2 text-sm"
          >
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <span className="text-white">Compliance & Regulatory</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mb-6 inline-flex max-w-full items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/15 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">Compliance & Regulatory Standards</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.7rem,12vw,5.5rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              Lawful, efficient, and seamless cargo movement.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              ProHaul operates within a robust compliance framework, ensuring full adherence to all applicable laws and regulations governing haulage, petroleum transportation, and cross-border trade.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* TRACK RECORD */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Operational Strength</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">Track Record & Experience</h2>
              <p className="mb-5 text-muted-foreground leading-relaxed">
                ProHaul has established a strong and reliable operational track record supporting key sectors of the economy, including petroleum distribution, agriculture, and construction. Our experience spans the transportation of both bulk and packaged cargo, delivered with consistency, efficiency, and adherence to industry standards.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We have successfully executed haulage operations across major commercial and industrial corridors within Ghana and extending into the West African sub-region. Our ability to manage diverse logistics requirements under varying operational conditions has positioned us as a dependable partner for clients with both routine and complex transportation needs.
              </p>
            </RevealX>

            <RevealX x={70}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={IMGS.road} alt="Track record and route experience" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute left-3 bottom-3 sm:-left-6 sm:-bottom-6 rounded-2xl bg-orange-500 p-5 sm:p-6 text-white shadow-xl shadow-orange-500/30">
                  <BadgeCheck className="h-8 w-8 mb-3" />
                  <p className="text-xl sm:text-2xl font-extrabold">Reliable Operations</p>
                  <p className="text-xs sm:text-sm text-orange-100">Ghana & West Africa</p>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* EXPERIENCE HIGHLIGHTS */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Experience Highlights</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Proven capacity across routes, timelines, and cargo types.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {experienceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} y={42}>
                  <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>
                    <h3 className="mb-3 text-xl font-extrabold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPLIANCE STANDARDS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            <RevealX x={-70} className="lg:sticky lg:top-28">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Compliance Framework</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">Compliance & Regulatory Standards</h2>
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Img src={IMGS.compliance} alt="Compliance and regulatory operations" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>

            <div className="space-y-6">
              <Reveal y={36}>
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <p className="mb-5 text-muted-foreground leading-relaxed">
                    ProHaul operates within a robust compliance framework, ensuring full adherence to all applicable laws and regulations governing haulage, petroleum transportation, and cross-border trade. Our operations are structured to meet stringent national and regional standards, enabling lawful, efficient, and seamless movement of cargo across all jurisdictions in which we operate.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We adopt a zero-tolerance approach to non-compliance, embedding regulatory discipline into every aspect of our operations—from fleet management and driver conduct to documentation and cargo handling. Our systems and processes are designed to meet audit and inspection requirements, ensuring full transparency, traceability, and accountability at all times.
                  </p>
                </div>
              </Reveal>

              <Reveal y={36} delay={0.08}>
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                    <Truck className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Compliance Areas</p>
                  <h3 className="mb-3 text-2xl font-extrabold text-foreground">Ghanaian Transport & Safety Regulations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We comply with all national transport and road safety requirements, including vehicle licensing, roadworthiness standards, and operational guidelines enforced by relevant authorities such as the Driver and Vehicle Licensing Authority (DVLA) and other statutory bodies.
                  </p>
                </div>
              </Reveal>

              <Reveal y={36} delay={0.16}>
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10">
                    <ClipboardCheck className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="mb-3 text-2xl font-extrabold text-foreground">Petroleum Transportation Standards</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our fuel haulage operations are aligned with industry-specific regulations and safety protocols governing the transportation of petroleum products, including standards set by the National Petroleum Authority (NPA). We ensure strict adherence to handling procedures, equipment requirements, and safety compliance at all stages of transportation.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CARGO SECURITY */}
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
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">Cargo Protection</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">Cargo Security & Insurance</h2>
              <p className="mb-5 text-gray-300 leading-relaxed">
                At ProHaul, we recognize that the security of our clients’ cargo is paramount. As part of our commitment to risk management and service reliability, all cargo transported under our operations is covered by a comprehensive Goods in Transit (GIT) insurance policy.
              </p>
              <p className="mb-8 text-gray-300 leading-relaxed">
                This policy is underwritten in partnership with one of Ghana’s leading insurance providers, ensuring that our clients benefit from strong financial backing and credible claims support.
              </p>

              <div className="rounded-3xl bg-orange-500 p-6 sm:p-8 text-white shadow-2xl shadow-orange-500/20">
                <LockKeyhole className="mb-5 h-10 w-10" />
                <h3 className="mb-3 text-2xl sm:text-3xl font-extrabold">Goods in Transit Insurance</h3>
                <p className="text-orange-50 leading-relaxed">
                  With ProHaul, clients are assured not only of efficient delivery, but also of secured and protected cargo throughout the transportation lifecycle.
                </p>
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="space-y-6">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/10">
                  <Img src={IMGS.cargo} alt="Cargo security and insurance" className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                  <h3 className="mb-5 text-2xl font-extrabold text-white">What This Means for Our Clients</h3>
                  <div className="space-y-4">
                    {clientBenefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-400" />
                        <span className="text-sm sm:text-base text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 border-t border-white/10 pt-6 text-gray-300 leading-relaxed">
                    Our insurance coverage forms an integral part of our broader operational framework, which combines safety protocols, trained personnel, and disciplined haulage execution.
                  </p>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.road} alt="ProHaul route network" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-orange-700/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-300">Compliance-Driven Haulage</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              Move cargo with confidence, transparency, and protection.
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-gray-300">
              ProHaul combines regulatory discipline, cargo security, insurance coverage, and proven operational experience to support reliable haulage across Ghana and West Africa.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/quote"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 sm:hover:scale-105"
              >
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
