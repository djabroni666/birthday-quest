"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  x: number;
  duration: number;
  onClick: () => void;
};

export default function Heart({
  x,
  duration,
  onClick,
}: Props) {
  const [clicked, setClicked] = useState(false);

  const size = 30 + Math.random() * 18;
  const drift = (Math.random() - 0.5) * 70;
  const rotate = (Math.random() - 0.5) * 30;

  function handleClick() {
    if (clicked) return;

    setClicked(true);

    setTimeout(() => {
      onClick();
    }, 120);
  }

  return (
    <AnimatePresence>
      {!clicked && (
        <motion.button
          initial={{
            y: 100,
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            y: -1000,
            opacity: [0, 1, 1, 0],
            x: [0, drift, -drift, drift / 2],
            rotate: [rotate, -rotate, rotate],
          }}
          exit={{
            scale: 1.8,
            opacity: 0,
          }}
          transition={{
            duration,
            ease: "linear",
          }}
          onClick={handleClick}
          style={{
            position: "absolute",
            left: `${x}%`,
            bottom: -60,
            fontSize: size,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            userSelect: "none",
            filter: "drop-shadow(0 0 12px rgba(255,70,120,.45))",
          }}
          whileHover={{
            scale: 1.12,
          }}
          whileTap={{
            scale: 0.8,
          }}
        >
          ❤️
        </motion.button>
      )}
    </AnimatePresence>
  );
}