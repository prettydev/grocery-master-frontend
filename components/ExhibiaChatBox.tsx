import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { Avatar, Input, List, Space, Tooltip, Typography } from "antd";
import moment from "moment";
import { SendOutlined, MessageFilled, CloseOutlined } from "@ant-design/icons";

import { useMapState } from "../context/store";
import { colors } from "../constants/theme";
import { ADD_MESSAGE_MUTATION } from "../apis/mutations";

const { Search } = Input;
const { Title, Text } = Typography;

const Button = ({ open, onClick }) => (
  <div
    onClick={onClick}
    className={`button ${open ? "button--open" : "button--closed"}`}
    style={{ background: colors.primary, textAlign: "center" }}
  >
    {open ? (
      <CloseOutlined style={{ fontSize: 30 }} />
    ) : (
      <MessageFilled style={{ fontSize: 30 }} />
    )}
  </div>
);

const ExhibiaChatBox = (props) => {
  const {
    mapState: { user, messages },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const toggleDemo = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE_MUTATION);

  return (
    <div className={`wrapper ${open ? "wrapper--open" : ""}`}>
      {open && (
        <div className="p-2 max-w-md bg-gray-200">
          <Title
            level={4}
            style={{
              background: colors.primary,
              color: "white",
            }}
            className="p-4 -m-2"
          >
            Exhibia Chat
          </Title>

          <List
            dataSource={messages.filter(
              (m) =>
                m.room_id ===
                (router.query.auction ? router.query.auction : "public")
            )}
            style={{
              maxHeight: 500,
              WebkitOverflowScrolling: "touch",
            }}
            className="flex flex-col-reverse overflow-y-auto flex-grow"
            renderItem={(item) => (
              <li>
                <Space className="w-full" direction="vertical">
                  <Space
                    className="flex w-full"
                    style={{
                      flexDirection:
                        item.user_id === user.id ? "row-reverse" : "row",
                    }}
                  >
                    <Avatar src={item.avatar} />
                    <Text>{item.username}</Text>
                    <Tooltip
                      title={moment(item.created_at).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    >
                      <span
                        style={{
                          fontStyle: "italic",
                          color: "#999",
                        }}
                        className="pr-4"
                      >
                        {moment(item.created_at).fromNow()}
                      </span>
                    </Tooltip>
                  </Space>

                  <p
                    className="mb-2 mt-2 ml-10 mr-10 p-2 rounded-lg"
                    style={
                      item.user_id === user.id
                        ? {
                            textAlign: "right",
                            background: colors.bg,
                          }
                        : {
                            color: colors.bg,
                            background: colors.primary,
                          }
                    }
                  >
                    {parse(item.content)}
                  </p>
                </Space>
              </li>
            )}
          />

          <Search
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type the message!"
            className="pt-2"
            onSearch={(value) => {
              if (!value) return;

              const message = {
                room_id: router.query.auction ? router.query.auction : "public",
                user_id: user.id,
                username: user.username ? user.username : user.email,
                avatar: user.avatar,
                content: value,
                created_at: new Date(),
              };

              addMessage({ variables: { message } });

              setMapState({
                type: "addMessage",
                message,
              });

              setMessage("");
            }}
            enterButton={<SendOutlined />}
          />
        </div>
      )}
      <Button onClick={toggleDemo} open={open} />
    </div>
  );
};

export default ExhibiaChatBox;
