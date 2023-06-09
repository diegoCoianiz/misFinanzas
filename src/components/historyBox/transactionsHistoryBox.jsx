import React from 'react'
import TransactionBox from "@/components/dataBox/transactionBox";
import { useState, useEffect} from 'react';

const TransactionsHistoryBox = ({ transactions, groupedTransactions }) => {
  const [transactionsPageView, setTransactionsPageView] = useState(0);
  const totalOfPages = Math.floor((transactions.length - 1) / 10);
  const [unifyingButtonColor, setUnifyingButtonColor] = useState({});
  const [allowedIds, setAllowedIds] = useState(["", "", []]);
  const [allowedUnifyingButton, setAllowedUnifyingButton] = useState();
  const [monthEndedHr, setMonthEndedHr] = useState(0);

  
  useEffect(() => {
    const thisMonthIs = Number(transactions[0]?.createdAt.slice(5, 7))
    // setMonthEndedHr({lastMonth:Number(transactions[0]?.createdAt.slice(5, 7)), render:true})
    const firstIndexOfLastMonth = transactions.findIndex((transaction) => {
      const transactionMonth = Number(transaction.createdAt.slice(5, 7));
      return transactionMonth !== thisMonthIs;
    })
    setMonthEndedHr(firstIndexOfLastMonth)
  },[transactions])

  const handleUnifySubmit = (index) => {
    if (allowedIds[2].length > 1 && index === allowedUnifyingButton) {

      fetch('api/unifyTransactions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ transactionIds: allowedIds[2] })
      })
        .then(response => response.json())
        .then(() => {
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const handleUnifyTransactions = (id, category, date, buttonId) => {
    date = date.slice(0, 10);
    const transactionGroup = groupedTransactions[date];

    const isDuplicateCategory = transactionGroup?.duplicatedCategories === true && transactionGroup?.categoriesToUnify.includes(category);
    const isAllowed = allowedIds[2].length === 0 || (allowedIds[0] === date && allowedIds[1] === category);
    const isTransactionRepeated = allowedIds[2].some(transaction => transaction === id);

    if (isDuplicateCategory && isAllowed && !isTransactionRepeated) {
      const newAllowedIds = [date, category, [...allowedIds[2], id]];
      setAllowedIds(newAllowedIds);

      if (newAllowedIds[2].length > 1) {
        setUnifyingButtonColor(prevState => ({
          ...prevState,
          [`color_${buttonId}`]: "rgb(0 255 73)"
        }));
        setAllowedUnifyingButton(buttonId)
      }
    }
  };

  const handleMonthEndedHr = (date) => {
    if (date.slice(8, 10) !== monthEndedHr) setMonthEndedHr(date.slice(8, 10));
  };

  return (
    <>
      <h1 style={{ textAlign: "start", marginBottom: "10px" }}>{"<"} Transacciones{totalOfPages > 0 ? ` . Página ${transactionsPageView + 1}` : ""} {">"}</h1>
      {transactions.length > 0 ? (
        transactions.slice(transactionsPageView * 10, (transactionsPageView + 1) * 10).map((transaction, num) => {
          const index = num + transactionsPageView * 10
          const transactionDate = transaction.createdAt.slice(0, 10);
          const isLastTransactionForDay =
            groupedTransactions[transactionDate]?.firstTransactionIndex === index;

          if (isLastTransactionForDay) {
            return (
              <div key={`total-${transactionDate}`}>

                {index === monthEndedHr && (<hr className='shadowAnimation' style={{ marginTop: "50px", marginLeft:"-15px", marginBottom:"30px" }}></hr>)}

                {/* GASTOS DEL DÍA + BOTON DE UNIFICAR */}
                <div style={{ margin: "10px", display: "flex", paddingTop: "10px", justifyContent: "center", textAlign: "center", marginBottom: "10px" }}>
                  <p style={{ margin: "0px" }}>Gastos del {transactionDate.slice(6, 10).split("-").reverse().join("/")}: $
                    {groupedTransactions[transactionDate].total} </p>

                  {/* BOTON DE UNIFICAR CATEGORÍAS DUPLICADAS */}
                  {groupedTransactions[transactionDate].duplicatedCategories ?
                    (
                      <button style={{ padding: "10px", width: "85px", marginTop: "-11px", marginLeft: "10px", backgroundColor: unifyingButtonColor[`color_${index}`] }} onClick={() => { handleUnifySubmit(index) }}>Unificar</button>
                    ) : ""
                  }
                </div>

                {/* TRANSACTION BOX */}
                <div onClick={() => handleUnifyTransactions(transaction._id, transaction.category, transaction.createdAt, groupedTransactions[transactionDate]?.firstTransactionIndex)}>
                  <TransactionBox amount={transaction.amount} date={transaction.createdAt} category={transaction.category} type={transaction.type} notes={transaction.notes} transaction_id={transaction._id} />
                </div>
              </div>
            );
          } else {
            return (
              // {/* TRANSACTION BOX */}
              <div key={transaction._id}>
                <div onClick={() => handleUnifyTransactions(transaction._id, transaction.category, transaction.createdAt, groupedTransactions[transactionDate]?.firstTransactionIndex)}>
                  <TransactionBox amount={transaction.amount} date={transaction.createdAt} category={transaction.category} type={transaction.type} notes={transaction.notes} transaction_id={transaction._id} />
                </div>
              </div>
            );
          }
        })
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "30px" }}> {"<"} No hay transacciones {">"} </h1>
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