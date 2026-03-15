import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Zap } from 'lucide-react'
// 🔹 ADDED: Import logo image
import logo from '../assets/profile.png'
const navItems = ['About', 'Services', 'Tools', 'Projects', 'Experience', 'Contact']

export default function Navbar({ isDark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'glass-dark shadow-neon py-3'
              : 'glass-light shadow-lg py-3'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-9 h-9 flex items-center justify-center border-2 ${isDark ? 'border-neon-blue bg-neon-blue/10' : 'border-blue-600 bg-blue-600/10'} relative`}
              style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)' }}>
              <span className={`font-display font-black text-sm ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>JLG</span>
            </div>
          
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-4 py-2 font-body text-xs uppercase tracking-widest transition-all duration-300 relative group ${
                  isDark ? 'text-slate-400 hover:text-neon-blue' : 'text-slate-600 hover:text-blue-600'
                }`}
                whileHover={{ y: -2 }}
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${isDark ? 'bg-neon-blue' : 'bg-blue-600'}`} />
              </motion.button>
            ))}
          </div>

          {/* Right: Theme + Mobile */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                isDark ? 'bg-neon-blue/10 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20' : 'bg-blue-100 border border-blue-300 text-blue-600 hover:bg-blue-200'
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>
            <button
              className={`md:hidden w-10 h-10 flex items-center justify-center ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-16 left-4 right-4 z-40 rounded-lg p-4 ${isDark ? 'glass-dark' : 'glass-light'}`}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`block w-full text-left px-4 py-3 font-body text-sm uppercase tracking-widest transition-colors ${
                  isDark ? 'text-slate-400 hover:text-neon-blue border-b border-neon-blue/10' : 'text-slate-600 hover:text-blue-600 border-b border-blue-100'
                }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
