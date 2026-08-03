"use client";

import { useEffect, useMemo, useState } from "react";
import confetti from "canvas-confetti";
import GameLayout from "@/components/game/GameLayout";
import Heart from "@/components/game/Heart";

type HeartData = {
  id: number;
  x: number;
  duration: number;
};

type Props = {
  onFinish?: () => void;
};

const WIN_SCORE = 15;

export default function CatchHearts({ onFinish }: Props) {
  const [hearts, setHearts] = useState<HeartData[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const progress = useMemo(
    () => `${Math.min(score, WIN_SCORE)} / ${WIN_SCORE}`,
    [score]
  );

  useEffect(() => {
    if (finished) return;

    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 90,
          duration: 3 + Math.random() * 2,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, [finished]);

  function popHeart(id: number) {
    if (finished) return;

    setHearts((prev) => prev.filter((h) => h.id !== id));

    setScore((prev) => {
      const next = prev + 1;

      if (next >= WIN_SCORE) {
        setFinished(true);

        confetti({
          particleCount: 180,
          spread: 90,
          origin: {
            y: 0.6,
          },
        });

        setTimeout(() => {
          if (onFinish) {
            onFinish();
          } else {
            alert("❤️ Первая игра пройдена!");
          }
        }, 1500);
      }

      return next;
    });
  }

  return (
    <GameLayout
      title="❤️ Поймай сердечки"
      subtitle="Поймай все сердечки, чтобы открыть следующее испытание."
      progress={progress}
    >
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          x={heart.x}
          duration={heart.duration}
          onClick={() => popHeart(heart.id)}
        />
      ))}

      {finished && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            background: "rgba(0,0,0,.45)",
            fontSize: 42,
            fontWeight: 700,
            zIndex: 100,
          }}
        >
          ❤️ Молодец!
        </div>
      )}
    </GameLayout>
  );
}