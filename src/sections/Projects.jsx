import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink, Image } from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'

// ── Real screenshots ──────────────────────────────────────────

import n8nWorkflow     from '../assets/projects/facebook/n8n.png'
import googleSheets    from '../assets/projects/facebook/google_sheets.png'
import gmailAutomation from '../assets/projects/facebook/gmail_n8n.png'
import googleDrive     from '../assets/projects/gdrive.png' 
import n8ngoogle     from '../assets/projects/n8n_google.png' // nandito pa rin sa labas
import aiLeadQualification from '../assets/projects/N8n_projects/AiQualifications.png'

// ── Website project screenshot ──
// Palitan mo lang ito ng actual screenshot ng Mend site.
// Ilagay yung image file sa: src/assets/projects/websites/mend.png
import mendScreenshot from '../assets/projects/websites/Mend1.png'

// ── Projects Data ─────────────────────────────────────────────
const projects = [
  // ─── n8n ──────────────────────────────────────────────────
  {
    id: 1,
    category: 'n8n',
    title: 'AI Facebook Messenger Automation',
    desc: 'AI-powered Facebook Messenger automation built with n8n. Messages are automatically answered using AI, leads are captured and stored in Google Sheets, then an approval workflow sends automated email updates to the client.',
    features: [
      'Automatic Facebook Messenger replies',
      'AI conversation assistant',
      'Lead data stored in Google Sheets',
      'Admin approval workflow',
      'Automated email updates to clients',
      '24/7 automated customer support',
    ],
    tags: ['n8n', 'OpenAI API', 'Facebook API', 'Webhooks'],
    color: '#00d4ff',
    icon: '🤖',
    images: [
      { label: 'n8n Automation Workflow',       src: n8nWorkflow },
      { label: 'Lead Data in Google Sheets',     src: googleSheets },
      { label: 'Automated Gmail Response',       src: gmailAutomation },
    ],
  },
  {
    id: 2,
    category: 'n8n',
    title: 'Automated Short-Form Video Content Engine',
    desc: 'Fully automated video pipeline using n8n. A scheduled trigger searches, downloads, processes via HTTP API, and re-uploads short-form videos to Google Drive — TikTok & Instagram ready.',
    features: [
      'Scheduled auto-trigger',
      'Google Drive search & download',
      'HTTP API video processing (Creatomate)',
      'Auto file re-upload to Drive',
      'TikTok & Instagram ready output',
      'Zero manual intervention',
    ],
    tags: ['n8n', 'Google Drive API', 'HTTP Request', 'JavaScript'],
    color: '#00d4ff',
    icon: '🎬',
    images: [
      { label: 'n8n Video Automation Workflow', src: n8ngoogle },
      { label: 'Google Drive Output Files',      src: googleDrive },
    ],
  },
  {
    id: 8,
    category: 'n8n',
    title: 'AI Lead Qualification & Appointment System',
    desc: 'An intelligent n8n workflow that captures form submissions, uses AI to score and classify each lead, stores the results in Google Sheets, and automatically follows up with qualified prospects. A connected Calendly workflow updates the booking status and sends appointment confirmations.',
    features: [
      'Captures new leads from an online form',
      'Cleans and prepares submitted lead information',
      'Uses AI to score and classify leads as Hot, Warm, or Cold',
      'Generates a personalized response for each prospect',
      'Stores lead details and qualification results in Google Sheets',
      'Sends an automatic email when a lead meets the qualification rules',
      'Detects new Calendly appointments and updates the matching lead record',
      'Sends an appointment confirmation email after booking',
    ],
    tags: ['n8n', 'OpenRouter AI', 'Google Sheets', 'Calendly', 'Gmail'],
    color: '#00d4ff',
    icon: '🧠',
    images: [
      { label: 'AI Lead Qualification and Appointment Workflow', src: aiLeadQualification },
    ],
  },
  // ─── Go High Level ────────────────────────────────────────
  {
    id: 3,
    category: 'gohighlevel',
    title: 'Lead Capture & Nurture Automation',
    desc: 'A Go High Level workflow that captures leads from messages or forms and automatically nurtures them through CRM pipelines with instant follow-up sequences.',
    features: [
      'Multi-channel lead capture',
      'CRM pipeline auto-sync',
      'Lead qualification scoring',
      'Instant SMS & email notifications',
      'Automated follow-up sequences',
      'Appointment booking integration',
    ],
    tags: ['Go High Level', 'CRM', 'SMS Automation', 'Email Sequences'],
    color: '#f97316',
    icon: '🎯',
    images: [
      { label: 'CRM Pipeline View', color: '#1a0800' },
      { label: 'Lead Nurture Flow', color: '#120600' },
    ],
  },
  {
    id: 4,
    category: 'gohighlevel',
    title: 'Appointment Booking Automation',
    desc: 'Automated appointment booking system on Go High Level that confirms, reminds, and follows up with clients — reducing no-shows and manual scheduling effort.',
    features: [
      'Auto-confirm bookings via SMS/email',
      'Reminder sequences before appointments',
      'No-show follow-up automation',
      'Calendar sync integration',
      'Post-appointment review requests',
    ],
    tags: ['Go High Level', 'Calendar API', 'SMS', 'Email'],
    color: '#f97316',
    icon: '📅',
    images: [
      { label: 'Booking Workflow',  color: '#1a0800' },
      { label: 'Reminder Sequence', color: '#120600' },
    ],
  },
  // ─── Zapier ───────────────────────────────────────────────
  {
    id: 5,
    category: 'zapier',
    title: 'Business Workflow Automation',
    desc: 'Automation systems built with Zapier that connect multiple applications and automate repetitive business tasks, saving hours of manual work every week.',
    features: [
      'Multi-app connections',
      'Automated task routing',
      'Error handling & alerts',
      'Real-time monitoring',
      'Custom webhook triggers',
    ],
    tags: ['Zapier', 'Webhooks', 'REST APIs', 'Multi-app'],
    color: '#ff4a00',
    icon: '⚡',
    images: [
      { label: 'Zapier Workflow Map', color: '#1a0800' },
      { label: 'API Connections',     color: '#110500' },
    ],
  },
  {
    id: 6,
    category: 'zapier',
    title: 'E-Commerce Order Notification System',
    desc: 'Zapier automation that listens for new orders and instantly notifies the team via Slack, updates a Google Sheet tracker, and sends a confirmation email to the customer.',
    features: [
      'New order trigger (Shopify/WooCommerce)',
      'Instant Slack team notification',
      'Google Sheets order tracker update',
      'Automated customer confirmation email',
      'Error fallback alerts',
    ],
    tags: ['Zapier', 'Shopify', 'Slack', 'Google Sheets'],
    color: '#ff4a00',
    icon: '🛒',
    images: [
      { label: 'Order Notification Flow', color: '#1a0800' },
      { label: 'Sheets Tracker Update',   color: '#110500' },
    ],
  },
  // ─── Website Projects ─────────────────────────────────────
  // Dito mo ilalagay yung mga website (di-automation) projects mo.
  {
    id: 7,
    category: 'website',
    title: 'Mend — Healing Platform',
    desc: 'A web application login/portal built for Mend, a healing-focused platform. Deployed live on Vercel.',
    features: [
      'Responsive login/portal UI',
      'Deployed on Vercel',
    ],
    tags: ['React', 'Web App'],
    color: '#10a37f',
    icon: '🌐',
    link: 'https://mend-healing.vercel.app/login', // ── live site URL, ginagawa itong clickable sa card ──
    images: [
      // Palitan mo yung mendScreenshot import sa taas ng path ng actual screenshot mo
      { label: 'Mend Login Page', src: mendScreenshot },
    ],
  },
]

