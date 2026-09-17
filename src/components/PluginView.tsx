import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, User, History, ShieldCheck } from 'lucide-react';
import { PluginData } from '../types';
import { CodeViewer } from './CodeViewer';
import { cn } from '../lib/utils';

interface PluginViewProps {
  plugin: PluginData;
}

export function PluginView({ plugin }: PluginViewProps) {
  const [activeFile, setActiveFile] = React.useState(plugin.files[0]);

  return (
    <div className="flex-1 overflow-auto p-8 lg:p-12 space-y-12 max-w-6xl mx-auto custom-scrollbar">
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 p-4 flex items-center justify-center shrink-0 shadow-2xl">
          <img src={plugin.icon} alt={plugin.name} className="w-full h-full object-contain opacity-80" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-4xl font-bold text-white tracking-tight">{plugin.name}</h2>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              v{plugin.version}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs font-bold uppercase tracking-wider border border-white/10">
              {plugin.type}
            </span>
          </div>
          <p className="text-lg text-white/60 leading-relaxed max-w-3xl">
            {plugin.description}
          </p>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/40">
              <User className="w-4 h-4" />
              <span>Author: <span className="text-white/70 font-medium">{plugin.author}</span></span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Build</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-xl font-semibold text-white">Rebuilt Source Files</h3>
          <div className="flex gap-2">
            {plugin.files.map((file) => (
              <button
                key={file.name}
                onClick={() => setActiveFile(file)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeFile.name === file.name 
                    ? "bg-white/10 text-white shadow-inner" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeFile.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CodeViewer code={activeFile.content} language={activeFile.language} />
        </motion.div>
      </section>

      <section className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 space-y-6">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-semibold text-white">Conversion Logic Note</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed text-white/50">
          <div className="space-y-4">
            <p>
              The original <code className="text-blue-400">.cs3</code> source logic used Kotlin-based <code className="text-white/80">MainAPI</code> patterns. We have mapped these to the SkyStream <code className="text-white/80">SkyStream.Provider</code> class architecture.
            </p>
            <p>
              Key mapping: <code className="text-white/80">mainUrl</code> → <code className="text-white/80">manifest.baseUrl</code>, <code className="text-white/80">search()</code> → <code className="text-white/80">search()</code>, <code className="text-white/80">load()</code> → <code className="text-white/80">load()</code>.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              SkyStream's native SDK helpers are utilized for optimized extraction, replacing the need for complex manual Regex in the original source.
            </p>
            <p>
              Added support for dynamic mirror switching via the <code className="text-blue-400">domains</code> array in <code className="text-white/80">plugin.json</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
