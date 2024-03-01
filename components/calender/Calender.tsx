"use client";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from "date-fns";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";

const Calender = () => {
  const today = startOfToday();

  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: endOfMonth(firstDayOfMonth),
  });

  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl">
          {format(firstDayOfMonth, "MMMM yyyy")}{" "}
        </p>
        <div className="flex items-center justify-evenly gap-6 sm:gap-12">
          <ArrowLeft2
            className="w-6 h-6 cursor-pointer"
            onClick={getPrevMonth}
          />
          <ArrowRight2
            className="w-6 h-6 cursor-pointer"
            onClick={getNextMonth}
          />
        </div>
      </div>

      {/* get the days  */}
      <div className="dayWithNumber"></div>

      {/*  */}
      <div className="grid grid-cols-7 gap-6 sm:gap-12 mt-8 place-items-center">
        {daysInMonth.map((day, idx) => {
          return (
            <div key={idx} className={colStartClasses[getDay(day)]}>
              <p
                className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${
                  isSameMonth(day, today) ? "text-gray-900" : "text-gray-400"
                } ${!isToday(day) && "hover:bg-blue-500"} ${
                  isToday(day) && "bg-red-500 text-white"
                }`}
              >
                {format(day, "d")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calender;
