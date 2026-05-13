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
          <Section key="ch1" title="Spectral Theory & PCA" icon={Zap}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              <Card className="flex flex-col justify-center">
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  Before we do ML, we must understand the <span className="text-white font-bold">Spectral Theorem</span>. It tells us that any real symmetric matrix (like the covariance of our data) can be diagonalized by an orthonormal basis.
                </p>
                <p className="text-slate-400">
                  PCA is simply the process of finding this "natural" coordinate system. We rotate our perspective until the axes align with the directions of maximum variance.
                </p>
              </Card>
              <div className="relative aspect-video rounded-3xl bg-indigo-500/5 border border-white/10 flex flex-col items-center justify-center p-6">
                <div className="text-center space-y-4">
                  <BlockMath math="X^TX = V \Lambda V^T" />
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Orthonormal Change of Basis</p>
                </div>
              </div>
            </div>

            <PCAVisualizer />
          </Section>
        )}

        {activeChapter === 2 && (
          <Section key="ch2" title="Eckart-Young: The Geometry of Approximation" icon={Layers}>
            <div className="prose prose-invert max-w-none mb-12 text-left">
              <p className="text-lg text-slate-300">
                The **Eckart-Young-Mirsky Theorem** is the mathematical bridge to efficiency. It proves that the best rank-$k$ approximation of a matrix is obtained by keeping its top $k$ singular values and zeroing the rest.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Why it Works</h3>
                <Card className="bg-indigo-500/5 border-indigo-500/20">
                  <BlockMath math="\|A - A_k\|_F^2 = \sum_{i=k+1}^n \sigma_i^2" />
                  <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                    The error of our approximation is exactly the "energy" of the discarded singular values. In real-world data, singular values usually decay exponentially, making this error negligible.
                  </p>
                </Card>
              </div>

              <div className="flex flex-col gap-4">
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                   <h4 className="text-sm font-bold text-white mb-4">Singular Value Decay (Scree Plot)</h4>
                   <div className="flex items-end gap-2 h-32">
                     {[100, 80, 40, 20, 10, 5, 2].map((h, i) => (
                       <motion.div 
                         key={i}
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         className={`w-full rounded-t-sm ${i < 3 ? 'bg-indigo-500' : 'bg-indigo-500/20'}`}
                       />
                     ))}
                   </div>
                   <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold uppercase">
                     <span>Signal (Top k)</span>
                     <span>Noise</span>
                   </div>
                 </div>
              </div>
            </div>
          </Section>
        )}

        {activeChapter === 3 && (
          <Section key="ch3" title="Latent Factors & Collaborative Filtering" icon={BookOpen}>
            <div className="prose prose-invert max-w-none mb-12 text-left">
              <p className="text-lg text-slate-300">
                In recommendation systems, we apply SVD to a sparse matrix of interactions. We assume that complex human behavior (liking a movie) can be explained by a small number of <span className="text-purple-400 font-bold">latent factors</span>.
              </p>
            </div>

            <div className="flex justify-center gap-8 mb-16">
              <MatrixView 
                label="Ratings R" 
                matrix={[[5, 0, 1], [4, 0, 1], [1, 5, 0]]} 
                color="indigo"
              />
              <div className="flex items-center text-slate-600 text-2xl">≈</div>
              <div className="flex flex-col gap-2">
                 <MatrixView 
                  label="Users (U)" 
                  matrix={[[0.8], [0.7], [0.1]]} 
                  color="purple"
                />
                <MatrixView 
                  label="Items (V^T)" 
                  matrix={[[0.9, 0.1, 0.2]]} 
                  color="emerald"
                />
              </div>
            </div>

            <Card className="text-left">
              <h4 className="text-white font-bold mb-2">Geometric Interpretation</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                We are embedding both users and items into the same low-dimensional space. The "dot product" in this space predicts the rating—meaning users and movies that point in the same direction are a good match.
              </p>
            </Card>
          </Section>
        )}

        {activeChapter === 4 && (
          <Section key="ch4" title="LoRA: The Geometry of Fine-Tuning" icon={Cpu}>
            <div className="prose prose-invert max-w-none mb-12 text-left">
              <p className="text-lg text-slate-300">
                LoRA is the ultimate application of the low-rank hypothesis. We assume the difference between a pretrained model and a task-specific model, <InlineMath math="\Delta W" />, lives in a low-rank subspace.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
              <div className="space-y-8">
                <Card className="bg-emerald-500/5 border-emerald-500/20 py-10">
                  <BlockMath math="\Delta W = B \cdot A" />
                  <div className="flex justify-center mt-6 gap-2">
                    <div className="w-12 h-20 rounded bg-emerald-500/30 border border-emerald-500/50 flex items-center justify-center text-[10px] font-black text-emerald-400">B</div>
                    <div className="flex items-center text-emerald-400 font-bold">×</div>
                    <div className="w-20 h-8 rounded bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center text-[10px] font-black text-emerald-400">A</div>
                  </div>
                </Card>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 italic text-sm text-slate-400">
                  "By freezing the original weights and only training the low-rank update, we respect the intrinsic dimensionality of the task without losing the pretrained knowledge."
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Full Circle</h3>
                <Card className="space-y-6">
                   <div className="flex items-start gap-4">
                     <div className="p-2 rounded bg-indigo-500/10 text-indigo-400">1</div>
                     <p className="text-xs text-slate-300">PCA: Find subspace of <b>Data</b>.</p>
                   </div>
                   <div className="flex items-start gap-4">
                     <div className="p-2 rounded bg-purple-500/10 text-purple-400">2</div>
                     <p className="text-xs text-slate-300">Matrix Factorization: Find subspace of <b>Interactions</b>.</p>
                   </div>
                   <div className="flex items-start gap-4">
                     <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">3</div>
                     <p className="text-xs text-slate-300">LoRA: Find subspace of <b>Knowledge Updates</b>.</p>
                   </div>
                </Card>

                <div className="p-8 rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                  <h4 className="font-black uppercase tracking-widest text-[10px] mb-2 opacity-80">Oral Exam Closer</h4>
                  <p className="text-sm font-bold leading-relaxed">
                    "The story of modern Machine Learning is the discovery that even in high-dimensional spaces, the signal is always low-rank. SVD is the tool that lets us see it."
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

