import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

export const FadeInWhenVisible = ({ children, delay = 0, direction = 'up', className = '' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right', className?: string, key?: React.Key }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0
    },
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.6, delay } }
  };

  return (
    <motion.div ref={ref} variants={variants} initial="hidden" animate={controls} className={className}>
      {children}
    </motion.div>
  );
};

export const Counter = ({ end, label, icon: Icon, delay = 0 }: { end: number, label: string, icon: any, delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className="p-5 text-center">
      <motion.div 
        initial={{ scale: 0, y: 20 }} 
        animate={isInView ? { scale: 1, y: 0 } : {}} 
        transition={{ type: "spring", bounce: 0.6, duration: 0.8, delay: delay + 0.2 }}
        className="group relative inline-block mx-auto mb-4"
      >
        <Icon aria-label={`${label} icon`} role="img" className="w-12 h-12 text-primary drop-shadow-[0_0_15px_#ff3333] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_#ff6666]" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg border border-gray-700">
          Exact count: {end.toLocaleString()}
        </div>
      </motion.div>
      <div className="group relative inline-block mx-auto">
        <div className="text-5xl font-bold text-white mb-2 font-heading cursor-default">{count}{end > 100 ? '+' : ''}</div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg border border-gray-700">
          {label}
        </div>
      </div>
      <div className="text-gray-400 text-lg">{label}</div>
    </motion.div>
  );
};
