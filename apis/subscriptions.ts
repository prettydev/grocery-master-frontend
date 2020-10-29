import { gql } from "@apollo/client";

export const USER_SUBSCRIPTION = gql`
  subscription UserUpdated($user_id: String!) {
    userUpdated(user_id: $user_id) {
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

export const CURRENT_AUCTION_SUBSCRIPTION = gql`
  subscription AuctionUpdated($auction_id: String!) {
    auctionUpdated(auction_id: $auction_id) {
      auction {      
        id
        product {
          title
          asin
          link
          image
          price
          category
        }
        funders {
          user {
            id
            email
            username
            avatar
            coins
          }
          amount
        }
        bidders {
          user {
            id
            email
            username
            avatar
            coins
          }
          value
        }
        autos {
          user {
            id
            email
            username
            avatar
            coins
          }
          value
          active
        }
        watchers
        chatters
        timer
        live_timer
        reserved
        bid_speed
        fund_amount
        fund_percent
        state
        manual
      } 
      timestamp
    }
  }
`;