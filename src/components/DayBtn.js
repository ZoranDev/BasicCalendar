import calendarContext from "../context/CalendarContext";
import { useContext } from "react";

const DayBtn = ({ date, year, month }) => {
  // Context stuff
  const { selectedDates, handleClick } = useContext(calendarContext);

  let pickupDate = selectedDates.date1;
  let returnDate = selectedDates.date2;
  let clickedDate = new Date(year, month, date).getTime();

  let disabled = false;

  if (
    clickedDate <=
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    ).getTime()
  ) {
    disabled = true;
  }

  let classs = "";

  if (!pickupDate && !returnDate) {
    if (disabled) {
      classs = "w-full h-full cursor-pointer bg-slate-100 text-slate-400";
    } else {
      classs = "w-full h-full cursor-pointer hover:bg-slate-100";
    }
  } else if (pickupDate && !returnDate) {
    if (clickedDate === pickupDate) {
      classs = "w-full h-full cursor-pointer bg-green-500";
    } else {
      if (disabled) {
        classs = "w-full h-full cursor-pointer bg-slate-100 text-slate-400";
      } else {
        classs = "w-full h-full cursor-pointer hover:bg-slate-100";
      }
    }
  } else {
    if (clickedDate === pickupDate) {
      classs = "w-full h-full cursor-pointer bg-green-500";
    } else if (clickedDate > pickupDate && clickedDate < returnDate) {
      classs = "w-full h-full cursor-pointer bg-green-200";
    } else if (returnDate === clickedDate) {
      classs = "w-full h-full cursor-pointer bg-green-500";
    } else {
      if (disabled) {
        classs = "w-full h-full cursor-pointer bg-slate-100 text-slate-400";
      } else {
        classs = "w-full h-full cursor-pointer hover:bg-slate-100";
      }
    }
  }

  return (
    <td className="text-xl w-10 h-10 text-center">
      <button
        onClick={(e) => handleClick(year, month, e)}
        disabled={disabled}
        className={classs}
      >
        {date}
      </button>
    </td>
  );
};

export default DayBtn;
