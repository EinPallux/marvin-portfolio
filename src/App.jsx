import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <ThemeProvider>
      {/* Film grain — GPU-isolated, pointer-events-none */}
      <div className="grain-overlay" aria-hidden="true" />
      {/* Warm cursor orb — desktop only, isolated */}
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
