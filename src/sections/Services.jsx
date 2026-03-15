import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Workflow, Target, HeadphonesIcon, Cog } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import GlassCard from '../components/GlassCard'

const services = [
  { icon: Bot, title: 'AI Chatbot Development', desc: 'Custom AI-powered chatbots that handle customer inquiries, capture leads, and provide 24/7 automated support.', color: '#00d4ff', tag: '01' },
  { icon: Workflow, title: 'Workflow Automation', desc: 'Design and build automated workflows that connect your apps and eliminate repetitive manual tasks.', color: '#7b2fff', tag: '02' },
  { icon: Target, title: 'Lead Automation Systems', desc: 'Automated systems to capture, qualify, and route leads from multiple channels directly into your CRM.', color: '#10a37f', tag: '03' },
  { icon: HeadphonesIcon, title: 'Customer Support Automation', desc: 'AI-driven support systems that respond instantly to customer inquiries across multiple platforms.', color: '#ff6b35', tag: '04' },
  { icon: Cog, title: 'Business Process Automation', desc: 'End-to-end process automation to optimize operations and improve business efficiency.', color: '#a020f0', tag: '05' },
]

export default function Services({ isDark }) {
  return (
    <SectionWrapper id="services" isDark={isDark}>
      <SectionTitle label="What I Do" title="Automation Services" isDark={isDark} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <GlassCard key={s.title} isDark={isDark} delay={i * 0.1} className="group">
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <span className={`font-display text-4xl font-black opacity-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>{s.tag}</span>
            </div>
            <h3 className={`font-display font-bold text-base mb-3 group-hover:transition-colors ${isDark ? 'text-white group-hover:text-neon-blue' : 'text-slate-900 group-hover:text-blue-600'}`}>{s.title}</h3>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{s.desc}</p>
            <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  )
}
