import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bot,
  Braces,
  ChevronLeft,
  ChevronRight,
  CloudCog,
  Database,
  PlugZap,
  Workflow,
} from 'lucide-react'
import SectionWrapper, { SectionTitle } from '../components/SectionWrapper'
import GlassCard from '../components/GlassCard'

const automationPlatforms = [
  {
    name: 'n8n',
    eyebrow: 'Primary platform',
    description: 'I build multi-step AI workflows with APIs, webhooks, databases, conditional logic, and human approval steps.',
    usedFor: ['AI agents', 'Lead qualification', 'Appointment booking', 'Data sync'],
    color: '#ff6b35',
    Icon: Workflow,
  },
  {
    name: 'Make.com',
    eyebrow: 'Visual automation',
    description: 'I use Make.com to connect business apps and turn repetitive processes into clear, maintainable scenarios.',
    usedFor: ['App connections', 'Data routing', 'Notifications', 'Operations'],
    color: '#a855f7',
    Icon: CloudCog,
  },
  {
    name: 'Zapier',
    eyebrow: 'Rapid integrations',
    description: 'I create reliable trigger-and-action automations for teams that need fast integrations between everyday tools.',
    usedFor: ['Lead capture', 'CRM updates', 'Email actions', 'Task handoffs'],
    color: '#ff4f00',
    Icon: PlugZap,
  },
  {
    name: 'GoHighLevel',
    eyebrow: 'CRM automation',
    description: 'I configure pipelines and follow-up workflows that help businesses organize leads and move conversations forward.',
    usedFor: ['Pipelines', 'Lead follow-up', 'CRM workflows', 'Client journeys'],
    color: '#00c9ff',
    Icon: Bot,
  },
]

const toolCategories = [
  {
    title: 'AI & Language Models',
    description: 'Models and techniques I use to add reasoning, classification, summarization, and natural conversations to workflows.',
    color: '#10a37f',
    Icon: Bot,
    tools: ['Gemini API', 'OpenAI API', 'Claude', 'OpenRouter', 'Ollama', 'Prompt Engineering'],
  },
  {
    title: 'Apps & Integrations',
    description: 'Business tools I have connected through native nodes, APIs, OAuth, and webhooks.',
    color: '#00d4ff',
    Icon: PlugZap,
    tools: ['Google Sheets', 'Gmail', 'Google Calendar', 'Calendly', 'Telegram', 'Facebook Graph API', 'Airtable', 'Jotform'],
  },
  {
    title: 'Development',
    description: 'Technologies I use to build interfaces, APIs, custom workflow logic, and AI-powered web applications.',
    color: '#f7df1e',
    Icon: Braces,
    tools: ['JavaScript', 'React.js', 'HTML', 'CSS', 'Tailwind CSS', 'Python', 'Flask', 'Node.js'],
  },
  {
    title: 'Data & Backend',
    description: 'Tools I use to store, query, protect, and synchronize application and automation data.',
    color: '#7b2fff',
    Icon: Database,
    tools: ['Supabase', 'PostgreSQL', 'MySQL', 'REST APIs', 'Webhooks', 'JSON'],
  },
  {
    title: 'Deployment & Workflow',
    description: 'Services I use to test, version, deploy, and keep web applications and automations accessible.',
    color: '#ff2d78',
    Icon: CloudCog,
    tools: ['Git', 'GitHub', 'Docker', 'Vercel', 'Render', 'ngrok'],
  },
]

function CarouselControls({ current, total, onPrevious, onNext, onSelect, label, isDark }) {
  return (
    <div className="mt-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2" role="tablist" aria-label={`${label} slides`}>
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Show slide ${index + 1}`}
            aria-selected={current === index}
            onClick={() => onSelect(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? 'w-8 bg-neon-blue'
                : `w-2 ${isDark ? 'bg-slate-600 hover:bg-slate-400' : 'bg-slate-300 hover:bg-slate-500'}`
            }`}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrevious}
          aria-label={`Previous ${label} slide`}
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
            isDark
              ? 'border-white/10 text-slate-300 hover:border-neon-blue/60 hover:text-neon-blue'
              : 'border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600'
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={`Next ${label} slide`}
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
            isDark
              ? 'border-white/10 text-slate-300 hover:border-neon-blue/60 hover:text-neon-blue'
              : 'border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600'
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

