import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, RotateCcw, Activity } from 'lucide-react';

export const PCAVisualizer = () => {
  // Generate some synthetic 2D data with a clear correlation
  const [data, setData] = useState(() => 
    Array.from({ length: 40 }, () => {
      const x = (Math.random() - 0.5) * 200;
      const y = x * 0.8 + (Math.random() - 0.5) * 50; // Correlated with some noise
      return { x, y };
    })
  );

  const [showComponents, setShowComponents] = useState(true);
  const [isRotating, setIsRotating] = useState(false);

  // Simple PCA calculation (Power Iteration / Eigendecomposition for 2D)
  const stats = useMemo(() => {
    const n = data.length;
    const meanX = data.reduce((sum, d) => sum + d.x, 0) / n;
    const meanY = data.reduce((sum, d) => sum + d.y, 0) / n;
    
    const centered = data.map(d => ({ x: d.x - meanX, y: d.y - meanY }));
    
    // Covariance matrix elements
    let covXX = 0, covXY = 0, covYY = 0;
    centered.forEach(d => {
      covXX += d.x * d.x;
      covXY += d.x * d.y;
      covYY += d.y * d.y;
    });
    
    // Eigenvalues of [[covXX, covXY], [covXY, covYY]]
    const trace = covXX + covYY;
    const det = covXX * covYY - covXY * covXY;
    const gap = Math.sqrt(trace * trace - 4 * det);
    const lambda1 = (trace + gap) / 2;
    const lambda2 = (trace - gap) / 2;
    
    // Eigenvectors
    let v1;
    if (covXY !== 0) {
      v1 = { x: lambda1 - covYY, y: covXY };
    } else {
      v1 = covXX > covYY ? { x: 1, y: 0 } : { x: 0, y: 1 };
    }
    
    // Normalize
    const mag = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    v1 = { x: v1.x / mag, y: v1.y / mag };
    const v2 = { x: -v1.y, y: v1.x };
    
    return { meanX, meanY, v1, v2, lambda1, lambda2, totalVar: lambda1 + lambda2 };
  }, [data]);

  const regenerateData = () => {
    const angle = Math.random() * Math.PI;
    const stretch = 0.5 + Math.random() * 1.5;
    setData(Array.from({ length: 40 }, () => {
      const u = (Math.random() - 0.5) * 200 * stretch;
      const v = (Math.random() - 0.5) * 50;
      // Rotate
      const x = u * Math.cos(angle) - v * Math.sin(angle);
      const y = u * Math.sin(angle) + v * Math.cos(angle);
      return { x, y };
    }));
  };

  return (
    <div className="bg-slate-900/50 rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <Activity className="text-indigo-400" size={20} />
            Interactive PCA Space
          </h4>
          <p className="text-sm text-slate-400 italic">Visualizing the Principal Components of a 2D dataset.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowComponents(!showComponents)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${showComponents ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
          >
            <Sliders size={14} /> {showComponents ? 'Hide Components' : 'Show Components'}
          </button>
          <button 
            onClick={regenerateData}
            className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-2"
          >
            <RotateCcw size={14} /> New Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2 relative aspect-square bg-[#0a0a0c] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
          {/* Grid Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute w-full h-[1px] bg-white" style={{ top: `${i * 10}%` }} />
            ))}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute h-full w-[1px] bg-white" style={{ left: `${i * 10}%` }} />
            ))}
          </div>

          <svg width="100%" height="100%" viewBox="-150 -150 300 300" className="overflow-visible">
            {/* Data Points */}
            {data.map((d, i) => (
              <motion.circle
                key={i}
                layout
                initial={{ r: 0 }}
                animate={{ cx: d.x, cy: d.y, r: 4 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                fill="currentColor"
                className="text-indigo-400/40"
              />
            ))}

            {/* Principal Components */}
            <AnimatePresence>
              {showComponents && (
                <>
                  {/* PC1 */}
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1, x1: -stats.v1.x * 120, y1: -stats.v1.y * 120, x2: stats.v1.x * 120, y2: stats.v1.y * 120 }}
                    exit={{ opacity: 0 }}
                    stroke="#818cf8"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                  />
                  <motion.text
                    animate={{ x: stats.v1.x * 130, y: stats.v1.y * 130 }}
                    fill="#818cf8"
                    className="text-[10px] font-black uppercase"
                    textAnchor="middle"
                  >
                    PC1
                  </motion.text>

                  {/* PC2 */}
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1, x1: -stats.v2.x * 60, y1: -stats.v2.y * 60, x2: stats.v2.x * 60, y2: stats.v2.y * 60 }}
                    exit={{ opacity: 0 }}
                    stroke="#fb7185"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <motion.text
                    animate={{ x: stats.v2.x * 70, y: stats.v2.y * 70 }}
                    fill="#fb7185"
                    className="text-[10px] font-black uppercase"
                    textAnchor="middle"
                  >
                    PC2
                  </motion.text>
                </>
              )}
            </AnimatePresence>
          </svg>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h5 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Variance Explained</h5>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-indigo-400">PC1 (Primary)</span>
                  <span className="text-white">{((stats.lambda1 / stats.totalVar) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.lambda1 / stats.totalVar) * 100}%` }}
                    className="h-full bg-indigo-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-rose-400">PC2 (Secondary)</span>
                  <span className="text-white">{((stats.lambda2 / stats.totalVar) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.lambda2 / stats.totalVar) * 100}%` }}
                    className="h-full bg-rose-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
            <p className="text-sm text-slate-400 leading-relaxed">
              <span className="text-white font-bold">Insight:</span> The first Principal Component (PC1) is the direction that captures the maximum spread (variance) of the data. Mathematically, it is the <span className="text-indigo-400">top singular vector</span> of the centered data matrix.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
