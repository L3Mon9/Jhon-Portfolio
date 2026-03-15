import React from 'react'
import { motion } from 'framer-motion'

export default function SectionWrapper({ id, isDark, children, className = '' }) {
  return (
    <section id={id} className={`relative z-10 py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
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
      className="mb-16"
    >
      <p className={`font-body text-xs uppercase tracking-[0.3em] mb-3 ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
        // {label}
      </p>
      <h2 className={`font-display font-black text-3xl md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <div className={`mt-4 h-px w-24 ${isDark ? 'bg-gradient-to-r from-neon-blue to-transparent' : 'bg-gradient-to-r from-blue-600 to-transparent'}`} />
    </motion.div>
  )
}
