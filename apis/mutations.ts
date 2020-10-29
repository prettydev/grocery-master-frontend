import { gql } from "@apollo/client";

// not used
export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const ADD_USER = gql`
  mutation AddUser($user: NewUserInput!, $ref: String) {
    register(user: $user, ref: $ref)
  }
`;

export const AFFILIATE = gql`
  mutation Affiliate($ref: String!) {
    affiliate(ref: $ref)
  }
`;

export const CHANGE_AVATAR_MUTATION = gql`
  mutation ChangeAvatar($user_id: String!, $avatar: String!) {
    changeAvatar(user_id: $user_id, avatar: $avatar)
  }
`;

export const CHANGE_BADGE_IMAGE_MUTATION = gql`
  mutation ChangeAvatar($user_id: String!, $avatar: String!) {
    changeAvatar(user_id: $user_id, avatar: $avatar)
  }
`;

export const ADD_SOCIAL_MUTATION = gql`
  mutation AddSocial($user_id: String!, $social: Social!) {
    addSocial(user_id: $user_id, social: $social)
  }
`;

export const ADD_MESSAGE_MUTATION = gql`
  mutation AddMessage($message: MessageInput!) {
    addMessage(message: $message)
  }
`;

export const SOCIAL_REGISTER_LOGIN_MUTATION = gql`
  mutation SocialRegisterLogin($social: Social!) {
    socialRegisterLogin(social: $social) {
      user {
        id
        username
        email
        avatar
        phone
        plan
        role
        email_verified
        phone_verified
        facebook {
          name
          email
          image
        }
        google {
          name
          email
          image
        }        
        created_at
      }
      message
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword(
    $user_id: String!
    $current_password: String!
    $password: String!
  ) {
    changePassword(
      user_id: $user_id
      current_password: $current_password
      password: $password
    ) {
      code
      message
    }
  }
`;

export const CHANGE_NOTE_CHANNELS_MUTATION = gql`
  mutation ChangeNoteChannels($user_id: String!, $note_channels: [String!]!) {
    changeNoteChannels(user_id: $user_id, note_channels: $note_channels) {
      code
      message
    }
  }
`;

export const CHANGE_NOTE_CASES_MUTATION = gql`
  mutation ChangeNoteCases($user_id: String!, $note_cases: [String!]!) {
    changeNoteCases(user_id: $user_id, note_cases: $note_cases) {
      code
      message
    }
  }
`;

export const SET_THRESHOLD_MUTATION = gql`
  mutation SetThreshold($threshold: SetThresholdInput!) {
    setThreshold(threshold: $threshold) {
      id
    }
  }
`;

export const SEND_AUTH_EMAIL_MUTATION = gql`
  mutation SendAuthEmail($user_id: String!, $email: String!) {
    sendAuthEmail(user_id: $user_id, email: $email)
  }
`;

export const SEND_SMS_MUTATION = gql`
  mutation SendSMS($user_id: String!, $phone: String!) {
    sendSMS(user_id: $user_id, phone: $phone) {
      code
      message
    }
  }
`;

export const VERIFY_SMS_MUTATION = gql`
  mutation VerifySMS($user_id: String!, $token: String!) {
    verifySMS(user_id: $user_id, token: $token) {
      code
      message
    }
  }
`;

export const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail($receivers: [String!]!, $content: String!) {
    sendEmail(receivers: $receivers, content: $content)
  }
`;

export const SET_CAMPAIGN_MUTATION = gql`
  mutation SetCampaign($campaign: SetCampaignInput!) {
    setCampaign(campaign: $campaign) {
      id
      campaign
    }
  }
`;

export const SET_RESERVED_MUTATION = gql`
  mutation SetReserved($reserved: SetReservedInput!) {
    setReserved(reserved: $reserved)
  }
`;

export const SET_EXHIBIT_MANUAL_MUTATION = gql`
  mutation SetExhibitManual($manual: Float!, $exhibit_id: String!) {
    setExhibitManual(manual: $manual, exhibit_id: $exhibit_id)
  }
