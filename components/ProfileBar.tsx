import React from "react";
import Link from "next/link";
import { Space, Typography } from "antd";

const { Text } = Typography;

export default function ProfileBar(props) {
  const { title } = props;
  return (
    <Text>
      <Space className="mb-4">
        <Link href={"/profile"}>
          <a className="text-xl">My Profile</a>
        </Link>
        <a className="text-xl">{`>`}</a>
        <a className="text-xl">{`${title}`}</a>
      </Space>
    </Text>
  );
}
