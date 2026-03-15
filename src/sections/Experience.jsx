import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Terminal, ChevronRight } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'

const experiences = [
  {
    role: 'IT / Technical Support / After-Sales Engineer',
    company: 'Rabstream Inc.',
    subtitle: 'Official Philippine Dealer of XTCERA, JINME, and Eighteeth',
    color: '#00d4ff',
    icon: Terminal,
    responsibilities: [
      'Technical support and troubleshooting for hardware and software',
      'Client assistance and system setup and configuration',
      'Email and chat support for customer inquiries',
      'Documentation and technical support reports',
    ]
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    subtitle: 'Remote — Philippines',
    color: '#7b2fff',
    icon: Briefcase,
    responsibilities: [
      'Developed responsive websites using HTML, CSS, JavaScript, and PHP',
      'Designed user-friendly web interfaces for various clients',
      'Delivered websites for small businesses and personal projects',
      'End-to-end project management from design to deployment',
    ]
  },
]

export default function Experience({ isDark }) {
  return (
    <SectionWrapper id="experience" isDark={isDark}>
      <SectionTitle label="Career" title="Work Log" isDark={isDark} />
      <div className="relative">
        <div className={`absolute left-6 top-0 bottom-0 w-px ${isDark ? 'bg-gradient-to-b from-neon-blue via-neon-purple to-transparent' : 'bg-gradient-to-b from-blue-400 via-indigo-400 to-transparent'}`} />
        <div className="space-y-12 pl-16">
          {experiences.map((exp, i) => (
            <motion.div key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="absolute -left-16 top-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${exp.color}20`, border: `2px solid ${exp.color}`, boxShadow: `0 0 16px ${exp.color}40` }}>
                <exp.icon size={14} style={{ color: exp.color }} />
              </div>

              <div className={`rounded-xl p-6 transition-all duration-300 ${isDark ? 'glass-dark hover:border-opacity-60' : 'glass-light hover:shadow-lg'}`}
                style={{ border: `1px solid ${exp.color}25` }}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-display font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                    <p className="font-body text-sm font-bold" style={{ color: exp.color }}>{exp.company}</p>
                    <p className={`font-body text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{exp.subtitle}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-body uppercase tracking-widest ${isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-100 text-green-700 border border-green-200'}`}>
                    Not Active
                  </span>
                </div>

                <div className="space-y-2">
                  {exp.responsibilities.map((r, j) => (
                    <motion.div key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className={`flex items-start gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <ChevronRight size={14} style={{ color: exp.color, flexShrink: 0, marginTop: 2 }} />
                      {r}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
