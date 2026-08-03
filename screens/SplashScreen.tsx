"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type SplashProps = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]"
      >
        <div className="text-center">

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="text-7xl mb-8"
          >
            ❤️
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: .4,
              duration: .8,
            }}
            className="text-5xl font-bold tracking-tight"
          >
            Birthday Quest
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: .75 }}
            transition={{
              delay: 1.2,
              duration: .8,
            }}
            className="mt-6 text-xl"
          >
            Для моей Зайки ❤️
          </motion.p>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}