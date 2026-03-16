import TerminalWindow from "@/components/TerminalWindow";
import CountUp from "@/components/CountUp";
import SystemProfile from "@/components/SystemProfile";
import LiveOutput from "@/components/LiveOutput";

const LINKEDIN_URL = "https://linkedin.com/in/unaiza-masood";

const CtaButton = ({ label }: { label: string }) => (
  <div className="text-center mt-10">
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all text-base tracking-wide"
    >
      {label}
    </a>
  </div>
);

const SectionHeading = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-8 text-center">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{children}</h2>
    {sub && <p className="text-primary text-base md:text-lg">{sub}</p>}
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono scroll-smooth text-base leading-relaxed">
      {/* HEADER */}
      <header className="max-w-5xl mx-auto pt-10 pb-2 px-6">
        <TerminalWindow>
          <div className="py-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
              20 Hours of Content Work.<br />Done in 60 Seconds.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              A done-for-you AI system that generates your clients' monthly content calendars automatically.
            </p>
          </div>
        </TerminalWindow>
      </header>

      {/* METRICS */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { target: 20, suffix: "hrs", label: "Weekly hours saved on content planning", metric: "METRIC_01" },
            { target: 60, suffix: "sec", label: "Full month of content — hooks, captions, CTAs, hashtags & briefs", metric: "METRIC_02" },
            { target: 0, from: 1000, prefix: "$", label: "Extra headcount needed to scale content operations", metric: "METRIC_03" },
            { target: 2700, from: 100, prefix: "$", label: "Monthly savings vs previous content ops spend ($4,200 → $1,500)", metric: "METRIC_04" },
          ].map((stat) => (
            <div key={stat.metric} className="stat-card text-center">
              <div className="text-[10px] text-terminal-green mb-2 tracking-widest">{stat.metric}</div>
              <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix} from={stat.from} />
              <div className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM PROFILE */}
      <SystemProfile />

      {/* PROBLEM IDENTIFIED */}
      <section className="max-w-5xl mx-auto py-12 px-6 border-t border-border">
        <SectionHeading sub="The agency was drowning in content operations">
          &gt; PROBLEM_IDENTIFIED
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { error: "Manual ideation", desc: "Every month started from zero. No system, no structure, no memory of what worked before." },
            { error: "Slide bottleneck", desc: "Dates changed manually. Copy pasted slide by slide. Hours gone in formatting." },
            { error: "Zero content memory", desc: "Every month meant re-explaining the brand from scratch. No saved voice. No context." },
            { error: "Scaling ceiling", desc: "Taking on new clients meant more people. More people meant more cost." },
          ].map((problem) => (
            <div key={problem.error} className="problem-card text-center sm:text-left">
              <div className="text-[10px] text-destructive mb-3 font-bold tracking-widest">[ERROR] {problem.error}</div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
        <CtaButton label="This your agency? Reply YES." />
      </section>

      {/* LIVE OUTPUT */}
      <LiveOutput />

      {/* RESULTS LOG */}
      <section className="max-w-5xl mx-auto py-12 px-6 border-t border-border">
        <SectionHeading>&gt; RESULTS_LOG</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="before-card p-6">
            <div className="text-[10px] text-destructive mb-4 font-bold tracking-widest text-center md:text-left">PRE-DEPLOYMENT</div>
            <ul className="space-y-3 text-sm md:text-base">
              {[
                ["Content planning:", "20 hours/week"],
                ["Calendar creation:", "Manual, slide by slide"],
                ["AI usage:", "Random, no context"],
                ["New client cost:", "Hire more staff"],
                ["Consistency:", "Low — varies by person"],
              ].map(([label, value]) => (
                <li key={label} className="flex justify-between border-b border-destructive/10 pb-2">
                  <span className="text-muted-foreground">{label}</span>
                  <span>{value}</span>
                </li>
              ))}
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
                ["Consistency:", "High — same quality every time"],
              ].map(([label, value]) => (
                <li key={label} className="flex justify-between border-b border-terminal-green/10 pb-2">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="text-terminal-green">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CtaButton label="Want these numbers? Reply YES." />
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-5xl mx-auto py-12 px-6 border-t border-border">
        <div className="terminal-window p-6 md:p-10">
          <div className="text-xs text-muted-foreground mb-4 text-center md:text-left tracking-widest">
            SOURCE: Anonymous // Dubai Marketing Agency
          </div>
          <div className="border-l-2 border-primary pl-6 py-4">
            <blockquote className="text-lg md:text-xl leading-relaxed italic text-center md:text-left">
              "The bottleneck wasn't our creativity, it was the friction of execution. Unaiza didn't just give us a tool; she gave us our time back. Scaling is now a choice, not a hiring headache."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-destructive/10 border border-destructive/20 p-5 text-center">
              <div className="text-[10px] text-destructive font-bold tracking-widest mb-2">BEFORE</div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">$4,200<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mt-2">Man-hours on content ops</div>
            </div>
            <div className="bg-terminal-green/5 border border-terminal-green/20 p-5 text-center">
              <div className="text-[10px] text-terminal-green font-bold tracking-widest mb-2">SAVINGS</div>
              <div className="text-3xl md:text-4xl font-bold text-terminal-green">$2,700<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mt-2">Redirected from content ops</div>
            </div>
          </div>
        </div>
        <CtaButton label="Ready to get your time back? Reply YES." />
      </section>

      {/* FINAL CTA */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Your agency runs the same playbook.</h2>
        <p className="text-muted-foreground text-base md:text-lg mb-4">We've already built the fix.</p>
        <p className="text-terminal-green italic text-base mb-8 leading-relaxed">
          &gt; Reply YES on LinkedIn. I'll reach out within the hour.
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all text-base tracking-wide"
        >
          Reply YES on LinkedIn
        </a>
        <div className="text-xs text-terminal-green mt-4 tracking-widest">3 slots remaining this month</div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto py-8 px-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div>
            <div className="text-primary font-bold text-base mb-1">UNAIZA × POST MALONE</div>
            <div className="text-xs text-muted-foreground tracking-widest">Intercepting operational chaos since 2024</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 text-xs text-muted-foreground">
            <span>$ ./contact — unaiza@autonixlab.com</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              $ ./connect — linkedin.com/in/unaiza-masood
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