const CATEGORIES = [
  { key: 'all',         label: 'All Projects',  color: '#ffffff' },
  { key: 'n8n',         label: 'n8n',           color: '#00d4ff' },
  { key: 'gohighlevel', label: 'Go High Level', color: '#f97316' },
  { key: 'zapier',      label: 'Zapier',        color: '#ff4a00' },
  { key: 'website',     label: 'Websites',      color: '#10a37f' },
]

// ── MockScreenshot ────────────────────────────────────────────
function MockScreenshot({ image, isDark }) {
  if (image.src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <img src={image.src} alt={image.label} className="w-full h-full object-contain" />
      </div>
    )
  }
  return (
    <div className="w-full h-full flex flex-col" style={{ background: image.color || '#0a0a0f' }}>
      <div className={`flex items-center gap-2 px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-white/20'}`}>
        {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
          <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
        <div className="flex-1 mx-2 sm:mx-4 h-5 rounded bg-white/5 flex items-center px-3">
          <span className="text-white/30 text-xs font-mono truncate">workflow.automation.cloud/...</span>
        </div>
      </div>
      <div className="flex-1 p-3 sm:p-6 grid grid-cols-3 gap-2 sm:gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg p-2 sm:p-3 flex flex-col gap-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="w-5 h-5 rounded" style={{ background: `hsl(${i * 60}, 70%, 60%)`, opacity: 0.7 }} />
            <div className="h-2 rounded bg-white/20 w-3/4" />
            <div className="h-2 rounded bg-white/10 w-1/2" />
          </div>
        ))}
        <div
          className="col-span-3 rounded-lg p-2 sm:p-3 flex gap-2 sm:gap-3 items-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="text-white/50 text-xs font-mono truncate">{image.label} — Active</span>
        </div>
      </div>
    </div>
  )
}

