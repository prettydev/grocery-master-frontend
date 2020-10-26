import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Pagination } from "antd";

import { useMapState } from "../../context/store";
import MainLayout from "../../layouts/MainLayout";
import { Spinner } from "../../components/Spinner";
import ItemRender from "../../components/ItemRender";
import ProfileBar from "../../components/ProfileBar";

import { LISTINGS_QUERY } from "../../apis/queries";

export default function Listings() {
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const [filter, setFilter] = useState({
    key: "",
    sort: "highest",
    cat: "All",
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 12,
  });

  const [total, setTotal] = useState(0);

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const { loading, error, data } = useQuery(LISTINGS_QUERY, {
    variables: { pageArgs, filter, user_id: user ? user.id : "" },
  });

  useEffect(() => {
    if (data && data.wishes && data.wishes.arr) {
      setTotal(data.wishes.cnt);
    }
  }, [data]);

  return (
    <MainLayout>
      <ProfileBar title="My Listings" />
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">View</th>
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
            data.wishes &&
            data.wishes.arr &&
            data.wishes.arr.map((w, idx) => (
              <tr>
                {/* <td className="border px-4 py-2">
                  {(pageInfo.currentPage - 1) * pageInfo.pageSize + idx + 1}
                </td> */}
                <td className="border px-4 py-2">
                  <img
                    src={w.exhibit.product.image}
                    className="object-contain h-10"
                  />
                </td>
                <td className="border px-4 py-2">{w.exhibit.product.title}</td>
                <td className="border px-4 py-2">
                  {new Date(w.created_at).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
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
          }}
          defaultPageSize={pageInfo.pageSize}
        />
      </div>
    </MainLayout>
  );
}
