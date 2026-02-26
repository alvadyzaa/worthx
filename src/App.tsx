import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { AppModals } from "./components/AppModals";

function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [valuationModelOpen, setValuationModelOpen] = useState(false);
  const [worthXProOpen, setWorthXProOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/worthx123/hits/up")
      .then(res => res.json())
      .then(data => setVisitorCount(data.count))
      .catch(() => setVisitorCount(1));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white bg-grid relative flex flex-col items-center transition-colors duration-300">
      {/* Dimmed top glow effect */}
      <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-gray-200/[0.2] dark:from-white/[0.02] dark:to-transparent to-transparent pointer-events-none transition-colors duration-300" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col min-h-screen">
        <Navbar 
          setAboutOpen={setAboutOpen} 
          setDisclaimerOpen={setDisclaimerOpen} 
          setSupportOpen={setSupportOpen} 
          setToolsOpen={setToolsOpen}
        />
        <main className="flex-1 flex flex-col justify-center pb-20">
          <Hero 
            onOpenValuationModel={() => setValuationModelOpen(true)}
            onOpenWorthXPro={() => setWorthXProOpen(true)}
          />
        </main>
        
        {/* Footer */}
        <footer className="w-full py-6 mt-auto border-t border-black/5 dark:border-white/5 text-center text-xs font-medium text-gray-500 dark:text-white/40 group">
           <p>
             WorthX for Entertainment Only. <span className="mx-2 text-gray-300 dark:text-white/20">•</span> 
             Visitors: <span className="font-bold text-gray-900 dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md ml-1">{visitorCount !== null ? new Intl.NumberFormat().format(visitorCount) : "..."}</span>
           </p>
        </footer>
      </div>

      <AppModals 
        aboutOpen={aboutOpen} setAboutOpen={setAboutOpen}
        disclaimerOpen={disclaimerOpen} setDisclaimerOpen={setDisclaimerOpen}
        supportOpen={supportOpen} setSupportOpen={setSupportOpen}
        toolsOpen={toolsOpen} setToolsOpen={setToolsOpen}
        valuationModelOpen={valuationModelOpen} setValuationModelOpen={setValuationModelOpen}
        worthXProOpen={worthXProOpen} setWorthXProOpen={setWorthXProOpen}
      />
    </div>
  );
}

export default App;
