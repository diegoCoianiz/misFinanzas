import React from 'react'
import Image from 'next/image'

const CarouselBox = ({ image, text, width = 150, height = 135, marginTop =" 0px" }) => {
    return (
        <div style={{ textAlign: "center", marginTop: marginTop }}>
            <Image src={image} width={width} height={height} alt={"img"} />
            <p style={{fontSize: "21px"}}>{text}</p>
        </div>
    )
}

export default CarouselBox