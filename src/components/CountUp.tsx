import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  suffix: string;
  duration?: number;
}

const CountUp = ({ target, suffix, duration = 1500 }: CountUpProps) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const stepTime = Math.abs(Math.floor(duration / target));
          let current = 0;
          const timer = setInterval(() => {
            current += 1;
            setValue(current);
            if (current >= target) {
              clearInterval(timer);
              setValue(target);
            }
          }, stepTime);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-primary mb-1 tabular-nums">
      {value}{suffix}
    </div>
  );
};

export default CountUp;
