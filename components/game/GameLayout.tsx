"use client";

import { ReactNode } from "react";

type GameLayoutProps = {
  title: string;
  subtitle: string;
  progress?: string;
  children: ReactNode;
};

export default function GameLayout({
  title,
  subtitle,
  progress,
  children,
}: GameLayoutProps) {
  return (
    <main className="app">

      <div className="background" />
      <div className="overlay" />

      <div className="game-container">

        {progress && (
          <span className="game-progress">
            {progress}
          </span>
        )}

        <h1>{title}</h1>

        <p>{subtitle}</p>

        <div className="game-content">
          {children}
        </div>

      </div>

    </main>
  );
}