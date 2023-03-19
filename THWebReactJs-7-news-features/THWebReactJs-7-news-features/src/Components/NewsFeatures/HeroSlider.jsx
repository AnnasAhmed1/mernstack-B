import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RightOutlined } from "@ant-design/icons";

const HeroSlider = ({ children, slidesToShow = 1 }) => {
  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  let settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider ref={slider} {...settings}>
        {children}
      </Slider>

      {/* Slider Buttons */}
      <button className="slider-left-button" onClick={previous}>
        <RightOutlined className="rotate-180" />
      </button>
      <button className="slider-right-button" onClick={next}>
        <RightOutlined />
      </button>
    </div>
  );
};

export default HeroSlider;
