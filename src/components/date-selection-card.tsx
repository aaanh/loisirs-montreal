import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateTimeSelectionCardProps {
  date: string;
  startTime: string;
  endTime: string;
  onDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

export function DateTimeSelectionCard({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: DateTimeSelectionCardProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="flex items-center bg-linear-to-r from-purple-600 to-pink-600 rounded-t-lg text-white">
        <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
          <Calendar className="w-5 h-5" />
          <span>Date & Time | Temps</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="gap-4 grid p-4">
        <div className="gap-2 grid">
          <Label htmlFor="activityDate">Date</Label>
          <Input
            id="activityDate"
            type="date"
            value={date?.slice(0, 10) || ""}
            onChange={(e) =>
              onDateChange(e.target.value + "T00:00:00.000-04:00")
            }
          />
        </div>
        <div className="gap-4 grid grid-cols-2">
          <div className="gap-2 grid">
            <Label
              htmlFor="startTime"
              className="flex items-center gap-1 font-medium text-gray-700 text-sm"
            >
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={startTime.slice(11, 16)}
              onChange={(e) => {
                const newTime = e.target.value;
                const current = startTime || date;
                const datePart = (current || "").slice(0, 10);
                onStartTimeChange(`${datePart}T${newTime}:00.000-04:00`);
              }}
            />
          </div>
          <div className="gap-2 grid">
            <Label
              htmlFor="endTime"
              className="flex items-center gap-1 font-medium text-gray-700 text-sm"
            >
              End Time
            </Label>
            <Input
              id="endTime"
              type="time"
              value={endTime.slice(11, 16)}
              onChange={(e) => {
                const newTime = e.target.value;
                const current = endTime || date;
                const datePart = (current || "").slice(0, 10);
                onEndTimeChange(`${datePart}T${newTime}:00.000-04:00`);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
