import React from 'react'
import { motion } from 'framer-motion'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import GlassCard from '../components/GlassCard'

const toolGroups = [
  {
    category: 'Automation Platforms',
    color: '#00d4ff',
    tools: [
      { name: 'n8n', color: '#ff6b35', level: 70 },
      { name: 'Make.com', color: '#a020f0', level: 50 },
      { name: 'Zapier', color: '#ff4a00', level: 62 },
      { name: 'GoHighLevel', color: '#00c9ff', level: 50 },
    ]
  },
  {
    category: 'AI Tools',
    color: '#10a37f',
    tools: [
      { name: 'OpenAI API', color: '#10a37f', level: 75 },
      { name: 'Prompt Engineering', color: '#00d4ff', level: 60 },
      { name: 'AI Assistants', color: '#7b2fff', level: 50 },
      { name: 'AI Chatbots', color: '#ff2d78', level: 50 },
    ]
  },
  {
    category: 'Automation Tech',
    color: '#7b2fff',
    tools: [
      { name: 'Webhooks', color: '#00d4ff', level: 90 },
      { name: 'REST APIs', color: '#10a37f', level: 60 },
      { name: 'System Integrations', color: '#7b2fff', level: 60 },
      { name: 'Workflow Automation', color: '#ff6b35', level: 80 },
    ]
  },
  {
    category: 'Development',
    color: '#ff6b35',
    tools: [
      { name: 'JavaScript', color: '#f7df1e', level: 82 },
      { name: 'PHP', color: '#7b7fb5', level: 78 },
      { name: 'HTML/CSS', color: '#e34f26', level: 90 },
      { name: 'React.js', color: '#61dafb', level: 80 },
    ]
  },
]

export default function Tools({ isDark }) {
  return (
    <SectionWrapper id="tools" isDark={isDark}>
      <SectionTitle label="Tech Stack" title="Tools & Technologies" isDark={isDark} />
      <div className="grid md:grid-cols-2 gap-6">
        {toolGroups.map((group, gi) => (
          <GlassCard key={group.category} isDark={isDark} delay={gi * 0.1}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: group.color }} />
              <p className="font-body text-xs uppercase tracking-widest" style={{ color: group.color }}>{group.category}</p>
            </div>
            <div className="space-y-4">
              {group.tools.map((tool, ti) => (
                <div key={tool.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`font-body text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{tool.name}</span>
                    <span className="font-body text-xs" style={{ color: tool.color }}>{tool.level}%</span>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-dark-600' : 'bg-slate-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: gi * 0.1 + ti * 0.05, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${tool.color}, ${tool.color}80)`, boxShadow: `0 0 8px ${tool.color}60` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  )
}
