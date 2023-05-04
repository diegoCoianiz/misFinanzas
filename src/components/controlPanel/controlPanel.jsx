import React from 'react'
import Carousel from '../carousel'
import Stadistics from './stadistics'


const ControlPanel = ({transactions}) => {
    return (
        <div>
            <h1 style={{ textAlign: "start" }}>{"<"} Panel de control: {">"}</h1>
            <div className="dashboardCarousel">
                <Carousel timeCondition={false}>
                    <div>
                        <Stadistics chart={transactions} />

                    </div>
                    <p>
                        ""
                    </p>
                </Carousel>
            </div>
        </div>
    )
}

export default ControlPanel