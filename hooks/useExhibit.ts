import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { CURRENT_EXHIBIT_SUBSCRIPTION } from "../apis/subscriptions";
import { IExhibit } from "../constants/types";
import { useMapState } from "../context/store";

const useExhibit = (ib:IExhibit) => {

  const {
    setMapState,
  } = useMapState();

  const [exhibit, setExhibit] = useState<IExhibit>(ib);

  const { data } = useSubscription(CURRENT_EXHIBIT_SUBSCRIPTION, {
    variables: {
      exhibit_id: ib?ib.id:"",
    },
  });
  useEffect(() => {
    if (!data || !data.exhibitUpdated) {
      return;
    }

    setMapState({
      type: "setExhibitRefresh",
      exhibitRefresh: data.exhibitUpdated.fund_percent > 99,
    });

    setExhibit(data.exhibitUpdated);
  }, [data]);

  useEffect(() => {
    if (!ib) {
      return;
    }
    setExhibit(ib);
  }, [ib]);

  return exhibit;
}

export default useExhibit
