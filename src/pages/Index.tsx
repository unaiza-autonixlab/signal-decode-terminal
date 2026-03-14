import TerminalWindow from "@/components/TerminalWindow";
import CountUp from "@/components/CountUp";
import TypingAnimation from "@/components/TypingAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono scroll-smooth">
      {/* SECTION 1 — HEADER */}
      <header className="max-w-5xl mx-auto pt-10 px-6">
        <TerminalWindow>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <span className="text-terminal-green">unaiza:~$</span>
              <span className="ml-2">cat /var/log/signals/post-malone.log</span>
            </div>
            <div className="pt-2">
              <div className="text-muted-foreground">------- SIGNAL DECODED -------</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mt-3 text-sm">
                <div><span className="text-muted-foreground">SIGNAL_ID:</span> <span>sig_003</span></div>
                <div><span className="text-muted-foreground">CLIENT:</span> <span>Anonymous // Dubai Marketing Agency</span></div>
                <div><span className="text-muted-foreground">SYSTEM_DEPLOYED:</span> <span>Post Malone</span></div>
                <div><span className="text-muted-foreground">IMPACT:</span> <span className="text-primary">"TEXT_CONTENT_OPS — hooks, captions, CTAs, hashtags, briefs — fully automated"</span></div>
              </div>
            </div>
            <div className="pt-4">
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
            { target: 60, suffix: "sec", label: "Time to generate a complete month of scroll-stopping text content — hooks, captions, CTAs, hashtags, and designer briefs. Ready to hand to your designer.", metric: "METRIC_02" },
            { target: 11, suffix: "", label: "Active clients managed without extra hires", metric: "METRIC_03" },
            { value: "3-7", suffix: "days", label: "Time to full deployment", metric: "METRIC_04" },
          ].map((stat) => (
            <div key={stat.metric} className="stat-card">
              <div className="text-[10px] text-terminal-green mb-1">{stat.metric}</div>
              {'value' in stat ? (
                <div className="text-4xl font-bold text-primary mb-1 tabular-nums">{stat.value}{stat.suffix}</div>
              ) : (
                <CountUp target={stat.target as number} suffix={stat.suffix} />
              )}
              <div className="text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — THE PROBLEM */}
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <div className="mb-8">
          <h2 className="text-xl font-bold tracking-tighter mb-1">&gt; PROBLEM_IDENTIFIED</h2>
          <p className="text-primary text-sm">The agency was drowning in content operations</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { error: "Manual ideation", desc: "Every month started from zero. No system, no structure, no memory of what worked before." },
            { error: "Slide bottleneck", desc: "Dates changed manually. Copy pasted slide by slide. Hours gone in formatting." },
            { error: "Zero content memory", desc: "Every month meant re-explaining the brand from scratch. No saved voice. No context. No record of what performed. Just you, a blank chat window, and another hour gone." },
            { error: "Scaling ceiling", desc: "Taking on new clients meant more people. More people meant more cost." },
          ].map((problem) => (
            <div key={problem.error} className="problem-card">
              <div className="text-[10px] text-destructive mb-3 font-bold">[ERROR] {problem.error}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — THE SOLUTION */}
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <div className="terminal-window rounded-lg overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">&gt; SYSTEM_DEPLOYED: Post Malone</h2>
            <p className="text-muted-foreground text-sm">Post Malone — live in 7 days</p>
          </div>
          <TypingAnimation />
          <div className="mt-8 pt-8 border-t border-border">
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

        {/* Terminal Output Block */}
        <div className="mt-6">
          <TerminalWindow title="postmalone.output — bash">
            <div className="text-sm space-y-1">
              <div className="text-muted-foreground">&gt; Generation complete. Delivered for [CLIENT_NAME]:</div>
              <div className="text-muted-foreground">&gt;</div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">13 posts</span> <span className="text-muted-foreground">— Mon / Wed / Fri scheduled dates</span></div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">Hook</span> <span className="text-muted-foreground">— scroll-stopping opening line per post</span></div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">Caption</span> <span className="text-muted-foreground">— full branded body copy per post</span></div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">CTA</span> <span className="text-muted-foreground">— tailored call to action per post</span></div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">Hashtags</span> <span className="text-muted-foreground">— researched and formatted per post</span></div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">Designer Brief</span> <span className="text-muted-foreground">— visual direction per post</span></div>
              <div><span className="text-primary">✓</span> <span className="text-foreground">Google Slides</span> <span className="text-muted-foreground">— fully formatted calendar</span></div>
              <div className="text-muted-foreground">&gt;</div>
              <div className="text-muted-foreground">&gt; Total generation time: <span className="text-terminal-green">58 seconds</span></div>
              <div className="text-muted-foreground">&gt; Human input required: <span className="text-terminal-green">1 Telegram message</span></div>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* SECTION 5 — THE RESULTS */}
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <h2 className="text-xl font-bold mb-8">&gt; RESULTS_LOG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="before-card p-6">
            <div className="text-[10px] text-destructive mb-4 font-bold tracking-widest">PRE-DEPLOYMENT</div>
            <ul className="space-y-3 text-sm">
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
            <div className="text-[10px] text-terminal-green mb-4 font-bold tracking-widest">POST-DEPLOYMENT</div>
            <ul className="space-y-3 text-sm">
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
      <section className="max-w-5xl mx-auto py-14 px-6 border-t border-border">
        <div className="terminal-window p-6">
          <div className="text-muted-foreground mb-4">------- SIGNAL DECODED -------</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-6">
            <div>SIGNAL_ID: sig_003</div>
            <div>SOURCE: Kate H. // Owner, Dubai Marketing Agency</div>
            <div className="text-primary">IMPACT: CONTENT_OPS -98%</div>
          </div>
          <div className="border-l-2 border-primary pl-6 py-2 my-6">
            <blockquote className="text-xl italic leading-relaxed">
              "The bottleneck wasn't our creativity, it was the friction of execution. Unaiza didn't just give us a tool; she gave us our time back. Scaling is now a choice, not a hiring headache."
            </blockquote>
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <div>Previous monthly spend on content ops: <span className="text-foreground">$4,200+ (Man-hours)</span></div>
            <div>Current monthly investment: <span className="text-terminal-green">$1,500</span></div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Your agency runs the same playbook.</h2>
        <p className="text-muted-foreground mb-6">We've already built the fix.</p>
        <p className="text-terminal-green italic text-sm md:text-base mb-6 leading-relaxed">
          &gt; Reply with YES to book a discovery call — we'll see if it's a fit.<br />
          No pitch. No pressure.
        </p>
        <a
          href="https://calendly.com/unaiza-autonixlab/discovery-call?month=2026-03"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground px-8 py-4 font-bold hover:brightness-110 transition-all"
        >
          $ ./book-discovery-call
        </a>
        <div className="text-[10px] text-terminal-green mt-6">
          unaiza:~$ system capacity: 2 slots remaining this month
        </div>
      </section>

      {/* TRANSMISSION COMPLETE */}
      <div className="text-center py-6 text-terminal-green text-xs">
        autonixlab:~$ transmission.complete // signal deployed successfully
      </div>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto py-8 px-6 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="text-primary font-bold mb-1">UNAIZA × POST MALONE</div>
            <div className="text-[10px] text-muted-foreground">Intercepting operational chaos since 2024</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-muted-foreground">
            <a href="mailto:unaiza@autonixlab.com" className="no-underline hover:text-primary transition-colors cursor-pointer py-1">
              $ ./contact -- unaiza@autonixlab.com
            </a>
            <a href="https://www.linkedin.com/in/unaiza-masood/" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-primary transition-colors cursor-pointer py-1">
              $ ./connect -- linkedin.com/in/unaiza-masood
            </a>
            <a href="https://calendly.com/unaiza-autonixlab/discovery-call?month=2026-03" target="_blank" rel="noopener noreferrer" className="no-underline hover:text-primary transition-colors cursor-pointer py-1">
              $ ./book-call
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
