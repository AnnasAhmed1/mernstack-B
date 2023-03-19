import React from 'react'
import img from "../../Assets/images/news-banner.jpg"

function FixedBg({ children, image=img,data,height='600px'}) {
    return (
        <div className="carouselWrapper"
            style={{
                backgroundImage: `url('${image}')`,
                height:height
            }}
        >
            {children}
        </div>
    )
}

export default FixedBg;