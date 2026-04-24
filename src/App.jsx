import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ClientsBand from "./components/ClientsBand";
import About from "./components/About";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Work from "./components/Work";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import ProjectDetail from "./components/ProjectDetail";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <ThemeProvider>
      <div className="grain-overlay" aria-hidden="true" />
      <CursorGlow />

      {activeProject ? (
        <ProjectDetail
          project={activeProject}
          onBack={() => { setActiveProject(null); setTimeout(() => { document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }, 50); }}
          onNavigate={setActiveProject}
        />
      ) : (
        <>
          <Nav />
          <main>
            <Hero />
            <ClientsBand />
            <About />
            <Skills />
            <Gallery />
            <Work onOpen={setActiveProject} />
          </main>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}