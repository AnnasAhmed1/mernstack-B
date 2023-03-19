import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FixedBg from "../../Components/Caurosel/FixedBg";
import instance from "../../Services/Axois";
import Layout from "../../Layout/Index";
import Usps from "../../Components/Places/Usps";
import "../../Styles/Pages/_placesDetails.scss";
import BottomBarDetail from "../../Components/Places/BottomBarDetail";
import parse from 'html-react-parser'
import DetailsHeader from "../../Components/Common/DetailsHeader";
import { Col, Row } from "antd";
import Loader from "../../Components/Loader";
import PrimaryCard from "../../Components/Common/Cards/PrimaryCard";
import SecondaryCard from "../../Components/Common/Cards/SecondaryCard";
function GuideDetails() {
  const location = useLocation()
  let { id } = useParams();
  const [PreviousData, setPreviousData] = useState(location?.state)
  const [detailData, setdetailData] = useState({})
  const [discoverMoreData, setdiscoverMoreData] = useState([])
  const [loading, setloading] = useState(true)
  useEffect(() => {
    instance
      .get(`/website/guides/${id}`)
      .then((response) => {
        setdetailData(response?.data?.data)
        discoverMore()
        console.log(response?.data?.data, "responsee");
      })
      .catch((response) => {
        console.log(response, "errorrr");
      });
  }, []);
  const discoverMore = () => {
    instance.get(`/website/guides?sort=latest&categoryIds[]=${1}&limit=3&excludedId=${id}`)
      .then(response => {
        console.log(response?.data, "discovermore")
        setloading(false)
        setdiscoverMoreData(response?.data?.data?.records)
      })
      .catch(response => {
        console.log(response, "discovermore");
      })
  }
  const data = !loading && detailData?.description.split("</p>");

  return (
    <Layout>
      {
        !loading ? (
          <>
            <FixedBg image={detailData?.featureImageUrl}>
              <h1>as</h1>
            </FixedBg>
            <main className="place-details-container">
              <DetailsHeader categories={["Guides", PreviousData?.categoryTitle]} />
              <h1 >{detailData?.title || "Lucia's: An upscale Italian affair in Downtown"}</h1>
              <Usps data={detailData?.usps} />
              <hr />
              <div className="CapitalLetterWrapper">
                {parse(data[0].charAt(0))}
                <p>{parse(data[0].slice(1))}</p>
              </div>
              {/* <p>{parse(data[1] + "</p>")}</p> */}
              <br />
              <br />
              {/* <p>
                {
                  parse(detailData?.articles[0]?.text) || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nemo, non officia iste, reiciendis minima vero aliquam architecto dolorum nulla necessitatibus et cumque veniam sed? Iusto rerum vero pariatur minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis provident similique placeat. Maiores iure assumenda eligendi quasi, reiciendis in fugiat eos consequatur asperiores voluptas veniam nam deserunt cumque at. Deserunt?"
                }
              </p> */}
              {
                <div className="card-section-content">
                  <Row gutter={[24, 24]}>
                    {detailData && detailData?.place?.map((card) => {
                      return (
                        <Col  span={12}  key={card?.key}>
                          <SecondaryCard data={card} routeTitle="placeDetails" summary={card?.summary} />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              }
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
                          <PrimaryCard data={card} routeTitle={"guides"} />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </section>
            {/* <h1 className="discover-more">DISCOVER MORE</h1>
            {
              discoverMoreData && discoverMoreData?.map((card, i) => {
                return (
                  <Col xs={24} sm={8} key={i}>
                    <SecondaryCard data={card} routeTitle={"GuideDetails"} />
                  </Col>
                )
              })
            } */}
          </>
        ) : (
          <Loader />
        )
      }
    </Layout>
  );
}

export default GuideDetails;