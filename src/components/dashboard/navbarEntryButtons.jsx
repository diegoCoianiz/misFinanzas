import { useState } from 'react'
import EntryButton from './entryButton'

const DashboardEntryButtonsNavBar = ({ userId, events, toDoList, handleUpdateShowHistoryOf, showHistoryOf }) => {
    const newSize = 10

    const buttons = [
        {
            img: "https://cdn-icons-png.flaticon.com/512/784/784856.png",
            alt: "/events",
            width: 35,
            height: 42,
            text: "Eventos",
            link: false,
            documentsLength: events
        },
        {
            img: "https://cdn-icons-png.flaticon.com/512/4117/4117864.png",
            alt: "/transactions",
            width: 42,
            height: 45,
            text: "Dinero",
            link: false
        },
        // {
        //     img: "https://cdn-icons-png.flaticon.com/512/4870/4870198.png",
        //     alt: "/toDoList",
        //     width: 35,
        //     height: 42,
        //     text: "Lista",
        //     link: false,
        //     documentsLength: toDoList
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

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", margin: "0px 10px" }}>
                <EntryButton link={true} img={"https://cdn-icons-png.flaticon.com/512/3523/3523887.png"} alt={"/dashboard/entrys/new"} width={45 + newSize} height={45 + newSize} userId={userId} />
                <h6 style={{ marginTop: "0px" }}>Nuevo</h6>
            </div>

            {buttons.map((button, key) => (
                button.alt !== `/${showHistoryOf}` ? (
                    <div key={key} style={{ display: "flex", flexDirection: "column", margin: "0px 10px" }}>
                        <EntryButton
                            link={button.link}
                            img={button.img}
                            alt={button.alt}
                            width={button.width + newSize}
                            height={button.height + newSize}
                            userId={userId}
                            eventsLength={button.eventsLength}
                            handleUpdateShowHistoryOf={handleUpdateShowHistoryOf}
                        />
                        <h6 style={{ marginTop: "0px" }}>
                            {button.text} {button.documentsLength !== undefined ? `(${button.documentsLength.length})` : ""}
                        </h6>
                    </div>
                ) : null
            ))}

        </>
    )
}

export default DashboardEntryButtonsNavBar


