import { SearchParams } from "@/types/search";

export const generateUrl = (searchParams: SearchParams): string => {
  const baseUrl = "https://loisirs.montreal.ca/IC3/#/U6510/search/";

  // Clone and strip prefixes from IDs before encoding
  const stripPrefix = (id: string) => id.replace(/^borough-|^facility-/, "");
  const filterValue = searchParams.filter.value;

  const facilityTypeIds = filterValue.facilityTypeIds
    .split(",")
    .filter(Boolean)
    .map(stripPrefix)
    .join(",");

  const boroughIds = filterValue.boroughIds
    .split(",")
    .filter(Boolean)
    .map(stripPrefix)
    .join(",");

  // Create a new params object with stripped IDs
  const paramsForUrl = {
    ...searchParams,
    filter: {
      ...searchParams.filter,
      value: {
        ...filterValue,
        facilityTypeIds,
        boroughIds,
      },
    },
  };

  const encodedParams = encodeURIComponent(JSON.stringify(paramsForUrl));
  return `${baseUrl}?searchParam=${encodedParams}&hasBoroughFilter=true`;
};
