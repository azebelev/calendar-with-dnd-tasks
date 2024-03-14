import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { WeeksGrid } from '../../components/styled/WeeksGrid';
import useCalendarDate from '../../store/calendarDateStore';
import useTaskStore from '../../store/taskStore';
import { useDebounce } from '../../utils/debounce';
import {
  DateData,
  getCurrentMonthsDatesForGrid,
  getMonthDatesFromDate,
  ScrollDirection,
} from '../../utils/getDatesForGrid';
import { getTaskById } from '../../utils/getTaskById';
import { CalendarDay } from './CalendarDay';
import { TaskCard } from './TaskCard';

export function CalendarGrid() {
  const [datesData, setDatesData] = useState<DateData[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollInfo, setScrollInfo] = useState<{
    prevScrollHeight: number;
    isAfterUpScroll: boolean;
  }>({ prevScrollHeight: 0, isAfterUpScroll: false });
  const { setCalendarDate, chosenCalendarDate } = useCalendarDate(
    ({ setCalendarDate, chosenCalendarDate }) => ({ setCalendarDate, chosenCalendarDate })
  );

  const { dragSync } = useTaskStore(({ dragSync }) => ({ dragSync }));

  useEffect(() => {
    setDatesData(getCurrentMonthsDatesForGrid());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const initialView = document.getElementById(chosenCalendarDate.toISOString());
      initialView?.scrollIntoView(true);
    }, 1);
  }, []);

  const threshold = 10;

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

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollInfo.isAfterUpScroll &&
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight - scrollInfo.prevScrollHeight - threshold,
        });
    }
  }, [scrollInfo]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>();

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log(event);
    event.over && dragSync(event.active.id, event.over?.id);
    setActiveId(undefined);
  }

  return (
    <>
      {
        <WeeksGrid>
          {['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'].map((e, i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: 'center' }}>{e}</div>
            </React.Fragment>
          ))}
        </WeeksGrid>
      }
      <div
        onScroll={handleScroll}
        style={{ height: '90%', overflowY: 'auto' }}
        ref={scrollContainerRef}
      >
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <WeeksGrid>
            {datesData.map((dateData, i) => (
              <React.Fragment key={i}>
                <CalendarDay dateData={dateData} />
              </React.Fragment>
            ))}
          </WeeksGrid>
          <DragOverlay style={{ opacity: 1, cursor: 'grabbing' }}>
            {activeId ? <TaskCopy id={activeId} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

function TaskCopy({ id }: { id: UniqueIdentifier }) {
  const { filteredTasks } = useTaskStore(({ filteredTasks }) => ({
    filteredTasks,
  }));
  const task = getTaskById(id, filteredTasks);

  return task ? <div style={{'opacity':'0.5'}}><TaskCard task={task} /> </div>: null;
}
