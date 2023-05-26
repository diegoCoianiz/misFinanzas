import { useState } from 'react';
import React from 'react'
import EventBox from './eventBox'

const EventsHistoryBox = ({ events }) => {
  const [transactionsPageView, setTransactionsPageView] = useState(0);
  const totalOfPages = Math.floor((events.length - 1) / 10);

  return (
    <>
      <h1 style={{ textAlign: "start", marginBottom: "10px" }}>
        {"<"} Historial{totalOfPages > 0 ? ` . Página ${transactionsPageView + 1}` : ""} {">"}
      </h1>

      {events.map((event, id) => {
        const daysUntillEventStart = Math.floor((new Date(event.start).getTime() - new Date().getTime()) / 86400000) 
        const showFinalCountdown = id === 0;

        return (
          <div key={event._id}>
            {showFinalCountdown && <p style={{marginBottom:"5px"}}> {daysUntillEventStart+1} {daysUntillEventStart+1 === 1 ? "día" : "dias" } para el próximo evento: </p>}
            <EventBox {...event} showFinalCountdown={showFinalCountdown} />
          </div>
        );
      })}

      <div style={{ display: "flex", padding: "0px", alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
        {
          totalOfPages > 0 && transactionsPageView > 0 &&
          <div>
            <div style={{ order: "2", marginLeft: "-10px", marginRight: "1px" }}>
              <button style={styles.nextBack_Buttons} onClick={() => { setTransactionsPageView(transactionsPageView - 1) }}> {"<"} (pág {transactionsPageView}) </button>
            </div>
          </div>
        }
        {
          totalOfPages > 0 && totalOfPages !== transactionsPageView &&
          <div>
            <div style={{ order: "1" }}>
              <button style={styles.nextBack_Buttons} onClick={() => { setTransactionsPageView(transactionsPageView + 1) }}>  (pág {transactionsPageView + 2}) {">"} </button>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default EventsHistoryBox