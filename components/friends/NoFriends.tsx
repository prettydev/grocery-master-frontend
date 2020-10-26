import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { Alert, Avatar, Button, message, Pagination, Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";

import { NOFRIENDS_QUERY } from "../../apis/queries";
import { FRIEND_REQUEST_MUTATION } from "../../apis/mutations";

import { IUser } from "../../constants/types";

const { Title, Text } = Typography;

export default function NoFriends({
  user,
  render,
}: {
  user: IUser;
  render: number;
}) {
  const [filter, setFilter] = useState({
    key: "",
    sort: "points",
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const [user_id, setUserId] = useState("");
  const [noFriends, setNoFriends] = useState<Array<IUser>>([]);
  const [loadings, setLoadings] = useState<Array<boolean>>([]);
  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadData, { loading, error, data }] = useLazyQuery(NOFRIENDS_QUERY, {
    variables: { pageArgs, filter, user_id },
    fetchPolicy: "no-cache",
  });

  const [requestFriend] = useMutation(FRIEND_REQUEST_MUTATION);

  useEffect(() => {
    if (data && data.nofriends && data.nofriends.arr) {
      setNoFriends(data.nofriends.arr);
      setTotal(data.nofriends.cnt);

      const lns = [];
      data.nofriends.arr.map((nf, idx) => {
        lns[idx] = false;
      });

      setLoadings(lns);
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
      {!loading && noFriends && !!noFriends.length
        ? noFriends.map((nf: IUser, idx) => (
            <div className="w-1/2 mb-4 ml-4" key={idx}>
              {/* <Text>
                {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
              </Text> */}
              <Avatar src={nf.avatar} className="mr-4" size="large" />
              <Text>{nf.username}</Text>
              <Button
                type="primary"
                className="float-right"
                loading={loadings[idx]}
                icon={<UserAddOutlined />}
                onClick={async () => {
                  /// create frid info with (sender:me, receiver: nf, state: 0)
                  //0: created, 1. denied,
                  //accept: remove form friend and add to user(both)'s friends

                  const input = { sender: user.id, receiver: nf.id };

                  loadings[idx] = true;
                  const res = await requestFriend({
                    variables: {
                      input,
                    },
                  });
                  loadings[idx] = false;

                  if (res.data && res.data.requestFriend) {
                    setNoFriends((noFriends) =>
                      noFriends.filter((onf) => onf.id !== nf.id)
                    );
                    setLoadings((loadings) =>
                      loadings.filter((lns, idy) => idx !== idy)
                    );
                    message.success("Friend requested!");
                  } else {
                    message.error("Failed to request friend!");
                  }
                }}
              >
                Add Friend
              </Button>
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
