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
    {
      name: "Fuel Haulage",
      path: "/services/fuel-haulage",
      icon: Droplet,
    },
    {
      name: "Agricultural Products",
      path: "/services/agricultural",
      icon: Wheat,
    },
    {
      name: "Cement & Construction",
      path: "/services/cement",
      icon: Building2,
    },
    {
      name: "Fertilizer & Industrial",
      path: "/services/fertilizer",
      icon: Sprout,
    },
    {
      name: "Container Haulage",
      path: "/services/container",
      icon: Container,
    },
    {
      name: "Cross-Border Haulage",
      path: "/services/cross-border",
      icon: Globe,
      
    },
  ];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Fleet", path: "/fleet" },
    { name: "HSE", path: "/hse" },
    { name: "Contact", path: "/contact" },
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
    `group relative px-1 py-2 text-sm font-semibold transition-colors duration-300 ${
      isActive ? "text-orange-500" : `${linkBase} hover:text-orange-500`
    }`;

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-5"
    >
      <motion.div
        layout
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? "rounded-2xl bg-background/90 shadow-xl backdrop-blur-xl"
            : "rounded-2xl bg-slate-950/20 shadow-lg backdrop-blur-md lg:rounded-full"
        }`}
      >
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-7 xl:px-8">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-600/25 sm:h-12 sm:w-12">
                <span className="text-lg font-black text-white sm:text-xl">PH</span>
              </div>
              <div>
                <h1 className={`text-lg font-black leading-none sm:text-xl ${linkBase}`}>ProHaul</h1>
                <p className={`mt-1 text-[11px] leading-none sm:text-xs ${mutedText}`}>Logistics Solutions</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden items-center justify-center gap-8 lg:flex xl:gap-10 2xl:gap-12">
            {navItems.slice(0, 2).map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.05, duration: 0.35 }}
              >
                <NavLink to={item.path} className={desktopNavLink}>
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-orange-500 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            {/* Services Mega Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.35 }}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                className={`group relative flex items-center gap-1 px-1 py-2 text-sm font-semibold transition-colors duration-300 ${
                  servicesOpen ? "text-orange-500" : `${linkBase} hover:text-orange-500`
                }`}
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-orange-500 transition-all duration-300 ${
                    servicesOpen ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
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
                    <div className="overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-950 dark:ring-white/10">
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
                            {services.map((service, index) => {
                              const Icon = service.icon;
                              return (
                                <motion.div
                                  key={service.path}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.035, duration: 0.25 }}
                                >
                                  <Link
                                    to={service.path}
                                    onClick={() => setServicesOpen(false)}
                                    className="group flex items-center gap-3 py-2.5 transition-colors hover:text-orange-500"
                                  >
                                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange-500/10 transition-colors group-hover:bg-orange-500">
                                      <Icon className="h-4 w-4 text-orange-500 transition-colors group-hover:text-white" />
                                    </div>
                                    <div className="min-w-0">
                                      <h3 className="text-sm font-bold text-slate-950 transition-colors group-hover:text-orange-500 dark:text-white">
                                        {service.name}
                                      </h3>
                                      <p className="mt-0.5 max-w-md truncate text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        {service.desc}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="relative min-h-[340px] overflow-hidden bg-slate-950">
                          <img
                            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=85"
                            alt="ProHaul logistics truck"
                            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/20" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center text-white">
                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-300">ProHaul Services</p>
                            <h2 className="max-w-[260px] text-2xl font-black leading-tight">
                              Find the Right Haulage Solution for You
                            </h2>
                            <Link
                              to="/quote"
                              onClick={() => setServicesOpen(false)}
                              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-orange-500 hover:bg-orange-500"
                            >
                              Get Quote <ArrowRight className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {navItems.slice(2).map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.35 }}
              >
                <NavLink to={item.path} className={desktopNavLink}>
                  {({ isActive }) => (
                    <>
                      <span>{item.name}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-orange-500 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center justify-end gap-3 lg:flex">
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.48, duration: 0.35 }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-600"
              >
                <PackageCheck className="h-4 w-4" />
                Get Quote
              </Link>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.54, duration: 0.35 }}
              whileHover={{ scale: 1.08, rotate: theme === "dark" ? -10 : 10 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                scrolled ? "bg-muted text-foreground hover:bg-accent" : "bg-white/10 text-white hover:bg-white/20"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`justify-self-end rounded-xl p-2 transition-colors lg:hidden ${
              scrolled || mobileMenuOpen ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="rounded-b-2xl bg-background/95 px-4 py-4 backdrop-blur-xl">
                <div className="space-y-2">
                  {navItems.slice(0, 2).map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </NavLink>
                  ))}

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

                  {navItems.slice(2).map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="block rounded-xl px-3 py-3 text-foreground hover:bg-muted hover:text-orange-500"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-3 space-y-3 border-t border-border pt-3">
                  <Link
                    to="/quote"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600"
                    onClick={closeMobileMenu}
                  >
                    <PackageCheck className="h-4 w-4" />
                    Get a Quote
                  </Link>

                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    Toggle Theme
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
