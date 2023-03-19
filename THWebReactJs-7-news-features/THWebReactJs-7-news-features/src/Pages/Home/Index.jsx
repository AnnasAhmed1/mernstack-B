import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import Layout from "../../Layout/Index";
import PrimaryCard from "../../Components/Common/Cards/PrimaryCard";
import SecondaryCard from "../../Components/Common/Cards/SecondaryCard";
import NewsFeaturesCard from "../../Components/Common/Cards/NewsFeaturesCard";
import Place1Image from "../../Assets/images/db1.jpg";
import Place2Image from "../../Assets/images/db2.jpg";
import Place3Image from "../../Assets/images/db3.jpg";
import StaticBannerImage from "../../Assets/images/app-banner.png";
import PickImage1 from "../../Assets/images/pickimg.png";
import PickImage2 from "../../Assets/images/pickimg2.png";
import PicksCard from "../../Components/Common/Slider/PicksCard";
import SlickSlides from "../../Components/Common/Slider/SlickSlides";
import HeroSliderCard from "../../Components/Home/HeroSliderCard";
import HeroSlickSlider from "../../Components/Home/HeroSlickSlider";
import FeaturedEmail from "../../Components/Home/FeaturedEmail";
import instance from "../../Services/Axois";
import StaticBanner from "../../Components/Common/StaticBanner";
import CardsSlider from "../../Components/Home/CardsSlider";

