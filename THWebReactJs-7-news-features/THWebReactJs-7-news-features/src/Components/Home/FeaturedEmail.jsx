import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, notification, message } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import HuntrLogo from "../../Assets/logo/huntr-icon-black.png";

const FeaturedEmail = () => {
  const [form] = Form.useForm();

  // methods
  const handleEmailSubmit = (values) => {
    console.log("Email submit", values);
    message.success("Send Successfully");
    form.resetFields();
  };

  const openNotification = () => {
    notification.open({
      key: "featured-email",
      closeIcon: <CloseCircleOutlined />,
      message: null,
      placement: "bottomRight",
      description: (
        <>
          <div className="featured-email-container">
            <div className="featured-title">
              <h1>
                <div className="featured-img">
                  <img src={HuntrLogo} alt="Huntr" />
                  Join
                </div>
                <span>the HUNTR!</span>
              </h1>
            </div>

            <h2>
              Get the best of your city <br /> straight to your inbox
            </h2>

            {/* form starts */}
            <Form form={form} onFinish={handleEmailSubmit}>
              <Form.Item name="email">
                <Input
                  className="email-input"
                  placeholder="Enter your email address"
                />
              </Form.Item>

              <Button htmlType="submit" className="send-btn">
                <RightOutlined />
              </Button>

              <Form.Item name="terms" valuePropName="checked">
                <Checkbox>
                  I agree with the privacy policy and terms of use.
                </Checkbox>
              </Form.Item>
            </Form>
          </div>
        </>
      ),
      duration: 0,
      style: {
        backgroundColor: "#d9d9d9",
        borderTopLeftRadius: "50%",
        width: "320px",
        height: "420px",
      },
    });
  };

  useEffect(() => {
    openNotification();
  });

  return <div></div>;
};

export default FeaturedEmail;
