import React from "react";
import { Drawer, Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const GlobalSearch = ({ isDrawerVisible, toggleDrawer }) => {
  const [form] = Form.useForm();

  const windowWidth = window.innerWidth;

  // methods
  const handleSearch = (values) => {
    console.log("values", values);
  };

  return (
    <Drawer
      className="global-search-drawer"
      placement="top"
      height={windowWidth > 992 ? "28%" : "9%"}
      closable={false}
      onClose={toggleDrawer}
      open={isDrawerVisible}
    >
      <div className="global-search-container">
        {/* form starts */}
        <Form form={form} onFinish={handleSearch}>
          <Form.Item name="search">
            <Input className="search-input" placeholder="SEARCH" />
          </Form.Item>

          <Button htmlType="submit" className="search-btn">
            <SearchOutlined />
          </Button>
        </Form>
        {/* form ends */}
      </div>
    </Drawer>
  );
};

export default GlobalSearch;
