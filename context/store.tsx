import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSubscription, useQuery } from "@apollo/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  IUser,
  IMessage,
  IBadge,
  IContact,
  IHistory,
} from "../constants/types";
import {
  USER_SUBSCRIPTION,
  GAME_SUBSCRIPTION,
  NOTE_SUBSCRIPTION,
  MESSAGE_SUBSCRIPTION,
  PRIVATE_NOTE_SUBSCRIPTION,
} from "../apis/subscriptions";
import { MESSAGES_QUERY, WISHES_QUERY } from "../apis/queries";

import { notification } from "antd";

const Tenor = require("../images/tenor.gif");

const MySwal = withReactContent(Swal);

const openGameNotification = (description) => {
  notification.success({
    message: `Game news`,
    description,
    placement: `topLeft`,
    duration: 5,
  });
};

const openGeneralNotification = (description) => {
  notification.info({
    message: `Exhibia News`,
    description,
    placement: `bottomLeft`,
    duration: 5,
    className: "custom-class",
    style: {
      width: 500,
    },
  });
};

const openPrivateNotification = (description) => {
  let timerInterval;
  MySwal.fire({
    title: "",
    html: (
      <div>
        <img src={Tenor}></img>
        <h1>{description}</h1>
      </div>
    ),
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    timer: 3000,
    timerProgressBar: false,
    onClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

type PageInfo = {
  currentPage: number;
  pageSize: number;
};

type MapState = {
  auctionRefresh: boolean;
  exhibitRefresh: boolean;
  socket: any | null;
  user: IUser | null;
  histories: IHistory[] | null;
  messages: IMessage[] | null;
  badges: IBadge[] | null;
  wishes: string[] | null;
  exhibitPageInfo: PageInfo;
  auctionPageInfo: PageInfo;
  historyPageInfo: PageInfo;
  productPageInfo: PageInfo;
  completedPageInfo: PageInfo;
  currentPayAmount4Fund: number;
  currentPayAmount4Buy: number;
  contacts: IContact[];
};

type MapActions =
  | {
      type: "setAuctionRefresh";
      auctionRefresh: boolean;
    }
  | {
      type: "setExhibitRefresh";
      exhibitRefresh: boolean;
    }
  | {
      type: "setSocket";
      socket: any;
    }
  | {
      type: "setUser";
      user: IUser;
    }
  | {
      type: "setHistories";
      histories: IHistory[];
    }
  | {
      type: "setMessages";
      messages: IMessage[];
    }
  | {
      type: "addMessage";
      message: IMessage;
    }
  | {
      type: "setBadges";
      badges: IBadge[];
    }
  | {
      type: "editBadge";
      badge: IBadge;
    }
  | {
      type: "addBadge";
      badge: IBadge;
    }
  | {
      type: "setWishes";
      wishes: string[];
    }
  | {
      type: "addWish";
      wish: string;
    }
  | {
      type: "removeWish";
      wish: string;
    }
  | {
      type: "setCurrentPayAmount4Fund";
      amount: any;
    }
  | {
      type: "setCurrentPayAmount4Buy";
      amount: any;
    }
  | {
      type: "setCurrentBidAmount";
      amount: any;
    }
  | {
      type: "setExhibitPageInfo";
      pageInfo: PageInfo;
    }
  | {
      type: "setAuctionPageInfo";
      pageInfo: PageInfo;
    }
  | {
      type: "setHistoryPageInfo";
      pageInfo: PageInfo;
    }
  | {
      type: "setProductPageInfo";
      pageInfo: PageInfo;
    }
  | {
      type: "setCompletedPageInfo";
      pageInfo: PageInfo;
    }
  | {
      type: "setContacts";
      contacts: IContact[];
    };

const initialState: MapState = {
  auctionRefresh: false,
  exhibitRefresh: false,
  socket: null,
  user: null,
  histories: [],
  messages: [],
  badges: [],
  wishes: [],
  exhibitPageInfo: {
    currentPage: 1,
    pageSize: 12,
  },
  auctionPageInfo: {
    currentPage: 1,
    pageSize: 12,
  },
  historyPageInfo: {
    currentPage: 1,
    pageSize: 12,
  },
  productPageInfo: {
    currentPage: 1,
    pageSize: 10,
  },
  completedPageInfo: {
    currentPage: 1,
    pageSize: 10,
  },
  currentPayAmount4Fund: 0,
  currentPayAmount4Buy: 0,
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
    case "setExhibitRefresh":
      return { ...state, exhibitRefresh: action.exhibitRefresh };
    case "setUser":
      return { ...state, user: action.user };
    case "setSocket":
      return { ...state, socket: action.socket };
    case "setHistories":
      return { ...state, histories: action.histories };
    case "setMessages":
      return { ...state, messages: action.messages };
    case "addMessage":
      return { ...state, messages: [...state.messages, action.message] };
    case "setBadges":
      return { ...state, badges: action.badges };
    case "editBadge":
      let new_badges = [...state.badges];
      let tmp = -1;
      state.badges.map((b, idx) => {
        if (b.id === action.badge.id) {
          tmp = idx;
        }
      });
      new_badges.splice(tmp, 1, action.badge);
      return {
        ...state,
        badges: new_badges,
      };
    case "addBadge":
      return { ...state, badges: [...state.badges, action.badge] };
    case "setWishes":
      return { ...state, wishes: action.wishes };
    case "addWish":
      return { ...state, wishes: [...state.wishes, action.wish] };
    case "removeWish":
      return {
        ...state,
        wishes: [...state.wishes].filter((w) => w !== action.wish),
      };
    case "setCurrentPayAmount4Fund":
      return { ...state, currentPayAmount4Fund: action.amount };
    case "setCurrentPayAmount4Buy":
      return { ...state, currentPayAmount4Buy: action.amount };
    case "setCurrentBidAmount":
      return { ...state, currentBidAmount: action.amount };
    case "setExhibitPageInfo":
      return { ...state, exhibitPageInfo: action.pageInfo };
    case "setAuctionPageInfo":
      return { ...state, auctionPageInfo: action.pageInfo };
    case "setHistoryPageInfo":
      return { ...state, historyPageInfo: action.pageInfo };
    case "setProductPageInfo":
      return { ...state, productPageInfo: action.pageInfo };
    case "setCompletedPageInfo":
      return { ...state, completedPageInfo: action.pageInfo };

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

  const { data: gameData, loading: gameLoading } = useSubscription(
    GAME_SUBSCRIPTION,
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

  const { data: messageData, loading: messageLoading } = useSubscription(
    MESSAGE_SUBSCRIPTION,
    {
      variables: {
        user_id: mapState.user && mapState.user.id ? mapState.user.id : "",
        room_id: router.query.auction ? router.query.auction : "public",
      },
    }
  );

  const {
    loading: messagesLoading,
    error: messageError,
    data: messages,
  } = useQuery(MESSAGES_QUERY, {
    variables: {},
  });

  const { loading: wishesLoading, error: wishesError, data: wishes } = useQuery(
    WISHES_QUERY,
    {
      variables: {
        user_id: mapState.user && mapState.user.id ? mapState.user.id : "",
      },
    }
  );

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
      !gameData ||
      !gameData.gameUpdated ||
      !gameData.gameUpdated.badge ||
      !gameData.gameUpdated.userUpdated
    ) {
      return;
    }

    let receiver = gameData.gameUpdated.userUpdated.username
      ? gameData.gameUpdated.userUpdated.username
      : gameData.gameUpdated.userUpdated.email;
    if (gameData.gameUpdated.userUpdated.id === mapState.user.id) {
      receiver = `You(${receiver})`;
    }

    openGameNotification(
      <p>
        <b>{receiver}</b>
        {` receivied the `}
        <b>{gameData.gameUpdated.badge.title}</b> {` badge with `}{" "}
        <b>{gameData.gameUpdated.badge.points}</b> {`points`}
      </p>
    );
  }, [gameData]);

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

    // openPrivateNotification(privateNoteData.privateNoteUpdated.content);
    openGeneralNotification(privateNoteData.privateNoteUpdated.content);
  }, [privateNoteData]);

  useEffect(() => {
    if (!mapState || !messageData || !messageData.messageAdded) {
      return;
    }
    console.log("messageAdded, ", messageData);
    messageData.messageAdded.avatar = messageData.messageAdded.avatar.replace(
      "http://",
      "https://"
    );
    setMapState({
      type: "addMessage",
      message: messageData.messageAdded,
    });
  }, [messageData]);

  useEffect(() => {
    if (!messages || !messages.messages || !messages.messages.length) return;

    setMapState({
      type: "setMessages",
      messages: messages.messages,
    });
  }, [messages]);

  useEffect(() => {
    if (!wishes || !wishes.mywishes || !wishes.mywishes.length) return;

    setMapState({
      type: "setWishes",
      wishes: wishes.mywishes,
    });
  }, [wishes]);

  return (
    <MapContext.Provider value={{ mapState, setMapState }}>
      {children}
    </MapContext.Provider>
  );
};
