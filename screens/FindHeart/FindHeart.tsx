"use client";

import { useMemo, useState } from "react";
import GameLayout from "@/components/game/GameLayout";

type Props = {
  onFinish?: () => void;
};

export default function FindHeart({ onFinish }: Props) {
  const [found, setFound] = useState(false);

  const specialIndex = useMemo(() => Math.floor(Math.random() * 36), []);

  function handleClick(index: number) {
    if (found) return;

    if (index === specialIndex) {
      setFound(true);

      setTimeout(() => {
        onFinish?.();
      }, 1200);
    }
  }

  return (
    <GameLayout
      title="❤️ Найди особенное сердечко"
      subtitle="Одно сердечко немного отличается. Найди его."
    >
      <div className="find-grid">
        {Array.from({ length: 36 }).map((_, index) => {
          const special = index === specialIndex;

          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`find-heart ${found && special ? "found" : ""}`}
              style={{
                opacity: special ? 0.92 : 1,
                transform: special ? "scale(0.93)" : "scale(1)",
              }}
            >
              ❤️
            </button>
          );
        })}
      </div>

      {found && (
        <div className="win-text">
          ❤️ Отлично!
        </div>
      )}
    </GameLayout>
  );
}