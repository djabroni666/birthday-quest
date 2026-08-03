"use client";

import { useEffect, useState } from "react";
import GameLayout from "@/components/game/GameLayout";

type Props = {
  onFinish?: () => void;
};

const sequence = [0, 2, 1, 3];

export default function Memory({ onFinish }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [user, setUser] = useState<number[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (playing) {
      if (step < sequence.length) {
        timeout = setTimeout(() => {
          setActive(sequence[step]);

          setTimeout(() => {
            setActive(null);
            setStep((s) => s + 1);
          }, 500);
        }, 600);
      } else {
        setPlaying(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [step, playing]);

  function click(index: number) {
    if (playing) return;

    const next = [...user, index];

    setUser(next);

    if (next[next.length - 1] !== sequence[next.length - 1]) {
      alert("Попробуй ещё ❤️");
      setUser([]);
      return;
    }

    if (next.length === sequence.length) {
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 700);
    }
  }

  return (
    <GameLayout
      title="🧠 Запомни последовательность"
      subtitle="Повтори порядок, в котором загорелись сердечки."
      progress={`${user.length} / ${sequence.length}`}
    >
      <div className="memory-grid">

        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => click(i)}
            className={`memory-card ${
              active === i ? "active" : ""
            }`}
          >
            ❤️
          </button>
        ))}

      </div>
    </GameLayout>
  );
}