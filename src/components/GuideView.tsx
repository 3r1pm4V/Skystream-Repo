import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Code2, Rocket, Globe } from 'lucide-react';

export function GuideView() {
  const steps = [
    {
      title: "1. Setup Environment",
      icon: Code2,
      content: "Ensure you have Node.js v18+ installed. SkyStream plugins are built using modern TypeScript for best developer experience and performance.",
      code: "npm install -g skystream-cli"
    },
    {
      title: "2. Initialize Repository",
      icon: Globe,
      content: "A repository is a collection of plugins. Use the CLI to scaffold a new one with your preferred naming convention.",
      code: 'skystream init "my-repo" --package-name com.h0dev.repo --author "h0dev"'
    },
    {
      title: "3. Implement Scraper",
      icon: BookOpen,
      content: "Write your scraping logic in src/index.ts. Use the manifest.baseUrl to handle dynamic mirror switching automatically.",
      code: "export default class MyProvider extends SkyStream.Provider { ... }"
    },
    {
      title: "4. Build & Deploy",
      icon: Rocket,
      content: "Compile your TypeScript source into optimized JavaScript using the built-in esbuild-powered deployment command.",
      code: "skystream deploy -u https://h0dev.github.io/my-repo"
    }
  ];

  return (
    <div className="flex-1 overflow-auto p-8 lg:p-12 space-y-12 max-w-5xl mx-auto custom-scrollbar">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-white">Developer Guide</h2>
        <p className="text-lg text-white/50 leading-relaxed max-w-3xl">
          Learn how to build and port providers to the SkyStream ecosystem. This guide is tailored for developers transitioning from CloudStream 3 architectures.
        </p>
      </div>

      <div className="grid gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 flex gap-8 items-start group hover:bg-white/[0.05] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <step.icon className="w-6 h-6" />
            </div>
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-white/50 leading-relaxed">{step.content}</p>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-blue-300 border border-white/5">
                <span className="text-white/30 mr-2">$</span>
                {step.code}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 space-y-4">
        <h3 className="text-xl font-semibold text-white">Best Practices</h3>
        <ul className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Always use SDK helpers for HTML parsing
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Avoid hardcoded mirror URLs
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Implement robust error handling
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Leverage Common Extractors
          </li>
        </ul>
      </div>
    </div>
  );
}