export default function Index() {
  const [guides, setGuides] = useState([]);
  const [places, setPlaces] = useState([]);
  const [newsFeatures, setNewsFeatures] = useState([]);

  const filters = [
    {
      key: 1,
      title: "News",
    },
    {
      key: 2,
      title: "Guides",
    },
    {
      key: 3,
      title: "Places",
    },
    {
      key: 4,
      title: "Coffee",
    },
    {
      key: 5,
      title: "Perks",
    },
    {
      key: 6,
      title: "Membership",
    },
    {
      key: 7,
      title: "App",
    },
  ];

  const heroSliderData = [
    {
      key: 1,
      category: "guides",
      title: "Ten supper clubs to check out in Dubai",
      description:
        "The perfect spots for picnics, play dates, leisurely walks, heart-racing runs and more",
      image: Place1Image,
    },
    {
      key: 2,
      category: "news & features",
      title: "Ten supper clubs to check out in Dubai",
      description:
        "The perfect spots for picnics, play dates, leisurely walks, heart-racing runs and more",
      image: Place2Image,
    },
    {
      key: 3,
      category: "places",
      title: "Ten supper clubs to check out in Dubai",
      description:
        "The perfect spots for picnics, play dates, leisurely walks, heart-racing runs and more",
      image: Place3Image,
    },
    {
      key: 4,
      category: "Travel",
      title: "Ten travel clubs to check out in Dubai",
      description:
        "The perfect spots for picnics, play dates, leisurely walks, heart-racing runs and more",
      image: Place2Image,
    },
  ];

  const editorsPicks = [
    {
      key: 1,
      title: "San Beach",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage1,
    },
    {
      key: 2,
      title: "San Brew",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage2,
    },
    {
      key: 3,
      title: "San Beach",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage1,
    },
    {
      key: 4,
      title: "San Brew",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage2,
    },
    {
      key: 5,
      title: "John Doe",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage1,
    },
    {
      key: 6,
      title: "San Beach",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage2,
    },
    {
      key: 7,
      title: "John Doe",
      description: "There are many variations of passages of Lorem Ipsum",
      image: PickImage1,
    },
  ];

  const staticBannerData = {
    title: "The only guide you need. With a sprinkling of exclusive perks.",
    description: "The best of Dubai & the UAE in the palm of your hand.",
    image: StaticBannerImage,
  };

  useEffect(() => {
    // guides
    instance
      .get("/website/guides?trending=1")
      .then((response) => {
        setGuides(response?.data?.data?.records);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });

    // places
    instance
      .get("/website/places?trending=1")
      .then((response) => {
        setPlaces(response?.data?.data?.records);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });

    // news features
    instance
      .get("/website/news-features?trending=1")
      .then((response) => {
        setNewsFeatures(response?.data?.data?.records);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  }, []);

  return (
    <Layout>
      {/* Caurosel starts */}
      <div className="hero-slider">
        <div className="slider-title">
          <h3>Discover</h3>
          <h1>
            The best of
            <br />
            dubai & the UAE
          </h1>
        </div>
        <HeroSlickSlider slidesToShow={3}>
          {heroSliderData?.map((card) => {
            return <HeroSliderCard key={card?.key} data={card} />;
          })}
        </HeroSlickSlider>
      </div>
      {/* Caurosel ends */}

      {/* Filters starts */}
      <div className="container">
        <div className="home-filters">
          {filters?.map((filter) => {
            return (
              <div key={filter?.key} className="primary-filter">
                <p>{filter?.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Filters ends */}

      {/* Guides Section Starts */}
      <section className="card-section-wrapper">
        <div className="container">
          <div className="card-section-title">
            <h2>Guides</h2>
            <Link to="/guides">
              View More <ArrowRightOutlined />
            </Link>
          </div>

          {/* For Desktop View */}
          <div className="card-section-content">
            <Row gutter={[24, 24]}>
              {guides?.map((card) => {
                return (
                  <Col xs={24} md={12} lg={8} key={card?.key}>
                    <PrimaryCard data={card} routeTitle="guides" />
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* For Tablet and Mobile View */}
          <div className="card-section-content-slider">
            <CardsSlider>
              {guides?.map((card) => {
                return <PrimaryCard data={card} routeTitle="guides" />;
              })}
            </CardsSlider>
          </div>
        </div>
      </section>
      {/* Guides Section Ends */}

      {/* Huntr Editor's Starts */}
      <section className="editors-picks-wrapper">
        <div className="container">
          <h2>Huntr editor's picks</h2>

          {/* Slider */}
          <SlickSlides total={editorsPicks.length} slidesToShow={4}>
            {editorsPicks?.map((pick) => {
              return <PicksCard key={pick?.key} data={pick} />;
            })}
          </SlickSlides>
        </div>
      </section>
      {/* Huntr Editor's Ends */}

      {/* Places Section Starts */}
      <section className="card-section-wrapper">
        <div className="container">
          <div className="card-section-title">
            <h2>Places</h2>
            <Link to="/places">
              View More <ArrowRightOutlined />
            </Link>
          </div>

          {/* For Desktop View */}
          <div className="card-section-content">
            <Row gutter={[24, 24]}>
              {places?.map((card) => {
                return (
                  <Col xs={24} md={12} lg={8} key={card?.key}>
                    <SecondaryCard data={card} routeTitle="places" />
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* For Tablet and Mobile View */}
          <div className="card-section-content-slider">
            <CardsSlider>
              {places?.map((card) => {
                return <SecondaryCard data={card} routeTitle="places" />;
              })}
            </CardsSlider>
          </div>
        </div>
      </section>
      {/* Places Section Ends */}

      {/* Advertising Starts */}
      <StaticBanner data={staticBannerData} />
      {/* Advertising Ends */}

      {/* News and Features Section Starts */}
      <section className="card-section-wrapper">
        <div className="container">
          <div className="card-section-title">
            <h2>{"NEWS & FEATURES"}</h2>
            <Link to="/news-features">
              View More <ArrowRightOutlined />
            </Link>
          </div>

          {/* For Desktop View */}
          <div className="card-section-content">
            <Row gutter={[24, 24]}>
              {newsFeatures?.map((card) => {
                return (
                  <Col xs={24} md={12} lg={8} key={card?.key}>
                    <NewsFeaturesCard data={card} routeTitle="news-features" />
                  </Col>
                );
              })}
            </Row>
          </div>

          {/* For Tablet and Mobile View */}
          <div className="card-section-content-slider">
            <CardsSlider>
              {newsFeatures?.map((card) => {
                return (
                  <NewsFeaturesCard data={card} routeTitle="news-features" />
                );
              })}
            </CardsSlider>
          </div>
        </div>
      </section>
      {/* News and Features Section Ends */}

      {/* it shows featured email toast */}
      <FeaturedEmail />
    </Layout>
  );
}
