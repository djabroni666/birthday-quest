"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Final() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 250,
      spread: 120,
      origin: {
        y: 0.6,
      },
    });

    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1800);
    const t3 = setTimeout(() => setStep(3), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (!loading) return;

    let value = 0;

    const interval = setInterval(() => {
      value += 2;

      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setFound(true);

          confetti({
            particleCount: 180,
            spread: 100,
          });
        }, 500);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <main className="app">

      <div className="background" />
      <div className="overlay" />

      <section className="content">

        {!loading && !found && (
          <>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              style={{
                fontSize: 90,
                marginBottom: 30,
              }}
            >
              ❤️
            </motion.div>

            {step >= 1 && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                С Днём Рождения,
                <br />
                Зайка
              </motion.h1>
            )}

            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Ты прошла все испытания.
                <br />
                Спасибо,
                <br />
                что ты есть у меня.
                <br />
                Я очень тебя люблю ❤️
              </motion.p>
            )}

            {step >= 3 && (
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setLoading(true)}
              >
                Получить подарок 🎁
              </motion.button>
            )}

          </>
        )}

        {loading && !found && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              width: "100%",
              maxWidth: 320,
              textAlign: "center",
            }}
          >
            <h1>🎁</h1>

            <p>Поиск подарка...</p>

            <div
              style={{
                width: "100%",
                height: 12,
                borderRadius: 999,
                background: "rgba(255,255,255,.1)",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{
                  width: `${progress}%`,
                }}
                style={{
                  height: "100%",
                  background: "#ff4d6d",
                }}
              />
            </div>

            <p style={{ marginTop: 20 }}>
              {progress}%
            </p>
          </motion.div>
        )}

        {found && (
          <motion.div
            initial={{
              opacity: 0,
              scale: .8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 90,
                marginBottom: 20,
              }}
            >
              🎁
            </div>

            <h1>Подарок найден!</h1>

            <p>
              Он ждёт тебя...
              <br />
              <br />
              <strong>
                ПОД КРОВАТЬЮ ❤️
              </strong>
            </p>
          </motion.div>
        )}

      </section>

    </main>
  );
}