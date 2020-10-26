import React, { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Divider, Input, Modal, Select } from "antd";
import { SendOutlined, PlusOutlined } from "@ant-design/icons";
import LinesEllipsisLoose from "react-lines-ellipsis/lib/loose";

import { useMapState } from "../context/store";

const { Option } = Select;

const AdminNoteModal = ({
  visible,
  auction,
  msg,
  setMessage,
  addMessage,
  onOk,
  onCancel,
}) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [current, setCurrent] = useState(-1);
  const [prefix, setPrefix] = useState("");
  const [items, setItems] = useState([
    "1 bonus bid",
    "2 bonus bid",
    "3 bonus bid",
  ]);
  const [name, setName] = useState("");

  const addItem = () => {
    setItems([...items, name]);
    setName("");
  };

  const onSend = () => {
    if (!msg) return;

    const message = {
      room_id: auction.id,
      user_id: user.id,
      username: user.username ? user.username : user.email,
      avatar: user.avatar,
      content: prefix
        ? `<div><span style="color:blue;font-wight:bold">@${prefix}</span>, ${msg}</div>`
        : msg,
      created_at: new Date(),
    };

    addMessage({ variables: { message } });

    setMapState({
      type: "addMessage",
      message,
    });

    setMessage("");
  };

  return (
    <Modal
      title={
        <div>
          Send Personal Message to the{" "}
          <span className="text-blue-700">{prefix ? prefix : "bidder"}</span>
        </div>
      }
      centered
      visible={visible}
      footer={[]}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div style={{ maxHeight: 400 }} className="overflow-y-auto">
        {auction.bidders.map((b, i) => (
          <div
            key={i}
            className={`p-2 mx-auto flex flex-row gap-2 items-center ${
              current === i ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setCurrent(i);
              setPrefix(b.user.username);
            }}
          >
            <Avatar src={auction.bidders.length > 0 ? b.user.avatar : ""} />
            <LinesEllipsisLoose
              text={auction.bidders.length > 0 ? b.user.username : ""}
              maxLine="1"
              lineHeight="16"
              className="font-bold"
            />
          </div>
        ))}
      </div>
      <div className="w-full flex mt-4">
        <Select
          value={msg}
          onChange={(v) => {
            setMessage(v);
          }}
          className="w-full"
          placeholder="select message"
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                <Input
                  style={{ flex: "auto" }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <a
                  style={{
                    flex: "none",
                    padding: "8px",
                    display: "block",
                    cursor: "pointer",
                  }}
                  onClick={addItem}
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )}
        >
          {items.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={onSend}>
          <SendOutlined />
        </Button>
      </div>
    </Modal>
  );
};

export default AdminNoteModal;
