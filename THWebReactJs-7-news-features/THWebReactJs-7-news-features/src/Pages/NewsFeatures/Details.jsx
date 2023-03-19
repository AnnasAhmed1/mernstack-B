
import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Index";

import DetailsHeader from "./../../Components/Common/DetailsHeader";
import instance from "../../Services/Axois";
import { useLocation } from "react-router-dom";

const Details = () => {
  // states
  const [data, setData] = useState([]);
  const currentRoute = useLocation().pathname;

  // use effect
  useEffect(() => {
    instance
      .get(`/website${currentRoute}`)
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((response) => {
        console.log(response, "responseresponse");
      });
  }, []);

  return (
    <Layout>
      {/* Slider Starts */}
      {/* Slider Ends */}

      <div className="container">
        <DetailsHeader />
      </div>
    </Layout>
  );
};

export default Details;
