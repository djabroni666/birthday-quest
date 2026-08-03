"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function Final() {
  useEffect(() => {
    confetti({
      particleCount: 250,
      spread: 120,
      origin: {
        y: 0.6,
      },
    });
  }, []);

  return (
    <main className="app">
      <div className="background" />
      <div className="overlay" />

      <section className="content">

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
          }}
          style={{
            fontSize: 90,
            marginBottom: 20,
          }}
        >
          🎉
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .3 }}
        >
          С Днём Рождения,
          <br />
          Зайка ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: .85 }}
          transition={{ delay: .7 }}
          style={{
            maxWidth: 500,
            lineHeight: 1.8,
          }}
        >
          Ты прошла все испытания.
          <br />
          Надеюсь, тебе понравилось это маленькое приключение.
          <br /><br />
          Я очень тебя люблю ❤️
          
        </motion.p>

      </section>
    </main>
  );
}