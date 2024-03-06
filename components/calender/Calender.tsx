"use client";
import {
  add,
  format,
  isToday,
  parse,
} from "date-fns";

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";

const Calender = () => {
  const [currMonth, setCurrMonth] = useState(() => format(new Date(), "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date( ));

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

  return (
    <div>
      {/* only for testing, thhis should remove since it is not included in the desing */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-xl">
          {format(firstDayOfMonth, "MMMM yyyy")}
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

      {/* calender days can go in here !!!!! */}
      <div className="grid grid-cols-7 gap-6 sm:gap-12 mt-8 place-items-center">
        {/* <h1>Come back to calender !!!!</h1> */}
      </div>
    </div>
  );
};

export default Calender;
