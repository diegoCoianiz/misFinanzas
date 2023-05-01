import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { incomeCategoryColors, expenseCategoryColors } from '@/data/categoryAndColors'

const TransactionBox = ({ amount, date, category, type, notes, transaction_id }) => {
  const notesLength = 80
  let buttonColor = "";
  const createButtonColor = () => {
    if (type === 'ingreso') buttonColor = incomeCategoryColors.filter(color => { return color[0] === category })[0]
    else buttonColor = expenseCategoryColors.filter(color => { return color[0] === category })[0] 
  }
  createButtonColor()

  let desiredDate = "fecha 00:00hs"
  if(date !== false){
    const monthNames = ["", "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const month = parseInt(date.slice(5, 7));
    desiredDate = monthNames[month] + " " + date.slice(8, 16).replace("-", "/").replace("T", " ")
  }

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("se envia una solicitud DELETE a", `/api/transactions/${transaction_id}`)
    fetch(`/api/transactions?id=${transaction_id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        location.reload();
      })
      .catch(error => {
        console.error('There was an error deleting the resource:', error);
      });
  }


  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/api/transaction/${transaction_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        myData: 'updated'
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Resource updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the resource:', error);
      });
  }

  return (
    <div style={type === 'egreso' ? { ...styles.box, backgroundColor: '#7B2F59', boxShadow: "2px 2px 2px #1E9EA8" } : { ...styles.box, backgroundColor: '#018484', boxShadow: "2px 2px 2px  #FFBA08" }}>
      <div style={{ minWidth: "90%" }}>
        <div style={styles.date}>

          <div style={{ display: "flex", flexDirection: "row", }}>
            <button style={type === 'egreso' ? { ...styles.colorButton, backgroundColor: buttonColor[1], boxShadow: "2px 2px 2px #1E9EA8" } : { ...styles.colorButton, backgroundColor: buttonColor[1], boxShadow: "2px 2px 2px #7B2F59" }}></button>
            <p style={{ margin: "0px 10px" }}>{"<"}{category}{">"}</p>
          </div>
          <p style={{margin:"0px", fontSize:"14px"}}>
          {desiredDate}hs
          </p>
        </div>
        <div style={{ display: 'flex' }}>
          <h1 className='TransactionBox__amount'> {type === 'egreso' ? '-' : '+'}${amount}</h1>
          <div style={{marginTop:"-2px", width:"100%"}}>
          <p className='TransactionBox__notes' style={{marginLeft:"20px" }}>{notes.length < notesLength ? notes : notes.slice(0, notesLength)+"..."}</p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: "column", marginLeft: '15px' }}>
        <button style={styles.deleteButton} onClick={handleDelete}><Image src={"https://cdn-icons-png.flaticon.com/128/6794/6794645.png"} width={25} height={25} alt={'delete'} /></button>
        <Link href={`/dashboard/entrys/update?id=${transaction_id}`}><Image src={"https://cdn-icons-png.flaticon.com/128/3597/3597075.png"} width={25} height={25} alt={"update"} /></Link>

      </div>
    </div>
  )
}

export default TransactionBox

const styles = {
  box: {
    padding: '10px',
    marginTop: '10px',
    marginLeft: '-20px',
    height: '50px',
    borderRadius: '15px',
    display: "flex",
  },
  date: {
    textAlign: 'right',
    marginTop: '-5px',
    display: "flex",
    textAlign: "right",
    justifyContent: "space-between"
  },
  deleteButton: {
    background: "transparent",
    border: "none",
    margin: "0px",
    padding: "0px",
    cursor: "pointer",
    outline: "none"
  },
  colorButton: {
    width: "20px",
    margin: "0px 6px",
    marginTop: "-2px",
    marginBottom: "15px",
    height: "20px"
  },
}