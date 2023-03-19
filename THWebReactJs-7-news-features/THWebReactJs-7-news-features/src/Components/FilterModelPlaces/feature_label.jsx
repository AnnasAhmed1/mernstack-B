import { act } from "@testing-library/react";
import { useState } from "react";
import "./features.scss";
import FeaturesList from "./feature_list";

const FeaturesLabel = ({
  labelsData,
  listData,
  toggleFunc,
  activeIndex,
  setActiveIndex,
  selectedFilters,
}) => {
  console.log(Object.values(listData)[activeIndex], "listDatalistData");
  return (
    <>
      <div className="features-label-container">
        {labelsData?.map((v, i) => {
          return (
            <p
              key={i}
              className={i == activeIndex ? "active-label" : ""}
              onClick={() => {
                toggleFunc(i);
                setActiveIndex(i);
              }}
            >
              {v}
            </p>
          );
        })}
      </div>
      <FeaturesList
        listData={listData ? Object.values(listData)[activeIndex] : "null"}
        activeIndex={activeIndex}
        selectedFilters={selectedFilters}
      />
    </>
  );
};

export default FeaturesLabel;
