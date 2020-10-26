import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { Alert, Avatar, Button, message, Pagination, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { Spinner } from "../Spinner";
import ItemRender from "../ItemRender";

import { NOTES_QUERY } from "../../apis/queries";
import { REMOVE_NOTE_MUTATION } from "../../apis/mutations";

import { IUser, INote } from "../../constants/types";

const { Text } = Typography;

export default function NotesHistory({
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
  const [notes, setNotes] = useState<Array<INote>>([]);
  const [loadings, setLoadings] = useState<Array<boolean>>([]);
  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const [loadData, { loading, error, data }] = useLazyQuery(NOTES_QUERY, {
    variables: { pageArgs, filter, user_id },
    fetchPolicy: "no-cache",
  });

  const [removeNote] = useMutation(REMOVE_NOTE_MUTATION);

  useEffect(() => {
    if (data && data.notes && data.notes.arr) {
      setNotes(data.notes.arr);
      setTotal(data.notes.cnt);

      const lns = [];
      data.notes.arr.map((nf, idx) => {
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
      {!loading && notes && !!notes.length
        ? notes.map((note: INote, idx) => (
            <div className="mb-4 ml-4 flex flex-row justify-between" key={idx}>
              <Text>{new Date(note.created_at).toLocaleDateString()}</Text>
              <Text>{note.content}</Text>
              <Button
                type="primary"
                className="float-right"
                loading={loadings[idx]}
                icon={<DeleteOutlined />}
                onClick={async () => {
                  loadings[idx] = true;
                  const res = await removeNote({
                    variables: {
                      note_id: note.id,
                    },
                  });
                  loadings[idx] = false;

                  if (res.data && res.data.removeNote) {
                    setNotes((notes) =>
                      notes.filter((onf) => onf.id !== note.id)
                    );
                    setLoadings((loadings) =>
                      loadings.filter((lns, idy) => idx !== idy)
                    );
                    message.success("Notification removed!");
                  } else {
                    message.error("Failed to remove notification!");
                  }
                }}
              >
                Remove
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
