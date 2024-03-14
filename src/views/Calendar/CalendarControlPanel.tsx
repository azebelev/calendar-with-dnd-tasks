import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '../../components/styled/Input';
import { Typography } from '../../components/styled/Typography';
import useCalendarDate from '../../store/calendarDateStore';
import useHolidays from '../../store/holidaysStore';
import useTaskStore from '../../store/taskStore';
import { useDebounce } from '../../utils/debounce';

export function CalendarControlPanel() {
  const { chosenCalendarDate } = useCalendarDate(({ chosenCalendarDate }) => ({
    chosenCalendarDate,
  }));
  const { checkHolidaysUpdates } = useHolidays(({ checkHolidaysUpdates }) => ({
    checkHolidaysUpdates,
  }));
  const { setFilter } = useTaskStore(({ setFilter }) => ({ setFilter }),);
  const [filter, setFilterValue] = useState('');
  const debouncedSetFilter = useDebounce((filter: string) => setFilter(filter), 600);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value);

  useEffect(() => {
    checkHolidaysUpdates(chosenCalendarDate.get('year'));
  }, [chosenCalendarDate]);

  useEffect(() => {
    debouncedSetFilter(filter);
  }, [filter]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px' }}>
      <Input
        style={{ width: '200px', margin: '0' }}
        value={filter}
        onChange={handleChange}
        placeholder={'Filter tasks'}
      />
      <Typography variant={'boldXl'}>{chosenCalendarDate.format('MMMM')}</Typography>
    </div>
  );
}
