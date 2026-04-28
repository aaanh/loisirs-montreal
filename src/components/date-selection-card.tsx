import { CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SectionPanel } from "./section-panel";
import { useTranslation } from "react-i18next";

interface DateTimeSelectionCardProps {
  date: string;
  startTime: string;
  endTime: string;
  onDateChange: (value: string) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
}

function formatDisplayDate(isoDate: string): string {
  const d = isoDate?.slice(0, 10);
  if (!d) return "—";
  try {
    return new Date(d + "T12:00:00").toLocaleDateString("fr-CA", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return d;
  }
}

export function DateTimeSelectionCard({
  date,
  startTime,
  endTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: DateTimeSelectionCardProps) {
  const { t } = useTranslation();
  const displayDate = formatDisplayDate(date);
  const start = startTime?.slice(11, 16) || "—";
  const end = endTime?.slice(11, 16) || "—";
  const summary = `${displayDate} · ${start} – ${end}`;

  return (
    <SectionPanel
      title={t("dateCard.title")}
      icon={<CalendarDays className="h-3.5 w-3.5" />}
      summary={summary}
    >
      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <label
            htmlFor="activityDate"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            {t("dateCard.date")}
          </label>
          {/* [color-scheme:dark] forces the browser's native date picker chrome
              to render in dark mode — can't be replaced by a CSS var */}
          <Input
            id="activityDate"
            type="date"
            value={date?.slice(0, 10) || ""}
            onChange={(e) =>
              onDateChange(e.target.value + "T00:00:00.000-04:00")
            }
            className="rounded-none [color-scheme:dark]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="startTime"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {t("dateCard.start")}
            </label>
            <Input
              id="startTime"
              type="time"
              value={start === "—" ? "" : start}
              onChange={(e) => {
                const newTime = e.target.value;
                const datePart = (startTime || date || "").slice(0, 10);
                onStartTimeChange(`${datePart}T${newTime}:00.000-04:00`);
              }}
              className="rounded-none [color-scheme:dark]"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="endTime"
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {t("dateCard.end")}
            </label>
            <Input
              id="endTime"
              type="time"
              value={end === "—" ? "" : end}
              onChange={(e) => {
                const newTime = e.target.value;
                const datePart = (endTime || date || "").slice(0, 10);
                onEndTimeChange(`${datePart}T${newTime}:00.000-04:00`);
              }}
              className="rounded-none [color-scheme:dark]"
            />
          </div>
        </div>
      </div>
    </SectionPanel>
  );
}
