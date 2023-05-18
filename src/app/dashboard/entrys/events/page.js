'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewEventForm = ({searchParams}) => {
  const router = useRouter()
  const [day, month, year] = searchParams.selection.split('/');
  const startDate = new Date(`${month}/${day}/${year}`);

  const [eventData, setEventData] = useState({
    eventTitle: '',
    eventStartDate: startDate,
    eventDuration: 'oneDay',
    recurrence: "none",
    eventUntilDate: '',
    estimatedCost: 0,
    eventDescription: '',
    creatorId: searchParams.id,
    friendNames: '',
  });
  const categoryOptions = ["1 vez", "diariamente", "semanalmente", "mensualmente", "anualmente"]
  const eventsModelRecurrenceConfig = ['none', 'daily', 'weekly', 'monthly', 'yearly']

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      if (data) router.push(data.res)
    })
  };

  const renderCategoryOptions = () => {
    return categoryOptions.map((category, id) => (
      <option
        key={id}
        name={"recurrence"}
        value={eventsModelRecurrenceConfig[id]}
        onChange={handleChange}
        defaultValue ={id === 0 ? true : false}
      >
        {category}
      </option>
    ));
  };

  return (
    <div className='newTransactionFormPage'>
      <p style={{ textAlign: 'start', marginBottom: '-20px' }}>Nuevo evento para el {searchParams.selection}:</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type='text'
          name='eventTitle'
          placeholder='@Nombre del evento'
          value={eventData.eventTitle}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type='text'
          name='eventDescription'
          placeholder='@Descripción del evento'
          value={eventData.eventDescription}
          onChange={handleChange}
        />
        <label htmlFor='recurrence' style={{ width: "102%"}}>
          <select style={{ width: "101.5%", height: "60px"}} name='recurrence' id='recurrence' value={eventData.recurrence} onChange={handleChange}>
            {renderCategoryOptions()}
          </select>
        </label>
      <p style={{ textAlign: 'start', marginBottom: '-0px' }}>Costo estimado del evento?</p>
        <input
          style={styles.input}
          type='number'
          step='0.1'
          name='estimatedCost'
          placeholder='@Costo estimado'
          value={eventData.estimatedCost}
          onChange={handleChange}
        />
      {/* <p style={{ textAlign: 'start', marginBottom: '-0px' }}>Compartir este evento con amigos?</p>
        <input
          style={styles.input}
          type='text'
          name='friendNames'
          placeholder='@Nombres de amigos separados por coma'
          value={eventData.friendNames}
          onChange={handleChange}
        /> */}
        <div style={{ margin: '15px 2px' }}>
          <label htmlFor='eventDurationoneDay' style={{ marginRight: '25px', fontSize: '20px' }}>
            <input
              type='radio'
              id='eventDurationoneDay'
              name='eventDuration'
              value='oneDay'
              checked={eventData.eventDuration === 'oneDay'}
              onChange={handleChange}
            />
            Un solo día
          </label>
          <label htmlFor='eventDurationToMany' style={{ fontSize: '20px' }}>
            <input
              type='radio'
              id='eventDurationToMany'
              name='eventDuration'
              value='toManyDays'
              checked={eventData.eventDuration === 'toManyDays'}
              onChange={handleChange}
            />
            Varios días seguidos
          </label>
        </div>
        {eventData.eventDuration === "toManyDays" ? (
          <div>
      <p style={{ textAlign: 'start', marginBottom: '-0px' }}>Hasta la fecha:</p>
            <input
              style={styles.input}
              type='date'
              name='eventUntilDate'
              placeholder='@Fecha del evento'
              value={eventData.eventUntilDate}
              onChange={handleChange}
            />
          </div>
        ) : ("")}
        <button style={styles.button} type='submit'>
          Crear evento
        </button>
      </form>
    </div>
  );
};

export default NewEventForm;

const styles = {
  form: {
    marginTop: "20px",
  },
  input: {
    width: "100%",
    height: "60px",
    bordderRadius: "10px",
  }
}