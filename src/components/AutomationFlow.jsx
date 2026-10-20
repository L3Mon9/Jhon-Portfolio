import React from 'react'
import { ArrowUpRight, Activity } from 'lucide-react'

const flows = {
  1: {
    subtitle: 'Message to approved follow-up',
    nodes: ['Messenger', 'AI response', 'Capture lead', 'Client email', 'Admin approval', 'Google Sheets'],
    colors: ['cyan', 'violet', 'cyan', 'mint', 'amber', 'mint'],
  },
  2: {
    subtitle: 'Schedule to publish-ready video',
    nodes: ['Schedule', 'Drive search', 'Download', 'Social-ready', 'Drive upload', 'Video API'],
    colors: ['cyan', 'mint', 'cyan', 'violet', 'mint', 'amber'],
  },
  8: {
    subtitle: 'New lead to booked appointment',
    nodes: ['Lead form', 'Normalize', 'AI score', 'Confirmation', 'Calendly', 'Google Sheets'],
    colors: ['cyan', 'cyan', 'violet', 'mint', 'amber', 'mint'],
  },
  9: {
    subtitle: 'Patient message to booking request',
    nodes: ['Messenger', 'Classify intent', 'Guided / AI', 'Staff alert', 'Save request', 'Booking form'],
    colors: ['cyan', 'violet', 'amber', 'mint', 'mint', 'cyan'],
  },
  10: {
    subtitle: 'Job search to tailored application',
    nodes: ['Slack request', 'AI validate', 'Job API', 'Slack result', 'Gmail draft', 'Resume / Docs'],
    colors: ['cyan', 'violet', 'amber', 'mint', 'mint', 'violet'],
  },
}

const palette = {
  cyan: '#32dcf5',
  violet: '#ac83ff',
  amber: '#ffc66e',
  mint: '#56e6c2',
}

const positions = [
  { x: 12, y: 35 }, { x: 125, y: 35 }, { x: 238, y: 35 },
  { x: 12, y: 137 }, { x: 125, y: 137 }, { x: 238, y: 137 },
]

// The signal follows the real processing order: across the top, then back across the lower lane.
const routes = [
  { d: 'M 108 56 H 125', color: 'cyan', delay: '0s' },
  { d: 'M 221 56 H 238', color: 'violet', delay: '.35s' },
  { d: 'M 286 77 V 137', color: 'amber', delay: '.7s' },
  { d: 'M 238 158 H 221', color: 'mint', delay: '1.05s' },
  { d: 'M 125 158 H 108', color: 'mint', delay: '1.4s' },
]

function FlowRoute({ route }) {
  const color = palette[route.color]
  return (
    <g>
      <path d={route.d} fill="none" stroke={color} strokeOpacity=".16" strokeWidth="6" />
      <path d={route.d} fill="none" stroke={color} strokeOpacity=".7" strokeWidth="1.5" strokeDasharray="3 3" className="automation-flow-route" />
      <circle r="3" fill={color} className="automation-flow-signal" style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
        <animateMotion dur="2.2s" begin={route.delay} repeatCount="indefinite" path={route.d} />
      </circle>
    </g>
  )
}

export default function AutomationFlow({ project }) {
  const flow = flows[project.id]
  if (!flow) return null

  return (
    <div className="automation-flow-card" style={{ '--flow-accent': project.color }}>
      <div className="automation-flow-card-head">
        <span className="automation-flow-live"><span className="automation-flow-live-dot" /> Live flow</span>
        <span className="automation-flow-system">SYS-{String(project.id).padStart(3, '0')}</span>
      </div>
      <div className="automation-flow-card-title">
        <h3>{project.title}</h3>
        <p>{flow.subtitle}</p>
      </div>
      <svg className="automation-flow-canvas" viewBox="0 0 350 215" role="img" aria-label={`${project.title} animated workflow: ${flow.nodes.join(' to ')}`}>
        <defs>
          <pattern id={`flow-grid-${project.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="#3b5871" fillOpacity=".44" />
          </pattern>
        </defs>
        <rect width="350" height="215" fill={`url(#flow-grid-${project.id})`} />
        <text x="12" y="20" className="automation-flow-lane">01 / INTAKE + DECISION</text>
        <text x="12" y="122" className="automation-flow-lane">02 / DELIVERY + FOLLOW-UP</text>
        {routes.map((route, index) => <FlowRoute key={index} route={route} />)}
        {flow.nodes.map((label, index) => {
          const { x, y } = positions[index]
          const color = palette[flow.colors[index]]
          return (
            <g key={label}>
              <rect x={x} y={y} width="96" height="42" rx="7" fill="#081724" stroke={color} strokeOpacity=".78" />
              <rect x={x + 1} y={y + 7} width="2" height="28" rx="1" fill={color} />
              <circle cx={x + 13} cy={y + 21} r="2.5" fill={color} className="automation-flow-node-light" />
              <text x={x + 21} y={y + 25} className="automation-flow-node-label">{label}</text>
            </g>
          )
        })}
        <text x="12" y="204" className="automation-flow-lane">ANIMATED WORKFLOW PREVIEW</text>
      </svg>
      <div className="automation-flow-card-foot">
        <span><Activity size={13} /> Signal moving</span>
        <span>Open screenshots &amp; details <ArrowUpRight size={14} /></span>
      </div>
    </div>
  )
}
