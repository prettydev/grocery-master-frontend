import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSubscription } from "@apollo/client";

import { IUser, IContact } from "../constants/types";
import {
  USER_SUBSCRIPTION,
  NOTE_SUBSCRIPTION,
  PRIVATE_NOTE_SUBSCRIPTION,
} from "../apis/subscriptions";

import { notification } from "antd";

const openGeneralNotification = (description) => {
  notification.info({
    message: `byebyeGROCERY News`,
    description,
    placement: `bottomLeft`,
    duration: 5,
    className: "custom-class",
    style: {
      width: 500,
    },
  });
};

type PageInfo = {
  currentPage: number;
  pageSize: number;
};

type MapState = {
  auctionRefresh: boolean;
  user: IUser | null;
  groceryPageInfo: PageInfo;
  contacts: IContact[];
};

type MapActions =
  | {
      type: "setAuctionRefresh";
      auctionRefresh: boolean;
    }
  | {
      type: "setUser";
      user: IUser;
    }
  | {
      type: "setGroceryPageInfo";
      pageInfo: PageInfo;
    }
  | {
      type: "setContacts";
      contacts: IContact[];
    };

const initialState: MapState = {
  auctionRefresh: false,
  user: null,
  groceryPageInfo: {
    currentPage: 1,
    pageSize: 10,
  },
  contacts: [],
};

const initialMapContext: {
  mapState: MapState;
  setMapState: React.Dispatch<MapActions>;
} = {
  mapState: initialState,
  setMapState: () => {},
};

const MapContext = createContext(initialMapContext);

const reducer = (state: MapState, action: MapActions) => {
  switch (action.type) {
    case "setAuctionRefresh":
      return { ...state, auctionRefresh: action.auctionRefresh };
    case "setUser":
      return { ...state, user: action.user };
    case "setGroceryPageInfo":
      return { ...state, groceryPageInfo: action.pageInfo };
    case "setContacts":
      return { ...state, contacts: action.contacts };
    default:
      return state;
  }
};

export const useMapState = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const mapState = state;
  const setMapState = dispatch;

  const router = useRouter();

  const { data: userData, loading: userLoading } = useSubscription(
    USER_SUBSCRIPTION,
    {
      variables: {
        user_id: mapState.user && mapState.user.id ? mapState.user.id : "",
      },
    }
  );

  const { data: noteData, loading: noteLoading } = useSubscription(
    NOTE_SUBSCRIPTION,
    {
      variables: {
        user_id: mapState.user && mapState.user.id ? mapState.user.id : "",
      },
    }
  );

  const {
    data: privateNoteData,
    loading: privateNoteLoading,
  } = useSubscription(PRIVATE_NOTE_SUBSCRIPTION, {
    variables: {
      user_id: mapState.user && mapState.user.id ? mapState.user.id : "",
    },
  });

  useEffect(() => {
    if (userData && userData.userUpdated) {
      userData.userUpdated.avatar = userData.userUpdated.avatar.replace(
        "http://",
        "https://"
      );
      setMapState({
        type: "setUser",
        user: userData.userUpdated,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (
      !mapState.user ||
      !noteData ||
      !noteData.noteUpdated ||
      !noteData.noteUpdated.content
    ) {
      return;
    }
    openGeneralNotification(noteData.noteUpdated.content);
  }, [noteData]);

  useEffect(() => {
    if (
      !mapState.user ||
      !privateNoteData ||
      !privateNoteData.privateNoteUpdated ||
      !privateNoteData.privateNoteUpdated.content
    ) {
      return;
    }

    openGeneralNotification(privateNoteData.privateNoteUpdated.content);
  }, [privateNoteData]);

  return (
    <MapContext.Provider value={{ mapState, setMapState }}>
      {children}
    </MapContext.Provider>
  );
};
