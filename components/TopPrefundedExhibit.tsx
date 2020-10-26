import React, { FC, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Alert, Card, message } from "antd";

import { useMapState } from "../context/store";
import { IExhibit } from "../constants/types";
import { SButton } from "./buttons/SButton";

import { SET_EXHIBIT_MANUAL_MUTATION } from "../apis/mutations";
import useExhibit from "../hooks/useExhibit";

const { Meta } = Card;

const TopPrefundedExhibit = ({ exhibit: ib }: { exhibit: IExhibit }) => {
  const {
    mapState: { user },
  } = useMapState();

  const exhibit = useExhibit(ib);

  const [setExhibitManual] = useMutation(SET_EXHIBIT_MANUAL_MUTATION);

  const updateManual = async (manual: number) => {
    if (!user) {
      return;
    }

    const res = await setExhibitManual({
      variables: {
        manual,
        exhibit_id: exhibit.id,
      },
    });
    try {
      if (res.data.setExhibitManual) {
        message.success("Updated the manual order!");
      } else {
        message.error("Failed!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (exhibit.manual !== 1 && exhibit.manual !== 2) {
      return;
    }
  }, [exhibit.manual]);

  return (
    <>
      {!exhibit && <Alert message={"no exhibit!"} />}
      {!!exhibit && (
        <Card hoverable>
          <div className="flex flex-col gap-1 mr-auto ml-auto">
            <img className="object-contain h-32" src={exhibit.product.image} />
            <SButton
              title={"Next 1st Pn"}
              proc={() => updateManual(1)}
              ghost={exhibit.manual === 1 ? false : true}
            />
            <SButton
              title={"Next 2nd Pn"}
              proc={() => updateManual(2)}
              ghost={exhibit.manual === 2 ? false : true}
            />
            <Meta title={exhibit.product.title} />
          </div>
        </Card>
      )}
    </>
  );
};

export default TopPrefundedExhibit;
