import { CalendarProvider } from "./context/CalendarContext";
import Calendar from "./components/Calendar";
import { useState } from "react";

function App() {
  // Treba dobiti niz na osnovu kojeg ce se prikazivati kalendari
  const [indexCalendar, setIndexCalendar] = useState({
    calendar1: 0,
    calendar2: 1,
  });

  let allMonthsToDisplay = [];

  for (let i = 0; i < 12 - new Date().getMonth(); i++) {
    allMonthsToDisplay.push({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + i,
    });
  }

  for (let i = 0; i < 12; i++) {
    allMonthsToDisplay.push({
      year: new Date().getFullYear() + 1,
      month: i,
    });
  }

  //moveCalendar
  const moveCalendar = (calendar) => {
    if (calendar === "calendar1") {
      if (indexCalendar.calendar1 <= 0) {
        console.log("cannot move left");
      } else {
        setIndexCalendar({
          calendar1: indexCalendar.calendar1 - 1,
          calendar2: indexCalendar.calendar2 - 1,
        });
      }
    } else {
      if (indexCalendar.calendar2 >= allMonthsToDisplay.length - 1) {
        console.log("cannot move right");
      } else {
        setIndexCalendar({
          calendar1: indexCalendar.calendar1 + 1,
          calendar2: indexCalendar.calendar2 + 1,
        });
      }
    }
  };

  return (
    <div className="w-full h-screen bg-emerald-500 flex justify-center items-center">
      <CalendarProvider>
        <div className="sm:h-90 bg-white flex flex-col sm:flex-row justify-center items-baseline p-4">
          <Calendar
            year={allMonthsToDisplay[indexCalendar.calendar1].year}
            month={allMonthsToDisplay[indexCalendar.calendar1].month}
            calendar={"calendar1"}
            moveCalendar={moveCalendar}
          />
          <Calendar
            year={allMonthsToDisplay[indexCalendar.calendar2].year}
            month={allMonthsToDisplay[indexCalendar.calendar2].month}
            calendar={"calendar2"}
            moveCalendar={moveCalendar}
          />
        </div>
      </CalendarProvider>
    </div>
  );
}

export default App;
