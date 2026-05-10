import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  ArrowRight,
  Droplet,
  Wheat,
  Building2,
  Sprout,
  Container,
  Globe,
  Phone,
} from "lucide-react";
import { useTheme } from "next-themes";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, setTheme } = useTheme();

  const services = [
    {
      name: "Fuel Haulage",
      path: "/services/fuel-haulage",
      icon: Droplet,
      desc: "Safe petroleum transportation for depots, stations, mines, and industries.",
    },
    {
      name: "Agricultural Products",
      path: "/services/agricultural",
      icon: Wheat,
      desc: "Farmgate-to-market movement for grains, cash crops, and agro commodities.",
    },
    {
      name: "Cement & Construction",
      path: "/services/cement",
      icon: Building2,
      desc: "Reliable site delivery for cement, tiles, steel, and project materials.",
    },
    {
      name: "Fertilizer & Industrial",
      path: "/services/fertilizer",
      icon: Sprout,
      desc: "Input logistics for fertilizers, agro-inputs, and production materials.",
    },
    {
      name: "Container Haulage",
      path: "/services/container",
      icon: Container,
      desc: "20ft and 40ft container movement from ports to inland destinations.",
    },
    {
      name: "Cross-Border Haulage",
      path: "/services/cross-border",
      icon: Globe,
      desc: "Regional cargo movement across Ghana and West African corridors.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    closeTimer.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const linkBase = scrolled || mobileMenuOpen ? "text-foreground" : "text-white";
  const mutedText = scrolled || mobileMenuOpen ? "text-muted-foreground" : "text-white/70";

  const desktopNavLink = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-semibold transition-colors duration-300 ${
      isActive ? "text-orange-500" : `${linkBase} hover:text-orange-500`
    }`;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 sm:px-4 pt-3 sm:pt-5">
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "rounded-2xl bg-background/90 shadow-xl backdrop-blur-xl"
            : "rounded-2xl lg:rounded-full bg-slate-950/20 shadow-lg backdrop-blur-md"
        }`}
      >
        <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-600/25">
              <span className="text-lg sm:text-xl font-black text-white">PH</span>
            </div>
            <div>
              <h1 className={`text-lg sm:text-xl font-black leading-none ${linkBase}`}>ProHaul</h1>
              <p className={`mt-1 text-[11px] sm:text-xs leading-none ${mutedText}`}>Logistics Solutions</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={desktopNavLink}>
              Home
            </NavLink>

            <NavLink to="/about" className={desktopNavLink}>
              About Us
            </NavLink>

            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-300 ${
                  servicesOpen ? "text-orange-500" : `${linkBase} hover:text-orange-500`
                }`}
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full w-[min(820px,calc(100vw-2rem))] -translate-x-1/2 pt-3"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <div className="overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl ring-1 ring-black/5 dark:border-white/10 dark:bg-slate-950">
                      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
                        <div className="p-5 xl:p-6">
                          <Link
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="group mb-3 inline-flex items-center gap-2 text-xl font-black text-slate-950 transition-colors hover:text-orange-500 dark:text-white"
                          >
                            All Services
                            <ArrowRight className="h-6 w-6 text-orange-500 transition-transform group-hover:translate-x-1" />
                          </Link>

                          <div className="divide-y divide-slate-200 dark:divide-white/10">
                            {services.map((service) => {
                              const Icon = service.icon;
                              return (
                                <Link
                                  key={service.path}
                                  to={service.path}
                                  onClick={() => setServicesOpen(false)}
                                  className="group flex items-center gap-3 py-2.5 transition-colors hover:text-orange-500"
                                >
                                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10 transition-colors group-hover:bg-orange-500">
                                    <Icon className="h-4 w-4 text-orange-500 transition-colors group-hover:text-white" />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-bold text-slate-950 transition-colors group-hover:text-orange-500 dark:text-white">
                                      {service.name}
                                    </h3>
                                    <p className="mt-0.5 max-w-md truncate text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                      {service.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        <div className="relative min-h-[340px] overflow-hidden bg-slate-950">
                          <img
                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85"
                            alt="ProHaul logistics truck"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/20" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center text-white">
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">ProHaul Services</p>
                            <h2 className="max-w-[260px] text-2xl font-black leading-tight">
                              Find the Right Haulage Solution for You
                            </h2>
                            <Link
                              to="/contact"
                              onClick={() => setServicesOpen(false)}
                              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-orange-500 hover:border-orange-500"
                            >
                              Contact Us <ArrowRight className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/fleet" className={desktopNavLink}>
              Fleet
            </NavLink>

            <NavLink to="/hse" className={desktopNavLink}>
              HSE
            </NavLink>

            <NavLink to="/contact" className={desktopNavLink}>
              Contact
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
                scrolled
                  ? "border-border bg-muted text-foreground hover:bg-accent"
                  : "border-white/25 bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link
              to="/contact"
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-600 hover:scale-105"
            >
              Get Quote
            </Link>
          </div>

          <button
            className={`lg:hidden rounded-xl p-2 transition-colors ${
              scrolled || mobileMenuOpen ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-4 space-y-2 bg-background/95 backdrop-blur-xl rounded-b-2xl">
                <NavLink to="/" className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500" onClick={closeMobileMenu}>
                  Home
                </NavLink>
                <NavLink to="/about" className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500" onClick={closeMobileMenu}>
                  About Us
                </NavLink>

                <div>
                  <button
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-foreground hover:bg-muted"
                    onClick={() => setMobileServicesOpen((open) => !open)}
                  >
                    <span>Services</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-2 rounded-2xl bg-muted/60 p-2">
                          {services.map((service) => {
                            const Icon = service.icon;
                            return (
                              <Link
                                key={service.path}
                                to={service.path}
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-background hover:text-orange-500"
                                onClick={closeMobileMenu}
                              >
                                <Icon className="h-4 w-4 text-orange-500" />
                                {service.name}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <NavLink to="/fleet" className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500" onClick={closeMobileMenu}>
                  Fleet
                </NavLink>
                <NavLink to="/hse" className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500" onClick={closeMobileMenu}>
                  HSE
                </NavLink>
                <NavLink to="/contact" className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500" onClick={closeMobileMenu}>
                  Contact
                </NavLink>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-foreground"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    Theme
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600"
                    onClick={closeMobileMenu}
                  >
                    <Phone className="h-4 w-4" /> Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
