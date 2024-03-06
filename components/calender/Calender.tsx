"use client";
import { add, format, isToday, parse } from "date-fns";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";
import {
  getHoursOfDay,
  getDaysOfMonth,
  getCurrentMonth,
  getWeek,
} from "./CalenderUtils";

import { getWeeksInMonth } from "date-fns";

const Calender = () => {
  const currentDate = new Date();
  const month = getCurrentMonth(currentDate); // this is a string
  const hoursOfDay = getHoursOfDay(currentDate); // this is an array so we have to map through it
  const days = getDaysOfMonth(1); // this is an array so we have to map through it
  const week = getWeek(currentDate); // this is an array so we have to map through it

  const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 });

  console.log(result);

  return (
    <div>
      {/* present month */}
      <p>{month}</p>

      {/* Week of the month */}
      <p>Week {week}</p>

      {/* calender days can go in here !!!!! */}
      <div className="grid grid-cols-7 gap-6 sm:gap-12 mt-8 place-items-center">
        {days.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>

      {/* Render hours */}
      <div>
        {hoursOfDay.map((hour, index) => (
          <div key={index}>{hour}</div>
        ))}
      </div>
    </div>
  );
};

export default Calender;

//  <div>
//       {/* only for testing, thhis should remove since it is not included in the desing */}
//       <div className="flex items-center justify-between">
//         <p className="font-semibold text-xl">
//           {format(firstDayOfMonth, "MMMM yyyy")}
//         </p>
//         <div className="flex items-center justify-evenly gap-6 sm:gap-12">
//           <ArrowLeft2
//             className="w-6 h-6 cursor-pointer"
//             onClick={getPrevMonth}
//           />
//           <ArrowRight2
//             className="w-6 h-6 cursor-pointer"
//             onClick={getNextMonth}
//           />
//         </div>
//       </div>
