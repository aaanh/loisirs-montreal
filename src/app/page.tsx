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
  const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}`;
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const startTimeISO = `${dateStr}T${timeStr}:00.000-04:00`;
  const end = new Date(now.getTime() + 60 * 60 * 1000);
  const endTimeStr = `${pad(end.getHours())}:${pad(end.getMinutes())}`;
  const endTimeISO = `${dateStr}T${endTimeStr}:00.000-04:00`;

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
    sortable: {
      isOrderAsc: true,
      column: "facility.name",
    },
  });
  const [generatedUrl, setGeneratedUrl] = useState<string>("");

  // Derive selectedFacilities and selectedBoroughs from searchParams
  const selectedFacilities = searchParams.filter.value.facilityTypeIds
    ? searchParams.filter.value.facilityTypeIds.split(",").filter(Boolean)
    : [];
  const selectedBoroughs = searchParams.filter.value.boroughIds
    ? searchParams.filter.value.boroughIds.split(",").filter(Boolean)
    : [];

  const updateSearchParams = (updates: Partial<SearchParams>) => {
    setSearchParams((prev) => ({
      ...prev,
      ...updates,
      filter: {
        ...prev.filter,
        ...updates.filter,
      },
    }));
  };

  const handleFacilityToggle = (facilityId: string) => {
    const newSelected = selectedFacilities.includes(facilityId)
      ? selectedFacilities.filter((id) => id !== facilityId)
      : [...selectedFacilities, facilityId];
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          facilityTypeIds: newSelected.join(","),
        },
      },
    });
  };

  const handleBoroughToggle = (boroughId: string) => {
    const newSelected = selectedBoroughs.includes(boroughId)
      ? selectedBoroughs.filter((id) => id !== boroughId)
      : [...selectedBoroughs, boroughId];
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          boroughIds: newSelected.join(","),
        },
      },
    });
  };

  const handleSetAllFacilities = (ids: string[]) => {
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          facilityTypeIds: ids.join(","),
        },
      },
    });
  };

  const handleSetAllBoroughs = (ids: string[]) => {
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          boroughIds: ids.join(","),
        },
      },
    });
  };

  const handleClearAllFacilities = () => {
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          facilityTypeIds: "",
        },
      },
    });
  };

  const handleClearAllBoroughs = () => {
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          boroughIds: "",
        },
      },
    });
  };

  useEffect(() => {
    setGeneratedUrl(generateUrl(searchParams));
  }, [searchParams]);

  // On mount, check for URL param and update state if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const param = url.searchParams.get("q");
    if (param) {
      const decoded = decodeParams(param);
      if (decoded) setSearchParams(decoded);
    }
    // eslint-disable-next-line
  }, []);

  // Sync URL with state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const encoded = encodeParams(searchParams);
    const url = new URL(window.location.href);
    url.searchParams.set("q", encoded);
    window.history.replaceState({}, "", url.toString());
  }, [searchParams]);

  return (
    <div className="flex flex-col bg-linear-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="flex-1 mx-auto px-4 py-8 max-w-6xl container">
        <PageHeader />

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Left Column - Filters */}
          <div className="space-y-6 lg:col-span-2">
            <SearchQueryCard
              searchValue={searchParams.search}
              onSearchChange={(value) => updateSearchParams({ search: value })}
              sortColumns={sortColumns}
              currentColumn={searchParams.sortable.column}
              isOrderAsc={searchParams.sortable.isOrderAsc}
              onColumnChange={(value) =>
                updateSearchParams({
                  sortable: {
                    ...searchParams.sortable,
                    column: value,
                  },
                })
              }
              onOrderChange={(value) =>
                updateSearchParams({
                  sortable: {
                    ...searchParams.sortable,
                    isOrderAsc: value,
                  },
                })
              }
            />

            <NotesCard />

            {/* Date & Time Selection */}
            <DateTimeSelectionCard
              date={searchParams.filter.value.dates[0] || ""}
              startTime={searchParams.filter.value.startTime}
              endTime={searchParams.filter.value.endTime}
              onDateChange={(value) =>
                updateSearchParams({
                  filter: {
                    ...searchParams.filter,
                    value: {
                      ...searchParams.filter.value,
                      dates: [value],
                    },
                  },
                })
              }
              onStartTimeChange={(value) =>
                updateSearchParams({
                  filter: {
                    ...searchParams.filter,
                    value: {
                      ...searchParams.filter.value,
                      startTime: value,
                    },
                  },
                })
              }
              onEndTimeChange={(value) =>
                updateSearchParams({
                  filter: {
                    ...searchParams.filter,
                    value: {
                      ...searchParams.filter.value,
                      endTime: value,
                    },
                  },
                })
              }
            />

            <FacilityTypesCard
              facilityTypes={facilityTypes}
              selectedFacilities={selectedFacilities}
              onFacilityToggle={handleFacilityToggle}
              onSetAllFacilities={handleSetAllFacilities}
              onClearAllFacilities={handleClearAllFacilities}
            />

            <BoroughsCard
              boroughs={boroughs}
              selectedBoroughs={selectedBoroughs}
              onBoroughToggle={handleBoroughToggle}
              onSetAllBoroughs={handleSetAllBoroughs}
              onClearAllBoroughs={handleClearAllBoroughs}
            />
          </div>

          {/* Right Column - URL Output */}
          <div className="lg:col-span-1">
            <UrlOutputCard
              generatedUrl={generatedUrl}
              searchParams={searchParams}
              sortColumns={sortColumns}
              selectedFacilities={selectedFacilities}
              selectedBoroughs={selectedBoroughs}
            />
          </div>
        </div>
      </div>
      {/* Spacer for mobile to allow scrolling past the fixed URL card */}
      <div className="lg:hidden h-60" />
      <PageFooter />
    </div>
  );
}
