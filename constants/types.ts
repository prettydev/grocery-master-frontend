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

export interface IPlan {
  name: string;
  price: number;
  tooltip: string;
  descriptions: string[]  
}

export interface IReview {
  rate: number;
  review: string;
  customer: string;
  location: string;
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
