import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import "./perks.scss";

const SlickSliderPerks = ({ children }) => {
  const slider = useRef(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        onClick={onClick}
        {...style}
        style={{
          fontSize: "60px",
          display: "block",
          right: "75px",
          zIndex: "15",
          opacity: "0.5",
          color: "white",
        }}
      >
        <RightCircleOutlined />
      </button>
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        onClick={onClick}
        {...style}
        style={{
          fontSize: "60px",
          display: "block",
          left: "75px",
          zIndex: "15",
          opacity: "0.50",
          color: "white",
        }}
      >
        <LeftCircleOutlined />
      </button>
    );
  }

  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    arrows: false,
    centerPadding: "20%",
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      <Slider
        // style={{
        //   height: "200px",
        // }}
        ref={slider}
        {...settings}
      >
        {children}
      </Slider>
    </div>
  );
};

export default SlickSliderPerks;
