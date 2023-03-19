import React from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import AppStoreLogo from "../../../Assets/logo/appstore.png";
import PlayStoreLogo from "../../../Assets/logo/playstore.png";

const BenefitsModal = ({ isModalVisible, handleCancel, data = {} }) => {
  return (
    <Modal
      width={480}
      footer={false}
      closeIcon={<CloseOutlined />}
      className="benefits-modal"
      open={isModalVisible}
      onCancel={handleCancel}
      style={{
        borderRadius: "20px",
      }}
    >
      <div className="modal-header">
        <img src={data?.imageUrl} alt="membership" />
        <div>
          <h2>{data?.title} MEMBER EXCLUSIVE BENEFITS</h2>
          <p>{data?.description ?? "Cancel anytime. No strings attached."}</p>
        </div>
      </div>

      <div className="modal-body">
        {data?.benefits?.map((benefit) => {
          return (
            <div key={benefit?.id} className="benefit">
              <img src={benefit?.imageUrl} alt="benefit" />
              <span>{benefit?.title}</span>
            </div>
          );
        })}
      </div>

      <div className="modal-footer">
        <Link to="#">
          <img src={AppStoreLogo} alt="App Store" />
        </Link>
        <Link to="#">
          <img src={PlayStoreLogo} alt="Play Store" />
        </Link>
      </div>
    </Modal>
  );
};

export default BenefitsModal;
