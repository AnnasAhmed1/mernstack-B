import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import instance from "./../../../Services/Axois";
import MembershipCards from "../Cards/MembershipCards";
import BgImage from "../../../Assets/images/bg-membership.jpg";
import AppWhiteLogo from "../../../Assets/logo/appwhite.png";
import PlayWhiteLogo from "../../../Assets/logo/playwhite.png";

const AvailableMemberships = () => {
  const [membershipData, setMembershipData] = useState([]);

  useEffect(() => {
    instance
      .get("/website/packages")
      .then((response) => {
        setMembershipData(response?.data?.data?.records);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  }, []);
  return (
    <div
      className="membership-wrapper"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className="container">
        <div className="membership-header">
          <h1>MEMBERSHIP</h1>
          <p>
            Membership Available Via The Huntr App. Cancel Anytime. No Strings
            Attached.
          </p>
        </div>

        {/* Cards */}
        <Row gutter={[16, 16]}>
          {membershipData?.map((card) => {
            return (
              <>
                <Col xs={24} sm={8} key={card?.id}>
                  <MembershipCards data={card} />
                </Col>
              </>
            );
          })}
        </Row>

        <div className="membership-footer">
          <p>
            {
              "The best of Dubai & the UAE in the palm of your hand, 24/7. Download the app to join us today."
            }
          </p>

          <div className="app-links">
            <Link to="#">
              <img src={AppWhiteLogo} alt="App Store" />
            </Link>
            <Link to="#">
              <img src={PlayWhiteLogo} alt="Play Store" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableMemberships;
