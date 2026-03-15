import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Code2, Cpu } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import GlassCard from '../components/GlassCard'

const capabilities = ['AI Automation','Workflow Automation','Chatbot Development','API Integration','Lead Generation Automation','CRM Automation','Business Process Automation','System Integration']
const stack = ['JavaScript','PHP','HTML','CSS','React.js']

export default function About({ isDark }) {
  return (
    <SectionWrapper id="about" isDark={isDark}>
      <SectionTitle label="System Profile" title="About Me" isDark={isDark} />
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <GlassCard isDark={isDark} delay={0.1}>
            <p className={`font-body text-xs uppercase tracking-widest mb-1 ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>// Bio</p>
            <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              I am an AI Automation Specialist focused on building intelligent automation systems that help businesses streamline operations, automate conversations, capture leads, and reduce manual work.
            </p>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              I design smart workflows that connect different applications and services using automation platforms and AI tools. My work focuses on helping businesses improve efficiency through automated processes, chatbot systems, and system integrations.
            </p>
            <div className={`mt-6 pt-6 border-t ${isDark ? 'border-neon-blue/10' : 'border-blue-100'} space-y-3`}>
              {[
                { icon: MapPin, text: 'Philippines', color: isDark ? 'text-neon-cyan' : 'text-blue-500' },
                { icon: Mail, text: 'galinjhonlemon@gmail.com', color: isDark ? 'text-neon-blue' : 'text-blue-600' },
                { icon: Phone, text: '09708784802', color: isDark ? 'text-neon-purple' : 'text-indigo-500' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className={`flex items-center gap-3 font-body text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Icon size={14} className={color} />
                  {text}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard isDark={isDark} delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={16} className={isDark ? 'text-neon-blue' : 'text-blue-600'} />
              <p className={`font-body text-xs uppercase tracking-widest ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>Core Capabilities</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap, i) => (
                <motion.span key={cap}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-body uppercase tracking-wide transition-all ${
                    isDark ? 'bg-neon-blue/10 border border-neon-blue/20 text-neon-cyan hover:bg-neon-blue/20' : 'bg-blue-100 border border-blue-200 text-blue-700 hover:bg-blue-200'
                  }`}>
                  {cap}
                </motion.span>
              ))}
            </div>
          </GlassCard>

          <GlassCard isDark={isDark} delay={0.3}>
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={16} className={isDark ? 'text-neon-purple' : 'text-indigo-500'} />
              <p className={`font-body text-xs uppercase tracking-widest ${isDark ? 'text-neon-purple' : 'text-indigo-500'}`}>Development Stack</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {stack.map((tech, i) => (
                <motion.div key={tech}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm ${
                    isDark ? 'bg-neon-purple/10 border border-neon-purple/20 text-slate-300' : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-neon-purple' : 'bg-indigo-500'}`} />
                  {tech}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  )
}
