import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink, Image } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import GlassCard from '../components/GlassCard'
// 🔹 ADDED: Import real screenshots for the project gallery
import n8nWorkflow from '../assets/projects/n8n.png'
import googleSheets from '../assets/projects/google_sheets.png'
import gmailAutomation from '../assets/projects/gmail_n8n.png'

const projects = [
  {
    id: 1,
    title: 'AI Facebook Messenger Automation',
   // 🔹 UPDATED: Added Google Sheets + Email automation explanation
desc: 'AI-powered Facebook Messenger automation built with n8n. Messages are automatically answered using AI, leads are captured and stored in Google Sheets, then an approval workflow sends automated email updates to the client.',
    // 🔹 UPDATED: Added Google Sheets recording and approval system
features: [
  'Automatic Facebook Messenger replies',
  'AI conversation assistant',
  'Lead data automatically stored in Google Sheets',
  'Admin approval workflow',
  'Automated email updates to clients',
  '24/7 automated customer support'
],
    tags: ['n8n', 'OpenAI API', 'Facebook API', 'Webhooks'],
    color: '#00d4ff',
    icon: '🤖',
    // 🔹 UPDATED: Use real automation screenshots instead of mock colors
images: [
  { label: 'n8n Facebook Automation Workflow', src: n8nWorkflow },
  { label: 'Lead Data Stored in Google Sheets', src: googleSheets },
  { label: 'Automated Email Response via Gmail', src: gmailAutomation },
]
  },
  {
    id: 2,
    title: 'Lead Capture Automation System',
    desc: 'A workflow automation system that captures leads from messages or forms and sends them into CRM systems for follow-up and nurturing.',
    features: ['Multi-channel lead capture', 'CRM auto-sync', 'Lead qualification', 'Instant notifications'],
    tags: ['Make.com', 'Zapier', 'API Integrations'],
    color: '#7b2fff',
    icon: '🎯',
    images: [
      { label: 'Pipeline View', color: '#1a0a33' },
      { label: 'CRM Integration', color: '#140822' },
    ]
  },
  {
    id: 3,
    title: 'Business Workflow Automation',
    desc: 'Automation systems that connect multiple applications and automate repetitive business tasks, saving hours of manual work every week.',
    features: ['Multi-app connections', 'Task automation', 'Error handling', 'Monitoring & alerts'],
    tags: ['n8n', 'Webhooks', 'REST APIs'],
    color: '#10a37f',
    icon: '⚙️',
    images: [
      { label: 'Workflow Map', color: '#0a2a1a' },
      { label: 'API Connections', color: '#081f14' },
    ]
  },
]

// 🔹 UPDATED: MockScreenshot now supports real screenshots
// If image.src exists → show the real image
// If no src → fallback to the old mock UI preview

function MockScreenshot({ image, isDark }) {

  // 🔹 NEW: Show real screenshot if available
  if (image.src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <img
          src={image.src} // 🔹 ADDED: display actual project screenshot
          alt={image.label}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  // 🔹 FALLBACK: keep the original mock preview if no image is provided
  return (
    <div className="w-full h-full flex flex-col" style={{ background: image.color }}>

      {/* Top browser bar */}
      <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-white/20'}`}>
        {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}

        <div className="flex-1 mx-4 h-5 rounded bg-white/5 flex items-center px-3">
          <span className="text-white/30 text-xs font-mono">
            workflow.n8n.cloud/webhook/...
          </span>
        </div>
      </div>

      {/* Mock workflow preview */}
      <div className="flex-1 p-6 grid grid-cols-3 gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg p-3 flex flex-col gap-2"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div
              className="w-6 h-6 rounded"
              style={{
                background: `hsl(${i * 60}, 70%, 60%)`,
                opacity: 0.7
              }}
            />

            <div className="h-2 rounded bg-white/20 w-3/4" />
            <div className="h-2 rounded bg-white/10 w-1/2" />

            <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${40 + i * 10}%`,
                  background: `hsl(${i * 60}, 70%, 60%)`,
                  opacity: 0.7
                }}
              />
            </div>
          </div>
        ))}

        {/* Workflow status */}
        <div
          className="col-span-3 rounded-lg p-3 flex gap-3 items-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          <span className="text-white/50 text-xs font-mono">
            {image.label} — Active
          </span>

          <div className="ml-auto flex gap-2">
            {['#00d4ff','#7b2fff','#10a37f'].map(c => (
              <div
                key={c}
                className="w-16 h-2 rounded-full"
                style={{ background: c, opacity: 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

function Modal({ project, onClose, isDark }) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c - 1 + project.images.length) % project.images.length)
  const next = () => setCurrent(c => (c + 1) % project.images.length)

  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(2,4,8,0.92)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-4xl rounded-2xl overflow-hidden ${isDark ? 'glass-dark' : 'bg-white'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${project.color}30` }}>
            <div>
              <span className="font-body text-xs uppercase tracking-widest" style={{ color: project.color }}>// Gallery</span>
              <h3 className={`font-display font-bold text-lg mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
            </div>
            <button onClick={onClose} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}><X size={14} /></button>
          </div>

          <div className="relative h-72 md:h-96">
            <MockScreenshot image={project.images[current]} isDark={isDark} />
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"><ChevronLeft size={18} /></button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"><ChevronRight size={18} /></button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {project.images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i === current ? project.color : 'rgba(255,255,255,0.3)', transform: i === current ? 'scale(1.3)' : 'scale(1)' }} />
              ))}
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-body" style={{ background: `${project.color}20`, border: `1px solid ${project.color}40`, color: project.color }}>
              {project.images[current].label}
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-body" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color }}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects({ isDark }) {
  const [active, setActive] = useState(null)

  return (
    <SectionWrapper id="projects" isDark={isDark}>
      <SectionTitle label="Portfolio" title="Active Projects" isDark={isDark} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => setActive(p)}
            className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${isDark ? 'glass-dark hover:border-opacity-80' : 'glass-light'}`}
            style={{ border: `1px solid ${p.color}20` }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${p.color}60`}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${p.color}20`}
          >
            <div className="h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}10, ${p.color}05)` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-30">{p.icon}</span>
              </div>
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 rounded text-xs font-body" style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}30` }}>Active</span>
                  <div className="flex gap-1">
                    {p.images.map((_, j) => (
                      <div key={j} className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
                        <Image size={10} color={p.color} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-white/20 text-xs font-body flex items-center gap-1">
                  <span>Click to view gallery</span>
                  <ExternalLink size={10} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-5">
              <h3 className={`font-display font-bold text-sm mb-2 group-hover:transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ textShadow: isDark ? `0 0 20px ${p.color}00` : 'none' }}
                onMouseEnter={e => { if (isDark) e.target.style.color = p.color }}
                onMouseLeave={e => { if (isDark) e.target.style.color = 'white' }}>
                {p.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs font-body" style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {active && <Modal project={active} onClose={() => setActive(null)} isDark={isDark} />}
    </SectionWrapper>
  )
}
