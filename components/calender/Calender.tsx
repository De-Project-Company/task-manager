"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

const Calender = () => {
  const localizer = momentLocalizer(dayjs);

  return <></>;
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
