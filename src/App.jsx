import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, ChevronRight, ChevronDown, Menu, X, Play, Info, ArrowLeft, Home, Book, FileText } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Quiz, ProofBuilder, Example, LatexRenderer } from './components/Interactive'
import { MLDiscussion } from './components/MLDiscussion'

import { HashRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'

const AppContent = () => {
  const navigate = useNavigate()
  const { subjectId, chapterId } = useParams()
  const location = useLocation()
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Auto-scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Sync state with URL
  const view = subjectId ? 'study' : 'landing'
  const activeSubject = subjectId ? decodeURIComponent(subjectId) : 'Analysis I'
  const activeChapter = chapterId ? parseInt(chapterId) : 1

  const subjects = [
    { id: 'Analysis I', color: 'text-[#4295de]', bg: 'bg-[#4295de]/10', border: 'border-[#4295de]/30', desc: 'Metric spaces, sequences, and fundamental integration theory.', short: 'Analysis I' },
    { id: 'Analysis II', color: 'text-[#4295de]', bg: 'bg-[#4295de]/10', border: 'border-[#4295de]/30', desc: 'Measure theory, Lebesgue integration, and $L^p$ spaces.', short: 'Analysis II' },
    { id: 'Linear Algebra I', color: 'text-[#ffd602]', bg: 'bg-[#ffd602]/10', border: 'border-[#ffd602]/30', desc: 'Vector space duality, quotients, and spectral theory.', short: 'Lin Alg I' },
    { id: 'Linear Algebra II', color: 'text-[#d23c72]', bg: 'bg-[#d23c72]/10', border: 'border-[#d23c72]/30', desc: 'Adjoints, Jordan Form, and Multilinear Algebra.', short: 'Lin Alg II' },
    { id: 'Machine Learning', color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', border: 'border-[#10b981]/30', desc: 'SVD, Gradient Descent, and the path to LoRA.', short: 'ML' },
  ]

  const chapters = {
    'Analysis I': [
      { id: 1, title: 'Metric Spaces & Real Numbers' },
      { id: 2, title: 'Convergence & Sequences' },
      { id: 3, title: 'Continuity' },
      { id: 4, title: 'Differentiation' },
      { id: 5, title: 'Integration' },
      { id: 6, title: 'Series' },
    ],
    'Analysis II': [
      { id: 1, title: 'Measurable Spaces' },
      { id: 2, title: 'Lebesgue Outer Measure' },
      { id: 3, title: 'Lebesgue Measure' },
      { id: 4, title: 'General Measures' },
      { id: 5, title: 'Measurable Functions' },
      { id: 6, title: 'Lebesgue Integration' },
      { id: 7, title: 'Convergence Theorems' },
      { id: 8, title: '$L^p$ Spaces' },
    ],
    'Linear Algebra I': [
      { id: 1, title: 'Vector Spaces & Subspaces' },
      { id: 2, title: 'Bases, Dimension & Duality' },
      { id: 3, title: 'Dual Spaces $V^*$' },
      { id: 4, title: 'Quotient Spaces & Direct Sums' },
      { id: 5, title: 'Maps $[T]_\\beta^\\gamma$' },
      { id: 6, title: 'Change of Basis' },
      { id: 7, title: 'Determinants & Multilinearity' },
      { id: 8, title: <LatexRenderer text="Spectral Theory ($p, m$)" inline={true} /> },
    ],
    'Linear Algebra II': [
      { id: 1, title: 'Inner Product Spaces' },
      { id: 2, title: 'Orthogonality & Gram-Schmidt' },
      { id: 3, title: 'The Adjoint $T^*$' },
      { id: 4, title: 'The Spectral Theorem' },
      { id: 5, title: <LatexRenderer text="Jordan Form ($J_k, K_\\lambda$)" inline={true} /> },
      { id: 6, title: 'Singular Value Decomposition' },
      { id: 7, title: 'Bilinear & Quadratic Forms' },
      { id: 8, title: 'Multilinear Algebra & Tensors' },
    ],
    'Machine Learning': [
      { id: 1, title: 'Spectral Theory & PCA' },
      { id: 2, title: 'Low-Rank Approximation' },
      { id: 3, title: 'Latent Factors & Collaborative Filtering' },
      { id: 4, title: 'LoRA: Geometry of Fine-Tuning' },
    ]
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div 
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
                  navigate(`/study/${encodeURIComponent(sub.id)}/1`)
                }}
                className="group glass-card flex flex-col items-start p-8 text-left hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className={`p-3 rounded-xl ${sub.bg} ${sub.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{sub.id}</h3>
                <p className="text-sm text-slate-500">
                  <LatexRenderer text={sub.desc} inline={true} />
                </p>
              </button>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div key="study" className="min-h-screen bg-[#0a0a0c] flex flex-col lg:flex-row">
          {activeSubject !== 'Machine Learning' && (
            <motion.aside 
              initial={false}
              animate={{ width: isSidebarOpen ? 320 : 0 }}
              className="sticky top-0 h-screen border-r border-white/5 bg-[#0d0d11]/50 backdrop-blur-xl overflow-hidden hidden lg:block"
            >
            <div className="w-[320px] p-6 flex flex-col h-full">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors mb-10 text-sm font-bold uppercase tracking-widest"
              >
                <ArrowLeft size={16} /> Back to Hub
              </button>

              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Chapters</h4>
              <div className="space-y-2 flex-grow overflow-y-auto text-left">
                {chapters[activeSubject]?.map((chap) => (
                  <button
                    key={chap.id}
                    onClick={() => navigate(`/study/${encodeURIComponent(activeSubject)}/${chap.id}`)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl text-sm font-medium transition-all text-left ${
                      activeChapter === chap.id 
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-[10px] mt-0.5 ${activeChapter === chap.id ? 'bg-indigo-500 text-white' : 'bg-white/5'}`}>
                      {chap.id}
                    </span>
                    <div className="flex-grow">
                      <LatexRenderer text={chap.title} inline={true} />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">NYU</div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Tandon MS Math</p>
                    <p className="text-[10px] text-slate-500">Oral Exam Prep Site</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
          )}

          <main className="flex-grow min-h-screen overflow-y-auto">
            <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white lg:block hidden"
                >
                  {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
                <h2 className="text-sm font-bold text-slate-400 flex items-center gap-2 text-left">
                  {activeSubject} <ChevronRight size={14} /> 
                  {activeSubject === 'Machine Learning' 
                    ? chapters[activeSubject]?.find(c => c.id === activeChapter)?.title 
                    : `Chapter ${activeChapter}`
                  }
                </h2>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <button className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                    Study Subjects <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-[#16161a] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {subjects.filter(s => s.id !== 'Machine Learning').map(s => (
                      <button
                        key={s.id}
                        onClick={() => navigate(`/study/${encodeURIComponent(s.id)}/1`)}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {s.id}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/study/Machine%20Learning/1')}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeSubject === 'Machine Learning' 
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-slate-500 hover:text-indigo-400'
                  }`}
                >
                  Machine Learning
                </button>
              </div>
            </header>

            <div className="max-w-4xl mx-auto px-8 py-12 text-left">
              {activeSubject !== 'Machine Learning' && (
                <section className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                  <Info size={14} /> Chapter Overview
                </div>
                <h3 className="text-3xl font-black text-white mb-6">
                  {(() => {
                    const chap = chapters[activeSubject]?.find(c => c.id === activeChapter);
                    return <LatexRenderer text={chap?.title || "Loading..."} inline={true} />;
                  })()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">In this chapter:</p>
                    <ul className="text-sm text-slate-400 space-y-2">
                      {activeSubject === 'Analysis I' && activeChapter === 1 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Metric Space Axioms</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Completeness & Heine-Borel</li>
                        </>
                      )}
                      {activeSubject === 'Analysis I' && activeChapter === 2 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Limits of Sequences</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Cauchy Sequences & Completeness</li>
                        </>
                      )}
                      {activeSubject === 'Analysis I' && activeChapter === 3 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Continuity & Function Limits</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Uniform Continuity & Compactness</li>
                        </>
                      )}
                      {activeSubject === 'Analysis I' && activeChapter === 4 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Derivatives & Local Linearization</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> The Mean Value & Taylor Theorems</li>
                        </>
                      )}
                      {activeSubject === 'Analysis I' && activeChapter === 5 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Riemann-Stieltjes Integration</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> The Fundamental Theorem of Calculus</li>
                        </>
                      )}
                      {activeSubject === 'Analysis I' && activeChapter === 6 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Uniform vs. Pointwise Convergence</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Power Series & Interchanging Limits</li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 1 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="$\sigma$-Algebras & Borel Sets" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Definition of a Measure Space" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 2 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Lebesgue Outer Measure $m^*$" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Countable Subadditivity" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 3 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Carathéodory's Criterion" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Regularity of Lebesgue Measure" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 4 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="General Measure Spaces" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Measurability of Functions" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 5 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Simple Functions" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Egorov's & Lusin's Theorems" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 6 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="The Lebesgue Integral" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Integrability in $L^1$" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 7 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="MCT, Fatou, and DCT" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Interchanging Limits & Integrals" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Analysis II' && activeChapter === 8 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="$L^p$ Norms & Convexity" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> <LatexRenderer text="Hölder & Minkowski Inequalities" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 1 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Vector Space Axioms</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Subspace Criteria</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 2 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Bases & Dimension</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> <LatexRenderer text="Dual Spaces $V^*$" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 3 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> <LatexRenderer text="Quotient Spaces $V/W$" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> <LatexRenderer text="Direct Sums $V = U \\oplus W$" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 4 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Kernel & Image</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Rank-Nullity Theorem</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 5 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> <LatexRenderer text="Representation $[T]_\\beta^\\gamma$" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Covariant vs Contravariant</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 6 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Invariant Subspaces</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Projections & Nilpotence</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 7 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Axiomatic Determinants</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Cofactor Expansion</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra I' && activeChapter === 8 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> <LatexRenderer text="Characteristic vs Minimal $p(t), m(t)$" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Cayley-Hamilton Theorem</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 1 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Inner Product Axioms</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Cauchy-Schwarz Inequality</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 2 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Orthogonal Bases (ONBs)</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Gram-Schmidt Process</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 3 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <LatexRenderer text="The Adjoint $T^*$" inline={true} /></li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Normal & Self-Adjoint</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 4 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> The Spectral Theorem</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Normal vs Self-Adjoint</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 5 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Jordan Canonical Form</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> <LatexRenderer text="Generalized Eigenspaces $K_\\lambda$" inline={true} /></li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 6 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Singular Value Decomp (SVD)</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Low-Rank Approximation</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 7 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Bilinear & Quadratic Forms</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Positive Definiteness</li>
                        </>
                      )}
                      {activeSubject === 'Linear Algebra II' && activeChapter === 8 && (
                        <>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Multilinear Algebra</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Tensors & ML</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Oral Focus:</p>
                    <ul className="text-sm text-slate-400 space-y-2">
                      <li className="flex items-center gap-2 text-indigo-300/80 italic font-medium leading-relaxed">
                        {activeSubject === 'Analysis I' && activeChapter === 1 && "Be ready to verify distance axioms for non-standard metrics."}
                        {activeSubject === 'Analysis I' && activeChapter === 2 && "Understand the relationship between Cauchy and Convergent sequences."}
                        {activeSubject === 'Analysis I' && activeChapter === 3 && "Know the topological definition of continuity (inverse images of open sets)."}
                        {activeSubject === 'Analysis I' && activeChapter === 4 && "Master the MVT as the bridge between derivative and function values."}
                        {activeSubject === 'Analysis I' && activeChapter === 5 && "Explain the role of the monotonically increasing integrator alpha."}
                        {activeSubject === 'Analysis I' && activeChapter === 6 && "Justify why uniform convergence is required to preserve continuity/integrability."}
                        
                        {activeSubject === 'Analysis II' && activeChapter === 1 && "Explain why we cannot define a measure on the power set of R."}
                        {activeSubject === 'Analysis II' && activeChapter === 2 && "Understand why outer measure is not countably additive in general."}
                        {activeSubject === 'Analysis II' && activeChapter === 3 && "Master the Carathéodory condition as the bridge to additivity."}
                        {activeSubject === 'Analysis II' && activeChapter === 4 && "Know the definition of measurable functions and their preservation under limits."}
                        {activeSubject === 'Analysis II' && activeChapter === 5 && "Explain how any non-negative measurable function is a limit of simple functions."}
                        {activeSubject === 'Analysis II' && activeChapter === 6 && "Contrast the Lebesgue integral with Riemann—focus on the partitioning of the codomain."}
                        {activeSubject === 'Analysis II' && activeChapter === 7 && "Justify the necessity of a 'dominating function' for DCT to hold."}
                        {activeSubject === 'Analysis II' && activeChapter === 8 && "Explain why we identify functions that are equal almost everywhere."}

                        {activeSubject === 'Linear Algebra I' && activeChapter === 1 && "Master the Subspace Test—always check the zero vector first."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 2 && "Understand that the dual space V* consists of functionals, not vectors."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 3 && "Explain the geometric intuition of a quotient space as 'collapsing' W to zero."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 4 && "Master the Rank-Nullity Theorem—the bridge between the 'lost' and 'gained' dimensions."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 5 && "Explain why vectors are 'contravariant' (transform inversely to the basis) and functionals are 'covariant'."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 6 && "Master the projection theorem: T is a projection iff V is the direct sum of its image and kernel."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 7 && "Explain the geometric interpretation of the determinant as the signed volume scaling factor."}
                        {activeSubject === 'Linear Algebra I' && activeChapter === 8 && "Master the Diagonalization Test: T is diagonalizable iff its minimal polynomial splits into distinct linear factors."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 1 && "Understand that the inner product is the 'compass' that brings geometry to algebra."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 2 && "Explain the Best Approximation Theorem: the closest vector in W to v is its orthogonal projection."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 3 && "Prove why self-adjoint operators must have real eigenvalues: use the definition of the adjoint."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 4 && "Master the Spectral Theorem: why is every real symmetric matrix diagonalizable by an ONB? (Key for PCA)."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 5 && "Explain the structure of the Jordan Canonical Form and why we need generalized eigenvectors."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 6 && "Master the SVD: why is it the 'Universal Decomposition' and how does it drive PCA and Noise Reduction?"}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 7 && "Understand Quadratic Forms: explain Sylvester's Law of Inertia and the signature of a matrix."}
                        {activeSubject === 'Linear Algebra II' && activeChapter === 8 && "Tensors in ML: understand how multidimensional arrays represent higher-order multilinear relationships."}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
              )}

              {activeSubject === 'Machine Learning' && (
                <MLDiscussion chapterId={activeChapter} />
              )}
              {activeSubject === 'Analysis I' && activeChapter === 1 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Metric Spaces & The Real Line
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="The Metric Space $(X, d)$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A **metric space** is a set $X$ with a function $d: X \\times X \\to [0, \\infty)$ such that for all $x, y, z \\in X$:\n\n1. **Positivity**: $d(x, y) \\ge 0$, and $d(x, y) = 0 \\iff x = y$.\n2. **Symmetry**: $d(x, y) = d(y, x)$.\n3. **Triangle Inequality**: $d(x, z) \\le d(x, y) + d(y, z)$."} />
                        </div>
                      </div>

                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Core Axiom</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Completeness of $\mathbb{R}$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"The real numbers $\\mathbb{R}$ are characterized by the **Least Upper Bound Property**: Every non-empty set of real numbers that is bounded above has a least upper bound (supremum) in $\\mathbb{R}$.\n\n*Note: This distinguishes $\\mathbb{R}$ from $\\mathbb{Q}$, as the set $\{x \\in \\mathbb{Q} : x^2 < 2\}$ has no supremum in $\\mathbb{Q}$.*"} />
                        </div>
                      </div>

                      <Example 
                        title="The Archimedean Property"
                        context={"This property states that the natural numbers are not bounded above in $\mathbb{R}$."}
                        question={"Show that for any $x \\in \\mathbb{R}$, there exists an integer $n > x$."}
                        solution={"If this were false, then $x$ would be an upper bound for $\\mathbb{N}$. By the LUB property, $\\mathbb{N}$ would have a supremum $\\alpha$. Then $\\alpha - 1$ is not an upper bound, so there exists $m \\in \\mathbb{N}$ such that $m > \\alpha - 1$. But then $m + 1 > \\alpha$, which contradicts $\\alpha$ being the supremum of $\\mathbb{N}$."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Heine-Borel Theorem"
                    theorem={"A subset $K \\subset \\mathbb{R}^k$ is compact if and only if it is closed and bounded."}
                    steps={[
                      "If $K$ is compact, it is bounded because we can cover it with open balls $B(0, n)$. A finite subcover exists, so $K \\subset B(0, N)$.",
                      "It is closed because in a Hausdorff space (like $\\mathbb{R}^k$), compact sets are closed.",
                      "Conversely, if $K$ is bounded, it is contained in some large $k$-cell (hyper-rectangle) $I$.",
                      "Every $k$-cell is compact (by the bisection and nested interval argument).",
                      "Since $K$ is a closed subset of the compact set $I$, $K$ is itself compact. Q.E.D."
                    ]}
                  />

                  <Quiz 
                    question={"Which axiom of a metric space is violated if we define $d(x, y) = (x - y)^2$ on $\\mathbb{R}$?"}
                    options={[
                      "Non-negativity",
                      "Symmetry",
                      "Triangle Inequality",
                      "None, it is a valid metric"
                    ]}
                    correctAnswer={2}
                    explanation={"Take $x=0, z=2, y=1$. Then $d(0,2)=4$, but $d(0,1)+d(1,2) = 1+1 = 2$. Since $4 \\not\\le 2$, the triangle inequality fails."}
                  />
                </div>
              )}

              {/* Linear Algebra I Content */}
              {activeSubject === 'Linear Algebra I' && activeChapter === 1 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Vector Spaces & Subspaces" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Vector Space over a Field $F$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A **vector space** $V$ over a field $F$ is a set with two operations (Addition and Scalar Multiplication) satisfying 8 axioms, including associativity, commutativity, and distributivity."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Criterion</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="The Subspace Test" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A subset $W \\subset V$ is a **subspace** if it satisfies three conditions:\n\n1. **Zero Vector**: $0_V \\in W$.\n2. **Closure under Addition**: $u, v \\in W \\implies u+v \\in W$.\n3. **Closure under Scalar Multiplication**: $c \\in F, v \\in W \\implies cv \\in W$."} />
                        </div>
                      </div>

                      <Example 
                        title="The Polynomial Space"
                        context={"Let $P_n(F)$ be the set of polynomials of degree at most $n$ with coefficients in $F$."}
                        question={"Is the set of polynomials of *exactly* degree $n$ a subspace?"}
                        solution={"No. The zero polynomial (the zero vector) has degree $-\\infty$ (or is undefined), not degree $n$. Furthermore, adding two polynomials of degree $n$ could result in a lower degree (e.g., $(x^2 + 1) + (-x^2 + x) = x + 1$), violating closure under addition."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which of the following is NOT necessarily a subspace of V?"
                    options={[
                      "The intersection of two subspaces.",
                      "The union of two subspaces.",
                      "The span of a set of vectors.",
                      "The zero vector alone {0}."
                    ]}
                    correctAnswer={1}
                    explanation="The union of two subspaces is only a subspace if one is contained within the other. For example, the union of the x-axis and y-axis in R^2 is not a subspace because (1,0) + (0,1) = (1,1), which is not on either axis."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 2 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Bases, Dimension & Duality" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Bases & Coordinates</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A set of vectors $\{v_1, \\dots, v_n\}$ is a **basis** for $V$ if:\n\n1. They are **linearly independent**.\n2. They **span** $V$.\n\nThe number $n$ is called the **dimension** of $V$. Any vector $v \\in V$ can be uniquely written as $v = \\sum_{i=1}^n c_i v_i$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Concept</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Dual Space $V^*$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"The **dual space** $V^*$ is the set of all linear functionals $f: V \\to F$. If $\{v_1, \\dots, v_n\}$ is a basis for $V$, the **dual basis** $\{f_1, \\dots, f_n\}$ for $V^*$ is defined by:\n\n$$f_i(v_j) = \\delta_{ij} = \\begin{cases} 1 & i=j \\\\ 0 & i\\neq j \\end{cases}$$"} />
                        </div>
                      </div>

                      <Example 
                        title="Dimension of Dual Spaces"
                        context={"Let $V$ be finite-dimensional."}
                        question={"What is the relationship between $\\dim(V)$ and $\\dim(V^*)$?"}
                        solution={"For finite-dimensional spaces, $\\dim(V) = \\dim(V^*)$. This is because for every basis of $V$, we can construct a corresponding dual basis for $V^*$ of the same size. Note: For infinite-dimensional spaces, $V^*$ is strictly larger than $V$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which statement about linear independence is FALSE?"
                    options={[
                      "Any set containing the zero vector is dependent.",
                      "A basis is a maximal linearly independent set.",
                      "Two vectors are dependent if one is a multiple of the other.",
                      "Every infinite-dimensional space lacks a basis."
                    ]}
                    correctAnswer={3}
                    explanation="Every vector space (even infinite-dimensional ones) has a basis. This is proven using Zorn's Lemma (Axiom of Choice). A basis for an infinite-dimensional space is called a Hamel basis."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 3 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Quotient Spaces & Direct Sums $V = U \\oplus W$" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Quotient Space $V/W$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $W$ be a subspace of $V$. The **quotient space** $V/W$ is the set of all cosets $v + W = \{v + w : w \\in W\}$. Addition and scalar multiplication are defined on cosets by:\n\n1. $(v_1 + W) + (v_2 + W) = (v_1 + v_2) + W$\n2. $c(v + W) = (cv) + W$"} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">The Dimension Formula</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $V$ is finite-dimensional, then:\n\n$$\\dim(V/W) = \\dim(V) - \\dim(W)$$\n\nIntuitively, $V/W$ is the space $V$ where everything in $W$ has been 'collapsed' to the zero vector."} />
                        </div>
                      </div>

                      <Example 
                        title="Direct Sum Decompositions"
                        context={"Let $V = \\mathbb{R}^2$. Let $U$ be the x-axis and $W$ be the y-axis."}
                        question={"Is $V = U \\oplus W$?"}
                        solution={"Yes. Every vector $(x, y) \\in \\mathbb{R}^2$ can be uniquely written as $(x, 0) + (0, y)$, where $(x, 0) \\in U$ and $(0, y) \\in W$. Furthermore, $U \\cap W = \\{(0, 0)\\}$, which is the necessary and sufficient condition for a sum to be a direct sum."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which condition is equivalent to V being the direct sum of U and W?"
                    options={[
                      "U and W span V.",
                      "The intersection of U and W is empty.",
                      "Every vector in V has a unique representation u + w.",
                      "dim(U) + dim(W) = dim(V)."
                    ]}
                    correctAnswer={2}
                    explanation="While spanning and dimension counts are related, the defining characteristic of a direct sum is the uniqueness of the decomposition, which is equivalent to saying the intersection is ONLY the zero vector {0}."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 7 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Determinants & Multilinearity" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">The Determinant Function</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"The **determinant** is the unique function $\\det: M_{n \\times n}(F) \\to F$ that is:\n\n1. **Multilinearly** dependent on rows.\n2. **Alternating**: $\\det(A) = 0$ if two rows are identical.\n3. **Normalized**: $\\det(I) = 1$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Computation</h4>
                        <p className="text-white font-medium mb-2">Cofactors & Adjugates</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"The **Laplace Expansion** allows us to compute $\\det(A)$ by expanding along any row or column using **minors** $M_{ij}$ and **cofactors** $C_{ij} = (-1)^{i+j} \\det(M_{ij})$. The inverse of an invertible matrix is given by:\n\n$$A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A)$$"} />
                        </div>
                      </div>

                      <Example 
                        title="Vander Monde Determinants"
                        context={"Consider the matrix $V$ where $V_{ij} = x_i^{j-1}$."}
                        question={"What is the determinant of a $3 \\times 3$ Vander Monde matrix?"}
                        solution={"For $x_1, x_2, x_3$, the determinant is $\\det(V) = (x_2 - x_1)(x_3 - x_1)(x_3 - x_2)$. This shows the determinant is non-zero (the matrix is invertible) if and only if the $x_i$ are distinct."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which property of the determinant is FALSE?"
                    options={[
                      "det(AB) = det(A)det(B)",
                      "det(A + B) = det(A) + det(B)",
                      "det(A^T) = det(A)",
                      "det(cA) = c^n det(A)"
                    ]}
                    correctAnswer={1}
                    explanation="The determinant is NOT additive. For example, let A = I and B = -I. Then det(A) = 1, det(B) = (-1)^n, but det(A+B) = det(0) = 0."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 2 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Orthogonality & Gram-Schmidt" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Orthonormal Bases (ONB)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A set $\\{e_1, \\dots, e_n\\}$ is **orthonormal** if $\\langle e_i, e_j \\rangle = \\delta_{ij}$. \n\n**The Big Benefit**: If $\\beta$ is an ONB, then any vector $v$ can be represented as:\n\n$$v = \\sum_{i=1}^n \\langle v, e_i \\rangle e_i$$\n\nThese coefficients $\\langle v, e_i \\rangle$ are called **Fourier Coefficients**."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Process</h4>
                        <p className="text-white font-medium mb-2">Gram-Schmidt Algorithm</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"To turn a basis $\\{v_1, \\dots, v_n\\}$ into an ONB $\\{e_1, \\dots, e_n\\}$:\n\n1. $u_1 = v_1, \\quad e_1 = u_1 / \\|u_1\\|$\n2. $u_k = v_k - \\sum_{j=1}^{k-1} \\langle v_k, e_j \\rangle e_j$\n3. $e_k = u_k / \\|u_k\\|$\n\nEach $u_k$ is the part of $v_k$ that is **orthogonal** to the space spanned by the previous vectors."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Geometry</h4>
                        <p className="text-white font-medium mb-2">Orthogonal Projections</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $W$ is a subspace with ONB $\\{e_1, \\dots, e_k\\}$, the **projection** of $v$ onto $W$ is:\n\n$$P_W(v) = \\sum_{i=1}^k \\langle v, e_i \\rangle e_i$$\n\n**Best Approximation**: $P_W(v)$ is the unique vector in $W$ that minimizes $\|v - w\|$. I.e., $\|v - P_W(v)\| \\le \|v - w\|$ for all $w \\in W$."} />
                        </div>
                      </div>

                      <Example 
                        title="Projecting onto a Plane"
                        context={"Let $W \\subset \\mathbb{R}^3$ be the plane spanned by $e_1 = (1, 0, 0)$ and $e_2 = (0, 1, 0)$."}
                        question={"Find the projection of $v = (3, 4, 5)$ onto $W$."}
                        solution={"Since $\{e_1, e_2\}$ is already an ONB for $W$:\n\n1. $\\langle v, e_1 \\rangle = 3$\n2. $\\langle v, e_2 \\rangle = 4$\n\nThus, $P_W(v) = 3e_1 + 4e_2 = (3, 4, 0)$. The error vector $v - P_W(v) = (0, 0, 5)$ is orthogonal to the plane."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which theorem states that the sum of the squares of the lengths of the legs of an orthogonal triangle equals the square of the hypotenuse?"
                    options={[
                      "Cauchy-Schwarz Inequality",
                      "The Pythagorean Theorem",
                      "Bessel's Inequality",
                      "The Parallelogram Law"
                    ]}
                    correctAnswer={1}
                    explanation="The Pythagorean Theorem in Inner Product Spaces states: if u is orthogonal to v, then ||u+v||^2 = ||u||^2 + ||v||^2. This is a direct consequence of the inner product axioms."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 4 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="The Spectral Theorem" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Fundamental Results</h4>
                        <p className="text-white font-medium mb-2">Complex vs. Real Versions</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Complex Spectral Theorem**: $T \\in \\mathcal{L}(V)$ is diagonalizable by an ONB iff $T$ is **Normal** ($TT^* = T^*T$).\n2. **Real Spectral Theorem**: $T \\in \\mathcal{L}(V)$ is diagonalizable by an ONB iff $T$ is **Self-Adjoint** ($T = T^*$).\n\n**Significance**: In Data Science, covariance matrices are real symmetric (self-adjoint), meaning they always possess an ONB of eigenvectors. This is the foundation of PCA."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem Detail</h4>
                        <p className="text-white font-medium mb-2">Spectral Decomposition</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $T$ is normal (over $\\mathbb{C}$) or self-adjoint (over $\\mathbb{R}$), then $T$ can be written as:\n\n$$T = \\sum_{i=1}^k \\lambda_i P_i$$\n\nwhere $\\lambda_i$ are distinct eigenvalues and $P_i$ is the orthogonal projection onto the eigenspace $E_{\\lambda_i}$. This 'Spectral Decomposition' allows us to view $T$ as a set of separate scaling operations along orthogonal axes."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Data Science Context</h4>
                        <p className="text-white font-medium mb-2">Principal Component Analysis (PCA)</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"Given a data matrix $X$, the covariance matrix $C = X^T X$ is symmetric. By the Spectral Theorem:\n1. $C$ has real eigenvalues representing the **variance** explained by each direction.\n2. The orthonormal eigenvectors are the **Principal Components**.\n3. Dimensionality reduction is achieved by projecting data onto the eigenvectors with the largest eigenvalues."} />
                        </div>
                      </div>

                      <Example 
                        title="Decomposing a Symmetric Matrix"
                        context={"Let $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$."}
                        question={"Find the spectral decomposition $A = \\lambda_1 P_1 + \\lambda_2 P_2$."}
                        solution={"1. Eigenvalues: $(2-\\lambda)^2 - 1 = 0 \\implies \\lambda = 3, 1$.\n2. For $\\lambda_1 = 3$, $v_1 = (1, 1)^T \\implies e_1 = \\frac{1}{\\sqrt{2}}(1, 1)^T$. $P_1 = e_1 e_1^T = \\frac{1}{2} \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$.\n3. For $\\lambda_2 = 1$, $v_2 = (1, -1)^T \\implies e_2 = \\frac{1}{\\sqrt{2}}(1, -1)^T$. $P_2 = e_2 e_2^T = \\frac{1}{2} \\begin{pmatrix} 1 & -1 \\\\ -1 & 1 \\end{pmatrix}$.\n\nCheck: $3P_1 + 1P_2 = \\begin{pmatrix} 1.5+0.5 & 1.5-0.5 \\\\ 1.5-0.5 & 1.5+0.5 \\end{pmatrix} = A$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Why are eigenvectors of a self-adjoint operator corresponding to distinct eigenvalues always orthogonal?"
                    options={[
                      "By the definition of the inner product.",
                      "Because the eigenvalues are real.",
                      "Because <Tv, w> = <v, Tw> leads to (λ - μ)<v, w> = 0.",
                      "Because they span the whole space."
                    ]}
                    correctAnswer={2}
                    explanation="This is the 'Heart of the Spectral Theorem.' Since <Tv, w> = <v, Tw>, we have λ<v, w> = μ<v, w>, which implies (λ - μ)<v, w> = 0. If λ ≠ μ, then <v, w> must be 0."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 8 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Multilinear Algebra & Tensors" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definitions</h4>
                        <p className="text-white font-medium mb-2">Multilinear Maps & Tensor Products</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Multilinear Map**: A function $f: V_1 \\times \\dots \\times V_k \\to F$ linear in each argument.\n2. **Tensor Product $V \\otimes W$**: The space that 'linearizes' bilinear maps. For any bilinear map $B: V \\times W \\to U$, there exists a unique linear map $L: V \\otimes W \\to U$ such that $B(v, w) = L(v \\otimes w)$.\n3. **Tensor Rank (Math)**: The number of vector spaces being producted (e.g., $V \\otimes W$ is rank 2)."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Machine Learning Context</h4>
                        <p className="text-white font-medium mb-2">Tensors as Data Containers</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"In ML (PyTorch/TF), a 'tensor' is a multidimensional array. The **order** of the tensor matches the mathematical rank:\n- **Rank 0**: Scalar (e.g., Loss value)\n- **Rank 1**: Vector (e.g., Bias vector)\n- **Rank 2**: Matrix (e.g., Weight matrix)\n- **Rank 3**: Image (Channels, Height, Width)\n- **Rank 4**: Batch of Images (Batch size, Channels, Height, Width)"} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Core Operation</h4>
                        <p className="text-white font-medium mb-2">Contraction & Einstein Summation</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"**Contraction** is the generalization of the trace or dot product. In ML, this is often written using **einsum** notation:\n`z = torch.einsum('ijk,lkm->ijlm', A, B)`\nThis multilinear operation sums over shared indices, effectively 'reducing' the rank while preserving relationships between dimensions."} />
                        </div>
                      </div>

                      <Example 
                        title="Tensor Contraction (Outer Product)"
                        context={"Let $u = (1, 2)$ and $v = (3, 4, 5)$."}
                        question={"Find the tensor product $u \\otimes v$."}
                        solution={"The tensor product is the outer product matrix:\n$$u \\otimes v = \\begin{pmatrix} 1(3) & 1(4) & 1(5) \\\\ 2(3) & 2(4) & 2(5) \\end{pmatrix} = \\begin{pmatrix} 3 & 4 & 5 \\\\ 6 & 8 & 10 \\end{pmatrix}$$\nThis rank-2 tensor captures all possible interactions between the features in $u$ and $v$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="What is the universal property of the tensor product?"
                    options={[
                      "It makes every vector space finite-dimensional.",
                      "It converts any multilinear map into a unique linear map on the tensor space.",
                      "It ensures that the determinant is always 1.",
                      "It is the same as the direct sum V + W."
                    ]}
                    correctAnswer={1}
                    explanation="The entire point of tensors is the Universal Property: it allows us to study complex multilinear interactions (like those in Deep Learning) using the familiar tools of linear algebra (linear maps, matrices)."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 7 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Bilinear & Quadratic Forms" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definitions</h4>
                        <p className="text-white font-medium mb-2">Linearity in Two Slots</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Bilinear Form**: A mapping $H: V \\times V \\to F$ that is linear in both arguments.\n2. **Symmetric Form**: $H(u, v) = H(v, u)$. These are represented by symmetric matrices $A$.\n3. **Quadratic Form**: The associated function $Q(v) = H(v, v) = v^T A v$. \n\n**Oral Tip**: While a linear map transforms space, a bilinear form measures it. Under basis change $P$, the matrix $A$ transforms as $P^T A P$ (Congruence), not $P^{-1} A P$ (Similarity)."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Classification</h4>
                        <p className="text-white font-medium mb-2">Positive Definiteness & Inertia</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A symmetric form is:\n- **Positive Definite**: $Q(v) > 0$ for all $v \\neq 0$. (All eigenvalues $> 0$).\n- **Negative Definite**: $Q(v) < 0$ for all $v \\neq 0$. (All eigenvalues $< 0$).\n- **Indefinite**: $Q(v)$ takes both positive and negative values.\n\n**Sylvester’s Law of Inertia**: The number of positive, negative, and zero eigenvalues (the **signature**) is an invariant under congruence."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Optimization Context</h4>
                        <p className="text-white font-medium mb-2">The Hessian Matrix</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"In multivariable calculus, the **Hessian matrix** of second derivatives defines a local quadratic form. If the Hessian is positive definite at a critical point, the function has a local minimum (a 'bowl'). This is the basis for the Second Derivative Test in high dimensions."} />
                        </div>
                      </div>

                      <Example 
                        title="Classifying a Quadratic Form"
                        context={"Let $Q(x, y) = 2x^2 + 4xy + 5y^2$."}
                        question={"Write the symmetric matrix A and determine if Q is positive definite."}
                        solution={"1. Matrix $A = \\begin{pmatrix} 2 & 2 \\\\ 2 & 5 \\end{pmatrix}$. \n2. Eigenvalues: $(2-\\lambda)(5-\\lambda) - 4 = 0 \\implies \\lambda^2 - 7\\lambda + 6 = 0$.\n3. $\\lambda = 6, 1$. \n\nSince both eigenvalues are positive, the form is **Positive Definite**. Geometrically, this landscape is an upward-opening paraboloid."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="How does the matrix A of a bilinear form change when we change the basis by matrix P?"
                    options={[
                      "A -> P^-1 A P",
                      "A -> P^T A P",
                      "A -> P A P^T",
                      "A -> det(P) A"
                    ]}
                    correctAnswer={1}
                    explanation="This is a classic trap! Operators transform via similarity (P^-1 A P), but Bilinear Forms transform via congruence (P^T A P). This is because the form acts on two vectors, each of which is transformed by P."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 6 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Singular Value Decomposition (SVD)" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">The Theorem</h4>
                        <p className="text-white font-medium mb-2">Universal Matrix Factorization</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For any matrix $A \\in \\mathbb{C}^{m \\times n}$, there exists a decomposition $A = U \\Sigma V^*$, where:\n\n1. **$V \\in \\mathbb{C}^{n \\times n}$**: Unitary matrix of **Right Singular Vectors** (eigenvectors of $A^* A$).\n2. **$U \\in \\mathbb{C}^{m \\times m}$**: Unitary matrix of **Left Singular Vectors** (eigenvectors of $AA^*$).\n3. **$\\Sigma \\in \\mathbb{R}^{m \\times n}$**: Diagonal matrix of **Singular Values** $\\sigma_i \\ge 0$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Data Science Context</h4>
                        <p className="text-white font-medium mb-2">Low-Rank Approximation & Noise Reduction</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"**Eckart-Young Theorem**: The best rank-$k$ approximation of $A$ (in Frobenius norm) is $A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^*$. \n\n**Application**: In Data Science, we drop the 'noise' (small singular values) to capture the 'signal' (large singular values). This is the exact mechanism behind **Image Compression** and **Latent Semantic Analysis**."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Oral mastery</h4>
                        <p className="text-white font-medium mb-2">SVD vs. Eigen-decomposition</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"**Oral Tip**: Unlike eigen-decomposition, SVD is **always** possible for **any** matrix (even non-square ones). It uses two different bases ($U$ and $V$) to account for maps between different spaces. If $A$ is symmetric, then $U = V$ and singular values are the absolute values of eigenvalues."} />
                        </div>
                      </div>

                      <Example 
                        title="SVD of a 2x1 Matrix"
                        context={"Let $A = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$."}
                        question={"Find the SVD $A = U\\Sigma V^*$."}
                        solution={"1. $A^* A = (3, 4) \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} = 25$. Eigenvalue is 25, so $\\sigma_1 = 5$. \n2. $V$ is the $1 \\times 1$ matrix $(1)$.\n3. $AA^* = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}(3, 4) = \\begin{pmatrix} 9 & 12 \\\\ 12 & 16 \\end{pmatrix}$. \n4. Normalizing $A(1) = (3, 4)^T$ gives $u_1 = (0.6, 0.8)^T$. \n5. $A = \\begin{pmatrix} 0.6 & -0.8 \\\\ 0.8 & 0.6 \\end{pmatrix} \\begin{pmatrix} 5 \\\\ 0 \\end{pmatrix} (1) = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which theorem guarantees that SVD provides the best low-rank approximation?"
                    options={[
                      "The Spectral Theorem",
                      "The Eckart-Young-Mirsky Theorem",
                      "The Rank-Nullity Theorem",
                      "The Cayley-Hamilton Theorem"
                    ]}
                    correctAnswer={1}
                    explanation="The Eckart-Young theorem is the backbone of data compression. it states that the truncated SVD is the closest lower-rank matrix to the original data."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 5 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Jordan Form ($J_k, K_\\lambda$)" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Core Concept</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Generalized Eigenspaces $K_\\lambda$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"When $am(\\lambda) > gm(\\lambda)$, the operator $T$ is missing eigenvectors. We expand the search to **generalized eigenvectors**:\n\n$$K_\\lambda = \\{v \\in V : (T - \\lambda I)^k v = 0 \\text{ for some } k \\ge 1\\}$$\n\n**Primary Decomposition Theorem**: If $p(t)$ splits, then $V$ is the direct sum of its generalized eigenspaces: $V = K_{\\lambda_1} \\oplus \\dots \\oplus K_{\\lambda_m}$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Matrix Structure</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="The Jordan Block $J_k(\\lambda)$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A **Jordan block** of size $k$ is a $k \\times k$ matrix of the form:\n\n$$J_k(\\lambda) = \\begin{pmatrix} \\lambda & 1 & 0 & \\dots \\\\ 0 & \\lambda & 1 & \\dots \\\\ \\vdots & \\vdots & \\ddots & 1 \\\\ 0 & 0 & \\dots & \\lambda \\end{pmatrix}$$\n\n**Theorem**: Every operator $T$ (on a space where $p(t)$ splits) has a basis in which its matrix is a block-diagonal collection of Jordan blocks. This is the **Jordan Canonical Form**."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Oral Focus</h4>
                        <p className="text-white font-medium mb-2">Why JCF Matters</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"The JCF is the 'simplest' possible representation for *any* linear operator. It decomposes the operator into a diagonalizable part (the $\\lambda$ diagonal) and a nilpotent part (the $1$s on the super-diagonal). This is critical for solving systems of differential equations $\\dot{x} = Ax$ where $A$ is not diagonalizable."} />
                        </div>
                      </div>

                      <Example 
                        title="JCF of a Shear Matrix"
                        context={"Let $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$."}
                        question={"Find the JCF and the generalized eigenspace."}
                        solution={"1. Characteristic polynomial $p(t) = (t-3)^2$. Eigenvalue $\\lambda = 3$.\n2. $(A-3I) = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$. Kernel is spanned by $e_1 = (1, 0)^T$.\n3. Since $gm(3) = 1 < am(3) = 2$, $A$ is not diagonalizable.\n4. $(A-3I)^2 = 0$. Thus $K_3 = \\mathbb{R}^2$.\n5. The JCF is simply $J_2(3) = \\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$ itself."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="What is the size of the largest Jordan block for eigenvalue λ related to?"
                    options={[
                      "The algebraic multiplicity am(λ).",
                      "The geometric multiplicity gm(λ).",
                      "The multiplicity of λ as a root of the minimal polynomial m(t).",
                      "The dimension of the whole space V."
                    ]}
                    correctAnswer={2}
                    explanation="This is a deep fact: the size of the largest Jordan block for λ is exactly the multiplicity of λ in the minimal polynomial m(t). For example, if m(t) = (t-3)^2, the largest block for λ=3 is 2x2."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 3 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="The Adjoint $T^*$" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Fundamental Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="The Adjoint Operator $T^*$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For $T \\in \\mathcal{L}(V)$, the **adjoint** $T^*$ is the unique operator such that:\n\n$$\\langle T(v), w \\rangle = \\langle v, T^*(w) \\rangle \\quad \\forall v, w \\in V$$\n\n**Key Properties**:\n1. $(S+T)^* = S^* + T^*$\n2. $(cT)^* = \\overline{c}T^*$\n3. $(T^*)^* = T$\n4. $(ST)^* = T^*S^*$"} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Operator Hierarchy</h4>
                        <p className="text-white font-medium mb-2">Self-Adjoint, Unitary, & Normal</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Self-Adjoint (Hermitian)**: $T = T^*$. (Matrix is conjugate transpose $A = A^H$).\n2. **Unitary**: $T^* = T^{-1}$. (Preserves inner products: $\\langle Tv, Tw \\rangle = \\langle v, w \\rangle$).\n3. **Normal**: $TT^* = T^*T$. (Includes all self-adjoint and unitary operators)."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Oral Proof Mastery</h4>
                        <p className="text-white font-medium mb-2">Real Eigenvalues of Self-Adjoint Operators</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"**Theorem**: If $T$ is self-adjoint, every eigenvalue $\\lambda \\in \\mathbb{R}$.\n\n**Proof Sketch**:\nSuppose $Tv = \\lambda v$ with $v \\neq 0$. Then:\n$$\\lambda \\langle v, v \\rangle = \\langle \\lambda v, v \\rangle = \\langle Tv, v \\rangle$$\nSince $T$ is self-adjoint:\n$$\\langle Tv, v \\rangle = \\langle v, Tv \\rangle = \\langle v, \\lambda v \\rangle = \\overline{\\lambda} \\langle v, v \\rangle$$\nThus $\\lambda \\langle v, v \\rangle = \\overline{\\lambda} \\langle v, v \\rangle$. Since $\\langle v, v \\rangle > 0$, we must have $\\lambda = \\overline{\\lambda}$, which implies $\\lambda \\in \\mathbb{R}$."} />
                        </div>
                      </div>

                      <Example 
                        title="Adjoint of a Matrix"
                        context={"Let $A = \\begin{pmatrix} i & 2 \\\\ 1 & -i \\end{pmatrix}$ act on $\\mathbb{C}^2$ with standard inner product."}
                        question={"Find the adjoint $A^*$."}
                        solution={"The adjoint is the conjugate transpose $A^H$:\n\n1. Transpose: $\\begin{pmatrix} i & 1 \\\\ 2 & -i \\end{pmatrix}$\n2. Conjugate: $\\begin{pmatrix} -i & 1 \\\\ 2 & i \\end{pmatrix}$\n\nCheck: $\\langle Av, w \\rangle = (Av)^H w = v^H A^H w = \\langle v, A^* w \\rangle$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which class of operators is the broadest?"
                    options={[
                      "Self-Adjoint",
                      "Unitary",
                      "Normal",
                      "Orthogonal"
                    ]}
                    correctAnswer={2}
                    explanation="An operator is Normal if TT* = T*T. This category includes all Self-Adjoint operators (where T = T*) and all Unitary operators (where T* = T^-1)."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra II' && activeChapter === 1 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Inner Product Spaces" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Inner Product over $F$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"An **inner product** on $V$ (where $F = \\mathbb{R}$ or $\\mathbb{C}$) is a function $\\langle \\cdot, \\cdot \\rangle: V \\times V \\to F$ satisfying:\n\n1. **Conjugate Symmetry**: $\\langle u, v \\rangle = \\overline{\\langle v, u \\rangle}$.\n2. **Linearity (1st slot)**: $\\langle au + v, w \\rangle = a\\langle u, w \\rangle + \\langle v, w \\rangle$.\n3. **Positive Definiteness**: $\\langle v, v \\rangle \\ge 0$, and $\\langle v, v \\rangle = 0 \\iff v = 0$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Inequality</h4>
                        <p className="text-white font-medium mb-2">Cauchy-Schwarz Inequality</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For any $u, v \\in V$:\n\n$$|\\langle u, v \\rangle|^2 \\le \\langle u, u \\rangle \\langle v, v \\rangle$$\n\nEquality holds if and only if $u$ and $v$ are linearly dependent. This inequality allows us to define the **angle** $\\theta$ between vectors via $\\cos \\theta = \\frac{\\langle u, v \\rangle}{\\|u\\| \\|v\\|}$ in real spaces."} />
                        </div>
                      </div>

                      <Example 
                        title="The L2 Inner Product"
                        context={"Let $V = C([0, 1])$ be the space of continuous real-valued functions."}
                        question={"Verify if $\\langle f, g \\rangle = \\int_0^1 f(x)g(x) dx$ is an inner product."}
                        solution={"Yes. Linearity follows from properties of the integral. Symmetry is obvious as $fg = gf$. Positive definiteness holds because $\\int f^2 \\ge 0$, and for continuous functions, $\\int f^2 = 0$ implies $f(x) = 0$ everywhere."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="Which of the following is NOT a consequence of the inner product axioms?"
                    options={[
                      "The Triangle Inequality: ||u+v|| <= ||u|| + ||v||",
                      "The Pythagorean Theorem for orthogonal vectors.",
                      "The Parallelogram Law: ||u+v||^2 + ||u-v||^2 = 2(||u||^2 + ||v||^2)",
                      "The determinant is always non-zero."
                    ]}
                    correctAnswer={3}
                    explanation="While inner products define norms and geometry (Triangle Inequality, Pythagorean, Parallelogram Law), they do not place restrictions on the determinant of arbitrary operators. However, the determinant of the *Gram matrix* is related to the inner product."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 8 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Spectral Theory ($p(t), m(t)$)" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Core Definitions</h4>
                        <p className="text-white font-medium mb-2">Eigenvalues & Polynomials</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Characteristic Polynomial**: $p(t) = \\det(T - tI)$. The roots of $p(t)$ are the eigenvalues $\\lambda_i$.\n2. **Minimal Polynomial**: The unique monic polynomial $m(t)$ of smallest degree such that $m(T) = 0$.\n3. **Algebraic Multiplicity ($am$ )**: The multiplicity of $\\lambda$ as a root of $p(t)$.\n4. **Geometric Multiplicity ($gm$ )**: The dimension of the eigenspace $E_\\lambda = \\ker(T - \\lambda I)$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Fundamental Theorem</h4>
                        <p className="text-white font-medium mb-2">Cayley-Hamilton Theorem</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Every linear operator $T$ satisfies its own characteristic equation: $p(T) = 0$.\n\n**Consequence**: The minimal polynomial $m(t)$ always divides the characteristic polynomial $p(t)$. Furthermore, $m(t)$ and $p(t)$ have the exact same roots (the eigenvalues), though their multiplicities may differ."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Diagonalizability</h4>
                        <p className="text-white font-medium mb-2">The Diagonalization Test</p>
                        <div className="text-slate-300 text-sm leading-relaxed">
                          <LatexRenderer text={"An operator $T \\in \\mathcal{L}(V)$ is **diagonalizable** if and only if any of the following equivalent conditions hold:\n\n1. There exists a basis for $V$ consisting of eigenvectors of $T$.\n2. The characteristic polynomial $p(t)$ splits over $F$, AND for every eigenvalue, $am(\\lambda) = gm(\\lambda)$.\n3. The **minimal polynomial** $m(t)$ splits into **distinct linear factors**: $m(t) = (t-\\lambda_1)\\dots(t-\\lambda_k)$ with no repeated roots."} />
                        </div>
                      </div>

                      <Example 
                        title="Minimal vs Characteristic"
                        context={"Let $A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}$."}
                        question={"Find the characteristic and minimal polynomials. Is A diagonalizable?"}
                        solution={"1. $p(t) = \\det(A - tI) = (2-t)^3$. Eigenvalue $\\lambda = 2$ with $am(2) = 3$.\n2. $(A - 2I) = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\neq 0$. Thus $m(t) \\neq (t-2)$.\n3. $(A - 2I)^2 = 0$. Thus $m(t) = (t-2)^2$.\n\nSince $m(t)$ has a **repeated root** (multiplicity 2), $A$ is **NOT** diagonalizable. Geometrically, $gm(2) = \\dim(\\ker(A-2I)) = 2$, which is less than $am(2) = 3$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="What is the relationship between the minimal polynomial m(t) and diagonalizability?"
                    options={[
                      "m(t) must have the same degree as p(t).",
                      "m(t) must have no roots.",
                      "m(t) must be a product of distinct linear factors.",
                      "m(t) must be equal to (t - λ) for some λ."
                    ]}
                    correctAnswer={2}
                    explanation="The distinct linear factor criterion is the most powerful diagnostic for diagonalization. If any root of the minimal polynomial is repeated (e.g., (t-2)^2), the operator cannot be diagonalized."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 6 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Operators & Invariance" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Invariant Subspaces</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A subspace $W \\subset V$ is **invariant** under $T \\in \\mathcal{L}(V)$ if $T(w) \\in W$ for all $w \\in W$. \n\nThis allow us to define the **restriction** $T|_W: W \\to W$, which is a linear operator on the smaller space $W$. If $V = U \\oplus W$ where both are invariant, the matrix of $T$ becomes **block diagonal**."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Structure</h4>
                        <p className="text-white font-medium mb-2">Projections & Nilpotence</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Projection (Idempotent)**: $T^2 = T$. Every projection corresponds to a direct sum $V = \\text{im}(T) \\oplus \\text{ker}(T)$.\n2. **Nilpotent**: $T^k = 0$ for some $k \\in \\mathbb{N}$. The smallest such $k$ is the **degree of nilpotence**."} />
                        </div>
                      </div>

                      <Example 
                        title="Cyclic Vectors"
                        context={"Let $T$ be nilpotent of degree $k$."}
                        question={"What can we say about the set $\{v, T(v), T^2(v), \\dots, T^{k-1}(v)\}$ for some $v$ such that $T^{k-1}(v) \\neq 0$?"}
                        solution={"This set is **linearly independent**. It forms a basis for a $k$-dimensional invariant subspace. In the context of Jordan Form, this corresponds to a single Jordan block of size $k$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="If T is a projection, what are its only possible eigenvalues?"
                    options={[
                      "0 and 1",
                      "Any real number",
                      "1 only",
                      "No eigenvalues"
                    ]}
                    correctAnswer={0}
                    explanation="If Tv = λv, then T²v = λ²v. Since T² = T, we have λ²v = λv, which implies λ(λ-1)v = 0. Since v ≠ 0, λ must be 0 or 1."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 5 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Matrix Representation $[T]_\\beta^\\gamma$" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Representing a Linear Map</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $T: V \\to W$ be linear, with bases $\\beta = \\{v_1, \\dots, v_n\\}$ and $\\gamma = \\{w_1, \\dots, w_m\\}$. The **matrix representation** of $T$ is the $m \\times n$ matrix $A = [T]_\\beta^\\gamma$ whose $j$-th column is the coordinate vector $[T(v_j)]_\\gamma$:\n\n$$T(v_j) = \\sum_{i=1}^m A_{ij} w_i$$"} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Concept</h4>
                        <p className="text-white font-medium mb-2">Covariant vs. Contravariant</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Contravariant Vectors**: Components of vectors $v \\in V$ transform by the inverse of the basis change matrix. They 'counter-vary' the basis.\n2. **Covariant Vectors**: Components of dual vectors (functionals) $f \\in V^*$ transform by the same matrix as the basis change. They 'co-vary' with the basis."} />
                        </div>
                      </div>

                      <Example 
                        title="Differentiation Matrix"
                        context={"Let $D: P_2(\\mathbb{R}) \\to P_1(\\mathbb{R})$ with standard bases $\\beta = \\{1, x, x^2\\}$ and $\\gamma = \\{1, x\\}$."}
                        question={"Find $[D]_\\beta^\\gamma$."}
                        solution={"1. $D(1) = 0 = 0(1) + 0(x)$. Col 1: $[0, 0]^T$.\n2. $D(x) = 1 = 1(1) + 0(x)$. Col 2: $[1, 0]^T$.\n3. $D(x^2) = 2x = 0(1) + 2(x)$. Col 3: $[0, 2]^T$.\n\nThus, $[D]_\\beta^\\gamma = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}$."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="If P is the change of basis matrix from basis B to B', how do vector components [v]_B transform?"
                    options={[
                      "[v]_{B'} = P [v]_B",
                      "[v]_{B'} = P^{-1} [v]_B",
                      "[v]_{B'} = P^T [v]_B",
                      "[v]_{B'} = [v]_B"
                    ]}
                    correctAnswer={1}
                    explanation="Vector components are contravariant. If the basis vectors multiply by P, the components must multiply by P^-1 to keep the vector v = sum c_i v_i invariant."
                  />
                </div>
              )}

              {activeSubject === 'Linear Algebra I' && activeChapter === 4 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="Linear Transformations & Rank" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Kernel & Image</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For a linear map $T: V \\to W$:\n\n1. **Kernel (Null Space)**: $\\text{ker}(T) = \\{v \\in V : T(v) = 0_W\\}$.\n2. **Image (Range)**: $\\text{im}(T) = \\{T(v) : v \\in V\\}$.\n\n$\\text{ker}(T)$ is a subspace of $V$, and $\\text{im}(T)$ is a subspace of $W$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Fundamental Theorem</h4>
                        <p className="text-white font-medium mb-2">Rank-Nullity Theorem</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $V$ is finite-dimensional and $T: V \\to W$ is linear, then:\n\n$$\\dim(\\text{ker}(T)) + \\dim(\\text{im}(T)) = \\dim(V)$$\n\nThe dimension of the image is called the **rank** of $T$, and the dimension of the kernel is the **nullity**."} />
                        </div>
                      </div>

                      <Example 
                        title="The Differentiation Map"
                        context={"Let $D: P_3(\\mathbb{R}) \\to P_2(\\mathbb{R})$ be the differentiation operator $D(p) = p'$."}
                        question={"What is the nullity and rank of $D$?"}
                        solution={"The kernel of $D$ is the set of constant polynomials (degree 0), which has dimension 1 (basis $\{1\}$). Thus, $\\text{nullity}(D) = 1$. Since $\\dim(P_3) = 4$, by the Rank-Nullity Theorem, $\\text{rank}(D) = 4 - 1 = 3$. This matches the fact that the image of $D$ is all of $P_2$, which has dimension 3."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="If T: V -> W is an isomorphism, which of the following is NOT true?"
                    options={[
                      "ker(T) = {0}.",
                      "im(T) = W.",
                      "dim(V) = dim(W).",
                      "T maps every vector to its dual."
                    ]}
                    correctAnswer={3}
                    explanation="An isomorphism is a bijective linear map. While T induces a relationship with the dual space, its primary definition is being 1-1 (ker=0) and onto (im=W), which implies the dimensions must match."
                  />
                </div>
              )}

              {activeSubject === 'Analysis I' && activeChapter === 2 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Convergence & Sequences
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Convergence in Metric Spaces</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A sequence $\{p_n\}$ in a metric space $(X, d)$ is said to **converge** if there exists $p \\in X$ such that for every $\\epsilon > 0$, there is an integer $N$ such that $n \\ge N$ implies $d(p_n, p) < \\epsilon$.\n\nWe call $p$ the **limit** of $\{p_n\}$, and write $p_n \\to p$ or $\\lim_{n \\to \\infty} p_n = p$."} />
                        </div>
                      </div>

                      <Example 
                        title="Convergence to the Boundary"
                        context={"Let $X = (0, 1]$ with the Euclidean metric. Consider the sequence $p_n = 1/n$."}
                        question={"Does this sequence converge in $X$?"}
                        solution={"No. While the sequence $1/n$ converges to $0$ in $\\mathbb{R}$, the point $0$ is not in the set $X = (0, 1]$. Therefore, the sequence does not converge in the metric space $X$. This highlights that convergence depends on the **underlying space** $X$, not just the metric."}
                      />

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Cauchy Sequences & Completeness</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A sequence $\{p_n\}$ is a **Cauchy sequence** if for every $\\epsilon > 0$, there exists $N$ such that $n, m \\ge N$ implies $d(p_n, p_m) < \\epsilon$.\n\nA metric space $X$ is **complete** if every Cauchy sequence in $X$ converges to a point in $X$. Example: $\\mathbb{R}$ is complete (the Cantor Intersection Theorem or Nested Interval Property), but $\\mathbb{Q}$ is not."} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Uniqueness of Limits"
                    theorem={"A sequence in a metric space can have at most one limit."}
                    steps={[
                      "Suppose $p_n \\to p$ and $p_n \\to q$ where $p \\ne q$.",
                      "Then $d(p, q) > 0$. Let $\\epsilon = d(p, q) / 2$.",
                      "Since $p_n \\to p$, there exists $N_1$ such that $d(p_n, p) < \\epsilon$ for all $n \\ge N_1$.",
                      "Since $p_n \\to q$, there exists $N_2$ such that $d(p_n, q) < \\epsilon$ for all $n \\ge N_2$.",
                      "For $n \\ge \\max(N_1, N_2)$, the triangle inequality gives: $d(p, q) \\le d(p, p_n) + d(p_n, q) < \\epsilon + \\epsilon = d(p, q)$.",
                      "This results in the contradiction $d(p, q) < d(p, q)$. Thus $p = q$. Q.E.D."
                    ]}
                  />

                  <Quiz 
                    question="Which of the following is a necessary condition for a sequence to be convergent in a metric space?"
                    options={[
                      "It must be monotonic.",
                      "It must be a Cauchy sequence.",
                      "The space X must be compact.",
                      "The sequence must contain 0."
                    ]}
                    correctAnswer={1}
                    explanation="Every convergent sequence is a Cauchy sequence. The converse (every Cauchy sequence converges) is only true in complete metric spaces."
                  />
                </div>
              )}

              {activeSubject === 'Analysis I' && activeChapter === 3 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Continuity
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Continuous Functions</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $X$ and $Y$ be metric spaces. A function $f: X \\to Y$ is **continuous** at $p \\in X$ if for every $\\epsilon > 0$, there exists $\\delta > 0$ such that:\n\n$$d_X(x, p) < \\delta \\implies d_Y(f(x), f(p)) < \\epsilon$$\n\nEquivalently, $f$ is continuous if for every open set $V \\subset Y$, the inverse image $f^{-1}(V)$ is open in $X$."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Continuity and Compactness</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $f: X \\to Y$ is continuous and $K \\subset X$ is compact, then $f(K)$ is compact. \n\n**Corollary (Extreme Value Theorem):** A continuous real-valued function on a compact set attains its maximum and minimum."} />
                        </div>
                      </div>

                      <Example 
                        title="Uniform Continuity"
                        context={"Consider $f(x) = 1/x$ on the interval $(0, 1]$."}
                        question={"Is $f$ uniformly continuous on this interval?"}
                        solution={"No. As $x \\to 0$, the function grows without bound, and for a fixed $\\epsilon$, the required $\\delta$ becomes arbitrarily small. However, if we restrict $f$ to a **compact** interval $[a, 1]$ with $a > 0$, it becomes uniformly continuous."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Uniform Continuity on Compact Sets"
                    theorem={"If $f: X \\to Y$ is continuous and $X$ is compact, then $f$ is uniformly continuous on $X$."}
                    steps={[
                      "Let $\\epsilon > 0$. Since $f$ is continuous, for each $p \\in X$, there is a $\\delta_p > 0$ such that $d(x, p) < \\delta_p \\implies d(f(x), f(p)) < \\epsilon/2$.",
                      "Consider the open balls $B(p, \\delta_p/2)$. These cover $X$.",
                      "Since $X$ is compact, there is a finite subcover $B(p_1, \\delta_1/2), \\dots, B(p_k, \\delta_k/2)$.",
                      "Let $\\delta = \\min(\\delta_1/2, \\dots, \\delta_k/2)$.",
                      "If $d(p, q) < \\delta$, then $p$ is in some $B(p_i, \\delta_i/2)$. Then $d(p, p_i) < \\delta_i/2$.",
                      "By triangle inequality, $d(q, p_i) \\le d(q, p) + d(p, p_i) < \\delta + \\delta_i/2 \\le \\delta_i$.",
                      "Thus $d(f(p), f(p_i)) < \\epsilon/2$ and $d(f(q), f(p_i)) < \\epsilon/2$.",
                      "Finally, $d(f(p), f(q)) \\le d(f(p), f(p_i)) + d(f(p_i), f(q)) < \\epsilon$. Q.E.D."
                    ]}
                  />

                  <Quiz 
                    question="Which of the following implies that a function $f: X \to Y$ is continuous?"
                    options={[
                      "The image of every open set is open.",
                      "The inverse image of every closed set is closed.",
                      "The function is monotonic.",
                      "The domain X is finite."
                    ]}
                    correctAnswer={1}
                    explanation="A standard topological characterization of continuity is that the inverse image of every open set is open. By taking complements, this is equivalent to saying the inverse image of every closed set is closed."
                  />
                </div>
              )}

              {activeSubject === 'Analysis I' && activeChapter === 4 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Differentiation
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">The Derivative</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $f: [a, b] \\to \\mathbb{R}$. For any $x \\in [a, b]$, we define the derivative $f'(x)$ as:\n\n$$f'(x) = \\lim_{t \\to x} \\frac{f(t) - f(x)}{t - x}$$\n\nprovided the limit exists. If $f$ is differentiable on $(a, b)$ and continuous at the endpoints, it is differentiable on $[a, b]$."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Mean Value Theorem (MVT)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists $c \\in (a, b)$ such that:\n\n$$f(b) - f(a) = (b - a)f'(c)$$\n\nThis is a generalization of Rolle's Theorem (where $f(a) = f(b)$)."} />
                        </div>
                      </div>

                      <Example 
                        title="Taylor's Theorem"
                        context={"Let $f$ have $n$ derivatives on $[a, b]$."}
                        question={<LatexRenderer text="What is the remainder term $R_n$ in Taylor's expansion?" inline={true} />}
                        solution={"Taylor's Theorem states that $f(b) = P_n(b) + R_n(b)$, where $P_n$ is the $n$-th order Taylor polynomial. The remainder $R_n(b)$ can be expressed as $\\frac{f^{(n)}(\beta)}{n!}(b-a)^n$ for some $\\beta$ between $a$ and $b$ (Lagrange form)."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="The Mean Value Theorem"
                    theorem={"If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, there is a $c \in (a, b)$ with $f(b)-f(a) = f'(c)(b-a)$."}
                    steps={[
                      "Define a helper function $h(x) = f(x) - [f(a) + \\frac{f(b)-f(a)}{b-a}(x-a)]$.",
                      "Check endpoints: $h(a) = f(a) - f(a) = 0$.",
                      "$h(b) = f(b) - [f(a) + f(b) - f(a)] = 0$.",
                      "Since $h(a) = h(b) = 0$, by Rolle's Theorem, there exists $c \\in (a, b)$ such that $h'(c) = 0$.",
                      "Differentiate $h(x)$: $h'(x) = f'(x) - \\frac{f(b)-f(a)}{b-a}$.",
                      "Setting $h'(c) = 0$ gives $f'(c) = \\frac{f(b)-f(a)}{b-a}$. Q.E.D."
                    ]}
                  />

                  <Quiz 
                    question="If $f'(x) = 0$ for all $x \in (a, b)$, what can we conclude about $f$?"
                    options={[
                      "f is increasing.",
                      "f is constant.",
                      "f is a polynomial of degree 1.",
                      "f is not continuous."
                    ]}
                    correctAnswer={1}
                    explanation="By the Mean Value Theorem, for any $x_1, x_2 \in (a, b)$, $f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$. Since $f'(c) = 0$, we have $f(x_2) = f(x_1)$ for all $x_1, x_2$, meaning $f$ is constant."
                  />
                </div>
              )}

              {activeSubject === 'Analysis I' && activeChapter === 5 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      The Riemann-Stieltjes Integral
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Riemann-Stieltjes Integral</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $\\alpha$ be a monotonically increasing function on $[a, b]$. We say $f$ is Riemann-Stieltjes integrable with respect to $\\alpha$, denoted $f \\in \\\\mathscr{R}(\\alpha)$, if the upper and lower integrals coincide:\n\n$$\\int_a^b f \\, d\\alpha = \\sup \\underline{S}(P, f, \\alpha) = \\inf \\overline{S}(P, f, \\alpha)$$\n\nwhere the sup and inf are taken over all partitions $P$ of $[a, b]$."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Fundamental Theorem of Calculus (FTC)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"**Part I:** If $f \\in \\\\mathscr{R}$ on $[a, b]$, and $F(x) = \\int_a^x f(t) \\, dt$, then $F$ is continuous on $[a, b]$ and $F'(x) = f(x)$ at any point $x$ where $f$ is continuous.\n\n**Part II:** If $f \\in \\\\mathscr{R}$ and $F' = f$, then $\\int_a^b f(x) \\, dx = F(b) - F(a)$."} />
                        </div>
                      </div>

                      <Example 
                        title="Integration by Parts"
                        context={"Let $F$ and $G$ be differentiable functions on $[a, b]$."}
                        question={"What is the formula for integration by parts?"}
                        solution={"The formula is derived from the product rule: $\\int_a^b F(x)G'(x) \\, dx = F(b)G(b) - F(a)G(a) - \\int_a^b F'(x)G(x) \\, dx$. This also holds for Riemann-Stieltjes integrals under appropriate conditions."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Fundamental Theorem of Calculus (Part I)"
                    theorem={"If $f$ is continuous at $x_0$, and $F(x) = \\int_a^x f(t)dt$, then $F'(x_0) = f(x_0)$."}
                    steps={[
                      "By definition, $F'(x_0) = \\lim_{h \\to 0} \\frac{F(x_0+h) - F(x_0)}{h}$.",
                      "Substituting the integral form: $\\frac{1}{h} \\int_{x_0}^{x_0+h} f(t) \\, dt$.",
                      "Subtract $f(x_0)$: $\\frac{1}{h} \\int_{x_0}^{x_0+h} [f(t) - f(x_0)] \\, dt$.",
                      "Since $f$ is continuous at $x_0$, for any $\\epsilon > 0$, there exists $\\delta > 0$ such that $|t - x_0| < \\delta \\implies |f(t) - f(x_0)| < \\epsilon$.",
                      "For $|h| < \\delta$, the integral term is bounded: $|\\frac{1}{h} \\int_{x_0}^{x_0+h} f(t) - f(x_0) \\, dt| \\le \\frac{1}{h} \\cdot h \\cdot \\epsilon = \\epsilon$.",
                      "As $\\epsilon$ was arbitrary, the limit as $h \\to 0$ is exactly 0. Thus $F'(x_0) = f(x_0)$. Q.E.D."
                    ]}
                  />
                </div>
              )}

              {activeChapter === 6 && activeSubject === 'Analysis I' && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Sequences & Series of Functions
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Uniform Convergence</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A sequence of functions $\{f_n\}$ converges **uniformly** to $f$ on $E$ if for every $\\epsilon > 0$, there exists $N$ such that $n \\ge N$ implies:\n\n$$|f_n(x) - f(x)| < \\epsilon \\quad \\text{for ALL } x \\in E$$\n\nNote that $N$ depends **only** on $\\epsilon$, not on $x$."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Weierstrass M-test</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $|f_n(x)| \\le M_n$ for all $x \\in E$, and if $\\sum M_n$ converges, then $\\sum f_n(x)$ converges uniformly on $E$."} />
                        </div>
                      </div>

                      <Example 
                        title="Power Series"
                        context={"Consider a series of the form $\\sum c_n x^n$."}
                        question={<LatexRenderer text="What is the radius of convergence $R$?" inline={true} />}
                        solution={"By the Root Test, the radius of convergence $R$ is given by $1/R = \\limsup_{n \\to \\infty} \\sqrt[n]{|c_n|}$. The series converges absolutely for $|x| < R$ and uniformly on any compact subset within that radius."}
                      />
                    </div>
                  </section>

                  <Quiz 
                    question="If a sequence of continuous functions $f_n$ converges uniformly to $f$, what can we say about $f$?"
                    options={[
                      "f is differentiable.",
                      "f is continuous.",
                      "f is constant.",
                      "f is a polynomial."
                    ]}
                    correctAnswer={1}
                    explanation="This is a fundamental theorem: the uniform limit of a sequence of continuous functions is itself continuous."
                  />
                </div>
              )}

              {/* Analysis II Chapters */}
              {activeSubject === 'Analysis II' && activeChapter === 1 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Measurable Spaces
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="$\sigma$-Algebras" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $X$ be a set. A collection $\\mathscr{F}$ of subsets of $X$ is a **$\\sigma$-algebra** if:\n\n1. $\\emptyset \\in \\mathscr{F}$\n2. $A \\in \\mathscr{F} \\implies A^c \\in \\mathscr{F}$ (Closed under complements)\n3. $\{A_n\}_{n=1}^\\infty \\subset \\mathscr{F} \\implies \\bigcup_{n=1}^\\infty A_n \\in \\mathscr{F}$ (Closed under countable unions)\n\nThe pair $(X, \\mathscr{F})$ is called a **measurable space**."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Concept</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Borel $\sigma$-Algebras" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"The **Borel $\\sigma$-algebra** $\\mathscr{B}$ on a topological space $X$ is the smallest $\\sigma$-algebra containing all open sets of $X$. In $\\mathbb{R}$, this includes all intervals, open sets, closed sets, and their countable intersections/unions."} />
                        </div>
                      </div>

                      <Example 
                        title="Non-Measurable Sets"
                        context={"Vitali's Theorem proves the existence of sets that are not Lebesgue measurable."}
                        question={"Why can't we define a translation-invariant measure on $\\mathscr{P}(\\mathbb{R})$?"}
                        solution={"If a measure $m$ is translation-invariant and countably additive, and assigns $m([0,1])=1$, then using the Axiom of Choice to construct a Vitali set $V$ leads to a contradiction. Specifically, a countable union of disjoint translates of $V$ would either have measure 0 or $\\infty$, failing to sum to the measure of the interval containing them."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Properties of Measures"
                    theorem={"If $\\mu$ is a measure, and $A_n \\nearrow A$, then $\\mu(A_n) \\to \\mu(A)$ (Continuity from below)."}
                    steps={[
                      "Let $A_1 \\subset A_2 \\subset A_3 \\dots$ be a nested sequence of measurable sets.",
                      "Define disjoint sets $B_1 = A_1, B_2 = A_2 \\setminus A_1, B_3 = A_3 \\setminus A_2, \\dots$",
                      "Note that $\\bigcup_{k=1}^n B_k = A_n$ and $\\bigcup_{k=1}^\\infty B_k = A$.",
                      "By countable additivity of $\\mu$: $\\mu(A) = \\mu(\\bigcup_{k=1}^\\infty B_k) = \\sum_{k=1}^\\infty \\mu(B_k)$.",
                      "By definition of an infinite series: $\\sum_{k=1}^\\infty \\mu(B_k) = \\lim_{n \\to \\infty} \\sum_{k=1}^n \\mu(B_k)$.",
                      "Since $\\sum_{k=1}^n \\mu(B_k) = \\mu(\\bigcup_{k=1}^n B_k) = \\mu(A_n)$, the result follows. Q.E.D."
                    ]}
                  />
                </div>
              )}

              {activeSubject === 'Analysis II' && activeChapter === 2 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Lebesgue Outer Measure
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="Outer Measure $m^*$" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For any subset $A \\subset \\mathbb{R}$, the **Lebesgue outer measure** $m^*(A)$ is defined as:\n\n$$m^*(A) = \\inf \\left\\{ \\sum_{n=1}^\\infty \\ell(I_n) : A \\subset \\bigcup_{n=1}^\\infty I_n, \\, I_n \\text{ are open intervals} \\right\\}$$\n\nwhere $\\ell(I)$ denotes the length of the interval $I$."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Countable Subadditivity</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Outer measure is **countably subadditive**. For any sequence of sets $\{A_n\}$:\n\n$$m^*\\left( \\bigcup_{n=1}^\\infty A_n \\right) \\le \\sum_{n=1}^\\infty m^*(A_n)$$"} />
                        </div>
                      </div>

                      <Example 
                        title="Outer Measure of Countable Sets"
                        context={"Let $A = \\mathbb{Q} \\cap [0, 1]$."}
                        question={"What is $m^*(A)$?"}
                        solution={"$m^*(A) = 0$. Since $\\mathbb{Q}$ is countable, we can enumerate its elements as $\{q_1, q_2, \\dots\}$. For any $\\epsilon > 0$, cover each $q_n$ with an interval $I_n$ of length $\\epsilon/2^n$. Then $\\sum \\ell(I_n) = \\epsilon$. Since $\\epsilon$ is arbitrary, $m^*(A) = 0$."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Subadditivity Proof"
                    theorem={"$m^*(\\cup A_n) \\le \\sum m^*(A_n)$"}
                    steps={[
                      "If any $m^*(A_n) = \\infty$, the inequality is trivial. Assume all $m^*(A_n) < \\infty$.",
                      "For each $n$ and any $\\epsilon > 0$, choose a cover of open intervals $\{I_{n,k}\}$ for $A_n$ such that $\\sum_k \\ell(I_{n,k}) < m^*(A_n) + \\epsilon/2^n$.",
                      "Then the collection $\{I_{n,k}\}_{n,k=1}^\\infty$ is a countable cover of $\\bigcup A_n$ by open intervals.",
                      "By definition of outer measure: $m^*(\\bigcup A_n) \\le \\sum_n \\sum_k \\ell(I_{n,k})$.",
                      "Substituting our bound: $m^*(\\bigcup A_n) \\le \\sum_n (m^*(A_n) + \\epsilon/2^n) = \\sum m^*(A_n) + \\epsilon$.",
                      "Since $\\epsilon$ was arbitrary, the result follows. Q.E.D."
                    ]}
                  />
                </div>
              )}

              {activeSubject === 'Analysis II' && activeChapter === 3 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Lebesgue Measure & Measurable Sets
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Carathéodory's Criterion</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A set $E \\subset \\mathbb{R}$ is **Lebesgue measurable** if for every set $A \\subset \\mathbb{R}$ (the 'test set'):\n\n$$m^*(A) = m^*(A \\cap E) + m^*(A \\cap E^c)$$\n\nThis condition ensures that $E$ splits any set $A$ additively."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Structure of Measurable Sets</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $E$ is measurable, it is 'almost' a nice set. Specifically:\n\n1. For any $\\epsilon > 0$, there is an open set $G \\supset E$ such that $m^*(G \\setminus E) < \\epsilon$.\n2. $E = H \\setminus Z$ where $H$ is a $G_\\delta$ set and $m^*(Z) = 0$."} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <Quiz 
                    question="Which of the following sets is always Lebesgue measurable?"
                    options={[
                      "Any subset of R.",
                      "Any Borel set.",
                      "The Vitali set.",
                      "Only intervals."
                    ]}
                    correctAnswer={1}
                    explanation="The Lebesgue $\sigma$-algebra contains all Borel sets (the $\sigma$-algebra generated by open sets). The Vitali set is a classic example of a non-measurable set."
                  />
                </div>
              )}

              {activeSubject === 'Analysis II' && activeChapter === 4 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      General Measures & Measurable Functions
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Measure Space <LatexRenderer text={"$(X, \\mathscr{F}, \\mu)$"} inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A **measure** $\\mu$ on a $\\sigma$-algebra $\\mathscr{F}$ is a function $\\mu: \\mathscr{F} \\to [0, \\infty]$ that satisfies $\\mu(\\emptyset)=0$ and is countably additive. A triple $(X, \\mathscr{F}, \\mu)$ is called a **measure space**."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Concept</h4>
                        <p className="text-white font-medium mb-2">Measurable Functions</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A function $f: X \\to \\mathbb{R}$ is **measurable** if for every $\\alpha \\in \\mathbb{R}$, the set $\{x \\in X : f(x) > \\alpha\}$ is in $\\mathscr{F}$.\n\nThis is the precise condition needed to define the Lebesgue integral of $f$."} />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeSubject === 'Analysis II' && activeChapter === 5 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Measurable Functions
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Simple Functions</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A **simple function** $s$ is a finite linear combination of indicator functions of measurable sets:\n\n$$s(x) = \\sum_{i=1}^n a_i \\chi_{E_i}(x)$$\n\nwhere $E_i \\in \\mathscr{F}$. Simple functions are the 'step functions' of measure theory."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Approximation Theorem</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"Let $f$ be a non-negative measurable function. Then there exists a sequence of non-negative simple functions $s_n$ such that $s_n \\nearrow f$ pointwise. If $f$ is bounded, the convergence is uniform."} />
                        </div>
                      </div>

                      <Example 
                        title="Composition of Functions"
                        context={"Let $f: X \\to Y$ and $g: Y \\to \\mathbb{R}$."}
                        question={"If $f$ is measurable and $g$ is continuous, is $g \\circ f$ measurable?"}
                        solution={"Yes. For any open set $U \\subset \\mathbb{R}$, $(g \\circ f)^{-1}(U) = f^{-1}(g^{-1}(U))$. Since $g$ is continuous, $g^{-1}(U)$ is open. Since $f$ is measurable, the inverse image of an open set is measurable. Thus $g \\circ f$ is measurable."}
                      />
                    </div>
                  </section>
                </div>
              )}

              {activeSubject === 'Analysis II' && activeChapter === 6 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      The Lebesgue Integral
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Integral of Non-Negative Functions</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For a non-negative measurable function $f$, the **Lebesgue integral** is defined as:\n\n$$\\int_X f \\, d\\mu = \\sup \\left\\{ \\int_X s \\, d\\mu : 0 \\le s \\le f, \\, s \\text{ is simple} \\right\\}$$"} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Concept</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="$L^1$ Integrability" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A general measurable function $f$ is **integrable** if $\\int |f| \\, d\\mu < \\infty$. In this case, we define:\n\n$$\\int f \\, d\\mu = \\int f^+ \\, d\\mu - \\int f^- \\, d\\mu$$"} />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeSubject === 'Analysis II' && activeChapter === 7 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Convergence Theorems
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Monotone Convergence Theorem (MCT)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $\{f_n\}$ is a sequence of non-negative measurable functions such that $f_n \\nearrow f$ pointwise, then:\n\n$$\\lim_{n \\to \\infty} \\int f_n \\, d\\mu = \\int f \\, d\\mu$$"} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Dominated Convergence Theorem (DCT)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"If $f_n \\to f$ pointwise and $|f_n| \\le g$ for all $n$, where $g$ is integrable, then:\n\n$$\\lim_{n \\to \\infty} \\int f_n \\, d\\mu = \\int f \\, d\\mu$$"} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <ProofBuilder 
                    title="MCT to Fatou"
                    theorem={"Fatou's Lemma: $\\int \\liminf f_n \\le \\liminf \\int f_n$"}
                    steps={[
                      "Let $g_k(x) = \\inf_{n \\ge k} f_n(x)$. Then $\{g_k\}$ is a non-decreasing sequence of non-negative measurable functions.",
                      "By definition, $\\lim_{k \\to \\infty} g_k(x) = \\liminf_{n \\to \\infty} f_n(x)$.",
                      "Apply the Monotone Convergence Theorem (MCT) to $g_k$: $\\int \\lim g_k = \\lim \\int g_k$.",
                      "Since $g_k \\le f_n$ for all $n \\ge k$, we have $\\int g_k \\le \\int f_n$ for all $n \\ge k$.",
                      "Thus $\\int g_k \\le \\inf_{n \\ge k} \\int f_n$.",
                      "Taking the limit as $k \\to \\infty$: $\\int \\liminf f_n = \\lim \\int g_k \\le \\lim \\inf_{n \\ge k} \\int f_n = \\liminf \\int f_n$. Q.E.D."
                    ]}
                  />
                </div>
              )}
              {activeSubject === 'Analysis II' && activeChapter === 8 && (
                <div className="space-y-12 text-left">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <LatexRenderer text="$L^p$ Spaces" inline={true} />
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2"><LatexRenderer text="The $L^p$ Norm" inline={true} /></p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For $1 \\le p < \\infty$, the space $L^p(X, \\mu)$ consists of measurable functions $f$ such that:\n\n$$\\|f\\|_p = \\left( \\int_X |f|^p \\, d\\mu \\right)^{1/p} < \\infty$$\n\nTo make this a true norm, we identify functions that are equal **almost everywhere**."} />
                        </div>
                      </div>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Fundamental Inequalities</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"1. **Hölder's Inequality**: $\\|fg\\|_1 \\le \\|f\\|_p \\|g\\|_q$ where $1/p + 1/q = 1$.\n2. **Minkowski's Inequality**: $\\|f+g\\|_p \\le \\|f\\|_p + \\|g\\|_p$ (The Triangle Inequality)."} />
                        </div>
                      </div>

                      <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Deep Insight</h4>
                        <p className="text-white font-medium mb-2">Completeness (Riesz-Fischer)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"For $1 \\le p \\le \\infty$, the space $L^p(X, \\mu)$ is a **Banach space** (a complete normed vector space). This is why $L^p$ spaces are the natural setting for functional analysis."} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <Quiz 
                    question="Why do we say 'Lp is the space of equivalence classes' of functions?"
                    options={[
                      "Because functions can have different values at points of measure zero.",
                      "To ensure that ||f|| = 0 implies f = 0.",
                      "To allow the integral to be defined.",
                      "Because the domain is a sigma-algebra."
                    ]}
                    correctAnswer={1}
                    explanation="If we don't identify functions equal a.e., then ||f|| = 0 only implies f = 0 almost everywhere, which would mean ||.|| is only a seminorm. Equivalence classes turn it into a true norm."
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </AnimatePresence>
  )
}

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/study/:subjectId/:chapterId" element={<AppContent />} />
    </Routes>
  </Router>
)

export default App
