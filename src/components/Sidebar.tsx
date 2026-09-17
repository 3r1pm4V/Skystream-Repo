import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Terminal, HelpCircle, ChevronRight, Github } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'plugins', label: 'Converted Plugins', icon: Package },
    { id: 'guide', label: 'Developer Guide', icon: HelpCircle },
    { id: 'cli', label: 'CLI Tools', icon: Terminal },
  ];

  return (
    <div className="w-72 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col h-full">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight">SkyStream</h1>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Plugin Hub</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                activeTab === item.id 
                  ? "bg-white/10 text-white shadow-inner shadow-white/5" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                activeTab === item.id ? "scale-110" : "group-hover:scale-110"
              )} />
              {item.label}
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <a 
          href="https://github.com/akashdh11/skystream-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all group"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">Source Tools</span>
          <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
