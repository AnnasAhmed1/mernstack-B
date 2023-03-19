import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import AppStoreImage from "../../Assets/logo/footappstore.png";
import PlayStoreImage from "../../Assets/logo/footplaystore.png";

// This component is a common component use for static banners. In the system,
// we have two type of static banners one which have image at left and
// the text is right and the second which have text on left and image on right.
// leftToRight props is true means that text is on left and image is on right and
// false means that image is on left and the text is on right.
const StaticBanner = ({ data = {}, leftToRight = false }) => {
  return (
    <>
      <div className="adverting-wrapper">
        <div className="container">
          <div
            className={clsx(
              "adverting-content-row",
              leftToRight && "adverting-content-row-reverse"
            )}
          >
            <img src={data?.image} alt="adverting" />

            <div className="text-content">
              <h1>{data?.title}</h1>
              <p>{data?.description}</p>

              <div className="app-links">
                <Link to="#">
                  <img src={AppStoreImage} alt="Apple Store" />
                </Link>
                <Link to="#">
                  <img src={PlayStoreImage} alt="Play Store" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticBanner;
