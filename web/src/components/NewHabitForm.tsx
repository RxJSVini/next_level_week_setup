import { FormEvent, useState } from "react";
import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { api } from "../services/api";

const availableWeeksDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export default function NewHabitForm() {
  const [title, setTitle] = useState<string>("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();
    if (!title || weekDays.length === 0) {
      return;
    }

    try {
      await api.post("/habits", {
        title,
        weekDays,
      });

      alert("Habito criado com sucesso!");
      setTitle('')
      setWeekDays([]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form className="w-ful flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="habit" className="font-semibold leading-tight">
        Qual seu compromentimento ?
      </label>
      <input
        value={title}
        type="text"
        placeholder="ex: Exercícios, dormir, cozinhar"
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência ?
      </label>
      <div className="flex flex-col gap-2 mt-3">
        {availableWeeksDays.map((day, index) => {
          return (
            <Checkbox.Root
              key={day}
              className="flex items-center gap-3 group"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex itens-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500">
                <Checkbox.Indicator>
                  <Check size={30} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                {day}
              </span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
