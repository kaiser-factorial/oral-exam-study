import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, ChevronRight, Menu, X, Play, Info, ArrowLeft, Home, Book, FileText } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Quiz, ProofBuilder, Example } from './components/Interactive'

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
    { id: 'Analysis I', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { id: 'Analysis II', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { id: 'Linear Algebra I', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'Linear Algebra II', color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30' },
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
      { id: 8, title: 'Lp Spaces' },
    ],
    'Linear Algebra I': [
      { id: 1, title: 'Vector Spaces & Subspaces' },
      { id: 2, title: 'Bases & Dimensions' },
      { id: 3, title: 'Linear Transformations' },
      { id: 4, title: 'Matrix Representations' },
      { id: 5, title: 'Invertibility & Change of Basis' },
      { id: 6, title: 'Eigenvalues & Determinants' },
      { id: 7, title: 'Cayley-Hamilton Theorem' },
    ],
    'Linear Algebra II': [
      { id: 1, title: 'Abstract Linear Algebra' },
      { id: 2, title: 'Volume & Determinants' },
      { id: 3, title: 'Eigenvalues & Diagonalization' },
      { id: 4, title: 'Inner Product Spaces' },
      { id: 5, title: 'Unitary & Adjoint Maps' },
      { id: 6, title: 'Schur & SVD' },
      { id: 7, title: 'Tensors & Dual Spaces' },
      { id: 8, title: 'Hermitian Forms' },
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
                <p className="text-sm text-slate-500">Master core concepts & fundamental proofs.</p>
              </button>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div key="study" className="min-h-screen bg-[#0a0a0c] flex">
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
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">NYU</div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Tandon MS Math</p>
                    <p className="text-[10px] text-slate-500">Oral Exam Prep Site</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

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
                  {activeSubject} <ChevronRight size={14} /> Chapter {activeChapter}
                </h2>
              </div>
              
              <div className="flex gap-2">
                {subjects.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      navigate(`/study/${encodeURIComponent(s.id)}/1`)
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

            <div className="max-w-4xl mx-auto px-8 py-12 text-left">
              <section className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
                  <Info size={14} /> Chapter Overview
                </div>
                <h3 className="text-3xl font-black text-white mb-6">
                  {chapters[activeSubject]?.find(c => c.id === activeChapter)?.title}
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
                      {activeSubject === 'Analysis I' && activeChapter > 2 && (
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Core Concepts & Notation</li>
                      )}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Oral Focus:</p>
                    <ul className="text-sm text-slate-400 space-y-2">
                      <li className="flex items-center gap-2 text-indigo-300/80 italic font-medium leading-relaxed">
                        {activeSubject === 'Analysis I' && activeChapter === 1 && "Be ready to verify distance axioms for non-standard metrics."}
                        {activeSubject === 'Analysis I' && activeChapter === 2 && "Understand the relationship between Cauchy and Convergent sequences."}
                        {activeChapter > 2 && "Focus on fundamental definitions and counterexamples."}
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {activeSubject === 'Analysis I' && activeChapter === 1 && (
                <div className="space-y-12">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      Metric Spaces
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6 text-left">
                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                        <p className="text-white font-medium mb-2">Metric Space $(X, d)$</p>
                        <div className="text-slate-300 text-sm">
                          A metric space is a set $X$ with a function $d: X \times X \to [0, \infty)$ such that for all $x, y, z \in X$:
                          <ul className="list-disc ml-6 mt-2 space-y-1">
                            <li>$d(x, y) \ge 0$, and $d(x, y) = 0 \iff x = y$</li>
                            <li>$d(x, y) = d(y, x)$ (Symmetry)</li>
                            <li>$d(x, z) \le d(x, y) + d(y, z)$ (Triangle Inequality)</li>
                          </ul>
                        </div>
                      </div>

                      <Example 
                        title="The Discrete Metric"
                        context={"Let $X$ be any non-empty set."}
                        question={"Define $d(x, y) = 0$ if $x=y$ and $d(x, y) = 1$ if $x \\ne y$. Is this a metric?"}
                        solution={"Yes. It trivially satisfies non-negativity and symmetry. For the triangle inequality, if $x=z$, $0 \\le d(x,y) + d(y,z)$ holds. If $x \\ne z$, then $d(x,z)=1$. Since $y$ cannot equal both $x$ and $z$ simultaneously, at least one of $d(x,y)$ or $d(y,z)$ must be 1, so $1 \\le 1$ or $1 \\le 2$."}
                      />

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Axiom</h4>
                        <p className="text-white font-medium mb-2">Least Upper Bound Property</p>
                        <div className="text-slate-300 text-sm">
                          A set $S \subset \mathbb{R}$ is bounded above if there exists $M$ such that $x \le M$ for all $x \in S$. The field $\mathbb{R}$ has the L.U.B. property: every non-empty set of real numbers bounded above has a least upper bound (supremum) in $\mathbb{R}$.
                        </div>
                      </div>
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Heine-Borel Theorem"
                    theorem={"\\text{A subset } K \\subset \\mathbb{R}^n \\text{ is compact if and only if it is closed and bounded.}"}
                    steps={[
                      "Statement: A subset of \\mathbb{R}^n is compact if and only if it is closed and bounded.",
                      "Proof (=>): If K is compact, it is bounded because we can cover it with open balls B(0, n). Since it's compact, a finite subcover exists, hence K is bounded. It is closed because in a Hausdorff space (like \\mathbb{R}^n), compact sets are closed.",
                      "Proof (<=): We use the property that a closed subset of a compact set is compact. Since K is bounded, it is contained in some large closed k-cell (hyper-rectangle).",
                      "A k-cell is compact (by the nested interval property or bisection argument).",
                      "Since K is a closed subset of this compact k-cell, K is itself compact. Q.E.D."
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
                    explanation={"Take x=0, z=2, y=1. Then $d(0,2)=4$, but $d(0,1)+d(1,2) = 1+1 = 2$. Since 4 is not less than or equal to 2, the triangle inequality fails."}
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
                          A sequence <InlineMath math={"\\{p_n\\}"} /> in a metric space <InlineMath math={"(X, d)"} /> is said to converge if there exists <InlineMath math={"p \\in X"} /> such that for every <InlineMath math={"\\epsilon > 0"} />, there is an integer <InlineMath math={"N"} /> such that <InlineMath math={"n \\ge N"} /> implies <InlineMath math={"d(p_n, p) < \\epsilon"} />.
                        </div>
                      </div>

                      <Example 
                        title="Convergence to the Boundary"
                        context={"Let $X = (0, 1]$ with the Euclidean metric. Consider the sequence $p_n = 1/n$."}
                        question="Does this sequence converge in $X$?"
                        solution={"No. While the sequence $1/n$ converges to $0$ in $\\mathbb{R}$, the point $0$ is not in the set $X = (0, 1]$. Therefore, the sequence does not converge in the metric space $X$."}
                      />
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Uniqueness of Limits"
                    theorem={"\\text{A sequence in a metric space can have at most one limit.}"}
                    steps={[
                      "Suppose p_n \\to p and p_n \\to q where p \\ne q.",
                      "Then d(p, q) > 0. Let \\epsilon = d(p, q) / 2.",
                      "Since p_n \\to p, there exists N_1 such that d(p_n, p) < \\epsilon for all n \\ge N_1.",
                      "Since p_n \\to q, there exists N_2 such that d(p_n, q) < \\epsilon for all n \\ge N_2.",
                      "For n \\ge \\max(N_1, N_2), the triangle inequality gives: d(p, q) \\le d(p, p_n) + d(p_n, q) < \\epsilon + \\epsilon = d(p, q).",
                      "This results in the contradiction d(p, q) < d(p, q). Thus p = q. Q.E.D."
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

              {activeChapter > 2 && (
                <div className="h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-indigo-500 animate-spin mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">Transcribing Chapter {activeChapter}</h3>
                  <p className="text-slate-500 text-sm">Organizing proofs and practice problems...</p>
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
