import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TimeRangeCardProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export function TimeRangeCard({ startTime, endTime, onStartTimeChange, onEndTimeChange }: TimeRangeCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-linear-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Clock className="w-5 h-5" />
          Time Range
        </CardTitle>
        <CardDescription className="text-green-100 text-sm lg:text-base">
          Set the time window for activities
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime" className="text-sm font-medium text-gray-700">
              Start Time
            </Label>
            <Input
              id="startTime"
              type="datetime-local"
              value={startTime.slice(0, 16)}
              onChange={(e) => onStartTimeChange(e.target.value + ':00.000-04:00')}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endTime" className="text-sm font-medium text-gray-700">
              End Time
            </Label>
            <Input
              id="endTime"
              type="datetime-local"
              value={endTime.slice(0, 16)}
              onChange={(e) => onEndTimeChange(e.target.value + ':00.000-04:00')}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 