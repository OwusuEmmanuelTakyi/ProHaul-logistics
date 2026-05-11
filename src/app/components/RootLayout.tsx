import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}