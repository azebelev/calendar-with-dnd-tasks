import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import useCalendarDate from '../store/calendarDateStore';
import { useDebounce } from './debounce';
import {
  DateData,
  getCurrentMonthsDatesForGrid,
  getMonthDatesFromDate,
} from '../utils/getDatesForGrid';
import { ScrollDirection } from '../enums/scrollDirectionEnum';

export function useInfiniteScroll() {
  const [datesData, setDatesData] = useState<DateData[]>([]);
  const { setCalendarDate, chosenCalendarDate } = useCalendarDate(
    ({ setCalendarDate, chosenCalendarDate }) => ({ setCalendarDate, chosenCalendarDate })
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollInfo, setScrollInfo] = useState<{
    prevScrollHeight: number;
    isAfterUpScroll: boolean;
  }>({ prevScrollHeight: 0, isAfterUpScroll: false });

  const threshold = 10;

  const debouncedDefineMonth = useDebounce((clientHeight: number) => {
    const dateContainers = document.querySelectorAll('.month-indicator');
    const datesInView = new Map<string, number>();

    for (let i = 0; i < dateContainers.length; i++) {
      const rect = dateContainers[i].getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < clientHeight) {
        const date = dayjs(dateContainers[i].id).startOf('month').toISOString();
        datesInView.set(date, (datesInView.get(date) ?? 0) + 1);
      }
    }

    let mainDate: string | undefined;
    let maxFrequency = 0;
    datesInView.forEach((v, k) => {
      if (v > maxFrequency) {
        mainDate = k;
        maxFrequency = v;
      }
    });
    setCalendarDate(dayjs(mainDate));
  }, 500);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop === 0) {
      setDatesData([...getMonthDatesFromDate(datesData[0].date, ScrollDirection.Up), ...datesData]);
      setScrollInfo({ prevScrollHeight: scrollHeight, isAfterUpScroll: true });
    }
    if (scrollHeight - clientHeight - scrollTop < threshold) {
      setDatesData([
        ...datesData,
        ...getMonthDatesFromDate(datesData[datesData.length - 1].date, ScrollDirection.Down),
      ]);
      setScrollInfo({ prevScrollHeight: scrollHeight, isAfterUpScroll: false });
    }
    debouncedDefineMonth(clientHeight);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollInfo.isAfterUpScroll &&
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight - scrollInfo.prevScrollHeight - threshold,
        });
    }
  }, [scrollInfo]);

  useEffect(() => {
    setDatesData(getCurrentMonthsDatesForGrid());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const initialView = document.getElementById(chosenCalendarDate.toISOString());
      initialView?.scrollIntoView(true);
    }, 1);
  }, []);

  return { datesData, scrollContainerRef, handleScroll };
}
