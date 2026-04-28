import { Search, SortAscIcon, SortDescIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { sortColumns as defaultSortColumns } from "@/data/sort-columns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { SectionPanel } from "./section-panel";
import { useTranslation } from "react-i18next";

const sortLabelKeyByValue: Record<string, string> = {
  "facility.name": "facilityName",
  "facility.address": "facilityAddress",
  "facility.borough": "facilityBorough",
  "activity.startTime": "activityStartTime",
  "activity.endTime": "activityEndTime",
};

interface SearchQueryCardProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortColumns: typeof defaultSortColumns;
  currentColumn: string;
  isOrderAsc: boolean;
  onColumnChange: (value: string) => void;
  onOrderChange: (value: boolean) => void;
}

export function SearchQueryCard({
  searchValue,
  onSearchChange,
  sortColumns,
  currentColumn,
  isOrderAsc,
  onColumnChange,
  onOrderChange,
}: SearchQueryCardProps) {
  const { t } = useTranslation();
  const getSortLabel = (value: string, fallback: string) =>
    t(`sortOptions.${sortLabelKeyByValue[value]}`, { defaultValue: fallback });
  const sortLabel =
    getSortLabel(
      currentColumn,
      sortColumns.find((c) => c.value === currentColumn)?.label ?? currentColumn
    );

  const summary = [
    searchValue ? `"${searchValue}"` : t("searchCard.noQuery"),
    t("searchCard.sortByPrefix", {
      label: sortLabel,
      direction: isOrderAsc ? "↑" : "↓",
    }),
  ].join(" · ");

  return (
    <SectionPanel
      title={t("searchCard.title")}
      icon={<Search className="h-3.5 w-3.5" />}
      summary={summary}
    >
      <div className="space-y-4 p-5">
        {/* Search input — shadcn Input already uses border-input, text-foreground,
            placeholder:text-muted-foreground via its default classes */}
        <Input
          type="text"
          placeholder={t("searchCard.placeholder")}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-none"
        />

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <span className="shrink-0 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("searchCard.sortBy")}
          </span>
          <div className="flex flex-1 gap-2">
            {/* Select — uses bg-popover, text-popover-foreground, border-border via defaults */}
            <Select value={currentColumn} onValueChange={onColumnChange}>
              <SelectTrigger className="flex-1 rounded-none">
                <SelectValue placeholder={t("searchCard.sortBy")} />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                {sortColumns.map((col) => (
                  <SelectItem key={col.value} value={col.value} className="rounded-none">
                    {getSortLabel(col.value, col.label)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* outline Button uses border-border bg-background text-foreground
                hover:bg-muted hover:text-foreground via its default classes */}
            <Button
              type="button"
              onClick={() => onOrderChange(!isOrderAsc)}
              variant="outline"
              className="shrink-0 rounded-none"
            >
              {isOrderAsc ? (
                <SortAscIcon className="h-4 w-4" />
              ) : (
                <SortDescIcon className="h-4 w-4" />
              )}
              <span className="ml-1.5 hidden font-mono text-[11px] sm:inline">
                {isOrderAsc ? t("searchCard.asc") : t("searchCard.desc")}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </SectionPanel>
  );
}
