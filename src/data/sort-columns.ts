import { SortColumn } from '@/types/search';

export const sortColumns: SortColumn[] = [
  { value: "facility.name", label: "Nom de l'installation" },
  { value: "facility.address", label: "Adresse" },
  { value: "facility.borough", label: "Arrondissement" },
  { value: "activity.startTime", label: "Heure de début" },
  { value: "activity.endTime", label: "Heure de fin" },
]; 