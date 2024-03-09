"use client";
import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Calender: React.FC = () => {
  const localizer = momentLocalizer(moment);

  const MK_EVT = [
    {
      id: 1,
      title: "fix homepage",
      start: new Date(new Date().setHours(6, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(16, 0, 0)).toISOString(),
      description: "We are to fix homepage",
      color: "red",
    },
    {
      id: 2,
      title: "fix homepage",
      start: new Date(new Date().setHours(6, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(16, 0, 0)).toISOString(),
      description: "We are to fix homepage",
      color: "pink",
    },
    {
      id: 3,
      title: "New Event 1",
      start: new Date(new Date().setHours(4, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(11, 0, 0)).toISOString(),
      description: "This is a new event",
      color: "green",
    },
    {
      id: 4,
      title: "New Event 2",
      start: new Date(new Date().setHours(6, 0, 0)).toISOString(),
      end: new Date(new Date().setHours(16, 0, 0)).toISOString(),
      description: "This is another new event",
      color: "blue",
    },
  ];

  const today = new Date();

  // Set the start date for each event to be on different days (Friday, Thursday, Wednesday)
  MK_EVT[0].start = moment(today).day(5).hours(6).minutes(0).toISOString(); // Friday
  MK_EVT[0].end = moment(today).day(5).hours(16).minutes(0).toISOString();

  MK_EVT[1].start = moment(today).day(4).hours(6).minutes(0).toISOString(); // Thursday
  MK_EVT[1].end = moment(today).day(4).hours(16).minutes(0).toISOString();

  MK_EVT[2].start = moment(today).day(3).hours(4).minutes(20).toISOString(); // Wednesday
  MK_EVT[2].end = moment(today).day(3).hours(11).minutes(39).toISOString();

  MK_EVT[3].start = moment(today).day(2).hours(6).minutes(0).toISOString(); // Tuesday
  MK_EVT[3].end = moment(today).day(2).hours(16).minutes(0).toISOString();

  const events = MK_EVT.map((event) => {
    return {
      title: event?.title,
      start: new Date(event.start),
      end: new Date(event.end),
      color: event.color,
    };
  });

  return (
    <div className="h-[100vh] bg-red ">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.color,
              border: 0,
              boxShadow: `0 0 0 1px rgba(87, 102, 238, .1)`,
              padding: "10px",
            },
          };
        }}
        views={[Views.WEEK]}
      />
    </div>
  );
};

export default Calender;
