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
import { HSE } from "./pages/HSE";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Quote } from "./pages/Quote";

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
      { path: "hse", Component: HSE },
      { path: "contact", Component: Contact },
      { path: "quote", Component: Quote },
      { path: "*", Component: NotFound },
    ],
  },
]);
