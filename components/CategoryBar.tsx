import React from "react";
import { Breadcrumb, Typography } from "antd";

const { Text } = Typography;

export default function CategoryBar(props) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Text>
          {props.categories
            .map((category, i) => {
              if (i > 0) return category.name;
            })
            .join(" > ")
            .slice(3)}
        </Text>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
