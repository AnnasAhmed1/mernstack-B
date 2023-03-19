import React from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";

const FilterButton = () => {
  return (
    <Button className="filterButton" icon={<FilterOutlined />}>
      Filter
    </Button>
  );
};

export default FilterButton;
