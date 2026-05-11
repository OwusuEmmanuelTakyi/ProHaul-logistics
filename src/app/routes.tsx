import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { FuelHaulage } from "./pages/services/FuelHaulage";
import { Agricultural } from "./pages/services/Agricultural";
import { Cement } from "./pages/services/Cement";
import { Fertilizer } from "./pages/services/Fertilizer";
import { Container } from "./pages/services/Container";
import { CrossBorder } from "./pages/services/CrossBorder";
import { Fleet } from "./pages/Fleet";
import { HSECompliance } from "./pages/HSECompliance";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Quote } from "./pages/Quote";
import { Services } from "./pages/services";
import { ComplianceRegulatory } from "./pages/ComplianceRegulatory";
import { GITInsurance } from "./pages/GITInsurance";
//import {ScrollToTop} from "./components/ScrollToTop";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "services/fuel-haulage", Component: FuelHaulage },
      { path: "services/agricultural", Component: Agricultural },
      { path: "services/cement", Component: Cement },
      { path: "services/fertilizer", Component: Fertilizer },
      { path: "services/container", Component: Container },
      { path: "services/cross-border", Component: CrossBorder },
      { path: "fleet", Component: Fleet },
      {path : "hse-compliance", Component: HSECompliance},
      { path: "contact", Component: Contact },
      { path: "quote", Component: Quote },
      { path: "services", Component: Services },
      {path: "compliance-regulatory", Component: ComplianceRegulatory},
      { path: "git-insurance", Component: GITInsurance},
      { path: "*", Component: NotFound },
    ],
  },
]);
