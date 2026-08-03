"use client";

import { motion } from "framer-motion";

type HomeScreenProps = {
  onStart: () => void;
};

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <main className="app">
      <div className="background" />
      <div className="overlay" />

      <section className="content">
        <motion.span
          className="subtitle"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Birthday Quest
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Для моей
          <br />
          Зайки ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 0.55 }}
        >
          Сегодня тебя ждёт
          <br />
          небольшое путешествие,
          <br />
          в конце которого тебя ждёт подарок.
        </motion.p>

        <motion.button
          onClick={onStart}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 120,
          }}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Начать путешествие
        </motion.button>
      </section>
    </main>
  );
}