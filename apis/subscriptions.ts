import { gql } from "@apollo/client";

export const USER_SUBSCRIPTION = gql`
  subscription UserUpdated($user_id: String!) {
    userUpdated(user_id: $user_id) {
      id
      name
      email
      image
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
  }
`;

export const NOTE_SUBSCRIPTION = gql`
  subscription NoteUpdated($user_id: String!) {
    noteUpdated(user_id: $user_id) {
      content
      receivers
    }
  }
`;

export const PRIVATE_NOTE_SUBSCRIPTION = gql`
  subscription PrivateNoteUpdated($user_id: String!) {
    privateNoteUpdated(user_id: $user_id) {
      title
      content
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageAdded($room_id: String!, $user_id: String!) {
    messageAdded(room_id: $room_id, user_id: $user_id) {
      room_id
      user_id
      username
      avatar
      content
      created_at
    }
  }
`;