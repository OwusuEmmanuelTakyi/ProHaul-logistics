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
  Building2,
  CheckCircle2,
  Container as ContainerIcon,
  Droplet,
  Globe,
  Sprout,
  Truck,
  Wheat,
} from "lucide-react";

/* ══════════════════════════════════════════
   RESPONSIVE HOOK
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
   TYPEWRITER — types once, no delete, cursor
   disappears the moment typing finishes
══════════════════════════════════════════ */
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

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
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

/* ══════════════════════════════════════════
   LAZY IMAGE
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
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   IMAGE URLS
══════════════════════════════════════════ */
const IMGS = {
  agriHero: "https://i.pinimg.com/1200x/10/c1/bc/10c1bc92ee54ea02c310b4d144dcd1e8.jpg",
  fuelHero: "https://i.pinimg.com/1200x/90/ce/b3/90ceb33207a97dbac732742b7650099f.jpg",
  cementHero: "https://i.pinimg.com/1200x/53/49/a2/5349a2f5ce5b36a4b8ba3132d4ee60c2.jpg",
  fertilizerHero: "https://i.pinimg.com/1200x/50/80/fb/5080fbba66841898078f6bf701f3339b.jpg",
  containerHero: "https://i.pinimg.com/1200x/6d/67/56/6d675621a2eca1098e7631e4ce74c1c8.jpg",
  crossHero: "https://i.pinimg.com/1200x/4c/a2/c5/4ca2c5243d2d5095295abe35e1a9fd4d.jpg",
};

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
type IconType = typeof Truck;

type TextBlock = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type ServicePageData = {
  breadcrumb: string;
  icon: IconType;
  badge: string;
  title: string;
  highlight: string;
  heroText: string;
  heroImage: string;
  primaryCta: string;
  intro: string[];
  sections: TextBlock[];
  closing?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
};

