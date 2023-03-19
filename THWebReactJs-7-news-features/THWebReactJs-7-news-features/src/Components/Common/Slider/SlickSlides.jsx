import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightOutlined } from "@ant-design/icons";

const SlickSlides = ({ children, total, slidesToShow = 4 }) => {
  //   const [index, setIndex] = useState(0);

  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };
  const previous = () => {
    slider.current.slickPrev();
  };
  //   const beforeChange = (prev, next) => {
  //     setIndex(next);
  //   };

  // for disabling the next button
  //   const totalSlides = total - slidesToShow;

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,
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
          slidesToShow: 2,
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
      <div className="slider-buttons-group">
        <button className="slider-button" onClick={previous}>
          <ArrowRightOutlined className="rotate-180" />
        </button>
        <button className="slider-button" onClick={next}>
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
};

export default SlickSlides;
