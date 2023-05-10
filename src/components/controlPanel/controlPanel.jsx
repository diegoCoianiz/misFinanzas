import React from 'react'
import Carousel from '../basics/carousel'
import Stadistics from './stadistics'
import Reports from './reports'
import CalendarChart from './calendarChart'



const ControlPanel = ({transactions}) => {
    return (
        <div>
            <h1 style={{ textAlign: "start" }}>{"<"} Panel de control: {">"}</h1>
            <div className="dashboardCarousel">
                <Carousel timeCondition={false}>
                    <div>
                        <Stadistics chart={transactions} />

                    </div>
                    <div>
                        <CalendarChart info={transactions} />
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