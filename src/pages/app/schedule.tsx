import { useState } from 'react';
import type { FormEvent } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { MonthlyGrid } from '@/components/schedule/monthly-grid';
import { WeeklyGrid } from '@/components/schedule/weekly-grid';
import { Drawer } from '@/components/ui/drawer';
import { formatMonthYear, getWeekDays, isSameDay } from '@/lib/scheduleUtils';
import { cn } from '@/lib/utils';

export type EventCategory = 'Reunião' | 'Deadline' | 'Entrega' | 'Interno';

export type ScheduleEvent = {
  id: number;
  title: string;
  category: EventCategory;
  date: Date;
  durationHours: number;
  attendees: { name: string; src?: string }[];
};

const EVENT_CATEGORIES: EventCategory[] = ['Reunião', 'Deadline', 'Entrega', 'Interno'];

function createRelativeDate(dayOffset: number, hour: number, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  return date;
}

const MOCK_EVENTS: ScheduleEvent[] = [
  {
    id: 1,
    title: 'Alinhamento Comercial',
    category: 'Reunião',
    date: createRelativeDate(0, 9),
    durationHours: 1,
    attendees: [
      { name: 'Marina Costa', src: 'https://i.pravatar.cc/100?img=11' },
      { name: 'Mateus Lima', src: 'https://i.pravatar.cc/100?img=12' },
    ],
  },
  {
    id: 2,
    title: 'Entrega do Financeiro',
    category: 'Entrega',
    date: createRelativeDate(1, 14),
    durationHours: 2,
    attendees: [
      { name: 'Paula Souza', src: 'https://i.pravatar.cc/100?img=13' },
      { name: 'Mika Silva', src: 'https://i.pravatar.cc/100?img=14' },
      { name: 'Nina Alves', src: 'https://i.pravatar.cc/100?img=15' },
    ],
  },
  {
    id: 3,
    title: 'Revisão Interna',
    category: 'Interno',
    date: createRelativeDate(-1, 11),
    durationHours: 1,
    attendees: [{ name: 'Pedro Moura', src: 'https://i.pravatar.cc/100?img=16' }],
  },
  {
    id: 4,
    title: 'Deadline Tributário',
    category: 'Deadline',
    date: createRelativeDate(3, 16),
    durationHours: 1,
    attendees: [
      { name: 'Lia Rocha', src: 'https://i.pravatar.cc/100?img=17' },
      { name: 'Caio Melo', src: 'https://i.pravatar.cc/100?img=18' },
    ],
  },
  {
    id: 5,
    title: 'Kickoff Operacional',
    category: 'Reunião',
    date: createRelativeDate(7, 10),
    durationHours: 1,
    attendees: [
      { name: 'Bea Farias', src: 'https://i.pravatar.cc/100?img=19' },
      { name: 'Julia Nunes', src: 'https://i.pravatar.cc/100?img=20' },
    ],
  },
];

function getWeekLabel(currentDate: Date) {
  const weekDays = getWeekDays(currentDate);
  const firstDay = weekDays[0];
  const lastDay = weekDays[6];

  if (firstDay.getMonth() === lastDay.getMonth()) {
    return `${firstDay.getDate()} - ${lastDay.getDate()} ${formatMonthYear(
      firstDay.getFullYear(),
      firstDay.getMonth(),
    )}`;
  }

  return `${firstDay.getDate()} ${formatMonthYear(
    firstDay.getFullYear(),
    firstDay.getMonth(),
  )} - ${lastDay.getDate()} ${formatMonthYear(lastDay.getFullYear(), lastDay.getMonth())}`;
}

export function Schedule() {
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [events, setEvents] = useState<ScheduleEvent[]>(MOCK_EVENTS);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<EventCategory | ''>('');

  function handleNavigate(direction: 'previous' | 'next') {
    const step = direction === 'previous' ? -1 : 1;

    if (view === 'weekly') {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + step * 7);
      setCurrentDate(nextDate);
      return;
    }

    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + step, 1);
    setCurrentDate(nextMonthDate);
  }

  function handleCreateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTitle || !newCategory) {
      return;
    }

    const nextEventDate = new Date(currentDate);
    const hasEventOnCurrentDay = events.some((item) => isSameDay(item.date, currentDate));

    nextEventDate.setHours(hasEventOnCurrentDay ? 15 : 9, 0, 0, 0);

    setEvents((currentEvents) => [
      {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        date: nextEventDate,
        durationHours: 1,
        attendees: [{ name: 'Climbe Team' }],
      },
      ...currentEvents,
    ]);

    setNewTitle('');
    setNewCategory('');
    setIsDrawerOpen(false);
  }

  const navigationLabel =
    view === 'monthly'
      ? formatMonthYear(currentDate.getFullYear(), currentDate.getMonth())
      : getWeekLabel(currentDate);

  return (
    <div className="flex min-h-[calc(100vh-81px)] flex-col p-6">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-6 border-b border-zinc-800 pb-3">
          <button
            type="button"
            onClick={() => setView('weekly')}
            className={cn(
              'cursor-pointer border-b-2 pb-3 text-sm font-medium transition-colors',
              view === 'weekly'
                ? 'border-[#79C6C0] text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300',
            )}
          >
            Semanal
          </button>

          <button
            type="button"
            onClick={() => setView('monthly')}
            className={cn(
              'cursor-pointer border-b-2 pb-3 text-sm font-medium transition-colors',
              view === 'monthly'
                ? 'border-[#79C6C0] text-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-300',
            )}
          >
            Mensal
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="cursor-pointer whitespace-nowrap rounded-lg border border-[#79C6C0]/50 bg-[#79C6C0]/20 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#79C6C0]/40"
        >
          <span className="flex items-center gap-2">
            <Plus size={18} className="text-[#79C6C0]" />
            Criar Novo Evento
          </span>
        </button>
      </div>

      <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleNavigate('previous')}
            className="cursor-pointer rounded-lg border border-zinc-800 bg-[#111111] px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <span className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Anterior
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavigate('next')}
            className="cursor-pointer rounded-lg border border-zinc-800 bg-[#111111] px-3 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <span className="flex items-center gap-2">
              Próximo
              <ChevronRight size={16} />
            </span>
          </button>
        </div>

        <h2 className="text-center text-sm font-semibold tracking-[0.2em] text-zinc-300">
          {navigationLabel}
        </h2>

        <div />
      </div>

      <div className="flex-1">
        {view === 'weekly' ? (
          <WeeklyGrid anchorDate={currentDate} events={events} />
        ) : (
          <MonthlyGrid currentDate={currentDate} events={events} />
        )}
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Criar novo evento">
        <form className="space-y-6" onSubmit={handleCreateEvent}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Nome do Evento</label>
            <input
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              required
              placeholder="Insira o nome do Evento"
              className="w-full rounded-lg border border-zinc-800 bg-[#111111] p-3 text-sm text-white placeholder-zinc-600 focus:border-[#79C6C0] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Categoria</label>
            <div className="relative">
              <select
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value as EventCategory | '')}
                required
                className="w-full appearance-none rounded-lg border border-zinc-800 bg-[#111111] p-3 text-sm text-zinc-400 focus:border-[#79C6C0] focus:outline-none"
              >
                <option value="">Selecione</option>
                {EVENT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-3.5 right-4 text-zinc-500" size={16} />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#79C6C0]/50 bg-[#79C6C0]/20 py-3 font-medium text-white transition-all hover:bg-[#79C6C0]/40"
          >
            Salvar Evento
          </button>
        </form>
      </Drawer>
    </div>
  );
}
