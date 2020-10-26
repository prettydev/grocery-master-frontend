import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Checkbox, message, Space, Typography } from "antd";

import { useMapState } from "../../context/store";
import {
  CHANGE_NOTE_CHANNELS_MUTATION,
  CHANGE_NOTE_CASES_MUTATION,
} from "../../apis/mutations";

const { Text } = Typography;

const channelOptions = [
  { value: "facebook", label: "Facebook message" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text message" },
  // { value: "note", label: "Notification" },
];
const caseOptions = [
  { value: "win", label: "I win an auction" },
  { value: "outbid", label: "My bid is outbidden" },
  { value: "opened", label: "New auction is opened" },
  { value: "lowered", label: "Auction tick timer is lowered" },
  { value: "changed", label: "Auction state is changed" },
  { value: "shipped", label: "My item has been shipped" },
];

export default function Settings() {
  const {
    mapState: { user },
  } = useMapState();

  const [changeNoteChannels] = useMutation(CHANGE_NOTE_CHANNELS_MUTATION);
  const [changeNoteCases] = useMutation(CHANGE_NOTE_CASES_MUTATION);

  // need to setup from user....
  const [checkedChannelOptions, setCheckedChannelOptions] = useState(
    user && user.note_channels ? user.note_channels : []
  );
  // need to setup from user....
  const [checkedCaseOptions, setCheckedCaseOptions] = useState(
    user && user.note_cases ? user.note_cases : []
  );

  const channelProc = async (checkedList) => {
    if (!user) return;
    console.log(checkedList);

    const res = await changeNoteChannels({
      variables: {
        user_id: user.id,
        note_channels: checkedList,
      },
    });

    console.log(res.data);

    if (
      res.data.changeNoteChannels &&
      res.data.changeNoteChannels.code === "success"
    ) {
      message.success(res.data.changeNoteChannels.message);
    } else {
      message.error(res.data.changeNoteChannels.message);
    }
  };

  const casesProc = async (checkedList) => {
    if (!user) return;
    console.log(checkedList);

    const res = await changeNoteCases({
      variables: {
        user_id: user.id,
        note_cases: checkedList,
      },
    });

    console.log(res.data);
    if (
      res.data.changeNoteCases &&
      res.data.changeNoteCases.code === "success"
    ) {
      message.success(res.data.changeNoteCases.message);
    } else {
      message.error(res.data.changeNoteCases.message);
    }
  };

  return (
    <Space direction="vertical">
      <Text strong>Please send me Notifications via:</Text>
      <Checkbox.Group
        value={checkedChannelOptions}
        onChange={(checkedList) => {
          setCheckedChannelOptions(checkedList);
          channelProc(checkedList);
        }}
      >
        <Space direction="vertical">
          {channelOptions.map((c, idx) => (
            <Checkbox value={c.value} key={idx}>
              {c.label}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>

      <Text strong>Please send me Notifications in case: </Text>
      <Checkbox.Group
        value={checkedCaseOptions}
        onChange={(checkedList) => {
          setCheckedCaseOptions(checkedList);
          casesProc(checkedList);
        }}
      >
        <Space direction="vertical">
          {caseOptions.map((c, idx) => (
            <Checkbox value={c.value} key={idx}>
              {c.label}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Space>
  );
}
