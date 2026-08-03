"use client";

import { useEffect, useRef, useState } from "react";
import GameLayout from "@/components/game/GameLayout";

type Props = {
  onFinish?: () => void;
};

export default function Scratch({ onFinish }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawing = useRef(false);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.fillStyle = "#D4AF37";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f8e28c";

    ctx.font = "bold 36px Arial";

    ctx.textAlign = "center";

    ctx.fillText("Сотри меня ✨", canvas.width / 2, canvas.height / 2);
  }, []);

  function scratch(
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) {
    if (!drawing.current || done) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    let x = 0;
    let y = 0;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(x, y, 28, 0, Math.PI * 2);

    ctx.fill();

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const percent =
      transparent / (canvas.width * canvas.height);

    if (percent > 0.45 && !done) {
      setDone(true);

      setTimeout(() => {
        onFinish?.();
      }, 1500);
    }
  }

  return (
    <GameLayout
      title="✨ Сотри секрет"
      subtitle="Пальцем сотри золотой слой."
    >
      <div
        style={{
          position: "relative",
          width: 320,
          height: 320,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,.08)",
            fontSize: 90,
          }}
        >
          ❤️
        </div>

        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            touchAction: "none",
          }}
          onMouseDown={() => (drawing.current = true)}
          onMouseUp={() => (drawing.current = false)}
          onMouseLeave={() => (drawing.current = false)}
          onMouseMove={scratch}
          onTouchStart={() => (drawing.current = true)}
          onTouchEnd={() => (drawing.current = false)}
          onTouchMove={scratch}
        />
      </div>

      {done && (
        <h2
          style={{
            textAlign: "center",
            marginTop: 40,
          }}
        >
          ❤️ Отлично!
        </h2>
      )}
    </GameLayout>
  );
}