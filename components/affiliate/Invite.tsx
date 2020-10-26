import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Button, Input, message, Space, Table, Typography } from "antd";
import { GoogleOutlined, GoogleCircleFilled } from "@ant-design/icons";
import GoogleContacts from "react-google-contacts";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useMapState } from "../../context/store";
import { SEND_EMAIL_MUTATION } from "../../apis/mutations";

const { Title, Text } = Typography;

export default function Invite() {
  const router = useRouter();
  const {
    mapState: { user, contacts },
    setMapState,
  } = useMapState();

  const [loading, setLoading] = useState<boolean>(false);
  const [loadings, setLoadings] = useState(new Map());

  const [sendEmail] = useMutation(SEND_EMAIL_MUTATION);

  const onCopy = () => {
    message.success("Copied!");
  };

  const onInvite = async (record) => {
    console.log(record);

    if (!record || !record.email || !record.ref) {
      console.error("Wrong affiliate record!");
      return;
    }

    setLoadings((loadings) => {
      loadings.set(record.email, true);
      return loadings;
    });
    const res = await sendEmail({
      variables: {
        receivers: [record.email],
        content: record.ref,
      },
    });
    setLoadings((loadings) => {
      loadings.set(record.email, false);
      return loadings;
    });

    if (res.data.sendEmail) {
      message.info(`Sent the affiliate link to ${record.email}`);
    } else {
      message.error(`Failed to send the affiliate link to ${record.email}`);
    }
  };

  const responseCallback = (response) => {
    if (!response || !response.length) {
      return;
    }
    setLoading(false);
    setMapState({
      type: "setContacts",
      contacts: response.map((r, key) => {
        return {
          key,
          ...r,
          ref: process.env.SITE + "/auth/register?ref=" + user.id,
        };
      }),
    });

    setLoadings((loadings) => {
      response.map((r, key) => {
        loadings.set(r.email, false);
      });
      return loadings;
    });
  };

  const columns = [
    {
      title: "Contact Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Send Invitation",
      dataIndex: "ref",
      key: "invite",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => onInvite(record)}
            loading={loadings.get(record.email)}
          >
            Send Invitation
          </Button>
        </Space>
      ),
    },
    {
      title: "Invitation Link",
      dataIndex: "ref",
      key: "copy",
      render: (text, record) => (
        <div className="flex flex-row">
          <CopyToClipboard onCopy={onCopy} text={text}>
            <Button type="primary">Copy</Button>
          </CopyToClipboard>
          <Input
            value={text}
            readOnly
            className="w-full"
            style={{ width: "100%" }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "space-between",
        }}
      >
        <Title level={4}>Invite Friends and earn Points</Title>
        <GoogleContacts
          clientId={process.env.GOOGLE_ID}
          render={(renderProps) => (
            <Button
              block
              type="primary"
              onClick={() => {
                setLoading(true);
                renderProps.onClick();
              }}
              icon={<GoogleOutlined />}
            >
              IMPORT GOOGLE CONTACTS
            </Button>
          )}
          onSuccess={responseCallback}
          onFailure={responseCallback}
        />
      </Space>
      <Table columns={columns} dataSource={contacts} loading={loading} />
    </>
  );
}
