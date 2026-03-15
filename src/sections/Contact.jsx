import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Zap, Linkedin, Github } from "lucide-react";
import { InlineWidget } from "react-calendly";

import SectionWrapper, { SectionTitle } from "../components/SectionWrapper";
import GlassCard from "../components/GlassCard";

export default function Contact({ isDark }) {
  return (
    <SectionWrapper id="contact" isDark={isDark}>
      <SectionTitle
        label="Initialize Connection"
        title="Book a Call"
        isDark={isDark}
      />

      <div className="grid lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <p
              className={`text-base leading-relaxed mb-8 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Want to automate your business? Book a free consultation and
              let's discuss how AI and automation can streamline your workflow.
            </p>

            {/* AI CARD */}
            <GlassCard isDark={isDark} hover={false} className="mb-6">

              <div className="flex items-center gap-3 mb-4">
                <Zap
                  size={16}
                  className={isDark ? "text-neon-blue" : "text-blue-600"}
                />

                <h3
                  className={`font-display font-bold text-sm ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  AI Automation Services
                </h3>
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                I build AI chatbots, automation workflows, and intelligent
                systems that help businesses save time and increase efficiency.
              </p>

            </GlassCard>

            {/* CONTACT LINKS */}
            <div className="space-y-4">

              {[
                {
                  icon: Mail,
                  label: "Email",
                  color: "#00d4ff",
                  href: "mailto:jhon.lemon.automation@gmail.com",
                },

                {
                  icon: Phone,
                  label: "Phone",
                  color: "#7b2fff",
                  href: "tel:09708784802",
                },

                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  color: "#0A66C2",
                  href: "https://www.linkedin.com/in/jhon-lemon-galin-939826298/",
                },

                {
                  icon: Github,
                  label: "GitHub",
                  color: "#333",
                  href: "https://github.com/L3Mon9",
                },

                {
                  icon: MapPin,
                  label: "Philippines",
                  color: "#10a37f",
                  href: null,
                },
              ].map(({ icon: Icon, label, color, href }) => (

                <motion.a
                  key={label}
                  href={href || "#"}
                  target={href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 group ${
                    isDark
                      ? "bg-dark-700 border border-white/5 hover:border-opacity-40"
                      : "bg-white border border-slate-100 hover:border-slate-300 hover:shadow-md"
                  }`}
                  whileHover={{ x: 4 }}
                >

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>

                  <span
                    className={`font-body text-sm ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {label}
                  </span>

                </motion.a>
              ))}

            </div>

          </motion.div>
        </div>

        {/* RIGHT SIDE - CALENDAR */}
        <GlassCard isDark={isDark} hover={false} delay={0.2}>

          <h3
            className={`font-display font-bold text-lg mb-4 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            📅 Free AI Automation Consultation
          </h3>

          <div className="w-full h-[600px] overflow-hidden rounded-lg">

        <InlineWidget
          url="https://calendly.com/hexiaojian09/30min"
          styles={{
            height: "600px",
          }}
        />

          </div>

        </GlassCard>

      </div>
    </SectionWrapper>
  );
}