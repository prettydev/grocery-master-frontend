import React from "react";
import Link from "next/link";
import { Typography, Space } from "antd";

const { Title, Text } = Typography;

interface IProps {
  title: string;
  subtitle?: string;
  link?: string;
}

export default function TitleBar(props: IProps) {
  const { title, subtitle, link } = props;
  return (
    <div className="flex flex-row gap-4 items-center">
      <Title level={2}>{title}</Title>
      {link && (
        <Text>
          <Link href={link}>
            <a>{subtitle}</a>
          </Link>
        </Text>
      )}
    </div>
  );
}
