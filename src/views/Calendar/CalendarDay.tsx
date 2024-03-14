import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { PlusButton } from '../../components/buttons/PlusButton';
import { ScrollableContainer } from '../../components/ScrollableContainer';
import { Badge } from '../../components/styled/Badge';
import { Card } from '../../components/styled/Card';
import { Typography } from '../../components/styled/Typography';
import useCalendarDate from '../../store/calendarDateStore';
import useHolidays, { DATE_FORMAT_HOLIDAY_RESPONSE } from '../../store/holidaysStore';
import useTaskStore from '../../store/taskStore';
import { Task } from '../../types/todoTypes';
import { DateData } from '../../utils/getDatesForGrid';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';

export function CalendarDay({ dateData }: { dateData: DateData }) {
  const { filteredTasks, addTask } = useTaskStore(({ filteredTasks, addTask }) => ({
    filteredTasks,
    addTask,
  }));
  const { chosenCalendarDate } = useCalendarDate(({ chosenCalendarDate }) => ({
    chosenCalendarDate,
  }));

  const [modalOpen, setModalOpen] = useState(false);

  const tasks = filteredTasks[dateData.date.toISOString()] ?? [];
  const isWithingChosenDate = chosenCalendarDate.isSame(dateData.date, 'month');

  const handleAddTask = (task: Omit<Task, 'id' | 'date'>) =>
    addTask({ text: task.text, labels: task.labels, date: dateData.date.toISOString() });

  const { setNodeRef,over ,active} = useSortable({
    id: dateData.date.toISOString(),
  });

  return (
    <>
      <Card variant={isWithingChosenDate ? 'grey' : 'lightgrey'}>
        {modalOpen ? (
          <TaskModal title='Add new task' onSubmit={handleAddTask} setModalOpen={setModalOpen} />
        ) : null}

        <CalendarDayHeader
          date={dateData.date}
          taskNumbers={tasks.length}
          setModalOpen={setModalOpen}
        />

        <HolidayBlock date={dateData.date} />

        <ScrollableContainer height='15vh'>
          <SortableContext strategy={verticalListSortingStrategy} items={tasks.map((e) => e.id)}>
            <div ref={setNodeRef} style={{ height: '100%'}}>
              {tasks.length ? tasks.map((t) => <TaskCard key={t.id} task={t} />) : null}
            </div>
          </SortableContext>
        </ScrollableContainer>
      </Card>
    </>
  );
}

function CalendarDayHeader({
  taskNumbers,
  date,
  setModalOpen,
}: {
  taskNumbers: number;
  date: Dayjs;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { chosenCalendarDate } = useCalendarDate(({ chosenCalendarDate }) => ({
    chosenCalendarDate,
  }));
  const isWithinChosenMonth = date.isSame(chosenCalendarDate, 'month');
  const shouldIncludeMonthName = date.date() === date.endOf('month').date() || date.date() === 1;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Typography
          id={date.toISOString()}
          className={'month-indicator'}
          variant={isWithinChosenMonth ? 'bold' : 'light'}
        >
          {date.format(shouldIncludeMonthName ? 'MMM D' : 'D')}{' '}
        </Typography>
        {taskNumbers > 0 && (
          <Typography variant='lightSm'>
            {taskNumbers} {'task(s)'}
          </Typography>
        )}
      </div>
      <PlusButton onClick={() => setModalOpen(true)} />
    </div>
  );
}

function HolidayBlock({ date }: { date: Dayjs }) {
  const { holidays } = useHolidays(({ holidays }) => ({
    holidays,
  }));
  const year = date.get('year').toString();
  const holiday = holidays[year]?.[date.format(DATE_FORMAT_HOLIDAY_RESPONSE)]?.name;
  return holiday ? <Badge>{holiday}</Badge> : null;
}
