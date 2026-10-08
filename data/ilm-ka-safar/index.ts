import { day1 } from "./day-1";
import { day2 } from "./day-2";
import { day3 } from "./day-3";
export const ilmKaSafarLessons = {
  1: day1,
  2: day2,
  3: day3,
} as const;

export type IlmKaSafarDay =
  keyof typeof ilmKaSafarLessons;
