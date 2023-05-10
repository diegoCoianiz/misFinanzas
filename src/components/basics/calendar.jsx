import React, { useState } from "react";
import stylesCss from "../../styles/calendar.module.css"


const Calendar = ({info}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const monthsOfYear = [    "Enero",    "Febrero",    "Marzo",    "Abril",    "Mayo",    "Junio",    "Julio",    "Agosto",    "Septiembre",    "Octubre",    "Noviembre",    "Diciembre",  ];

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function handlePreviousMonth() {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate()));
  }

  function handleNextMonth() {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()));
  }

  const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(selectedDate.getFullYear(), selectedDate.getMonth());

  let calendarRows = [];
  let calendarDays = [];

  // Reiniciar el array calendarDays cada vez que se selecciona un nuevo mes
  if (firstDayOfMonth !== 0) {
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push("");
    }
  }

  for (let i = 1; i <= daysInMonth; i++) {
    // Asegurarse de que sólo se añadan días del mes actual después de que se hayan añadido los días en blanco para completar la primera semana
    if (calendarDays.length < firstDayOfMonth || calendarDays.length >= (firstDayOfMonth + daysInMonth)) {
      calendarDays.push("");
    } else {
      calendarDays.push(i);
    }
  }

  while (calendarDays.length > 0) {
    calendarRows.push(calendarDays.splice(0, 7));
  }

  const styles  = {
    button: {
      margin:"0px", 
      height:"30px",
      // cursor:"pointer"
    }
  }

  return (
    <div>
      <h2 style={{margin:"0px"}}>{monthsOfYear[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
      <div style={{display: "flex"}}>
        <button style={styles.button} onClick={handlePreviousMonth}> {"<"} </button>
        <button style={styles.button} onClick={handleNextMonth}> {">"} </button>
      </div>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day, id) => (
              <th key={id}>{day}</th>
            ))}
          </tr> 
        </thead>
        <tbody>
          {calendarRows.map((week, id) => (
            <tr key={`${week}+${id}`}>
              {week.map((day,id) => (
                <td key={`${day}+${id}`} className={stylesCss.calendarDays} style={{ fontWeight: day === selectedDate.getDate() ? "bold" : "normal", cursor: day === selectedDate.getDate() ? "" : "pointer", }}>
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar