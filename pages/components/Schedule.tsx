import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { Pomodoro } from "../../models";
import dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const BIG_BREAK_THRESHOLD = 4;
const BASE_DURATION = 15e5;
const BREAK_DURATION = 3e5;
const BIG_BREAK_DURATION = 18e5;

export default function Schedule() {
  const [page, setPage] = useState<"home" | "update">("home");

  const [schedule, setSchedule] = useState<Pomodoro[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const addPomodoro = () => {
    const newSchedule = [...schedule];
    console.log(newSchedule);
    newSchedule.push({
      title: "Test",
      isDone: false,
      isBreak: false,
      startTime: new Date(
        newSchedule.length === 0
          ? Date.now()
          : +newSchedule.at(-1).startTime + newSchedule.at(-1).duration
      ),
      duration: BASE_DURATION,
      tasks: [
        "Do thing A",
        "Go through B and C",
        "Implement Feature D",
        "Deploy services for E",
      ].map((title) => ({ title, isDone: false })),
    });
    newSchedule.push({
      title: "Break",
      isDone: false,
      isBreak: true,
      startTime: new Date(
        +newSchedule.at(-1).startTime + newSchedule.at(-1).duration
      ),
      duration: BREAK_DURATION,
    });
    if (
      newSchedule.filter(({ isBreak }) => !isBreak).length %
        BIG_BREAK_THRESHOLD ===
      0
    ) {
      newSchedule.push({
        title:
          "Big Break #" +
          (newSchedule.length / (BIG_BREAK_THRESHOLD * 2)).toFixed(0),
        isDone: false,
        isBreak: true,
        startTime: new Date(
          +newSchedule.at(-1).startTime + newSchedule.at(-1).duration
        ),
        duration: BIG_BREAK_DURATION,
      });
    }
    console.log(newSchedule);
    setSchedule(newSchedule);
  };

  const startNext = () => {
    if (activeIndex > -1) {
      const newSchedule = [...schedule];
      newSchedule[activeIndex].isDone = true;
      setSchedule(newSchedule);
    }
    setActiveIndex((activeIndex + 1) % schedule.length);
  };

  const toggleTask = (index: number) => {
    const newSchedule = [...schedule];
    if (newSchedule[activeIndex].tasks?.at(index)) {
      newSchedule[activeIndex].tasks.at(index).isDone =
        !newSchedule[activeIndex].tasks.at(index).isDone;
      console.log(newSchedule);
      setSchedule(newSchedule);
    }
  };

  return (
    <div className="w-full px-8 pb-16 -mt-64">
      <div
        className="w-full flex flex-col mx-auto max-w-5xl min-h-[500px] rounded-lg border border-gray-100 p-4"
        style={{
          boxShadow: "0px 10px 40px rgb(108 133 171 / 20%)",
          backgroundColor: "#f9fafb",
        }}
      >
        <div className="flex flex-col flex-grow gap-4">
          <div className="flex justify-between">
            <ul className="flex gap-4">
              <li
                onClick={() => setPage("home")}
                className={`px-4 py-2 text-base font-bold transition-colors  rounded-md cursor-pointer ${
                  page === "home"
                    ? "text-white bg-blue-600"
                    : "hover:bg-gray-200"
                }`}
              >
                Home
              </li>
              <li
                onClick={() => setPage("update")}
                className={`px-4 py-2 text-base font-bold transition-colors  rounded-md cursor-pointer ${
                  page === "update"
                    ? "text-white bg-blue-600"
                    : "hover:bg-gray-200"
                }`}
              >
                Update
              </li>
            </ul>
            <div>
              <p
                className={`flex items-center tracking-wide gap-2 px-4 py-1 text-xl font-bold transition-colors border-2 bg-white border-gray-300 rounded-md cursor-grab`}
              >
                {schedule[activeIndex]
                  ? schedule[activeIndex].isBreak
                    ? "Break"
                    : "Work"
                  : "Idle"}
              </p>
            </div>
            <div className="flex gap-4">
              {page === "home" ? (
                <button
                  onClick={startNext}
                  className="flex items-center gap-2 px-4 py-1 text-base font-bold transition-all bg-white border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-600"
                >
                  <PlayIcon className="w-6 h-6" />
                  Start
                </button>
              ) : (
                <button
                  onClick={addPomodoro}
                  className="flex items-center gap-2 px-4 py-1 text-base font-bold transition-all bg-white border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-600"
                >
                  <PlusIcon className="w-6 h-6" />
                  Add
                </button>
              )}
              <p
                className={`flex items-center gap-2 px-4 py-1 text-base font-bold transition-colors border-2 bg-white border-gray-300 rounded-md cursor-wait ${
                  page !== "home" ? "bg-gray-100 text-gray-600" : ""
                }`}
              >
                <ClockIcon className="w-6 h-6" />
                <span>
                  {((schedule[activeIndex]?.duration ?? 0) / 6e4)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {((schedule[activeIndex]?.duration ?? 0) % 6e4)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </p>
            </div>
          </div>
          {page === "home" ? (
            <div className="flex flex-grow gap-4">
              <div
                className="min-w-[33%] rounded-lg p-4 bg-white"
                style={{
                  boxShadow: "0 2px 3px rgba(0, 0, 0, .1)",
                }}
              >
                <p className="font-bold text-left">Tasks</p>
                <ul className="flex flex-col h-full">
                  {schedule[activeIndex]?.tasks?.map((task, i) => (
                    <li
                      className="flex items-center flex-grow gap-4"
                      key={task.title}
                    >
                      <input
                        onClick={() => toggleTask(i)}
                        type={"checkbox"}
                        defaultChecked={task.isDone}
                      />
                      <p className="font-medium">{task.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="flex-grow p-4 bg-white rounded-lg"
                style={{
                  boxShadow: "0 2px 3px rgba(0, 0, 0, .1)",
                }}
              >
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr>
                        <th className="w-8" />
                        <th align="left" className="pb-4">
                          Title
                        </th>
                        <th align="left" className="pb-4">
                          Start
                        </th>
                        <th align="left" className="pb-4">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((p, i) => (
                        <tr className="m-0" key={i}>
                          <td>
                            {p.isDone && !p.isBreak ? (
                              <CheckCircleIcon
                                className={`w-4 h-4 ${
                                  p.tasks?.filter(({ isDone }) => isDone)
                                    .length === 0
                                    ? "text-red-500"
                                    : p.tasks?.filter(({ isDone }) => isDone)
                                        .length === p.tasks?.length
                                    ? "text-green-500"
                                    : "text-orange-500"
                                }`}
                              />
                            ) : (
                              activeIndex === i && (
                                <ArrowRightIcon
                                  className={`w-4 h-4 ${
                                    p.tasks?.filter(({ isDone }) => isDone)
                                      .length === p.tasks?.length
                                      ? "text-green-500"
                                      : "text-orange-500"
                                  }`}
                                />
                              )
                            )}
                          </td>
                          <td className="py-2">{p.title}</td>
                          <td className="py-2">
                            {p.startTime.toLocaleString("en", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-2">
                            {dayjs(p.startTime).to(
                              dayjs(p.startTime).add(
                                p.duration,
                                "milliseconds"
                              ),
                              true
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-grow gap-4">
              <div
                className="flex-grow p-4 bg-white rounded-lg"
                style={{
                  boxShadow: "0 2px 3px rgba(0, 0, 0, .1)",
                }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
