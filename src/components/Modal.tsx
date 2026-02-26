import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl w-full ${maxWidth} overflow-hidden border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
          <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white/90">
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/80 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4"/>
          </button>
        </div>
        <div className="p-6 text-gray-600 dark:text-white/70 space-y-4 text-[15px] leading-relaxed max-h-[80vh] overflow-y-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
