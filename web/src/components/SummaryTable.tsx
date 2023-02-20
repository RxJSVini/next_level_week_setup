import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../services/api";
import HabitDay from "./HabitDay";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export default function SummaryTable() {
  type Summary = {
    id: string;
    date: any;
    amount: number;
    completed: number;
  }[];

  const [summary, setSummary] = useState<Summary>([]);
  
  useEffect(() => {
    api
      .get("/summary")
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex itens-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day');
          });
          return (
            <HabitDay key={date.toString()}  date={dayInSummary?.date} amount={dayInSummary?.amount} completed={dayInSummary?.completed}  />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
}