import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Index";
import StaticBanner from "../../Components/Common/StaticBanner";
import StaticBannerImage from "../../Assets/images/app-banner.png";
import { Button } from "antd";
import FixedBg from "../../Components/Caurosel/FixedBg";
import SlickSliderPerks from "../../Components/Perks/SlickSliderPerks";
import SliderCardPerks from "../../Components/Perks/SliderCardPerks";
import "../../Components/Perks/perks.scss";
import PartnersCofeeCardAlphaBet from "../../Components/Partners/Index";
import instance from "../../Services/Axois";

const Index = () => {
  const staticBannerData = {
    title: "THE ONLY GUIDE YOU NEED. WITH THE ONLY MULTI-CAFE SPECIALTY COFFEE LOYALTY CARD IN THE WORLD.",
    description: "The best of Dubai & the UAE in the palm of your hand.",
    image: StaticBannerImage,
  };
  const staticBannerData2 = {
    title: "ONLY FOR HUNTR APP MEMBERS",
    description: "The region’s first multi-concept specialty coffee loyalty card. HUNTR Members can collect stamps and redeem coffee at the best places in town. Get your membership & download The HUNTR App to join the fun….",
    image: StaticBannerImage,
  };
  const [data, setData] = useState([
    {
      p1: "Buy 1 Get 1 Free deals",
      p2: "At KOYO, Cafe No 57, Haus & more…",
      p3: "26 PLACES",
    },
    {
      p1: "Buy 1 Get 1 Free deals",
      p2: "At KOYO, Cafe No 57, Haus & more…",
      p3: "26 PLACES",
    },
    {
      p1: "Buy 1 Get 1 Free deals",
      p2: "At KOYO, Cafe No 57, Haus & more…",
      p3: "26 PLACES",
    },
    {
      p1: "Buy 1 Get 1 Free deals",
      p2: "At KOYO, Cafe No 57, Haus & more…",
      p3: "26 PLACES",
    },
    {
      p1: "Buy 1 Get 1 Free deals",
      p2: "At KOYO, Cafe No 57, Haus & more…",
      p3: "26 PLACES",
    },
    {
      p1: "Buy 1 Get 1 Free deals",
      p2: "At KOYO, Cafe No 57, Haus & more…",
      p3: "26 PLACES",
    },
  ]);
  const [data2, setData2] = useState([
    {
      p1: "Buy 1 Get 1 Free Day Passes at Caesars Palace",
      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Buy 1 Get 1 Free Day Passes at Caesars Palace",
      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Buy 1 Get 1 Free Day Passes at Caesars Palace",
      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Buy 1 Get 1 Free Day Passes at Caesars Palace",
      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Buy 1 Get 1 Free Day Passes at Caesars Palace",
      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Buy 1 Get 1 Free Day Passes at Caesars Palace",
      p2: "CAFE IN DUBAI",
    },
  ]);
  const [data3, setData3] = useState([
    {
      p1: "Coffee Shop Title",

      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Coffee Shop Title",

      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Coffee Shop Title",

      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Coffee Shop Title",

      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Coffee Shop Title",

      p2: "CAFE IN DUBAI",
    },
    {
      p1: "Coffee Shop Title",

      p2: "CAFE IN DUBAI",
    },
  ]);
  const [loading, setloading] = useState(true)
  const [additonalData, setadditonalData] = useState([])
  const [coffeCardData, setcoffeCardData] = useState([])
  const [popularData, setpopularData] = useState([])
  const getAdditinalData = () => { 
    instance.get("/website/places?perkTitle=1&sort=latest")
      .then((response) => {
        setadditonalData(response?.data?.data?.records);
        getCoffeCardData()
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
   }
  const getCoffeCardData = () => { 
    instance.get("/website/places?coffeeCard=1")
      .then((response) => {
        setcoffeCardData(response?.data?.data?.records);
        getPopularCardData()
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
   }
  const getPopularCardData = () => { 
    instance.get("/website/guides?perkTitle=1&sort=latest")
      .then((response) => {
        setpopularData(response?.data?.data?.records);
        setloading(false)
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
   }
  useEffect(() => {
    getAdditinalData()
  }, [])
  
  return (
    <Layout>
      <FixedBg>
        <div className="new-features-slider" >
          <div className="slider-title" style={{padding:"0 5%"}}>
            <h3>Discover</h3>
            <h1>EXCLUSIVE PERKS ONLY FOR HUNTR MEMBERS</h1>
          </div>
        </div>
      </FixedBg>
      {/* Static Banner */}
      <StaticBanner data={staticBannerData} />
      <div className="perks-main-container">
        <h1>POPULAR PERKS</h1>
        <div className="hero-sliderPerks">
          <SlickSliderPerks>
            {popularData?.map((card, index) => {
              return <SliderCardPerks key={index} data={card} placesCount={true} />;
            })}
          </SlickSliderPerks>
        </div>
        <h1>NEW ADDITIONS</h1>
        <section className="perks-addition-container">
          {additonalData?.map((card, index) => {
            return <SliderCardPerks key={index} data={card} newAdditon={true} />;
          })}
        </section>
      </div>
      <StaticBanner data={staticBannerData2} leftToRight={true} />
      <div className="perks-main-container">
        <h1>THE HUNTR COFFEE CARD PARTNERS</h1>
        <div className="hero-sliderPerks">
          <SlickSliderPerks>
            {coffeCardData?.map((card, index) => {
              return <SliderCardPerks key={index} data={card} icon={true} />;
            })}
          </SlickSliderPerks>
        </div>
      </div>
      <PartnersCofeeCardAlphaBet />
    </Layout>
  );
};

export default Index;
