import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { Card, Modal, message, Checkbox, Typography } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

import { useMapState } from "../context/store";
import { colors } from "../constants/theme";
import { WISH_ADD_MUTATION, WISH_REMOVE_MUTATION } from "../apis/mutations";

const { Title } = Typography;

const WishModal = (props) => {
  const {
    mapState: { user, wishes },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [isCredit, setIsCredit] = useState(false);

  const onCheckbox = (event) => {
    setIsCredit(event.target.checked);
  };

  const [addWish, { loading, error }] = useMutation(WISH_ADD_MUTATION);

  const plainOptions = ["Facebook", "Email", "SMS text message"];
  const [defaultOptions, setDefaultOptions] = useState([]);

  const [note_channels, setNoteChannels] = useState([]);

  const onChecked = (checked) => {
    const channels = checked.map((c, i) => {
      return c
        .replace("Facebook", "facebook")
        .replace("Email", "email")
        .replace("SMS text message", "text");
    });
    setNoteChannels(channels);
  };

  useEffect(() => {
    if (!user || !user.note_channels || !user.note_channels.length) {
      return;
    }
    setDefaultOptions(
      user.note_channels.map((n, i) => {
        return n
          .replace("facebook", "Facebook")
          .replace("email", "Email")
          .replace("text", "SMS text message");
      })
    );
  }, [user]);

  return (
    <Modal
      title="Add to Wishlist"
      centered
      visible={props.visible}
      okText={"Apply"}
      confirmLoading={loading}
      onOk={async () => {
        const input = {
          user: user.id,
          exhibit: props.exhibit.id,
        };

        console.log("input:", input, "note_channels:", note_channels);

        const res = await addWish({
          variables: {
            input,
            note_channels,
          },
        });

        console.log("res.data:", res.data);

        if (res.data.addWish) {
          setMapState({
            type: "addWish",
            wish: props.exhibit.id,
          });
          message.success("Success to add wish list!");
        } else {
          message.error("Failed to add wish list!");
        }

        props.onOk();
      }}
      onCancel={() => props.onCancel()}
    >
      <Title level={4}>
        How would you like to be notified when wishlist item has funded?
      </Title>
      <Checkbox.Group
        defaultValue={defaultOptions}
        options={plainOptions}
        onChange={onChecked}
      />
    </Modal>
  );
};

const UnwishButton = (props) => {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const [removeWish, { loading, error }] = useMutation(WISH_REMOVE_MUTATION);

  return (
    <StarFilled
      style={{ fontSize: 28, color: colors.primary }}
      onClick={async () => {
        const input = {
          user: user.id,
          exhibit: props.exhibit.id,
        };

        const res = await removeWish({
          variables: {
            input,
          },
        });

        console.log("res.data:", res.data);

        if (res.data.removeWish) {
          setMapState({
            type: "removeWish",
            wish: props.exhibit.id,
          });
          message.success("Success to remove from the wish list!");
        } else {
          message.error("Failed to remove from the wish list!");
        }
      }}
    />
  );
};

export { WishModal, UnwishButton };
