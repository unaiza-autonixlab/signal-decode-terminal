import { useEffect, useRef, useState } from "react";

interface Step {
  cmd: string;
  res: string;
}

const steps: Step[] = [
  { cmd: "", res: "" },
  { cmd: "", res: "" },
  { cmd: "", res: "" },
];

const TypingAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ text: string; type: "cmd" | "res"; visible: boolean }[]>([]);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          runSequence();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const runSequence = async () => {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      
      // Type command character by character
      for (let c = 1; c <= step.cmd.length; c++) {
        const partial = step.cmd.substring(0, c);
        setLines(prev => {
          const newLines = prev.filter(l => !(l.type === "cmd" && !l.visible));
          const existing = newLines.findIndex((l, idx) => l.type === "cmd" && idx === i * 2);
          if (existing >= 0) {
            const updated = [...newLines];
            updated[existing] = { text: partial, type: "cmd", visible: true };
            return updated;
          }
          return [...newLines, { text: partial, type: "cmd", visible: true }];
        });
        await delay(40);
      }

      await delay(400);

      // Show response
      setLines(prev => [...prev, { text: step.res, type: "res", visible: true }]);

      await delay(800);
    }
  };

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  return (
    <div ref={containerRef} className="space-y-4 text-base md:text-lg min-h-[160px] leading-relaxed overflow-x-auto">
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.type === "cmd"
              ? "text-muted-foreground whitespace-nowrap"
              : "text-terminal-green font-bold ml-4 transition-opacity duration-500 whitespace-nowrap"
          }
        >
          {line.text}
          {line.type === "cmd" && i === lines.length - 1 && <span className="terminal-cursor" />}
        </div>
      ))}
    </div>
  );
};

export default TypingAnimation;
