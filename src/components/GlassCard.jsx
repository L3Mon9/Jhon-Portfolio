import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ isDark, children, className = '', hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -6, scale: 1.01 } : {}}
      className={`rounded-xl p-6 transition-all duration-300 relative overflow-hidden ${
        isDark
          ? 'glass-dark hover:border-neon-blue/40 hover:shadow-neon'
          : 'glass-light hover:border-blue-400/40 hover:shadow-lg'
      } ${className}`}
    >
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
