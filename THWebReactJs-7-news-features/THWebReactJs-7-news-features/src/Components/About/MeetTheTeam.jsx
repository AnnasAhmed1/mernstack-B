import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import Member1 from "../../Assets/images/member1.png";
import Member2 from "../../Assets/images/member2.png";
import Member3 from "../../Assets/images/member3.png";
import Member4 from "../../Assets/images/member4.png";
import Member5 from "../../Assets/images/member5.png";
import EmailLogo from "../../Assets/logo/email2.png";
import InstaLogo from "../../Assets/logo/insta2.png";

const MeetTheTeam = () => {
  const slider = useRef(null);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

  const meetTheTeam = [
    {
      key: 1,
      name: "Holly Williams-Lloyd",
      designation: "Founder & Editor-in-Chief",
      email: "jose@test.com",
      instagramLink: "https://www.instagram.com",
      image: Member1,
    },
    {
      key: 2,
      name: "Jose B. Balitian",
      designation: "Founding Contributor",
      email: "jose@test.com",
      instagramLink: "https://www.instagram.com",
      image: Member2,
    },
    {
      key: 3,
      name: "Vince & Rina Pardo",
      designation: "Abu Dhabi Contributors",
      email: "jose@test.com",
      instagramLink: "https://www.instagram.com",
      image: Member3,
    },
    {
      key: 4,
      name: "Assele Kahwaji",
      designation: "Junior Editor",
      email: "jose@test.com",
      instagramLink: "https://www.instagram.com",
      image: Member4,
    },
    {
      key: 5,
      name: "Angelica Austria",
      designation: "Editorial Assistant",
      email: "jose@test.com",
      instagramLink: "https://www.instagram.com",
      image: Member5,
    },
  ];

  // methods
  const next = () => {
    slider.current.slickNext();
  };

  const previous = () => {
    slider.current.slickPrev();
  };

  return (
    <div>
      <Slider ref={slider} {...settings}>
        {meetTheTeam?.map((team) => {
          return (
            <div>
              <div className="team-container">
                <img src={team?.image} alt="Team Member" />

                <div className="team-content">
                  <h3>{team?.name}</h3>
                  <p>{team?.designation}</p>
                  <div className="social-contacts">
                    <img src={EmailLogo} alt="Email" />
                    <img src={InstaLogo} alt="Instagram" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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

export default MeetTheTeam;
