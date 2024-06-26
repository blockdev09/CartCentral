import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const Time = (seconds) => {
  const hour = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  const StringHour = hour.toString().padStart(2, "0");
  const StringMinute = minutes.toString().padStart(2, "0");
  const StringSeconds = second.toString().padStart(2, "0");

  return `${StringHour} : ${StringMinute} : ${StringSeconds}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isrunning, setIsRunning] = useState(false);
  const resetFunction = () => {
    setTime(0);
    setIsRunning(false);
  };
  useEffect(() => {
    let interval;
    if (isrunning) {
      interval = setInterval(() => {
        setTime((i) => i + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isrunning]);
  return (
    <div className="adminContainer">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Stopwatch</h1>
        <section>
          <div className="stopwatch">
            <h2>{Time(time)}</h2>
            <button onClick={() => setIsRunning((i) => !i)}>
              {isrunning ? "Stop" : "Start"}
            </button>
            <button onClick={resetFunction}>Reset</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
