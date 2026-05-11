import { Link } from "react-router";
import fleetVideo from "../../images/fleet.mp4";
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
  Container as ContainerIcon,
  Fuel,
  Gauge,
  Package,
  Settings,
  Truck,
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
  tanker: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85",
  road: "https://i.pinimg.com/1200x/58/9d/c6/589dc6beb7f521cb20b06b800bfd89f8.jpg",
};

const trustedBrands = ["MAN", "DAF", "Volvo", "Scania"];

const fleetCapability = [
  "High-powered prime movers designed for long-distance and heavy-load transport",
  "Configurations suitable for both domestic distribution and cross-border haulage",
  "Reliable performance across varied terrain and road conditions",
  "Continuous fleet renewal to enhance efficiency and reduce downtime",
];

const trailerConfiguration = [
  {
    icon: Fuel,
    title: "Fuel tankers",
    text: "27,000L, 36,000L, 45,000L, and 54,000L capacities for petroleum transport",
  },
  {
    icon: Package,
    title: "Flatbed trailers",
    text: "Configured for general cargo and construction materials, with load capacities of up to 80 tonnes",
  },
  {
    icon: ContainerIcon,
    title: "Container handling capability",
    text: "Compatible with 20ft and 40ft containers for port and inland logistics",
  },
];

const fleetHighlights = [
  { icon: Truck, value: "MAN, DAF, Volvo, and Scania", label: "Trusted European truck brands" },
  { icon: Zap, value: "460HP to 530HP", label: "Truck power range" },
  { icon: Gauge, value: "2,100 Nm to 2,500 Nm", label: "Torque output range" },
  { icon: Settings, value: "27,000L to 54,000L", label: "Fuel tanker capacities" },
];

export function Fleet() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "7%"] : ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.45 : 0]);

  return (
    <div className="w-full overflow-x-hidden bg-background">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[72svh] lg:min-h-[660px] flex items-center overflow-hidden py-24 text-white"
      >
        <motion.div style={{ y: reduceMotion ? "0%" : videoY }} className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover brightness-[1.15] contrast-[1.05] saturate-[1.08]"
          >
            <source src={fleetVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/72 via-slate-950/38 to-slate-950/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
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
              className="text-[clamp(2.7rem,12vw,5.3rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight"
            >
              Fleet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-600">Operational Capacity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              ProHaul operates a modern, high-performance fleet designed to deliver reliability, efficiency, and scalable capacity across a wide range of haulage requirements.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* MAIN TEXT */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch">
            <Reveal y={36}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 shadow-sm">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Fleet & Operational Capacity</p>
                <h2 className="mb-6 text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                  Fleet & Operational Capacity
                </h2>

                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    ProHaul operates a modern, high-performance fleet designed to deliver reliability, efficiency, and scalable capacity across a wide range of haulage requirements. Our fleet strategy is centered on deploying robust, well-maintained equipment capable of supporting both routine and high-demand logistics operations.
                  </p>
                  <p>
                    Our fleet comprises trusted European truck brands. MAN, DAF, Volvo, and Scania. Selected for their durability, fuel efficiency, and proven performance under demanding operating conditions. In line with our long-term growth strategy, the fleet is continually expanded and refreshed with newer models to strengthen operational capacity, improve efficiency, and meet the evolving requirements of our clients.
                  </p>
                  <p>
                    Our trucks are powered within the range of 460HP to 530HP, delivering the strength required for heavy-duty haulage operations. Complementing this is torque output ranging from 2,100 Nm to 2,500 Nm, providing the pulling power necessary to transport high payloads efficiently across long-haul routes and challenging terrains, including gradients and remote corridors.
                  </p>
                </div>
              </div>
            </Reveal>

            <RevealX x={70}>
              <div className="h-full min-h-[340px] overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=85"
                  alt="ProHaul fleet and operational capacity"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </RevealX>
          </div>
        </div>
      </section>

      {/* VISUAL SUPPORT - reduced to two clean images */}
      
      {/* TRUSTED EUROPEAN BRANDS */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Trusted European Truck Brands</p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
              MAN, DAF, Volvo, and Scania.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our fleet comprises trusted European truck brands. MAN, DAF, Volvo, and Scania. Selected for their durability, fuel efficiency, and proven performance under demanding operating conditions.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trustedBrands.map((brand, index) => (
              <Reveal key={brand} delay={index * 0.08} y={38}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 sm:p-8 text-center shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition-all group-hover:bg-orange-500">
                    <Truck className="h-7 w-7 text-orange-500 transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-foreground">{brand}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET CAPABILITY */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Fleet Capability</p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground">Fleet Capability</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fleetCapability.map((item, index) => (
              <Reveal key={item} delay={index * 0.08} y={38}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed text-foreground">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* TRAILER CONFIGURATION */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Trailer Configuration</p>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground">Trailer Configuration</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trailerConfiguration.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.08} y={42}>
                  <div className="group h-full rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-2">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 transition-all group-hover:scale-110">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal y={36}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-10 shadow-2xl">
              <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
                This integrated fleet structure enables ProHaul to match equipment precisely to cargo requirements, ensuring optimal load management, operational efficiency, and consistent delivery performance across all routes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
