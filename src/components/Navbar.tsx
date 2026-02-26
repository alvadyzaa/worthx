import { Moon, Sun, DollarSign, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

interface NavbarProps {
  setAboutOpen: (v: boolean) => void;
  setDisclaimerOpen: (v: boolean) => void;
  setSupportOpen: (v: boolean) => void;
  setToolsOpen: (v: boolean) => void;
}

export default function Navbar({ setAboutOpen, setDisclaimerOpen, setSupportOpen, setToolsOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <button onClick={() => { setAboutOpen(true); setMobileMenuOpen(false); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
        ABOUT
      </button>
      <button onClick={() => { setDisclaimerOpen(true); setMobileMenuOpen(false); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
        DISCLAIMER
      </button>
      <a href="https://x.com/miegrains" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center justify-center gap-1">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        KEITH
      </a>
      <button onClick={() => { setSupportOpen(true); setMobileMenuOpen(false); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
        SUPPORT
      </button>
      <button onClick={() => { setToolsOpen(true); setMobileMenuOpen(false); }} className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
        TOOLS
      </button>
    </>
  );

  return (
    <nav className="w-full h-20 flex items-center justify-between border-b border-black/5 dark:border-white/[0.05] relative z-20">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-green-400/20 to-transparent border border-green-400/20 flex items-center justify-center font-bold text-xl text-green-500 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
          <DollarSign className="w-5 h-5 fill-current" />
        </div>
        <span className="font-bold tracking-tight text-gray-900 dark:text-white">WorthX</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6 text-[12px] font-semibold tracking-wide text-gray-500 dark:text-white/50">
        <NavLinks />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-white/[0.03] text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-white/[0.03] border border-transparent dark:border-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 overflow-hidden cursor-pointer">
          <img
            src={`https://api.dicebear.com/7.x/notionists/svg?seed=${Math.random().toString(36).substring(7)}&backgroundColor=transparent`}
            alt="Profile"
            className="w-full h-full object-cover p-1"
          />
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-white/5 shadow-xl md:hidden flex flex-col py-4 space-y-4 text-sm font-semibold text-center text-gray-600 dark:text-white/60 animate-in fade-in slide-in-from-top-2 duration-200">
          <NavLinks />
        </div>
      )}
    </nav>
  );
}
