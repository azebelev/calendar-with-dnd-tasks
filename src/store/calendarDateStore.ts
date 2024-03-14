import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
type CalendarStore = {
  chosenCalendarDate: Dayjs;
  setCalendarDate: (date: Dayjs) => void;
};
const useCalendarDate = create<CalendarStore>((set, get) => ({
  chosenCalendarDate: dayjs().startOf('month'),
  setCalendarDate: (date: Dayjs) => set({ chosenCalendarDate: date }),
}));

export default useCalendarDate;
