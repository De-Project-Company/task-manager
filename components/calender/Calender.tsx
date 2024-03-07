"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const Calender: React.FC = () => {
  const localizer = momentLocalizer(moment);

  const MK_EVT = [
    {
      id: 1,
      title: "fix homepage",
      start: "2022-05-31",
      end: "2022-06-04",
      description: "We are to fix homepage",
      color: "red",
    },
  ];

  const events = MK_EVT.map((event) => {
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });

  return (
    <div className="myCustomHeight">
      {/* <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      /> */}
    </div>
  );
};

export default Calender;
