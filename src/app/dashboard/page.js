'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';
import DashboardEntryButtonsNavBar from "@/components/navbarEntryButtons";
import TransactionBox from "@/components/transactionBox";
import PieChart from "@/components/pieChart";
import Carousel from "@/components/carousel";

export default function dashboard({ searchParams }) {
  const router = useRouter();
  // const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [historialTransactionsPage, setHistorialTransactionsPage] = useState(0);
  const [transactionsPageView, setTransactionsPageView] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/transactions?id=${searchParams.id}`);
      const awaitTransactions = await response.json();
      // setUser(awaitUser.user);
      if (awaitTransactions.transactions !== undefined) {
        setTransactions(awaitTransactions.transactions);
        setHistorialTransactionsPage(Math.floor((awaitTransactions.transactions.length - 1) / 10))
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='indexBody dashboardBody' style={{ marginTop: "15px" }}>
        <div className='indexLeftSection' style={{ padding: "10px", paddingTop: "0px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "-25px" }}>
            <DashboardEntryButtonsNavBar userId={searchParams.id} />
          </div>

          <h1 style={{ textAlign: "start" }}>{"<"} Historial{historialTransactionsPage > 0 ? ` . Página ${transactionsPageView + 1}` : ""} {">"}</h1>
          {transactions.length > 0 ? (
            transactions
              .slice(transactionsPageView * 10, (transactionsPageView + 1) * 10)
              .map((transaction, num) => {
                return (
                  <div key={transaction._id}>
                    <TransactionBox amount={transaction.amount} date={transaction.createdAt} category={transaction.category} type={transaction.type} notes={transaction.notes} transaction_id={transaction._id} />
                  </div>
                );
              })
          ) : (
            <h1 style={{ textAlign: "center" }}> {"<"} No hay transacciones {">"} </h1>
          )}
          <div style={{ display: "flex", padding: "0px", alignItems: "center", justifyContent: "center", marginTop: "5px" }}>
            {
              historialTransactionsPage > 0 && transactionsPageView > 0 &&
              <div>
                <div style={{ order: "2", marginLeft: "-10px", marginRight: "1px" }}>
                  <button style={styles.nextBack_Buttons} onClick={() => { setTransactionsPageView(transactionsPageView - 1) }}>Anterior ({transactionsPageView}) </button>
                </div>
              </div>
            }
            {
              historialTransactionsPage > 0 && historialTransactionsPage !== transactionsPageView &&
              <div>
                <div style={{ order: "1" }}>
                  <button style={styles.nextBack_Buttons} onClick={() => { setTransactionsPageView(transactionsPageView + 1) }}>Siguiente ({transactionsPageView + 2}) </button>
                </div>
              </div>
            }
          </div>
        </div>  
        <div className='indexRightSection'>
          <h1 style={{ textAlign: "start" }}>{"<"} Panel de control: {">"}</h1>
          <Carousel timeCondition={false}>
            <div>
              <PieChart chart={transactions} />
            </div>
            <p>
              ""
            </p>
          </Carousel>
        </div>
      </div>
    </>
  )
}

const styles = {
  nextBack_Buttons: {
    cursor: "pointer",
    padding: "0px",
    width: "140px",
  }
}