import { CalendarProvider } from "./context/CalendarContext";
import Calendar from "./components/Calendar";
import { useState, useEffect } from "react";

function App() {
  // Treba dobiti niz na osnovu kojeg ce se prikazivati kalendari
  const [indexCalendar, setIndexCalendar] = useState({
    calendar1: 0,
    calendar2: 1,
  });

  //State for allMonthsToDisplay - (months to the end of the year and next year)
  const [allMonthsToDisplay, setAllMonthsToDisplay] = useState([]);

  // getAllDisplayedMonthsArray function
  const getAllDisplayedMonthsArray = () => {
    return Array(12 - new Date().getMonth() + 12)
      .fill(null)
      .map((u, i) => {
        if (i < 12 - new Date().getMonth()) {
          return {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + i,
          };
        } else {
          return {
            year: new Date().getFullYear() + 1,
            month: new Date().getMonth() + i - 12,
          };
        }
      });
  };

  // On render component set this state
  useEffect(() => {
    setAllMonthsToDisplay(getAllDisplayedMonthsArray());
  }, []);

  //moveCalendar
  const moveCalendar = (calendar) => {
    if (calendar === "calendar1") {
      if (indexCalendar.calendar1 > 0) {
        setIndexCalendar({
          calendar1: indexCalendar.calendar1 - 1,
          calendar2: indexCalendar.calendar2 - 1,
        });
      }
    } else {
      if (indexCalendar.calendar2 < allMonthsToDisplay.length - 1) {
        setIndexCalendar({
          calendar1: indexCalendar.calendar1 + 1,
          calendar2: indexCalendar.calendar2 + 1,
        });
      }
    }
  };

  return (
    <div className="w-full min-h-screen  bg-emerald-500 flex justify-center items-center overflow-hidden">
      <CalendarProvider>
        {allMonthsToDisplay.length !== 0 && (
          <div className="max-h-full overflow-auto sm:h-[350px] bg-white flex flex-col sm:flex-row justify-center items-baseline p-4">
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
        )}
      </CalendarProvider>
    </div>
  );
}

export default App;
