import TerminalWindow from "@/components/TerminalWindow";
import CountUp from "@/components/CountUp";

import SystemProfile from "@/components/SystemProfile";
import LiveOutput from "@/components/LiveOutput";

const CALENDLY_URL = "https://calendly.com/unaiza-autonixlab/discovery-call?month=2026-03";

const CtaButton = ({ label }: {label: string;}) =>
<div className="text-center mt-10">
    <a
    href={CALENDLY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all text-base">
    
      {label}
    </a>
  </div>;


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono scroll-smooth text-base leading-relaxed">
      {/* SECTION 1 — HEADER */}
      <header className="max-w-5xl mx-auto pt-10 px-6">
        <TerminalWindow>
          <div className="space-y-3">
            <div className="pt-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                CONTENT_OPS -98%<br />TIME REDUCTION
              </h1>
            </div>
          </div>
        </TerminalWindow>
      </header>

      {/* SECTION 2 — THE NUMBERS */}
      <section className="max-w-5xl mx-auto py-14 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
          { target: 20, suffix: "hrs", label: "Weekly hours saved on content planning", metric: "METRIC_01" },
          { target: 60, suffix: "sec", label: "Full month of content — hooks, captions, CTAs, hashtags & briefs", metric: "METRIC_02" },
          { value: "$0", label: "Extra headcount needed to scale content operations", metric: "METRIC_03" },
          { value: "$2,700", label: "Monthly savings vs previous content ops spend ($4,200 → $1,500)", metric: "METRIC_04" }].
          map((stat) =>
          <div key={stat.metric} className="stat-card text-center">
              <div className="text-[10px] text-terminal-green mb-1">{stat.metric}</div>
              {'value' in stat ?
            <div className="text-4xl font-bold text-primary mb-1 tabular-nums leading-tight">{stat.value}</div> :

            <CountUp target={stat.target as number} suffix={stat.suffix} />
            }
              <div className="text-sm text-muted-foreground leading-relaxed mt-2">{stat.label}</div>
            </div>
          )}
        </div>
      </section>

      {/* SYSTEM PROFILE */}
      <SystemProfile />

      {/* SECTION 3 — THE PROBLEM */}
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold tracking-tighter mb-2">&gt; PROBLEM_IDENTIFIED</h2>
          <p className="text-primary text-base">The agency was drowning in content operations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
          { error: "Manual ideation", desc: "Every month started from zero. No system, no structure, no memory of what worked before." },
          { error: "Slide bottleneck", desc: "Dates changed manually. Copy pasted slide by slide. Hours gone in formatting." },
          { error: "Zero content memory", desc: "Every month meant re-explaining the brand from scratch. No saved voice. No context." },
          { error: "Scaling ceiling", desc: "Taking on new clients meant more people. More people meant more cost." }].
          map((problem) =>
          <div key={problem.error} className="problem-card text-center sm:text-left">
              <div className="text-[10px] text-destructive mb-3 font-bold">[ERROR] {problem.error}</div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{problem.desc}</p>
            </div>
          )}
        </div>
        <CtaButton label="Sound familiar? Let's fix it." />
      </section>




      {/* SECTION 5 — LIVE OUTPUT */}
      <LiveOutput />

      {/* SECTION 6 — THE RESULTS */}
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">&gt; RESULTS_LOG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="before-card p-6">
            <div className="text-[10px] text-destructive mb-4 font-bold tracking-widest text-center md:text-left">PRE-DEPLOYMENT</div>
            <ul className="space-y-3 text-sm md:text-base">
              {[
              ["Content planning:", "20 hours/week"],
              ["Calendar creation:", "Manual, slide by slide"],
              ["AI usage:", "Random, no context"],
              ["New client cost:", "Hire more staff"],
              ["Consistency:", "Low — varies by person"]].
              map(([label, value]) =>
              <li key={label} className="flex justify-between border-b border-destructive/10 pb-2">
                  <span className="text-muted-foreground">{label}</span>
                  <span>{value}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="after-card p-6">
            <div className="text-[10px] text-terminal-green mb-4 font-bold tracking-widest text-center md:text-left">POST-DEPLOYMENT</div>
            <ul className="space-y-3 text-sm md:text-base">
              {[
              ["Content planning:", "60 seconds"],
              ["Calendar creation:", "Auto-generated Slides"],
              ["AI usage:", "Full brand memory"],
              ["New client cost:", "Zero — scales instantly"],
              ["Consistency:", "High — same quality every time"]].
              map(([label, value]) =>
              <li key={label} className="flex justify-between border-b border-terminal-green/10 pb-2">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-terminal-green">{value}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <CtaButton label="Want these numbers?" />
      </section>

      {/* SECTION 7 — CLIENT SIGNAL / TESTIMONIAL */}
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <div className="terminal-window p-8 md:p-10">
          <div className="border-l-2 border-primary pl-6 py-4">
            <blockquote className="text-lg md:text-2xl italic leading-relaxed text-center md:text-left">
              "The bottleneck wasn't our creativity, it was the friction of execution. Unaiza didn't just give us a tool; she gave us our time back. Scaling is now a choice, not a hiring headache."
            </blockquote>
          </div>
          <div className="text-xs text-muted-foreground mt-6 text-center md:text-left tracking-widest">
            SOURCE: Anonymous // Dubai Marketing Agency
          </div>

          {/* Pricing comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-destructive/10 border border-destructive/20 p-5 text-center">
              <div className="text-[10px] text-destructive font-bold tracking-widest mb-2">BEFORE</div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">$4,200<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mt-1">Man-hours on content ops</div>
            </div>
            <div className="bg-terminal-green/5 border border-terminal-green/20 p-5 text-center">
              <div className="text-[10px] text-terminal-green font-bold tracking-widest mb-2">AFTER</div>
              <div className="text-3xl md:text-4xl font-bold text-terminal-green">$1,500<span className="text-base font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mt-1">Full automation investment</div>
            </div>
          </div>
        </div>
        <CtaButton label="Book the same call." />
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your agency runs the same playbook.</h2>
        <p className="text-muted-foreground text-base md:text-lg mb-6">We've already built the fix.</p>
        <p className="text-terminal-green italic text-base mb-8 leading-relaxed">
          &gt; Reply with YES to book a discovery call — we'll see if it's a fit.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all text-base">
          Book a Call
        </a>
        <div className="text-[10px] text-terminal-green mt-6">3 slots remaining this month

        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto py-8 px-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div>
            <div className="text-primary font-bold mb-1">UNAIZA × POST MALONE</div>
            <div className="text-[10px] text-muted-foreground">Intercepting operational chaos since 2024</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground">
            <span className="py-1">$ ./contact -- unaiza@autonixlab.com</span>
            <span className="py-1">$ ./connect -- linkedin.com/in/unaiza-masood</span>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-primary transition-colors cursor-pointer py-1">
              $ ./book-call
            </a>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;