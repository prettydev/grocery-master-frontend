import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  Alert,
  Avatar,
  Button,
  message,
  Pagination,
  Space,
  Tag,
  Typography,
} from "antd";

import { Spinner } from "../Spinner";
import ItemRender from "../ItemRender";

import { RECV_FRIEND_REQUESTS_QUERY } from "../../apis/queries";
import {
  FRIEND_DENY_MUTATION,
  FRIEND_CONFIRM_MUTATION,
} from "../../apis/mutations";

import { IUser, IFriend } from "../../constants/types";

const { Title, Text } = Typography;

export default function RecvRequests({
  user,
  render,
}: {
  user: IUser;
  render: number;
}) {
  const [filter, setFilter] = useState({
    key: "",
    sort: "",
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const [user_id, setUserId] = useState("");
  const [recvRequests, setRecvRequests] = useState<Array<IFriend>>([]);
  const [confirm_loadings, setConfirmLoadings] = useState<Array<boolean>>([]);
  const [deny_loadings, setDenyLoadings] = useState<Array<boolean>>([]);
  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadData, { called, error, loading, data }] = useLazyQuery(
    RECV_FRIEND_REQUESTS_QUERY,
    {
      variables: { pageArgs, filter, user_id },
      fetchPolicy: "no-cache",
    }
  );

  const [confirmFriend] = useMutation(FRIEND_CONFIRM_MUTATION);
  const [denyFriend] = useMutation(FRIEND_DENY_MUTATION);

  const confirmProc = async (friend: IFriend, idx: number) => {
    console.log("confirming...", friend.id);
    confirm_loadings[idx] = true;
    const res = await confirmFriend({
      variables: {
        id: friend.id,
      },
    });
    confirm_loadings[idx] = false;

    if (res.data && res.data.confirmFriend) {
      setRecvRequests((recvRequests) =>
        recvRequests.filter((r: IFriend) => r.id !== friend.id)
      );
      message.success("Approved friend!");
    } else {
      message.error("Failed to approve friend!");
    }
  };

  const denyProc = async (friend: IFriend, idx: number) => {
    console.log("denying...", friend.id);

    deny_loadings[idx] = true;
    const res = await denyFriend({
      variables: {
        id: friend.id,
      },
    });
    deny_loadings[idx] = false;

    if (res.data && res.data.denyFriend) {
      setRecvRequests((recvRequests) =>
        recvRequests.map((r: IFriend) => {
          if (r.id === friend.id) r.state = 1;
          return r;
        })
      );
      message.success("Friend request denied!");
    } else {
      message.error("Failed to deny friend request!");
    }
  };

  useEffect(() => {
    if (data && data.recvFriendRequests && data.recvFriendRequests.arr) {
      setRecvRequests(data.recvFriendRequests.arr);
      setTotal(data.recvFriendRequests.cnt);

      const lns = [];
      data.recvFriendRequests.arr.map((nf, idx) => {
        lns[idx] = false;
      });

      setConfirmLoadings(lns);
      setDenyLoadings(lns);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [render]);

  return (
    <>
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />
      {!loading && recvRequests && !!recvRequests.length
        ? recvRequests.map((rr: IFriend, idx) => (
            <div className="w-1/2 mb-4 ml-4" key={idx}>
              {/* <Text>
                {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
              </Text> */}
              <Avatar src={rr.sender.avatar} className="mr-4" size="large" />
              <Text>{rr.sender.username}</Text>
              <div className="text-right">
                <Space>
                  <Button
                    loading={confirm_loadings[idx]}
                    type="primary"
                    onClick={() => confirmProc(rr, idx)}
                  >
                    Confirm
                  </Button>
                  {rr.state === 0 ? (
                    <Button
                      loading={deny_loadings[idx]}
                      onClick={() => denyProc(rr, idx)}
                    >
                      Deny
                    </Button>
                  ) : (
                    <Tag color="error">Denied</Tag>
                  )}
                </Space>
              </div>
            </div>
          ))
        : null}
      <div className="text-center pt-4">
        <Pagination
          total={total}
          current={pageInfo.currentPage}
          itemRender={ItemRender}
          showSizeChanger={false}
          onChange={(currentPage, pageSize) => {
            setPageInfo({ currentPage, pageSize });
          }}
          defaultPageSize={pageInfo.pageSize}
        />
      </div>
    </>
  );
}
