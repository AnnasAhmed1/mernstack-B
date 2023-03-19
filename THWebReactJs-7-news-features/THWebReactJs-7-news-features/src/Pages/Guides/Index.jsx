import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Layout from "../../Layout/Index";
import CatogeriesFilter from "../../Components/Catogeries/Catogeries";
import instance from "../../Services/Axois";
import HunterEditor from "../../Components/Common/HunterEditor";
import GuidesHeroSlider from "../../Components/Caurosel/HeroSlider";
import PrimaryCard from "../../Components/Common/Cards/PrimaryCard";
import Loader from "../../Components/Loader";
import CardsSlider from "../../Components/Home/CardsSlider";

export default function Index() {
  // states
  const [guidesCard, setguidesCard] = useState([]);
  const [TrendingCar, setTrendingCar] = useState([]);
  const [selected, setselected] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    instance
      .get("/website/guides?trending=1")
      .then((response) => {
        setTrendingCar(response?.data?.data?.records);
        setloading(false);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  }, []);

  return (
    <Layout>
      {!loading ? (
        <>
          {/* Caurosel starts */}
          <GuidesHeroSlider
            pageTitle="Guides"
            data={TrendingCar}
            routeTitle="guides"
          />
          {/* Caurosel ends */}
          {/* Filters starts */}
          <CatogeriesFilter
            selected={selected}
            setselected={setselected}
            setData={setguidesCard}
            route={"guides"}
          />
          {/* Filters ends */}

          {/* guides Section Starts */}
          <section className="card-section-wrapper">
            <div className="container">
              <div className="card-section-title">
                <h2>{selected?.title ? selected?.title : "GUIDES"}</h2>
                {/* <Link to="/guides">
              View More <ArrowRightOutlined />
            </Link> */}
              </div>

              <div className="card-section-content">
                <Row gutter={[24, 24]}>
                  {guidesCard?.map((card) => {
                    return (
                      <Col xs={24} sm={8} key={card?.key}>
                        <PrimaryCard data={card} routeTitle={"guideDetails"} />
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* For Tablet and Mobile View */}
              <div className="card-section-content-slider">
                <CardsSlider>
                  {guidesCard?.map((card) => {
                    return (
                      <PrimaryCard data={card} routeTitle={"guideDetails"} />
                    );
                  })}
                </CardsSlider>
              </div>
            </div>
          </section>
          {/* guides Section Ends */}

          {/* Huntr Editor's Starts */}
          <HunterEditor />
          {/* Huntr Editor's Ends */}
        </>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}
