import {
  startOfDay,
  endOfDay,
  format,
  addHours,
  addDays,
  getWeekOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { getDaysInMonth } from "date-fns";
{
  /**
   * getting the current month from the current date
   */
}

export const getCurrentMonth = (currendDate: Date): string => {
  const currentMonth = format(new Date(Date.now()), "MMM");
  return currentMonth;
};

{
  /**
   * getting days of the month
   * */
}

export const getDaysOfMonth = (currentDate: Date | number): string[] => {
  const daysInMonth = getDaysInMonth(currentDate);
  const startOfCurrentMonth = startOfDay(currentDate);

  let currentDay = startOfCurrentMonth;

  const daysArray: string[] = [];

  for (let i = 0; i < daysInMonth; i++) {
    daysArray.push(format(currentDay, "dd"));
    currentDay = addDays(currentDay, 1);
  }

  return daysArray;
};

{
  /**
   * @params currentDate
   * getting all the hours in the current date a s storing
   * them into an array, so we map through them when you want to use them
   *
   * */
}
export const getHoursOfDay = (currentDate: Date): string[] => {
  const startOfCurrentDay = startOfDay(currentDate);
  const endOfCurrentDay = endOfDay(currentDate);

  let currentHour = startOfCurrentDay;

  const hoursOfDay: string[] = [];

  while (currentHour <= endOfCurrentDay) {
    hoursOfDay.push(format(currentHour, "h a"));
    currentHour = addHours(currentHour, 1);
  }

  return hoursOfDay;
};

export const getWeek = (currentDate: Date): string[] => {
  const startOfWeekDate = startOfWeek(currentDate);
  const endOfWeekDate = endOfWeek(currentDate);

  let currentDay = startOfWeekDate;

  const weekArray: string[] = [];

  while (currentDay <= endOfWeekDate) {
    weekArray.push(format(currentDay, "EE"));
    currentDay = addDays(currentDay, 1);
  }

  return weekArray;
};
