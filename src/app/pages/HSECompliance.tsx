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
  CheckCircle2,
  FileCheck2,
  Globe,
  HardHat,
  Leaf,
  Scale,
  Shield,
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

/* ── TYPEWRITER ── */
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
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-700" />}
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

const IMGS = {
  hero: "https://i.pinimg.com/1200x/69/c1/68/69c1686ff4ba6c8bc79a83dfc9656ba7.jpg",
  hse: "https://i.pinimg.com/736x/4a/bb/80/4abb80ca85e3ebae03dd81c6c6131dc6.jpg",
};

const hseFocusAreas = [
  "Driver safety training and certification programs",
  "Enforcement of personal protective equipment (PPE) usage",
  "Routine vehicle inspection and maintenance protocols",
  "Incident reporting, investigation, and response procedures",
  "Compliance with applicable environmental and safety regulations",
];

const experienceHighlights = [
  {
    title: "Extensive Route Coverage",
    text: "Proven operations across key national and regional corridors, including high-volume and strategically important trade routes linking ports, industrial zones, and inland markets.",
  },
  {
    title: "High-Volume & Time-Sensitive Deliveries",
    text: "Demonstrated capability to support large-scale and time-critical logistics operations, ensuring timely delivery aligned with client schedules and operational demands.",
  },
  {
    title: "Diverse Cargo Handling Expertise",
    text: "Experience transporting a wide range of cargo types—including petroleum products, agricultural commodities, construction materials, fertilizers, and containerized goods—under varying terrain, weather, and operational conditions.",
  },
  {
    title: "Operational Consistency",
    text: "Our growing portfolio reflects not only our ability to execute effectively, but also our commitment to building long-term partnerships grounded in reliability, performance, and trust.",
  },
];

const differentiators = [
  {
    title: "High-Capacity, Performance-Driven Fleet",
    text: "Our modern fleet is engineered to handle diverse and large-scale haulage requirements, enabling us to support high-volume operations across multiple sectors. This capacity ensures flexibility, responsiveness, and the ability to scale in line with client demand.",
  },
  {
    title: "Strategic Route Expertise",
    text: "We possess strong operational knowledge of key commercial and industrial corridors within Ghana and across West Africa. This enables efficient route planning, reduced transit times, and reliable delivery performance, even across complex and high-traffic routes.",
  },
  {
    title: "Integrated Logistics Insight",
    text: "Through our broader involvement in trade and supply chains, we bring a deeper understanding of cargo movement beyond transportation. This allows us to align our services with client supply chain needs, improving coordination, efficiency, and overall value delivery.",
  },
  {
    title: "Cross-Border Operational Capability",
    text: "Our experience within the West African sub-region, particularly across ECOWAS trade corridors, enables us to manage cross-border logistics effectively. We are familiar with transit procedures, documentation requirements, and route dynamics, ensuring smooth and compliant cargo movement.",
  },
  {
    title: "Commitment to Reliability, Safety, and Timely Execution",
    text: "We operate with a strong focus on safety, operational discipline, and service consistency. Our processes, personnel, and fleet are aligned to ensure cargo is delivered securely, on schedule, and in accordance with agreed standards.",
  },
  {
    title: "Technology-Enabled Operations",
    text: "We leverage GPS tracking and fleet management systems to provide real-time visibility, improve operational efficiency, and enhance accountability across all haulage activities.",
  },
];

const technologyCapabilities = [
  {
    title: "Integrated GPS Tracking & Fleet Management Systems",
    text: "We deploy advanced GPS tracking integrated with fleet management systems to provide real-time visibility of all active trips. This enables continuous monitoring of vehicle movements, route adherence, and cargo transit status, while optimizing fleet utilization and improving operational efficiency.",
  },
  {
    title: "Fleet Monitoring & Performance Oversight",
    text: "Our systems provide detailed oversight of truck performance, including movement patterns, utilization levels, and operational efficiency. This allows for proactive identification of inefficiencies, improved asset management, and reduced downtime.",
  },
  {
    title: "Driver Coordination & Communication",
    text: "We maintain structured and coordinated communication between drivers and operations teams throughout the delivery lifecycle, ensuring prompt response to operational changes, route adjustments, and client requirements.",
  },
  {
    title: "Trip Monitoring & Reporting",
    text: "Each trip is actively monitored from dispatch through to delivery, with performance tracking and reporting mechanisms in place to ensure adherence to schedules and service standards.",
  },
];

