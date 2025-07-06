import { Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FacilityType } from '@/types/search';

interface FacilityTypesCardProps {
  facilityTypes: FacilityType[];
  selectedFacilities: string[];
  onFacilityToggle: (facilityId: string) => void;
}

export function FacilityTypesCard({ facilityTypes, selectedFacilities, onFacilityToggle }: FacilityTypesCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-linear-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Filter className="w-5 h-5" />
          Facility Types
        </CardTitle>
        <CardDescription className="text-orange-100 text-sm lg:text-base">
          Select the types of facilities you're interested in
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {facilityTypes.map((facility) => (
            <div key={facility.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Checkbox
                id={facility.id}
                checked={selectedFacilities.includes(facility.id)}
                onCheckedChange={() => onFacilityToggle(facility.id)}
              />
              <Label
                htmlFor={facility.id}
                className="flex items-center gap-2 cursor-pointer flex-1 text-sm lg:text-base"
              >
                <span className="text-lg">{facility.icon}</span>
                <span className="font-medium truncate">{facility.name}</span>
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedFacilities.map((id) => {
            const facility = facilityTypes.find(f => f.id === id);
            return facility ? (
              <Badge key={id} variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                {facility.icon} {facility.name}
              </Badge>
            ) : null;
          })}
        </div>
      </CardContent>
    </Card>
  );
} 