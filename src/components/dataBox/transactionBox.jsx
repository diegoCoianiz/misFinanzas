import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { incomeCategoryColors, expenseCategoryColors } from '@/data/categoryAndColors'
import stylesCss from "../../styles/dataBox.module.css"

const TransactionBox = ({ amount, date, category, type, notes, transaction_id, }) => {
  const notesLength = 90
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
        // console.error('There was an error deleting the resource:', error);
      });
  }

  return (
    <div className={...stylesCss.card} style={type === 'egreso' ? { ...styles.box, backgroundColor: 'rgb(131 25 25)',} : { ...styles.box, backgroundColor: 'rgb(0 129 37)',}}>
      <div style={{ width: "90%" }}>
        <div style={styles.date}>

          <div style={{ display: "flex", flexDirection: "row", }}>
            <button className='shadowAnimation' style={type === 'egreso' ? { ...styles.colorButton, backgroundColor: buttonColor[1], } : { ...styles.colorButton, backgroundColor: buttonColor[1]}}></button>
            <p style={{ margin: "0px 10px" }}>{"<"}{category}{">"}</p>
          </div>
          <p style={{margin:"0px", fontSize:"12px"}}>
          {desiredDate}hs
          </p>
        </div>
        <div style={{ display: 'flex' }}>
          <h1 className='TransactionBox__amount'> {type === 'egreso' ? '-' : '+'}${Math.round(amount * 10) / 10}</h1>
          <div style={{marginTop:"-2px", width:"100%"}}>
          <p className='TransactionBox__notes' >{notes.length < notesLength ? notes : notes.slice(0, notesLength)+"..."}</p>
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
    marginLeft: '-18px',
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