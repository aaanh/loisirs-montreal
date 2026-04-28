"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function PageFooter() {
  const [origin, setOrigin] = useState<string | null>(null);
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <footer className="mt-16 border-t border-border/60 bg-card/20">
      <div className="px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
              {t("footer.about")}
            </p>
            <p className="max-w-sm font-mono text-[11px] leading-relaxed text-muted-foreground">
              {t("footer.aboutDescription")}
            </p>
          </div>

          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
              {t("footer.links")}
            </p>
            <div className="flex flex-col gap-2">
              {origin && (
                <a
                  href={origin}
                  className="inline-flex w-fit items-center font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {origin}
                </a>
              )}
              <a
                href="https://github.com/aaanh/loisirs-montreal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                github.com/aaanh/loisirs-montreal ↗
              </a>
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
              {t("footer.creator")}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://aaanh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                aaanh.com ↗
              </a>
              <a
                href="https://linkedin.com/in/aaanh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                linkedin.com/in/aaanh ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] text-muted-foreground/45">
            © {currentYear} Anh Hoang Nguyen
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/35">
            GNU General Public License v3.0
          </p>
        </div>
      </div>
    </footer>
  );
}
