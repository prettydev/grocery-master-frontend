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
      wins
      coins
      points
      email_verified
      phone_verified
      note_channels
      note_cases
      created_at
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
      twitter {
        name
        email
        image
      }
      badges {
        badge {
          id
        }
        created_at
      }
      friends {
        friend {
          id
          email
          username
          avatar
        }
        created_at
      }
      note_channels
    }
  }
`;

export const GAME_SUBSCRIPTION = gql`
  subscription GameUpdated($user_id: String!) {
    gameUpdated(user_id: $user_id) {
      badge {
        title
        points
      }
      userUpdated {
        id
        email
        username
      }
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

export const CURRENT_EXHIBIT_SUBSCRIPTION = gql`
  subscription ExhibitUpdated($exhibit_id: String!) {
    exhibitUpdated(exhibit_id: $exhibit_id) {
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
      fund_amount
      fund_percent
      manual
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

export const CURRENT_HISTORY_SUBSCRIPTION = gql`
  subscription HistoryUpdated($history_id: String!) {
    historyUpdated(history_id: $history_id) {
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
      }
      watchers
      chatters
      timer
      fund_amount
      fund_percent
      manual
    }
  }
`;

export const CURRENT_STATISTICS_SUBSCRIPTION = gql`
  subscription CurrentStatistics {
    currentUpdated {
      online_users
      online_bid_users
      bids_per_action
    }
  }
`;

export const HISTORY_STATISTICS_SUBSCRIPTION = gql`
  subscription HistoryStatistics {
    historyUpdated {
      total_actions
      total_winners
      max_users
      bids_per_action
    }
  }
`;
