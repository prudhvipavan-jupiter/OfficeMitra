"use client";

function formatIcsDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function downloadCalendarEvent(title: string, date: Date, description: string) {
  const start = new Date(date);
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OfficeMitra//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@theofficemitra.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

interface CalendarExportButtonProps {
  title: string;
  date: Date | null;
  description: string;
  label: string;
}

export function CalendarExportButton({ title, date, description, label }: CalendarExportButtonProps) {
  if (!date || Number.isNaN(date.getTime())) return null;

  return (
    <button
      type="button"
      onClick={() => downloadCalendarEvent(title, date, description)}
      className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
    >
      {label}
    </button>
  );
}
