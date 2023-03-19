import React, { useState } from "react";
import { Button } from "antd";
import BenefitsModal from "./../Memberships/BenefitsModal";

const MembershipCards = ({ data = {} }) => {
  // states
  const [isModalVisible, setIsModalVisible] = useState(false);

  // methods
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <div className="membership-card-wrapper">
      <div className="card-container">
        <img src={data?.imageUrl} alt="membership" />

        <h3>{data?.title}</h3>
        <p>{data?.tagline}</p>

        <h1>{data?.price}</h1>
        <p>{data?.time ?? "Monthly"}</p>

        <p className="card-description">
          {data?.description ?? "Cancel anytime. No strings attached."}
        </p>

        <Button onClick={toggleModal} className="primary-button w-280 mt-40">
          Explore Benefits
        </Button>

        {isModalVisible && (
          <BenefitsModal
            isModalVisible={isModalVisible}
            handleCancel={toggleModal}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default MembershipCards;
