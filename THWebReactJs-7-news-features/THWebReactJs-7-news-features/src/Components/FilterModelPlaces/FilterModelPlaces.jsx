import React, { useState } from "react";
import "./features.scss";
import FeatureLabel from "./feature_label.jsx";

const FilterModelPlaces = ({ labels, items, selectedFilters }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFunc = (FilterModelPlaces) => {
    console.log(FilterModelPlaces, "aaaa");
    setActiveIndex(FilterModelPlaces);
    // console.log(items);
  };

  return (
    <div className="features-main">
      {/* <h1>Filters</h1> */}
      <div className="wrapperFeaturePlaces">
        <FeatureLabel
          labelsData={labels}
          listData={items}
          toggleFunc={toggleFunc}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          selectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
};

export default FilterModelPlaces;
