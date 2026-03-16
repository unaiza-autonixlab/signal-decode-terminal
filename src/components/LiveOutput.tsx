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

const wrap = (i: number) => ((i % slides.length) + slides.length) % slides.length;

const LiveOutput = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [groupOpacity, setGroupOpacity] = useState(0);
  const [playing, setPlaying] = useState(true);

  const currentRef = useRef(0);
  const playingRef = useRef(true);
  const transitioningRef = useRef(false);
  const pendingRef = useRef<number | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((cb: () => void, ms: number) => {
    const t = setTimeout(cb, ms);
    timersRef.current.push(t);
    return t;
  }, []);

  const runTransition = useCallback((target: number) => {
    if (transitioningRef.current) {
      pendingRef.current = target;
      return;
    }
    if (target === currentRef.current) {
      // no-op, schedule next if playing
      if (playingRef.current) scheduleNext();
      return;
    }

    transitioningRef.current = true;
    pendingRef.current = null;
    clearTimers();

    // Phase 1: fade out
    setGroupOpacity(0);

    addTimer(() => {
      // Phase 2: swap content (while invisible)
      currentRef.current = target;
      setDisplayIndex(target);
      setDotIndex(target);

      // Phase 3: fade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setGroupOpacity(1);
          addTimer(() => {
            transitioningRef.current = false;

            if (pendingRef.current !== null) {
              const next = pendingRef.current;
              pendingRef.current = null;
              runTransition(next);
            } else if (playingRef.current) {
              scheduleNext();
            }
          }, FADE_MS);
        });
      });
    }, FADE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleNext = useCallback(() => {
    addTimer(() => {
      if (!playingRef.current) return;
      runTransition(wrap(currentRef.current + 1));
    }, HOLD_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mount: fade in first slide
  useEffect(() => {
    transitioningRef.current = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setGroupOpacity(1);
        addTimer(() => {
          transitioningRef.current = false;
          if (playingRef.current) scheduleNext();
        }, FADE_MS);
      });
    });
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleArrow = (dir: number) => {
    playingRef.current = false;
    setPlaying(false);
    clearTimers();

    const base = pendingRef.current ?? currentRef.current;
    const target = wrap(base + dir);
    setDotIndex(target);

    if (transitioningRef.current) {
      pendingRef.current = target;
      return;
    }
    runTransition(target);
  };

  const handleDot = (i: number) => {
    playingRef.current = false;
    setPlaying(false);
    clearTimers();

    const target = wrap(i);
    setDotIndex(target);

    if (transitioningRef.current) {
      pendingRef.current = target;
      return;
    }
    runTransition(target);
  };

  const handleToggle = () => {
    const next = !playingRef.current;
    playingRef.current = next;
    setPlaying(next);
    clearTimers();

    if (next && !transitioningRef.current) {
      scheduleNext();
    }
  };

  const slide = slides[displayIndex];
  const groupStyle = {
    opacity: groupOpacity,
    transition: `opacity ${FADE_MS}ms ease-in-out`,
  };

  return (
    <section className="max-w-4xl mx-auto py-14 px-6 border-t border-border">
      <div className="mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">&gt; LIVE_OUTPUT</h2>
        <p className="text-muted-foreground text-sm md:text-base italic leading-relaxed">
          This is what happens when you trigger the system.
        </p>
      </div>

      {/* Single animated group: toggle + label + image */}
      <div style={groupStyle}>
        {/* Play/Pause + Step label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={handleToggle}
            aria-label={playing ? "Pause" : "Play"}
            className="text-terminal-green hover:text-primary transition-colors"
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <span className="text-sm md:text-base font-mono text-terminal-green tracking-wide min-w-[320px] text-left">
            {slide.label}
          </span>
        </div>

        {/* Carousel image */}
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
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-contain"
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
      </div>

      {/* Dots — outside fade group */}
      <div className="flex justify-center gap-2.5 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
              i === dotIndex ? "bg-primary" : "bg-muted-foreground/30"
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
