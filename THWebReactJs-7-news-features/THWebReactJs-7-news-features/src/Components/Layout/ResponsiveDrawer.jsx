import React from "react";
import { Drawer, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  CloseCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import FBLogo from "../../Assets/logo/fb.png";
import InstaLogo from "../../Assets/logo/insta.png";
import TiktokLogo from "../../Assets/logo/tiktok.png";

const ResponsiveDrawer = ({ isDrawerVisible, toggleDrawer }) => {
  // menu items
  const items = [
    {
      key: "newsFeatures",
      label: <Link to="/newsFeatures">{"News & Features"}</Link>,
      children: [
        {
          key: "latestNews",
          label: <Link to="/latest-news">Latest News</Link>,
        },
        {
          key: "trending",
          label: <Link to="tranding">Trending</Link>,
        },
        {
          key: "foodDrink",
          label: <Link to="/food-drink">{"Food & Drink"}</Link>,
        },
        {
          key: "styleBeauty",
          label: <Link to="/style-beauty">{"Style & Beauty"}</Link>,
        },
        {
          key: "artCulture",
          label: <Link to="/art-culture">{"Art & Culture"}</Link>,
        },
        {
          key: "travel",
          label: <Link to="/travel">Travel</Link>,
        },
      ],
    },
    {
      key: "places",
      label: <Link to="/places">Places</Link>,
      children: [
        {
          key: "cafes",
          label: <Link to="#">Cafes</Link>,
        },
        {
          key: "restaurants",
          label: <Link to="#">Restaurants</Link>,
        },
        {
          key: "breakfast",
          label: <Link to="#">Breakfast</Link>,
        },
        {
          key: "specialty",
          label: <Link to="#">Specialty Coffee</Link>,
        },
        {
          key: "alcohol",
          label: <Link to="#">Alcohol-Free</Link>,
        },
        {
          key: "licensed",
          label: <Link to="#">Licensed</Link>,
        },
        {
          key: "spa",
          label: <Link to="#">Spa + Beauty</Link>,
        },
        {
          key: "hotels",
          label: <Link to="#">Hotels</Link>,
        },
        {
          key: "artCulture",
          label: <Link to="#">Art + Culture</Link>,
        },
        {
          key: "shopping",
          label: <Link to="#">Shopping</Link>,
        },
      ],
    },
    {
      key: "guides",
      label: <Link to="/guides">Guides</Link>,
      children: [
        {
          key: "latestGuides",
          label: <Link to="#">Latest Guides</Link>,
        },
        {
          key: "trending",
          label: <Link to="#">Trending</Link>,
        },
        {
          key: "huntrMember",
          label: <Link to="#">HUNTR Member Perks</Link>,
        },
        {
          key: "huntrCoffee",
          label: <Link to="#">The HUNTR Coffee Card</Link>,
        },
        {
          key: "restaurants",
          label: <Link to="#">Restaurants</Link>,
        },
        {
          key: "cafesGuides",
          label: <Link to="#">Cafes</Link>,
        },
        {
          key: "specialtyCoffee",
          label: <Link to="#">Specialty Coffee</Link>,
        },
        {
          key: "outdoorActivities",
          label: <Link to="#">Outdoor Activities</Link>,
        },
        {
          key: "artCultureGuide",
          label: <Link to="#">{"Art & Culture"}</Link>,
        },
        {
          key: "travel",
          label: <Link to="#">Travel</Link>,
        },
      ],
    },
    {
      key: "huntrMembership",
      label: <Link to="/huntr-membership">The Huntr Membership</Link>,
      children: [
        {
          key: "huntrMemberPerks",
          label: <Link to="#">HUNTR Member Perks</Link>,
        },
        {
          key: "huntrCoffeeCard",
          label: <Link to="#">HUNTR Coffee Card</Link>,
        },
        {
          key: "theHuntrApp",
          label: <Link to="#">The HUNTR App</Link>,
        },
      ],
    },
    {
      key: "huntrStore",
      label: <Link to="/huntr-store">The Huntr Store</Link>,
      children: [
        {
          key: "huntrMembershipGift",
          label: <Link to="#">Buy HUNTR Membership Gift</Link>,
        },
        {
          key: "experiences",
          label: <Link to="#">{"Experiences (Coming Soon)"}</Link>,
        },
        {
          key: "gifts",
          label: <Link to="#">{"Gifts (Coming Soon)"}</Link>,
        },
      ],
    },
    {
      key: "about",
      label: <Link to="/about">About</Link>,
      children: [
        {
          key: "FAQs",
          label: <Link to="#">FAQs</Link>,
        },
        {
          key: "meetTheHUNTR",
          label: <Link to="#">Meet The HUNTR</Link>,
        },
        {
          key: "termsConditions",
          label: <Link to="#">{"Terms & Conditions"}</Link>,
        },
        {
          key: "editorialPolicy",
          label: <Link to="#">Editorial Policy</Link>,
        },
      ],
    },
  ];
  return (
    <Drawer
      className="responsive-drawer"
      placement="top"
      height={"100%"}
      contentWrapperStyle={{
        width: "65%",
      }}
      closeIcon={<CloseCircleOutlined />}
      footer={
        <>
          <div className="footer-links">
            <Link to="/facebook.com">
              <img src={FBLogo} alt="social" />
            </Link>
            <Link to="/instagram.com">
              <img src={InstaLogo} alt="social" />
            </Link>
            <Link to="/tiktok.com">
              <img src={TiktokLogo} alt="social" />
            </Link>
          </div>
        </>
      }
      onClose={toggleDrawer}
      open={isDrawerVisible}
    >
      <div className="responsive-container">
        <Menu
          mode="inline"
          expandIcon={(props) =>
            props?.isOpen ? (
              <MinusOutlined className="mr-04" />
            ) : (
              <PlusOutlined className="mr-04" />
            )
          }
          items={items}
        />
      </div>
    </Drawer>
  );
};

export default ResponsiveDrawer;
