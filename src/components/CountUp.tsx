import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  from?: number;
  duration?: number;
}

const CountUp = ({ target, suffix = "", prefix = "", from, duration = 1500 }: CountUpProps) => {
  const start = from ?? (target > 0 ? 0 : 1000);
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const totalSteps = Math.abs(target - start);
    if (totalSteps === 0) return;
    const direction = target > start ? 1 : -1;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const stepTime = Math.max(Math.floor(duration / totalSteps), 5);
          let current = start;
          const increment = Math.max(Math.floor(totalSteps / (duration / 16)), 1);
          const timer = setInterval(() => {
            current += increment * direction;
            if ((direction === 1 && current >= target) || (direction === -1 && current <= target)) {
              clearInterval(timer);
              setValue(target);
            } else {
              setValue(current);
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, start]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary mb-2 tabular-nums leading-tight">
      {value}{suffix}
    </div>
  );
};

export default CountUp;
