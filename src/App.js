import { CalendarProvider } from "./context/CalendarContext";
import SelectDate from "./components/SelectDate";
import CalendarsContainer from "./components/CalendarsContainer";

function App() {
  return (
    <div className="w-full min-h-screen  bg-emerald-500 flex flex-col justify-center items-center overflow-hidden">
      <CalendarProvider>
        {/* Choose pickup and return date */}
        <SelectDate />
        {/* Where ew have both calendars */}
        <CalendarsContainer />
      </CalendarProvider>
    </div>
  );
}

export default App;
