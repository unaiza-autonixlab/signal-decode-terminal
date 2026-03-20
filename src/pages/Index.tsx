import TerminalWindow from "@/components/TerminalWindow";
import CountUp from "@/components/CountUp";
import SystemProfile from "@/components/SystemProfile";
import LiveOutput from "@/components/LiveOutput";

const LINKEDIN_URL = "https://linkedin.com/in/unaiza-masood";

const CtaButton = ({ label }: { label: string }) => (
  <div className="text-center mt-12">
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 font-bold hover:brightness-110 transition-all text-base tracking-wide rounded-sm"
    >
      {label}
    </a>
  </div>
);

const SectionHeading = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
  <div className="mb-10 text-center">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{children}</h2>
    {sub && <p className="text-primary text-sm md:text-base">{sub}</p>}
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono scroll-smooth text-base leading-relaxed">
      {/* HEADER */}
      <header className="max-w-4xl mx-auto pt-12 pb-4 px-6">
        <TerminalWindow>
          <div className="py-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
              20 Hours of Content Work.<br />Done in 2 Minutes.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-5 max-w-xl mx-auto leading-relaxed">
              A done-for-you AI system that generates your clients' monthly content calendars automatically.
            </p>
          </div>
        </TerminalWindow>
      </header>

      {/* METRICS */}
      <section className="max-w-4xl mx-auto py-14 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { target: 20, suffix: "hrs", label: "Saved every week, per client", metric: "METRIC_01" },
            { target: 2, suffix: "min", label: "To generate a full month of content", metric: "METRIC_02" },
            { target: 0, from: 1000, prefix: "$", label: "Extra hires needed to scale", metric: "METRIC_03" },
            { target: 2700, from: 100, prefix: "$", label: "Saved every month on content ops", metric: "METRIC_04" },
          ].map((stat) => (
            <div key={stat.metric} className="stat-card text-center">
              <div className="text-[10px] text-terminal-green mb-3 tracking-widest">{stat.metric}</div>
              <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix} from={stat.from} />
              <div className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM PROFILE */}
      <SystemProfile />

      {/* PROBLEM IDENTIFIED */}
      <section className="max-w-4xl mx-auto py-14 px-6 border-t border-border">
        <SectionHeading sub="The agency was drowning in content operations">
          &gt; PROBLEM_IDENTIFIED
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { error: "Manual ideation", desc: "Every month started from zero." },
            { error: "Slide bottleneck", desc: "Hours lost building slides manually." },
            { error: "Zero content memory", desc: "Re-explaining the brand every single month." },
            { error: "Scaling ceiling", desc: "Every new client meant a new hire." },
          ].map((problem) => (
            <div key={problem.error} className="problem-card text-center sm:text-left">
              <div className="text-[10px] text-destructive mb-3 font-bold tracking-widest">[PROBLEM] {problem.error}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
        <CtaButton label="This your agency? Reply YES." />
      </section>

      {/* LIVE OUTPUT */}
      <LiveOutput />

      {/* RESULTS LOG */}
      <section className="max-w-4xl mx-auto py-14 px-6 border-t border-border">
        <SectionHeading>&gt; RESULTS_LOG</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="before-card p-6 rounded-sm">
            <div className="text-[10px] text-destructive mb-5 font-bold tracking-widest text-center md:text-left">PRE-DEPLOYMENT</div>
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
          <div className="after-card p-6 rounded-sm">
            <div className="text-[10px] text-terminal-green mb-5 font-bold tracking-widest text-center md:text-left">POST-DEPLOYMENT</div>
            <ul className="space-y-3 text-sm md:text-base">
              {[
                ["Content planning:", "2 minutes"],
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
      <section className="max-w-4xl mx-auto py-14 px-6 border-t border-border">
        <div className="terminal-window p-6 md:p-10 rounded-sm">
          <div className="text-xs text-muted-foreground mb-6 text-center md:text-left tracking-widest">
            SOURCE: Anonymous // Dubai Marketing Agency (name withheld by request)
          </div>
          <div className="border-l-2 border-primary pl-6 py-4">
            <blockquote className="text-lg md:text-xl leading-relaxed italic text-center md:text-left">
              "The bottleneck wasn't our creativity, it was the friction of execution. Unaiza didn't just give us a tool — she gave us our time back. Scaling is now a choice, not a hiring headache."
            </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            <div className="bg-destructive/10 border border-destructive/20 p-6 text-center rounded-sm">
              <div className="text-[10px] text-destructive font-bold tracking-widest mb-2">BEFORE</div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">$4,200<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mt-2">Man-hours on content ops</div>
            </div>
            <div className="bg-terminal-green/5 border border-terminal-green/20 p-6 text-center rounded-sm">
              <div className="text-[10px] text-terminal-green font-bold tracking-widest mb-2">SAVINGS</div>
              <div className="text-3xl md:text-4xl font-bold text-terminal-green">$2,700<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <div className="text-xs text-muted-foreground mt-2">Redirected from content ops</div>
            </div>
          </div>
        </div>
        <CtaButton label="Ready to get your time back? Reply YES." />
      </section>

      {/* FINAL CTA */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Your agency runs the same playbook.</h2>
        <p className="text-muted-foreground text-base md:text-lg mb-4">We've already built the fix.</p>
        <p className="text-terminal-green italic text-base mb-10 leading-relaxed">
          &gt; Reply YES on LinkedIn. I'll reach out within the hour.
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 font-bold hover:brightness-110 transition-all text-base tracking-wide rounded-sm"
        >
          Reply YES on LinkedIn
        </a>
        <div className="text-xs text-terminal-green mt-5 tracking-widest">3 slots remaining this month</div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto py-10 px-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div>
            <div className="text-primary font-bold text-base mb-1">UNAIZA × POST MALONE</div>
            <div className="text-xs text-muted-foreground tracking-widest">Intercepting operational chaos since 2024</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground">
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