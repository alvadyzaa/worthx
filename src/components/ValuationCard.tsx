import { motion } from "framer-motion";
import { Check, Download, Share2, TrendingUp, Users, Activity, Award, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";

export interface ValuationData {
  username: string;
  displayName?: string;
  followers: number;
  following: number;
  engagementRate: number;
  verified: boolean;
  tier: string;
  valueUSD: number;
  valueIDR: number;
  profileImageUrl?: string;
}

export default function ValuationCard({ data }: { data: ValuationData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const formatNum = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return new Intl.NumberFormat("en-US").format(Math.floor(num));
  };
  
  const formatIDR = (num: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      // html-to-image bypasses "oklab" parsing issues that html2canvas faces with modern Tailwind v4
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#000000' : '#ffffff',
        filter: (node) => {
          if (node.tagName && node.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
            return false;
          }
          return true;
        }
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `worthx_${data.username.replace('@', '')}.png`;
      a.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Gagal mengunduh gambar. Pastikan browser mendukung Canvas Export.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `My X Account Value!`,
          text: `My X Account ${data.username} is worth ${formatIDR(data.valueIDR)} (${data.tier} Tier)! Check yours at WorthX.`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`My X Account ${data.username} is worth ${formatIDR(data.valueIDR)} (${data.tier} Tier)! Check yours at WorthX.`);
        alert("Copied to clipboard!");
      }
    } catch (err) {
      console.log("Share cancelled or failed", err);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mt-4 px-4 pb-20 md:pb-0"
    >
      <div 
        ref={cardRef}
        className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
      >
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 dark:bg-white/5 blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-0.5 shrink-0">
              <img 
                src={data.profileImageUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${data.username}&backgroundColor=transparent`} 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight leading-none">
                  {data.displayName || data.username.replace('@', '')}
                </h2>
                {data.verified && <Check className="w-4 h-4 text-white bg-blue-500 rounded-full p-0.5 shrink-0" />}
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-white/50 mt-1">{data.username}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:bg-white/10 dark:text-white/80 text-[10px] font-bold uppercase tracking-wider">
                  {data.tier} TIER
                </span>
                {/* Account Age explicitly removed per user request */}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2" data-html2canvas-ignore>
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
            >
              {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2.5 rounded-xl bg-blue-50 dark:bg-white/10 border border-blue-100 dark:border-white/10 hover:bg-blue-100 dark:hover:bg-white/20 transition-colors text-blue-600 dark:text-white disabled:opacity-50"
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Valuation Value */}
        <div className="mt-8 relative z-10 text-left">
          <p className="text-gray-500 dark:text-white/50 text-sm font-semibold mb-1 uppercase tracking-wider">Estimated Account Value</p>
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <h3 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              ${new Intl.NumberFormat("en-US").format(Math.floor(data.valueUSD))}
            </h3>
            <p className="text-xl font-medium text-gray-400 dark:text-white/40 pb-2 mt-2 md:mt-0">
              ~ {formatIDR(data.valueIDR)}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 relative z-10">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-left">
            <div className="flex items-center text-gray-500 dark:text-white/40 mb-2">
              <Users className="w-4 h-4 mr-2 text-blue-500 dark:text-white/50" />
              <span className="text-xs font-semibold uppercase tracking-wider">Followers</span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white/90">{formatNum(data.followers)}</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-left">
            <div className="flex items-center text-gray-500 dark:text-white/40 mb-2">
              <Activity className="w-4 h-4 mr-2 text-rose-500 dark:text-white/50" />
              <span className="text-xs font-semibold uppercase tracking-wider">Engagement</span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white/90">{data.engagementRate.toFixed(2)}%</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-left">
            <div className="flex items-center text-gray-500 dark:text-white/40 mb-2">
              <TrendingUp className="w-4 h-4 mr-2 text-emerald-500 dark:text-white/50" />
              <span className="text-xs font-semibold uppercase tracking-wider">Influence</span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white/90">{formatNum((data.followers * data.engagementRate) / 100)}</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-left">
            <div className="flex items-center text-gray-500 dark:text-white/40 mb-2">
              <Award className="w-4 h-4 mr-2 text-amber-500 dark:text-white/50" />
              <span className="text-xs font-semibold uppercase tracking-wider">Following</span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white/90">{formatNum(data.following)}</p>
          </div>
        </div>

        {/* Watermark for downloaded image */}
        <div className="hidden absolute bottom-4 right-6 opacity-40 font-bold tracking-tight text-xl" data-html2canvas-show>
          WorthX
        </div>
      </div>
    </motion.div>
  );
}
