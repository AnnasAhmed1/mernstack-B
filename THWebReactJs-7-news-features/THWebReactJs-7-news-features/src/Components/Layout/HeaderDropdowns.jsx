import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";

const HeaderDropdowns = () => {
  // dropdown items
  const newFeaturesItems = [
    {
      key: "1",
      label: <Link to="/news-features/latest-news">Latest News</Link>,
    },
    {
      key: "2",
      label: <Link to="/news-features/trending">Trending</Link>,
    },
    {
      key: "3",
      label: <Link to="/news-features/food-drink">{"Food & Drink"}</Link>,
    },
    {
      key: "4",
      label: <Link to="/news-features/style-beauty">{"Style & Beauty"}</Link>,
    },
    {
      key: "5",
      label: <Link to="/news-features/art-culture">{"Art & Culture"}</Link>,
    },
    {
      key: "6",
      label: <Link to="/news-features/travel">Travel</Link>,
    },
  ];

  const placesItems = [
    {
      key: "1",
      label: (
        <Link to="/places/cafes" state={{ id: 1, title: "Cafes" }}>
          Cafes
        </Link>
      ),
    },
    {
      key: "2",
      label: <Link to="/places/restaurants">Restaurants</Link>,
    },
    {
      key: "3",
      label: <Link to="/places">Breakfast</Link>,
    },
    {
      key: "4",
      label: (
        <Link
          to="/places/specialty-coffee"
          state={{ id: 4, title: "Specialty Coffee" }}
        >
          Specialty Coffee
        </Link>
      ),
    },
    {
      key: "5",
      label: <Link to="/places">Alcohol-Free</Link>,
    },
    {
      key: "6",
      label: <Link to="/places">Licensed</Link>,
    },
    {
      key: "7",
      label: <Link to="/places/beauty-spa">Spa + Beauty</Link>,
    },
    {
      key: "8",
      label: <Link to="/places/hotels">Hotels</Link>,
    },
    {
      key: "9",
      label: <Link to="/places/arts-culture">Art + Culture</Link>,
    },
    {
      key: "10",
      label: <Link to="/places/shops">Shopping</Link>,
    },
    {
      key: "11",
      label: <Link to="/places/bars-nightlife">{"Bars & Nightlife"}</Link>,
    },
    {
      key: "12",
      label: <Link to="/places/health-fitness">{"Health & Fitness"}</Link>,
    },
    {
      key: "13",
      label: <Link to="/places/tourist-attractions">Tourist Attractions</Link>,
    },
    {
      key: "14",
      label: <Link to="/places/outdoor-acitivties">Outdoor Attractions</Link>,
    },
    {
      key: "15",
      label: <Link to="/places/online-delivery">Online Delivery</Link>,
    },
  ];

  const guidesItems = [
    {
      key: "1",
      label: <Link to="/latest-guides">Latest Guides</Link>,
    },
    {
      key: "2",
      label: <Link to="/guides/trending" >Trending</Link>,
    },
    {
      key: "3",
      label: <Link to="/guides/perks">HUNTR Member Perks</Link>,
    },
    {
      key: "4",
      label: <Link to="/guides/HUNTR-coffee-card" state={{id:14,title:'The HUNTR Coffee Card'}}>The HUNTR Coffee Card</Link>,
    },
    {
      key: "5",
      label: <Link to="/guides/restaurants">Restaurants</Link>,
    },
    {
      key: "6",
      label: <Link to="/guides/cafes">Cafes</Link>,
    },
    {
      key: "7",
      label: <Link to="/guides/specialty-coffee">Specialty Coffee</Link>,
    },
    {
      key: "8",
      label: <Link to="/guides/outdoor-acitivites">Outdoor Activities</Link>,
    },
    {
      key: "9",
      label: <Link to="/guides/art-culture">{"Art & Culture"}</Link>,
    },
    {
      key: "10",
      label: <Link to="/guides/travel">Travel</Link>,
    },
  ];

  const membershipItems = [
    {
      key: "1",
      label: <Link to="/perks">HUNTR Member Perks</Link>,
    },
    {
      key: "2",
      label: <Link to="/coffee-card">HUNTR Coffee Card</Link>,
    },
    {
      key: "3",
      label: <Link to="/app">The HUNTR App</Link>,
    },
  ];

  const storeItems = [
    {
      key: "1",
      label: <Link to="/shop/membership ">Buy HUNTR Membership Gift</Link>,
    },
    {
      key: "2",
      label: <Link to="#">{"Experiences (Coming Soon)"}</Link>,
    },
    {
      key: "3",
      label: <Link to="#">{"Gifts (Coming Soon)"}</Link>,
    },
  ];

  const aboutItems = [
    {
      key: "1",
      label: <Link to="/faq">FAQs</Link>,
    },
    {
      key: "2",
      label: <Link to="/team">Meet The HUNTR</Link>,
    },
    {
      key: "3",
      label: <Link to="/terms-and-conditions">{"Terms & Conditions"}</Link>,
    },
    {
      key: "4",
      label: <Link to="/editorial-policy">Editorial Policy</Link>,
    },
  ];

  return (
    <>
      {/* nav bar */}
      <nav className="primary-navbar">
        {/* News and Features Dropdown */}
        <Dropdown
          menu={{
            items: newFeaturesItems,
          }}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottom"
        >
          <Link to="/news-features">{"NEWS & FEATURES"}</Link>
        </Dropdown>

        {/* Places Dropdown */}
        <Dropdown
          menu={{
            items: placesItems,
          }}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottom"
        >
          <Link to="/places">Places</Link>
        </Dropdown>

        {/* Guides Dropdown */}
        <Dropdown
          menu={{
            items: guidesItems,
          }}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottom"
        >
          <Link to="/guides">Guides</Link>
        </Dropdown>

        {/* Huntr Membership Dropdown */}
        <Dropdown
          menu={{
            items: membershipItems,
          }}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottom"
        >
          <Link to="/membership">The Huntr Membership</Link>
        </Dropdown>

        {/* Huntr Store Dropdown */}
        <Dropdown
          menu={{
            items: storeItems,
          }}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottom"
        >
          <Link to="/shop">The Huntr Store</Link>
        </Dropdown>

        {/* About Dropdown */}
        <Dropdown
          menu={{
            items: aboutItems,
          }}
          arrow={{
            pointAtCenter: true,
          }}
          placement="bottom"
        >
          <Link to="/about">About</Link>
        </Dropdown>
      </nav>
    </>
  );
};

export default HeaderDropdowns;
