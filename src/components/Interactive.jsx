import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, HelpCircle, ChevronDown, ChevronUp, Lightbulb, Beaker, ChevronRight } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// Robust renderer using react-markdown + math plugins
export const LatexRenderer = ({ text }) => {
  if (typeof text !== 'string') return text;
  
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc ml-6 mt-2 mb-4 space-y-1" {...props} />,
        li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export const Quiz = ({ question, options, correctAnswer, explanation }) => {
  const [selected, setSelected] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div className="glass-card border-indigo-500/20 bg-indigo-500/5 mb-6">
      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
        <HelpCircle size={18} className="text-indigo-400" /> Section Quiz
      </h4>
      <div className="text-sm text-slate-300 mb-6 leading-relaxed">
        <LatexRenderer text={question} />
      </div>
      
      <div className="space-y-3">
        {options.map((option, idx) => (
          <button
            key={idx}
            disabled={selected !== null}
            onClick={() => {
              setSelected(idx)
              setShowExplanation(true)
            }}
            className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-center justify-between ${
              selected === idx 
                ? (idx === correctAnswer ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-red-500/10 border-red-500/50 text-red-400')
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <span><LatexRenderer text={option} /></span>
            {selected === idx && (idx === correctAnswer ? <CheckCircle2 size={16} /> : <Circle size={16} />)}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-6 pt-6 border-t border-white/10 overflow-hidden"
          >
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Logic</p>
            <div className="text-sm text-slate-400 leading-relaxed">
              <LatexRenderer text={explanation} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const ProofBuilder = ({ title, theorem, steps }) => {
  const [visibleSteps, setVisibleSteps] = useState(0)

  return (
    <div className="glass-card border-emerald-500/10 bg-emerald-500/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
          <Lightbulb size={12} /> Step-by-Step Proof
        </span>
      </div>

      <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-white/5 italic text-slate-300 text-sm">
        <strong className="text-emerald-400 not-italic block mb-1 uppercase text-[10px] tracking-widest font-black">Theorem:</strong>
        <div className="not-italic py-2 text-center">
           <LatexRenderer text={theorem} />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {steps.slice(0, visibleSteps).map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border bg-white/5 border-white/10 text-slate-200 shadow-sm"
            >
              <div className="flex gap-4">
                <span className="font-mono text-[10px] opacity-50 mt-1 shrink-0">STEP 0{idx + 1}</span>
                <div className="text-sm leading-relaxed">
                  <LatexRenderer text={step} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {visibleSteps < steps.length && (
           <motion.div
            key="placeholder"
            className="p-4 rounded-xl border border-dashed border-white/5 bg-transparent opacity-30"
           >
             <div className="flex gap-4 items-center">
               <span className="font-mono text-[10px]">STEP 0{visibleSteps + 1}</span>
               <div className="h-4 w-24 bg-white/10 rounded-full animate-pulse" />
             </div>
           </motion.div>
        )}
      </div>

      <div className="mt-8 flex gap-4">
        {visibleSteps < steps.length ? (
          <button 
            onClick={() => setVisibleSteps(prev => prev + 1)}
            className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all flex items-center gap-2"
          >
            Reveal Next Step <ChevronDown size={14} />
          </button>
        ) : (
          <button 
            onClick={() => setVisibleSteps(0)}
            className="px-6 py-2 rounded-lg bg-white/5 text-slate-400 font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-2"
          >
            Reset Proof <ChevronUp size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

export const Example = ({ title, context, question, solution }) => {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div className="glass-card border-amber-500/10 bg-amber-500/5 mt-4">
      <h4 className="text-amber-400 font-bold mb-4 flex items-center gap-2 text-sm">
        <Beaker size={16} /> Practice Example: {title}
      </h4>
      
      <div className="text-sm text-slate-300 space-y-4 mb-6">
        <div className="leading-relaxed"><LatexRenderer text={context} /></div>
        <div className="font-bold text-white"><LatexRenderer text={question} /></div>
      </div>

      <button
        onClick={() => setShowSolution(!showSolution)}
        className="text-xs font-bold text-amber-400 flex items-center gap-1 hover:text-amber-300 transition-colors uppercase tracking-widest"
      >
        {showSolution ? 'Hide Solution' : 'Check Solution'} <ChevronRight size={14} className={showSolution ? 'rotate-90' : ''} />
      </button>

      <AnimatePresence>
        {showSolution && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5 overflow-hidden"
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Solution</p>
            <div className="text-sm text-slate-400 leading-relaxed">
              <LatexRenderer text={solution} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