/* ══════════════════════════════════════════
   SERVICE DATA
══════════════════════════════════════════ */
export const servicePages = {
  fuel: {
    breadcrumb: "Fuel Haulage",
    icon: Droplet,
    badge: "Fuel Haulage",
    title: "Fuel haulage services",
    highlight: "built around safety and reliability.",
    heroText:
      "ProHaul provides specialized bulk fuel haulage services designed to meet the operational, safety, and regulatory requirements of petroleum marketers, industrial operators, mining companies, and bulk fuel distributors.",
    heroImage: IMGS.fuelHero,
    primaryCta: "Request Fuel Haulage",
    intro: [
      "ProHaul provides specialized bulk fuel haulage services designed to meet the operational, safety, and regulatory requirements of petroleum marketers, industrial operators, mining companies, and bulk fuel distributors. Our service model is built around precision, safety, and reliability. Ensuring uninterrupted supply across critical sectors.",
      "Our fuel transportation operations are executed in strict adherence to applicable safety standards, environmental regulations, and industry best practices. We maintain disciplined operational controls across the entire delivery lifecycle, ensuring the secure, compliant, and timely movement of petroleum products across Ghana and the West African sub-region.",
    ],
    sections: [
      {
        title: "Scope of Service",
        items: [
          "Product Coverage: Transportation of petrol (PMS), diesel (AGO), and kerosene (DPK)",
          "Tanker Capacity: 27,000L, 36,000L, 45,000L, and 54,000L configurations to meet varying volume requirements",
          "Delivery Models: Depot-to-depot transfers",
          "Delivery Models: Depot-to-customer deliveries",
          "End-User Distribution: Retail filling stations",
          "End-User Distribution: Industrial and commercial facilities",
          "End-User Distribution: Mining and large-scale project sites",
        ],
      },
      {
        title: "Operational Approach",
        items: [
          "Structured loading and discharge procedures to ensure product integrity and safety",
          "Strict adherence to route planning and transit protocols",
          "Continuous monitoring of tanker movement and delivery status",
          "Coordination with client operations teams to align delivery schedules with demand cycles",
        ],
      },
      {
        title: "Key Strengths",
        paragraphs: [
          "Compliance-Driven Operations",
          "Full alignment with petroleum transportation regulations and safety standards, ensuring risk mitigation and regulatory adherence at all stages.",
          "Experienced Personnel",
          "Trained and certified drivers with expertise in handling petroleum products under varying operational conditions.",
          "Reliability & Timeliness",
          "Consistent delivery performance supported by disciplined scheduling and real-time operational monitoring.",
          "Nationwide & Cross-Border Reach",
          "Extensive coverage across Ghana with the capability to support cross-border fuel distribution within the West African sub-region.",
          "Safety-Focused Execution",
          "Implementation of strict safety protocols, including vehicle inspections, driver compliance, and incident prevention measures.",
        ],
      },
    ],
    closing:
      "ProHaul positions itself as a trusted fuel logistics partner, delivering safe, efficient, and dependable haulage solutions that support energy distribution and business continuity across the region.",
    secondaryLink: "/services/cross-border",
    secondaryLabel: "Cross-Border Haulage",
  },

  agricultural: {
    breadcrumb: "Agricultural Products",
    icon: Wheat,
    badge: "Agricultural Haulage",
    title: "Agricultural products and commodities,",
    highlight: "moved reliably.",
    heroText:
      "ProHaul provides dedicated support to the agricultural and agribusiness value chain through reliable and efficient transportation of agricultural produce and related commodities across key supply chain nodes.",
    heroImage: IMGS.agriHero,
    primaryCta: "Request Agric Haulage",
    intro: [
      "ProHaul provides dedicated support to the agricultural and agribusiness value chain through reliable and efficient transportation of agricultural produce and related commodities across key supply chain nodes. Our services are designed to bridge the gap between farmgate production, aggregation centers, processing facilities, storage depots, and distribution markets, ensuring that goods move seamlessly from origin to end-user markets.",
      "We understand the time-sensitive and quality-sensitive nature of agricultural logistics. As such, our operations are structured to minimize post-harvest losses, reduce transit delays, and maintain product integrity throughout the transportation process. Whether dealing with seasonal harvests or year-round commodity flows, we provide dependable haulage solutions tailored to the operational realities of the agricultural sector.",
    ],
    sections: [
      {
        title: "Products Transported",
        paragraphs: ["Our fleet is equipped to handle a wide range of agricultural goods, including:"],
        items: [
          "Grains and oilseeds, such as maize, soya beans, rice, millet, and sorghum",
          "Cash crops, including cocoa, cashew, and other export-oriented agricultural commodities",
          "Animal feed inputs and raw materials, including maize bran, soya cake, fishmeal, and other feed-grade ingredients",
          "Packaged and bulk agricultural commodities, both processed and semi-processed goods intended for local and export markets",
        ],
      },
      {
        title: "Value Delivered",
        paragraphs: ["Our agricultural haulage services are built around reliability, scale, and sector expertise:"],
        items: [
          "Consistent and dependable logistics support, ensuring predictable movement schedules aligned with harvest and production cycles",
          "High-volume transport capacity, enabling aggregation and bulk movement for large-scale producers and trading enterprises",
          "Strong understanding of agro supply chains, allowing us to adapt to seasonal dynamics, storage constraints, and quality preservation requirements",
          "Regional reach supporting domestic and cross-border trade, facilitating movement of commodities within Ghana and into key West African markets",
        ],
      },
    ],
    closing:
      "Through these capabilities, ProHaul plays a critical role in strengthening agricultural supply chains, improving market access for producers, and supporting the efficient flow of food and raw materials across the region.",
    secondaryLink: "/services/fertilizer",
    secondaryLabel: "Fertilizer Haulage",
  },

  cement: {
    breadcrumb: "Cement & Construction Materials",
    icon: Building2,
    badge: "Construction Haulage",
    title: "Construction materials,",
    highlight: "delivered on schedule.",
    heroText:
      "ProHaul provides specialized and dependable haulage services to cement manufacturers, distributors, importers, and construction companies involved in residential, commercial, and large-scale infrastructure development projects.",
    heroImage: IMGS.cementHero,
    primaryCta: "Request Construction Haulage",
    intro: [
      "ProHaul provides specialized and dependable haulage services to cement manufacturers, distributors, importers, and construction companies involved in residential, commercial, and large-scale infrastructure development projects. Our services are designed to support the construction value chain by ensuring that essential building materials are transported safely, efficiently, and delivered in alignment with project timelines and site requirements.",
      "We recognize that the construction sector is highly time-sensitive, where delays in material delivery can directly impact project costs, contractor schedules, and overall delivery milestones. As such, our operations are structured to provide consistent, well-coordinated logistics support that keeps construction activities moving without interruption.",
      "Our transport solutions are tailored for both urban and remote project sites, with the capacity to navigate diverse terrain and delivery conditions while maintaining product integrity and schedule reliability.",
    ],
    sections: [
      {
        title: "Materials Covered",
        paragraphs: ["Our fleet is equipped to handle a wide range of construction-related materials, including:"],
        items: [
          "Bagged cement, including bulk deliveries to construction sites, warehouses, and retail depots",
          "Tiles and finishing materials, such as ceramics, porcelain tiles, sanitary ware, and decorative finishes",
          "General construction inputs and building materials, including aggregates, roofing materials, steel products, blocks, and prefabricated components",
          "Other project-specific materials, supporting both small-scale developments and large infrastructure works",
        ],
      },
      {
        title: "Service Benefits",
        paragraphs: ["Our cement and construction materials haulage service delivers measurable value to contractors, suppliers, and project developers:"],
        items: [
          "Fleet capacity for heavy and bulk loads, enabling efficient movement of high-volume construction materials in single or multiple dispatches",
          "Nationwide site delivery coverage, ensuring materials reach project locations across urban centers, peri-urban developments, and remote construction zones",
          "Reliable turnaround times, supporting tight construction schedules and reducing downtime caused by material shortages",
          "Operational support for large-scale projects, including coordinated deliveries aligned with phased construction plans and contractor requirements",
        ],
      },
    ],
    closing:
      "Through these capabilities, ProHaul plays a vital role in strengthening construction supply chains, improving project efficiency, and ensuring the timely availability of essential materials that drive infrastructure development across Ghana and the wider region.",
    secondaryLink: "/services/container",
    secondaryLabel: "Container Haulage",
  },

  fertilizer: {
    breadcrumb: "Fertilizer & Industrial Inputs",
    icon: Sprout,
    badge: "Fertilizer Haulage",
    title: "Fertilizer and industrial inputs,",
    highlight: "delivered where needed.",
    heroText:
      "ProHaul delivers specialized haulage services for fertilizers and a wide range of industrial inputs that are essential to agricultural productivity and manufacturing operations.",
    heroImage: IMGS.fertilizerHero,
    primaryCta: "Request Input Haulage",
    intro: [
      "ProHaul delivers specialized haulage services for fertilizers and a wide range of industrial inputs that are essential to agricultural productivity and manufacturing operations. Our services are structured to support importers, distributors, agro-dealers, and industrial operators by ensuring that critical inputs move efficiently from ports, factories, and storage facilities to end-users across the country.",
      "We understand that both fertilizers and industrial raw materials require careful handling, strict adherence to safety standards, and precise delivery timing. Particularly during peak agricultural seasons and production cycles. Our operations are therefore designed to minimize delays, prevent product contamination or damage, and ensure seamless distribution across multiple delivery points.",
      "With a strong operational framework and trained personnel, ProHaul maintains high standards of safety, compliance, and efficiency in the transportation of sensitive and high-volume inputs.",
    ],
    sections: [
      {
        title: "Scope of Coverage",
        paragraphs: ["Our haulage services cover a broad range of products, including:"],
        items: [
          "Fertilizers, such as NPK blends, urea, ammonium sulfate, and other soil nutrients distributed in bulk or bagged form",
          "Agro-inputs and industrial raw materials, including crop protection products, soil conditioners, and processing inputs",
          "Manufacturing and production inputs, supporting industries such as agriculture processing, food production, and light manufacturing",
          "Bulk and packaged consignments, tailored to meet both large-scale distribution and targeted delivery needs",
        ],
      },
      {
        title: "Operational Focus",
        paragraphs: ["Our approach to fertilizer and industrial input logistics is centered on safety, precision, and reliability:"],
        items: [
          "Safety-conscious handling and transportation, ensuring compliance with regulatory standards and proper management of sensitive or potentially hazardous materials",
          "Timely delivery aligned with production and planting cycles, helping clients avoid costly disruptions and maintain operational continuity",
          "Efficient distribution networks, enabling deliveries to farms, aggregation centers, warehouses, processing plants, and industrial facilities",
          "Scalable logistics support, capable of handling seasonal demand spikes and large-volume movements with consistency",
        ],
      },
    ],
    closing:
      "Through these capabilities, ProHaul supports the backbone of agricultural and industrial productivity by ensuring that essential inputs are delivered where and when they are needed most, contributing to improved yields, efficient production, and sustained economic activity.",
    secondaryLink: "/services/agricultural",
    secondaryLabel: "Agric Haulage",
  },

  container: {
    breadcrumb: "Container Haulage",
    icon: ContainerIcon,
    badge: "Container Haulage",
    title: "Container haulage,",
    highlight: "from port to destination.",
    heroText:
      "ProHaul supports importers, exporters, and distribution networks with reliable containerized cargo movement from ports to inland destinations.",
    heroImage: IMGS.containerHero,
    primaryCta: "Request Container Haulage",
    intro: [
      "ProHaul supports importers, exporters, and distribution networks with reliable containerized cargo movement from ports to inland destinations.",
      "Container haulage content was not included in the new service-specific text supplied. This section has therefore been kept simple to avoid adding unsupported details.",
    ],
    sections: [
      {
        title: "Core Coverage",
        items: [
          "20ft and 40ft container movement",
          "Port-to-destination logistics",
          "Inland delivery support",
          "Import and export distribution support",
        ],
      },
    ],
    closing:
      "Partner with ProHaul for reliable container haulage that keeps import, export, and distribution supply chains moving efficiently.",
    secondaryLink: "/services/cross-border",
    secondaryLabel: "Cross-Border Haulage",
  },

  crossBorder: {
    breadcrumb: "Nationwide & Cross-Border Haulage",
    icon: Globe,
    badge: "Cross-Border Haulage",
    title: "Cargo movement across Ghana and",
    highlight: "West African corridors.",
    heroText:
      "ProHaul operates an extensive and well-coordinated haulage network spanning all regions of Ghana and key trade corridors across the West African sub-region.",
    heroImage: IMGS.crossHero,
    primaryCta: "Request Cross-Border Haulage",
    intro: [
      "ProHaul operates an extensive and well-coordinated haulage network spanning all regions of Ghana and key trade corridors across the West African sub-region. Our operations are structured to support seamless cargo movement between ports, production centers, industrial hubs, and end-user destinations.",
      "Leveraging deep operational knowledge of regional routes, transit protocols, and customs procedures, we efficiently manage cross-border logistics to ensure timely and compliant delivery of goods. Our familiarity with ECOWAS trade frameworks and corridor dynamics enables us to minimize delays and optimize transit performance across borders.",
    ],
    sections: [
      {
        title: "Coverage",
        items: [
          "Nationwide haulage across Ghana: Reliable distribution across all regions, including remote and high-demand commercial areas",
          "Cross-border transport within ECOWAS markets: Efficient movement of goods across key West African trade routes",
          "Port-to-destination logistics: Seamless delivery from ports to warehouses, factories, project sites, and distribution centers",
        ],
      },
      {
        title: "Operational Strength",
        items: [
          "Strong presence along major trade corridors linking Ghana to neighboring countries",
          "Coordinated logistics planning for both domestic and regional deliveries",
          "Capability to handle high-volume and time-sensitive cargo movements",
        ],
      },
    ],
    closing:
      "Through this integrated network, ProHaul delivers consistent, reliable, and scalable haulage solutions that support regional trade and business continuity.",
    secondaryLink: "/services/container",
    secondaryLabel: "Container Haulage",
  },
} satisfies Record<string, ServicePageData>;

