export interface FilterValue {
  startTime: string;
  endTime: string;
  dates: string[];
  facilityTypeIds: string;
  boroughIds: string;
}

export interface SearchParams {
  filter: {
    isCollapsed: boolean;
    value: FilterValue;
  };
  search: string;
  sortable: {
    isOrderAsc: boolean;
    column: string;
  };
}

export interface FacilityType {
  id: string;
  name: string;
  icon: string;
}

export interface Borough {
  id: string;
  name: string;
  color: string;
}

export interface SortColumn {
  value: string;
  label: string;
} 