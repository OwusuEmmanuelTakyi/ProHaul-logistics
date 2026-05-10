import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">PH</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ProHaul</h3>
                <p className="text-xs text-muted-foreground">Logistics Solutions</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Reliable bulk haulage services across Ghana and West Africa. Moving your cargo securely, on schedule, and at scale.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Fleet & Operations
                </Link>
              </li>
              <li>
                <Link to="/hse" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Health & Safety
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/fuel-haulage" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Fuel Haulage
                </Link>
              </li>
              <li>
                <Link to="/services/agricultural" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Agricultural Products
                </Link>
              </li>
              <li>
                <Link to="/services/cement" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Cement & Construction
                </Link>
              </li>
              <li>
                <Link to="/services/fertilizer" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Fertilizer & Industrial
                </Link>
              </li>
              <li>
                <Link to="/services/container" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Container Haulage
                </Link>
              </li>
              <li>
                <Link to="/services/cross-border" className="text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                  Cross-Border Haulage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Accra, Ghana
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  +233 XX XXX XXXX
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  info@prohaul.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ProHaul. All rights reserved. | We don't just move goods - we keep businesses moving!
          </p>
        </div>
      </div>
    </footer>
  );
}
