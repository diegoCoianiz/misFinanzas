import React from 'react'

const PieChartDescriptions = ({ totalIncome, totalAmount, orderCategories, categoryCodes = {} }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
      <p style={{ textAlign: "start", margin: "0px", fontSize:"14px" }}>
        ingresos: ${totalIncome}
      </p>
      <h1 style={{ textAlign: "start", margin: "0px" }}>
        capital: ${Math.floor(totalIncome - totalAmount)}
      </h1>
      {orderCategories.map(({ label, value }, index) => (
        value > 0 ? (
          <p key={index} style={{ color: categoryCodes[label], margin: "0px", fontSize: "13px", alignItems: "start" }}>
            {label}: {Math.floor(value)}
          </p>
        ) : null
      ))}
      <h1 style={{ textAlign: "start", marginBottom: "0px" }}>
        gastos: ${Math.floor(totalAmount)}
      </h1>
      {orderCategories.reverse().map(({ label, value }, index) => (
        value < 0 && index < 8 ? (
          <p key={index} style={{ color: categoryCodes[label], margin: "0px", fontSize: "13px", alignItems: "start" }}>
            {label.length > 8 ? `${label.slice(0, 8)}..: ${Math.floor(value)}` : `${label}: ${Math.floor(value)}`}
          </p>
        ) : null
      ))}
    </div>

  )
}

export default PieChartDescriptions