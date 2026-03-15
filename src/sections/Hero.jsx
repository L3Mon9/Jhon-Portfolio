import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Zap, Eye } from 'lucide-react'
import logo from '../assets/profile.png'

// ──────────────────────────────────────────────
// Floating icon positions (around profile circle)
// ──────────────────────────────────────────────
const floatingIcons = [
  { label: 'n8n',     color: '#ff6b35', angle: 0   },
  { label: 'Make',    color: '#a020f0', angle: 45  },
  { label: 'Zapier',  color: '#ff4a00', angle: 90  },
  { label: 'GHL',     color: '#00c9ff', angle: 135 },
  { label: 'OpenAI',  color: '#10a37f', angle: 180 },
  { label: 'Webhook', color: '#00d4ff', angle: 225 },
  { label: 'API',     color: '#7b2fff', angle: 270 },
  { label: 'Sheets',  color: '#0f9d58', angle: 315 },
]

// ──────────────────────────────────────────────
// TypeWriter
// ──────────────────────────────────────────────
function TypeWriter({ texts, isDark }) {
  const [idx, setIdx]       = useState(0)
  const [sub, setSub]       = useState(0)
  const [deleting, setDel]  = useState(false)

  useEffect(() => {
    const current = texts[idx]
    const speed   = deleting ? 40 : 80
    const timer   = setTimeout(() => {
      if (!deleting) {
        if (sub < current.length) setSub(s => s + 1)
        else setTimeout(() => setDel(true), 1800)
      } else {
        if (sub > 0) setSub(s => s - 1)
        else { setDel(false); setIdx(i => (i + 1) % texts.length) }
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [sub, deleting, idx, texts])

  return (
    <span className={`font-body text-sm md:text-base ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>
      {texts[idx].substring(0, sub)}<span className="typing-cursor" />
    </span>
  )
}

// ──────────────────────────────────────────────
// Lightning Network Canvas (background lines + packets)
// ──────────────────────────────────────────────
function LightningNetwork({ isDark, containerRef }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, time = 0

    const resize = () => {
      const parent = containerRef?.current
      if (parent) {
        const rect = parent.getBoundingClientRect()
        canvas.width  = rect.width
        canvas.height = rect.height
      } else {
        canvas.width  = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const packets = floatingIcons.map((icon, i) => ({
      from: i, to: (i + 1) % floatingIcons.length,
      t: Math.random(), speed: 0.004 + Math.random() * 0.003, color: icon.color,
    }))
    const centerPackets = floatingIcons.map((icon, i) => ({
      from: 'center', to: i,
      t: Math.random(), speed: 0.003 + Math.random() * 0.004, color: icon.color,
    }))

    const getPos = (idx) => {
      const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2
      if (idx === 'center') return { x: cx, y: cy }
      const icon = floatingIcons[idx]
      const rad  = (icon.angle * Math.PI) / 180
      const orbitR = Math.min(w, h) * 0.42
      return { x: cx + Math.cos(rad) * orbitR, y: cy + Math.sin(rad) * orbitR }
    }

    const drawGlowLine = (x1, y1, x2, y2, color, alpha, width = 1) => {
      ctx.save()
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
      ctx.strokeStyle = color; ctx.globalAlpha = alpha
      ctx.lineWidth = width; ctx.shadowBlur = 12; ctx.shadowColor = color
      ctx.stroke(); ctx.restore()
    }

    const drawPacket = (x, y, color) => {
      ctx.save()
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = color; ctx.globalAlpha = 0.95
      ctx.shadowBlur = 16; ctx.shadowColor = color; ctx.fill()
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = color; ctx.globalAlpha = 0.25; ctx.fill()
      ctx.restore()
    }

    const drawElectricArc = (x1, y1, x2, y2, color, segments = 6) => {
      ctx.save(); ctx.beginPath(); ctx.moveTo(x1, y1)
      const dx = (x2 - x1) / segments, dy = (y2 - y1) / segments
      for (let s = 1; s < segments; s++) {
        const jitter = (Math.random() - 0.5) * 8
        ctx.lineTo(x1 + dx * s + jitter, y1 + dy * s + jitter)
      }
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = color; ctx.globalAlpha = 0.18
      ctx.lineWidth = 1; ctx.shadowBlur = 20; ctx.shadowColor = color
      ctx.stroke(); ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.012
      const cx = canvas.width / 2, cy = canvas.height / 2

      floatingIcons.forEach((icon, i) => {
        const a = getPos(i), b = getPos((i + 1) % floatingIcons.length)
        const pulse = 0.06 + 0.04 * Math.sin(time + i * 0.7)
        drawGlowLine(a.x, a.y, b.x, b.y, icon.color, pulse, 0.8)
        if (Math.sin(time * 3 + i) > 0.96) drawElectricArc(a.x, a.y, b.x, b.y, icon.color)
      })

      floatingIcons.forEach((icon, i) => {
        const a = getPos(i)
        const pulse = 0.08 + 0.06 * Math.sin(time * 1.4 + i * 0.9)
        drawGlowLine(cx, cy, a.x, a.y, icon.color, pulse, 0.7)
        if (Math.sin(time * 2 + i * 1.3) > 0.97) drawElectricArc(cx, cy, a.x, a.y, icon.color, 8)
      })

      const pulseR = 10 + 4 * Math.sin(time * 2)
      ;[0.25, 0.1, 0.04].forEach((alpha, i) => {
        ctx.save(); ctx.beginPath()
        ctx.arc(cx, cy, pulseR * (1 + i * 0.7), 0, Math.PI * 2)
        ctx.fillStyle = '#00d4ff'; ctx.globalAlpha = alpha
        ctx.shadowBlur = 30; ctx.shadowColor = '#00d4ff'; ctx.fill(); ctx.restore()
      })

      floatingIcons.forEach((icon, i) => {
        const p = getPos(i), glow = 6 + 3 * Math.sin(time * 1.5 + i)
        ctx.save(); ctx.beginPath(); ctx.arc(p.x, p.y, glow, 0, Math.PI * 2)
        ctx.fillStyle = icon.color; ctx.globalAlpha = 0.15
        ctx.shadowBlur = 20; ctx.shadowColor = icon.color; ctx.fill(); ctx.restore()
      })

      packets.forEach(pkt => {
        pkt.t += pkt.speed; if (pkt.t >= 1) pkt.t = 0
        const a = getPos(pkt.from), b = getPos(pkt.to)
        drawPacket(a.x + (b.x - a.x) * pkt.t, a.y + (b.y - a.y) * pkt.t, pkt.color)
      })

      centerPackets.forEach(pkt => {
        pkt.t += pkt.speed; if (pkt.t >= 1) pkt.t = 0
        const b = getPos(pkt.to)
        drawPacket(cx + (b.x - cx) * pkt.t, cy + (b.y - cy) * pkt.t, pkt.color)
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [isDark])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }} />
  )
}

// ──────────────────────────────────────────────
// MASSIVE ELECTRIC STORM — hover canvas over profile
// Covers the ENTIRE section height, anchored on the circle center
// ──────────────────────────────────────────────
function ElectricStorm({ active, circleRef, sectionRef }) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ active: false, bolts: [], sparks: [], time: 0 })

  useEffect(() => { stateRef.current.active = active }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      const sec = sectionRef?.current
      if (sec) {
        const r = sec.getBoundingClientRect()
        canvas.width  = r.width
        canvas.height = r.height
      } else {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Get center of the circle relative to the section
    const getCircleCenter = () => {
      const sec  = sectionRef?.current
      const circ = circleRef?.current
      if (!sec || !circ) return { x: canvas.width * 0.75, y: canvas.height * 0.5, r: 90 }
      const sRect = sec.getBoundingClientRect()
      const cRect = circ.getBoundingClientRect()
      return {
        x: cRect.left + cRect.width  / 2 - sRect.left,
        y: cRect.top  + cRect.height / 2 - sRect.top,
        r: cRect.width / 2,
      }
    }

    // ── Bolt: jagged lightning branch from circle edge outward ──
    const spawnBolt = () => {
      const { x: cx, y: cy, r } = getCircleCenter()
      // random angle on circle rim
      const angle  = Math.random() * Math.PI * 2
      const startX = cx + Math.cos(angle) * r
      const startY = cy + Math.sin(angle) * r
      // travel outward 200–600px in that direction, with huge jitter
      const length = 180 + Math.random() * 420
      const points = [{ x: startX, y: startY }]
      const steps  = 10 + Math.floor(Math.random() * 8)
      const dx = Math.cos(angle) * length / steps
      const dy = Math.sin(angle) * length / steps
      for (let s = 1; s <= steps; s++) {
        const jitter = (Math.random() - 0.5) * 60
        const perp   = (Math.random() - 0.5) * 80
        points.push({
          x: startX + dx * s + jitter,
          y: startY + dy * s + perp,
        })
      }
      // optional branch
      const branches = []
      if (Math.random() > 0.45) {
        const branchAt = 3 + Math.floor(Math.random() * 4)
        const bp = points[Math.min(branchAt, points.length - 1)]
        const ba = angle + (Math.random() - 0.5) * 1.8
        const bl = 80 + Math.random() * 180
        const bSteps = 5 + Math.floor(Math.random() * 4)
        const branchPts = [{ x: bp.x, y: bp.y }]
        for (let bs = 1; bs <= bSteps; bs++) {
          branchPts.push({
            x: bp.x + Math.cos(ba) * bl / bSteps * bs + (Math.random() - 0.5) * 30,
            y: bp.y + Math.sin(ba) * bl / bSteps * bs + (Math.random() - 0.5) * 30,
          })
        }
        branches.push(branchPts)
      }
      const colors = ['#00d4ff', '#00ffee', '#7b2fff', '#ff2d78', '#ffffff']
      return {
        points, branches,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0, maxLife: 8 + Math.floor(Math.random() * 6),
        alpha: 0.8 + Math.random() * 0.2,
        width: 1.5 + Math.random() * 2,
      }
    }

    // ── Spark: tiny glowing dot exploding from circle rim ──
    const spawnSparks = (count = 12) => {
      const { x: cx, y: cy, r } = getCircleCenter()
      const sparks = []
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 3 + Math.random() * 9
        sparks.push({
          x: cx + Math.cos(angle) * r,
          y: cy + Math.sin(angle) * r,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 4,
          life: 0, maxLife: 18 + Math.floor(Math.random() * 20),
          color: ['#00d4ff','#00ffee','#ffffff','#7b2fff'][Math.floor(Math.random() * 4)],
          size: 1.5 + Math.random() * 3,
        })
      }
      return sparks
    }

    // ── Ring pulse: expanding neon ring from circle ──
    const rings = []
    const spawnRing = () => {
      const { x, y, r } = getCircleCenter()
      rings.push({
        x, y, r,
        radius: r, maxRadius: r + 300 + Math.random() * 250,
        life: 0, maxLife: 40,
        color: ['#00d4ff','#7b2fff','#00ffee'][Math.floor(Math.random() * 3)],
      })
    }

    const state = stateRef.current
    let boltTimer = 0, sparkTimer = 0, ringTimer = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      state.time++

      if (state.active) {
        boltTimer++
        sparkTimer++
        ringTimer++

        // spawn bolts rapidly
        if (boltTimer >= 2) { // every 2 frames = very rapid
          const count = 2 + Math.floor(Math.random() * 3)
          for (let i = 0; i < count; i++) state.bolts.push(spawnBolt())
          boltTimer = 0
        }
        // spawn sparks
        if (sparkTimer >= 4) {
          state.sparks.push(...spawnSparks(16))
          sparkTimer = 0
        }
        // spawn rings
        if (ringTimer >= 18) {
          spawnRing()
          ringTimer = 0
        }
      }

      // ── Draw & age rings ──
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]
        ring.life++
        ring.radius += (ring.maxRadius - ring.r) / ring.maxLife
        const progress = ring.life / ring.maxLife
        const alpha    = (1 - progress) * 0.5
        if (alpha <= 0 || ring.life >= ring.maxLife) { rings.splice(i, 1); continue }
        ctx.save()
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle  = ring.color
        ctx.globalAlpha  = alpha
        ctx.lineWidth    = 2.5 * (1 - progress * 0.5)
        ctx.shadowBlur   = 30
        ctx.shadowColor  = ring.color
        ctx.stroke()
        ctx.restore()
      }

      // ── Draw & age bolts ──
      for (let i = state.bolts.length - 1; i >= 0; i--) {
        const bolt = state.bolts[i]
        bolt.life++
        const progress = bolt.life / bolt.maxLife
        const alpha    = bolt.alpha * (1 - progress)
        if (alpha <= 0.01 || bolt.life >= bolt.maxLife) { state.bolts.splice(i, 1); continue }

        const drawBoltPath = (pts, width, a) => {
          if (pts.length < 2) return
          ctx.save()
          ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
          pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = bolt.color
          ctx.globalAlpha = a
          ctx.lineWidth   = width
          ctx.shadowBlur  = 25 + (1 - progress) * 30
          ctx.shadowColor = bolt.color
          ctx.lineCap     = 'round'
          ctx.stroke()
          // inner white core
          ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y)
          pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
          ctx.strokeStyle = '#ffffff'
          ctx.globalAlpha = a * 0.5
          ctx.lineWidth   = width * 0.3
          ctx.shadowBlur  = 8
          ctx.shadowColor = '#ffffff'
          ctx.stroke()
          ctx.restore()
        }

        drawBoltPath(bolt.points, bolt.width, alpha)
        bolt.branches.forEach(bp => drawBoltPath(bp, bolt.width * 0.5, alpha * 0.7))
      }

      // ── Draw & age sparks ──
      for (let i = state.sparks.length - 1; i >= 0; i--) {
        const sp = state.sparks[i]
        sp.life++
        sp.x  += sp.vx
        sp.y  += sp.vy
        sp.vx *= 0.94
        sp.vy *= 0.94
        const progress = sp.life / sp.maxLife
        const alpha    = (1 - progress) * 0.9
        if (alpha <= 0.05 || sp.life >= sp.maxLife) { state.sparks.splice(i, 1); continue }
        ctx.save()
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.size * (1 - progress * 0.5), 0, Math.PI * 2)
        ctx.fillStyle   = sp.color
        ctx.globalAlpha = alpha
        ctx.shadowBlur  = 14
        ctx.shadowColor = sp.color
        ctx.fill()
        ctx.restore()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20, width: '100%', height: '100%' }}
    />
  )
}

// ──────────────────────────────────────────────
// Main Hero
// ──────────────────────────────────────────────
export default function Hero({ isDark }) {
  const orbitContainerRef = useRef(null)
  const profileCircleRef  = useRef(null)
  const sectionRef        = useRef(null)
  const [hovering, setHovering] = useState(false)

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-screen flex items-center pt-24 overflow-hidden"
    >
      {/* Grid background */}
      <div className={`absolute inset-0 ${isDark ? 'grid-bg' : 'grid-bg-light'} opacity-50`} />

      {/* Ambient glow orbs */}
      {isDark && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* ── ELECTRIC STORM — covers full section, fires on hover ── */}
      <ElectricStorm active={hovering} circleRef={profileCircleRef} sectionRef={sectionRef} />

      <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-body uppercase tracking-widest ${
                isDark ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-green-100 border border-green-400 text-green-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              System Online
              <span className={`ml-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>v2.0.26</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className={`font-display font-black leading-none mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}
            >
              <span className="block text-5xl md:text-7xl lg:text-8xl">Jhon Lemon</span>
              <span className={`block text-5xl md:text-7xl lg:text-8xl ${isDark ? 'neon-text' : 'text-blue-600'}`}>Galin</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className={`flex items-center gap-3 my-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              <div className={`h-px w-12 ${isDark ? 'bg-neon-blue' : 'bg-blue-500'}`} />
              <span className="font-body text-xs uppercase tracking-widest">AI Automation Specialist | Workflow Developer</span>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-8 h-6">
              <TypeWriter isDark={isDark} texts={[
                'Building intelligent automation systems...',
                'Connecting apps with smart workflows...',
                'Automating conversations with AI...',
                'Reducing manual work for businesses...',
              ]} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className={`text-base leading-relaxed mb-10 max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              Building intelligent automation systems that help businesses streamline operations, automate conversations, and reduce manual work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`btn-primary flex items-center gap-2 ${isDark ? 'bg-neon-blue text-dark-900 hover:bg-neon-cyan' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              >
                <Zap size={14} /> Automate Your Business
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className={`btn-primary flex items-center gap-2 border ${isDark ? 'border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10' : 'border-blue-500 text-blue-600 hover:bg-blue-50'}`}
                style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              >
                <Eye size={14} /> View Projects
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
              className="flex gap-8 mt-12"
            >
              {[
                { num: '50+',  label: 'Workflows Built' },
                { num: '24/7', label: 'AI Automation'   },
                { num: '100%', label: 'Client Focused'  },
              ].map(s => (
                <div key={s.label}>
                  <div className={`font-display font-bold text-2xl ${isDark ? 'neon-text' : 'text-blue-600'}`}>{s.num}</div>
                  <div className={`font-body text-xs uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile + Network ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div
              ref={orbitContainerRef}
              className="relative"
              style={{ width: 620, height: 620, maxWidth: '100%', maxHeight: '100%' }}
            >
              {/* Lightning network background canvas */}
              <LightningNetwork isDark={isDark} containerRef={orbitContainerRef} />

              {/* Rotating rings */}
              {[1, 1.3, 1.6].map((scale, i) => {
                const baseSize = 380, size = baseSize * scale
                return (
                  <div
                    key={i}
                    className={`absolute rounded-full border ${
                      hovering
                        ? (isDark ? 'border-neon-blue/40' : 'border-blue-400/40')
                        : (isDark ? 'border-neon-blue/15' : 'border-blue-300/20')
                    } transition-all duration-500`}
                    style={{
                      width: size, height: size,
                      top:  `calc(50% - ${size / 2}px)`,
                      left: `calc(50% - ${size / 2}px)`,
                      animation: `spin ${14 + i * 7}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                      zIndex: 2,
                      boxShadow: hovering ? `0 0 ${20 + i * 10}px rgba(0,212,255,${0.2 - i * 0.05})` : 'none',
                      transition: 'box-shadow 0.4s ease',
                    }}
                  />
                )
              })}

              {/* ── PROFILE CIRCLE ── */}
              <div
                ref={profileCircleRef}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={`absolute rounded-full overflow-hidden cursor-pointer transition-all duration-500 ${
                  isDark
                    ? hovering
                      ? 'border-4 border-neon-blue shadow-[0_0_60px_rgba(0,212,255,0.8),0_0_120px_rgba(0,212,255,0.4),0_0_200px_rgba(0,212,255,0.2)]'
                      : 'border-4 border-neon-blue/60 shadow-neon-lg'
                    : hovering
                      ? 'border-4 border-blue-400 shadow-[0_0_60px_rgba(59,130,246,0.7)]'
                      : 'border-4 border-blue-400 shadow-xl'
                }`}
                style={{
                  width: 380,
                  height: 380,
                  top:    'calc(50% - 200px)',
                  left:   'calc(50% - 190px)',
                  zIndex: 6,
                }}
              >
                {/* Profile photo — fills entire circle, no gap, no letterbox */}
                <img
                  src={logo}
                  alt="Jhon Lemon Galin"
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: hovering ? 'scale(1.05)' : 'scale(1)' }}
                />

                {/* Hover: rim glow overlay (no icon, just light) */}
                <div
                  className="absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0,212,255,0.35) 100%)',
                    opacity: hovering ? 1 : 0,
                  }}
                />
              </div>

              {/* Floating tool badges */}
              {floatingIcons.map((icon, i) => {
                const rad = (icon.angle * Math.PI) / 180
                const r   = 260
                const x   = Math.cos(rad) * r
                const y   = Math.sin(rad) * r
                return (
                  <motion.div
                    key={icon.label}
                    className={`absolute flex items-center justify-center rounded-lg select-none ${isDark ? 'glass-dark' : 'glass-light'}`}
                    style={{
                      left:           `calc(50% + ${x}px - 28px)`,
                      top:            `calc(50% + ${y}px - 15px)`,
                      width:          56,
                      height:         28,
                      border:         `1px solid ${icon.color}50`,
                      color:          icon.color,
                      fontSize:       9,
                      fontFamily:     'Share Tech Mono, monospace',
                      animation:      `float ${4 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                      zIndex:         7,
                      boxShadow:      `0 0 8px ${icon.color}30, inset 0 0 8px ${icon.color}08`,
                      textShadow:     `0 0 6px ${icon.color}`,
                    }}
                    whileHover={{ scale: 1.25, zIndex: 10 }}
                  >
                    {icon.label}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${
          isDark ? 'text-neon-blue/50 hover:text-neon-blue' : 'text-blue-400/60 hover:text-blue-500'
        }`}
        style={{ zIndex: 15 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  )
}
