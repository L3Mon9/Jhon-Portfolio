import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'

export default function Footer({ isDark }) {
  const navItems = ['About','Services','Tools','Projects','Experience','Contact']

  return (
    <footer className={`relative z-10 border-t ${isDark ? 'border-neon-blue/10 bg-dark-900' : 'border-slate-200 bg-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <div className={`inline-flex items-center gap-2 mb-4`}>
              <div className={`w-10 h-10 flex items-center justify-center border-2 font-display font-black text-sm ${isDark ? 'border-neon-blue text-neon-blue bg-neon-blue/10' : 'border-blue-600 text-blue-600 bg-blue-100'}`}
                style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)' }}>
                JLG
              </div>
              <span className={`font-display font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Jhon Lemon Galin</span>
            </div>
            <p className={`text-sm font-body ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              AI Automation Specialist<br />building the future, one workflow at a time.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className={`font-body text-xs uppercase tracking-widest mb-4 ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map(item => (
                <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className={`text-left font-body text-sm transition-colors ${isDark ? 'text-slate-500 hover:text-neon-blue' : 'text-slate-500 hover:text-blue-600'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className={`font-body text-xs uppercase tracking-widest mb-4 ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>Connect</p>
            <div className="flex gap-3">
              {[
                { icon: Mail, href: 'mailto:galinjhonlemon@gmail.com', label: 'Email' },
                { icon: Github, href: '', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a key={label} href={href} target="_blank" title={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${isDark ? 'bg-white/5 border border-white/10 text-slate-400 hover:border-neon-blue/50 hover:text-neon-blue' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'}`}
                  whileHover={{ scale: 1.1, y: -2 }}>
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <p className={`font-body text-xs ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            © 2026 Jhon Lemon Galin. All rights reserved.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${isDark ? 'bg-neon-blue/10 border border-neon-blue/20 text-neon-blue hover:bg-neon-blue/20' : 'bg-blue-100 border border-blue-200 text-blue-600 hover:bg-blue-200'}`}
            whileHover={{ scale: 1.1, y: -2 }}>
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
