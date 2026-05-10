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
      { id: 1, title: 'Real Numbers & Metric Spaces' },
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
              <div className="space-y-2 flex-grow overflow-y-auto">
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
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">NYU</div>
                  <div>
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
                <h2 className="text-sm font-bold text-slate-400 flex items-center gap-2">
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

            <div className="max-w-4xl mx-auto px-8 py-12">
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

          {activeSubject === 'Analysis II' && activeChapter === 1 && (
            <div className="space-y-12">
              <section className="glass-card">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  Measurable Spaces & $\sigma$-algebras
                </h3>
                <div className="prose prose-invert max-w-none space-y-6">
                  <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                    <h4 className="text-purple-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                    <p className="text-white font-medium mb-2">$\sigma$-algebra</p>
                    <div className="text-slate-300 text-sm">
                      A collection $\mathcal{M}$ of subsets of $X$ is a $\sigma$-algebra if:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>$X \in \mathcal{M}$</li>
                        <li>$A \in \mathcal{M} \implies A^c \in \mathcal{M}$ (Closed under complements)</li>
                        <li>$A_n \in \mathcal{M} \implies \bigcup_{n=1}^\infty A_n \in \mathcal{M}$ (Closed under countable unions)</li>
                      </ul>
                    </div>
                  </div>

                  <Example 
                    title="Smallest $\sigma$-algebra"
                    context="Let $X$ be any set."
                    question="What is the smallest possible $\sigma$-algebra on $X$?"
                    solution="The trivial $\sigma$-algebra $\{\emptyset, X\}$. It satisfies all three axioms: it contains $X$, complements are included ($\emptyset^c = X, X^c = \emptyset$), and any union of its elements is still in the collection."
                  />
                </div>
              </section>

              <ProofBuilder 
                title="Closure under Countable Intersections"
                theorem="\text{If } \mathcal{M} \text{ is a } \sigma\text{-algebra, then it is closed under countable intersections.}"
                steps={[
                  "Let \{A_n\}_{n=1}^\infty be a countable collection of sets in \mathcal{M}.",
                  "By the second axiom, each complement A_n^c is in \alt{\mathcal{M}}{M}.",
                  "By the third axiom, the union of these complements \bigcup A_n^c is in \alt{\mathcal{M}}{M}.",
                  "By De Morgan's Law, (\bigcap A_n)^c = \bigcup A_n^c.",
                  "Since (\bigcap A_n)^c is in \alt{\mathcal{M}}{M}, its complement (\bigcap A_n) must also be in \alt{\mathcal{M}}{M}. Q.E.D."
                ]}
              />

              <Quiz 
                question="Is the union of two sigma-algebras always a sigma-algebra?"
                options={[
                  "Yes, always.",
                  "No, not necessarily.",
                  "Only if the set X is finite.",
                  "Only if one is a subset of the other."
                ]}
                correctAnswer={1}
                explanation="The union of two sigma-algebras is not necessarily a sigma-algebra because it may not be closed under unions of elements from different algebras. However, the intersection of any collection of sigma-algebras is always a sigma-algebra."
              />
            </div>
          )}

          {activeSubject === 'Linear Algebra II' && activeChapter === 1 && (
            <div className="space-y-12">
              <section className="glass-card">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  Abstract Vector Spaces & Maps
                </h3>
                <div className="prose prose-invert max-w-none space-y-6">
                  <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                    <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                    <p className="text-white font-medium mb-2">Linear Transformation</p>
                    <div className="text-slate-300 text-sm">
                      A map $T: V \to W$ between vector spaces is linear if for all $u, v \in V$ and $c \in \mathbb{F}$:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>$T(u + v) = T(u) + T(v)$ (Additivity)</li>
                        <li>$T(cu) = cT(u)$ (Homogeneity)</li>
                      </ul>
                    </div>
                  </div>

                  <Example 
                    title="The Zero Map"
                    context="Let $T: V \to W$ be defined by $T(v) = 0$ for all $v \in V$."
                    question="Is this a linear transformation?"
                    solution="Yes. $T(u+v) = 0 = 0 + 0 = T(u) + T(v)$ and $T(cv) = 0 = c(0) = cT(v)$. It is the additive identity in the vector space $\mathcal{L}(V, W)$."
                  />
                </div>
              </section>

              <ProofBuilder 
                title="Linearity of the Inverse Map"
                theorem="\text{If } T: V \to W \text{ is an invertible linear map, then } T^{-1} \text{ is also linear.}"
                steps={[
                  "Let w_1, w_2 \in W. We need to show T^{-1}(w_1 + w_2) = T^{-1}(w_1) + T^{-1}(w_2).",
                  "Since T is invertible, there exist unique v_1, v_2 \in V such that T(v_1) = w_1 and T(v_2) = w_2.",
                  "Then T(v_1 + v_2) = T(v_1) + T(v_2) = w_1 + w_2 by linearity of T.",
                  "Applying T^{-1} to both sides: T^{-1}(w_1 + w_2) = v_1 + v_2.",
                  "Since v_1 = T^{-1}(w_1) and v_2 = T^{-1}(w_2), we have T^{-1}(w_1 + w_2) = T^{-1}(w_1) + T^{-1}(w_2).",
                  "A similar argument follows for scalar multiplication. Q.E.D."
                ]}
              />

              <Quiz 
                question="What is the dimension of the space of linear maps L(V, W) if dim(V) = n and dim(W) = m?"
                options={[
                  "n + m",
                  "n * m",
                  "n^m",
                  "max(n, m)"
                ]}
                correctAnswer={1}
                explanation="The space of linear maps L(V, W) is isomorphic to the space of m x n matrices, which has dimension m * n."
              />
            </div>
          )}

          {activeSubject === 'Linear Algebra I' && activeChapter === 1 && (
            <div className="space-y-12">
              <section className="glass-card">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                  Vector Spaces & Subspaces
                </h3>
                <div className="prose prose-invert max-w-none space-y-6">
                  <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                    <h4 className="text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-widest font-black">Definition</h4>
                    <p className="text-white font-medium mb-2">Vector Space Subspace</p>
                    <div className="text-slate-300 text-sm">
                      A subset $U \subset V$ is a subspace if it satisfies three conditions:
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Additive identity: $0 \in U$</li>
                        <li>Closed under addition: $u, w \in U \implies u + w \in U$</li>
                        <li>Closed under scalar multiplication: $a \in \mathbb{F}, u \in U \implies au \in U$</li>
                      </ul>
                    </div>
                  </div>

                  <Example 
                    title="The Intersection of Subspaces"
                    context="Let $U_1, U_2$ be subspaces of $V$."
                    question="Is $U_1 \cap U_2$ always a subspace?"
                    solution="Yes. Since $0 \in U_1$ and $0 \in U_2$, $0 \in U_1 \cap U_2$. If $u, w \in U_1 \cap U_2$, then $u+w \in U_1$ (since $U_1$ is a subspace) and $u+w \in U_2$ (since $U_2$ is a subspace), so $u+w \in U_1 \cap U_2$. Similar logic applies to scalar multiplication."
                  />
                </div>
              </section>

              <Quiz 
                question="Which of the following is NOT necessarily a subspace of V?"
                options={[
                  "The set {0}",
                  "The entire space V",
                  "The union of two subspaces U1 and U2",
                  "The intersection of two subspaces U1 and U2"
                ]}
                correctAnswer={2}
                explanation="The union of two subspaces is only a subspace if one is contained within the other. For example, the x-axis and y-axis in R^2 are subspaces, but their union is not (it's not closed under addition)."
              />
            </div>
          )}

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
      )}
    </AnimatePresence>
  )
}

export default App
