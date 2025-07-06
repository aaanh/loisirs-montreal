'use client';

import { useState, useEffect } from 'react';
import { SearchParams } from '@/types/search';
import { facilityTypes } from '@/data/facility-types';
import { boroughs } from '@/data/boroughs';
import { sortColumns } from '@/data/sort-columns';
import { generateUrl } from '@/utils/url-generator';
import { PageHeader } from '@/components/page-header';
import { SearchQueryCard } from '@/components/search-query-card';
import { TimeRangeCard } from '@/components/time-range-card';
import { DateSelectionCard } from '@/components/date-selection-card';
import { FacilityTypesCard } from '@/components/facility-types-card';
import { BoroughsCard } from '@/components/boroughs-card';
import { SortOptionsCard } from '@/components/sort-options-card';
import { UrlOutputCard } from '@/components/url-output-card';
import { PageFooter } from '@/components/page-footer';

export default function Home() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    filter: {
      isCollapsed: false,
      value: {
        startTime: '2025-07-05T18:00:00.000-04:00',
        endTime: '2025-07-05T22:45:00.000-04:00',
        dates: ['2025-07-06T00:00:00.000-04:00'],
        facilityTypeIds: '195,146,128,1,143,194,75,152,118,176,115,113,178,175,114,66',
        boroughIds: '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15',
      },
    },
    search: 'tennis',
    sortable: {
      isOrderAsc: true,
      column: 'facility.name',
    },
  });

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(['195', '146', '128', '1', '143', '194', '75', '152', '118', '176', '115', '113', '178', '175', '114', '66']);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']);
  const [generatedUrl, setGeneratedUrl] = useState<string>('');

  const updateSearchParams = (updates: Partial<SearchParams>) => {
    setSearchParams(prev => ({
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
      ? selectedFacilities.filter(id => id !== facilityId)
      : [...selectedFacilities, facilityId];

    setSelectedFacilities(newSelected);
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          facilityTypeIds: newSelected.join(','),
        },
      },
    });
  };

  const handleBoroughToggle = (boroughId: string) => {
    const newSelected = selectedBoroughs.includes(boroughId)
      ? selectedBoroughs.filter(id => id !== boroughId)
      : [...selectedBoroughs, boroughId];

    setSelectedBoroughs(newSelected);
    updateSearchParams({
      filter: {
        ...searchParams.filter,
        value: {
          ...searchParams.filter.value,
          boroughIds: newSelected.join(','),
        },
      },
    });
  };

  useEffect(() => {
    setGeneratedUrl(generateUrl(searchParams));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-1">
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters */}
          <div className="lg:col-span-2 space-y-6">
            <SearchQueryCard
              searchValue={searchParams.search}
              onSearchChange={(value) => updateSearchParams({ search: value })}
            />

            <TimeRangeCard
              startTime={searchParams.filter.value.startTime}
              endTime={searchParams.filter.value.endTime}
              onStartTimeChange={(value) => updateSearchParams({
                filter: {
                  ...searchParams.filter,
                  value: {
                    ...searchParams.filter.value,
                    startTime: value,
                  },
                },
              })}
              onEndTimeChange={(value) => updateSearchParams({
                filter: {
                  ...searchParams.filter,
                  value: {
                    ...searchParams.filter.value,
                    endTime: value,
                  },
                },
              })}
            />

            <DateSelectionCard
              date={searchParams.filter.value.dates[0] || ''}
              onDateChange={(value) => updateSearchParams({
                filter: {
                  ...searchParams.filter,
                  value: {
                    ...searchParams.filter.value,
                    dates: [value],
                  },
                },
              })}
            />

            <FacilityTypesCard
              facilityTypes={facilityTypes}
              selectedFacilities={selectedFacilities}
              onFacilityToggle={handleFacilityToggle}
            />

            <BoroughsCard
              boroughs={boroughs}
              selectedBoroughs={selectedBoroughs}
              onBoroughToggle={handleBoroughToggle}
            />

            <SortOptionsCard
              sortColumns={sortColumns}
              currentColumn={searchParams.sortable.column}
              isOrderAsc={searchParams.sortable.isOrderAsc}
              onColumnChange={(value) => updateSearchParams({
                sortable: {
                  ...searchParams.sortable,
                  column: value,
                },
              })}
              onOrderChange={(value) => updateSearchParams({
                sortable: {
                  ...searchParams.sortable,
                  isOrderAsc: value,
                },
              })}
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
      <PageFooter />
    </div>
  );
}