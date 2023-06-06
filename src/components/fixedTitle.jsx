import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FixedTitle = () => {
    return (
        <Link href={'/'}>
            <div className='shadowAnimation' style={styles.fixed}>
                <Image src="https://cdn-icons-png.flaticon.com/512/1060/1060678.png" width={50} height={50} alt={'logo'} />
                <h1 style={{ fontSize: "30px", marginLeft: "15px" }}>digitalOrganizer</h1>
            </div>
        </Link>
    )
}

export default FixedTitle

const styles = {
    fixed: {
        display: "flex",
        color: "#720000",
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        zIndex: 9999,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 3px 5px #ff0015"
    }
}
