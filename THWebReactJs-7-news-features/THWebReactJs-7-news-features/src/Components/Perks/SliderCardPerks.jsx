import React from "react";
import { CoffeeOutlined } from "@ant-design/icons";
import "./perks.scss";
import img from "../../Assets/images/place1.png"
const SliderCardPerks = ({ data, icon = false, placesCount = false, newAdditon = false }) => {
  return (
    <div className="perk-card slick slick-center slick-list">
      <img
        style={{
          width: "100%",
          height: "200px",
        }}
        src={data?.featureImageUrl || img}
      />
      <div>
        <p>{data?.title}</p>
        {/* <p>{data}</p> */}
        <p>
          {
            placesCount?data?.description:newAdditon ? data?.cardCategory : (
              data?.cardCategory 
            )
          }
          {icon ? <CoffeeOutlined style={{ fontSize: '20px', color: '#000' }} /> : null}
        </p>
        {placesCount ? <p>{data.placesCount} Places</p> : null}
      </div>
    </div>
  );
};

export default SliderCardPerks;
