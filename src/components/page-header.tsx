import Link from "next/link";
import { Alert, AlertAction, AlertDescription } from "./ui/alert";
import { AlertCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function PageHeader() {
  const [showWarning, setShowWarning] = useState(true);
  const [showAffil, setShowAffil] = useState(true);
  const { t, i18n } = useTranslation();
  const isFrench = (i18n.resolvedLanguage ?? i18n.language).startsWith("fr");

  return (
    <header className="border-b border-border bg-background">
      {/* ── Wordmark bar ── */}
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-foreground">Loisirs</span>
          <span className="mx-1.5 text-primary">Montréal</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="ml-1.5 ">{t("header.builder")}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:block">
              {t("header.language")}
            </span>
            <div className="flex items-center border border-border">
              <Button
                type="button"
                size="sm"
                variant={isFrench ? "secondary" : "ghost"}
                className="h-6 rounded-none px-2 font-mono text-[10px] uppercase tracking-widest"
                onClick={() => void i18n.changeLanguage("fr")}
              >
                {t("header.french")}
              </Button>
              <Button
                type="button"
                size="sm"
                variant={!isFrench ? "secondary" : "ghost"}
                className="h-6 rounded-none border-l border-border px-2 font-mono text-[10px] uppercase tracking-widest"
                onClick={() => void i18n.changeLanguage("en")}
              >
                {t("header.english")}
              </Button>
            </div>
          </div>

          <Link
            href="https://github.com/aaanh/loisirs-montreal"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 transition-colors hover:text-muted-foreground sm:block"
          >
            {t("header.github")}
          </Link>
          <span className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            v0.2.0-{t("header.alpha")}
          </span>
        </div>
      </div>

      {/* ── Warning strip ── */}
      {showWarning && (
        <div className="border-t border-border/60 bg-muted/40 px-4 py-2 sm:px-6 lg:px-10 xl:px-16 flex items-center">
          <p className="font-mono text-[10px] text-muted-foreground">
            {t("header.warning")}{" "}
            <a
              href="https://github.com/aaanh/loisirs-montreal/issues/new"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              {t("header.reportIssues")}
            </a>
            .
          </p>
          <Button
            className="p-1 h-[1.5rem]"
            variant={"ghost"}
            onClick={() => setShowWarning(false)}
          >
            <XIcon size="16" />
          </Button>
        </div>
      )}

      {showAffil && (
        <div className="border-t border-border/60 bg-muted/40 px-4 py-2 sm:px-6 lg:px-10 xl:px-16 flex items-center gap-2">
          <AlertCircleIcon size="16" className="text-yellow-500" />
          <p className="font-mono text-[10px] text-muted-foreground">
            {t("header.affiliation")}
          </p>
          <Button
            variant={"ghost"}
            className="p-1 h-[1.5rem]"
            onClick={() => setShowAffil(false)}
          >
            <XIcon size="16" />
          </Button>
        </div>
      )}
    </header>
  );
}
