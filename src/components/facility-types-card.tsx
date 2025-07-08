import { Filter } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FacilityType } from "@/types/search";
import { Button } from "@/components/ui/button";

interface FacilityTypesCardProps {
  facilityTypes: FacilityType[];
  selectedFacilities: string[];
  onFacilityToggle: (facilityId: string) => void;
  onSetAllFacilities: (ids: string[]) => void;
  onClearAllFacilities: () => void;
}

export function FacilityTypesCard({
  facilityTypes,
  selectedFacilities,
  onFacilityToggle,
  onSetAllFacilities,
  onClearAllFacilities,
}: FacilityTypesCardProps) {
  const allSelected =
    facilityTypes.length > 0 &&
    selectedFacilities.length === facilityTypes.length;
  const anySelected = selectedFacilities.length > 0;
  const handleSelectAll = () => {
    onSetAllFacilities(facilityTypes.map((ft) => ft.id));
  };
  const handleDeselectAll = () => {
    onClearAllFacilities();
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="flex flex-wrap items-center gap-2 bg-linear-to-r from-green-600 to-blue-600 rounded-t-lg text-white">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Filter className="w-5 h-5" />
          Facility Types | Types de plateau
        </CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleSelectAll}
            className="text-xs"
          >
            Select All
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleDeselectAll}
            className="text-xs"
          >
            Deselect All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {facilityTypes.map((facility) => (
            <div
              key={facility.id}
              className="flex items-center space-x-3 hover:bg-gray-50 p-3 border border-gray-200 rounded-lg transition-colors"
            >
              <Checkbox
                id={facility.id}
                checked={selectedFacilities.includes(facility.id)}
                onCheckedChange={() => onFacilityToggle(facility.id)}
              />
              <Label
                htmlFor={facility.id}
                className="flex flex-1 items-center gap-2 text-sm cursor-pointer"
              >
                <span className="text-lg">{facility.icon}</span>
                <span className="font-medium truncate">{facility.name}</span>
              </Label>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedFacilities.map((id) => {
            const facility = facilityTypes.find((f) => f.id === id);
            return facility ? (
              <Badge
                key={id}
                variant="secondary"
                className="bg-orange-100 text-orange-800 text-xs"
              >
                {facility.icon} {facility.name}
              </Badge>
            ) : null;
          })}
        </div>
      </CardContent>
    </Card>
  );
}
