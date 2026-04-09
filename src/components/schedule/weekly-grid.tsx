import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { PT_DAY_ABBR, getWeekDays, isSameDay } from '@/lib/scheduleUtils';
import type { ScheduleEvent } from '@/pages/app/schedule';

interface WeeklyGridProps {
  anchorDate: Date;
  events: ScheduleEvent[];
}

const HOURS = Array.from({ length: 23 }, (_, index) => index + 1);

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function WeeklyGrid({ anchorDate, events }: WeeklyGridProps) {
  const weekDays = getWeekDays(anchorDate);
  const today = new Date();

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#111111]">
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-zinc-800/50">
        <div className="border-r border-zinc-800/50 bg-[#111111]" />

        {weekDays.map((day) => {
          const isToday = isSameDay(day, today);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                'flex flex-col items-center gap-1 border-r border-zinc-800/50 px-2 py-3 text-center last:border-r-0',
                isToday && 'bg-[#1A1A1A]',
              )}
            >
              <span className="text-xs text-zinc-500">{PT_DAY_ABBR[day.getDay()]}</span>
              <span className={cn('text-sm text-zinc-200', isToday && 'font-bold text-[#79C6C0]')}>
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      <div className="max-h-[calc(100vh-260px)] overflow-y-auto custom-scrollbar">
        {HOURS.map((hour) => (
          <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)]">
            <div className="border-r border-b border-zinc-800/50 px-2 py-3 text-xs text-zinc-600">
              {hour}h
            </div>

            {weekDays.map((day) => {
              const isToday = isSameDay(day, today);
              const slotEvents = events.filter(
                (event) => isSameDay(event.date, day) && event.date.getHours() === hour,
              );

              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={cn(
                    'min-h-16 border-r border-b border-zinc-800/50 px-1 py-1.5 last:border-r-0',
                    isToday && 'bg-[#1A1A1A]',
                  )}
                >
                  <div className="flex flex-col gap-1">
                    {slotEvents.map((event) => (
                      <div
                        key={event.id}
                        className="mx-1 rounded border border-[#79C6C0]/30 bg-[#79C6C0]/20 px-2 py-1 text-xs text-[#79C6C0]"
                      >
                        <p className="truncate font-medium">{event.title}</p>

                        <AvatarGroup className="mt-1">
                          {event.attendees.slice(0, 2).map((attendee) => (
                            <Avatar key={`${event.id}-${attendee.name}`} size="sm">
                              {attendee.src ? <AvatarImage src={attendee.src} alt={attendee.name} /> : null}
                              <AvatarFallback className="bg-[#79C6C0] text-[9px] font-semibold text-black">
                                {getInitials(attendee.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}

                          {event.attendees.length > 2 ? (
                            <AvatarGroupCount className="bg-[#0F0F0F] text-[10px] text-zinc-300">
                              +{event.attendees.length - 2}
                            </AvatarGroupCount>
                          ) : null}
                        </AvatarGroup>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
