const SystemProfile = () => (
  <section className="max-w-4xl mx-auto py-14 px-6 text-center">
    <div className="inline-block text-left">
      <div className="text-[10px] text-terminal-green font-bold tracking-widest mb-5 text-center">
        SYSTEM PROFILE
      </div>
      <ul className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
        <li>
          <span className="text-foreground">•</span> System Name:{" "}
          <span className="text-foreground font-semibold">Post Malone</span>
        </li>
        <li>
          <span className="text-foreground">•</span> Deployed For:{" "}
          <span className="text-foreground font-semibold">Anonymous Dubai-based marketing agency</span>
        </li>
        <li>
          <span className="text-foreground">•</span> Team Size:{" "}
          <span className="text-foreground font-semibold">10 employees</span>
        </li>
      </ul>
    </div>
  </section>
);

export default SystemProfile;