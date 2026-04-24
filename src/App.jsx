import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import StatsBand from "./components/StatsBand";
import About from "./components/About";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Work from "./components/Work";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  return (
    <ThemeProvider>
      <div className="grain-overlay" aria-hidden="true" />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <StatsBand />
        <About />
        <Skills />
        <Gallery />
        <Work />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
