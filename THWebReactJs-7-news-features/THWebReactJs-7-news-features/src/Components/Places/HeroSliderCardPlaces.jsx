import React from "react";

const HeroSliderCardPlaces = ({ data = {},height='auto'}) => {
  return (
    <div
      className="hero-card-wrapper"
      style={{
        // backgroundImage: `url('${data}')`,
        // backgroundSize: 'cover',
        // backgroundRepeat: "no-repeat",
        // backgroundPosition:' center center',
        height:height
      }}
    >
      {/* <div className="hero-card-container" style={{background:"transparent", width:'70%',
        height:"100%",}}></div> */}
        <img src={data} alt="Image" style={{height: '100%', width:' 100%'}} />
    </div>
  );
};

export default HeroSliderCardPlaces;
