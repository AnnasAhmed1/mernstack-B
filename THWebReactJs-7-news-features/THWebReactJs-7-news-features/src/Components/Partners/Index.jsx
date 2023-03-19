import React, { useState } from "react";
import { CoffeeOutlined, MinusCircleFilled } from "@ant-design/icons";

import "./partner.scss";
const PartnersCofeeCardAlphaBet = () => {
  const [alphabets, setAlphabets] = useState([
    { data: "A", active: true },
    { data: "B", active: false },
    { data: "C", active: false },
    { data: "D", active: false },
    { data: "E", active: false },
    { data: "F", active: false },
    { data: "G", active: false },
    { data: "H", active: false },
    { data: "I", active: false },
    { data: "J", active: false },
    { data: "K", active: false },
    { data: "L", active: false },
    { data: "M", active: false },
    { data: "N", active: false },
    { data: "O", active: false },
    { data: "P", active: false },
    { data: "Q", active: false },
    { data: "R", active: false },
    { data: "S", active: false },
    { data: "T", active: false },
    { data: "U", active: false },
    { data: "V", active: false },
    { data: "W", active: false },
    { data: "X", active: false },
    { data: "Y", active: false },
    { data: "Z", active: false },
  ]);

  const compData = [
    "A Emery",
    "A Emery",
    "A Emery",
    "A Emery",
    "APL Athletic Propulsion",
    "APL Athletic Propulsion",
    "APL Athletic Propulsion",
    "A Emery",
    "A Emery",
    "APL Athletic Propulsion",
    "A Emery",
    "A Emery",
    "A Emery",
    "A Emery",
    "A Emery",
    "A Emery",
  ];

  const toggleFunc = (index) => {
    alphabets.map((v, i) => {
      alphabets[i].active = false;
    });
    alphabets[index].active = true;
    setAlphabets([...alphabets]);
  };

  return (
    <main className="partners-main">
      <section className="partners-comp-head">
        {alphabets?.map((v, i) => {
          return (
            <>
              <p
                className={v.active ? "active" : ""}
                onClick={() => {
                  toggleFunc(i);
                }}
              >
                {v.data}
              </p>
            </>
          );
        })}
      </section>
      <section className="partners-comp">
        <h1>A</h1>
        <div>
          {compData?.map((v, i) => {
            return (
              <p key={i}>
                <span className="dotIcon"></span>
                {/* <MinusCircleFilled /> */}
                {v}
                <CoffeeOutlined />
                <CoffeeOutlined />
              </p>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default PartnersCofeeCardAlphaBet;
