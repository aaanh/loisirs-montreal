import { SortColumn } from '@/types/search';

export const sortColumns: SortColumn[] = [
  { value: 'facility.name', label: 'Facility Name' },
  { value: 'facility.address', label: 'Address' },
  { value: 'facility.borough', label: 'Borough' },
  { value: 'activity.startTime', label: 'Start Time' },
  { value: 'activity.endTime', label: 'End Time' },
]; 