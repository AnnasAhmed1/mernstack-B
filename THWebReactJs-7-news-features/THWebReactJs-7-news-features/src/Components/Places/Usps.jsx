import React from "react";
import { CheckOutlined } from "@ant-design/icons";

const Usps = ({data = [
  "Licensed Bar",
  "Special Ocassions",
  "Birthdays",
  "Feeling Fancy",
  "Italian",
  "Views",
  "Outside Seating",
]}) => {
  return (
    <div className="Usps-container" >
      <h1>USPs</h1>
      <section style={{height:data?.length>12?'130px':'100px'}}>
        {data.map((v, i) => {
          return (
            <p key={i}>
              <CheckOutlined />
              {v}
            </p>
          );
        })}
      </section>
    </div>
  );
};

export default Usps;
