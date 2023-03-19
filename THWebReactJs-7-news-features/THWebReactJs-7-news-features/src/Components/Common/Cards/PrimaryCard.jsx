import React from "react";
import { Link } from "react-router-dom";

const    PrimaryCard = ({ data, routeTitle }) => {
  return (
    <>
      <Link to={`/${routeTitle}/${data?.id}`} state={data}>
        <div
          className="primary-card-wrapper"
          style={{
            backgroundImage: `url(${data?.featureImageUrl})`,
          }}
        >
          <div className="card-container">
            {/* places */}
            <div className="places-count">
              <p>{data?.placesCount} Places</p>
            </div>

            {/* categories */}
            <div className="card-content">
              <p className="card-category">
                {data?.categoryTitle}
                {/* TODO: Dont remove this code. */}
                {/* {data?.categories?.map((category, i) => {
                return (
                  <>
                    {category}
                    {data?.categories.length !== i + 1 && (
                      <span className="dot" key={i}></span>
                    )}
                  </>
                );
              })} */}
              </p>
              <h5 className="card-title">{data?.title}</h5>
              <p className="card-description">
                {data?.description.length > 50
                  ? `${data?.description.slice(0, 50)}...`
                  : data?.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PrimaryCard;
