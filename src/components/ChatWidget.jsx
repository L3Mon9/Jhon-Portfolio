import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Minimize2, WifiOff } from 'lucide-react'

// ── Your n8n webhook URL ──
const WEBHOOK_URL = 'https://citxncode-projects.onrender.com/webhook/porfolio_n8n'

const SUGGESTIONS = [
  'What services do you offer?',
  'How does AI chatbot work?',
  'Can you automate my business?',
  'What tools do you use?',
]

const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

export default function ChatWidget() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "👋 Hi! I'm JLG's AI assistant powered by n8n + Gemini. Ask me anything about automation services!",
      ts: Date.now(),
    }
  ])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const [online, setOnline] = useState(true)
  const bottomRef           = useRef(null)
  const inputRef            = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || typing) return
    setInput('')

    // Show user message immediately
    setMessages(prev => [...prev, { from: 'user', text: msg, ts: Date.now() }])
    setTyping(true)
    setOnline(true)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          sessionId: SESSION_ID,
          source: 'portfolio-chat',
          timestamp: new Date().toISOString(),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // ── Safely parse response ──
      // n8n Basic LLM Chain can return: JSON object, JSON array, plain text, or empty body
      const raw = await res.text()   // always read as text first — never fails

      let reply = ''

      if (raw && raw.trim().length > 0) {
        // Try to parse as JSON
        try {
          const data = JSON.parse(raw)
          // Handle array (n8n sometimes wraps output in array)
          const item = Array.isArray(data) ? data[0] : data
          reply =
            item?.output ||
            item?.text ||
            item?.message ||
            item?.reply ||
            item?.response ||
            item?.answer ||
            item?.content ||
            (typeof item === 'string' ? item : '') ||
            raw
        } catch {
          // Not JSON — use the raw text directly (some n8n setups return plain text)
          reply = raw
        }
      }

      // Final fallback if still empty
      if (!reply || !reply.trim()) {
        reply = "I received your message! Jhon will get back to you soon. 🤖"
      }

      setTyping(false)
      setOnline(true)
      setMessages(prev => [...prev, { from: 'bot', text: reply.trim(), ts: Date.now() }])

    } catch (err) {
      console.error('Webhook error:', err)
      setTyping(false)
      setOnline(false)
      setMessages(prev => [...prev, {
        from: 'bot',
        text: "⚠️ Connection issue. Please try again or reach out via the Contact section below.",
        ts: Date.now(),
        isError: true,
      }])
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-80 mb-4 rounded-2xl overflow-hidden flex flex-col"
            style={{
              height: 480,
              background: 'rgba(5,13,20,0.97)',
              border: '1px solid rgba(0,212,255,0.25)',
              boxShadow: '0 0 40px rgba(0,212,255,0.15), 0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0"
              style={{
                borderColor: 'rgba(0,212,255,0.15)',
                background: 'linear-gradient(135deg,rgba(0,212,255,0.1),rgba(123,47,255,0.1))',
              }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,212,255,0.2)', border: '1px solid rgba(0,212,255,0.4)' }}>
                <Bot size={16} style={{ color: '#00d4ff' }} />
              </div>

              <div className="flex-1 min-w-0">
                <p style={{ fontFamily: 'Orbitron, monospace', color: 'white', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>
                  JLG Assistant
                </p>
                <p className="mt-0.5 flex items-center gap-1.5" style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: 10 }}>
                  {online ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                      <span style={{ color: '#4ade80' }}>n8n + Gemini</span>
                    </>
                  ) : (
                    <>
                      <WifiOff size={10} style={{ color: '#f87171' }} />
                      <span style={{ color: '#f87171' }}>Offline — retry</span>
                    </>
                  )}
                </p>
              </div>

              {/* n8n badge */}
              <div className="px-2 py-0.5 rounded text-xs font-bold"
                style={{ background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.35)', color: '#ff6b35', fontFamily: 'Share Tech Mono, monospace' }}>
                n8n
              </div>

              <button onClick={() => setOpen(false)} className="ml-1 text-slate-500 hover:text-white transition-colors">
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,212,255,0.2) transparent' }}
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start items-start gap-2'}`}
                >
                  {m.from === 'bot' && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
                      <Bot size={10} style={{ color: '#00d4ff' }} />
                    </div>
                  )}
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                    style={{
                      fontFamily: 'Exo 2, sans-serif',
                      wordBreak: 'break-word',
                      ...(m.from === 'bot' ? {
                        background: m.isError ? 'rgba(239,68,68,0.1)' : 'rgba(0,212,255,0.08)',
                        border: `1px solid ${m.isError ? 'rgba(239,68,68,0.3)' : 'rgba(0,212,255,0.2)'}`,
                        color: '#cbd5e1',
                      } : {
                        background: 'linear-gradient(135deg,#00d4ff,#7b2fff)',
                        color: '#fff',
                      })
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing / processing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.3)' }}>
                    <Bot size={10} style={{ color: '#00d4ff' }} />
                  </div>
                  <div className="px-4 py-2.5 rounded-xl flex gap-1 items-center"
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#00d4ff', animation: `chatBounce 1s ${i * 0.15}s infinite` }} />
                    ))}
                  </div>
                  <span style={{ color: 'rgba(0,212,255,0.4)', fontFamily: 'Share Tech Mono, monospace', fontSize: 10 }}>
                   JLG THINKING...
                  </span>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length <= 2 && !typing && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-xs px-2.5 py-1 rounded-full transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      color: '#00d4ff',
                      fontFamily: 'Share Tech Mono, monospace',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input row */}
            <div className="px-3 py-3 flex gap-2 flex-shrink-0 border-t" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder={typing ? 'Waiting for Gemini...' : 'Ask about automation...'}
                disabled={typing}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none text-white placeholder-slate-600 disabled:opacity-50"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  fontFamily: 'Exo 2, sans-serif',
                }}
              />
              <motion.button
                onClick={() => send()}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 disabled:opacity-30"
                style={{ background: 'linear-gradient(135deg,#00d4ff,#7b2fff)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={14} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Toggle Button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white relative"
        style={{
          background: open
            ? 'linear-gradient(135deg,#7b2fff,#00d4ff)'
            : 'linear-gradient(135deg,#00d4ff,#7b2fff)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0,212,255,0.5)',
            '0 0 35px rgba(0,212,255,0.8)',
            '0 0 20px rgba(0,212,255,0.5)',
          ]
        }}
        transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.2 }}><X   size={22} /></motion.div>
            : <motion.div key="bot" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Bot size={22} /></motion.div>
          }
        </AnimatePresence>

        {/* Ping ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'rgba(0,212,255,0.3)' }} />
        )}

        {/* Online/offline dot */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full border-2"
          style={{ background: online ? '#4ade80' : '#f87171', borderColor: '#020408' }} />
      </motion.button>

      <style>{`
        @keyframes chatBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
