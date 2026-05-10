import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, ChevronRight, Menu, X, Play, Info, ArrowLeft, Home, Book, FileText } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Quiz, ProofBuilder, Example, LatexRenderer } from './components/Interactive'

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
                        <div className="text-white font-medium mb-2">
                          <LatexRenderer text={"Metric Space $(X, d)$"} />
                        </div>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"A metric space is a set $X$ with a function $d: X \\times X \\to [0, \\infty)$ such that for all $x, y, z \\in X$:\n\n* $d(x, y) \\ge 0$, and $d(x, y) = 0 \\iff x = y$\n* $d(x, y) = d(y, x)$ (Symmetry)\n* $d(x, z) \\le d(x, y) + d(y, z)$ (Triangle Inequality)"} />
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
                          <LatexRenderer text={"A set $S \\subset \\mathbb{R}$ is bounded above if there exists $M$ such that $x \\le M$ for all $x \\in S$. The Real Field $\\mathbb{R}$ has the L.U.B. property: every non-empty set of real numbers bounded above has a least upper bound (supremum) in $\\mathbb{R}$."} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <ProofBuilder 
                    title="Heine-Borel Theorem"
                    theorem={"A subset $K \\subset \\mathbb{R}^n$ is compact if and only if it is closed and bounded."}
                    steps={[
                      "Statement: A subset of $\\mathbb{R}^n$ is compact if and only if it is closed and bounded.",
                      "Proof (=>): If $K$ is compact, it is bounded because we can cover it with open balls $B(0, n)$. Since it's compact, a finite subcover exists, hence $K$ is bounded. It is closed because in a Hausdorff space (like $\\mathbb{R}^n$), compact sets are closed.",
                      "Proof (<=): We use the property that a closed subset of a compact set is compact. Since $K$ is bounded, it is contained in some large closed $k$-cell (hyper-rectangle).",
                      "A $k$-cell is compact (by the nested interval property or bisection argument).",
                      "Since $K$ is a closed subset of this compact $k$-cell, $K$ is itself compact. Q.E.D."
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
                    explanation={"Take $x=0, z=2, y=1$. Then $d(0,2)=4$, but $d(0,1)+d(1,2) = 1+1 = 2$. Since $4$ is not less than or equal to $2$, the triangle inequality fails."}
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

              {activeChapter > 3 && activeChapter < 5 && activeSubject === 'Analysis I' && (
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
                        question={"What is the remainder term $R_n$ in Taylor's expansion?"}
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

              {activeChapter > 4 && activeChapter < 6 && activeSubject === 'Analysis I' && (
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
                          <LatexRenderer text={"Let $\\alpha$ be a monotonically increasing function on $[a, b]$. We say $f$ is Riemann-Stieltjes integrable with respect to $\\alpha$, denoted $f \\in \\mathscr{R}(\\alpha)$, if the upper and lower integrals coincide:\n\n$$\\int_a^b f \\, d\\alpha = \\sup \\underline{S}(P, f, \\alpha) = \\inf \\overline{S}(P, f, \\alpha)$$\n\nwhere the sup and inf are taken over all partitions $P$ of $[a, b]$."} />
                        </div>
                      </div>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl mt-8">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Theorem</h4>
                        <p className="text-white font-medium mb-2">Fundamental Theorem of Calculus (FTC)</p>
                        <div className="text-slate-300 text-sm">
                          <LatexRenderer text={"**Part I:** If $f \\in \\mathscr{R}$ on $[a, b]$, and $F(x) = \\int_a^x f(t) \\, dt$, then $F$ is continuous on $[a, b]$ and $F'(x) = f(x)$ at any point $x$ where $f$ is continuous.\n\n**Part II:** If $f \\in \\mathscr{R}$ and $F' = f$, then $\\int_a^b f(x) \\, dx = F(b) - F(a)$."} />
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
                        question={"What is the radius of convergence $R$?"}
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
