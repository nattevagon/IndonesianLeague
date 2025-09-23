import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";

const CalendarField = ({ name, value, placeholder, onChange, baseClass }) => {
  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  return (
    <div ref={calendarRef} className="relative w-full">
      <input
        readOnly
        type="text"
        name={name}
        placeholder={placeholder}
        value={value ? new Date(value).toLocaleDateString() : ""}
        onClick={() => setShowCalendar(!showCalendar)}
        className={`${baseClass} cursor-pointer`}
      />
      {showCalendar && (
        <div className="absolute z-50 mt-2 shadow-sm bg-primary-white dark:bg-primary-black">
          <Calendar
            onChange={(date) => {
              onChange({ target: { name, value: date } });
              setShowCalendar(false);
            }}
            value={value}
            className="p-2"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarField