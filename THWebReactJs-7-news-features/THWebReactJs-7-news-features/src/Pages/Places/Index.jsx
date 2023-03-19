import React, { useState, useEffect } from "react";
import { Row, Col, Select, Modal } from "antd";
import Layout from "../../Layout/Index";
import CatogeriesFilter from "../../Components/Catogeries/Catogeries";
import CusineSearch from "../../Components/Catogeries/CusineSearch";
import FilterButton from "../../Components/Catogeries/FlterButton";
import instance from "../../Services/Axois";
import SecondaryCard from "../../Components/Common/Cards/SecondaryCard";
import HunterEditor from "../../Components/Common/HunterEditor";
import PlacesHeroSlider from "../../Components/Caurosel/HeroSlider";
import Loader from "../../Components/Loader";
import FilterModelPlaces from "../../Components/FilterModelPlaces/FilterModelPlaces";

export default function Index() {
  const [placesCard, setplacesCard] = useState([]);
  const [TrendingCar, setTrendingCar] = useState([]);
  const [selectedCusine, setselectedCusine] = useState(1);
  const [selected, setselected] = useState();
  const [loading, setloading] = useState(true);
  const [filterDropDown, setfilterDropDown] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = ({ value = "" }) => {
    setfilterDropDown(value);
  };
  const [metaData, setmetaData] = useState();
  const metaDeta = () => {
    instance
      .get("/meta-data")
      .then((response) => {
        setmetaData(response?.data?.data);
        setloading(false);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  };
  // console.log(Object.keys(metaData?.filters),"objjjjjjjjjjjjjjjjjjjjjjjjj");

  useEffect(() => {
    instance
      .get("/website/places?trending=1")
      .then((response) => {
        setTrendingCar(response?.data?.data?.records);
        metaDeta();
        console.log(
          response?.data?.data?.records,
          "response?.data?.data?.recordsresponse?.data?.data?.records"
        );
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  }, []);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  let selectedFilters = [];
  return (
    <Layout>
      {!loading ? (
        <>
          {/* Caurosel starts */}
          <PlacesHeroSlider
            pageTitle="Places"
            data={TrendingCar}
            routeTitle="placeDetails"
          />
          {/* Caurosel ends */}
          <div className="container">
            <div className="filterHeader">
              <div onClick={() => setIsModalOpen(true)}>
                <FilterButton />
              </div>
              <div className="filterByUae">
                <h2>Filter by Emirates</h2>
                <Select
                  className="filterByEmr"
                  bordered={false}
                  defaultValue={
                    filterDropDown
                      ? filterDropDown
                      : metaData?.defaultEmirates[0]?.label
                  }
                  style={{}}
                  onChange={handleChange}
                  options={metaData?.defaultEmirates?.map((item) => ({
                    ...item,
                    value: item?.label,
                    disabled: item?.comingSoon,
                  }))}
                />
              </div>
            </div>
            <Modal
              style={{
                top: 20,
                width: "100%",
              }}
              // okButtonProps={{ style: { display: 'none' } }}
              okText="Apply Filters"
              cancelButtonProps={{ style: { display: "none" } }}
              title="FILTERS"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <FilterModelPlaces
                labels={Object.keys(metaData?.filters)}
                items={metaData?.filters}
                selectedFilters={selectedFilters}
              />
            </Modal>

            {/* Filters starts */}
            <CatogeriesFilter
              // filtersData={filtersData}
              selected={selected}
              setselected={setselected}
              setData={setplacesCard}
              route={"places"}
            />
            <CusineSearch
              selected={selectedCusine}
              setselected={setselectedCusine}
              Data={metaData?.filters?.cuisines}
            />
            {/* Filters ends */}
          </div>

          {/* Places Section start */}

          <section className="card-section-wrapper">
            <div className="container">
              <div className="card-section-title">
                <h2>{selected?.title ? selected?.title : "PLACES"}</h2>
              </div>

              <div className="card-section-content">
                <Row gutter={[24, 24]}>
                  {placesCard?.map((card) => {
                    return (
                      <Col xs={24} sm={8} key={card?.key}>
                        <SecondaryCard data={card} routeTitle={"place"} />
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </section>
          {/* Places Section Ends */}

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
