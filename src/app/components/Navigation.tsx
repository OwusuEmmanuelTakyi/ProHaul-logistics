import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../images/logo.png";
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
  PackageCheck,
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
    { name: "Bulk Fuel Haulage", path: "/services/fuel-haulage", icon: Droplet },
    { name: "Agricultural Products Haulage", path: "/services/agricultural", icon: Wheat },
    { name: "Cement & Construction Haulage", path: "/services/cement", icon: Building2 },
    { name: "Fertilizer & Industrial Haulage", path: "/services/fertilizer", icon: Sprout },
    { name: "Container Haulage", path: "/services/container", icon: Container },
    { name: "Cross-Border Haulage", path: "/services/cross-border", icon: Globe },
  ];

  const mainLinks = [
    { name: "Home", path: "/", end: true, delay: 0.1 },
    { name: "About Us", path: "/about", delay: 0.15 },
  ];

  const afterServicesLinks = [
  { name: "Fleet", path: "/fleet", delay: 0.25 },
  { name: "HSE & Compliance", path: "/hse-compliance", delay: 0.3 },
  { name: "GIT", path: "/git-insurance", delay: 0.35 },
  { name: "Contact", path: "/contact", delay: 0.4 },
];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative flex items-center gap-0.5 rounded-xl px-3 py-2 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 xl:px-4 ${
      isActive
        ? "text-orange-500"
        : "text-slate-700 hover:text-orange-500 dark:text-slate-200 dark:hover:text-orange-400"
    }`;

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5"
    >
      <motion.div
        layout
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full max-w-7xl overflow-visible bg-white transition-all duration-300 dark:bg-slate-950 ${
          mobileMenuOpen ? "rounded-3xl" : "rounded-full"
        } ${
          scrolled
            ? "shadow-xl shadow-black/10"
            : "border border-slate-100 shadow-md shadow-black/10 dark:border-white/10"
        }`}
      >
        <div className="flex h-[72px] items-center px-4 sm:h-[78px] sm:px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-shrink-0"
          >
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3">
              <motion.div
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md shadow-black/10 dark:border-white/10 dark:shadow-white/5 sm:h-[60px] sm:w-[60px]"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={logo}
                  alt="ProHaul logo"
                  className="h-[85%] w-[85%] object-contain"
                />
              </motion.div>

              <span className="text-[22px] font-black leading-none tracking-tight text-red-600 sm:text-[26px]">
                ProHaul
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {mainLinks.map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.3 }}
              >
                <NavLink to={item.path} end={item.end} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-orange-500 transition-all duration-300 xl:left-4 xl:right-4 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            {/* Services dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className={`group relative flex items-center gap-1 rounded-xl px-3 py-2 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 xl:px-4 ${
                  servicesOpen
                    ? "text-orange-500"
                    : "text-slate-700 hover:text-orange-500 dark:text-slate-200 dark:hover:text-orange-400"
                }`}
              >
                Services
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-orange-500 transition-all duration-300 xl:left-4 xl:right-4 ${
                    servicesOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full w-[820px] -translate-x-1/2 pt-5"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-slate-950 dark:ring-white/10">
                      <div className="grid grid-cols-[1.15fr_0.85fr]">
                        <div className="p-6">
                          <Link
                            to="/services"
                            onClick={() => setServicesOpen(false)}
                            className="group mb-5 inline-flex items-center gap-2 text-xl font-black text-slate-900 transition-colors hover:text-orange-500 dark:text-white"
                          >
                            All Services
                            <ArrowRight className="h-5 w-5 text-orange-500 transition-transform group-hover:translate-x-1" />
                          </Link>

                          <div className="divide-y divide-slate-100 dark:divide-white/10">
                            {services.map((service, i) => {
                              const Icon = service.icon;

                              return (
                                <motion.div
                                  key={service.path}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04, duration: 0.22 }}
                                >
                                  <Link
                                    to={service.path}
                                    onClick={() => setServicesOpen(false)}
                                    className="group flex items-start gap-3 py-3 transition-colors"
                                  >
                                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 transition-colors group-hover:bg-orange-500 dark:bg-orange-500/10">
                                      <Icon className="h-4 w-4 text-orange-500 transition-colors group-hover:text-white" />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="text-sm font-bold text-slate-900 transition-colors group-hover:text-orange-500 dark:text-white">
                                        {service.name}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="relative min-h-[360px] overflow-hidden rounded-r-3xl">
                          <img
                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85"
                            alt="ProHaul truck on highway"
                            className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/10" />

                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-7 text-center text-white">
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-orange-300">
                              ProHaul
                            </p>

                            <h3 className="max-w-[210px] text-xl font-black leading-snug">
                              Find the right haulage solution for your cargo
                            </h3>

                            <Link
                              to="/quote"
                              onClick={() => setServicesOpen(false)}
                              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-orange-500 hover:bg-orange-500"
                            >
                              Book Shipment <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {afterServicesLinks.map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.3 }}
              >
                <NavLink to={item.path} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-orange-500 transition-all duration-300 xl:left-4 xl:right-4 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            <div className="mx-2 h-5 w-px bg-slate-200 dark:bg-white/10" />

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              whileHover={{ scale: 1.08, rotate: theme === "dark" ? -15 : 15 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="ml-1"
            >
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-[13px] font-black uppercase tracking-wide text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-600 hover:shadow-orange-600/40"
              >
                <PackageCheck className="h-3.5 w-3.5" />
                Book Shipment
              </Link>
            </motion.div>
          </nav>

          {/* Mobile controls */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="space-y-1 rounded-b-3xl bg-white px-4 pb-5 pt-2 dark:bg-slate-950">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-orange-50 text-orange-500 dark:bg-orange-500/10"
                        : "text-slate-700 hover:bg-slate-50 hover:text-orange-500 dark:text-slate-300 dark:hover:bg-white/5"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-orange-50 text-orange-500 dark:bg-orange-500/10"
                        : "text-slate-700 hover:bg-slate-50 hover:text-orange-500 dark:text-slate-300 dark:hover:bg-white/5"
                    }`
                  }
                  onClick={closeMobileMenu}
                >
                  About Us
                </NavLink>

                <div>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    Services
                    <motion.div
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 space-y-0.5 rounded-2xl bg-slate-50 p-2 dark:bg-white/5">
                          <Link
                            to="/services"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-black text-orange-500 transition-colors hover:bg-white dark:hover:bg-white/10"
                          >
                            All Services <ArrowRight className="h-3.5 w-3.5" />
                          </Link>

                          {services.map((service) => {
                            const Icon = service.icon;

                            return (
                              <Link
                                key={service.path}
                                to={service.path}
                                onClick={closeMobileMenu}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-white hover:text-orange-500 dark:text-slate-400 dark:hover:bg-white/10"
                              >
                                <Icon className="h-4 w-4 flex-shrink-0 text-orange-500" />
                                <span className="font-semibold">{service.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {afterServicesLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-orange-50 text-orange-500 dark:bg-orange-500/10"
                          : "text-slate-700 hover:bg-slate-50 hover:text-orange-500 dark:text-slate-300 dark:hover:bg-white/5"
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </NavLink>
                ))}

                <div className="border-t border-slate-100 pt-3 dark:border-white/10">
                  <Link
                    to="/quote"
                    onClick={closeMobileMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
                  >
                    <PackageCheck className="h-4 w-4" />
                    Book Shipment
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}