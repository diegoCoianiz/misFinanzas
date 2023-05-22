import { useState } from 'react'
import EntryButton from './entryButton'

const DashboardEntryButtonsNavBar = ({ userId, events, handleUpdateShowHistoryOf, showHistoryOf }) => {

    const newSize = 10
    return (
        <>
            {
                buttons.map((button, key) => {
                    if (button.alt !== `/${showHistoryOf}`) {
                        return (
                            <div key={key} style={{ display: "flex", flexDirection: "column", margin: "0px 10px" }}>
                                <EntryButton link={button.link} img={button.img} alt={button.alt} width={button.width + newSize} height={button.height + newSize} userId={userId} eventsLength={button.alt === "/events" ? events.length : undefined} handleUpdateShowHistoryOf={handleUpdateShowHistoryOf} />
                                <h6 style={{ marginTop: "0px" }}>{button.text} {button.alt === "/events" ? `(${events.length})` : undefined} </h6>
                            </div>
                        );
                    }
                    return null;
                })
            }
        </>
    )
}

export default DashboardEntryButtonsNavBar

const buttons = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/3523/3523887.png",
        alt: "/dashboard/entrys/new",
        width: 45,
        height: 45,
        text: "Nuevo",
        link: true
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/784/784856.png",
        alt: "/events",
        width: 35,
        height: 42,
        text: "Eventos",
        link: false
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/4117/4117864.png",
        alt: "/transactions",
        width: 42,
        height: 45,
        text: "Transacciones",
        link: false
    },
    // {
    //     img: "https://cdn-icons-png.flaticon.com/512/2858/2858286.png",
    //     alt: "calendario",
    //     width: 35,
    //     height: 42,
    //     text: "Calen"
    // },
    // {
    //     img: "https://cdn-icons-png.flaticon.com/512/1292/1292972.png",
    //     alt: "desafios",
    //     width: 40,
    //     height: 40,
    //     text: "Metas"
    // },
    // {
    //     img: "https://cdn-icons-png.flaticon.com/512/10479/10479318.png",
    //     alt: "compartidos",
    //     width: 40,
    //     height: 45,
    //     text: "Amigos"
    // }
];
