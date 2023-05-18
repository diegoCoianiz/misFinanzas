import React, { useState } from "react";
import stylesCss from "../../styles/calendar.module.css"
import Link from "next/link";


const Calendar = ({ groupedTransactions, userId, events }) => {
  const eventDates = events.map(event => event.start);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["D", "L", "M", "M", "J", "V", "S"];
  const monthsOfYear = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function getFirstMonthOfTheTransactionsArray() {
    return new Date(Object.keys(groupedTransactions)[Object.keys(groupedTransactions).length - 1]).getMonth()
  }
  function getFirstYearOfTheTransactionsArray() {
    return new Date(Object.keys(groupedTransactions)[Object.keys(groupedTransactions).length - 1]).getFullYear()
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

  const styles = {
    button: {
      margin: "0px",
      height: "25px",
      color: "rgb(131, 25, 25)",
      maxWidth: "50%"
    },
    calendarDays(day) {
      const thisDay = day === selectedDate.getDate() && selectedDate.getMonth() === thisMonth && selectedDate.getFullYear() === thisYear;
      const isEventDay = eventDates.includes(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day + 1).toISOString());
    
      return {
        fontWeight: isEventDay || thisDay ? "bold" : "normal",
        color: isEventDay ? "rgb(255 94 0)" : thisDay ? "#00ffb8" : "white",
        // backgroundColor: isEventDay ? "yellow" : "",
        cursor: "pointer",
        border: isEventDay ? "2px solid rgb(255 178 36)" : thisDay ? "2px solid #00ffb8" : ""
      };
    }
    
  }

  return (
    <div >
      <div style={{ display: "flex", justifyContent: "start", gap: "2", marginBottom: "-2px" }}>
        <div style={{ width: "65%", marginRight: "10%" }}>
          <h2 style={{ margin: "0px" }}>{monthsOfYear[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {(selectedDate.getMonth() > getFirstMonthOfTheTransactionsArray() && selectedDate.getFullYear() >= getFirstYearOfTheTransactionsArray()) || selectedDate.getFullYear() > getFirstYearOfTheTransactionsArray() ? (
              <button style={styles.button} onClick={handlePreviousMonth}> {"<"} </button>) : (""
            )}
            <button style={styles.button} onClick={handleNextMonth}> {">"} </button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day, id) => (
              <th key={id} style={{ color: "#00ffb8" }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows.map((week, id) => (
            <tr key={`${week}+${id}`}>
              {week.map((day, id) => (
                day < 1 ? (
                  <td key={`${day}+${id}`}></td>
                ) :
                  (
                    <td key={`${day}+${id}`} className={stylesCss.calendarDays} style={styles.calendarDays(day)} >
                      <Link href={`/dashboard/entrys/events?id=${userId}&selection=${day}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`} style={{textDecoration:"none", color:styles.calendarDays(day).color}}>
                        <div className={stylesCss.calendarDaysNumber}>
                          {day}
                        </div>
                        <div className={stylesCss.calendarDaysData}>
                          {groupedTransactions[`${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${day < 10 ? "0" + day : day}`]?.total || <br></br>}
                        </div>
                      </Link>
                    </td>
                  )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar