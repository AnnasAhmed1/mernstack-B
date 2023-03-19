import React from "react";
import Layout from "../../Layout/Index";
import AvailableMemberships from "../../Components/Common/Memberships/AvailableMemberships";
import StaticBanner from "../../Components/Common/StaticBanner";
import StaticBannerImage from "../../Assets/images/app-banner.png";
import { Button } from "antd";

const Index = () => {
  const staticBannerData = {
    title: "THE ONLY GUIDE YOU NEED. WITH A SPRINKLING OF EXCLUSIVE PERKS.",
    description: "The best of Dubai & the UAE in the palm of your hand.",
    image: StaticBannerImage,
  };

  return (
    <Layout>
      <AvailableMemberships />

      {/* Static Banner */}
      <StaticBanner data={staticBannerData} />

      {/* Best of UAE */}
      <div className="best-section-wrapper">
        <div className="container">
          <div className="section-content">
            <img src={StaticBannerImage} alt="Best Section" />

            <div className="text-content">
              <h2>{"Give someone the keys to Dubai & the UAE"}</h2>
              <p>
                Give The Gift Of Insider Knowledge And Unlocking The Best Of
                Dubai & The Uae. What Could Be Better? The Huntr Membership Gift
                Cards Are Sent Securely Via Email And Can Be Personalised With
                Your Special Message.
                <br />
                <br />
                The Gift Card Information Send Via Email.
              </p>
              <Button className="primary-button w-190">COMING SOON</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
