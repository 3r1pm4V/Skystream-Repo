import React from 'react';
import { Sidebar } from './components/Sidebar';
import { PluginView } from './components/PluginView';
import { GuideView } from './components/GuideView';
import { CLIView } from './components/CLIView';
import { PLUGINS } from './data/plugins';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('plugins');
  const [selectedPluginId, setSelectedPluginId] = React.useState(PLUGINS[0].id);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const selectedPlugin = PLUGINS.find(p => p.id === selectedPluginId) || PLUGINS[0];
  
  const filteredPlugins = PLUGINS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden font-sans">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 rounded-full bg-blue-500 shadow-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed lg:relative z-40 h-full"
          >
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header / Search bar for Plugins tab */}
        {activeTab === 'plugins' && (
          <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search converted plugins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-8">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">Environment</span>
                <span className="text-sm font-medium text-green-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Development Ready
                </span>
              </div>
            </div>
          </header>
        )}

        <div className="flex-1 flex min-w-0">
          {/* Plugin List (Sub-sidebar) */}
          {activeTab === 'plugins' && (
            <div className="w-80 border-r border-white/5 bg-black/10 flex flex-col shrink-0 hidden xl:flex">
              <div className="p-4 border-b border-white/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 px-2">Available Providers</h4>
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                {filteredPlugins.map(plugin => (
                  <button
                    key={plugin.id}
                    onClick={() => setSelectedPluginId(plugin.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl mb-1 transition-all group relative overflow-hidden",
                      selectedPluginId === plugin.id 
                        ? "bg-blue-600/10 text-white" 
                        : "text-white/40 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {selectedPluginId === plugin.id && (
                      <motion.div layoutId="selection-bg" className="absolute inset-0 bg-blue-600/10" />
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/5 p-2 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                        <img src={plugin.icon} alt={plugin.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{plugin.name}</p>
                        <p className="text-[10px] uppercase font-bold text-white/20 tracking-tighter">v{plugin.version} • {plugin.type}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 min-w-0 relative">
            <AnimatePresence mode="wait">
              {activeTab === 'plugins' && (
                <motion.div
                  key="plugins"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <PluginView plugin={selectedPlugin} />
                </motion.div>
              )}
              {activeTab === 'guide' && (
                <motion.div
                  key="guide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <GuideView />
                </motion.div>
              )}
              {activeTab === 'cli' && (
                <motion.div
                  key="cli"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  <CLIView />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Global Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
