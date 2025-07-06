import { SearchParams } from '@/types/search';

export const generateUrl = (searchParams: SearchParams): string => {
  const baseUrl = 'https://loisirs.montreal.ca/IC3/#/U6510/search/';
  const encodedParams = encodeURIComponent(JSON.stringify(searchParams));
  return `${baseUrl}?searchParam=${encodedParams}&hasBoroughFilter=true`;
}; 