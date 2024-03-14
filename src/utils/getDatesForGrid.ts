import dayjs, { Dayjs } from 'dayjs';

export type DateData = { date: Dayjs };

export function getCurrentMonthsDatesForGrid(): DateData[] {
  const date = dayjs().startOf('day');
  const startOfFirstWeek = date.startOf('month').startOf('week').startOf('day');
  const startCurrentOfMonth = date.startOf('month');
  const endOfCurrentMonth = date.endOf('month').startOf('day');
  const endOfLastWeek = endOfCurrentMonth.endOf('week');

  const endOfFirstWeekMonth = startOfFirstWeek.endOf('month');
  const startOfLastWeekMonth = endOfLastWeek.startOf('month');

  let currentDay = startOfFirstWeek;
  const days: DateData[] = [];
  while (!currentDay.isAfter(endOfLastWeek, 'day')) {
    days.push({
      date: currentDay,
    });

    currentDay = currentDay.add(1, 'day');
  }

  const monthBeforeDays = getMonthDatesFromDate(days[0].date, ScrollDirection.Up);
  const monthAfterDays = getMonthDatesFromDate(days[days.length - 1].date, ScrollDirection.Down);
  return [...monthBeforeDays, ...days, ...monthAfterDays];
}

export enum ScrollDirection {
  Up,
  Down,
}

export function getMonthDatesFromDate(date: Dayjs, scrollDirection: ScrollDirection) {
  const days: DateData[] = [];

  let startDay =
    scrollDirection === ScrollDirection.Up
      ? date.add(-1, 'day').startOf('month').startOf('week')
      : date.add(1, 'day').startOf('day');
  const finishDay =
    scrollDirection === ScrollDirection.Up
      ? date.add(-1, 'day')
      : date.add(1, 'day').endOf('month').endOf('week').startOf('day');

  while (!startDay.isAfter(finishDay)) {
    days.push({
      date: startDay,
    });
    startDay = startDay.add(1, 'day');
  }
  return days;
}
