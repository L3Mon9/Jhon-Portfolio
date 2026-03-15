import React, { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Tools from './sections/Tools'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import ScanLine from './components/ScanLine'
import ChatWidget from "./components/ChatWidget"


function App() {
  const { isDark, toggle } = useTheme()

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'dark bg-dark-900' : 'bg-slate-50'}`}>
      
      {isDark && <ScanLine />}
      <ParticleBackground isDark={isDark} />
      
      <Navbar isDark={isDark} toggleTheme={toggle} />

      <main>
        <Hero isDark={isDark} />
        <About isDark={isDark} />
        <Services isDark={isDark} />
        <Tools isDark={isDark} />
        <Projects isDark={isDark} />
        <Experience isDark={isDark} />
        <Contact isDark={isDark} />
      </main>

      <Footer isDark={isDark} />

      <ChatWidget />

    </div>
  )
}
export default App
