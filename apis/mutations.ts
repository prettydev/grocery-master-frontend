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
        name
        email
        avatar
        plan
        role
        email_verified
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
        address {
          id
          type
          name
          info
        }
        contact {
          id
          type
          number
        }
        card {
          id
          type
          cardType
          name
          lastFourDigit
        }
        total_order
        total_order_amount
        created_at
      }
      message
    }
  }
`;

export const PLAN_MUTATION = gql`
  mutation UpdatePlan($plan_name: String!, $user_id: String!) {
    updatePlan(plan_name: $plan_name, user_id: $user_id)
  }
`;

export const GROCERY_ADD_MUTATION = gql`
  mutation AddGrocery($grocery: GroceryInput!) {
    add_grocery(grocery: $grocery)
  }
`;

export const SET_ACTIVE_MUTATION = gql`
  mutation SetActive($asin: String!, $active: Boolean!) {
    setActive(asin: $asin, active: $active)
  }
`;
