import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap, ChevronRight, Menu, X, Play, Info } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import { Quiz, ProofBuilder } from './components/Interactive'

const App = () => {
  const [activeSubject, setActiveSubject] = useState('Analysis I')
  const [isNavOpen, setIsNavOpen] = useState(false)

  const subjects = [
    { id: 'Analysis I', color: 'text-indigo-400', border: 'border-indigo-500/30' },
    { id: 'Analysis II', color: 'text-purple-400', border: 'border-purple-500/30' },
    { id: 'Linear Algebra I', color: 'text-emerald-400', border: 'border-emerald-500/30' },
    { id: 'Linear Algebra II', color: 'text-teal-400', border: 'border-teal-500/30' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 selection:bg-indigo-500/30">
      {/* Navigation Backdrop */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(63,94,251,0.15),rgba(252,70,107,0))] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Math Study Portal</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Oral Exam Prep</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubject(sub.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSubject === sub.id 
                    ? `bg-white/10 ${sub.color} shadow-inner shadow-white/5` 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {sub.id}
              </button>
            ))}
          </nav>

          <button className="md:hidden p-2 text-slate-400" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="mb-12">
              <h2 className={`text-4xl md:text-6xl font-black mb-4 ${subjects.find(s => s.id === activeSubject).color}`}>
                {activeSubject}
              </h2>
              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-2"><BookOpen size={16} /> Foundations & Proofs</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="flex items-center gap-2"><Play size={16} /> Video Supplement</span>
              </div>
            </header>

            {/* Content Placeholder for Analysis I Chapter 1 */}
            {activeSubject === 'Analysis I' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">01</span>
                      Real Numbers & Metric Spaces
                    </h3>
                    
                    <div className="prose prose-invert max-w-none space-y-6">
                      <p className="text-slate-400 leading-relaxed">
                        The core of Real Analysis begins with the properties of the real field <InlineMath math="\mathbb{R}" /> and the topological structure of metric spaces.
                      </p>

                      <div className="bg-indigo-500/5 border-l-4 border-indigo-500 p-6 rounded-r-xl">
                        <h4 className="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-wider">Crucial Definition</h4>
                        <p className="text-white font-medium mb-2">The Supremum (Least Upper Bound)</p>
                        <div className="text-slate-300">
                          Let <InlineMath math="S" /> be a non-empty set of real numbers that is bounded above. A number <InlineMath math="L" /> is the supremum of <InlineMath math="S" /> if:
                          <ol className="list-decimal list-inside mt-2 space-y-2">
                            <li><InlineMath math="x \leq L" /> for all <InlineMath math="x \in S" /></li>
                            <li>For any <InlineMath math="\epsilon > 0" />, there exists <InlineMath math="x \in S" /> such that <InlineMath math="x > L - \epsilon" /></li>
                          </ol>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-bold flex items-center gap-2">
                          <Info className="text-indigo-400" size={18} /> Edge Cases to Remember
                        </h4>
                        <ul className="space-y-2 text-slate-400 list-disc list-inside">
                          <li>The supremum of a set does not have to be an element of the set (e.g., <InlineMath math="S = (0, 1)" />).</li>
                          <li>Every non-empty set of real numbers that is bounded above has a least upper bound (Completeness Axiom).</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <ProofBuilder 
                    theorem="Heine-Borel Theorem"
                    steps={[
                      "Statement: A subset of \mathbb{R}^n is compact if and only if it is closed and bounded.",
                      "Proof (=>): If K is compact, it is bounded because we can cover it with open balls B(0, n). Since it's compact, a finite subcover exists, hence K is bounded. It is closed because in a Hausdorff space (like \mathbb{R}^n), compact sets are closed.",
                      "Proof (<=): We use the property that a closed subset of a compact set is compact. Since K is bounded, it is contained in some large closed k-cell (hyper-rectangle).",
                      "A k-cell is compact (by the nested interval property or bisection argument).",
                      "Since K is a closed subset of this compact k-cell, K is itself compact. Q.E.D."
                    ]}
                  />

                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">02</span>
                      Convergence & Bolzano-Weierstrass
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <p className="text-slate-400 leading-relaxed">
                        Convergence in metric spaces generalizes the limit of a sequence. A sequence <InlineMath math="\{p_n\}" /> in <InlineMath math="X" /> converges if there is a point <InlineMath math="p \in X" /> such that for every <InlineMath math="\epsilon > 0" />, there is an integer <InlineMath math="N" /> such that <InlineMath math="n \geq N" /> implies <InlineMath math="d(p_n, p) < \epsilon" />.
                      </p>
                      
                      <ProofBuilder 
                        theorem="Bolzano-Weierstrass Theorem"
                        steps={[
                          "Statement: Every bounded sequence in \mathbb{R}^k has a convergent subsequence.",
                          "Proof: Let E be the range of the sequence. If E is finite, at least one point must repeat infinitely often, giving a constant (and thus convergent) subsequence.",
                          "If E is infinite, since the sequence is bounded, E is a bounded infinite set.",
                          "A bounded infinite set in \mathbb{R}^k has a limit point (a corollary of Heine-Borel).",
                          "We can then construct a subsequence that converges to this limit point by picking elements within B(p, 1/n). Q.E.D."
                        ]}
                      />
                    </div>
                  </section>

                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">03</span>
                      Continuity
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <p className="text-slate-400 leading-relaxed">
                        A function <InlineMath math="f: X \to Y" /> is continuous at <InlineMath math="p \in X" /> if for every <InlineMath math="\epsilon > 0" /> there exists <InlineMath math="\delta > 0" /> such that <InlineMath math="d_X(x, p) < \delta \implies d_Y(f(x), f(p)) < \epsilon" />.
                      </p>
                      
                      <div className="bg-amber-500/5 border-l-4 border-amber-500 p-6 rounded-r-xl">
                        <h4 className="text-amber-400 font-bold mb-2 uppercase text-xs tracking-wider">Topological Characterization</h4>
                        <p className="text-slate-300">
                          A function <InlineMath math="f" /> is continuous if and only if <InlineMath math="f^{-1}(V)" /> is open in <InlineMath math="X" /> for every open set <InlineMath math="V" /> in <InlineMath math="Y" />.
                        </p>
                      </div>

                      <ProofBuilder 
                        theorem="Intermediate Value Theorem"
                        steps={[
                          "Statement: If f is continuous on [a, b] and f(a) < c < f(b), then there exists x \in (a, b) such that f(x) = c.",
                          "Proof Strategy: Let S = \{x \in [a, b] : f(x) < c\}.",
                          "S is non-empty (contains a) and bounded above (by b). Let x_0 = \sup S.",
                          "Show f(x_0) = c by ruling out f(x_0) < c and f(x_0) > c using the continuity of f and the definition of supremum.",
                          "If f(x_0) < c, by continuity there's a neighborhood of x_0 where f(x) < c, contradicting x_0 being an upper bound.",
                          "If f(x_0) > c, there's a neighborhood where f(x) > c, contradicting x_0 being the least upper bound. Q.E.D."
                        ]}
                      />
                    </div>
                  </section>

                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">04</span>
                      Differentiation
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <p className="text-slate-400 leading-relaxed">
                        The derivative measures the instantaneous rate of change and provides the best linear approximation to a function at a point.
                      </p>

                      <ProofBuilder 
                        theorem="Mean Value Theorem"
                        steps={[
                          "Statement: If f is continuous on [a, b] and differentiable on (a, b), there exists c \in (a, b) such that f'(c) = \frac{f(b) - f(a)}{b - a}.",
                          "Proof: Define a helper function h(x) = f(x) - g(x), where g(x) is the line through (a, f(a)) and (b, f(b)).",
                          "Observe that h(a) = h(b) = 0.",
                          "Apply Rolle's Theorem to h(x). There must exist c \in (a, b) such that h'(c) = 0.",
                          "Since h'(x) = f'(x) - \frac{f(b) - f(a)}{b - a}, then h'(c) = 0 implies f'(c) = \frac{f(b) - f(a)}{b - a}. Q.E.D."
                        ]}
                      />
                    </div>
                  </section>
                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">05</span>
                      Integration
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <p className="text-slate-400 leading-relaxed">
                        The Riemann integral is defined via upper and lower sums. A function is Riemann integrable on <InlineMath math="[a, b]" /> if <InlineMath math="\sup L(P, f) = \inf U(P, f)" />.
                      </p>

                      <ProofBuilder 
                        theorem="Fundamental Theorem of Calculus"
                        steps={[
                          "Statement Part I: If f is Riemann integrable on [a, b], and F(x) = \int_a^x f(t)dt, then F is continuous. If f is continuous at x_0, F is differentiable at x_0 and F'(x_0) = f(x_0).",
                          "Statement Part II: If f is Riemann integrable and has an antiderivative g, then \int_a^b f(x)dx = g(b) - g(a).",
                          "Proof Strategy (Part I): Use the definition of the derivative and the Mean Value Theorem for Integrals to show the limit of the difference quotient is f(x_0).",
                          "Proof Strategy (Part II): Use a partition of [a, b] and apply the Mean Value Theorem to g in each sub-interval. The resulting sum is a Riemann sum for f."
                        ]}
                      />
                    </div>
                  </section>

                  <section className="glass-card">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-sm">06</span>
                      Series & Function Series
                    </h3>
                    <div className="prose prose-invert max-w-none space-y-6">
                      <p className="text-slate-400 leading-relaxed">
                        Uniform convergence is a key concept for function series, as it preserves continuity and allows for term-by-term integration/differentiation.
                      </p>

                      <div className="bg-purple-500/5 border-l-4 border-purple-500 p-6 rounded-r-xl">
                        <h4 className="text-purple-400 font-bold mb-2 uppercase text-xs tracking-wider">Uniform Convergence</h4>
                        <p className="text-slate-300">
                          <InlineMath math="f_n \to f" /> uniformly if for every <InlineMath math="\epsilon > 0" />, there is an <InlineMath math="N" /> (independent of <InlineMath math="x" />) such that <InlineMath math="n \geq N \implies |f_n(x) - f(x)| < \epsilon" /> for all <InlineMath math="x" />.
                        </p>
                      </div>

                      <ProofBuilder 
                        theorem="Weierstrass M-Test"
                        steps={[
                          "Statement: If |f_n(x)| \leq M_n for all x, and \sum M_n converges, then \sum f_n converges uniformly.",
                          "Proof: For any \epsilon > 0, there is an N such that \sum_{k=n+1}^m M_k < \epsilon for all m > n \geq N (by the Cauchy criterion for series).",
                          "Then by the Triangle Inequality, |\sum_{k=n+1}^m f_k(x)| \leq \sum_{k=n+1}^m |f_k(x)| \leq \sum_{k=n+1}^m M_k < \epsilon.",
                          "By the Cauchy Criterion for Uniform Convergence, the series \sum f_n converges uniformly. Q.E.D."
                        ]}
                      />
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  <Quiz 
                    question="Which of the following is TRUE about the supremum of a set S?"
                    options={[
                      "It must be an element of the set S.",
                      "It is always the maximum of the set S.",
                      "It is the least upper bound of the set S.",
                      "A set can have multiple distinct suprema."
                    ]}
                    correctAnswer={2}
                    explanation="By definition, the supremum is the 'Least Upper Bound'. It does not have to belong to the set (e.g., sup(0,1) = 1, but 1 is not in (0,1)). A supremum, if it exists, is unique."
                  />

                  <Quiz 
                    question="If every convergent sequence in a metric space X has a limit in X, the space is:"
                    options={[
                      "Compact",
                      "Closed",
                      "Complete",
                      "Connected"
                    ]}
                    correctAnswer={2}
                    explanation="This is the definition of a 'Complete' metric space. Compactness is a much stronger condition (requires every sequence to have a convergent subsequence, not just Cauchy sequences to converge)."
                  />

                  <div className="glass-card !p-0 overflow-hidden">
                    <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-b border-white/5">
                      <h4 className="font-bold text-white flex items-center gap-2">
                        <Play size={18} className="text-indigo-400" /> Video Supplement
                      </h4>
                    </div>
                    <div className="aspect-video bg-slate-900 flex items-center justify-center">
                      <p className="text-xs text-slate-500 px-8 text-center leading-relaxed">
                        Youtube Video Embed: Intro to Metric Spaces & Supremum
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Focus on the segment regarding the <strong>Completeness Axiom</strong> at 14:20.
                      </p>
                    </div>
                  </div>

                  {/* Interactive content now handled by Quiz and ProofBuilder components */}
                </div>
              </div>
            )}

            {activeSubject !== 'Analysis I' && (
              <div className="h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-indigo-500 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Content Loading</h3>
                <p className="text-slate-500">I am currently transcribing the {activeSubject} syllabus...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-12 border-t border-white/5 text-center">
        <p className="text-sm text-slate-500">
          Math Study Portal &bull; NYU Tandon MS Mathematical Sciences &bull; Oral Exam Preparation
        </p>
      </footer>
    </div>
  )
}

export default App
