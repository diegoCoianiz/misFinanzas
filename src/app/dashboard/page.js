'use client'
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react';
import DashboardEntryButtonsNavBar from "@/components/dashboard/navbarEntryButtons";
import TransactionsHistoryBox from "@/components/dashboard/transactionsHistoryBox";
import ControlPanel from "@/components/controlPanel/controlPanel";

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
        <div className='indexRightSection dashboardRightSection' style={{ marginTop: "-15px" }}>
          <ControlPanel transactions={transactions}/>
        </div>
      </div >
    </>
  )
}