const complianceAreas = [
  {
    icon: Truck,
    title: "Ghanaian Transport & Safety Regulations",
    text: "We comply with all national transport and road safety requirements, including vehicle licensing, roadworthiness standards, and operational guidelines enforced by relevant authorities such as the Driver and Vehicle Licensing Authority (DVLA) and other statutory bodies.",
  },
  {
    icon: ShieldCheck,
    title: "Petroleum Transportation Standards",
    text: "Our fuel haulage operations are aligned with industry-specific regulations and safety protocols governing the transportation of petroleum products, including standards set by the National Petroleum Authority (NPA). We ensure strict adherence to handling procedures, equipment requirements, and safety compliance at all stages of transportation.",
  },
  {
    icon: Leaf,
    title: "Environmental Compliance",
    text: "We operate in accordance with environmental guidelines and best practices, including adherence to standards set by the Environmental Protection Agency (EPA), ensuring responsible handling and transportation of potentially hazardous materials.",
  },
  {
    icon: Globe,
    title: "ECOWAS Transit & Cross-Border Protocols",
    text: "Our cross-border operations comply with ECOWAS trade and transit frameworks, including customs documentation, cargo clearance procedures, and regional transport regulations. This enables efficient and compliant movement of goods across key West African trade corridors.",
  },
  {
    icon: FileCheck2,
    title: "Documentation & Audit Readiness",
    text: "We maintain strict control over transport documentation, permits, and compliance records, ensuring accuracy, completeness, and readiness for regulatory audits and inspections at any point in the logistics process.",
  },
  {
    icon: Scale,
    title: "Operational Risk Management",
    text: "Compliance is integrated into our broader risk management framework, minimizing exposure to regulatory, operational, and transit-related risks while enhancing overall service reliability.",
  },
];

/* ── Typewriter timing ── */
const TYPE_SPEED     = 55;
const LINE1_TEXT     = "HSE &";
const LINE2_TEXT     = "Compliance";
const LINE1_START    = 350;
const LINE1_DURATION = LINE1_TEXT.length * TYPE_SPEED;
const LINE2_START    = LINE1_START + LINE1_DURATION + 80;
const LINE2_DURATION = LINE2_TEXT.length * TYPE_SPEED;

