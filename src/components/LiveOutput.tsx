import { useEffect, useRef, useState } from "react";
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
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [cssOpacity, setCssOpacity] = useState(1);
  const [useTransition, setUseTransition] = useState(false);
  const [playing, setPlaying] = useState(true);

  // All mutable state in refs to avoid stale closures
  const playingRef = useRef(true);
  const busyRef = useRef(false);
  const currentRef = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  // Core transition: fade out → swap → fade in, then call onDone
  const runTransition = (targetIdx: number, onDone: () => void) => {
    const idx = wrap(targetIdx);
    if (idx === currentRef.current) {
      onDone();
      return;
    }

    busyRef.current = true;
    setDotIndex(idx); // dots update immediately
    setUseTransition(true);
    setCssOpacity(0); // fade out

    addTimer(() => {
      // Fade-out complete. Swap image while at opacity 0.
      currentRef.current = idx;
      setVisibleIndex(idx);

      // Disable transition briefly so the new image renders at opacity 0
      setUseTransition(false);
      setCssOpacity(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Now enable transition and fade in
          setUseTransition(true);
          setCssOpacity(1);

          addTimer(() => {
            // Fade-in complete
            busyRef.current = false;
            onDone();
          }, FADE_MS);
        });
      });
    }, FADE_MS);
  };

  // Schedule next auto-play cycle
  const scheduleNext = () => {
    addTimer(() => {
      if (!playingRef.current) return;
      runTransition(currentRef.current + 1, () => {
        if (playingRef.current) scheduleNext();
      });
    }, HOLD_MS);
  };

  // Start auto-play on mount
  useEffect(() => {
    scheduleNext();
    return clearAllTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle play/pause toggle
  const handleToggle = () => {
    const next = !playingRef.current;
    playingRef.current = next;
    setPlaying(next);
    if (next && !busyRef.current) {
      scheduleNext();
    }
  };

  const navigateTo = (targetIdx: number) => {
    playingRef.current = false;
    setPlaying(false);
    clearAllTimers();

    if (busyRef.current) {
      // Interrupt: snap to current state instantly, then start new transition
      busyRef.current = false;
      setUseTransition(false);
      setCssOpacity(1);

      requestAnimationFrame(() => {
        runTransition(targetIdx, () => {});
      });
    } else {
      runTransition(targetIdx, () => {});
    }
  };

  const handleArrow = (direction: number) => {
    navigateTo(currentRef.current + direction);
  };

  const handleDot = (i: number) => {
    navigateTo(i);
  };

  const slide = slides[visibleIndex];
  const style: React.CSSProperties = useTransition
    ? { opacity: cssOpacity, transition: `opacity ${FADE_MS}ms ease-in-out` }
    : { opacity: cssOpacity };

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
          style={style}
        >
          {slide.label}
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
            src={slide.src}
            alt={slide.label}
            className="w-full h-full object-contain"
            style={style}
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
