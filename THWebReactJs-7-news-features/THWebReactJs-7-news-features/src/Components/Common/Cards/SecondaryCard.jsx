import React from "react";
import { Link } from "react-router-dom";

const SecondaryCard = ({ data, routeTitle,summary=false }) => {
  return (
    <>
      <Link to={`/${routeTitle}/${data?.slug || data?.id}`} state={data}>
        <div
          className="secondary-card-wrapper"
          style={{
            backgroundImage: `url(${data?.featureImageUrl})`,
          }}
          to={`${data?.id}`}
        >
          <div className="card-container">
            {/* places */}
            <div className="perks-container">
              {data?.cardUsps?.map((perk) => {
                return <p>{perk}</p>;
              })}
            </div>

            {/* categories */}
            <div className="card-content">
              <p className="card-category">{data?.cardCategory}</p>
              <h5 className="card-title">{data?.title}</h5>
              <p className="card-description">
                {data?.excerpt?.length > 50
                  ? `${data?.excerpt?.slice(0, 50)}...`
                  : data?.excerpt}
              </p>
            </div>
          </div>
        </div>
        <p className="place-summary">
          {!summary?'':summary}
        </p>
      </Link>
    </>
  );
};

export default SecondaryCard;
