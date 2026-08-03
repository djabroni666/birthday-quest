"use client";

import { useState } from "react";

import SplashScreen from "@/screens/SplashScreen";
import HomeScreen from "@/screens/HomeScreen";
import CatchHearts from "@/screens/CatchHearts/CatchHearts";
import Memory from "@/screens/Memory/Memory";
import Scratch from "@/screens/Scratch/Scratch";
import FindHeart from "@/screens/FindHeart/FindHeart";
import Final from "@/screens/Final/Final";

type Screen =
  | "splash"
  | "home"
  | "catch-hearts"
  | "memory"
  | "scratch"
  | "find-heart"
  | "final";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");

  switch (screen) {
    case "splash":
      return (
        <SplashScreen
          onFinish={() => setScreen("home")}
        />
      );

    case "home":
      return (
        <HomeScreen
          onStart={() => setScreen("catch-hearts")}
        />
      );

    case "catch-hearts":
  return (
    <CatchHearts
      onFinish={() => setScreen("memory")}
    />
  );

case "memory":
  return (
    <Memory
      onFinish={() => setScreen("scratch")}
    />
  );
  case "scratch":
  return (
    <Scratch
      onFinish={() => setScreen("find-heart")}
    />
  );

case "find-heart":
  return (
    <FindHeart
      onFinish={() => setScreen("final")}
    />
  );

case "final":
  return <Final />;
  }
}