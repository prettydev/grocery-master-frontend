import React, { useState, useEffect } from "react";

import { Button, Drawer, Input, Select } from "antd";
import { static_categories } from "../constants/categories";
import Category from "./Category";

const { Search } = Input;
const { Option } = Select;

export default function Filter({ filter, setFilter, clearFilter, kind }) {
  const [key, setKey] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setKey(filter.key);
  }, [filter.key]);

  useEffect(() => {
    setCat(filter.cat);
  }, [filter.cat]);

  useEffect(() => {
    setSort(filter.sort);
  }, [filter.sort]);

  return (
    <>
      <div className="mb-8 flex flex-row justify-around gap-12">
        <Button
          onClick={() => {
            setDrawerOpen(!drawerOpen);
          }}
        >
          {drawerOpen ? "Hide Categories" : "Show Categories"}
        </Button>
        <Search
          value={key}
          className="w-1/4"
          placeholder="input search text"
          onChange={(e) => setKey(e.target.value)}
          onSearch={(value) => {
            setFilter({ ...filter, key: value });
          }}
          enterButton
        />

        {static_categories && (
          <Select
            value={cat}
            className="w-1/4"
            onChange={(v) => {
              setFilter({ ...filter, cat: v });
              setCat(v);
            }}
          >
            <Option key={"All"} value={"All"}>
              {"All"}
            </Option>
            {static_categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        )}
        <Select
          className="w-1/4"
          value={sort}
          style={{ width: 220 }}
          onChange={(v) => {
            setFilter({ ...filter, sort: v });
            setSort(v);
          }}
        >
          {kind === "winner" && <Option value="latest">Latest</Option>}
          {kind === "winner" && <Option value="oldest">Oldest</Option>}
          <Option value="lowest">Lowest Price</Option>
          <Option value="highest">Highest Price</Option>
          {kind === "auction" && <Option value="soon">Ending Soon</Option>}
          {kind === "auction" && <Option value="manual">Manual</Option>}
          {kind === "exhibit" && <Option value="most">Most Funds</Option>}
          {kind === "exhibit" && <Option value="fewest">Fewest Funds</Option>}
        </Select>
      </div>
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setDrawerOpen(!drawerOpen)}
        visible={drawerOpen}
        getContainer={false}
        style={{ position: "fixed" }}
      >
        <Category
          filter={filter}
          setFilter={setFilter}
          clearFilter={clearFilter}
        />
      </Drawer>
    </>
  );
}
