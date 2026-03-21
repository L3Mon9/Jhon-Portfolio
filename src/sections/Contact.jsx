import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Zap, Linkedin, Github } from "lucide-react";
import { InlineWidget } from "react-calendly";
import SectionWrapper, { SectionTitle } from "../components/SectionWrapper";
import GlassCard from "../components/GlassCard";

const contactLinks = [
  {
    icon: Mail,
    label: "jhon.lemon.automation@gmail.com",
    short: "Email",
    color: "#00d4ff",
    href: "mailto:jhon.lemon.automation@gmail.com",
  },
  {
    icon: Phone,
    label: "09708784802",
    short: "Phone",
    color: "#7b2fff",
    href: "tel:09708784802",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/jhon-lemon-galin",
    short: "LinkedIn",
    color: "#0A66C2",
    href: "https://www.linkedin.com/in/jhon-lemon-galin-939826298/",
  },
  {
    icon: Github,
    label: "github.com/L3Mon9",
    short: "GitHub",
    color: "#888",
    href: "https://github.com/L3Mon9",
  },
  {
    icon: MapPin,
    label: "Philippines",
    short: "Location",
    color: "#10a37f",
    href: null,
  },
];

export default function Contact({ isDark }) {
  return (
    <SectionWrapper id="contact" isDark={isDark}>
      <SectionTitle label="Initialize Connection" title="Book a Call" isDark={isDark} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* ── LEFT ── */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className={`text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Want to automate your business? Book a free consultation and let's discuss how AI and automation can streamline your workflow.
            </p>

            {/* AI Services card */}
            <GlassCard isDark={isDark} hover={false} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap size={16} className={isDark ? "text-neon-blue" : "text-blue-600"} />
                <h3 className={`font-display font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                  AI Automation Services
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                I build AI chatbots, automation workflows, and intelligent systems that help businesses save time and increase efficiency.
              </p>
            </GlassCard>

            {/* Contact links */}
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, short, color, href }) => (
                <motion.a
                  key={short}
                  href={href || "#"}
                  target={href && !href.startsWith("mailto") && !href.startsWith("tel") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-300 group ${
                    isDark
                      ? "bg-dark-700 border border-white/5 hover:border-opacity-40"
                      : "bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={15} style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    {/* On small screens show short label, on md+ show full */}
                    <span className={`font-body text-xs text-left block truncate ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      <span className="sm:hidden">{short}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Calendly ── */}
        <GlassCard isDark={isDark} hover={false} delay={0.2} className="w-full">
          <h3 className={`font-display font-bold text-base sm:text-lg mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
            📅 Free AI Automation Consultation
          </h3>
          {/* Calendly: fixed height on all screens, scrolls internally */}
          <div className="w-full rounded-lg overflow-hidden" style={{ height: 550 }}>
            <InlineWidget
              url="https://calendly.com/hexiaojian09/30min"
              styles={{ height: "550px", minWidth: "100%" }}
            />
          </div>
        </GlassCard>

      </div>
    </SectionWrapper>
  );
}
