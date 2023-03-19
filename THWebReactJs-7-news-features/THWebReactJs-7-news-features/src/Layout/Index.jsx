import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Button, Row, Col, Form, Input, message } from "antd";
import { RightOutlined, SearchOutlined } from "@ant-design/icons";
import App1Image from "../Assets/images/app1.png";
import App2Image from "../Assets/images/app2.png";
import AppStoreLogo from "../Assets/logo/appstore.png";
import PlayStoreLogo from "../Assets/logo/playstore.png";
import PaymentLogo from "../Assets/logo/secure-payment.png";
import FBLogo from "../Assets/logo/fb.png";
import InstaLogo from "../Assets/logo/insta.png";
import TiktokLogo from "../Assets/logo/tiktok.png";
import CompanyLogo from "../Assets/logo/company-logo.png";
import FooterAppLogo from "../Assets/logo/footappstore.png";
import FooterPlayLogo from "../Assets/logo/footplaystore.png";
import MenuLogo from "../Assets/logo/menu.png";
import Footer1Logo from "../Assets/logo/footer1.png";
import Footer2Logo from "../Assets/logo/footer2.png";
import Footer3Logo from "../Assets/logo/footer3.png";
import Footer4Logo from "../Assets/logo/footer4.png";
import HeaderDropdowns from "./../Components/Layout/HeaderDropdowns";
import GlobalSearch from "./../Components/Common/GlobalSearch";
import useNavBarScrollAnimate from "../Hooks/useNavBarScrollAnimate";
import SlickAutoSlides from "../Components/Common/Slider/SlickAutoSlides";
import ResponsiveDrawer from "./../Components/Layout/ResponsiveDrawer";

const Index = ({ children, bannerText }) => {
  // states
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isResponsiveDrawerVisible, setIsResponsiveDrawerVisible] =
    useState(false);
  const [form] = Form.useForm();

  // navbar
  const { showBG } = useNavBarScrollAnimate();

  // footer
  const exploreLinks = [
    {
      key: 1,
      title: "News & Features",
      url: "/news-features",
    },
    {
      key: 2,
      title: "Places",
      url: "/places",
    },
    {
      key: 3,
      title: "Guides",
      url: "/guides",
    },
    {
      key: 4,
      title: "The Huntr Membership",
      url: "/membership",
    },
    {
      key: 5,
      title: "The Huntr Store",
      url: "/shop",
    },
  ];

  const theHuntrLinks = [
    {
      key: 1,
      title: "About",
      url: "/about",
    },
    {
      key: 2,
      title: "Meet the Huntr",
      url: "/team",
    },
    {
      key: 3,
      title: "Contact",
      url: "/contact",
    },
    {
      key: 4,
      title: "FAQs",
      url: "/faq",
    },
  ];

  const footerSlider = [
    {
      key: 1,
      text: "the only guide to dubai & the uae you need",
      image: Footer1Logo,
    },
    {
      key: 2,
      text: "featuring everything you need to know & ignoring the rest",
      image: Footer2Logo,
    },
    {
      key: 3,
      text: "the only cross-concept coffee loyalty card in the region",
      image: Footer3Logo,
    },
    {
      key: 4,
      text: "a small homefrown media company. proudly born in dubai",
      image: Footer4Logo,
    },
  ];

  // methods
  const handleEmailSubmit = (values) => {
    console.log("Email submit", values);
    message.success("Send Successfully");
    form.resetFields();
  };

  const toggleDrawer = () => setIsDrawerVisible(!isDrawerVisible);

  const toggleResponsiveDrawer = () =>
    setIsResponsiveDrawerVisible(!isResponsiveDrawerVisible);

  return (
    <>
      {/* Banner Section */}
      <div className={clsx("top-banner", showBG > 0 && "top-banner-sticky")}>
        <h2>
          <span>UNLOCK</span>
          THE BEST OF YOUR CITY
        </h2>

        <div className="app-images">
          <img src={App1Image} alt="app-one" />
          <img src={App2Image} className="hide-xs" alt="app-two" />
        </div>

        <div className="app-links">
          <Link to="/appstore">
            <img src={AppStoreLogo} alt="appstore" />
          </Link>
          <Link to="/playstore">
            <img src={PlayStoreLogo} alt="playstore" />
          </Link>
        </div>
      </div>

      {/* Company Logo Section */}
      <div className="container">
        <div className="logo-section">
          <div className="social-links">
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

          {/* Responsive */}
          <Button className="menu-bar" onClick={toggleResponsiveDrawer}>
            <img src={MenuLogo} alt="Menu bar" />
          </Button>

          <ResponsiveDrawer
            isDrawerVisible={isResponsiveDrawerVisible}
            toggleDrawer={toggleResponsiveDrawer}
          />

          <div className="company-logo">
            <Link to="/">
              <img src={CompanyLogo} alt="social" />
            </Link>
          </div>

          <div className="search-bar">
            <Button onClick={toggleDrawer}>
              <SearchOutlined />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar Drawer */}
      <GlobalSearch
        isDrawerVisible={isDrawerVisible}
        toggleDrawer={toggleDrawer}
      />

      {/* Header Dropdown */}
      <HeaderDropdowns />

      {/* main content */}
      <main>{children}</main>

      {/* footer */}
      <footer>
        <div className="footer-wrapper">
          <div className="container">
            <Row gutter={24}>
              <Col xs={24} sm={12}>
                <h1 className="footer-heading">
                  Get the best of your city <br /> straight to your inbox
                </h1>

                {/* form starts */}
                <Form form={form} onFinish={handleEmailSubmit}>
                  <Form.Item name="email">
                    <Input
                      className="email-input"
                      placeholder="Enter your email address"
                    />
                  </Form.Item>

                  <Button htmlType="submit" className="send-btn">
                    <RightOutlined />
                  </Button>
                </Form>
                {/* form ends */}

                <div className="secure-payment">
                  <img src={PaymentLogo} alt="payment" />
                </div>

                <p className="copyright">
                  &copy; Copyright {new Date().getFullYear()} The HUNTR
                </p>
              </Col>
              <Col xs={24} sm={6}>
                <h4>Explore</h4>
                <ul>
                  {exploreLinks?.map((link) => {
                    return (
                      <li key={link?.key}>
                        <Link to={link?.url}>{link?.title}</Link>
                      </li>
                    );
                  })}
                </ul>

                <h4 className="hide-xs">Follow Us</h4>
                <div className="social-links">
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
              </Col>

              <Col xs={24} sm={6}>
                <h4>The Huntr</h4>
                <ul>
                  {theHuntrLinks?.map((link) => {
                    return (
                      <li key={link?.key}>
                        <Link to={link?.url}>{link?.title}</Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="footer-app-links">
                  <Link to="/appstore">
                    <img src={FooterAppLogo} alt="appstore" />
                  </Link>
                  <Link to="/playstore">
                    <img src={FooterPlayLogo} alt="playstore" />
                  </Link>
                </div>
              </Col>
            </Row>

            {/* for tablet and desktop view */}
            <div className="footer-banner-desktop tablet-none mobile-none">
              <Row gutter={[40, 24]}>
                {footerSlider?.map((slide) => {
                  return (
                    <Col span={6} className="pr-16 pl-10">
                      <div key={slide?.key} className="footer-slider-content">
                        <img src={slide?.image} alt="footer slider" />
                        <p>{slide?.text}</p>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>

            {/* for mobile view */}
            <div className="footer-banner desktop-none">
              <SlickAutoSlides>
                {footerSlider?.map((slide) => {
                  return (
                    <div key={slide?.key} className="footer-slider-content">
                      <img src={slide?.image} alt="footer slider" />
                      <p>{slide?.text}</p>
                    </div>
                  );
                })}
              </SlickAutoSlides>
            </div>

            {/* for responsive */}
            <div className="copyrights-responsive">
              <div className="social-links">
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

              <p className="copyright">
                &copy; The HUNTR {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
