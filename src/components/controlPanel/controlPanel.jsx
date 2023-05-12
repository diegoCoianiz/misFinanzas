import React from 'react'
import Carousel from '../basics/carousel'
import Stadistics from './stadistics'
import Reports from './reports'
import Calendar from '../basics/calendar'
import { useState, useEffect } from 'react'


const ControlPanel = ({transactions, groupedTransactions}) => {

    return (
        <div>
            <h1 style={{ textAlign: "start" }}>{"<"} Panel de control: {">"}</h1>
            <div className="dashboardCarousel">
                <Carousel timeCondition={false}>
                    <div>
                        <Stadistics chart={transactions} />

                    </div>
                    <div>
                        <Calendar info={groupedTransactions} />
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