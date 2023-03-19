import React from "react";
import { Link } from "react-router-dom";
import TextBGImage from "../../../Assets/images/news-bg.png";

const NewsFeaturesCard = ({ data, routeTitle }) => {
  return (
    <>
      <Link to={`/${routeTitle}/${data?.id}`}>
        <div
          className="news-features-card-wrapper"
          style={{
            backgroundImage: `url(${data?.featureArticle?.image})`,
          }}
        >
          <div
            className="card-container"
            style={{
              backgroundImage: `url(${TextBGImage})`,
            }}
          >
            {/* categories */}
            <div className="card-content">
              {/* categories */}
              <div className="categories-container">
                <p className="card-category">{data?.categoryTitle}</p>
                {/* TODO: commenting this right now, don't remove this code. */}
                {/* {data?.categories?.map((category, i) => {
                return (
                  <p key={i} className="card-category">
                    {category}
                    {data?.categories.length !== i + 1 && (
                      <span className="dot"></span>
                    )}
                  </p>
                );
              })} */}
              </div>

              <Link to="#">
                <h5 className="card-title">{data?.title}</h5>
              </Link>
              {/* TODO: commenting this right now, don't remove this code. */}
              {/* <p className="card-description">
              {data?.description.length > 50
                ? `${data?.description.slice(0, 50)}...`
                : data?.description}
            </p> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NewsFeaturesCard;
