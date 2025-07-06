import { SortAsc, SortDesc } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { SortColumn } from '@/types/search';

interface SortOptionsCardProps {
  sortColumns: SortColumn[];
  currentColumn: string;
  isOrderAsc: boolean;
  onColumnChange: (value: string) => void;
  onOrderChange: (value: boolean) => void;
}

export function SortOptionsCard({
  sortColumns,
  currentColumn,
  isOrderAsc,
  onColumnChange,
  onOrderChange
}: SortOptionsCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-linear-to-r from-teal-600 to-green-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          {isOrderAsc ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
          Sort Options
        </CardTitle>
        <CardDescription className="text-teal-100 text-sm lg:text-base">
          Configure how results should be sorted
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sortColumn" className="text-sm font-medium text-gray-700">
              Sort by
            </Label>
            <Select value={currentColumn} onValueChange={onColumnChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortColumns.map((col) => (
                  <SelectItem key={col.value} value={col.value}>
                    {col.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sortOrder" className="text-sm font-medium text-gray-700">
              Order
            </Label>
            <Select
              value={isOrderAsc ? 'asc' : 'desc'}
              onValueChange={(value) => onOrderChange(value === 'asc')}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 