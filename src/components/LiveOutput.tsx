import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

import tg1 from "@/assets/tg1.jpg";
import tg2 from "@/assets/tg2.jpg";
import tg3 from "@/assets/tg3.jpg";
import tg4 from "@/assets/tg4.jpg";
import tg5 from "@/assets/tg5.jpg";

const LINKEDIN_URL = "https://linkedin.com/in/unaiza-masood";

const slides = [
  { src: tg1, label: "> step_01: trigger sent via Telegram", mobileMax: "max-w-[480px]", desktopMax: "md:max-w-[340px]" },
  { src: tg2, label: "> step_02: system initializing...", mobileMax: "max-w-[480px]", desktopMax: "md:max-w-[340px]" },
  { src: tg3, label: "> step_03: content ready for approval", mobileMax: "max-w-[480px]", desktopMax: "md:max-w-[340px]" },
  { src: tg4, label: "> step_04: output — branded calendar", mobileMax: "max-w-[700px]", desktopMax: "md:max-w-[500px]" },
  { src: tg5, label: "> step_05: output — week 2 detail view", mobileMax: "max-w-[700px]", desktopMax: "md:max-w-[500px]" },
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

  const goTo = useCallback((next: number) => {
    setFade("out");
    setTimeout(() => {
      setActiveIndex(((next % slides.length) + slides.length) % slides.length);
      setFade("in");
    }, FADE_MS);
  }, []);

  useEffect(() => {
    if (!playing) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      goTo(activeIndex + 1);
    }, DISPLAY_MS);
    return clearTimer;
  }, [activeIndex, playing, fade, goTo]);

  const handlePrev = () => {
    setPlaying(false);
    clearTimer();
    goTo(activeIndex - 1);
  };

  const handleNext = () => {
    setPlaying(false);
    clearTimer();
    goTo(activeIndex + 1);
  };

  const current = slides[activeIndex];

  return (
    <section className="max-w-5xl mx-auto py-12 px-6 border-t border-border">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">&gt; LIVE_OUTPUT</h2>
        <p className="text-muted-foreground text-base md:text-lg italic leading-relaxed">
          This is what happens when you trigger the system.
        </p>
      </div>

      {/* Play/Pause + Step label */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="text-terminal-green hover:text-primary transition-colors"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <span className="text-sm md:text-base font-mono text-terminal-green tracking-wide">
          {current.label}
        </span>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-2 md:gap-6">
        <button
          onClick={handlePrev}
          aria-label="Previous screenshot"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        <div className={`w-full ${current.mobileMax} ${current.desktopMax} mx-auto`}>
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

        <button
          onClick={handleNext}
          aria-label="Next screenshot"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2.5 mt-6">
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
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all text-base tracking-wide"
        >
          See this running for your clients. Reply YES.
        </a>
      </div>
    </section>
  );
};

export default LiveOutput;
