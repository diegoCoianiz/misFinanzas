import React from 'react'
import stylesCss from "../../styles/dataBox.module.css"
import Link from 'next/link'
import Image from 'next/image'

const DataBox = ({type="egreso", buttonColor=["red","blue"], category="ninguna", desiredDate=new Date().toLocaleTimeString, amount=0, notes="", transaction_id=""}) => {
  const notesLength = 10

  const handleDelete = () => console.log("")
    return (
        <div className={...stylesCss.card} style={type === 'egreso' ? { ...styles.box, backgroundColor: 'rgb(131 25 25)', boxShadow: "2px 2px 2px #1E9EA8" } : { ...styles.box, backgroundColor: 'rgb(0 129 37)', boxShadow: "2px 2px 2px  #FFBA08" }}>
          <div style={{ width: "90%" }}>
            <div style={styles.date}>
    
              <div style={{ display: "flex", flexDirection: "row", }}>
                <button style={type === 'egreso' ? { ...styles.colorButton, backgroundColor: buttonColor[1], boxShadow: "2px 2px 2px #1E9EA8" } : { ...styles.colorButton, backgroundColor: buttonColor[1], boxShadow: "2px 2px 2px #7B2F59" }}></button>
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
    
    export default DataBox
    
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