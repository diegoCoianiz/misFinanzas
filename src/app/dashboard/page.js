'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';
import DashboardEntryButtonsNavBar from "@/components/navbarEntryButtons";
import TransactionsHistoryBox from "@/components/transactionsHistoryBox";
import PieChart from "@/components/pieChart";
import Carousel from "@/components/carousel";

export default function dashboard({ searchParams }) {
  const router = useRouter();
  // const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/transactions?id=${searchParams.id}`);
      const awaitTransactions = await response.json();
      // setUser(awaitUser.user);
      if (awaitTransactions.transactions !== undefined) {
        setTransactions(awaitTransactions.transactions);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='indexBody dashboardBody' style={{ marginTop: "15px" }}>
        <div className='indexLeftSection' style={{ padding: "10px", paddingTop: "0px" }}>
          <div className="dashboardBodyNavBar">
            <DashboardEntryButtonsNavBar userId={searchParams.id} />
          </div>


          <TransactionsHistoryBox transactions={transactions}/>

        </div>
        <div className='indexRightSection' style={{ marginTop: "-25px" }}>
          <h1 style={{ textAlign: "start" }}>{"<"} Panel de control: {">"}</h1>
          <div className="dashboardCarousel">
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
      </div >
    </>
  )
}