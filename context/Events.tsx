"use client";

import { getAllEvents } from "@/actions/events";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

interface EventProps {
  event: string;
  time: string;
  day: string;
  month: string;
  year: string;
}

interface EventContextProps {
  Events: EventProps[];
  setEvents: React.Dispatch<React.SetStateAction<EventProps[]>>;
  Loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EventContext = createContext({} as EventContextProps);

const EventsContextProivder = ({ children }: { children: React.ReactNode }) => {
  const [Events, setEvents] = useState([] as EventProps[]);
  const [Loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllEvents();
        if (res?.status === "success") {
          console.log(res);
          setEvents(res.event);
          console.log(res);
        } else {
          console.error(res?.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setEvents]);

  console.log(Events);

  const value = useMemo(
    () => ({ Events, setEvents, Loading, setLoading }),
    [Events, setEvents, Loading, setLoading]
  );
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

export const useEventCtx = () => {
  const ctx = useContext(EventContext);

  if (!ctx) {
    throw new Error("useEventCtx must be within the calender");
  }

  return ctx;
};

export default EventsContextProivder;
