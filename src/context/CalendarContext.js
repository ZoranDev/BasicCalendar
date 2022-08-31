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

    // If user didn't click any date or clicked date is date before date1 or if we have both dates
    if (
      (!selectedDates.date1 && !selectedDates.date2) ||
      clickedDate < selectedDates.date1 ||
      (selectedDates.date1 && selectedDates.date2)
    ) {
      setSelectedDates({
        date1: clickedDate,
        date2: null,
      });
    } else {
      setSelectedDates({
        ...selectedDates,
        date2: clickedDate,
      });
    }
  };

  return (
    <calendarContext.Provider
      value={{
        selectedDates,
        handleClick,
      }}
    >
      {children}
    </calendarContext.Provider>
  );
};

export default calendarContext;
