import React from 'react'
import TransactionBox from "@/components/dashboard/transactionBox";
import { useState, useEffect } from 'react';

const TransactionsHistoryBox = ({ transactions }) => {
  const [transactionsPageView, setTransactionsPageView] = useState(0);
  const totalOfPages = Math.floor((transactions.length - 1) / 10);
  const [unifyingButtonColor, setUnifyingButtonColor] = useState({});
  const [allowedIds, setAllowedIds] = useState(["", "", []]);
  const [allowedUnifyingButton, setAllowedUnifyingButton] = useState();
  const [groupedTransactions, setGroupedTransactions] = useState({});

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

  useEffect(() => {
    const newGroupedTransactions = {};
    transactions.forEach((transaction, index) => {
      const date = transaction.createdAt.slice(0, 10);

      if (!newGroupedTransactions[date]) {
        newGroupedTransactions[date] = {
          total: 0,
          firstTransactionIndex: index,
          categoryArray: [],
          duplicatedCategories: false,
          transactionIDstoUnify: [],
          categoriesToUnify: [],
        };

        setUnifyingButtonColor(prevState => ({
          ...prevState,
          [`color_${index}`]: "#88a17a"
        }));
      }
      newGroupedTransactions[date].transactionIDstoUnify.push(transaction._id);
      if (transaction.type === "egreso") {
        newGroupedTransactions[date].total += transaction.amount;
      }

      const category = transaction.category;
      newGroupedTransactions[date].categoryArray.push(category);

      if (newGroupedTransactions[date].categoryArray.filter((c) => c === category).length > 1) {
        newGroupedTransactions[date].duplicatedCategories = true;
        newGroupedTransactions[date].categoriesToUnify.push(category);
      }
      setGroupedTransactions(newGroupedTransactions);
    });
  }, [transactions]);

  return (
    <>
      <h1 style={{ textAlign: "start", marginBottom: "10px" }}>{"<"} Historial{totalOfPages > 0 ? ` . Página ${transactionsPageView + 1}` : ""} {">"}</h1>
      {transactions.length > 0 ? (
        transactions.slice(transactionsPageView * 10, (transactionsPageView + 1) * 10).map((transaction, num) => {
          const index = num + transactionsPageView * 10
          const transactionDate = transaction.createdAt.slice(0, 10);
          const isLastTransactionForDay =
          groupedTransactions[transactionDate]?.firstTransactionIndex === index;
          if (isLastTransactionForDay) {

            return (
              <div key={`total-${transactionDate}`}>
                {/* GASTOS DEL DÍA + BOTON DE UNIFICAR */}
                <div style={{ margin: "10px", display: "flex", paddingTop: "10px", justifyContent: "center", textAlign: "center", marginBottom: "10px" }}>
                  <p style={{ margin: "0px" }}>Gastos del {transactionDate.slice(6, 10).split("-").reverse().join("/")}: $
                  {groupedTransactions[transactionDate].total} </p>
                  
                  {groupedTransactions[transactionDate].duplicatedCategories ?
                    (
                      <button style={{ padding: "10px", width: "85px", marginTop: "-11px", marginLeft: "10px", backgroundColor: unifyingButtonColor[`color_${index}`] }} onClick={() => { handleUnifySubmit(index) }}>Unificar</button>
                    ) : ""
                  }
                </div>

                <div onClick={() => handleUnifyTransactions(transaction._id, transaction.category, transaction.createdAt, groupedTransactions[transactionDate]?.firstTransactionIndex)}>
                  <TransactionBox amount={transaction.amount} date={transaction.createdAt} category={transaction.category} type={transaction.type} notes={transaction.notes} transaction_id={transaction._id} />
                </div>
              </div>
            );
          } else {
            return (
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