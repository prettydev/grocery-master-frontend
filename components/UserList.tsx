import React, { useEffect, useState } from "react";
import { Divider, List, Typography } from "antd";
import ProfileAvatar from "./ProfileAvatar";
import { IUserValue } from "../constants/types";

const { Text } = Typography;

export default function UserList(props) {
  const { data, title } = props;
  const [custom_class, setCustomClass] = useState("");

  return (
    <div className="text-center p-4">
      <Divider orientation="left">{title}</Divider>
      <List
        size="small"
        dataSource={data}
        className="ml-4"
        renderItem={(item: IUserValue, idx) => (
          <List.Item key={idx}>
            <div className="flex flex-row justify-between w-full items-center">
              <ProfileAvatar src={item.user.avatar} size="sm" />
              <div className="flex flex-row">
                <Text>{item.user.username}</Text>(<Text>{item.value}</Text>)
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
