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
  Container,
  Droplet,
  Globe,
  PackageCheck,
  Shield,
  Sprout,
  Truck,
  Wheat,
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
  hero: "https://i.pinimg.com/1200x/23/cf/9a/23cf9a8a0bb3e1ce30940f805e40fe8f.jpg",
  fuel: "https://i.pinimg.com/1200x/90/ce/b3/90ceb33207a97dbac732742b7650099f.jpg",
  agric: "https://i.pinimg.com/1200x/10/c1/bc/10c1bc92ee54ea02c310b4d144dcd1e8.jpg",
  cement: "https://i.pinimg.com/1200x/53/49/a2/5349a2f5ce5b36a4b8ba3132d4ee60c2.jpg",
  fertilizer: "https://i.pinimg.com/736x/20/29/09/202909f3f401d1d0039be58392c39f37.jpg",
  container: "https://i.pinimg.com/1200x/a4/6f/aa/a46faa47b6d9558698b94eb2cf420ebb.jpg",
  crossBorder: "https://i.pinimg.com/1200x/04/19/86/041986f347342287e978ebbedc1dc802.jpg",
};

const services = [
  {
    icon: Droplet,
    title: "Fuel Haulage",
    path: "/services/fuel-haulage",
    image: IMGS.fuel,
    tag: "Petroleum Logistics",
    description:
      "Safe and compliant transportation of petroleum products to depots, service stations, mining sites, industrial facilities, and distribution points.",
    points: ["27,000L to 54,000L tanker capacity", "Safety-led fuel transport", "Route monitoring and delivery visibility"],
  },
  {
    icon: Wheat,
    title: "Agricultural Products",
    path: "/services/agricultural",
    image: IMGS.agric,
    tag: "Agro Commodity Movement",
    description:
      "Reliable haulage support for grains, cash crops, agro-inputs, and farm produce from production areas to markets, warehouses, and processors.",
    points: ["Farmgate-to-market movement", "Bulk and packaged agro goods", "Seasonal logistics support"],
  },
  {
    icon: Building2,
    title: "Cement & Construction",
    path: "/services/cement",
    image: IMGS.cement,
    tag: "Construction Supply Chain",
    description:
      "Efficient transportation of cement, tiles, steel, construction inputs, and project materials to sites and commercial distribution points.",
    points: ["Site delivery support", "Construction material haulage", "Flatbed logistics capability"],
  },
  {
    icon: Sprout,
    title: "Fertilizer & Industrial",
    path: "/services/fertilizer",
    image: IMGS.fertilizer,
    tag: "Inputs & Industrial Goods",
    description:
      "Specialized movement of fertilizers, agro-inputs, industrial materials, and production inputs for agricultural and commercial operations.",
    points: ["Fertilizer transport", "Industrial input movement", "Reliable bulk distribution"],
  },
  {
    icon: Container,
    title: "Container Haulage",
    path: "/services/container",
    image: IMGS.container,
    tag: "Port to Inland Movement",
    description:
      "Container logistics for 20ft and 40ft containers from ports to inland destinations, warehouses, factories, and business locations.",
    points: ["20ft and 40ft containers", "Port-to-inland logistics", "Import and export support"],
  },
  {
    icon: Globe,
    title: "Cross-Border Haulage",
    path: "/services/cross-border",
    image: IMGS.crossBorder,
    tag: "West African Corridors",
    description:
      "Regional cargo movement across Ghana and West African trade routes, with attention to transit documentation, safety, and delivery coordination.",
    points: ["ECOWAS corridor movement", "Regional trade support", "Cross-border cargo coordination"],
  },
];

const strengths = [
  "Modern haulage fleet",
  "GPS tracking and operational visibility",
  "Goods in Transit insurance support",
  "Experienced drivers and operations team",
];

export function Services() {
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
          <Img src={IMGS.hero} alt="ProHaul haulage services" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/20" />
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
            <span className="text-white">Services</span>
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
              <span className="text-sm font-semibold text-orange-200">Our Haulage Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : isMobile ? 34 : 76 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.7rem,12vw,5.5rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              Logistics solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">every cargo need.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              ProHaul provides safe, efficient, and scalable haulage services across Ghana and the West African sub-region.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* SERVICES CARDS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Service Categories</p>
            <h2 className="mb-4 text-3xl md:text-5xl font-extrabold text-foreground">Choose the service that fits your cargo.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Each service is designed to support reliable movement, proper cargo handling, safety compliance, and timely delivery.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.path} delay={index * 0.08} y={46}>
                  <Link
                    to={service.path}
                    className="group block h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-2xl sm:hover:-translate-y-2"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Img src={service.image} alt={service.title} className="h-full w-full transition-transform duration-700 sm:group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/25">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">{service.tag}</p>
                        <h3 className="text-2xl font-black text-white">{service.title}</h3>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

                      <div className="space-y-3">
                        {service.points.map((point) => (
                          <div key={point} className="flex items-start gap-2 text-sm font-medium text-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange-500 transition-all group-hover:gap-3">
                        View Service <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY PROHAUL */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal y={42}>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Why ProHaul?</p>
              <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                Built to move cargo securely, on schedule, and at scale.
              </h2>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                Our service model combines fleet capacity, safety protocols, route knowledge, and operational visibility to support business continuity across key sectors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-orange-500" />
                    <span className="text-sm font-bold text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal y={42} delay={0.12}>
              <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 sm:p-8 text-white shadow-2xl shadow-orange-500/20">
                <PackageCheck className="mb-6 h-12 w-12" />
                <h3 className="mb-4 text-2xl sm:text-3xl font-extrabold">Need a specific haulage solution?</h3>
                <p className="mb-7 text-orange-50 leading-relaxed">
                  Request a quote and share your cargo type, pickup location, destination, volume, and preferred delivery date.
                </p>
                <Link
                  to="/quote"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-orange-600 transition-all hover:bg-orange-50 sm:hover:scale-105"
                >
                  Get a Quote <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28 text-white">
        <div className="absolute inset-0 z-0">
          <Img src={IMGS.crossBorder} alt="ProHaul route network" className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/88 to-orange-700/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal y={44}>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-orange-300">ProHaul Logistics Solutions</p>
            <h2 className="mb-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight">
              We don’t just move goods. We keep businesses moving.
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-base sm:text-xl leading-relaxed text-gray-300">
              Explore our service pages or request a quote for reliable haulage support across Ghana and West Africa.
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
