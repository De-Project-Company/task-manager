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
