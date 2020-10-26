import React, { useState, useEffect } from "react";

import { Button, Tree } from "antd";
import { categoryData } from "../constants/categories";
import { CloseCircleOutlined } from "@ant-design/icons";

export const Category = ({ filter, setFilter, clearFilter }) => {
  const [cat, setCat] = useState("");

  const onSelect = (selectedKeys, info) => {
    setFilter({ ...filter, cat: selectedKeys[0] });
    setCat(selectedKeys[0]);
  };

  useEffect(() => {
    setCat(filter.cat);
  }, [filter.cat]);

  return (
    <div className="flex flex-col gap-8 mt-24">
      <Button
        type="primary"
        className="flex flex-row items-center justify-center w-3/4 ml-auto mr-auto"
        onClick={clearFilter}
      >
        <CloseCircleOutlined />
        Clear all filters
      </Button>
      <Tree selectedKeys={[cat]} onSelect={onSelect} treeData={categoryData} />
    </div>
  );
};

export default Category;
