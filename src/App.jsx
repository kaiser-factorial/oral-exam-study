import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, ChevronRight, Menu, X, Play, Info, ArrowLeft, Home, Book, FileText } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Quiz, ProofBuilder, Example } from './components/Interactive'

const App = () => {
  const [view, setView] = useState('landing') // 'landing' or 'study'
  const [activeSubject, setActiveSubject] = useState('Analysis I')
  const [activeChapter, setActiveChapter] = useState(1)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const subjects = [
    { id: 'Analysis I', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { id: 'Analysis II', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { id: 'Linear Algebra I', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'Linear Algebra II', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
  ]

  const chapters = {
    'Analysis I': [
      { id: 1, title: 'Real Numbers & Metric Spaces' },
      { id: 2, title: 'Convergence & Sequences' },
      { id: 3, title: 'Continuity' },
      { id: 4, title: 'Differentiation' },
      { id: 5, title: 'Integration' },
      { id: 6, title: 'Series' },
    ]
  }

  const LandingPage = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(63,94,251,0.1),rgba(0,0,0,0))]" />
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8"
      >
        <GraduationCap className="text-white w-10 h-10" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
      >
        Oral Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Portal</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-400 text-lg max-w-xl mb-12 leading-relaxed"
      >
        Prepare for your Masters Oral Examination with curated study modules covering Analysis and Linear Algebra.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl"
      >
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              setActiveSubject(sub.id)
              setView('study')
            }}
            className="group glass-card flex flex-col items-start p-8 text-left hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className={`p-3 rounded-xl ${sub.bg} ${sub.color} mb-4 group-hover:scale-110 transition-transform`}>
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{sub.id}</h3>
            <p className="text-sm text-slate-500">Master core concepts & fundamental proofs.</p>
          </button>
        ))}
      </motion.div>
    </motion.div>
  )

  const StudyView = () => (
    <div className="min-h-screen bg-[#0a0a0c] flex">
      {/* Collapsible Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0 }}
        className="sticky top-0 h-screen border-r border-white/5 bg-[#0d0d11]/50 backdrop-blur-xl overflow-hidden hidden lg:block"
      >
        <div className="w-[320px] p-6 flex flex-col h-full">
          <button 
            onClick={() => setView('landing')}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Hub
          </button>

          <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Chapters</h4>
          <div className="space-y-2 flex-grow overflow-y-auto">
            {chapters[activeSubject]?.map((chap) => (
              <button
                key={chap.id}
                onClick={() => setActiveChapter(chap.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all ${
                  activeChapter === chap.id 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] ${activeChapter === chap.id ? 'bg-indigo-500 text-white' : 'bg-white/5'}`}>
                  {chap.id}
                </span>
                {chap.title}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">NYU</div>
              <div>
                <p className="text-xs font-bold text-white">Tandon MS Math</p>
                <p className="text-[10px] text-slate-500">Oral Exam Prep Site</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Content Area */}
      <main className="flex-grow min-h-screen overflow-y-auto">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white lg:block hidden"
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h2 className="text-sm font-bold text-slate-400 flex items-center gap-2">
              {activeSubject} <ChevronRight size={14} /> Chapter {activeChapter}
            </h2>
          </div>
          
          <div className="flex gap-2">
            {subjects.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSubject(s.id)
                  setActiveChapter(1)
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSubject === s.id ? `${s.bg} ${s.color}` : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {s.id.split(' ')[0]}
              </button>
            ))}
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Chapter Overview Section */}
          <section className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
              <Info size={14} /> Chapter Overview
            </div>
            <h3 className="text-3xl font-black text-white mb-6">
              {chapters[activeSubject]?.find(c => c.id === activeChapter)?.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">In this chapter:</p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500" /> Core Definitions & Notation</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500" /> Fundamental Proof Construction</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Oral Focus:</p>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li className="flex items-center gap-2 text-indigo-300/80 italic font-medium">Be ready to explain edge cases of the Completeness Axiom.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Dynamic Content Loading based on Chapter */}
          {activeSubject === 'Analysis I' && activeChapter === 1 && (
            <div className="space-y-12">
              <section className="glass-card">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  The Real Field <InlineMath math="\mathbb{R}" />
                </h3>
                <div className="prose prose-invert max-w-none space-y-6">
                  <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                    <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                    <p className="text-white font-medium mb-2">The Supremum (Least Upper Bound)</p>
                    <div className="text-slate-300 text-sm">
                      Let <InlineMath math="S \subset \mathbb{R}" /> be a non-empty set. <InlineMath math="L" /> is the supremum of <InlineMath math="S" /> if it is an upper bound and for any <InlineMath math="\epsilon > 0" />, there is an <InlineMath math="x \in S" /> such that <InlineMath math="x > L - \epsilon" />.
                    </div>
                  </div>

                  <Example 
                    title="Non-contained Supremum"
                    context="Consider the open interval S = (0, 1)."
                    question="Find the supremum and determine if it belongs to S."
                    solution="The supremum is 1. Since 1 is not in (0, 1), the supremum is not contained in the set. This illustrates the difference between a supremum and a maximum."
                  />
                </div>
              </section>

              <ProofBuilder 
                title="Heine-Borel Theorem"
                theorem="\text{A subset } K \subset \mathbb{R}^n \text{ is compact if and only if it is closed and bounded.}"
                steps={[
                  "Statement: A subset of \mathbb{R}^n is compact if and only if it is closed and bounded.",
                  "Proof (=>): If K is compact, it is bounded because we can cover it with open balls B(0, n). Since it's compact, a finite subcover exists, hence K is bounded. It is closed because in a Hausdorff space (like \mathbb{R}^n), compact sets are closed.",
                  "Proof (<=): We use the property that a closed subset of a compact set is compact. Since K is bounded, it is contained in some large closed k-cell (hyper-rectangle).",
                  "A k-cell is compact (by the nested interval property or bisection argument).",
                  "Since K is a closed subset of this compact k-cell, K is itself compact. Q.E.D."
                ]}
              />

              <Quiz 
                question="Which property distinguishes a compact set in R^n from a closed set?"
                options={[
                  "It must contain all its limit points.",
                  "It must be bounded.",
                  "It must be an interval.",
                  "It must be non-empty."
                ]}
                correctAnswer={1}
                explanation="While both closed and compact sets contain their limit points, only compact sets are guaranteed to be bounded in R^n (Heine-Borel Theorem)."
              />
            </div>
          )}

          {/* Add more chapters here following the same structure */}
          {activeChapter > 1 && (
             <div className="h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-indigo-500 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Transcribing Chapter {activeChapter}</h3>
                <p className="text-slate-500 text-sm">Organizing proofs and practice problems...</p>
             </div>
          )}
        </div>
      </main>
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? <LandingPage key="landing" /> : <StudyView key="study" />}
    </AnimatePresence>
  )
}

export default App
