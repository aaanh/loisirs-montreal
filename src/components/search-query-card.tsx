import { Search, SortAscIcon, SortDescIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { sortColumns as defaultSortColumns } from "@/data/sort-columns";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface SearchQueryCardProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortColumns: typeof defaultSortColumns;
  currentColumn: string;
  isOrderAsc: boolean;
  onColumnChange: (value: string) => void;
  onOrderChange: (value: boolean) => void;
}

export function SearchQueryCard({
  searchValue,
  onSearchChange,
  sortColumns,
  currentColumn,
  isOrderAsc,
  onColumnChange,
  onOrderChange,
}: SearchQueryCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="flex items-center bg-linear-to-r from-blue-600 to-purple-600 rounded-t-lg text-white">
        <CardTitle>
          <div className="flex items-center gap-2 text-lg">
            <Search className="w-5 h-5" />
            <h2>Search Query | Texte de Recherche</h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4 grid p-4">
        <Input
          type="text"
          placeholder="e.g., tennis, swimming, basketball..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="flex sm:flex-row flex-col sm:items-center gap-2">
          <Label
            htmlFor="sortColumn"
            className="font-medium text-gray-700 text-sm"
          >
            Sort by:
          </Label>
          <div className="gap-2 grid grid-cols-2">
            <Select value={currentColumn} onValueChange={onColumnChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {sortColumns.map((col) => (
                  <SelectItem key={col.value} value={col.value}>
                    {col.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={() => onOrderChange(!isOrderAsc)}
              variant={"outline"}
            >
              {isOrderAsc ? (
                <>
                  <SortAscIcon /> Ascending
                </>
              ) : (
                <>
                  <SortDescIcon /> Descending
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
