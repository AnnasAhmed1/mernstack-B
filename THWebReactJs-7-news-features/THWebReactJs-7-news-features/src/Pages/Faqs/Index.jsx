import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import Layout from "../../Layout/Index";
import instance from "../../Services/Axois";

const { Panel } = Collapse;

const Index = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    instance
      .get("/faqs")
      .then((response) => {
        setFaqData(response?.data?.data?.records);
      })
      .catch((response) => {
        console.log(response, "response");
      });
  }, []);

  return (
    <Layout>
      <div className="faq-wrapper">
        <div className="container">
          <h1>FAQ's</h1>

          <div className="faq-collapse">
            <Collapse
              defaultActiveKey={["1"]}
              bordered={false}
              expandIcon={(panelProps) =>
                panelProps?.isActive ? (
                  <UpOutlined className="custom-icon" />
                ) : (
                  <DownOutlined className="custom-icon" />
                )
              }
              expandIconPosition="end"
            >
              {faqData?.map((data) => {
                return (
                  <Panel header={data?.question} key={data?.id}>
                    <p>{data?.answer}</p>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
