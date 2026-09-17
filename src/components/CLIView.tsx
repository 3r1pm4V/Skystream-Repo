import React from 'react';
import { Terminal, Command, Check, Copy } from 'lucide-react';

export function CLIView() {
  const commands = [
    { cmd: "skystream init <name>", desc: "Initialize a new repository" },
    { cmd: "skystream add <name>", desc: "Add a new plugin to existing repo" },
    { cmd: "skystream build", desc: "Bundle all plugins for testing" },
    { cmd: "skystream deploy", desc: "Deploy to GitHub Pages / Cloud" },
    { cmd: "skystream test <id>", desc: "Run a plugin in debug mode" },
  ];

  return (
    <div className="flex-1 overflow-auto p-8 lg:p-12 space-y-12 max-w-4xl mx-auto custom-scrollbar">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-white">CLI Reference</h2>
        <p className="text-lg text-white/50 leading-relaxed">
          The SkyStream CLI is the core tool for managing your development workflow.
        </p>
      </div>

      <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-6 py-4 bg-white/[0.03] border-b border-white/5">
          <Terminal className="w-4 h-4 text-white/40" />
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">skystream-cli @2.0.0</span>
          <div className="ml-auto flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
          </div>
        </div>
        <div className="p-8 space-y-6">
          {commands.map((c, i) => (
            <div key={i} className="flex items-center gap-6 group">
              <div className="flex-1 flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.04] transition-all">
                <code className="text-blue-400 font-mono">
                  <span className="text-white/30 mr-3">$</span>
                  {c.cmd}
                </code>
                <span className="text-sm text-white/40 italic">{c.desc}</span>
              </div>
              <button className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Command className="w-4 h-4 text-blue-500" />
            Hot Reloading
          </h4>
          <p className="text-sm text-white/40">The CLI supports watch mode during build for instant feedback on code changes.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h4 className="text-white font-medium flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            Auto-Optimization
          </h4>
          <p className="text-sm text-white/40">Treeshaking and minification are automatically applied during deployment.</p>
        </div>
      </div>
    </div>
  );
}
