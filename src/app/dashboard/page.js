'use client'
import { useState, useEffect } from 'react';
import DashboardEntryButtonsNavBar from "@/components/dashboard/navbarEntryButtons";
import TransactionsHistoryBox from "@/components/dashboard/transactionsHistoryBox";
import ControlPanel from "@/components/controlPanel/controlPanel";
import EventsHistoryBox from '@/components/dashboard/eventsHistoryBox';

export default function dashboard({ searchParams }) {
  // const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [events,  setEvents] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [showHistoryOf, setShowHistoryOf] = useState("transactions");

  const handleUpdateShowHistoryOf = () => setShowHistoryOf(showHistoryOf === "transactions" ? "events" : "transactions");

  useEffect(() => {
    async function fetchData() {
      const transactions = await fetch(`/api/transactions?id=${searchParams.id}`);
      const events = await fetch(`/api/events?id=${searchParams.id}`);
      const awaitTransactions = await transactions.json();
      const awaitEvents = await events.json();
      // setUser(awaitUser.user);
      if (awaitTransactions.transactions !== undefined) setTransactions(awaitTransactions.transactions);
      if(awaitEvents.events !== undefined) setEvents(awaitEvents.events);
    }
    fetchData();
  }, []);


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
  
          // setUnifyingButtonColor(prevState => ({
          //   ...prevState,
          //   [`color_${index}`]: "#88a17a"
          // }));
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
      <div className='indexBody dashboardBody' style={{ marginTop: "15px" }}>
        <div className='indexLeftSection' style={{ padding: "10px", paddingTop: "0px" }}>
          <div className="dashboardBodyNavBar">
            <DashboardEntryButtonsNavBar userId={searchParams.id} events={events} handleUpdateShowHistoryOf={handleUpdateShowHistoryOf} showHistoryOf={showHistoryOf} />
          </div>
          {showHistoryOf === "transactions" ?
          <TransactionsHistoryBox transactions={transactions} groupedTransactions={groupedTransactions} />
          :
          <EventsHistoryBox events={events}/>
            
        }
        </div>
        <div className='indexRightSection dashboardRightSection' style={{ marginTop: "-15px" }}>
          <ControlPanel transactions={transactions} groupedTransactions={groupedTransactions} userId={searchParams.id} events={events}/>
        </div>
      </div >
    </>
  )
}