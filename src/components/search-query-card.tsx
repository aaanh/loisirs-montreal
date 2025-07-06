import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface SearchQueryCardProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function SearchQueryCard({ searchValue, onSearchChange }: SearchQueryCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Search className="w-5 h-5" />
          Search Query
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter keywords to search for activities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Input
          type="text"
          placeholder="e.g., tennis, swimming, basketball..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-lg"
        />
      </CardContent>
    </Card>
  );
} 