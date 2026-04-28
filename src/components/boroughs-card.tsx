import { MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Borough } from "@/types/search";
import { Button } from "@/components/ui/button";
import { SectionPanel } from "./section-panel";
import { useTranslation } from "react-i18next";

interface BoroughsCardProps {
  boroughs: Borough[];
  selectedBoroughs: string[];
  onBoroughToggle: (id: string) => void;
  onSetAllBoroughs: (ids: string[]) => void;
  onClearAllBoroughs: () => void;
}

function buildSummary(
  boroughs: Borough[],
  selected: string[],
  allBoroughsText: string,
): string {
  if (selected.length === 0) return allBoroughsText;
  const names = selected
    .slice(0, 3)
    .map((id) => boroughs.find((b) => b.id === id)?.name ?? id);
  const rest = selected.length - names.length;
  return rest > 0 ? `${names.join(", ")} +${rest}` : names.join(", ");
}

export function BoroughsCard({
  boroughs,
  selectedBoroughs,
  onBoroughToggle,
  onSetAllBoroughs,
  onClearAllBoroughs,
}: BoroughsCardProps) {
  const { t } = useTranslation();
  const allSelected =
    boroughs.length > 0 && selectedBoroughs.length === boroughs.length;

  return (
    <SectionPanel
      title={t("boroughsCard.title")}
      icon={<MapPin className="h-3.5 w-3.5" />}
      summary={buildSummary(
        boroughs,
        selectedBoroughs,
        t("boroughsCard.allBoroughs"),
      )}
      count={selectedBoroughs.length > 0 ? selectedBoroughs.length : undefined}
    >
      {/* Sub-header */}
      <div className="flex items-center justify-end border-b border-border bg-background px-5 py-2 gap-2">
        <span className="font-mono text-[10px] text-muted-foreground">
          {selectedBoroughs.length === 0
            ? t("boroughsCard.noneSelected")
            : t("boroughsCard.selectedCount", {
                selected: selectedBoroughs.length,
                total: boroughs.length,
              })}
        </span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSetAllBoroughs(boroughs.map((b) => b.id))}
            disabled={allSelected}
            className="h-6 rounded-none px-2 font-mono text-[10px] uppercase tracking-widest"
          >
            {t("boroughsCard.all")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onClearAllBoroughs}
            disabled={selectedBoroughs.length === 0}
            className="h-6 rounded-none px-2 font-mono text-[10px] uppercase tracking-widest"
          >
            {t("boroughsCard.none")}
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
        {boroughs.map((borough) => {
          const isSelected = selectedBoroughs.includes(borough.id);
          return (
            <label
              key={borough.id}
              htmlFor={borough.id}
              className={[
                "flex cursor-pointer items-center gap-3 bg-background px-4 py-3 transition-colors hover:bg-muted",
                isSelected && "bg-muted/60",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Checkbox
                id={borough.id}
                checked={isSelected}
                onCheckedChange={() => onBoroughToggle(borough.id)}
                className="shrink-0 rounded-none"
              />
              <span
                className={[
                  "truncate text-sm transition-colors",
                  isSelected ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {borough.name}
              </span>
            </label>
          );
        })}
      </div>
    </SectionPanel>
  );
}
