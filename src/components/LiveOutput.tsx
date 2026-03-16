import { useEffect, useRef, useState } from "react";

const CALENDLY_URL = "https://calendly.com/unaiza-autonixlab/discovery-call?month=2026-03";

const images = [
  { src: "/placeholder.svg", label: "Telegram Output 1", width: "max-w-[320px]", aspect: "aspect-[320/560]" },
  { src: "/placeholder.svg", label: "Telegram Output 2", width: "max-w-[320px]", aspect: "aspect-[320/560]" },
  { src: "/placeholder.svg", label: "Telegram Output 3", width: "max-w-[320px]", aspect: "aspect-[320/560]" },
  { src: "/placeholder.svg", label: "Google Slides Output 1", width: "max-w-[560px]", aspect: "aspect-[560/320]" },
  { src: "/placeholder.svg", label: "Google Slides Output 2", width: "max-w-[560px]", aspect: "aspect-[560/320]" },
];

const LiveOutput = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= images.length) clearInterval(interval);
          }, 1500);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
      <h2 className="text-xl font-bold mb-2 text-center">&gt; LIVE_OUTPUT</h2>
      <p className="text-muted-foreground text-base md:text-lg italic text-center mb-10 leading-relaxed">
        "This is what happens when you trigger the system."
      </p>

      <div className="flex flex-col items-center gap-8">
        {images.map((img, i) => (
          <div
            key={img.label}
            className={`w-full ${img.width} mx-auto text-center transition-opacity duration-700 ${
              i < visibleCount ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`${img.aspect} w-full bg-card border border-border overflow-hidden`}>
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 tracking-wide">{img.label}</p>
          </div>
        ))}
      </div>

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
