import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const EntryButton = ({ img, alt, width = 45, height = 52, userId }) => {
    return (
        <>
            <h6 style={styles.button}>
                <Link href={`/dashboard/entrys/${alt}?id=${userId}`}>
                    <Image src={img} alt={alt} width={width} height={height}/>
                </Link>
            </h6>
        </>
    )
}

export default EntryButton

const styles = {
    button: {
        width: '55px',
        height: '55px',
        backgroundColor: '#03AB33',
        border: '2px inset white',
        borderRadius: '50%',
        fontSize: '30px',
        margin: "0px 4px",
    }
}