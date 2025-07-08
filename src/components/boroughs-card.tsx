import { MapPin, MapPinHouse, MapPinHouseIcon } from "lucide-react";
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
import { Borough } from "@/types/search";
import { Button } from "@/components/ui/button";

interface BoroughsCardProps {
  boroughs: Borough[];
  selectedBoroughs: string[];
  onBoroughToggle: (id: string) => void;
  onSetAllBoroughs: (ids: string[]) => void;
  onClearAllBoroughs: () => void;
}

export function BoroughsCard({
  boroughs,
  selectedBoroughs,
  onBoroughToggle,
  onSetAllBoroughs,
  onClearAllBoroughs,
}: BoroughsCardProps) {
  const allSelected =
    boroughs.length > 0 && selectedBoroughs.length === boroughs.length;
  const anySelected = selectedBoroughs.length > 0;
  const handleSelectAll = () => {
    onSetAllBoroughs(boroughs.map((b) => b.id));
  };
  const handleDeselectAll = () => {
    onClearAllBoroughs();
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="flex flex-wrap items-center gap-2 bg-linear-to-r from-yellow-600 to-orange-600 rounded-t-lg text-white">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <MapPinHouseIcon /> Boroughs
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
      <CardContent className="p-4 lg:p-6">
        <div className="gap-3 grid grid-cols-1 lg:grid-cols-2">
          {boroughs.map((borough) => (
            <div
              key={borough.id}
              className="flex items-center space-x-3 hover:bg-gray-50 p-3 border border-gray-200 rounded-lg transition-colors"
            >
              <Checkbox
                id={borough.id}
                checked={selectedBoroughs.includes(borough.id)}
                onCheckedChange={() => onBoroughToggle(borough.id)}
              />
              <Label
                htmlFor={borough.id}
                className="flex flex-1 items-center gap-2 min-w-0 text-sm cursor-pointer"
              >
                <div
                  className={`w-3 h-3 rounded-full ${borough.color} flex-shrink-0`}
                />
                <span className="font-medium truncate">{borough.name}</span>
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="mb-2 text-gray-600 text-sm">
            Selected: {selectedBoroughs.length} of {boroughs.length} boroughs
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedBoroughs.slice(0, 4).map((id) => {
              const borough = boroughs.find((b) => b.id === id);
              return borough ? (
                <Badge
                  key={id}
                  variant="outline"
                  className="max-w-full text-xs"
                >
                  <span className="block truncate">{borough.name}</span>
                </Badge>
              ) : null;
            })}
            {selectedBoroughs.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{selectedBoroughs.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
