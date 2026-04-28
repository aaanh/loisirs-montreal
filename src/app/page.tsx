"use client";

import { useState, useEffect } from "react";
import { SearchParams } from "@/types/search";
import { facilityTypes } from "@/data/facility-types";
import { boroughs } from "@/data/boroughs";
import { sortColumns } from "@/data/sort-columns";
import { generateUrl } from "@/utils/url-generator";
import { PageHeader } from "@/components/page-header";
import { SearchQueryCard } from "@/components/search-query-card";
import { DateTimeSelectionCard } from "@/components/date-selection-card";
import { FacilityTypesCard } from "@/components/facility-types-card";
import { BoroughsCard } from "@/components/boroughs-card";
import { UrlOutputCard } from "@/components/url-output-card";
import { PageFooter } from "@/components/page-footer";
import NotesCard from "@/components/notes-card";

function encodeParams(params: SearchParams) {
  return btoa(encodeURIComponent(JSON.stringify(params)));
}
function decodeParams(str: string): SearchParams | null {
  try {
    return JSON.parse(decodeURIComponent(atob(str)));
  } catch {
    return null;
  }
}

export default function Home() {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const startTimeISO = `${dateStr}T${timeStr}:00.000-04:00`;
  const end = new Date(now.getTime() + 60 * 60 * 1000);
  const endTimeISO = `${dateStr}T${pad(end.getHours())}:${pad(end.getMinutes())}:00.000-04:00`;

  const [searchParams, setSearchParams] = useState<SearchParams>({
    filter: {
      isCollapsed: false,
      value: {
        startTime: startTimeISO,
        endTime: endTimeISO,
        dates: [startTimeISO],
        facilityTypeIds: "",
        boroughIds: "",
      },
    },
    search: "",
    sortable: { isOrderAsc: true, column: "facility.name" },
  });
  const [generatedUrl, setGeneratedUrl] = useState("");

  const selectedFacilities = searchParams.filter.value.facilityTypeIds
    ? searchParams.filter.value.facilityTypeIds.split(",").filter(Boolean)
    : [];
  const selectedBoroughs = searchParams.filter.value.boroughIds
    ? searchParams.filter.value.boroughIds.split(",").filter(Boolean)
    : [];

  const updateFilter = (patch: Partial<SearchParams["filter"]["value"]>) =>
    setSearchParams((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        value: { ...prev.filter.value, ...patch },
      },
    }));

  const handleFacilityToggle = (id: string) => {
    const next = selectedFacilities.includes(id)
      ? selectedFacilities.filter((x) => x !== id)
      : [...selectedFacilities, id];
    updateFilter({ facilityTypeIds: next.join(",") });
  };

  const handleBoroughToggle = (id: string) => {
    const next = selectedBoroughs.includes(id)
      ? selectedBoroughs.filter((x) => x !== id)
      : [...selectedBoroughs, id];
    updateFilter({ boroughIds: next.join(",") });
  };

  useEffect(() => {
    setGeneratedUrl(generateUrl(searchParams));
  }, [searchParams]);

  // Restore from URL param on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const param = new URL(window.location.href).searchParams.get("q");
    if (param) {
      const decoded = decodeParams(param);
      if (decoded) setSearchParams(decoded);
    }
    // eslint-disable-next-line
  }, []);

  // Sync URL with state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("q", encodeParams(searchParams));
    window.history.replaceState({}, "", url.toString());
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PageHeader />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 xl:px-16 py-8 lg:py-10">
        {/* Section label */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 lg:gap-6">
          {/* ── Left: filters ─────────────────────── */}
          <div className="space-y-3">
            <SearchQueryCard
              searchValue={searchParams.search}
              onSearchChange={(v) =>
                setSearchParams((p) => ({ ...p, search: v }))
              }
              sortColumns={sortColumns}
              currentColumn={searchParams.sortable.column}
              isOrderAsc={searchParams.sortable.isOrderAsc}
              onColumnChange={(v) =>
                setSearchParams((p) => ({
                  ...p,
                  sortable: { ...p.sortable, column: v },
                }))
              }
              onOrderChange={(v) =>
                setSearchParams((p) => ({
                  ...p,
                  sortable: { ...p.sortable, isOrderAsc: v },
                }))
              }
            />

            <NotesCard />

            <DateTimeSelectionCard
              date={searchParams.filter.value.dates[0] || ""}
              startTime={searchParams.filter.value.startTime}
              endTime={searchParams.filter.value.endTime}
              onDateChange={(v) => updateFilter({ dates: [v] })}
              onStartTimeChange={(v) => updateFilter({ startTime: v })}
              onEndTimeChange={(v) => updateFilter({ endTime: v })}
            />

            <FacilityTypesCard
              facilityTypes={facilityTypes}
              selectedFacilities={selectedFacilities}
              onFacilityToggle={handleFacilityToggle}
              onSetAllFacilities={(ids) =>
                updateFilter({ facilityTypeIds: ids.join(",") })
              }
              onClearAllFacilities={() => updateFilter({ facilityTypeIds: "" })}
            />

            <BoroughsCard
              boroughs={boroughs}
              selectedBoroughs={selectedBoroughs}
              onBoroughToggle={handleBoroughToggle}
              onSetAllBoroughs={(ids) =>
                updateFilter({ boroughIds: ids.join(",") })
              }
              onClearAllBoroughs={() => updateFilter({ boroughIds: "" })}
            />
          </div>

          {/* ── Right: URL output ─────────────────── */}
          <div>
            <UrlOutputCard
              generatedUrl={generatedUrl}
              searchParams={searchParams}
              sortColumns={sortColumns}
              selectedFacilities={selectedFacilities}
              selectedBoroughs={selectedBoroughs}
            />
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
