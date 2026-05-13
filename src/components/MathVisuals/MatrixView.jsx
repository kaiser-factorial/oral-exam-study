import React from 'react';
import { motion } from 'framer-motion';

export const MatrixView = ({ matrix, label, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
  };

  const currentClass = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="flex flex-col items-center gap-2">
      {label && <span className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative p-4 rounded-xl border-2 ${currentClass} font-mono text-sm shadow-xl`}
      >
        {/* Matrix Brackets */}
        <div className="absolute left-0 top-0 bottom-0 w-2 border-l-2 border-current rounded-l-lg" />
        <div className="absolute right-0 top-0 bottom-0 w-2 border-r-2 border-current rounded-r-lg" />
        
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${matrix[0].length}, minmax(40px, 1fr))` }}>
          {matrix.flat().map((val, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-center h-8"
            >
              {typeof val === 'number' ? val.toFixed(2) : val}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const VectorView = ({ vector, label, color = 'indigo', vertical = true }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  };

  const currentClass = colorClasses[color] || colorClasses.indigo;

  return (
    <div className="flex flex-col items-center gap-2">
      {label && <span className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`relative p-3 rounded-lg border-2 ${currentClass} font-mono text-sm shadow-lg`}
      >
        <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-2`}>
          {vector.map((val, idx) => (
            <div key={idx} className="w-12 h-8 flex items-center justify-center">
              {typeof val === 'number' ? val.toFixed(2) : val}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
