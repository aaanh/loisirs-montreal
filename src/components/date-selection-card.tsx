import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface DateSelectionCardProps {
  date: string;
  onDateChange: (value: string) => void;
}

export function DateSelectionCard({ date, onDateChange }: DateSelectionCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Calendar className="w-5 h-5" />
          Activity Date
        </CardTitle>
        <CardDescription className="text-purple-100">
          Choose the date for activities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Input
          type="date"
          value={date?.slice(0, 10) || ''}
          onChange={(e) => onDateChange(e.target.value + 'T00:00:00.000-04:00')}
          className="text-lg"
        />
      </CardContent>
    </Card>
  );
} 