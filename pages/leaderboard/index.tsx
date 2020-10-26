import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { message, Pagination } from "antd";

import { useMapState } from "../../context/store";

import MainLayout from "../../layouts/MainLayout";
import TitleBar from "../../layouts/TitleBar";

import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";

export default function Leaderboard() {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const router = useRouter();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  const fetch = async ({ currentPage, pageSize }) => {
    setLoading(true);

    const res = await axios.post(`${process.env.API_URL}users/leaders`, {
      pageArgs: {
        take: pageSize,
        skip: (currentPage - 1) * pageSize,
      },
      filter: {
        key: "",
        sort: "",
        cat: "",
      },
    });

    if (res.data) {
      setLoading(false);
      setData(res.data.arr);
      setTotal(res.data.cnt);
    } else {
      message.error("Error");
    }
  };

  useEffect(() => {
    fetch(pageInfo);
  }, []);

  return (
    <MainLayout>
      <TitleBar title={"Leaderboard"} />
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Ranking</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Member Since</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5} className="border px-4 py-2">
                <Spinner loading={loading} />
              </td>
            </tr>
          )}
          {!loading &&
            data &&
            data.map((d, idx) => (
              <tr>
                <td className="border px-4 py-2">
                  {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
                </td>
                <td className="border px-4 py-2">{d.username}</td>
                <td className="border px-4 py-2">{d.email}</td>
                <td className="border px-4 py-2">{d.points}</td>
                <td className="border px-4 py-2">
                  {new Date(d.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", paddingTop: 50 }}>
        <Pagination
          total={total}
          current={pageInfo.currentPage}
          itemRender={ItemRender}
          showSizeChanger={false}
          onChange={(currentPage, pageSize) => {
            setPageInfo({ currentPage, pageSize });
            fetch({ currentPage, pageSize });
          }}
          defaultPageSize={pageInfo.pageSize}
        />
      </div>
    </MainLayout>
  );
}
