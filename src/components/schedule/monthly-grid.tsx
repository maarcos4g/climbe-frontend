import { cn } from '@/lib/utils';
import { PT_DAY_ABBR, getMonthGridDays, isSameDay } from '@/lib/scheduleUtils';
import type { ScheduleEvent } from '@/pages/app/schedule';

interface MonthlyGridProps {
  currentDate: Date;
  events: ScheduleEvent[];
}

export function MonthlyGrid({ currentDate, events }: MonthlyGridProps) {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthDays = getMonthGridDays(year, month);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#111111]">
      <div className="grid grid-cols-7 border-b border-zinc-800">
        {PT_DAY_ABBR.map((day) => (
          <div
            key={day}
            className="border-r border-zinc-800 px-2 py-3 text-center text-xs text-zinc-500 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {monthDays.map((day) => {
          const isToday = isSameDay(day, today);
          const isCurrentMonth = day.getMonth() === month;
          const hasEvents = events.some((event) => isSameDay(event.date, day));

          return (
            <div
              key={day.toISOString()}
              className={cn(
                'relative min-h-[80px] border-r border-b border-zinc-800 p-2 text-sm last:border-r-0',
                isCurrentMonth ? 'text-zinc-300' : 'bg-[#111111]/40 text-zinc-600',
                isToday && 'border border-[#79C6C0] font-bold text-[#79C6C0]',
              )}
            >
              <span>{day.getDate()}</span>

              {hasEvents ? (
                <span className="absolute bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#79C6C0]" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
