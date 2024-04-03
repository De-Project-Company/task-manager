import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};

/**
 * Shrink a string to a specified length(len).
 * @function shrinkString
 * @param {string} str
 * @param {number} len
 * @returns {string}
 */
export const shrinkString = ({
  str,
  len,
}: {
  str: string;
  len: number;
}): string => {
  if (!str) return "";
  if (str.length > len) {
    return str.substring(0, len) + "...";
  }
  return str;
};

/**
 * Returns an Encrypted a string .
 * @function encryptString - Encodes or encrypts a string using a base64 Buffer
 * @returns A encoded string .
 */
export const encryptString = (str: string): string => {
  const buffer = Buffer.from(str);
  return buffer.toString("base64");
};

/**
 * Decodes and Returns a string .
 * @function decryptString - Decodes or decrypts an encrypted string Buffer
 * @returns A decoded string .
 */

export const decryptString = (str: string): string => {
  const buffer = Buffer.from(str, "base64");
  return buffer.toString();
};

/**
 * Returns a string representing the time elapsed since the given time.
 * @param time - The time in seconds or a Date object.
 * @returns The formatted time string.
 */
export const commentsTime = (time: number | Date): string => {
  function getSuffix(date: number): string {
    if (date === 1 || date === 21 || date === 31) {
      return "st";
    } else if (date === 2 || date === 22) {
      return "nd";
    } else if (date === 3 || date === 23) {
      return "rd";
    } else {
      return "th";
    }
  }

  time = new Date((time as number) * 1000);
  let str = "";

  let months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let chunks: [number, string][] = [
    [31536000000, "year"],
    [2592000000, "month"],
    [604800000, "week"],
    [86400000, "day"],
    [3600000, "hour"],
    [60000, "minute"],
    [1000, "second"],
  ];

  let today: Date = new Date();
  let since: Date = new Date(today.getTime() - time.getTime());

  if (since.getTime() > 604800000) {
    str = `${months[time.getMonth()]} ${time.getDate()} ${getSuffix(
      time.getDate()
    )}`;

    if (since.getTime() > 31536000000) {
      str = `${str}, ${time.getFullYear()}`;
    }
    return str;
  }

  let ms: number = 0;
  let name: string = "";
  let i: number = 0;
  let chunksLen: number = chunks.length;
  let count: number = 0;
  for (i = 0; i < chunksLen; i++) {
    ms = chunks[i][0];
    name = chunks[i][1];
    count = Math.floor(since.getTime() / ms);
    if (count !== 0) break;
  }

  return `${count} ${name}${count > 1 ? "s" : ""} ago`;
};

/**
 * Returns a string representing the ID.
 * @function generateId - generates a unique ID for each comment
 * @returns A unique ID when it invokes.
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

/**
 * Returns the name from an email address.
 * @function getNameFromEmail
 * @param {string} email
 * @returns {string}
 */

export const getNameFromEmail = (email: string): string => {
  return email.split("@")[0];
};

/**
 * Gets the initials from a given name
 * @function getInitials
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name: string): string => {
  const words = name.split(" ");
  return words
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

/**
 * Sets a key-value pair in the session storage.
 * @function SetToSessionStorage
 * @param {string} key
 * @param {any} value
 */

export const SetToSessionStorage = (key: string, value: any): void => {
  if (typeof sessionStorage === "undefined") return;
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    //    console.error(`Error setting item to session storage: ${error}`);
  }
};

/**
 * Retrieves a value from the session storage based on the provided key.
 * @function GetFromSessionStorage
 * @param {string} key
 * @returns {string | null}
 */

export const GetFromSessionStorage = (key: string): string | null => {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const storedValue = sessionStorage?.getItem(key);
    return storedValue !== null ? storedValue : null;
  } catch (error) {
    //    console.error(`Error getting item from session storage: ${error}`);
    return null;
  }
};

/**
 * Deletes an item from the session storage.
 * @function DeleteFromSessionStorage
 * @param {string} key - The key of the item to be deleted.
 */

