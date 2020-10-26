import React, { useState, useEffect } from "react";
import { Alert, Avatar, Typography } from "antd";

import { IUser, IFriendDate } from "../../constants/types";

const { Title, Text } = Typography;

export default function MyFriends({ user }: { user: IUser }) {
  return (
    <>
      {user && !!user.friends && user.friends.length
        ? user.friends.map((nf: IFriendDate, idx) => (
            <div className="w-1/2 mb-4 ml-4" key={idx}>
              <Avatar src={nf.friend.avatar} className="mr-4" size="large" />
              <Text>{nf.friend.username}</Text>
            </div>
          ))
        : null}
    </>
  );
}