/* ══════════════════════════════════════════
   SECTION CARD
══════════════════════════════════════════ */
function SectionCard({ block, index }: { block: TextBlock; index: number }) {
  return (
    <Reveal delay={index * 0.08} y={34}>
      <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:p-7">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-sm font-black text-orange-500">
          {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="mb-4 text-xl font-extrabold text-foreground">{block.title}</h3>
        {block.paragraphs?.map((paragraph) => (
          <p key={paragraph} className="mb-4 text-sm leading-relaxed text-muted-foreground last:mb-0">
            {paragraph}
          </p>
        ))}
        {block.items ? (
          <div className="mt-5 space-y-3">
            {block.items.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════
   SERVICE PAGE
══════════════════════════════════════════ */
export function ServicePage({ data }: { data: ServicePageData }) {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.45 : 0]);

  const HeroIcon = data.icon;

  /* ── Typewriter chain timing (ms) ──
     line1 = data.title   (plain white)
     line2 = data.highlight (orange gradient)
     Both start after badge fades in (~300ms)
  */
  const TYPE_SPEED = 55;
  const LINE1_START = 350;
  const LINE1_DURATION = data.title.length * TYPE_SPEED;
  const LINE2_START = LINE1_START + LINE1_DURATION + 80;
  const LINE2_DURATION = data.highlight.length * TYPE_SPEED;

  // subtitle + buttons appear after both lines finish
  const subtitleDelay = (LINE2_START + LINE2_DURATION + 120) / 1000;

  return (
    <div className="w-full overflow-x-hidden bg-background">

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[72svh] lg:min-h-[660px] flex items-center overflow-hidden py-24 text-white"
      >
        {/* Parallax background */}
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={data.heroImage} alt={data.badge} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/48 to-slate-950/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 flex flex-wrap items-center gap-2 text-sm"
          >
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link>
            <span className="text-gray-500">/</span>
            <span className="text-white">{data.breadcrumb}</span>
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
                <HeroIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">{data.badge}</span>
            </motion.div>

            {/* ── Line 1: data.title (white) ── */}
            <div className="min-h-[1.0em] text-[clamp(2rem,9vw,4.2rem)] md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white mb-1">
              <Typewriter
                text={data.title}
                startDelay={LINE1_START}
                typeSpeed={TYPE_SPEED}
                className="inline"
              />
            </div>

            {/* ── Line 2: data.highlight (orange gradient) ── */}
            <div className="min-h-[1.1em] text-[clamp(2rem,9vw,4.2rem)] md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
              <Typewriter
                text={data.highlight}
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
              className="mt-2 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              {data.heroText}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: subtitleDelay + 0.15 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/quote"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-500 px-7 py-4 font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 sm:hover:scale-105"
              >
                {data.primaryCta} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-7 py-4 text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
              >
                View All Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════ INTRO ══════════ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal y={36}>
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-sm">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500" />
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                {data.breadcrumb}
              </h2>
              <div className="space-y-5">
                {data.intro.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ SECTIONS ══════════ */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sections.map((block, index) => (
              <SectionCard key={block.title} block={block} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLOSING ══════════ */}
      {data.closing ? (
        <section className="py-16 sm:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal y={36}>
              <div className="rounded-3xl bg-slate-950 p-6 sm:p-8 lg:p-10 text-white shadow-2xl">
                <p className="text-lg sm:text-xl leading-relaxed text-gray-200">{data.closing}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 sm:py-24 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-100">
              ProHaul Logistics Solutions
            </p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              Ready to move your cargo?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-orange-50">
              Request a quote and let ProHaul support your haulage requirements with reliable service delivery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/quote"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-orange-600 shadow-xl shadow-orange-700/20 transition-all hover:bg-orange-50 sm:hover:scale-105"
              >
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
              {data.secondaryLink && data.secondaryLabel ? (
                <Link
                  to={data.secondaryLink}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:hover:scale-105"
                >
                  {data.secondaryLabel}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}