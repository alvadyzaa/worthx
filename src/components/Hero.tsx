import { Play, Sparkles, Wand2, AtSign, ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { fetchTwitterProfile } from "../services/twitterService";
import ValuationCard, { ValuationData } from "./ValuationCard";

interface HeroProps {
  onOpenValuationModel: () => void;
  onOpenWorthXPro: () => void;
}

export default function Hero({ onOpenValuationModel, onOpenWorthXPro }: HeroProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuationData | null>(null);

  const seededRandom = (seed: string, offset: number = 0) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash) + offset;
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };

  const calculateValuation = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setResult(null);

    try {
      const profile = await fetchTwitterProfile(username);
      
      const followers = profile.followersCount || 0;
      const following = profile.followingCount || 0;
      
      // Use deterministic random based on username
      const cleanUser = profile.username.toLowerCase();
      
      // Calculate derived metrics deterministically so they are always the same for a specific user
      let minEng = 0.1;
      let randEng = 1.5;

      if (followers > 5000000) { // 5M+
        minEng = 3.5;
        randEng = 5.0; // 3.5% to 8.5% -> Elite Guaranteed
      } else if (followers > 1000000) { // 1M+
        minEng = 2.0;
        randEng = 4.0; // 2.0% to 6.0% -> Gold or Elite
      } else if (followers > 100000) { // 100k+
        minEng = 1.0;
        randEng = 3.0; // 1.0% to 4.0% -> Normal to Elite
      } else if (followers > 10000) { // 10k+
        minEng = 0.5;
        randEng = 2.5; // 0.5% to 3.0% -> Bronze to Gold
      } else {
        // Less than 10k followers
        minEng = 0.1;
        randEng = 1.8; // 0.1% to 1.9% -> Bronze to Normal
      }

      if (cleanUser === 'elonmusk' || cleanUser === 'cristiano' || cleanUser === 'mrbeast') {
          minEng = 5.0;
          randEng = 5.0;
      }

      const engagementRate = (seededRandom(cleanUser, 1) * randEng) + minEng;
      
      const verified = profile.isVerified;
      const profileScore = Math.floor(seededRandom(cleanUser, 3) * 100);

      // Value scaling based on follower volume
      let baseValue = 0;
      if (followers <= 1000) {
        baseValue = followers * 0.1;
      } else if (followers <= 10000) {
        baseValue = 100 + ((followers - 1000) * 0.2);
      } else if (followers <= 100000) {
        baseValue = 1900 + ((followers - 10000) * 0.5);
      } else if (followers <= 1000000) {
        baseValue = 46900 + ((followers - 100000) * 1.0);
      } else {
        baseValue = 946900 + ((followers - 1000000) * 2.5);
      }

      const scoreBonus = (profileScore / 100) * (followers * 0.05);
      baseValue += scoreBonus;
      
      if (verified) {
         baseValue += followers > 5000 ? 1000 : 50;
      }

      const followingPenalty = (following > followers && followers > 0) ? (baseValue * 0.1) : 0;
      baseValue -= followingPenalty;

      let tier = "Normal";
      let multiplier = 1.0;
      
      if (engagementRate >= 3.5) { tier = "Elite"; multiplier = 1.8; }
      else if (engagementRate >= 2.0) { tier = "Gold"; multiplier = 1.3; }
      else if (engagementRate >= 1.0) { tier = "Normal"; multiplier = 1.0; }
      else { tier = "Bronze"; multiplier = 0.8; }

      const valueUSD = Math.max(5, baseValue * multiplier);
      const valueIDR = valueUSD * 15500;

      setResult({
        username: `@${profile.username}`,
        displayName: profile.displayName,
        followers,
        following,
        engagementRate,
        verified,
        tier,
        valueUSD,
        valueIDR,
        profileImageUrl: profile.profileImageUrl
      });
    } catch (error) {
       console.error("Valuation failed", error);
       alert("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center w-full mt-10"
    >
      <button className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/[0.05] transition-colors group cursor-pointer mb-8">
        <Play fill="currentColor" className="w-3 h-3 text-gray-400 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors" />
        <span>Introducing WorthX 1.0, the best account valuation model</span>
      </button>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white select-none">
        Discover your <span className="text-gray-600 dark:text-white/90 block sm:inline">X Account Value</span>
      </h1>

      <p className="mt-6 text-[15px] md:text-lg text-gray-500 dark:text-white/50 font-medium max-w-xl mx-auto">
        Calculate estimated price, engagement, and influence.
      </p>

      <div className="w-full max-w-2xl mt-12 mb-8 px-4">
        <div className="relative w-full rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 focus-within:border-blue-500 dark:focus-within:border-white/20 focus-within:ring-1 focus-within:ring-blue-500/20 dark:focus-within:ring-white/20 transition-all flex flex-col p-2 backdrop-blur-sm shadow-xl dark:shadow-2xl">
          <textarea 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                calculateValuation();
              }
            }}
            placeholder="Enter X @username to calculate value..."
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 resize-none outline-none p-3 text-sm md:text-base flex-1 min-h-[80px]"
            disabled={loading}
          />
          
          <div className="flex items-center justify-between p-2 mt-auto border-t border-gray-100 dark:border-white/5 pt-3">
            <div className="flex items-center space-x-2">
              <button onClick={onOpenValuationModel} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-xs font-medium text-gray-600 dark:text-white/70">
                <Wand2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Valuation Model</span>
              </button>
              
              <button onClick={onOpenWorthXPro} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-xs font-medium text-gray-700 dark:text-white/80">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">WorthX Pro</span>
                <span className="text-gray-400 dark:text-white/40 text-[10px]">▼</span>
              </button>

              <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-400 dark:text-white/50 hover:text-gray-600 dark:hover:text-white hidden sm:block">
                <AtSign className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={calculateValuation}
              disabled={loading || !username.trim()}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-white/10 dark:hover:bg-white/20 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center w-10 h-10 shadow-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />}
            </button>
          </div>
        </div>
      </div>

      {result && <ValuationCard data={result} />}

    </motion.div>
  );
}
