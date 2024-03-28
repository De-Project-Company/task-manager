"use client";

import { useEffect, useState } from "react";

/**
 * Calculates and updates the countdown to a specific date.
 * @param {string} targetDate - The target date in ISO format (e.g., '2024-02-29T00:00:00.000Z').
 * @returns {object} - An object containing the current countdown values (days, hours, minutes, seconds).
 */
const useCountdown = (
  targetDate?: string
): { days: number; hours: number; minutes: number; seconds: number } => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      // Set the target date
      const targetTime = new Date(targetDate!).getTime();

      // Get the current time
      const currentTime = new Date().getTime();

      // Calculate the time difference in milliseconds
      const timeDifference = targetTime - currentTime;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    // Update countdown every second (1000 milliseconds)
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(countdownInterval);
  }, [targetDate]);

  return countdown;
};

export default useCountdown;
