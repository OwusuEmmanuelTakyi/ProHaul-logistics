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
  Clock,
  Container as ContainerIcon,
  Droplet,
  FileCheck2,
  Globe,
  MapPin,
  Navigation,
  Package,
  Route,
  Shield,
  Ship,
  Sprout,
  Target,
  TrendingUp,
  Truck,
  Warehouse,
  Wheat,
  Wrench,
  Zap,
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
  agriHero: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1800&q=85",
  agriTrucks: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85",
  grain: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85",
  fuelHero: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1800&q=85",
  fuelTruck: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
  fuelStation: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85",
  cementHero: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=85",
  construction: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=85",
  fertilizerHero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85",
  fertilizer: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=85",
  factory: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=85",
  containerHero: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1800&q=85",
  port: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1200&q=85",
  containers: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=85",
  crossHero: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1800&q=85",
  road: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=85",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=85",
};

type IconType = typeof Truck;

type ServicePageData = {
  breadcrumb: string;
  icon: IconType;
  badge: string;
  title: string;
  highlight: string;
  heroText: string;
  heroImage: string;
  primaryCta: string;
  overviewKicker: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  overviewImage: string;
  floatingTitle: string;
  floatingText: string;
  quickFacts: { icon: IconType; value: string; label: string }[];
  cardsKicker: string;
  cardsTitle: string;
  cardsText: string;
  cards: { icon: IconType; title: string; description: string }[];
  darkKicker: string;
  darkTitle: string;
  darkText: string;
  darkImage: string;
  darkItems: { icon: IconType; title: string; description: string }[];
  assuranceTitle: string;
  assuranceText: string;
  secondaryLink?: string;
  secondaryLabel?: string;
};

