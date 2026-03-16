import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

import tg1 from "@/assets/tg1.jpg";
import tg2 from "@/assets/tg2.jpg";
import tg3 from "@/assets/tg3.jpg";
import tg4 from "@/assets/tg4.jpg";
import tg5 from "@/assets/tg5.jpg";

const LINKEDIN_URL = "https://linkedin.com/in/unaiza-masood";

const slides = [
  { src: tg1, label: "> step_01: trigger sent via Telegram" },
  { src: tg2, label: "> step_02: system initializing..." },
  { src: tg3, label: "> step_03: content ready for approval" },
  { src: tg4, label: "> step_04: output — branded calendar" },
  { src: tg5, label: "> step_05: output — week 2 detail view" },
];

const FADE_MS = 600;
const HOLD_MS = 3000;

const LiveOutput = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(playing);

  playingRef.current = playing;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const transitionTo = useCallback((nextIndex: number) => {
    if (transitioning) return;
    const idx = ((nextIndex % slides.length) + slides.length) % slides.length;
    if (idx === displayIndex) return;

    setTransitioning(true);
    setActiveIndex(idx); // dots update immediately

    // Fade out current
    setOpacity(0);

    timerRef.current = setTimeout(() => {
      // Swap image while invisible
      setDisplayIndex(idx);

      // Small rAF to ensure the browser paints opacity:0 with new image before fading in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Fade in new
          setOpacity(1);

          timerRef.current = setTimeout(() => {
            setTransitioning(false);
            // If playing, schedule next after hold
            if (playingRef.current) {
              timerRef.current = setTimeout(() => {
                transitionTo(idx + 1);
              }, HOLD_MS);
            }
          }, FADE_MS);
        });
      });
    }, FADE_MS);
  }, [transitioning, displayIndex]);

  // Auto-play: start the first hold timer on mount or when playing resumes
  useEffect(() => {
    if (playing && !transitioning) {
      clearTimer();
      timerRef.current = setTimeout(() => {
        transitionTo(activeIndex + 1);
      }, HOLD_MS);
    }
    if (!playing) {
      // Only clear hold timers, not transition timers
      if (!transitioning) clearTimer();
    }
    return () => {
      if (!transitioning) clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const handleArrow = useCallback((direction: number) => {
    setPlaying(false);
    if (transitioning) return;
    clearTimer();
    const next = activeIndex + direction;
    transitionTo(next);
  }, [activeIndex, transitioning, transitionTo]);

  const handleDot = useCallback((i: number) => {
    setPlaying(false);
    if (transitioning) return;
    clearTimer();
    transitionTo(i);
  }, [transitioning, transitionTo]);

  const handleToggle = useCallback(() => {
    setPlaying(p => !p);
  }, []);

  const current = slides[displayIndex];

  return (
    <section className="max-w-4xl mx-auto py-14 px-6 border-t border-border">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">&gt; LIVE_OUTPUT</h2>
        <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
          This is what happens when you trigger the system.
        </p>
      </div>

      {/* Play/Pause + Step label */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={handleToggle}
          aria-label={playing ? "Pause" : "Play"}
          className="text-terminal-green hover:text-primary transition-colors"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <span
          className="text-sm md:text-base font-mono text-terminal-green tracking-wide min-w-[320px] text-left"
          style={{
            opacity,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          {current.label}
        </span>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-3 md:gap-6">
        <button
          onClick={() => handleArrow(-1)}
          aria-label="Previous screenshot"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors p-1"
        >
          <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
        </button>

        <div className="w-full max-w-[480px] md:max-w-[240px] mx-auto aspect-[9/16] flex items-center justify-center overflow-hidden rounded-sm">
          <img
            src={current.src}
            alt={current.label}
            className="w-full h-full object-contain"
            style={{
              opacity,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          />
        </div>

        <button
          onClick={() => handleArrow(1)}
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
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              i === activeIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 font-bold hover:brightness-110 transition-all text-base tracking-wide rounded-sm"
        >
          See this running for your clients. Reply YES.
        </a>
      </div>
    </section>
  );
};

export default LiveOutput;
