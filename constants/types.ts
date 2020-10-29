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

export interface II18N {
  lang: string;
  value: string;
}

export interface ILocation {
  address: string;
  lng: number;
  lat: number;
}

export interface ICreditCard {
  card_number: string;
  expired_date: string;  
  cvv: string;
}

export interface IGrocery {
  id: string;  
  name: string;  
  second_lang: string;
  mobile: string;
  owner_email: string;
  bank_account: string;
  contact_email: string;
  contact_phone: string;
  opening_hours: number;
  delivery_radius: string;
  min_order: number;
  first_offer_discount: number;
  is_collect: boolean; 
  logo: ILink;
  images: [IImage];  
  location: ILocation;
  credit_card: ICreditCard;
  description: [II18N];
  delivery_policy: [II18N];
  about_us: [II18N];
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
  email_verified: boolean;
  phone_verified: boolean;  
  facebook: ISocial;
  google: ISocial;  
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
