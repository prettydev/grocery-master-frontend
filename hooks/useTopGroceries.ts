import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { TOP_GROCERIES_QUERY } from "../apis/queries";
import { IGrocery } from "../constants/types";
import { useMapState } from "../context/store";

const useTopGroceries = () => { 

  const [groceries, setGroceries] = useState<IGrocery[]>([]);

  const { loading, error, data } = useQuery(
    TOP_GROCERIES_QUERY
  );

  useEffect(() => {

    console.log("data...", data);

    if (!data || !data.top_groceries ) {
      return;
    }

    setGroceries(data.top_groceries);
  }, [data]);

  return groceries;
}

export default useTopGroceries