export const servicePages = {
  agricultural: {
    breadcrumb: "Agricultural Products",
    icon: Wheat,
    badge: "Agricultural Products & Commodities Haulage",
    title: "Farmgate to market,",
    highlight: "moved reliably.",
    heroText:
      "ProHaul supports the agricultural and agribusiness value chain with reliable transportation of agricultural produce and commodities across farms, aggregation centers, processing facilities, storage depots, and distribution markets.",
    heroImage: IMGS.agriHero,
    primaryCta: "Request Agric Haulage",
    overviewKicker: "Service Overview",
    overviewTitle: "Reliable logistics support for seasonal and year-round commodity flows.",
    overviewParagraphs: [
      "ProHaul provides dedicated support to the agricultural and agribusiness value chain through reliable and efficient transportation of agricultural produce and related commodities across key supply chain nodes.",
      "Our services bridge the gap between farmgate production, aggregation centers, processing facilities, storage depots, and distribution markets, ensuring that goods move seamlessly from origin to end-user markets.",
      "We understand the time-sensitive and quality-sensitive nature of agricultural logistics. Our operations are structured to minimize post-harvest losses, reduce transit delays, and maintain product integrity.",
    ],
    overviewImage: IMGS.agriTrucks,
    floatingTitle: "Farm to market",
    floatingText: "Commodity logistics",
    quickFacts: [
      { icon: Wheat, value: "Grains", label: "Maize, rice, millet, sorghum" },
      { icon: Sprout, value: "Cash Crops", label: "Cocoa, cashew, export crops" },
      { icon: Package, value: "Bulk + Packaged", label: "Processed and raw goods" },
      { icon: Globe, value: "Regional", label: "Ghana and West Africa" },
    ],
    cardsKicker: "Products Transported",
    cardsTitle: "Commodity movement built around care and timing.",
    cardsText: "Our fleet is equipped to handle agricultural goods in bulk, packaged, processed, and semi-processed formats.",
    cards: [
      { icon: Wheat, title: "Grains & Oilseeds", description: "Maize, soya beans, rice, millet, sorghum, and other staple agricultural commodities." },
      { icon: Sprout, title: "Cash Crops", description: "Cocoa, cashew, and other export-oriented agricultural commodities moved with care." },
      { icon: Package, title: "Animal Feed Inputs", description: "Maize bran, soya cake, fishmeal, and other feed-grade raw materials." },
      { icon: Truck, title: "Bulk & Packaged Goods", description: "Processed and semi-processed agricultural goods for local and export markets." },
    ],
    darkKicker: "Value Delivered",
    darkTitle: "Strengthening agricultural supply chains.",
    darkText: "Through reliable haulage capacity, ProHaul helps improve market access for producers and supports the efficient flow of food and raw materials across the region.",
    darkImage: IMGS.grain,
    darkItems: [
      { icon: Clock, title: "Dependable Schedules", description: "Movement schedules aligned with harvest seasons, production cycles, and market demand." },
      { icon: Truck, title: "High-Volume Capacity", description: "Fleet capacity for aggregation, bulk movement, and large-scale producer requirements." },
      { icon: Warehouse, title: "Supply Chain Insight", description: "Operations adapted to seasonal dynamics, storage needs, and product preservation." },
      { icon: Globe, title: "Domestic & Regional Reach", description: "Movement of commodities within Ghana and into key West African markets." },
    ],
    assuranceTitle: "Move your produce with a reliable logistics partner.",
    assuranceText: "From farms and storage depots to markets, processors, warehouses, and export-linked destinations, ProHaul keeps agricultural supply chains moving.",
    secondaryLink: "/services/fertilizer",
    secondaryLabel: "Fertilizer Haulage",
  },
  fuel: {
    breadcrumb: "Fuel Haulage",
    icon: Droplet,
    badge: "Fuel Haulage Services",
    title: "Specialized fuel haulage built around",
    highlight: "safety and compliance.",
    heroText: "ProHaul provides petroleum transportation designed to meet operational, safety, and regulatory requirements for marketers, industrial operators, mining companies, and bulk fuel distributors.",
    heroImage: IMGS.fuelHero,
    primaryCta: "Request Fuel Haulage",
    overviewKicker: "Service Overview",
    overviewTitle: "Safe, compliant, and reliable fuel movement across critical sectors.",
    overviewParagraphs: [
      "ProHaul provides specialized fuel haulage services designed to meet the operational, safety, and regulatory requirements of petroleum marketers, industrial operators, mining companies, and bulk fuel distributors.",
      "Our service model is built around precision, safety, and reliability, ensuring uninterrupted supply across critical sectors.",
      "Fuel transportation operations are executed in strict adherence to applicable safety standards, environmental regulations, and industry best practices.",
    ],
    overviewImage: IMGS.fuelTruck,
    floatingTitle: "27,000L - 54,000L",
    floatingText: "Tanker capacity range",
    quickFacts: [
      { icon: Droplet, value: "PMS, AGO, DPK", label: "Product coverage" },
      { icon: Truck, value: "54,000L", label: "Maximum tanker capacity" },
      { icon: Shield, value: "NPA", label: "Compliance-driven operations" },
      { icon: MapPin, value: "Ghana + W/A", label: "Distribution reach" },
    ],
    cardsKicker: "Scope of Service",
    cardsTitle: "Fuel logistics for depots, customers, stations, and project sites.",
    cardsText: "Our fleet and procedures support different delivery models while protecting product integrity and operational continuity.",
    cards: [
      { icon: Droplet, title: "Product Coverage", description: "Transportation of petrol, diesel, and kerosene with controlled procedures throughout the journey." },
      { icon: Truck, title: "Tanker Configurations", description: "27,000L, 36,000L, 45,000L, and 54,000L options for different fuel volume requirements." },
      { icon: Warehouse, title: "Delivery Models", description: "Depot-to-depot transfers, depot-to-customer deliveries, and direct supply to facilities." },
      { icon: Target, title: "End-User Distribution", description: "Retail filling stations, industrial facilities, commercial sites, mines, and large-scale projects." },
    ],
    darkKicker: "Operational Approach",
    darkTitle: "Every fuel trip is controlled from loading to discharge.",
    darkText: "Fuel haulage requires strict discipline. ProHaul combines planning, inspection, route control, and real-time coordination to protect people, product, and schedules.",
    darkImage: IMGS.fuelStation,
    darkItems: [
      { icon: CheckCircle2, title: "Structured Procedures", description: "Loading and discharge procedures are followed to maintain product integrity and safety." },
      { icon: Route, title: "Route Planning", description: "Transit protocols and route planning help minimize operational risk and avoid delays." },
      { icon: Navigation, title: "Continuous Monitoring", description: "Tanker movement and delivery status are monitored throughout active trips." },
      { icon: Clock, title: "Client Coordination", description: "Delivery schedules are aligned with client demand cycles and operational requirements." },
    ],
    assuranceTitle: "Your trusted fuel logistics partner.",
    assuranceText: "ProHaul delivers safe, efficient, and dependable fuel haulage solutions that support energy distribution and business continuity across the region.",
    secondaryLink: "/services/cross-border",
    secondaryLabel: "Cross-Border Haulage",
  },
  cement: {
    breadcrumb: "Cement & Construction Materials",
    icon: Building2,
    badge: "Cement & Construction Materials Haulage",
    title: "Keeping construction projects",
    highlight: "moving on schedule.",
    heroText: "ProHaul provides dependable haulage services for cement manufacturers, distributors, importers, contractors, and infrastructure projects across Ghana and the region.",
    heroImage: IMGS.cementHero,
    primaryCta: "Request Construction Haulage",
    overviewKicker: "Service Overview",
    overviewTitle: "Reliable construction logistics for urban, peri-urban, and remote project sites.",
    overviewParagraphs: [
      "ProHaul provides specialized and dependable haulage services to cement manufacturers, distributors, importers, and construction companies involved in residential, commercial, and large-scale infrastructure development projects.",
      "The construction sector is highly time-sensitive. Delays in material delivery can directly affect project costs, contractor schedules, and overall delivery milestones.",
      "Our transport solutions are tailored for both urban and remote project sites, with capacity to navigate diverse terrain and delivery conditions while maintaining product integrity.",
    ],
    overviewImage: IMGS.construction,
    floatingTitle: "Up to 80 tonnes",
    floatingText: "Heavy-load capability",
    quickFacts: [
      { icon: Building2, value: "Sites", label: "Direct project delivery" },
      { icon: Package, value: "Bulk Loads", label: "Construction material support" },
      { icon: Clock, value: "Timed", label: "Schedule-focused execution" },
      { icon: MapPin, value: "Nationwide", label: "Site delivery coverage" },
    ],
    cardsKicker: "Materials Covered",
    cardsTitle: "Heavy and essential building materials delivered with discipline.",
    cardsText: "Our construction haulage service supports suppliers, contractors, developers, and project managers with timely material availability.",
    cards: [
      { icon: Package, title: "Bagged Cement", description: "Bulk cement deliveries to construction sites, warehouses, retail depots, and distribution points." },
      { icon: Building2, title: "Tiles & Finishing Materials", description: "Ceramics, porcelain tiles, sanitary ware, decorative finishes, and related project inputs." },
      { icon: Wrench, title: "General Building Materials", description: "Aggregates, roofing materials, steel products, blocks, prefabricated parts, and other inputs." },
      { icon: Truck, title: "Project-Specific Deliveries", description: "Coordinated logistics support for both small developments and large infrastructure works." },
    ],
    darkKicker: "Service Benefits",
    darkTitle: "Construction schedules need reliable logistics support.",
    darkText: "ProHaul helps reduce downtime caused by material shortages through fleet capacity, coordinated dispatch, and reliable turnaround times.",
    darkImage: IMGS.warehouse,
    darkItems: [
      { icon: Truck, title: "Heavy & Bulk Load Capacity", description: "Efficient movement of high-volume construction materials in single or multiple dispatches." },
      { icon: MapPin, title: "Nationwide Site Coverage", description: "Material delivery across urban centers, peri-urban developments, and remote construction zones." },
      { icon: Clock, title: "Reliable Turnaround Times", description: "Scheduling discipline supports tight project timelines and reduces material-related delays." },
      { icon: TrendingUp, title: "Large-Scale Project Support", description: "Coordinated deliveries aligned with phased construction plans and contractor requirements." },
    ],
    assuranceTitle: "Driving infrastructure development.",
    assuranceText: "ProHaul strengthens construction supply chains, improves project efficiency, and ensures essential materials arrive when projects need them most.",
    secondaryLink: "/services/container",
    secondaryLabel: "Container Haulage",
  },
  fertilizer: {
    breadcrumb: "Fertilizer & Industrial Inputs",
    icon: Sprout,
    badge: "Fertilizer & Industrial Inputs Haulage",
    title: "Essential inputs delivered",
    highlight: "where and when needed.",
    heroText: "ProHaul delivers specialized haulage for fertilizers, agro-inputs, and industrial materials that support agricultural productivity and manufacturing operations.",
    heroImage: IMGS.fertilizerHero,
    primaryCta: "Request Input Haulage",
    overviewKicker: "Service Overview",
    overviewTitle: "Careful handling and precise timing for sensitive and high-volume inputs.",
    overviewParagraphs: [
      "ProHaul delivers specialized haulage services for fertilizers and a wide range of industrial inputs essential to agricultural productivity and manufacturing operations.",
      "We support importers, distributors, agro-dealers, and industrial operators by moving critical inputs from ports, factories, and storage facilities to end-users across the country.",
      "Both fertilizers and industrial raw materials require careful handling, strict adherence to safety standards, and precise delivery timing during peak agricultural seasons and production cycles.",
    ],
    overviewImage: IMGS.fertilizer,
    floatingTitle: "Peak-season ready",
    floatingText: "Scalable logistics support",
    quickFacts: [
      { icon: Sprout, value: "NPK/Urea", label: "Fertilizer coverage" },
      { icon: Shield, value: "Safety", label: "Careful handling focus" },
      { icon: Clock, value: "Seasonal", label: "Planting cycle alignment" },
      { icon: Warehouse, value: "Ports/Factories", label: "Pickup origin support" },
    ],
    cardsKicker: "Scope of Coverage",
    cardsTitle: "Input logistics for agriculture, processing, and manufacturing.",
    cardsText: "Our haulage services cover both bulk and packaged consignments for large-scale distribution and targeted delivery needs.",
    cards: [
      { icon: Sprout, title: "Fertilizers", description: "NPK blends, urea, ammonium sulfate, and other soil nutrients in bulk or bagged form." },
      { icon: Package, title: "Agro-Inputs", description: "Crop protection products, soil conditioners, and other input materials for farm productivity." },
      { icon: Warehouse, title: "Industrial Raw Materials", description: "Inputs supporting agro-processing, food production, light manufacturing, and related operations." },
      { icon: Truck, title: "Bulk & Packaged Consignments", description: "Flexible haulage solutions for seasonal demand spikes and regular distribution requirements." },
    ],
    darkKicker: "Operational Focus",
    darkTitle: "Built for safety, precision, and reliability.",
    darkText: "ProHaul maintains high standards of safety, compliance, and efficiency when transporting sensitive, seasonal, and high-volume inputs.",
    darkImage: IMGS.factory,
    darkItems: [
      { icon: Shield, title: "Safety-Conscious Handling", description: "Transportation practices are aligned with regulatory standards and careful material management." },
      { icon: Clock, title: "Production Cycle Timing", description: "Delivery schedules are aligned with planting, production, and distribution cycles." },
      { icon: MapPin, title: "Efficient Distribution Networks", description: "Deliveries support farms, warehouses, aggregation centers, processing plants, and facilities." },
      { icon: TrendingUp, title: "Scalable Logistics Support", description: "Capacity to handle seasonal demand spikes and large-volume movement with consistency." },
    ],
    assuranceTitle: "Supporting agricultural and industrial productivity.",
    assuranceText: "ProHaul ensures essential inputs are delivered where and when they are needed most, contributing to improved yields, efficient production, and sustained economic activity.",
    secondaryLink: "/services/agricultural",
    secondaryLabel: "Agric Haulage",
  },
  container: {
    breadcrumb: "Container Haulage",
    icon: ContainerIcon,
    badge: "Container Haulage Services",
    title: "Seamless container movement from",
    highlight: "port to destination.",
    heroText: "ProHaul supports importers, exporters, and distribution networks with reliable containerized cargo movement from ports to inland destinations.",
    heroImage: IMGS.containerHero,
    primaryCta: "Request Container Haulage",
    overviewKicker: "Service Overview",
    overviewTitle: "Efficient port-to-inland logistics for containerized cargo.",
    overviewParagraphs: [
      "We provide efficient and reliable container haulage services, supporting importers, exporters, and distribution networks with the seamless movement of containerized cargo from ports to inland destinations across Ghana and the West African sub-region.",
      "Our container handling capability is compatible with both 20ft and 40ft containers, enabling flexible logistics solutions for diverse cargo requirements.",
      "With strategic access to major ports and a deep understanding of port logistics and inland corridors, ProHaul ensures containerized goods move efficiently from arrival to final destination.",
    ],
    overviewImage: IMGS.port,
    floatingTitle: "20ft & 40ft",
    floatingText: "Container compatibility",
    quickFacts: [
      { icon: Ship, value: "Port", label: "Pickup and clearance support" },
      { icon: ContainerIcon, value: "20ft/40ft", label: "Container movement" },
      { icon: MapPin, value: "Inland", label: "Destination delivery" },
      { icon: Globe, value: "Trade", label: "Import/export support" },
    ],
    cardsKicker: "Core Capabilities",
    cardsTitle: "Container logistics designed for import, export, and distribution networks.",
    cardsText: "We connect ports, warehouses, factories, project sites, and distribution centers through coordinated container haulage.",
    cards: [
      { icon: Ship, title: "Port Operations", description: "Strategic access to major ports with efficient pickup, dispatch, and delivery coordination." },
      { icon: ContainerIcon, title: "Container Compatibility", description: "Movement of both 20ft and 40ft containers for different cargo requirements." },
      { icon: MapPin, title: "Inland Distribution", description: "Nationwide delivery to warehouses, factories, commercial hubs, and distribution centers." },
      { icon: Globe, title: "Trade Support", description: "Support for importers, exporters, and regional supply chain networks." },
    ],
    darkKicker: "Port-to-Destination Strength",
    darkTitle: "A smoother movement from arrival to final delivery.",
    darkText: "Containerized cargo requires coordination, route planning, documentation awareness, and timely dispatch. ProHaul supports that flow with reliable operational execution.",
    darkImage: IMGS.containers,
    darkItems: [
      { icon: Navigation, title: "Route Coordination", description: "Efficient routing from port terminals to inland destinations and customer locations." },
      { icon: Truck, title: "Equipment Matching", description: "Proper truck and trailer allocation for container movement requirements." },
      { icon: FileCheck2, title: "Documentation Awareness", description: "Operations aligned with port-to-destination logistics and cargo movement requirements." },
      { icon: Clock, title: "Delivery Reliability", description: "Disciplined scheduling helps reduce delays and improve supply chain continuity." },
    ],
    assuranceTitle: "Seamless port-to-destination logistics.",
    assuranceText: "Partner with ProHaul for reliable container haulage that keeps import, export, and distribution supply chains moving efficiently.",
    secondaryLink: "/services/cross-border",
    secondaryLabel: "Cross-Border Haulage",
  },
  crossBorder: {
    breadcrumb: "Cross-Border Haulage",
    icon: Globe,
    badge: "Nationwide & Cross-Border Haulage",
    title: "Cargo movement across Ghana and",
    highlight: "West African corridors.",
    heroText: "ProHaul operates an extensive haulage network spanning Ghana and key trade corridors across the West African sub-region.",
    heroImage: IMGS.crossHero,
    primaryCta: "Request Cross-Border Haulage",
    overviewKicker: "Service Overview",
    overviewTitle: "Coordinated domestic and regional logistics for reliable cargo movement.",
    overviewParagraphs: [
      "ProHaul operates an extensive and well-coordinated haulage network spanning all regions of Ghana and key trade corridors across the West African sub-region.",
      "Our operations are structured to support seamless cargo movement between ports, production centers, industrial hubs, and end-user destinations.",
      "Leveraging deep operational knowledge of regional routes, transit protocols, and customs procedures, we efficiently manage cross-border logistics to ensure timely and compliant delivery of goods.",
    ],
    overviewImage: IMGS.road,
    floatingTitle: "ECOWAS",
    floatingText: "Trade corridor capability",
    quickFacts: [
      { icon: MapPin, value: "Ghana", label: "Nationwide coverage" },
      { icon: Globe, value: "ECOWAS", label: "Regional movement" },
      { icon: Ship, value: "Ports", label: "Port-to-destination logistics" },
      { icon: Route, value: "Corridors", label: "Trade route knowledge" },
    ],
    cardsKicker: "Coverage",
    cardsTitle: "A network built for national distribution and regional trade.",
    cardsText: "Our coverage supports movement from ports, warehouses, production centers, and industrial zones to destinations across Ghana and West Africa.",
    cards: [
      { icon: MapPin, title: "Nationwide Haulage Across Ghana", description: "Reliable distribution across all regions, including remote and high-demand commercial areas." },
      { icon: Globe, title: "Cross-Border Transport Within ECOWAS", description: "Efficient movement of goods across key West African trade routes and regional markets." },
      { icon: Ship, title: "Port-to-Destination Logistics", description: "Seamless delivery from ports to warehouses, factories, project sites, and distribution centers." },
      { icon: FileCheck2, title: "Transit Protocol Awareness", description: "Operational familiarity with documentation requirements, clearance procedures, and corridor dynamics." },
    ],
    darkKicker: "Operational Strength",
    darkTitle: "Regional logistics needs route knowledge and disciplined planning.",
    darkText: "Our familiarity with ECOWAS trade frameworks and corridor dynamics helps minimize delays and optimize transit performance across borders.",
    darkImage: IMGS.map,
    darkItems: [
      { icon: Route, title: "Major Trade Corridors", description: "Strong presence along routes linking Ghana to neighboring countries and commercial centers." },
      { icon: Target, title: "Coordinated Logistics Planning", description: "Planning support for both domestic and regional deliveries across different cargo types." },
      { icon: TrendingUp, title: "High-Volume Capability", description: "Capacity to handle high-volume and time-sensitive cargo movements at scale." },
      { icon: Shield, title: "Compliant Cargo Movement", description: "Operations aligned with customs documentation, transit procedures, and regulatory expectations." },
    ],
    assuranceTitle: "Integrated network for regional trade.",
    assuranceText: "Through our integrated network, ProHaul delivers consistent, reliable, and scalable haulage solutions that support regional trade and business continuity.",
    secondaryLink: "/services/container",
    secondaryLabel: "Container Haulage",
  },
} satisfies Record<string, ServicePageData>;

