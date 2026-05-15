import { Link } from "react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";

/* ══════════════════════════════════════════
   HOOKS
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
   TYPEWRITER — types once, no delete,
   cursor disappears when done
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
   REVEAL
══════════════════════════════════════════ */
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

/* ══════════════════════════════════════════
   LAZY IMAGE
══════════════════════════════════════════ */
function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-slate-700" />}
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
   DATA
══════════════════════════════════════════ */
const IMGS = {
  hero: "https://i.pinimg.com/736x/88/49/f8/8849f84cf158b18d285188fa373d1ae8.jpg",
  git:  "https://i.pinimg.com/1200x/97/2e/d0/972ed006b3622cb50df25166285e423c.jpg",
};

const clientBenefits = [
  "Financial protection against loss or damage during transit",
  "Coverage for unforeseen incidents beyond operational control",
  "Enhanced risk mitigation across all haulage operations",
  "Confidence in the secure movement of high-value cargo",
];

/* ══════════════════════════════════════════
   TYPEWRITER TIMING
   Line 1: "Cargo Security &"
   Line 2: "Insurance."
══════════════════════════════════════════ */
const TYPE_SPEED     = 55;
const LINE1_TEXT     = "Cargo Security &";
const LINE2_TEXT     = "Insurance.";
const LINE1_START    = 350;
const LINE1_DURATION = LINE1_TEXT.length * TYPE_SPEED;
const LINE2_START    = LINE1_START + LINE1_DURATION + 80;
const LINE2_DURATION = LINE2_TEXT.length * TYPE_SPEED;

export function GITInsurance() {
  const heroRef = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY      = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "7%"] : ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 0.45 : 0]);

  const subtitleDelay = (LINE2_START + LINE2_DURATION + 120) / 1000;

  return (
    <div className="w-full overflow-x-hidden bg-background">

      {/* ══════════ HERO ══════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70svh] items-center overflow-hidden py-24 text-white lg:min-h-[640px]"
      >
        <motion.div style={{ y: reduceMotion ? "0%" : imageY }} className="absolute inset-0 z-0">
          <Img src={IMGS.hero} alt="Cargo Security & Insurance" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/82 via-slate-950/50 to-slate-950/10" />
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
            <Link to="/" className="text-gray-400 transition-colors hover:text-white">Home</Link>
            <span className="text-gray-500">/</span>
            <span className="text-white">Cargo Security & Insurance</span>
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
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-orange-200">Cargo Security & Insurance</span>
            </motion.div>

            {/* ── Line 1: "Cargo Security &" (white) ── */}
            <div className="min-h-[1.0em] text-[clamp(2.7rem,12vw,5.3rem)] md:text-6xl lg:text-7xl font-extrabold leading-[0.98] tracking-tight text-white mb-1">
              <Typewriter
                text={LINE1_TEXT}
                startDelay={LINE1_START}
                typeSpeed={TYPE_SPEED}
                className="inline"
              />
            </div>

            {/* ── Line 2: "Insurance." (orange gradient) ── */}
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
              className="mt-2 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-300"
            >
              All cargo transported under ProHaul operations is covered by a comprehensive Goods in Transit (GIT) insurance policy, ensuring your shipment is protected at every stage.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ══════════ INTRO ══════════ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal y={36}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">
                  <LockKeyhole className="h-7 w-7 text-orange-500" />
                </div>
                <h2 className="mb-6 text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
                  Cargo Security & Insurance
                </h2>
                <div className="space-y-5 leading-relaxed text-muted-foreground">
                  <p>
                    At ProHaul, we recognize that the security of our clients' cargo is paramount. As part of our commitment to risk management and service reliability, all cargo transported under our operations is covered by a comprehensive Goods in Transit (GIT) insurance policy.
                  </p>
                  <p>
                    This policy is underwritten in partnership with one of Ghana's leading insurance providers, ensuring that our clients benefit from strong financial backing and credible claims support.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal y={36} delay={0.08}>
              <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
                <Img src={IMGS.git} alt="Cargo Security and Insurance" className="h-full w-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ CLIENT BENEFITS ══════════ */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">What This Means for Our Clients</p>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-5xl">
              What This Means for Our Clients
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {clientBenefits.map((benefit, index) => (
              <Reveal key={benefit} delay={index * 0.08} y={38}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-orange-400/50 hover:shadow-xl sm:hover:-translate-y-1">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">{benefit}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLOSING ══════════ */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal y={36}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  Our insurance coverage forms an integral part of our broader operational framework, which combines safety protocols, trained personnel, and disciplined haulage execution.
                </p>
                <p>
                  With ProHaul, clients are assured not only of efficient delivery, but also of secured and protected cargo throughout the transportation lifecycle.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}