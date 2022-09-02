import { useState, useEffect, useContext } from "react";
import Calendar from "./Calendar";
import calendarContext from "../context/CalendarContext";

const CalendarsContainer = () => {
  // Context stuff
  const { showCalendar } = useContext(calendarContext);

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
      .map((u, i) =>
        i < 12 - new Date().getMonth()
          ? {
              year: new Date().getFullYear(),
              month: new Date().getMonth() + i,
            }
          : {
              year: new Date().getFullYear() + 1,
              month: new Date().getMonth() + i - 12,
            }
      );
  };

  // On render component set this state
  useEffect(() => {
    setAllMonthsToDisplay(getAllDisplayedMonthsArray());
  }, []);

  //moveCalendarLeft
  const moveCalendarLeft = () => {
    indexCalendar.calendar1 > 0 &&
      setIndexCalendar({
        calendar1: indexCalendar.calendar1 - 1,
        calendar2: indexCalendar.calendar2 - 1,
      });
  };

  //moveCalendarRight
  const moveCalendarRight = () => {
    indexCalendar.calendar2 < allMonthsToDisplay.length - 1 &&
      setIndexCalendar({
        calendar1: indexCalendar.calendar1 + 1,
        calendar2: indexCalendar.calendar2 + 1,
      });
  };

  return (
    allMonthsToDisplay.length !== 0 &&
    showCalendar && (
      <div className="max-h-full overflow-auto sm:h-[350px] bg-white flex flex-col sm:flex-row justify-center items-baseline p-4">
        <Calendar
          year={allMonthsToDisplay[indexCalendar.calendar1].year}
          month={allMonthsToDisplay[indexCalendar.calendar1].month}
          calendar={"calendar1"}
          moveCalendarLeft={moveCalendarLeft}
          moveCalendarRight={moveCalendarRight}
        />
        <Calendar
          year={allMonthsToDisplay[indexCalendar.calendar2].year}
          month={allMonthsToDisplay[indexCalendar.calendar2].month}
          calendar={"calendar2"}
          moveCalendarLeft={moveCalendarLeft}
          moveCalendarRight={moveCalendarRight}
        />
      </div>
    )
  );
};
export default CalendarsContainer;
