import calendarContext from "../context/CalendarContext";
import { useContext } from "react";

const SelectDate = () => {
  // Context
  const { selectedDates, pickDates } = useContext(calendarContext);

  return (
    <div
      onClick={pickDates}
      className="cursor-pointer flex justify-center items-center bg-white rounded hover:scale-[0.98] p-2 mb-2"
    >
      <div className="p-2 border-r-2 border-black">
        {selectedDates.date1
          ? new Date(selectedDates.date1).toString().slice(3, 10)
          : "Pickup date"}
      </div>
      <div className="p-2">
        {selectedDates.date2
          ? new Date(selectedDates.date2).toString().slice(3, 10)
          : "Return date"}
      </div>
    </div>
  );
};

export default SelectDate;
