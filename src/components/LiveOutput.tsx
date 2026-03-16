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

const wrapIndex = (index: number) => ((index % slides.length) + slides.length) % slides.length;

const LiveOutput = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [dotIndex, setDotIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [playing, setPlaying] = useState(true);

  const visibleIndexRef = useRef(0);
  const playingRef = useRef(true);
  const transitioningRef = useRef(true);
  const pendingIndexRef = useRef<number | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    timersRef.current.push(timer);
    return timer;
  };

  const scheduleNextAutoplay = () => {
    if (!playingRef.current || transitioningRef.current) return;

    addTimer(() => {
      if (!playingRef.current || transitioningRef.current) return;
      startTransition(visibleIndexRef.current + 1);
    }, HOLD_MS);
  };

  const finishTransition = () => {
    transitioningRef.current = false;

    if (pendingIndexRef.current !== null) {
      const nextIndex = pendingIndexRef.current;
      pendingIndexRef.current = null;
      startTransition(nextIndex);
      return;
    }

    if (playingRef.current) {
      scheduleNextAutoplay();
    }
  };

  const startFadeIn = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpacity(1);
        addTimer(() => {
          finishTransition();
        }, FADE_MS);
      });
    });
  };

  const startTransition = (nextIndex: number) => {
    const targetIndex = wrapIndex(nextIndex);

    if (transitioningRef.current) {
      pendingIndexRef.current = targetIndex;
      return;
    }

    if (targetIndex === visibleIndexRef.current) {
      if (playingRef.current) {
        scheduleNextAutoplay();
      }
      return;
    }

    clearTimers();
    transitioningRef.current = true;
    pendingIndexRef.current = null;
    setDotIndex(targetIndex);
    setOpacity(0);

    addTimer(() => {
      visibleIndexRef.current = targetIndex;
      setVisibleIndex(targetIndex);
      startFadeIn();
    }, FADE_MS);
  };

  useEffect(() => {
    startFadeIn();

    return () => {
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleArrow = (direction: number) => {
    playingRef.current = false;
    setPlaying(false);

    const baseIndex = pendingIndexRef.current ?? visibleIndexRef.current;
    const targetIndex = wrapIndex(baseIndex + direction);

    if (transitioningRef.current) {
      pendingIndexRef.current = targetIndex;
      return;
    }

    startTransition(targetIndex);
  };

  const handleDot = (index: number) => {
    playingRef.current = false;
    setPlaying(false);

    const targetIndex = wrapIndex(index);

    if (transitioningRef.current) {
      pendingIndexRef.current = targetIndex;
      setDotIndex(targetIndex);
      return;
    }

    startTransition(targetIndex);
  };

  const handleToggle = () => {
    const nextPlaying = !playingRef.current;
    playingRef.current = nextPlaying;
    setPlaying(nextPlaying);

    clearTimers();

    if (nextPlaying && !transitioningRef.current) {
      scheduleNextAutoplay();
    }
  };

  const currentSlide = slides[visibleIndex];
  const fadeStyle = {
    opacity,
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
          style={fadeStyle}
        >
          {currentSlide.label}
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
            src={currentSlide.src}
            alt={currentSlide.label}
            className="w-full h-full object-contain"
            style={fadeStyle}
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
