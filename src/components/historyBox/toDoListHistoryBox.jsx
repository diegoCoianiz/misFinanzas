import React from 'react'
import ToDoBox from '../dataBox/toDoBox'
import { useState } from 'react';
import DataBox from '../dataBox/PruebaBox';

const ToDoListHistoryBox = () => {

  const [toDoList, setToDoList] = useState([
    {
      index: 1,
      title: `Tarea 1`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quia laborum mollitia fuga aperiam. Illum debitis praesentium reiciendis ab placeat veniam qui quos. Officiis laudantium provident eum maxime eveniet qui?",
      priority: "Alta",
      done: false,
      startedAt: null,
      finishedAt: false,
      accumulatedTimeInSeconds: null,
      accumulatedTimeInString: null
    },
    {
      index: 2,
      title: `Tarea 2`,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quia laborum mollitia fuga aperiam. Illum debitis praesentium reiciendis ab placeat veniam qui quos. Officiis laudantium provident eum maxime eveniet qui?",
      priority: "Alta",
      done: false,
      startedAt: null,
      finishedAt: false,
      accumulatedTimeInSeconds: null,
      accumulatedTimeInString: null
    }
  ]);

  const handleToggle = {
    handleToggleDone: (index) => {
      const updatedToDoList = toDoList.map((toDo) => {
        if (toDo.index === index) {
          return {
            ...toDo,
            done: !toDo.done
          };
        }
        return toDo;
      });

      setToDoList(updatedToDoList);
    },
    handleToggleStartedAt: (index) => {
      const updatedToDoList = toDoList.map((toDo) => {
        if (toDo.index === index) {
          return {
            ...toDo,
            startedAt: new Date().toLocaleTimeString(),
          };
        }
        return toDo;
      });

      setToDoList(updatedToDoList);
    },
    handleToggleFinishedAt: (index) => {
      const updatedToDoList = toDoList.map((toDo) => {
        if (toDo.index === index) {
          const startedAtTime = new Date().setHours(...toDo.startedAt.split(':'));
          const finishedAtTime = new Date().getTime();
          const timeDifferenceInSeconds = (finishedAtTime - startedAtTime) / 1000;
          const timeDifferenceInSecondsAccumulated = toDo.accumulatedTimeInSeconds + timeDifferenceInSeconds;

          const hours = Math.floor(timeDifferenceInSecondsAccumulated / (60 * 60));
          const minutes = Math.floor(timeDifferenceInSecondsAccumulated / 60);
          const remainingSeconds = timeDifferenceInSecondsAccumulated % 60;

          return {
            ...toDo,
            startedAt: null,
            finishedAt: true,
            accumulatedTimeInSeconds: toDo.accumulatedTimeInSeconds + timeDifferenceInSeconds,
            accumulatedTimeInString: `${hours > 0 ? hours + "h " : ""} ${minutes > 0 ? minutes + "m " : ""} ${remainingSeconds > 0 ? remainingSeconds + "s" : ""}`
          };
        }
        return toDo;
      });

      setToDoList(updatedToDoList);
    },
  }

  return (
    <>
      <h1 style={{ textAlign: "start", marginBottom: "10px" }}>{"<"} Actividades {">"}</h1>
      {toDoList.map((toDo) => {
        return (
          <div key={toDo.index}>
            <ToDoBox toDo={toDo} handleToggle={handleToggle} />
          </div>
        )
      })}
      <DataBox />
    </>
  )
}

export default ToDoListHistoryBox