const serviceProcess = [
  {
    step: "01",
    title: "Request & Planning",
    text: "Client requirements, cargo type, route, schedule, and resource needs are assessed.",
  },
  {
    step: "02",
    title: "Load Coordination",
    text: "Loading arrangements, documentation, equipment allocation, and dispatch checks are coordinated.",
  },
  {
    step: "03",
    title: "Transit & Monitoring",
    text: "Trips are monitored with route visibility, driver coordination, and progress updates.",
  },
  {
    step: "04",
    title: "Delivery & Confirmation",
    text: "Offloading, verification, delivery confirmation, and reporting complete the service cycle.",
  },
];

export function ServicePage({ data }: { data: ServicePageData }) {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "8%"] : ["0%", "24%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.35 : 0]);
  const HeroIcon = data.icon;

  return (
    <div className="w-full overflow-x-hidden bg-background">
      <section ref={heroRef} className="relative min-h-[78svh] lg:min-h-[720px] flex items-center overflow-hidden py-24 text-white">
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={data.heroImage} alt={data.badge} className="absolute inset-0 h-full w-full" />
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
            <Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link>
            <span className="text-gray-500">/</span>
            <span className="text-white">{data.breadcrumb}</span>
          </motion.div>

          <div className="max-w-4xl">
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

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.55rem,12vw,4.8rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              {data.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">{data.highlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              {data.heroText}
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

      <section className="relative z-10 -mt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {data.quickFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <Reveal key={fact.label} delay={index * 0.08} y={30}>
                  <div className="border-b border-r border-border p-5 sm:p-7 last:border-r-0 lg:border-b-0">
                    <Icon className="mb-4 h-7 w-7 text-orange-500" />
                    <div className="text-lg sm:text-2xl font-extrabold text-foreground leading-tight">{fact.value}</div>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-tight">{fact.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealX x={-70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">{data.overviewKicker}</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">{data.overviewTitle}</h2>
              {data.overviewParagraphs.map((paragraph) => (
                <p key={paragraph} className="mb-5 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {data.darkItems.slice(0, 4).map((item) => (
                  <div key={item.title} className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 p-3 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-orange-500" />
                    {item.title}
                  </div>
                ))}
              </div>
            </RevealX>

            <RevealX x={70}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <Img src={data.overviewImage} alt={data.overviewTitle} className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute left-3 bottom-3 sm:-left-6 sm:-bottom-6 rounded-2xl bg-orange-500 p-4 sm:p-6 text-white shadow-xl shadow-orange-500/30">
                  <Truck className="h-7 w-7 mb-3 opacity-90" />
                  <p className="text-xl sm:text-2xl font-extrabold">{data.floatingTitle}</p>
                  <p className="text-xs sm:text-sm text-orange-100">{data.floatingText}</p>
                </div>
                <div className="absolute right-3 top-3 sm:-right-5 sm:-top-5 rounded-2xl border border-white/10 bg-slate-950 p-4 text-white shadow-xl">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    Ghana + West Africa
                  </div>
                </div>
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">{data.cardsKicker}</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">{data.cardsTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{data.cardsText}</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.cards.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} y={42}>
                  <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                      <Icon className="h-6 w-6 text-orange-500 transition-colors group-hover:text-white" />
                    </div>
                    <h3 className="mb-3 font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

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
              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
                <Img src={data.darkImage} alt={data.darkTitle} className="h-full w-full sm:hover:scale-105 transition-transform duration-700" />
              </div>
            </RevealX>

            <RevealX x={70}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-400">{data.darkKicker}</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight">{data.darkTitle}</h2>
              <p className="mb-8 text-gray-400 leading-relaxed">{data.darkText}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.darkItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.07} y={30}>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-orange-400/40 hover:bg-white/10">
                        <Icon className="mb-4 h-7 w-7 text-orange-400" />
                        <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Service Delivery Process</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Clear steps from request to confirmation.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our structured process helps ensure efficiency, visibility, and accountability throughout the logistics chain.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />
            {serviceProcess.map((item, index) => (
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

      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={data.heroImage} alt={data.assuranceTitle} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-orange-700/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-300">ProHaul Logistics Solutions</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">{data.assuranceTitle}</h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-gray-300">{data.assuranceText}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-4 font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:bg-orange-600 sm:hover:scale-105"
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
    </div>
  );
}
