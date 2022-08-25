import { useState, createContext } from "react";

const calendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  // State for selected dates - selected by user
  const [selectedDates, setSelectedDates] = useState({
    date1: null,
    date2: null,
  });

  // handle click function
  const handleClick = (year, month, e) => {
    // Get date based on clicked number
    let clickedDate = new Date(
      year,
      month,
      parseInt(e.target.textContent)
    ).getTime();

    // If return date less then pickup date
    if (clickedDate < selectedDates.date1) {
      setSelectedDates({
        date1: clickedDate,
        date2: null,
      });
    } else {
      if (!selectedDates.date1 && !selectedDates.date2) {
        setSelectedDates({
          date1: clickedDate,
          date2: null,
        });
      } else if (selectedDates.date1 && !selectedDates.date2) {
        setSelectedDates({
          ...selectedDates,
          date2: clickedDate,
        });
      } else {
        setSelectedDates({
          date1: clickedDate,
          date2: null,
        });
      }
    }
  };

  // moveCalendar function
  const moveCalendar = (e) => {
    console.log("pomjeri kalendar");
  };

  return (
    <calendarContext.Provider
      value={{
        selectedDates,
        handleClick,
        moveCalendar,
      }}
    >
      {children}
    </calendarContext.Provider>
  );
};

export default calendarContext;
