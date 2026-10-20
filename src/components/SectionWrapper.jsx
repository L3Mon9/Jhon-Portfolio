import React from 'react'
import { motion } from 'framer-motion'

export default function SectionWrapper({ id, isDark, children, className = '' }) {
  return (
    <section id={id} className={`ai-section relative z-10 py-16 sm:py-20 lg:py-24 scroll-mt-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
  )
}

export function SectionTitle({ label, title, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="ai-section-title mb-12 sm:mb-16"
    >
      <p className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-body text-[10px] uppercase tracking-[0.23em] mb-4 ${isDark ? 'border-neon-blue/30 bg-neon-blue/5 text-neon-blue' : 'border-blue-600/25 bg-blue-50 text-blue-700'}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" /> {label}
      </p>
      <h2 className={`font-display font-black text-3xl md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <div className={`mt-5 h-px w-full max-w-sm ${isDark ? 'bg-gradient-to-r from-neon-blue via-neon-purple/50 to-transparent' : 'bg-gradient-to-r from-blue-600 to-transparent'}`} />
    </motion.div>
  )
}
