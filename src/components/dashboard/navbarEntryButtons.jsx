import React from 'react'
import EntryButton from './entryButton'

const DashboardEntryButtonsNavBar = ({ userId }) => {

    const newSize = 10

    return (
        <>
            {
                buttons.map((button, key) => {
                    return (
                        <div key={key} style={{ display: "flex", flexDirection: "column", margin: "0px 10px",  }}>
                            <EntryButton img={button.img} alt={button.alt} width={button.width + newSize} height={button.height + newSize} userId={userId} />
                            <h6 style={{ marginTop: "0px" }}>{button.text}</h6>
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default DashboardEntryButtonsNavBar

const buttons = [
    {
        img: "https://cdn-icons-png.flaticon.com/512/1004/1004759.png",
        alt: "new",
        width: 45,
        height: 45,
        text: "Nuevo"
    },
    {
        img: "https://cdn-icons-png.flaticon.com/512/784/784856.png",
        alt: "events",
        width: 35,
        height: 42,
        text: "Eventos"
    },
    // {
    //     img: "https://cdn-icons-png.flaticon.com/512/9265/9265845.png",
    //     alt: "configuración",
    //     width: 42,
    //     height: 45,
    //     text: "Config"
    // },
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
