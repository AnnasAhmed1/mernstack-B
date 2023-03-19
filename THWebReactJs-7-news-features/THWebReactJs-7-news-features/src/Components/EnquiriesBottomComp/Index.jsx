import React from "react";
import "./EnquiriesBottomComp.scss";

const cardData = [
  { img: "hand shake", text: "advertising & bussiness enquiries" },
  { img: "shop", text: "editorial enquiries" },
  { img: "email", text: "shop enquiries" },
  { img: "support", text: "technical support" },
];

const EnquiriesCard = ({ cardData }) => {
  return (
    <div className="enquiries-card">
      <img src={require(`./assets/${cardData.img}.png`)} alt="inquiries" />
      <p>{cardData.text}</p>
    </div>
  );
};

const EnquiriesBottomComp = () => {
  return (
    <section className="enquiries-container">
      {cardData?.map((v, i) => {
        return <EnquiriesCard cardData={v} />;
      })}
    </section>
  );
};

export default EnquiriesBottomComp;