function useCarousel(total, interval = 6000) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((index) => (index + 1) % total)
  const previous = () => setCurrent((index) => (index - 1 + total) % total)

  useEffect(() => {
    const timer = window.setInterval(next, interval)
    return () => window.clearInterval(timer)
  }, [interval, total])

  return { current, setCurrent, next, previous }
}

function AutomationCarousel({ isDark }) {
  const carousel = useCarousel(automationPlatforms.length)
  const platform = automationPlatforms[carousel.current]
  const Icon = platform.Icon

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className={`font-body text-xs uppercase tracking-[0.24em] ${isDark ? 'text-neon-blue' : 'text-blue-600'}`}>
            Core stack
          </p>
          <h3 className={`mt-2 font-display text-xl font-bold sm:text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Automation Platforms
          </h3>
        </div>
        <span className={`hidden font-body text-xs sm:block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {String(carousel.current + 1).padStart(2, '0')} / {String(automationPlatforms.length).padStart(2, '0')}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, x: 45 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -45 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <GlassCard isDark={isDark} hover={false} className="min-h-[330px] p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-15 blur-3xl"
                style={{ background: platform.color }}
              />

              <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                <div>
                  <div
                    className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border"
                    style={{ color: platform.color, borderColor: `${platform.color}55`, background: `${platform.color}12` }}
                  >
                    <Icon size={30} />
                  </div>
                  <p className="font-body text-xs uppercase tracking-[0.2em]" style={{ color: platform.color }}>
                    {platform.eyebrow}
                  </p>
                  <h4 className={`mt-2 font-display text-3xl font-black sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {platform.name}
                  </h4>
                </div>

                <div>
                  <p className={`font-body text-sm leading-7 sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {platform.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {platform.usedFor.map((item) => (
                      <span
                        key={item}
                        className={`rounded-full border px-3 py-1.5 font-body text-xs ${
                          isDark ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <CarouselControls
        current={carousel.current}
        total={automationPlatforms.length}
        onPrevious={carousel.previous}
        onNext={carousel.next}
        onSelect={carousel.setCurrent}
        label="automation platform"
        isDark={isDark}
      />
    </div>
  )
}

function ToolsCarousel({ isDark }) {
  const carousel = useCarousel(toolCategories.length, 7000)
  const category = toolCategories[carousel.current]
  const Icon = category.Icon

  return (
    <div className="mt-14 sm:mt-20">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className={`font-body text-xs uppercase tracking-[0.24em] ${isDark ? 'text-neon-purple' : 'text-violet-600'}`}>
            Connected toolkit
          </p>
          <h3 className={`mt-2 font-display text-xl font-bold sm:text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tools I&apos;ve Used
          </h3>
        </div>
        <span className={`hidden font-body text-xs sm:block ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {String(carousel.current + 1).padStart(2, '0')} / {String(toolCategories.length).padStart(2, '0')}
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <GlassCard isDark={isDark} hover={false} className="min-h-[300px] p-6 sm:p-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                <div className="lg:w-[38%]">
                  <div
                    className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border"
                    style={{ color: category.color, borderColor: `${category.color}55`, background: `${category.color}12` }}
                  >
                    <Icon size={27} />
                  </div>
                  <h4 className={`font-display text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {category.title}
                  </h4>
                  <p className={`mt-3 font-body text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {category.description}
                  </p>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
                  {category.tools.map((tool, index) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.04 }}
                      className={`flex min-h-16 items-center rounded-xl border px-3 py-3 font-body text-xs font-medium sm:text-sm ${
                        isDark
                          ? 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm'
                      } transition-all`}
                    >
                      <span className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: category.color }} />
                      {tool}
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <CarouselControls
        current={carousel.current}
        total={toolCategories.length}
        onPrevious={carousel.previous}
        onNext={carousel.next}
        onSelect={carousel.setCurrent}
        label="tool category"
        isDark={isDark}
      />
    </div>
  )
}

export default function Tools({ isDark }) {
  return (
    <SectionWrapper id="tools" isDark={isDark}>
      <SectionTitle label="Tech Stack" title="Automation Stack & Tools" isDark={isDark} />
      <AutomationCarousel isDark={isDark} />
      <ToolsCarousel isDark={isDark} />
    </SectionWrapper>
  )
}