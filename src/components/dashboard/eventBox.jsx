import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const EventBox = ({ _id, start, until, title, description, estimatedCost, recurrence, showFinalCountdown, }) => {

  const _backgroundColor = showFinalCountdown ? "rgb(0 112 81)" : "rgb(131 25 25)";
  const _boxShadowColor = showFinalCountdown ? "2px 2px 2px  #FFBA08" : "2px 2px 2px #1E9EA8";
  const _buttonBackgoundColor = showFinalCountdown ? "rgb(255 94 0)" : "rgb(0 112 81)";
  const translatedRecurrence = {
    none: 'ninguna',
    daily: 'diaria',
    weekly: 'semanal',
    monthly: 'mensual',
    yearly: 'anual'
  };

  const descriptionRef = useRef(null);
  const [showItems, setShowItems] = useState("none")

  const [renderedContent, setRenderedContent] = useState("");
  let contentToRender = ` Descripción: ${description}.${showFinalCountdown ? ` Costo estimado del evento: $${estimatedCost}.` : ` Este evento comenzará en ${Math.floor((new Date(start) - new Date()) / 86400000) + 1} días, su costo estimado es de $${estimatedCost}`}`;
  if (until) {
    contentToRender += ` y durará ${Math.floor((new Date(until) - new Date(start)) / 86400000)} días, hasta el ${new Date(until).toLocaleDateString('es', { day: 'numeric', month: 'long' })}.`;
  }
  if (recurrence !== "none") {
    contentToRender += ` periodicidad: ${translatedRecurrence[recurrence]}`;
  }

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setRenderedContent((prevContent) => prevContent + contentToRender[currentIndex]);
      currentIndex++;
      if (currentIndex === contentToRender.length - 1) {
        clearInterval(interval);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      setRenderedContent("");
    };
  }, [showItems]);

  useEffect(() => {
    descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [showItems])

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`/api/events?id=${_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        location.reload();
      })
      .catch(error => {
        // console.error('There was an error deleting the resource:', error);
      });
  }
  return (
    <div style={{ marginLeft: "-20px", marginBottom: "-11px" }} className='eventBox'>
      <div style={{ backgroundColor: _backgroundColor, border: "none", borderRadius: "10px", padding: "10px", width: "95%", boxShadow: _boxShadowColor }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}  >
          <div style={{ width: "70%", cursor: "pointer" }} onClick={() => setShowItems(showItems === "none" ? "block" : "none")}>
            <div style={{ backgroundColor: _buttonBackgoundColor, margin: "0px", borderRadius: "50%", padding: "0px", width: "25px", height: "25px", boxShadow: _boxShadowColor }} >
            </div>
            <h1 style={{ fontSize: "25px", marginTop: "-20px", marginLeft: "26px" }}>
              {`< ${title.length <= 13 ? title : title.slice(0, 10) + ".."} >`} 
            </h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "30%", alignItems: "flex-end", height: "100%" }}>
            <p>{new Date(start).toLocaleDateString('es', { day: 'numeric', month: 'long' })}</p>
            <div style={{ display: "flex" }}>
              <button style={styles.deleteButton} onClick={handleDelete}><Image src={"https://cdn-icons-png.flaticon.com/128/6794/6794645.png"} width={25} height={25} alt={'delete'} /></button>
              <button style={styles.deleteButton}>
                <Link href={`/dashboard/entrys/events/update?id=${_id}`}><Image src={"https://cdn-icons-png.flaticon.com/128/3597/3597075.png"} width={25} height={25} alt={"update"} /></Link>
              </button>
            </div>
          </div>
        </div>
        <div ref={descriptionRef} style={{ display: showItems, textAlign: "start", marginTop: "10px" }}>
          <hr style={{ marginTop: "-10px" }}></hr>
          {title.length >= 13 && <p>Titulo: {title}</p> }
          {renderedContent}
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default EventBox

const styles = {
  deleteButton: {
    background: "transparent",
    border: "none",
    margin: "0px 5px",
    padding: "0px",
    cursor: "pointer",
    outline: "none"
  },
}