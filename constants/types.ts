export interface ICategory {
  name: string;
  link: string;
}
export interface ISpecificatiion {
  name: string;
  value: string;
}
export interface IPrice {
  currency: string;
  raw: string;
  symbol: string;
  value: number;
}
export interface IBuybox_winner {
  price: IPrice;
}
export interface IImage {
  link: string;
  variant: string;
}
export interface ILink {
  link: string;
}
export interface IProduct {
  id: string;
  title: string;
  asin: string;
  link: string;
  categories: [ICategory];
  main_image: ILink;
  price: number;
  description: string;
  specifications: [ISpecificatiion];
  feature_bullets: [string];
  buybox_winner: IBuybox_winner;
  images: [IImage];
  active: boolean;
}

export interface ISimpleProduct {
  id: string;
  title: string;
  asin: string;
  link: string;
  category: string;
  image: string;
  price: number;
}

export interface ISocial {
  name: string;
  email: string;
  image: string;
}
/**
 * public chat message
 */
export interface IMessage {
  room_id: string | string[];
  user_id: string;
  username: string;
  avatar: string;
  content: string;
  created_at: Date;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  phone: string;
  plan: string;
  role: string;
  wins: number;
  coins: number;
  points: number;
  email_verified: boolean;
  phone_verified: boolean;
  badges: IBadgeDate[];
  friends: IFriendDate[];
  note_channels: [string];
  note_cases: [string];
  facebook: ISocial;
  google: ISocial;
  twitter: ISocial;
  created_at: Date;
  updated_at: Date;
}

export interface INewUser {
  username: string;
  email: string;
  password: string;
}

export interface IFunder {
  amount: number;
  user: IUser;
}

export interface IUserValue {
  user: IUser;
  value: number;
}

export interface IAutoValue {
  user: IUser;
  value: number;
  active: boolean;
}

export interface IBadge {
  id: string;
  kind: string;
  image: string;
  title: string;
  details: string;
  type: string;
  points: number;
  rewards: string;
  difficulty: string;
}

export interface IBadgeDate {
  badge: IBadge;
  created_at: Date;
}

export interface IFriendDate {
  friend: IUser;
  created_at: Date;
}

export interface IExhibit {
  id: string;
  product: ISimpleProduct;
  funders: IFunder[];
  // timer: number;
  fund_amount: number;
  fund_percent: number;
  threshold: number;
  manual: number;
}

export interface IAuction {
  id: string;
  product: ISimpleProduct;
  funders: IFunder[];
  fund_amount: number;
  fund_percent: number;
  threshold: number;
  campaign: boolean;
  reserved: boolean;
  timer: number;
  live_timer: number;//milisecond
  bid_speed: number;
  speed: number;
  /////////////////
  autos: IAutoValue[];
  bidders: IUserValue[];
  watchers: string[];
  chatters: string[];
  state: string;
  manual: number;
}

export interface IHistory {
  id: string;
  product: ISimpleProduct;
  funders: IFunder[];
  fund_amount: number;
  fund_percent: number;
  threshold: number;
  campaign: boolean;
  timer: number;
  live_timer: number;
  /////////////////
  autos: IAutoValue[];
  bidders: IUserValue[];
  watchers: string[];
  chatters: string[];
  state: string;

  ////////////////////

  bid_started_at: Date;
  bid_ended_at: Date;

  //////////////////////////////////////////////////////////////////////////////////////

  created_at: Date;
  updated_at: Date;
  // ---------history specific fields---------------//

  winner: IUser;
  end_bids: number;
  tracking: string;
  manual: number;
}

//////////////----------------Chat Types---------------//////////////////

export interface ResetSocket {
  type: "reset";
  username: string;
}

export interface LoginChat {
  type: "login";
  username: string;
}

export interface GetMessage {
  type: "get";
  id: string;
}

export interface GetAllMessages {
  type: "all";
}

export type ChatCommand = ResetSocket | LoginChat | GetMessage | GetAllMessages;

export interface ChatMessage {
  author: string;
  message: string;
}

export interface LoginResult {
  type: "login_result";
  success: boolean;
}

export interface NewMessageResult {
  type: "new_message_result";
  id?: string;
}

export interface GetMessageResult {
  type: "get_message_result";
  chat: ChatMessage;
}

export interface AllMessageResult {
  type: "all_message_result";
  chats: ChatMessage[];
}

export interface UnknownMessageResult {
  type: "unknown_message";
  payload: any;
}

export type ChatResult =
  | LoginResult
  | NewMessageResult
  | GetMessageResult
  | AllMessageResult
  | UnknownMessageResult;

///////////////////////////////////////

export interface IFriend {
  id: string;
  sender: IUser;
  receiver: IUser;
  state: 0 | 1;
}

export interface IContact {
  key: number;
  title: string;
  email: string;
  phoneNumber: string;
  ref: string;
}

export interface ICurrentStatistics {
  online_users: number;
  online_bid_users: number;
  bids_per_action: number;
}

export interface IHistoryStatistics {
  total_actions: number;
  total_winners: number;
  max_users: number;
  bids_per_action: number;
}

export interface INote {
  id: string;
  content: string;
  created_at: Date;
}

export interface IPrivateNote {
  id: string;
  content: string;
  title: string;
  receiver: string;
  created_at: Date;
}

export interface IFBPost {
  id: string;
  permalink_url: string;
}
