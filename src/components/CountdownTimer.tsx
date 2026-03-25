"use client";
import { useState, useEffect } from "react";

export default function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate).getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [endDate]);

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      <span className="text-[#C62828]">⏱</span>
      {[
        { v: timeLeft.d, l: "j" },
        { v: timeLeft.h, l: "h" },
        { v: timeLeft.m, l: "m" },
        { v: timeLeft.s, l: "s" },
      ].map(({ v, l }) => (
        <span key={l} className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-bold">
          {String(v).padStart(2, "0")}{l}
        </span>
      ))}
    </div>
  );
}
