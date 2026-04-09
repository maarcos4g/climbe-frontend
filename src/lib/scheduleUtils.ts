export const PT_DAY_ABBR = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export const PT_MONTH_NAMES = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
];

function createDate(year: number, month: number, day: number) {
  return new Date(year, month, day, 0, 0, 0, 0);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getWeekDays(anchor: Date): Date[] {
  const start = createDate(
    anchor.getFullYear(),
    anchor.getMonth(),
    anchor.getDate() - anchor.getDay(),
  );

  return Array.from({ length: 7 }, (_, index) =>
    createDate(start.getFullYear(), start.getMonth(), start.getDate() + index),
  );
}

export function getMonthGridDays(year: number, month: number): Date[] {
  const firstDayOfMonth = createDate(year, month, 1);
  const gridStart = createDate(year, month, 1 - firstDayOfMonth.getDay());

  return Array.from({ length: 42 }, (_, index) =>
    createDate(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index),
  );
}

export function formatMonthYear(year: number, month: number): string {
  return `${PT_MONTH_NAMES[month]} ${year}`;
}