export const DeleteFromSessionStorage = (key: string): void => {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    // console.error(`Error deleting item from session storage: ${error}`);
  }
};

/**
 * Converts days to hours.
 * @param {number} days - The number of days to convert.
 * @returns {number} - The equivalent number of hours.
 */
export const daysToHours = (days: number): number => {
  const hoursInADay = 24;
  return days * hoursInADay;
};

/**
 * Calculates the countdown to a specific date.
 * @param {string} targetDate - The target date in ISO format (e.g., '2024-02-29T00:00:00.000Z').
 * @returns {object} - An object containing the countdown values (days, hours, minutes, seconds).
 */
export const calculateCountdown = (
  targetDate: string
): { days: number; hours: number; minutes: number; seconds: number } => {
  // Set the target date
  const targetTime = new Date(targetDate).getTime();

  // Get the current time
  const currentTime = new Date().getTime();

  // Calculate the time difference in milliseconds
  const timeDifference = targetTime - currentTime;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export const timeAgo = (dateString: string): string => {
  const now: Date = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) return `${days} days ago`;
  if (days === 1) return "1 day ago";
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return "1 hour ago";
  if (minutes > 1) return `${minutes} minutes ago`;
  if (minutes === 1) return "1 minute ago";
  if (seconds > 1) return `${seconds} seconds ago`;
  return "just now";
};

export const timeTogo = (dateString: string): string => {
  const now: Date = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() + date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) return `${days} days to go`;
  if (days === 1) return "1 day ago";
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return "1 hour ago";
  if (minutes > 1) return `${minutes} minutes ago`;
  if (minutes === 1) return "1 minute ago";
  if (seconds > 1) return `${seconds} seconds ago`;
  return "just now";
};

/**
 * Function to format price with its corresponding currency symbol
 * @param price The price value
 * @param currency The currency type (USD, EUR, GBP, or NGN)
 * @returns The formatted price with currency symbol
 */
export function formatPriceWithCurrency(
  price: number,
  currency?: "USD" | "EUR" | "GBP" | "NGN"
): string {
  let symbol = ""; // Initialize an empty string to store the currency symbol

  // Set default currency to NGN (Nigerian Naira) if currency is undefined
  if (!currency) {
    currency = "NGN";
  }

  // Switch case to determine the currency and assign the corresponding symbol
  switch (currency) {
    case "USD":
      symbol = "$"; // Assign the dollar symbol for USD
      break;
    case "EUR":
      symbol = "€"; // Assign the euro symbol for EUR
      break;
    case "GBP":
      symbol = "£"; // Assign the pound sterling symbol for GBP
      break;
    case "NGN":
      symbol = "₦"; // Assign the naira symbol for NGN
      break;
    default:
      symbol = ""; // Default to empty string if currency is not recognized
      break;
  }
  return `${symbol}${price}`; // Return the formatted price with currency symbol
}

/**
 * Function to detect and make links clickable
 * @param text The text to be checked for links
 * @returns The text with clickable links
 */
export const makeLinksClickable = (text: string): string => {
  return text.replace(
    /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi,
    (match) =>
      `<a href="${match}" target="_blank" style="color: #007bff; text-decoration: underline;">${match}</a>`
  );
};

/**
 * Function to format the text
 * @param text The text to be formatted
 * @returns The formatted text
 */
export const formatText = (text: string): string => {
  const lines = text.split("\n");
  let formattedText = "";

  lines.forEach((line) => {
    if (line.trim() === "") {
      // Empty line
      formattedText += "<br>";
    } else if (line.startsWith("-") || line.startsWith("*")) {
      // List item
      formattedText += `<br>${line}`;
    } else if (line.endsWith(":")) {
      // Header
      formattedText += `<br><h2 style="font-size: 1.2em; font-weight: semibold;">${line}</h2>`;
    } else {
      // Normal text
      formattedText += `${line}<br>`;
    }
  });

  return formattedText;
};
