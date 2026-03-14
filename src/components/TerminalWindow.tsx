import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = "case-study — bash", children, className = "" }: TerminalWindowProps) => {
  return (
    <div className={`terminal-window rounded-t-lg overflow-hidden ${className}`}>
      <div className="bg-secondary px-4 py-2 flex items-center justify-between border-b border-border">
        <div className="flex">
          <span className="h-3 w-3 rounded-full bg-terminal-red inline-block mr-1.5" />
          <span className="h-3 w-3 rounded-full bg-terminal-yellow inline-block mr-1.5" />
          <span className="h-3 w-3 rounded-full bg-terminal-dot-green inline-block mr-1.5" />
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{title}</div>
        <div className="w-12" />
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
