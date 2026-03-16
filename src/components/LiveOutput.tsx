import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import tg1 from "@/assets/tg1.jpg";
import tg2 from "@/assets/tg2.jpg";
import tg3 from "@/assets/tg3.jpg";
import tg4 from "@/assets/tg4.jpg";

const CALENDLY_URL = "https://calendly.com/unaiza-autonixlab/discovery-call?month=2026-03";

const slides = [
  { src: tg1, label: "> step_01: trigger sent via Telegram", maxWidth: "max-w-[480px]" },
  { src: tg2, label: "> step_02: system initializing...", maxWidth: "max-w-[480px]" },
  { src: tg3, label: "> step_03: content ready for approval", maxWidth: "max-w-[480px]" },
  { src: tg4, label: "> step_04: output — post 1 of 13", maxWidth: "max-w-[700px]" },
];

const DISPLAY_MS = 3000;
const FADE_MS = 400;

const LiveOutput = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState<"in" | "out">("in");
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const goTo = useCallback(
    (next: number) => {
      setFade("out");
      setTimeout(() => {
        setActiveIndex(next % slides.length);
        setFade("in");
      }, FADE_MS);
    },
    []
  );

  // Auto-play loop
  useEffect(() => {
    if (!playing) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      goTo(activeIndex + 1);
    }, DISPLAY_MS);
    return clearTimer;
  }, [activeIndex, playing, fade, goTo]);

  const handlePrev = () => {
    clearTimer();
    goTo((activeIndex - 1 + slides.length) % slides.length + slides.length);
  };

  const handleNext = () => {
    clearTimer();
    goTo(activeIndex + 1);
  };

  const current = slides[activeIndex];

  return (
    <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">&gt; LIVE_OUTPUT</h2>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="text-xs font-mono text-terminal-green hover:brightness-125 transition-all"
        >
          [{playing ? "PLAYING" : "PAUSED"}]
        </button>
      </div>

      <p className="text-muted-foreground text-base md:text-lg italic text-center mb-10 leading-relaxed">
        This is what happens when you trigger the system.
      </p>

      {/* Step label */}
      <div className="text-center mb-4">
        <span className="text-sm md:text-base font-mono text-terminal-green tracking-wide">
          {current.label}
        </span>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-2 md:gap-6">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous screenshot"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        {/* Image container */}
        <div className={`w-full ${current.maxWidth} mx-auto`}>
          <img
            src={current.src}
            alt={current.label}
            className="w-full h-auto rounded-sm"
            style={{
              opacity: fade === "in" ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease`,
            }}
          />
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          aria-label="Next screenshot"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearTimer(); goTo(i); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i === activeIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all text-base"
        >
          $ ./book-discovery-call
        </a>
      </div>
    </section>
  );
};

export default LiveOutput;
