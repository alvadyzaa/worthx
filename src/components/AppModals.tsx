import Modal from "./Modal";
import { Info, AlertTriangle, Heart, Wrench, ExternalLink, Check, Wand2, Sparkles } from "lucide-react";

interface ModalsProps {
  aboutOpen: boolean;
  setAboutOpen: (v: boolean) => void;
  disclaimerOpen: boolean;
  setDisclaimerOpen: (v: boolean) => void;
  supportOpen: boolean;
  setSupportOpen: (v: boolean) => void;
  toolsOpen: boolean;
  setToolsOpen: (v: boolean) => void;
  valuationModelOpen: boolean;
  setValuationModelOpen: (v: boolean) => void;
  worthXProOpen: boolean;
  setWorthXProOpen: (v: boolean) => void;
}

export function AppModals({
  aboutOpen, setAboutOpen,
  disclaimerOpen, setDisclaimerOpen,
  supportOpen, setSupportOpen,
  toolsOpen, setToolsOpen,
  valuationModelOpen, setValuationModelOpen,
  worthXProOpen, setWorthXProOpen
}: ModalsProps) {

  return (
    <>
      <Modal isOpen={valuationModelOpen} onClose={() => setValuationModelOpen(false)} title={<><Wand2 className="w-5 h-5 text-purple-500"/> Valuation Model</>}>
        <p>
          Our <strong>Valuation Model</strong> uses a weighted algorithm to determine the estimated price of your X account.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Followers:</strong> Base value multiplier.</li>
          <li><strong>Engagement Rate:</strong> Highly affects the final multiplier (Bronze to Elite tiers).</li>
          <li><strong>Account Age & Verification:</strong> Adds flat bonus points to trust and value.</li>
        </ul>
        <p className="mt-4 text-xs text-gray-400 dark:text-white/40 italic">
          Note: This model is experimental and designed for entertainment.
        </p>
      </Modal>

      <Modal isOpen={worthXProOpen} onClose={() => setWorthXProOpen(false)} title={<><Sparkles className="w-5 h-5 text-blue-500"/> WorthX Pro</>}>
        <p>
          <strong>WorthX Pro</strong> is our upcoming premium tier designed for serious creators and agencies.
        </p>
        <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 mt-4 space-y-2">
          <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Historical tracking</p>
          <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Competitor analysis</p>
          <p className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Audience demographics</p>
        </div>
        <p className="mt-4 font-semibold text-center text-blue-500">Coming Soon!</p>
      </Modal>

      <Modal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} title={<><Info className="w-5 h-5 text-blue-500"/> About WorthX</>}>
        <p>
          <strong>WorthX</strong> is a fun, experimental tool designed to calculate an estimated "value" and "influence score" of X (Twitter) accounts. 
        </p>
        <p>
          <strong>How it works:</strong><br />
          We look at public metrics like your follower count, engagement rate, following ratio, and account age to assign a mock USD/IDR valuation.
        </p>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mt-4 mb-2">Understanding Tiers</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-amber-600">Bronze:</strong> Engagement rate &lt; 1.0%.</li>
            <li><strong className="text-gray-400">Normal:</strong> Standard engagement (1.0% - 2.0%).</li>
            <li><strong className="text-yellow-500">Gold:</strong> High engagement (2.0% - 3.5%). Value multiplier x1.3.</li>
            <li><strong className="text-purple-500">Elite:</strong> Viral engagement (&gt; 3.5%). Value multiplier x1.8.</li>
          </ul>
        </div>
      </Modal>

      <Modal isOpen={disclaimerOpen} onClose={() => setDisclaimerOpen(false)} title={<><AlertTriangle className="w-5 h-5 text-amber-500"/> Disclaimer</>}>
        <p>
          This tool is <strong className="text-gray-900 dark:text-white">not officially affiliated, associated, authorized, endorsed by, or in any way officially connected with X Corp (Twitter).</strong>
        </p>
        <p>
          The generated prices and valuations are <strong className="text-red-500">NOT OFFICIAL</strong> and should <strong className="text-red-500">NOT be used for actual buying or selling of accounts.</strong> It is simply an algorithmic simulation generated for fun and entertainment purposes.
        </p>
        <p>
          We do not store your data. We respect your privacy.
        </p>
      </Modal>

      <Modal isOpen={supportOpen} onClose={() => setSupportOpen(false)} title={<><Heart className="w-5 h-5 text-red-500"/> Traktir Kopi ☕</>}>
        <p className="text-center">
          Suka pakai WorthX? Traktir saya kopi biar tetap semangat ngembangin tools gratis kayak gini! 🙏
        </p>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex justify-center">
          <img 
            src="https://i.postimg.cc/MGrDPbcc/Whats-App-Image-2026-02-04-at-15-37-29.jpg" 
            alt="Scan QR untuk donasi" 
            className="w-full max-w-[240px] rounded-lg shadow-sm" 
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="text-xs text-center text-gray-400 dark:text-gray-500">
          Scan QR code di atas untuk traktir ☕
        </p>
      </Modal>

      <Modal isOpen={toolsOpen} onClose={() => setToolsOpen(false)} title={<><Wrench className="w-5 h-5 text-blue-500"/> Other Tools</>}>
        <div className="space-y-3">
          <a href="https://shadowbanchecker.pages.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 group transition-colors">
            <div className="flex items-center gap-3">
              <Wrench className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-amber-500 transition-colors" />
              <div>
                <span className="font-semibold block text-gray-900 dark:text-white/90">ShadowCheck</span>
                <span className="text-xs text-gray-400 dark:text-white/50">Twitter Shadowban & Visibility Checker</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-white/80 transition-colors" />
          </a>
          <a
            href="https://aestheticgen.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30 hover:shadow-md transition-all group"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">AestheticGen</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Generate aesthetic usernames & display names</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors flex-shrink-0" />
          </a>
          <a
            href="https://x-hunter.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-cyan-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 hover:shadow-md transition-all group"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">X-Hunter</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Brainstorming ideas & content strategy</p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
          </a>
        </div>
      </Modal>
    </>
  );
}