// ── Modal ─────────────────────────────────────────────────────
function Modal({ project, onClose, isDark }) {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c - 1 + project.images.length) % project.images.length)
  const next = () => setCurrent(c => (c + 1) % project.images.length)

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: 'rgba(2,4,8,0.92)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 40 }}
          className={`w-full sm:max-w-4xl rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[95vh] overflow-y-auto ${isDark ? 'glass-dark' : 'bg-white'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-10" style={{ borderBottom: `1px solid ${project.color}30`, background: isDark ? 'rgba(10,12,20,0.95)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' }}>
            <div>
              <span className="font-body text-xs uppercase tracking-widest" style={{ color: project.color }}>// Gallery</span>
              <h3 className={`font-display font-bold text-base sm:text-lg mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full transition-colors ml-3 ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
            >
              <X size={14} />
            </button>
          </div>

          {/* Image viewer */}
          <div className="relative h-52 sm:h-72 md:h-96">
            <MockScreenshot image={project.images[current]} isDark={isDark} />
            <button onClick={prev} className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {project.images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i === current ? project.color : 'rgba(255,255,255,0.3)', transform: i === current ? 'scale(1.3)' : 'scale(1)' }} />
              ))}
            </div>
            <div className="absolute top-3 left-3 px-2 sm:px-3 py-1 rounded-full text-xs font-body max-w-[60%] truncate" style={{ background: `${project.color}20`, border: `1px solid ${project.color}40`, color: project.color }}>
              {project.images[current].label}
            </div>
          </div>

          {/* Tags + Features */}
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-body" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-xs uppercase tracking-widest mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Features</p>
              <ul className="space-y-1">
                {project.features.map(f => (
                  <li key={f} className={`text-xs flex items-start gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <span className="flex-shrink-0 mt-0.5" style={{ color: project.color }}>▸</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function Projects({ isDark }) {
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter)

  return (
    <SectionWrapper id="projects" isDark={isDark}>
      <SectionTitle label="Portfolio" title="Active Projects" isDark={isDark} />

      {/* ── Filter Tabs — scrollable on mobile ── */}
      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map(cat => {
          const isActive = filter === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-body transition-all duration-200 flex-shrink-0"
              style={{
                background: isActive ? `${cat.color}20` : 'transparent',
                border:     `1px solid ${isActive ? cat.color : 'rgba(255,255,255,0.15)'}`,
                color:      isActive ? cat.color : (isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)'),
              }}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* ── Project Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            onClick={() => p.link ? window.open(p.link, '_blank', 'noopener,noreferrer') : setActive(p)}
            className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group ${isDark ? 'glass-dark' : 'glass-light'}`}
            style={{ border: `1px solid ${p.color}20` }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${p.color}60`}
            onMouseLeave={e => e.currentTarget.style.borderColor = `${p.color}20`}
          >
            {/* Card image */}
            <div className="h-36 sm:h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}10, ${p.color}05)` }}>
              {p.images[0].src ? (
                <img
                  src={p.images[0].src}
                  alt={p.images[0].label}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl opacity-20">{p.icon}</span>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span
                    className="px-2 py-1 rounded text-xs font-body backdrop-blur-sm"
                    style={{ background: `${p.color}25`, color: p.color, border: `1px solid ${p.color}40` }}
                  >
                    {CATEGORIES.find(c => c.key === p.category)?.label}
                  </span>
                  <div className="flex gap-1">
                    {p.images.map((_, j) => (
                      <div key={j} className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <Image size={10} color={p.color} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-white/40 text-xs font-body flex items-center gap-1">
                  <span>{p.link ? 'Visit Website' : 'Tap to view gallery'}</span>
                  <ExternalLink size={10} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Card body */}
            <div className="p-4 sm:p-5">
              <h3
                className={`font-display font-bold text-sm mb-2 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}
                onMouseEnter={e => { if (isDark) e.target.style.color = p.color }}
                onMouseLeave={e => { if (isDark) e.target.style.color = 'white' }}
              >
                {p.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {p.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs font-body" style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>
                    {tag}
                  </span>
                ))}
                {p.tags.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-xs font-body" style={{ background: `${p.color}10`, color: p.color, border: `1px solid ${p.color}20` }}>
                    +{p.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {active && <Modal project={active} onClose={() => setActive(null)} isDark={isDark} />}
    </SectionWrapper>
  )
}