export function HSECompliance() {
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
    isMobile ? ["0%", "7%"] : ["0%", "18%"]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.9],
    [1, isMobile ? 0.45 : 0]
  );

  const subtitleDelay = (LINE2_START + LINE2_DURATION + 120) / 1000;

  return (
    <div className="w-full overflow-x-hidden bg-background">

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[72svh] items-center overflow-hidden py-24 text-white lg:min-h-[660px]"
      >
        <motion.div
          style={{ y: reduceMotion ? "0%" : imageY }}
          className="absolute inset-0 z-0"
        >
          <Img
            src={IMGS.hero}
            alt="HSE and compliance operations"
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-950/45 to-slate-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex flex-wrap items-center gap-2 text-sm"
          >
            <Link to="/" className="text-gray-400 transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-white">HSE & Compliance</span>
          </motion.div>

          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mb-6 inline-flex max-w-full items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/15 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">
                Health, Safety & Environment
              </span>
            </motion.div>

            {/* Line 1 — "HSE &" white */}
            <div className="min-h-[1.0em] text-[clamp(2.7rem,12vw,5.3rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-white mb-1">
              <Typewriter
                text={LINE1_TEXT}
                startDelay={LINE1_START}
                typeSpeed={TYPE_SPEED}
                className="inline"
              />
            </div>

            {/* Line 2 — "Compliance" orange gradient */}
            <div className="min-h-[1.1em] text-[clamp(2.7rem,12vw,5.3rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight mb-6">
              <Typewriter
                text={LINE2_TEXT}
                startDelay={LINE2_START}
                typeSpeed={TYPE_SPEED}
                className="inline text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600"
              />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: subtitleDelay }}
              className="mt-2 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl"
            >
              Safety is a core pillar of ProHaul's operations. We maintain a structured
              Health, Safety, and Environment (HSE) framework designed to protect personnel,
              cargo, and the communities within which we operate.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── HSE INTRO ── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal y={36}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
                  <HardHat className="h-7 w-7 text-orange-500" />
                </div>
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                  Health, Safety & Environment (HSE)
                </p>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                  Health, Safety & Environment (HSE)
                </h2>
                <div className="space-y-5 leading-relaxed text-muted-foreground">
                  <p>
                    Safety is a core pillar of ProHaul's operations. We maintain a structured
                    Health, Safety, and Environment (HSE) framework designed to protect personnel,
                    cargo, and the communities within which we operate.
                  </p>
                  <p>
                    Our approach integrates preventive measures, continuous training, and strict
                    adherence to industry safety standards.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal y={36} delay={0.08}>
              <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <Img
                  src={IMGS.hse}
                  alt="Health, Safety and Environment operations"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HSE FOCUS AREAS ── */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal y={36}>
              <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <Img
                  src="https://i.pinimg.com/webp/736x/58/32/f2/5832f279887a0140cefef8b8cda246fc.webp"
                  alt="Safety equipment including hard hats, high-visibility vests, gloves, and protective gear laid out on a surface"
                  className="h-full w-full"
                />
              </div>
            </Reveal>

            <Reveal y={36} delay={0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
                  HSE Focus Areas
                </p>
                <h2 className="mb-8 text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                  HSE Focus Areas
                </h2>
                <div className="space-y-4">
                  {hseFocusAreas.map((item, index) => (
                    <Reveal key={item} delay={index * 0.08} y={24}>
                      <div className="flex items-start gap-4 rounded-2xl border border-border bg-background p-4 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-md">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
                          {item}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE HIGHLIGHTS ── */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
              Experience Highlights
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
              Experience Highlights
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {experienceHighlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} y={38}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-sm font-black text-orange-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mb-3 text-xl font-extrabold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY DIFFERENTIATORS ── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
              Key Differentiators
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
              Key Differentiators
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              ProHaul distinguishes itself through a combination of operational strength, market
              insight, and a disciplined approach to execution. Our business is structured to
              deliver not just transportation services, but dependable logistics solutions that
              support our clients' operational continuity and long-term growth.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} y={38}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
                  <h3 className="mb-3 text-xl font-extrabold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal y={36} className="mt-8">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
              <p className="text-lg leading-relaxed text-gray-200">
                At ProHaul, we position ourselves not merely as a service provider, but as a
                trusted logistics partner, delivering structured, reliable, and scalable solutions
                that support business performance across industries.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TECHNOLOGY & VISIBILITY ── */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
              Technology & Visibility
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
              Technology & Visibility
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              ProHaul leverages technology as a core enabler of operational excellence, driving
              efficiency, transparency, and accountability across all haulage activities. Our
              technology framework is designed to provide real-time operational insight, strengthen
              control over fleet performance, and enhance the overall reliability of our service
              delivery.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {technologyCapabilities.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} y={38}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
                  <h3 className="mb-3 text-xl font-extrabold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal y={36} className="mt-8">
            <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6 sm:p-8">
              <h3 className="mb-3 text-2xl font-extrabold text-foreground">Operational Impact</h3>
              <p className="leading-relaxed text-muted-foreground">
                These technology-driven capabilities enable proactive decision-making, stronger
                operational control, and improved service consistency. They also enhance
                accountability at every stage of the logistics process, ensuring that clients remain
                consistently informed on the status of their cargo and can rely on accurate, timely
                delivery updates.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMPLIANCE & REGULATORY STANDARDS ── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-4xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">
              Compliance & Regulatory Standards
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
              Compliance & Regulatory Standards
            </h2>
          </Reveal>

          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="space-y-5 leading-relaxed text-muted-foreground">
              <p>
                ProHaul operates within a robust compliance framework, ensuring full adherence to
                all applicable laws and regulations governing haulage, petroleum transportation,
                and cross-border trade. Our operations are structured to meet stringent national and
                regional standards, enabling lawful, efficient, and seamless movement of cargo across
                all jurisdictions in which we operate.
              </p>
              <p>
                We adopt a zero-tolerance approach to non-compliance, embedding regulatory discipline
                into every aspect of our operations—from fleet management and driver conduct to
                documentation and cargo handling. Our systems and processes are designed to meet
                audit and inspection requirements, ensuring full transparency, traceability, and
                accountability at all times.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {complianceAreas.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} y={38}>
                  <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
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

          <Reveal y={36} className="mt-8">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
              <p className="text-lg leading-relaxed text-gray-200">
                This compliance-driven approach not only ensures smooth execution of logistics
                operations but also provides our clients with the assurance that their cargo is
                handled in full accordance with applicable laws, industry standards, and best
                practices across all stages of the transportation lifecycle.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-orange-500 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-100">
              HSE & Compliance
            </p>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl">
              Move cargo with safety, discipline, and compliance.
            </h2>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/quote"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-orange-600 shadow-xl shadow-orange-700/20 transition-all hover:bg-orange-50 sm:w-auto sm:hover:scale-105"
              >
                Book Shipment <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/git-insurance"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto sm:hover:scale-105"
              >
                View GIT Insurance
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}