import { LayoutGrid } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FacilityType } from "@/types/search";
import { Button } from "@/components/ui/button";
import { SectionPanel } from "./section-panel";
import { useTranslation } from "react-i18next";

interface FacilityTypesCardProps {
  facilityTypes: FacilityType[];
  selectedFacilities: string[];
  onFacilityToggle: (facilityId: string) => void;
  onSetAllFacilities: (ids: string[]) => void;
  onClearAllFacilities: () => void;
}

function buildSummary(
  facilityTypes: FacilityType[],
  selected: string[],
  allFacilitiesText: string,
  getFacilityName: (id: string) => string,
): string {
  if (selected.length === 0) return allFacilitiesText;
  const validIds = new Set(facilityTypes.map((f) => f.id));
  const names = selected
    .slice(0, 3)
    .map((id) => (validIds.has(id) ? getFacilityName(id) : id));
  const rest = selected.length - names.length;
  return rest > 0 ? `${names.join(", ")} +${rest}` : names.join(", ");
}

export function FacilityTypesCard({
  facilityTypes,
  selectedFacilities,
  onFacilityToggle,
  onSetAllFacilities,
  onClearAllFacilities,
}: FacilityTypesCardProps) {
  const { t } = useTranslation();
  const getFacilityName = (id: string) => {
    const fallback =
      facilityTypes.find((facility) => facility.id === id)?.name ?? id;
    return t(`facilityTypes.${id}`, { defaultValue: fallback });
  };
  const allSelected =
    facilityTypes.length > 0 &&
    selectedFacilities.length === facilityTypes.length;

  return (
    <SectionPanel
      title={t("facilitiesCard.title")}
      icon={<LayoutGrid className="h-3.5 w-3.5" />}
      summary={buildSummary(
        facilityTypes,
        selectedFacilities,
        t("facilitiesCard.allFacilities"),
        getFacilityName,
      )}
      count={
        selectedFacilities.length > 0 ? selectedFacilities.length : undefined
      }
    >
      {/* Sub-header */}
      <div className="flex items-center justify-end gap-2 border-b border-border bg-background px-5 py-2">
        <span className="font-mono text-[10px] text-muted-foreground">
          {selectedFacilities.length === 0
            ? t("facilitiesCard.noneSelected")
            : t("facilitiesCard.selectedCount", {
                selected: selectedFacilities.length,
                total: facilityTypes.length,
              })}
        </span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onSetAllFacilities(facilityTypes.map((ft) => ft.id))}
            disabled={allSelected}
            className="h-6 rounded-none px-2 font-mono text-[10px] uppercase tracking-widest"
          >
            {t("facilitiesCard.all")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onClearAllFacilities}
            disabled={selectedFacilities.length === 0}
            className="h-6 rounded-none px-2 font-mono text-[10px] uppercase tracking-widest"
          >
            {t("facilitiesCard.none")}
          </Button>
        </div>
      </div>

      {/* Grid — gap-px + bg-border creates hairline dividers between cells */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
        {facilityTypes.map((facility) => {
          const isSelected = selectedFacilities.includes(facility.id);
          return (
            <label
              key={facility.id}
              htmlFor={facility.id}
              className={[
                "flex cursor-pointer items-center gap-3 bg-background px-4 py-3 transition-colors hover:bg-muted",
                isSelected && "bg-muted/60",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Checkbox uses data-checked:bg-primary data-checked:border-primary
                  from its defaults — no className override needed for color */}
              <Checkbox
                id={facility.id}
                checked={isSelected}
                onCheckedChange={() => onFacilityToggle(facility.id)}
                className="shrink-0 rounded-none"
              />
              <span className="shrink-0 text-base leading-none">
                {facility.icon}
              </span>
              <span
                className={[
                  "truncate text-sm transition-colors",
                  isSelected ? "text-foreground" : "text-muted-foreground",
                ].join(" ")}
              >
                {getFacilityName(facility.id)}
              </span>
            </label>
          );
        })}
      </div>
    </SectionPanel>
  );
}
