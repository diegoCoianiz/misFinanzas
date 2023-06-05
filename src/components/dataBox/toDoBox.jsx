import React from 'react'
import { useState } from 'react'
import stylesCss from "../../styles/dataBox.module.css"

const ToDoBox = ({ toDo, handleToggle }) => {
    const [startButtonSelected, setStartButtonSelected] = useState(false)

    return (
        <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px", marginLeft: "-15px", display: "flex", flexDirection: "row", justifyContent: "space-between", borderRadius: "20px", boxShadow: "0px 0px 3px #ccc", background: "linear-gradient(to right, transparent -10%, rgb(14 1 30 / 49%), rgb(13 16 94 / 45%))" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {/* accumulatedTime  */}
                {toDo.accumulatedTimeInString && (
                    <button style={{ ...styles.button, marginBottom: "10px" }}>
                        <p style={{ margin: "0px", padding: "0px" }}>Total:
                        <br></br>
                        {toDo.accumulatedTimeInString}</p>                 
                    </button>)
                }
                {/*START BUTTON */}
                {startButtonSelected === false && (
                <button style={{ ...styles.button }} onClick={() => {
                    handleToggle.handleToggleStartedAt(toDo.index)
                    setStartButtonSelected(!startButtonSelected)
                }}>
                    <p style={{ margin: "0px", padding: "0px" }}>inicio</p>
                </button>
                )}

                {/*END BUTTON */}
                {startButtonSelected === true && (
                    <button style={{ ...styles.button}} onClick={() => {
                        handleToggle.handleToggleFinishedAt(toDo.index)
                        setStartButtonSelected(!startButtonSelected)
                    }}>
                        <p style={{ margin: "0px" }}>{toDo.startedAt} Fin</p>
                    </button>
                )}
            </div>
            <div style={{ alignItems: "center" }}>
                <div style={{ cursor: "pointer" }} onClick={() => { handleToggle.handleToggleDone(toDo.index) }}>
                    <h1 style={{ marginRight: "10px", marginTop: "0px" }}>{toDo.title} {toDo.done ? "✅" : "⬜"}
                    </h1>
                    <hr></hr>
                </div>
                <p>{toDo.description.lenght < 80 ? toDo.description : toDo.description.slice(0, 80) + "..."}</p>
            </div>
            <div style={{ width: "15%" }}>
                hola
            </div>
        </div>
    )
}

export default ToDoBox

const styles = {
    button: {
        cursor: "pointer",
        padding: "0px",
        width:  "85px",
    }
}