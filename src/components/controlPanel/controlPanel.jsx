import React from 'react'
import Carousel from '../basics/carousel'
import Stadistics from './stadistics'
import Reports from './reports'
import Calendar from '../basics/calendar'

const ControlPanel = ({transactions, groupedTransactions, userId, events}) => {

    return (
        <div >
            <h1 style={{ textAlign: "start", margin:"20px" }}>{"<"} Panel de control: {">"}</h1>
            <div className="dashboardCarousel">
                <Carousel timeCondition={false}>
                    <div>
                        <Stadistics chart={transactions} />

                    </div>
                    <div>
                        <Calendar groupedTransactions={groupedTransactions} userId={userId} events={events}/>
                    </div>
                    <div>
                        <Reports info={transactions}/>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default ControlPanel