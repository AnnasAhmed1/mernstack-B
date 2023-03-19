import React from "react";
import MeetTheTeam from "../../Components/About/MeetTheTeam";
import Layout from "../../Layout/Index";
import AvailableMemberships from "../../Components/Common/Memberships/AvailableMemberships";
import EnquiriesBottomComp from "../../Components/EnquiriesBottomComp/Index";
import EditorPolicy from "../../Components/EditorsPolicy/EditorPolicy";
import FixedBg from "../../Components/Caurosel/FixedBg";
import StaticBanner from "../../Components/Common/StaticBanner";
import StaticBannerImage from "../../Assets/images/app-banner.png";


const Index = () => {
  const staticBannerData = {
    title: "THE ONLY GUIDE YOU NEED. WITH A SPRINKLING OF EXCLUSIVE PERKS.",
    description: "The best of Dubai & the UAE in the palm of your hand.",
    image: StaticBannerImage,
  };
  return (
    <Layout>
      <FixedBg height={'450px'}>

      </FixedBg>
      <div class="aboutUs">

        <p><span class="largeLetter">W</span>elcome to The HUNTR – curators of good taste since 2015. We are passionate about sharing the best things in Dubai and the UAE. Proud Golden Visa Holders from the Government of Dubai Media Office, The HUNTR was created to be the only guide to Dubai and the UAE you’ll ever need. We only share the good stuff and ignore the rest.</p>
        <p>In 2022 The HUNTR launched the first of its kind app in the region – offering the city’s curious foodies, adventure seekers and tastemakers high-tech search tools, exclusive perks, a city-wide specialty coffee loyalty card and more. </p>


      </div>
      {/* Meet the team */}
      <div className="team-wrapper">
        <div className="container">
          <h1>MEET THE TEAM</h1>
          <MeetTheTeam />
        </div>
      </div>
      <StaticBanner data={staticBannerData} />


      {/* Memberships */}
      <AvailableMemberships />

      <EditorPolicy />

      <EnquiriesBottomComp />
    </Layout>
  );
};

export default Index;
