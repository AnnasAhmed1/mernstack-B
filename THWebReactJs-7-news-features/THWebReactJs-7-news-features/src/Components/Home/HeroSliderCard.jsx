import React from "react";

const HeroSliderCard = ({ data = {} }) => {
  return (
    <div
      className="hero-card-wrapper"
      style={{
        backgroundImage: `url('${data?.image}')`,
      }}
    >
      <div className="hero-card-container">
        <div className="card-content">
          <p className="card-category">{data?.category}</p>
          <h3 className="card-title">{data?.title}</h3>
          <p className="card-description">
            {data?.description.length > 50
              ? `${data?.description.slice(0, 50)}...`
              : data?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSliderCard;
