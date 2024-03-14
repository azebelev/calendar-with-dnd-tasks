import { create } from 'zustand';

export const DATE_FORMAT_HOLIDAY_RESPONSE = 'YYYY-MM-DD';

type Holiday = {
  name: string;
  date: string;
};

type HolidaysItems = {
  holidays: Record<string, Record<string, Holiday>>;
};
type HolidayActions = {
  checkHolidaysUpdates: (year: number) => Promise<void>;
};

const useHolidays = create<HolidaysItems & HolidayActions>((set, get) => ({
  holidays: {},
  checkHolidaysUpdates: async (year: number) => {
    const holidays = get().holidays;
    if (!holidays[year.toString()]) {
      try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/UA`);
        const data = await response.json();
        set({ holidays: { ...holidays, [year.toString()]: mapToDateObject(data) } });
      } catch (error) {
        console.log(error);
      }
    }
  },
}));

export default useHolidays;

function mapToDateObject(data: Holiday[]) {
  return data.reduce((prev, current) => {
    prev[current.date] = current;
    return prev;
  }, {} as Record<string, Holiday>);
}
