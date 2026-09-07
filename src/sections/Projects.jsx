import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Images,
  Cpu,
  Activity,
  Layers3,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  CheckCircle2,
} from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'

// ── Real screenshots ──────────────────────────────────────────

import n8nWorkflow     from '../assets/projects/facebook/n8n.png'
import googleSheets    from '../assets/projects/facebook/google_sheets.png'
import gmailAutomation from '../assets/projects/facebook/gmail_n8n.png'
import googleDrive     from '../assets/projects/gdrive.png' 
import n8ngoogle     from '../assets/projects/n8n_google.png' // nandito pa rin sa labas
import aiLeadQualification from '../assets/projects/N8n_projects/AiQualifications.png'
import aiJobs1 from '../assets/projects/jobscraper/aijobs1.png'
import aiJobs2 from '../assets/projects/jobscraper/aijobs2.png'
// ── Website project screenshot ──
// Palitan mo lang ito ng actual screenshot ng Mend site.
// Ilagay yung image file sa: src/assets/projects/websites/mend.png
import mendScreenshot from '../assets/projects/websites/Mend1.png'
import messenger from '../assets/projects/autoreply/messenger_fb.png'

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
      { label: 'Facebook Messenger',             src: messenger },
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
  },{
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
  {
  id: 9,
  category: 'n8n',
  title: 'AI-Powered Dental Messenger Receptionist & Booking Automation',

  desc: 'A hybrid AI receptionist built with n8n that automatically handles Facebook Messenger inquiries for dental clinics. It classifies patient messages, provides controlled replies for common and sensitive concerns, uses AI for flexible multilingual questions, sends personalized booking forms, stores appointment requests in Google Sheets, and notifies clinic staff through email.',

  features: [
    'Receives and processes patient inquiries from Facebook Messenger',
    'Classifies messages into services, pricing, clinic information, booking, rescheduling, urgent concerns, and human assistance',
    'Uses controlled responses for predictable and sensitive dental inquiries',
    'Uses Google Gemini AI for flexible or unclassified questions',
    'Understands and responds in English, Tagalog, and other supported languages',
    'Provides safe responses for urgent dental concerns without giving medical diagnoses',
    'Escalates conversations to clinic staff when human assistance is requested',
    'Retrieves the patient’s Messenger profile information',
    'Generates a personalized Jotform appointment link',
    'Captures the Messenger name and sender ID through hidden form fields',
    'Automatically saves appointment requests to Google Sheets',
    'Assigns a unique booking ID and Pending booking status',
    'Notifies clinic staff by email when a new booking request is submitted',
  ],

  tags: [
    'n8n',
    'Meta Messenger API',
    'Google Gemini',
    'Jotform',
    'Google Sheets',
    'Gmail',
    'Webhooks',
    'REST API',
  ],

  color: '#00d4ff',
  icon: '🦷',

  images: [
    {
      label: 'AI Dental Messenger Receptionist and Booking Workflow',
      src: messenger,
    },
  ],
},
    {
  id: 10,
  category: 'n8n',
  title: 'AI Job Scraper & Resume Optimizer',
  desc: 'An end-to-end n8n automation that searches for relevant job opportunities and customizes a resume based on the selected job description. It connects Slack, AI, job APIs, Google Docs, Google Drive, and Gmail into one automated workflow.',
  features: [
    'Receives job-search requests through Slack',
    'Validates job titles and search queries using AI',
    'Finds relevant job openings through RapidAPI',
    'Extracts job requirements and descriptions',
    'Customizes the resume for the selected position',
    'Updates the optimized resume in Google Docs',
    'Creates an application email draft in Gmail',
    'Sends results and status updates through Slack',
  ],
  tags: [
    'n8n',
    'OpenAI API',
    'RapidAPI',
    'Slack',
    'Google Docs',
    'Google Drive',
    'Gmail',
  ],
  color: '#7b2fff',
  icon: '💼',
  images: [
  {
    label: 'AI Job Scraper Workflow',
    src: aiJobs1,
  },
  {
    label: 'AI Resume Optimizer Workflow',
    src: aiJobs2,
  },
],
},
  // ─── Go High Level ────────────────────────────────────────
  /*{
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
  },*/
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

const visibleProjects = projects.filter(project =>
  project.images?.length > 0 && project.images.some(image => Boolean(image.src))
)

const CATEGORIES = [
  { key: 'all',         label: 'All Systems', color: '#8be9ff' },
  { key: 'n8n',         label: 'AI Automation', color: '#00d4ff' },
  /*{ key: 'gohighlevel', label: 'Go High Level', color: '#f97316' },
  { key: 'zapier',      label: 'Zapier',        color: '#ff4a00' },*/
  { key: 'website',     label: 'Web Systems', color: '#10f5a7' },
]

const metricCards = [
  { icon: Cpu, value: visibleProjects.filter(p => p.category === 'n8n').length, label: 'Automation Systems' },
  { icon: Layers3, value: new Set(visibleProjects.flatMap(p => p.tags)).size, label: 'Technologies Used' },
  { icon: Activity, value: '24/7', label: 'Workflow Ready' },
]

// ── MockScreenshot ────────────────────────────────────────────
function MockScreenshot({ image, isDark }) {
  if (image.src) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[#02060c] overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <img src={image.src} alt={image.label} className="relative z-[1] w-full h-full object-contain" />
        <motion.div
          className="absolute z-[2] left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)', boxShadow: '0 0 14px #00d4ff' }}
          animate={{ top: ['5%', '95%', '5%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        />
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
// ── Modal ─────────────────────────────────────────────────────
function Modal({ project, onClose, isDark }) {
  const [current, setCurrent] = useState(0)

  const images = project?.images || []
  const imageCount = images.length
  const hasMultipleImages = imageCount > 1

  const prev = () => {
    if (!hasMultipleImages) return

    setCurrent((currentIndex) =>
      currentIndex === 0 ? imageCount - 1 : currentIndex - 1
    )
  }

  const next = () => {
    if (!hasMultipleImages) return

    setCurrent((currentIndex) =>
      currentIndex === imageCount - 1 ? 0 : currentIndex + 1
    )
  }

  // Reset image when opening another project
  React.useEffect(() => {
    setCurrent(0)
  }, [project?.id])

  // Keyboard controls and page-scroll lock
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft' && hasMultipleImages) {
        setCurrent((currentIndex) =>
          currentIndex === 0 ? imageCount - 1 : currentIndex - 1
        )
      }

      if (event.key === 'ArrowRight' && hasMultipleImages) {
        setCurrent((currentIndex) =>
          currentIndex === imageCount - 1 ? 0 : currentIndex + 1
        )
      }
    }

    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [hasMultipleImages, imageCount, onClose])

  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{
        background: 'rgba(1, 4, 10, 0.94)',
        backdropFilter: 'blur(14px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 40 }}
        className={`relative max-h-[95vh] w-full overflow-y-auto overflow-x-hidden rounded-t-[1.75rem] sm:max-w-5xl sm:rounded-[1.75rem] ${
          isDark ? 'bg-[#050b14]' : 'bg-white'
        }`}
        style={{
          border: `1px solid ${project.color}55`,
          boxShadow: `0 0 70px ${project.color}18`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Neon top line */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-px"
          style={{
            background: `linear-gradient(
              90deg,
              transparent,
              ${project.color},
              transparent
            )`,
          }}
        />

        {/* Header */}
        <div
          className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4"
          style={{
            borderBottom: `1px solid ${project.color}30`,
            background: isDark
              ? 'rgba(5, 11, 20, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="min-w-0">
            <span
              className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.28em]"
              style={{ color: project.color }}
            >
              System preview /
              {imageCount > 0
                ? ` ${String(current + 1).padStart(2, '0')} of ${String(
                    imageCount
                  ).padStart(2, '0')}`
                : ' No image'}
            </span>

            <h3
              className={`mt-0.5 truncate font-display text-base font-bold sm:text-lg ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onClose()
            }}
            aria-label="Close project preview"
            className={`ml-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
              isDark
                ? 'bg-white/5 text-white hover:bg-white/10'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Image viewer */}
        {imageCount > 0 ? (
          <div
            className="relative h-56 overflow-hidden border-y sm:h-80 md:h-[28rem]"
            style={{ borderColor: `${project.color}20` }}
          >
            <MockScreenshot
              image={images[current]}
              isDark={isDark}
            />

            {/* Navigation arrows */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    prev()
                  }}
                  className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-[#02060c]/85 text-white shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-300/70 hover:bg-[#071525] active:scale-95 sm:left-4 sm:h-11 sm:w-11"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    next()
                  }}
                  className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-[#02060c]/85 text-white shadow-xl backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-300/70 hover:bg-[#071525] active:scale-95 sm:right-4 sm:h-11 sm:w-11"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Image indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center gap-2">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image.label}-${index}`}
                    aria-label={`View screenshot ${index + 1}`}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      setCurrent(index)
                    }}
                    className="h-2 rounded-full border border-white/20 transition-all"
                    style={{
                      width: index === current ? 30 : 8,
                      background:
                        index === current
                          ? project.color
                          : 'rgba(255, 255, 255, 0.35)',
                      boxShadow:
                        index === current
                          ? `0 0 14px ${project.color}`
                          : 'none',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Image label */}
            <div
              className="absolute left-3 top-3 z-20 max-w-[70%] truncate rounded-lg px-3 py-1.5 font-body text-[10px] uppercase tracking-wider backdrop-blur-xl"
              style={{
                background: 'rgba(2, 6, 12, 0.78)',
                border: `1px solid ${project.color}45`,
                color: project.color,
              }}
            >
              <Maximize2 size={10} className="mr-1.5 inline" />
              {images[current]?.label || `Screenshot ${current + 1}`}
            </div>
          </div>
        ) : (
          <div
            className={`flex h-56 items-center justify-center border-y ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
            style={{ borderColor: `${project.color}20` }}
          >
            <p className="font-body text-sm">No preview image available</p>
          </div>
        )}

        {/* Tags and features */}
        <div className="grid grid-cols-1 gap-6 p-5 sm:gap-8 sm:p-7 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p
              className={`mb-3 text-[10px] uppercase tracking-[0.24em] ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Technology matrix
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 font-body text-xs"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p
              className={`mb-3 text-[10px] uppercase tracking-[0.24em] ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              System capabilities
            </p>

            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features?.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-2 text-xs ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <CheckCircle2
                    size={13}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: project.color }}
                  />

                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
// ── Main Component ────────────────────────────────────────────
export default function Projects({ isDark }) {
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? visibleProjects
    : visibleProjects.filter(p => p.category === filter)

  return (
    <SectionWrapper id="projects" isDark={isDark} className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className={`absolute inset-0 ${isDark ? 'opacity-100' : 'opacity-40'}`} style={{ backgroundImage: 'linear-gradient(rgba(0,212,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.035) 1px, transparent 1px)', backgroundSize: '56px 56px', maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)' }} />
        <motion.div className="absolute -left-32 top-32 h-80 w-80 rounded-full blur-[110px]" style={{ background: 'rgba(0,212,255,.14)' }} animate={{ x: [0, 80, 0], y: [0, -25, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        <motion.div className="absolute -right-32 bottom-12 h-96 w-96 rounded-full blur-[130px]" style={{ background: 'rgba(123,47,255,.14)' }} animate={{ x: [0, -70, 0], y: [0, 35, 0] }} transition={{ duration: 17, repeat: Infinity }} />
      </div>

      <div className="relative">
        <SectionTitle label="AI Systems Portfolio" title="Automation Intelligence" isDark={isDark} />

        <div className="-mt-10 mb-8 sm:mb-10 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.24em] text-emerald-400">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              Portfolio systems online
            </div>
            <p className={`max-w-2xl text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Intelligent workflows engineered to capture leads, connect business tools, automate decisions, and keep operations moving around the clock.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {metricCards.map(({ icon: Icon, value, label }) => (
              <div key={label} className={`min-w-0 sm:min-w-[116px] rounded-xl px-3 py-3 border backdrop-blur-xl ${isDark ? 'bg-[#06101b]/75 border-cyan-300/15' : 'bg-white/70 border-cyan-700/15'}`}>
                <div className="flex items-center gap-2"><Icon size={13} className="text-cyan-400" /><span className={`font-display text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</span></div>
                <p className={`mt-1 text-[8px] sm:text-[9px] uppercase tracking-wider leading-tight ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

      {/* ── Filter Tabs — scrollable on mobile ── */}
      <div className={`relative flex gap-2 mb-7 sm:mb-10 overflow-x-auto p-1.5 rounded-2xl border backdrop-blur-xl scrollbar-hide ${isDark ? 'bg-[#040b14]/70 border-white/10' : 'bg-white/65 border-slate-200'}`}>
        {CATEGORIES.map(cat => {
          const isActive = filter === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className="relative px-4 sm:px-5 py-2.5 rounded-xl text-[10px] sm:text-xs uppercase tracking-wider font-body transition-all duration-300 flex-shrink-0 overflow-hidden"
              style={{
                background: isActive ? `${cat.color}16` : 'transparent',
                border:     `1px solid ${isActive ? `${cat.color}65` : 'transparent'}`,
                color:      isActive ? cat.color : (isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)'),
                boxShadow: isActive ? `inset 0 0 20px ${cat.color}0d, 0 0 18px ${cat.color}0d` : 'none',
              }}
            >
              <span className="relative z-10 flex items-center gap-2"><Sparkles size={12} />{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* ── Project Grid ── */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((p, i) => (
          <motion.button
            layout
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => p.link ? window.open(p.link, '_blank', 'noopener,noreferrer') : setActive(p)}
            className={`relative text-left rounded-[1.35rem] overflow-hidden cursor-pointer transition-all duration-500 group ${isDark ? 'bg-[#050d17]/90' : 'bg-white/80'} backdrop-blur-xl`}
            style={{ border: `1px solid ${p.color}28`, boxShadow: isDark ? '0 20px 60px rgba(0,0,0,.24)' : '0 20px 55px rgba(15,23,42,.09)' }}
          >
            <div className="absolute inset-x-10 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, boxShadow: `0 0 18px ${p.color}` }} />
            <div className="absolute left-0 top-0 h-9 w-9 border-l border-t rounded-tl-[1.35rem] opacity-60" style={{ borderColor: p.color }} />
            <div className="absolute right-0 bottom-0 h-9 w-9 border-r border-b rounded-br-[1.35rem] opacity-40" style={{ borderColor: p.color }} />
            {/* Card image */}
            <div className="h-48 sm:h-52 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}12, #02060c)` }}>
              {p.images[0]?.src ? (
                <img
                  src={p.images[0].src}
                  alt={p.images[0].label}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.06] group-hover:saturate-125"
                />
              ) : null}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030911] via-transparent to-[#02060c]/45" />
              <motion.div className="absolute left-0 right-0 h-px opacity-0 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, boxShadow: `0 0 14px ${p.color}` }} animate={{ top: ['10%', '90%'] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }} />
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span
                    className="px-2.5 py-1.5 rounded-lg text-[9px] uppercase tracking-[0.16em] font-body backdrop-blur-xl"
                    style={{ background: 'rgba(2,6,12,.72)', color: p.color, border: `1px solid ${p.color}45` }}
                  >
                    {CATEGORIES.find(c => c.key === p.category)?.label}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-white/70 text-[9px] font-body backdrop-blur-xl">
                    <Images size={11} color={p.color} /> {String(p.images.length).padStart(2, '0')}
                  </div>
                </div>
                <div className="text-white/70 text-[10px] uppercase tracking-widest font-body flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />{p.link ? 'Live system' : 'Case study ready'}</span>
                  {p.link ? <ExternalLink size={12} /> : <Maximize2 size={12} />}
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="relative p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: `${p.color}aa` }}>SYS-{String(p.id).padStart(3, '0')}</span>
                <ArrowUpRight size={15} className="text-slate-500 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3
                className={`font-display font-bold text-base leading-snug mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                {p.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-5 line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {p.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-md text-[9px] uppercase tracking-wide font-body" style={{ background: `${p.color}0d`, color: p.color, border: `1px solid ${p.color}22` }}>
                    {tag}
                  </span>
                ))}
                {p.tags.length > 3 && (
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-body" style={{ background: `${p.color}0d`, color: p.color, border: `1px solid ${p.color}22` }}>
                    +{p.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {active && <Modal project={active} onClose={() => setActive(null)} isDark={isDark} />}
      </div>
    </SectionWrapper>
  )
}