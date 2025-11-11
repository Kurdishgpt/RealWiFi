import { useEffect, useState } from "react";

interface SignalWavesProps {
  playing: boolean;
  speed: number;
}

export function SignalWaves({ playing, speed }: SignalWavesProps) {
  const [waves, setWaves] = useState([0, 1, 2]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {waves.map((index) => (
        <div
          key={index}
          className={`absolute rounded-full border-2 border-primary ${
            playing ? "animate-signal-wave" : ""
          }`}
          style={{
            width: "100px",
            height: "100px",
            animationDelay: `${index * 1}s`,
            animationDuration: `${3 / speed}s`,
          }}
        />
      ))}
    </div>
  );
}
