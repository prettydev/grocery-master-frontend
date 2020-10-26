import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Alert, Carousel, Divider } from "antd";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";

import { colors } from "../constants/theme";
import useWindowSize from "../hooks/useWindowSize";
import TitleBar from "../layouts/TitleBar";
import TopPrefundedExhibit from "../components/TopPrefundedExhibit";
import Auction4FundUser from "../components/Auction4FundUser";
import { Spinner } from "../components/Spinner";
import { useMapState } from "../context/store";
import { TOP_EXHIBITS_QUERY } from "../apis/queries";
import { IExhibit } from "../constants/types";

const FundCarousel = () => {
  const {
    mapState: { user, exhibitRefresh },
  } = useMapState();

  const size = useWindowSize();

  const [top_exhibits, setTopExhibits] = useState<IExhibit[]>([]);

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ display: "block", background: colors.primary }}
        onClick={onClick}
      >
        <RightSquareOutlined style={{ color: "white", fontSize: 20 }} />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          display: "block",
          background: colors.primary,
        }}
        onClick={onClick}
      >
        <LeftSquareOutlined style={{ color: "white", fontSize: 20 }} />
      </div>
    );
  };

  const getSlideCount = () => {
    let count = 4;
    if (size.width >= 1600)
      //xxl
      count = 4;
    else if (size.width >= 1200 && size.width < 1600)
      //xl
      count = 6;
    else if (size.width >= 992 && size.width < 1200)
      //lg
      count = 6;
    else if (size.width >= 768 && size.width < 992)
      //md
      count = 8;
    else if (size.width >= 576 && size.width < 768)
      //sm
      count = 12;
    else if (size.width < 576)
      //xs
      count = 24;
    return 24 / count;
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: getSlideCount(),
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [loadTopExhibits, { loading, error, data }] = useLazyQuery(
    TOP_EXHIBITS_QUERY
  );

  useEffect(() => {
    if (!data || !data.top_exhibits) {
      return;
    }
    setTopExhibits(data.top_exhibits);
  }, [data]);

  useEffect(() => {
    if (!exhibitRefresh) {
      return;
    }
    loadTopExhibits();
  }, [exhibitRefresh]);

  useEffect(() => {
    loadTopExhibits();
  }, []);

  return (
    <div className="mt-auto">
      <Divider />
      <TitleBar
        title={"Funding Exhibits"}
        subtitle={"See more products"}
        link={"/exhibits"}
      />
      {error && (
        <Alert message={error.message} type="error" showIcon closable />
      )}
      <Spinner loading={loading} />

      {top_exhibits && (
        <div className="mx-8">
          <Carousel {...settings}>
            {top_exhibits.map((exhibit, idx) => (
              <div className="p-1" key={idx}>
                {user && user.role === "admin" ? (
                  <TopPrefundedExhibit exhibit={exhibit} />
                ) : (
                  <Auction4FundUser exhibit={exhibit} />
                )}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default FundCarousel;
