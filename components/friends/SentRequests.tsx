import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import {
  Alert,
  Avatar,
  Button,
  message,
  Pagination,
  Tag,
  Typography,
} from "antd";

import { Spinner } from "../Spinner";
import ItemRender from "../ItemRender";

import { SENT_FRIEND_REQUESTS_QUERY } from "../../apis/queries";
import { FRIEND_REQUEST_MUTATION } from "../../apis/mutations";

import { IUser, IFriend } from "../../constants/types";

const { Title, Text } = Typography;

export default function SentRequests({
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
  const [sentRequests, setSentRequests] = useState<Array<IFriend>>([]);
  const [loadings, setLoadings] = useState<Array<boolean>>([]);
  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadData, { called, error, loading, data }] = useLazyQuery(
    SENT_FRIEND_REQUESTS_QUERY,
    {
      variables: { pageArgs, filter, user_id },
      fetchPolicy: "no-cache",
    }
  );

  const [requestFriend] = useMutation(FRIEND_REQUEST_MUTATION);

  useEffect(() => {
    if (data && data.sentFriendRequests && data.sentFriendRequests.arr) {
      setSentRequests(data.sentFriendRequests.arr);
      setTotal(data.sentFriendRequests.cnt);

      const lns = [];
      data.sentFriendRequests.arr.map((nf, idx) => {
        lns[idx] = false;
      });

      setLoadings(lns);
    }
    console.log(data, ":my requests data");
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
      {!loading && sentRequests && !!sentRequests.length
        ? sentRequests.map((sr: IFriend, idx) => (
            <div className="w-1/2 mb-4 ml-4" key={idx}>
              {/* <Text>
                {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
              </Text> */}
              <Avatar src={sr.receiver.avatar} className="mr-4" size="large" />
              <Text>{sr.receiver.username}</Text>
              <div className="text-right">
                {sr.state === 0 ? (
                  <Tag color="processing">Pending</Tag>
                ) : (
                  <Tag color="error">Denied</Tag>
                )}
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
