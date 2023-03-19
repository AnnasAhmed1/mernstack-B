import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FixedBg from "../../Components/Caurosel/FixedBg";
import instance from "../../Services/Axois";
import Layout from "../../Layout/Index";
import Usps from "../../Components/Places/Usps";
import "../../Styles/Pages/_placesDetails.scss";
import Place1Image from "../../Assets/images/db1.jpg";
import Place2Image from "../../Assets/images/db2.jpg";
import Place3Image from "../../Assets/images/db3.jpg";
import { EnvironmentOutlined } from "@ant-design/icons";
import HeroSliderCardPlaces from "../../Components/Places/HeroSliderCardPlaces";
import BottomBarDetail from "../../Components/Places/BottomBarDetail";
import parse from 'html-react-parser'
import DetailsHeader from "../../Components/Common/DetailsHeader";
import SecondaryCard from "../../Components/Common/Cards/SecondaryCard";
import { Col, Row } from "antd";
import Loader from "../../Components/Loader";
import HeroSlickSliderPlaces from "../../Components/Places/HeroSlickSliderPlaces";
function PlaceDetails() {
  const location = useLocation()
  console.log(location,"location");
  let { id } = useParams();
  const [PreviousData, setPreviousData] = useState(location?.state)
  const [detailData, setdetailData] = useState({})
  const [discoverMoreData, setdiscoverMoreData] = useState([])
  const [loading, setloading] = useState(true)

  useEffect(() => {
    setloading(true)
    instance
      .get(`/website/places/${location?.state?.id}`)
      .then((response) => {
        setdetailData(response?.data?.data)
        discoverMore()
        console.log(response?.data?.data, "responsee");
      })
      .catch((response) => {
        console.log(response, "errorrr");
      });
  }, [location]);
  const discoverMore = () => {
    instance.get(`/website/places?sort=latest&categoryIds[]=${1}&limit=3&excludedId=${location?.state?.id}`)
      .then(response => {
        console.log(response?.data, "discovermore")
        setloading(false)
        setdiscoverMoreData(response?.data?.data?.records)
      })
      .catch(response => {
        console.log(response, "discovermore");
      })
  }
  const showInMapClicked = () => {
    window.open("https://maps.google.com?q=" + detailData?.location?.lon + "," + detailData?.location?.lon);
  };
  const data = !loading && detailData?.description.split("</p>");
  return (
    <Layout>
      {
        !loading ? (
          <>
            {/* <FixedBg data={detailData?.sliderImages}>
              <h1>as</h1>
            </FixedBg> */}
            <HeroSlickSliderPlaces showArrow={detailData?.sliderImages?.length}>
              {detailData?.sliderImages?.map((card) => {
                return <HeroSliderCardPlaces key={card?.key} data={card} height={'auto'} />;
              })}
            </HeroSlickSliderPlaces>
            <main className="place-details-container">
              <DetailsHeader categories={["Places", PreviousData?.cardCategory]} />
              <h1 >{detailData?.title || "Lucia's: An upscale Italian affair in Downtown"}</h1>
              <p className="place-address" onClick={showInMapClicked}>
                <EnvironmentOutlined />
                <span>
                  {detailData?.address || " 45 Burj Khalifa Street, Dubai"}
                </span>
              </p>
              <Usps data={detailData?.usps} />
              <hr />
              <div className="aboutUs">

                <p><span class="largeLetter"> {parse(data[0].charAt(3))}</span>{parse(data[0].slice(4, -1))}</p>
              </div>
              {/* <div className="CapitalLetterWrapper">
                {parse(data[0].charAt(3))}
                <p>{parse(data[0].slice(4, -1))}</p>
              </div> */}
              <p>{parse(data[1] + "</p>")}</p>
              <div className="hero-slider">
                {/* <div className="slider-title"></div> */}
                <HeroSlickSliderPlaces className="hero-slider-detail-places-wrapper">
                  {detailData?.articles[0]?.images?.map((card) => {
                    return <HeroSliderCardPlaces key={card?.key} data={card} />;
                  })}
                </HeroSlickSliderPlaces>
              </div>
              <br />
              <br />
              <p>
                {
                  parse(detailData?.articles[0]?.text) || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nemo, non officia iste, reiciendis minima vero aliquam architecto dolorum nulla necessitatibus et cumque veniam sed? Iusto rerum vero pariatur minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis provident similique placeat. Maiores iure assumenda eligendi quasi, reiciendis in fugiat eos consequatur asperiores voluptas veniam nam deserunt cumque at. Deserunt?"
                }
              </p>
              <hr />
              <BottomBarDetail data={detailData?.editor} />
              <br />
            </main>
            <section className="card-section-wrapper">
              <div className="container">
                <div className="card-section-title">
                  <h2>DISCOVER MORE</h2>
                </div>

                <div className="card-section-content">
                  <Row gutter={[24, 24]}>
                    {discoverMoreData && discoverMoreData?.map((card) => {
                      return (
                        <Col xs={24} md={12} lg={8} key={card?.key}>
                          <SecondaryCard data={card} routeTitle="place" />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </section>
          </>
        ) : (
          <Loader />
        )
      }
    </Layout>
  );
}

export default PlaceDetails;