`;

export const SET_AUCTION_MANUAL_MUTATION = gql`
  mutation SetAuctionManual($manual: Float!, $auction_id: String!) {
    setAuctionManual(manual: $manual, auction_id: $auction_id)
  }
`;

export const SET_TIMER_MUTATION = gql`
  mutation SetTimer($input: SetTimerInput!) {
    setTimer(input: $input)
  }
`;

export const FUND_MUTATION = gql`
  mutation Fund($input: FundExhibitInput!) {
    fund(input: $input)
  }
`;

export const BID_MUTATION = gql`
  mutation Bid($input: BidAuctionInput!) {
    bid(input: $input)
  }
`;

export const AUTO_MUTATION = gql`
  mutation Auto($input: AutoAuctionInput!) {
    auto(input: $input)
  }
`;

export const ORDER_MUTATION = gql`
  mutation AddOrder($input: NewOrderInput!) {
    addOrder(input: $input) {
      order {
        id
        user {
          id
          username
          email
          avatar
        }
        product {
          asin
          title
        }
        amount
      }
      user {
        id
        username
        email
        avatar
        wins
        coins
        points
      }
    }
  }
`;

export const WISH_ADD_MUTATION = gql`
  mutation AddWish($input: NewWishInput!, $note_channels: [String!]!) {
    addWish(input: $input, note_channels: $note_channels)
  }
`;

export const WISH_REMOVE_MUTATION = gql`
  mutation RemoveWish($input: NewWishInput!) {
    removeWish(input: $input)
  }
`;

export const BADGE_ADD_MUTATION = gql`
  mutation AddBadge($input: NewBadgeInput!) {
    addBadge(input: $input) {
      badge {
        image
        title
        details
        points
        kind
        type
        rewards
        difficulty
      }
      message
    }
  }
`;

export const BADGE_EDIT_MUTATION = gql`
  mutation EditBadge($badge_id: String!, $input: NewBadgeInput!) {
    editBadge(badge_id: $badge_id, input: $input) {
      badge {
        id
        image
        title
        details
        points
        kind
        type
        rewards
        difficulty
      }
      message
    }
  }
`;

export const FRIEND_REQUEST_MUTATION = gql`
  mutation RequestFriend($input: NewFriendInput!) {
    requestFriend(input: $input)
  }
`;

export const FRIEND_DENY_MUTATION = gql`
  mutation DenyFriend($id: String!) {
    denyFriend(id: $id)
  }
`;

export const FRIEND_CONFIRM_MUTATION = gql`
  mutation ConfirmFriend($id: String!) {
    confirmFriend(id: $id)
  }
`;

export const REMOVE_NOTE_MUTATION = gql`
  mutation RemoveNote($note_id: String!) {
    removeNote(note_id: $note_id)
  }
`;

export const EXCHANGE_MUTATION = gql`
  mutation Exchange($coins: Float!, $user_id: String!) {
    exchange(coins: $coins, user_id: $user_id)
  }
`;

export const PLAN_MUTATION = gql`
  mutation UpdatePlan($months: Float!, $kind: String!, $user_id: String!) {
    updatePlan(months: $months, kind: $kind, user_id: $user_id)
  }
`;

/////////////////////////////////////////////////////

export const ADMIN_MOVE2EXHIBIT_MUTATION = gql`
  mutation admin_move2exhibit($asin: String!) {
    admin_move2exhibit(asin: $asin)
  }
`;

export const ADMIN_MOVE2AUCTION_MUTATION = gql`
  mutation admin_move2auction($asin: String!) {
    admin_move2auction(asin: $asin)
  }
`;

export const GROCERY_ADD_MUTATION = gql`
  mutation AddGrocery($grocery: GroceryInput!) {
    add_grocery(grocery: $grocery)
  }
`;

export const ADMIN_ADD_TRACKING = gql`
  mutation AdminAddTracking($id: String!, $tracking: String!) {
    admin_add_tracking(id: $id, tracking: $tracking) {
      code
      message
    }
  }
`;

export const SET_ACTIVE_MUTATION = gql`
  mutation SetActive($asin: String!, $active: Boolean!) {
    setActive(asin: $asin, active: $active)
  }
`;
