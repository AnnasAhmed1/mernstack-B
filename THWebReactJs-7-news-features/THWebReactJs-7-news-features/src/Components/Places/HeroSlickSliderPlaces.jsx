import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RightOutlined } from "@ant-design/icons";

const HeroSlickSliderPlaces = ({ children,showArrow=2,className='' }) => {
  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };

  let settings = {
    // dots: showArrow > 0 ?true:false,
    dots:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    // centerPadding: "60px",
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
    <div className={className?className:"p-relative"}>
      <Slider ref={slider} {...settings} >
        {children}
      </Slider>
      {
        showArrow > 1 ? (
          <>
            <button className="slider-left-button-places" onClick={previous}>
              <RightOutlined className="rotate-180" />
            </button>
            <button className="slider-right-button-places" onClick={next}>
              <RightOutlined />
            </button>
          </>

        ) : null
      }
    </div>
  );
};

export default HeroSlickSliderPlaces;
