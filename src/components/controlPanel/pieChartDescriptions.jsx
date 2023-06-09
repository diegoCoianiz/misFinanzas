import React, { useEffect } from 'react'

const PieChartDescriptions = ({ totalIncome, totalAmount, orderCategories, categoryCodes = {}, totalAmountForThisMonth }) => {

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      <h1 style={{ textAlign: "start", margin: "0px" }}>
        Capital: ${Math.round((totalIncome - totalAmount)*10)/10}
      </h1>
      {/* <p style={{ textAlign: "start", margin: "0px", fontSize:"14px" }}>
        Ingresos: ${totalIncome}
      </p>
      {orderCategories.map(({ label, value }, index) => (
        value > 0 ? (
          <p key={index} style={{ color: categoryCodes[label], margin: "0px", fontSize: "13px", alignItems: "start" }}>
            {label}: ${Math.round(value*10)/10}
          </p>
        ) : null
      ))} */}
      <h1 style={{ textAlign: "start", marginBottom: "0px" }}>
        Gastos: ${Math.round(totalAmountForThisMonth * 10) / 10}
      </h1>
      {orderCategories.map(({ label, value }, index) => (
        value < 0 && index < 13 ? (
          <p key={index} style={{ color: categoryCodes[label], margin: "0px", fontSize: "13px", alignItems: "start" }}>
            {label.length > 8 ? `${label.slice(0, 8)}..: ${Math.round(value*10)/10}` : `${label}: ${Math.floor(value)}`}
          </p>
        ) : null
      ))}
    </div>

  )
}

export default PieChartDescriptions