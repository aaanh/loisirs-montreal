import { MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Borough } from '@/types/search';

interface BoroughsCardProps {
  boroughs: Borough[];
  selectedBoroughs: string[];
  onBoroughToggle: (boroughId: string) => void;
}

export function BoroughsCard({ boroughs, selectedBoroughs, onBoroughToggle }: BoroughsCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <MapPin className="w-5 h-5" />
          Montreal Boroughs
        </CardTitle>
        <CardDescription className="text-indigo-100 text-sm lg:text-base">
          Choose which boroughs to include in your search
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="grid grid-cols-1 gap-3">
          {boroughs.map((borough) => (
            <div key={borough.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Checkbox
                id={borough.id}
                checked={selectedBoroughs.includes(borough.id)}
                onCheckedChange={() => onBoroughToggle(borough.id)}
              />
              <Label
                htmlFor={borough.id}
                className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 text-sm lg:text-base"
              >
                <div className={`w-3 h-3 rounded-full ${borough.color} flex-shrink-0`} />
                <span className="font-medium truncate">{borough.name}</span>
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Selected: {selectedBoroughs.length} of {boroughs.length} boroughs
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedBoroughs.slice(0, 4).map((id) => {
              const borough = boroughs.find(b => b.id === id);
              return borough ? (
                <Badge key={id} variant="outline" className="text-xs max-w-full">
                  <span className="truncate block">{borough.name}</span>
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