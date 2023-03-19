import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import Layout from "../../Layout/Index";
import NewsFeaturesCard from "../../Components/Common/Cards/NewsFeaturesCard";
import instance from "../../Services/Axois";
import NewsFeaturesHeroSlider from "../../Components/Caurosel/HeroSlider";
import CatogeriesFilter from "../../Components/Catogeries/Catogeries";

const Index = () => {
  // states
  const [cardData, setCardData] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selected, setSelected] = useState();

  // use effect
  useEffect(() => {
    instance
      .get("/website/news-features?trending=1")
      .then((response) => {
        setTrending(response?.data?.data?.records);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  }, []);

  return (
    <Layout>
      {/* Caurosel Starts */}
      <NewsFeaturesHeroSlider
        pageTitle={"News & Features"}
        data={trending}
        routeTitle="news-features"
      />
      {/* Caurosel Ends */}

      {/* Filters starts */}
      <CatogeriesFilter
        selected={selected}
        setselected={setSelected}
        setData={setCardData}
        route={"news-features"}
      />
      {/* Filters ends */}

      {/* Card Section */}
      <div className="container">
        <div className="news-features-cards">
          <h2>{selected?.title}</h2>

          <div className="card-section-content">
            <Row gutter={[24, 24]}>
              {cardData.length > 0 &&
                cardData?.map((card) => {
                  return (
                    <Col xs={24} md={12} lg={8} key={card?.key}>
                      <NewsFeaturesCard data={card} />
                    </Col>
                  );
                })}
            </Row>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
