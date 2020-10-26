import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Typography, Alert, Pagination } from "antd";
import { FacebookProvider, EmbeddedPost, Feed } from "react-facebook";
import { GoogleOutlined, GoogleCircleFilled } from "@ant-design/icons";

import { useMapState } from "../../context/store";
import { FB_POSTS_QUERY } from "../../apis/queries";
import { Spinner } from "../Spinner";
import ItemRender from "../../components/ItemRender";
import { IFBPost } from "../../constants/types";

const { Title, Text } = Typography;

export default function FacebookAffiliate() {
  const router = useRouter();
  const {
    mapState: { user },
    setMapState,
  } = useMapState();

  const handleChange = (a) => {
    console.log("::", a);
  };

  const shared_url = "https://exhibia.vercel.app";
  const page_id = "117959396666911";

  const [fb_posts, setFBPosts] = useState<Array<IFBPost>>([]);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState({
    key: "",
    sort: "",
    cat: "",
  });

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    pageSize: 10,
  });

  const pageArgs = {
    skip: (pageInfo.currentPage - 1) * pageInfo.pageSize,
    take: pageInfo.pageSize,
  };

  const { loading, error, data } = useQuery(FB_POSTS_QUERY, {
    variables: { pageArgs, filter },
  });

  useEffect(() => {
    if (data && data.fb_posts && data.fb_posts.arr) {
      setFBPosts(data.fb_posts.arr);
      setTotal(data.fb_posts.cnt);
    }
  }, [data]);

  return (
    <>
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />
      <FacebookProvider appId={process.env.FACEBOOK_ID}>
        {!loading && (
          <div className="flex flex-wrap gap-4 justify-between">
            {fb_posts &&
              fb_posts.map((p, idx) => (
                <div className="w-1/5" key={idx}>
                  <EmbeddedPost href={p.permalink_url} width="auto" />
                </div>
              ))}
          </div>
        )}
      </FacebookProvider>
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
