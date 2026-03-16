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

type Phase = "visible" | "fading-out" | "fading-in";

const LiveOutput = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0); // which image is actually rendered
  const [dotIndex, setDotIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("visible");
  const [playing, setPlaying] = useState(true);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<number | null>(null);
  const playingRef = useRef(playing);
  const currentIndexRef = useRef(currentIndex);
  const phaseRef = useRef(phase);

  playingRef.current = playing;
  currentIndexRef.current = currentIndex;
  phaseRef.current = phase;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const wrap = (i: number) => ((i % slides.length) + slides.length) % slides.length;

  // Start the fade-out → swap → fade-in → hold cycle for a target index
  const goTo = useCallback((targetIdx: number) => {
    const idx = wrap(targetIdx);

    // If we're mid-transition, queue it
    if (phaseRef.current !== "visible") {
      pendingRef.current = idx;
      return;
    }

    if (idx === currentIndexRef.current) return;

    clearTimer();
    setDotIndex(idx); // dots update immediately
    setPhase("fading-out");

    // After fade-out completes, swap image and fade in
    timerRef.current = setTimeout(() => {
      setShownIndex(idx);
      setCurrentIndex(idx);

      // Force a paint at opacity 0 with new image before triggering fade-in
      requestAnimationFrame(() => {
        setPhase("fading-in");

        // After fade-in completes
        timerRef.current = setTimeout(() => {
          setPhase("visible");

          // Check for pending navigation
          if (pendingRef.current !== null) {
            const next = pendingRef.current;
            pendingRef.current = null;
            // Use setTimeout(0) to let state settle
            setTimeout(() => {
              // Re-check if still valid
              if (next !== wrap(currentIndexRef.current + 0)) {
                // trigger goTo for pending
                setDotIndex(next);
                setPhase("fading-out");
                timerRef.current = setTimeout(() => {
                  setShownIndex(next);
                  setCurrentIndex(next);
                  requestAnimationFrame(() => {
                    setPhase("fading-in");
                    timerRef.current = setTimeout(() => {
                      setPhase("visible");
                    }, FADE_MS);
                  });
                }, FADE_MS);
              }
            }, 0);
            return;
          }

          // If playing, schedule next slide after hold
          if (playingRef.current) {
            timerRef.current = setTimeout(() => {
              const next = wrap(currentIndexRef.current + 1);
              setDotIndex(next);
              setPhase("fading-out");

              timerRef.current = setTimeout(() => {
                setShownIndex(next);
                setCurrentIndex(next);
                requestAnimationFrame(() => {
                  setPhase("fading-in");
                  timerRef.current = setTimeout(() => {
                    setPhase("visible");
                  }, FADE_MS);
                });
              }, FADE_MS);
            }, HOLD_MS);
          }
        }, FADE_MS);
      });
    }, FADE_MS);
  }, [clearTimer]);

  // Auto-play: schedule from "visible" phase
  useEffect(() => {
    if (playing && phase === "visible") {
      clearTimer();
      timerRef.current = setTimeout(() => {
        const next = wrap(currentIndexRef.current + 1);
        setDotIndex(next);
        setPhase("fading-out");

        timerRef.current = setTimeout(() => {
          setShownIndex(next);
          setCurrentIndex(next);
          requestAnimationFrame(() => {
            setPhase("fading-in");
            timerRef.current = setTimeout(() => {
              setPhase("visible");
            }, FADE_MS);
          });
        }, FADE_MS);
      }, HOLD_MS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, phase]);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const handleArrow = useCallback((direction: number) => {
    setPlaying(false);
    clearTimer();
    pendingRef.current = null;

    if (phaseRef.current !== "visible") {
      // If mid-transition, force complete it instantly then navigate
      const target = wrap(currentIndexRef.current + direction);
      // Snap current transition to end
      setPhase("visible");
      // Schedule the new transition on next tick
      setTimeout(() => {
        setDotIndex(target);
        setPhase("fading-out");
        timerRef.current = setTimeout(() => {
          setShownIndex(target);
          setCurrentIndex(target);
          requestAnimationFrame(() => {
            setPhase("fading-in");
            timerRef.current = setTimeout(() => {
              setPhase("visible");
            }, FADE_MS);
          });
        }, FADE_MS);
      }, 0);
      return;
    }

    goTo(currentIndexRef.current + direction);
  }, [clearTimer, goTo]);

  const handleDot = useCallback((i: number) => {
    setPlaying(false);
    clearTimer();
    pendingRef.current = null;

    if (phaseRef.current !== "visible") {
      setPhase("visible");
      setTimeout(() => {
        setDotIndex(i);
        setPhase("fading-out");
        timerRef.current = setTimeout(() => {
          setShownIndex(i);
          setCurrentIndex(i);
          requestAnimationFrame(() => {
            setPhase("fading-in");
            timerRef.current = setTimeout(() => {
              setPhase("visible");
            }, FADE_MS);
          });
        }, FADE_MS);
      }, 0);
      return;
    }

    goTo(i);
  }, [clearTimer, goTo]);

  const handleToggle = useCallback(() => {
    setPlaying(p => !p);
  }, []);

  const opacity = phase === "fading-out" ? 0 : phase === "fading-in" ? 1 : 1;
  // For fading-in, we need opacity to transition FROM 0 TO 1.
  // The trick: when we set phase to "fading-in", shownIndex just changed and
  // on the previous render it was at opacity 0 (end of fading-out).
  // We use a separate state to track the CSS opacity target.
  const cssOpacity = phase === "fading-out" ? 0 : 1;
  const transitionStyle = phase === "visible"
    ? { opacity: 1, transition: "none" }
    : { opacity: cssOpacity, transition: `opacity ${FADE_MS}ms ease-in-out` };

  const displaySlide = slides[shownIndex];
  // Label shows the target slide during fade-in, current during fade-out
  const labelSlide = phase === "fading-out" ? slides[shownIndex] : slides[shownIndex];

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
          style={transitionStyle}
        >
          {labelSlide.label}
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
            src={displaySlide.src}
            alt={displaySlide.label}
            className="w-full h-full object-contain"
            style={transitionStyle}
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
