import React from "react";

const PicksCard = ({ data = {} }) => {
  return (
    <>
      <div className="picks-wrapper">
        <div className="picks-content">
          <img src={data?.image} alt="Picks" />

          <div className="picks-text">
            <h6>{data?.title}</h6>
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PicksCard;
