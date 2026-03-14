import TerminalWindow from "@/components/TerminalWindow";
import CountUp from "@/components/CountUp";
import TypingAnimation from "@/components/TypingAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono scroll-smooth">
      {/* SECTION 1 — HEADER */}
      <header className="max-w-5xl mx-auto pt-12 px-6">
        <TerminalWindow>
          <div className="space-y-4">
            <div className="flex items-center text-sm">
              <span className="text-terminal-green">unaiza:~$</span>
              <span className="ml-2">cat /var/log/signals/post-malone.log</span>
            </div>
            <div className="pt-4">
              <div className="text-muted-foreground">------- SIGNAL DECODED -------</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-sm">
                <div><span className="text-muted-foreground">SIGNAL_ID:</span> <span>sig_003</span></div>
                <div><span className="text-muted-foreground">CLIENT:</span> <span>Anonymous // Dubai Marketing Agency</span></div>
                <div><span className="text-muted-foreground">SYSTEM_DEPLOYED:</span> <span>Post Malone</span></div>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                CONTENT_OPS -98%<br />TIME REDUCTION
              </h1>
            </div>
          </div>
        </TerminalWindow>
      </header>

      {/* SECTION 2 — THE NUMBERS */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { target: 20, suffix: "hrs", label: "Weekly hours saved on content planning", metric: "METRIC_01" },
            { target: 60, suffix: "sec", label: "Time to generate a full monthly calendar", metric: "METRIC_02" },
            { target: 11, suffix: "", label: "Active clients managed without extra hires", metric: "METRIC_03" },
            { target: 1, suffix: "mo", label: "Time to full deployment", metric: "METRIC_04" },
          ].map((stat) => (
            <div key={stat.metric} className="stat-card">
              <div className="text-[10px] text-terminal-green mb-2">{stat.metric}</div>
              <CountUp target={stat.target} suffix={stat.suffix} />
              <div className="text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — THE PROBLEM */}
      <section className="max-w-5xl mx-auto py-20 px-6 border-t border-border">
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-tighter mb-2">&gt; PROBLEM_IDENTIFIED</h2>
          <p className="text-primary">The agency was drowning in content operations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { error: "Manual ideation", desc: "Every month started from zero. No system, no structure, no memory of what worked before." },
            { error: "Slide bottleneck", desc: "Dates changed manually. Copy pasted slide by slide. Hours gone in formatting." },
            { error: "Inconsistent AI", desc: "ChatGPT used differently every time. No brand context saved. No memory." },
            { error: "Scaling ceiling", desc: "Taking on new clients meant more people. More people meant more cost." },
          ].map((problem) => (
            <div key={problem.error} className="problem-card">
              <div className="text-[10px] text-destructive mb-4 font-bold">[ERROR] {problem.error}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — THE SOLUTION */}
      <section className="max-w-5xl mx-auto py-20 px-6 border-t border-border">
        <div className="terminal-window rounded-lg overflow-hidden p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-1">&gt; SYSTEM_DEPLOYED: Post Malone</h2>
            <p className="text-muted-foreground text-sm">Post Malone — live in 7 days</p>
          </div>
          <TypingAnimation />
          <div className="mt-12 pt-12 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {["/telegram", "/generate", "/approve", "/slides.output"].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="bg-card border border-primary px-6 py-3 text-xs">{step}</div>
                  {i < 3 && <span className="text-primary font-bold hidden md:block">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THE RESULTS */}
      <section className="max-w-5xl mx-auto py-20 px-6 border-t border-border">
        <h2 className="text-xl font-bold mb-12">&gt; RESULTS_LOG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="before-card p-8">
            <div className="text-[10px] text-destructive mb-6 font-bold tracking-widest">PRE-DEPLOYMENT</div>
            <ul className="space-y-4 text-sm">
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
          <div className="after-card p-8">
            <div className="text-[10px] text-terminal-green mb-6 font-bold tracking-widest">POST-DEPLOYMENT</div>
            <ul className="space-y-4 text-sm">
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
      </section>

      {/* SECTION 6 — CLIENT SIGNAL */}
      <section className="max-w-5xl mx-auto py-20 px-6 border-t border-border">
        <div className="terminal-window p-8">
          <div className="text-muted-foreground mb-6">------- SIGNAL DECODED -------</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-8">
            <div>SIGNAL_ID: sig_003</div>
            <div>SOURCE: Kate H. // Owner, Dubai Marketing Agency</div>
            <div className="text-primary">IMPACT: CONTENT_OPS -98%</div>
          </div>
          <div className="border-l-2 border-primary pl-6 py-2 my-8">
            <blockquote className="text-xl italic leading-relaxed">
              "The bottleneck wasn't our creativity, it was the friction of execution. Unaiza didn't just give us a tool; she gave us our time back. Scaling is now a choice, not a hiring headache."
            </blockquote>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>Previous monthly spend on content ops: <span className="text-foreground">$4,200+ (Man-hours)</span></div>
            <div>Current monthly investment: <span className="text-terminal-green">$1,500</span></div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section className="max-w-5xl mx-auto py-32 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your agency runs the same playbook.</h2>
        <p className="text-muted-foreground mb-12">We've already built the fix.</p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <a href="https://calendly.com/unaiza-autonixlab" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-8 py-4 font-bold hover:bg-foreground transition-colors w-full md:w-auto text-center">
            $ ./book-call
          </a>
          <a href="mailto:unaiza@autonixlab.com" className="border border-primary text-primary px-8 py-4 font-bold hover:bg-primary hover:text-primary-foreground transition-all w-full md:w-auto text-center">
            $ ./contact-unaiza
          </a>
        </div>
        <div className="text-[10px] text-terminal-green">
          unaiza:~$ system capacity: 2 slots remaining this month
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto py-12 px-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="text-primary font-bold mb-2">UNAIZA × POST MALONE</div>
          <div className="text-[10px] text-muted-foreground">Intercepting operational chaos since 2024</div>
        </div>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
          <a href="mailto:unaiza@autonixlab.com" className="hover:text-foreground transition-colors">Contact</a>
          <a href="https://calendly.com/unaiza-autonixlab" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Book a Call</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
