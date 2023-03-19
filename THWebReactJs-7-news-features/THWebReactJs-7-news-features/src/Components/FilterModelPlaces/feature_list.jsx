import { useState } from "react";
import "./features.scss";

const FeaturesList = ({ listData, activeIndex, selectedFilters }) => {
  console.log(listData, "ld");
  console.log(activeIndex, "activeIndex");
  const [checked, setChecked] = useState(false);
  function handleChange(check, value) {
    if (check) {
      selectedFilters.push({ activeIndex: activeIndex, item: value });
    } else {
      selectedFilters.map((v, i) => {
        if (v.activeIndex == activeIndex && v.item == value) {
          selectedFilters.splice(i, 1);
        }
      });
    }
    console.log(selectedFilters);
  }
  return (
    <div className="features-list-container">
      {listData?.map((v, i) => {
        // setChecked(!checked);
        return (
          <div key={i}>
            <p style={{ color: v?.comingSoon ? "grey" : "" }}>{v?.title}</p>
            <input
              type="checkbox"
              id="demoCheckbox"
              name={v?.title}
              value={v?.title}
              defaultChecked={false}
              disabled={v?.comingSoon ? true : false}
              onChange={(e) => {
                handleChange(e.target.checked, e.target.value);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturesList;
