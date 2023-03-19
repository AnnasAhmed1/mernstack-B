import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeroSlider = ({ data = [], pageTitle = "", routeTitle = "", showChildren = true }) => {
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
    slidesToShow: 1,
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
    <>
      <div className="new-features-slider">
        <div className="slider-title">
          <h3>Discover</h3>
          <h1>TRENDING {pageTitle}</h1>
        </div>
        {/* Slider */}
        <Slider ref={slider} {...settings}>
          {data?.map((item) => {
            return (
              <div>
                <Link to={`/${routeTitle}/${item.id}`} key={item?.id} state={item}>
                  <div
                    className="slider-card-wrapper"
                    style={{
                      backgroundImage: `url('${item?.featureImageUrl || item?.featureArticle?.image || item
                        }')`,
                    }}
                  >
                    {
                      showChildren ? (
                        <div className="slider-card-container">
                          <div className="card-content">
                            <p className="card-category">{item?.cardCategory}</p>
                            <h3 className="card-title">{item?.title}</h3>
                            <p className="card-description">
                              {item?.description?.length > 50
                                ? `${item?.description.slice(0, 80)}...`
                                : item?.description}
                            </p>
                          </div>
                        </div>

                      ) : null
                    }
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>

        {/* Slider Buttons */}
        <button className="slider-left-button" onClick={previous}>
          <RightOutlined className="rotate-180" />
        </button>
        <button className="slider-right-button" onClick={next}>
          <RightOutlined />
        </button>
      </div>
    </>
  );
};

export default HeroSlider;
