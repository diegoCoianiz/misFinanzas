import React from 'react'
import TransactionBox from "@/components/dashboard/transactionBox";
import { useState } from 'react';

const TransactionsHistoryBox = ({ transactions }) => {

  const [transactionsPageView, setTransactionsPageView] = useState(0);
  const totalOfPages = Math.floor((transactions.length - 1) / 10);

  const groupedTransactions = {};
  let prevTotal = 0;
  transactions.forEach((transaction, index) => {
    const date = transaction.createdAt.slice(0, 10);

    if (!groupedTransactions[date]) {
      groupedTransactions[date] = {
        transactions: [],
        total: 0,
        firstTransactionIndex: index // Agregar propiedad del último índice de transacción
      };
    }

    groupedTransactions[date].transactions.push(transaction);
    if (transaction.type === 'egreso') groupedTransactions[date].total += transaction.amount;
    prevTotal += transaction.amount;
  });

  return (
    <>
      <h1 style={{ textAlign: "start" }}>{"<"} Historial{totalOfPages > 0 ? ` . Página ${transactionsPageView + 1}` : ""} {">"}</h1>
      {transactions.length > 0 ? (
        transactions.slice(transactionsPageView * 10, (transactionsPageView + 1) * 10).map((transaction, num) => {
          const transactionDate = transaction.createdAt.slice(0, 10);
          const isLastTransactionForDay =
            groupedTransactions[transactionDate].firstTransactionIndex === num + transactionsPageView * 10;
          if (isLastTransactionForDay) {

            return (
              <div key={`total-${transactionDate}`}>
                <p style={{ marginBottom: "-10px" }}>Gastos del {transactionDate.slice(6, 10).split("-").reverse().join("/")}: ${groupedTransactions[transactionDate].total}</p>
                <TransactionBox amount={transaction.amount} date={transaction.createdAt} category={transaction.category} type={transaction.type} notes={transaction.notes} transaction_id={transaction._id} />
              </div>
            );
          } else {
            return (
              <div key={transaction._id}>
                <TransactionBox amount={transaction.amount} date={transaction.createdAt} category={transaction.category} type={transaction.type} notes={transaction.notes} transaction_id={transaction._id} />
              </div>
            );
          }
        })
      ) : (
        <h1 style={{ textAlign: "center" }}> {"<"} No hay transacciones {">"} </h1>
      )}
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

export default TransactionsHistoryBox

const styles = {
  nextBack_Buttons: {
    cursor: "pointer",
    padding: "0px",
    width: "140px",
  }
}