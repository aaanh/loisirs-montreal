"use client";

import { useState } from "react";
import { Copy, ExternalLink, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchParams, SortColumn } from "@/types/search";
import QRCodeContainer from "./qr-code";
import { useTranslation } from "react-i18next";

interface UrlOutputCardProps {
  generatedUrl: string;
  searchParams: SearchParams;
  sortColumns: SortColumn[];
  selectedFacilities: string[];
  selectedBoroughs: string[];
}

const sortLabelKeyByValue: Record<string, string> = {
  "facility.name": "facilityName",
  "facility.address": "facilityAddress",
  "facility.borough": "facilityBorough",
  "activity.startTime": "activityStartTime",
  "activity.endTime": "activityEndTime",
};

export function UrlOutputCard({
  generatedUrl,
  searchParams,
  sortColumns,
  selectedFacilities,
  selectedBoroughs,
}: UrlOutputCardProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const getSortLabel = (value: string, fallback: string) =>
    t(`sortOptions.${sortLabelKeyByValue[value]}`, { defaultValue: fallback });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Echec de copie :", err);
    }
  };

  const sortLabel =
    getSortLabel(
      searchParams.sortable.column,
      sortColumns.find((c) => c.value === searchParams.sortable.column)?.label ??
        searchParams.sortable.column
    );

  const summary: [string, string][] = [
    [t("urlCard.keySearch"), searchParams.search || "—"],
    [
      t("urlCard.keyFacilities"),
      selectedFacilities.length === 0
        ? t("urlCard.all")
        : t("urlCard.selectedCount", { count: selectedFacilities.length }),
    ],
    [
      t("urlCard.keyBoroughs"),
      selectedBoroughs.length === 0
        ? t("urlCard.all")
        : t("urlCard.selectedCount", { count: selectedBoroughs.length }),
    ],
    [
      t("urlCard.keySort"),
      `${sortLabel} ${searchParams.sortable.isOrderAsc ? "↑" : "↓"}`,
    ],
  ];

  return (
    <div className="border border-border bg-background lg:sticky lg:top-8 lg:self-start">
      {/* ── Header ── */}
      <div className="border-b border-border px-5 py-3.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {t("urlCard.title")}
        </span>
      </div>

      <div className="space-y-4 p-5">
        {/* ── URL code block ── */}
        <div className="border border-border bg-card p-3.5">
          <p className="select-all break-all font-mono text-[11px] leading-relaxed text-foreground">
            {generatedUrl || (
              <span className="italic text-muted-foreground/50">
                {t("urlCard.awaitingInput")}
              </span>
            )}
          </p>
        </div>

        {/* ── Primary CTA — default Button uses bg-primary text-primary-foreground ── */}
        <Button
          onClick={() => window.open(generatedUrl, "_blank")}
          disabled={!generatedUrl}
          className="w-full rounded-none"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          {t("urlCard.openInLoisirs")}
        </Button>

        {/* ── Copy — outline Button uses border-border bg-background hover:bg-muted ── */}
        <Button
          onClick={copyToClipboard}
          disabled={!generatedUrl}
          variant="outline"
          className="w-full rounded-none font-mono text-[11px] uppercase tracking-widest"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-3.5 w-3.5 text-primary" />
              <span className="text-primary">{t("urlCard.copied")}</span>
            </>
          ) : (
            <>
              <Copy className="mr-2 h-3.5 w-3.5" />
              {t("urlCard.copyUrl")}
            </>
          )}
        </Button>

        {/* ── Summary ── */}
        <div className="border-t border-border pt-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {t("urlCard.currentSettings")}
          </p>
          <dl className="space-y-2.5">
            {summary.map(([key, val]) => (
              <div key={key} className="flex items-baseline justify-between gap-4">
                <dt className="shrink-0 font-mono text-[10px] text-muted-foreground">
                  {key}
                </dt>
                <dd className="truncate text-right font-mono text-[11px] text-foreground">
                  {val}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── QR toggle ── */}
        <div className="border-t border-border pt-4">
          <button
            onClick={() => setShowQr((v) => !v)}
            disabled={!generatedUrl}
            className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span>{t("urlCard.qrCode")}</span>
            {showQr ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>

          {showQr && generatedUrl && (
            <div className="mt-4 bg-white p-4">
              <QRCodeContainer url={generatedUrl} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
