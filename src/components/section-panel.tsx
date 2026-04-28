"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPanelProps {
  title: string;
  icon: React.ReactNode;
  /** Short string shown inline when collapsed */
  summary?: string;
  /** Badge count — shown when > 0 */
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SectionPanel({
  title,
  icon,
  summary,
  count,
  defaultOpen = true,
  children,
  className,
}: SectionPanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("border border-border bg-background", className)}>
      {/* ── Toggle header ── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-center justify-between px-5 py-3.5 transition-colors duration-150 hover:bg-muted/50"
      >
        {/* Left: icon + title + badge */}
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground">
            {icon}
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors">
            {title}
          </span>
          {count !== undefined && count > 0 && (
            <span className="inline-flex min-w-[1rem] shrink-0 items-center justify-center border border-primary/20 bg-primary/10 px-1 font-mono text-[9px] font-bold text-primary">
              {count}
            </span>
          )}
        </div>

        {/* Right: collapsed summary + chevron */}
        <div className="ml-4 flex min-w-0 items-center gap-3">
          <AnimatePresence>
            {!isOpen && summary && (
              <motion.span
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="max-w-[180px] truncate text-right font-mono text-[11px] text-muted-foreground sm:max-w-[260px]"
              >
                {summary}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="shrink-0"
          >
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
          </motion.span>
        </div>
      </button>

      {/* ── Collapsible body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.15 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-border">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
