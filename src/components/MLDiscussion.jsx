import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PCAVisualizer } from './MathVisuals/PCAVisualizer';
import { MatrixView, VectorView } from './MathVisuals/MatrixView';
import { BookOpen, Zap, Layers, Cpu, ArrowRight } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';

const Section = ({ title, icon: Icon, children, active = true }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`mb-24 ${active ? 'block' : 'hidden'}`}
  >
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const Card = ({ children, className = "" }) => (
  <div className={`p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

export const MLDiscussion = ({ chapterId }) => {
  const activeChapter = parseInt(chapterId);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <AnimatePresence mode="wait">
        {activeChapter === 1 && (
          <Section key="ch1" title="The Complexity Gradient" icon={Zap}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              <Card className="flex flex-col justify-center">
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  Machine Learning is often taught as a series of disconnected algorithms. But for the oral exam, we want to see the <span className="text-white font-bold">mathematical throughline</span>.
                </p>
                <p className="text-slate-400">
                  We are moving from simple linear approximations to high-dimensional manifold learning, all while keeping our feet planted in SVD and Gradient Descent.
                </p>
              </Card>
              <div className="relative aspect-video rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent)]" />
                <div className="flex flex-col items-center gap-4 z-10">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-indigo-500/50" />
                    <div className="w-8 h-8 rounded bg-indigo-500/30" />
                    <div className="w-8 h-8 rounded bg-indigo-500/10" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Low Rank Structure</span>
                  <div className="w-32 h-[1px] bg-white/20" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-400">Optimization</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                { title: 'PCA', desc: 'Finding the axes of maximum variance.', math: 'SVD' },
                { title: 'Boosting', desc: 'Iteratively fitting residuals.', math: '\\nabla f' },
                { title: 'LoRA', desc: 'Merging SVD with Gradient Descent.', math: 'BA\\Delta W' },
              ].map((item, i) => (
                <Card key={i} className="hover:border-indigo-500/30 transition-colors group">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 block">{item.math}</span>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {activeChapter === 2 && (
          <Section key="ch2" title="SVD: PCA & Latent Factors" icon={Layers}>
            <div className="prose prose-invert max-w-none mb-12 text-left">
              <p className="text-lg text-slate-300">
                The Singular Value Decomposition (SVD) is the "universal tool" of linear algebra. In ML, we use it to find <span className="text-indigo-400 font-bold">low-rank structure</span>—the idea that even if our data matrix is huge, the "real signal" lives in a much smaller subspace.
              </p>
            </div>

            <PCAVisualizer />

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">The Math of the Discussion</h3>
                <Card className="bg-indigo-500/5 border-indigo-500/20">
                  <BlockMath math="X = U \Sigma V^T" />
                  <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                    Explain to the examiner that <InlineMath math="V" /> represents the principal axes (feature space), while <InlineMath math="U\Sigma" /> are the projections of data points onto those axes.
                  </p>
                </Card>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-1.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      <ArrowRight size={14} />
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm">Latent Factor Connection</h5>
                      <p className="text-xs text-slate-500">Matrix factorization for RecSys is just SVD where we only care about the top <InlineMath math="k" /> singular values.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <MatrixView 
                  label="Data X" 
                  matrix={[[0.8, 0.2], [0.1, 0.9], [0.7, 0.3]]} 
                  color="indigo"
                />
                <div className="flex items-center text-slate-600 text-2xl">≈</div>
                <div className="flex flex-col gap-2">
                   <MatrixView 
                    label="UΣ" 
                    matrix={[[1.2], [0.4], [1.1]]} 
                    color="purple"
                  />
                  <MatrixView 
                    label="V^T" 
                    matrix={[[0.7, 0.7]]} 
                    color="emerald"
                  />
                </div>
              </div>
            </div>
          </Section>
        )}

        {activeChapter === 3 && (
          <Section key="ch3" title="Gradient: Regression & Boosting" icon={Cpu}>
            <div className="prose prose-invert max-w-none mb-12 text-left">
              <p className="text-lg text-slate-300">
                While SVD finds static structure, <span className="text-rose-400 font-bold">Gradient Descent</span> is the engine of change. It is the analytical process of moving from a guess to a solution by following the local curvature of a loss landscape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left mb-16">
              <Card className="bg-rose-500/5 border-rose-500/20">
                <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest mb-4">Analytical Justification</h4>
                <div className="space-y-4">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    By the <span className="text-white font-bold">Riesz Representation Theorem</span>, there exists a unique vector <InlineMath math="\nabla f(\mathbf{x})" /> such that the directional derivative is minimized in the direction of <InlineMath math="-\nabla f(\mathbf{x})" />.
                  </p>
                  <BlockMath math="f(\mathbf{x}_{k+1}) \approx f(\mathbf{x}_k) - \gamma_k \|\nabla f(\mathbf{x}_k)\|^2" />
                </div>
              </Card>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">The Throughline to Boosting</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  In Linear Regression, we update parameters. In <span className="text-white font-bold">Gradient Boosting</span> (XGBoost/CatBoost), we perform gradient descent in <i>function space</i>. 
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs">f(x)</div>
                  <ArrowRight className="text-slate-600" size={16} />
                  <div className="flex-grow">
                    <p className="text-[10px] font-black text-slate-500 uppercase">Iterative Residuals</p>
                    <p className="text-xs text-slate-300">Each new tree fits the <i>negative gradient</i> of the loss.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="flex flex-col items-center justify-center py-12 bg-gradient-to-br from-rose-500/5 to-orange-500/5 border-rose-500/10">
               <Activity className="text-rose-500 mb-4" size={32} />
               <h4 className="text-lg font-bold text-white mb-2">Gradient Descent Visualizer</h4>
               <p className="text-sm text-slate-500 mb-6">Coming soon: A 3D loss landscape for testing Lipschitz continuity.</p>
               <div className="w-full max-w-md h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                   className="w-1/2 h-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
                 />
               </div>
            </Card>
          </Section>
        )}

        {activeChapter === 4 && (
          <Section key="ch4" title="Convergence: Fine-tuning & LoRA" icon={Zap}>
            <div className="prose prose-invert max-w-none mb-12 text-left">
              <p className="text-lg text-slate-300">
                LoRA is the ultimate synthesis. It solves the "memory wall" of full fine-tuning by assuming that the task-relevant weight update <InlineMath math="\Delta W" /> lives in a <span className="text-emerald-400 font-bold">low-rank subspace</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">The Low-Rank Hypothesis</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Rather than updating billions of parameters in <InlineMath math="W" />, we parameterize the update as a product of two thin matrices:
                  </p>
                </div>
                
                <Card className="bg-emerald-500/5 border-emerald-500/20 py-10">
                  <BlockMath math="\Delta W = B \cdot A" />
                  <div className="flex justify-center mt-6 gap-2">
                    <div className="w-12 h-20 rounded bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center text-[10px] font-black text-emerald-400">B</div>
                    <div className="flex items-center text-emerald-400 font-bold">×</div>
                    <div className="w-20 h-8 rounded bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center text-[10px] font-black text-emerald-400">A</div>
                  </div>
                </Card>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 italic text-sm text-slate-400">
                  "What drew me to LoRA is that it's mathematically the same reason PCA works. Fine-tuning doesn't require exploring all of parameter space because the adaptation is low-dimensional."
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">SVD Meets Gradient</h3>
                <Card className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400"><Layers size={16} /></div>
                    <p className="text-sm font-bold text-white">The Structural Insight (SVD)</p>
                  </div>
                  <p className="text-xs text-slate-400 ml-11">Weight updates are intrinsically low-rank objects.</p>
                  
                  <div className="flex gap-3 items-center pt-4">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400"><Zap size={16} /></div>
                    <p className="text-sm font-bold text-white">The Operational Machinery (GD)</p>
                  </div>
                  <p className="text-xs text-slate-400 ml-11">We find the optimal <InlineMath math="A" /> and <InlineMath math="B" /> via gradient descent.</p>
                </Card>

                <div className="p-8 rounded-3xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20">
                  <h4 className="font-black uppercase tracking-widest text-[10px] mb-2 opacity-80">Oral Exam Closer</h4>
                  <p className="text-sm font-bold leading-relaxed">
                    "SVD is the lens that makes the low-dimensional adaptation of LLMs visible and tractable."
                  </p>
                </div>
              </div>
            </div>
          </Section>
        )}
      </AnimatePresence>
    </div>
  );
};
