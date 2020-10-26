import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query Login($user: LoginUserInput!) {
    login(user: $user) {
      user {
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
      message
    }
  }
`;

export const USER_QUERY = gql`
  query Login($id: String!) {
    user(id: $id) {
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
          image
          title
          details
          points
        }
        created_at
      }
    }
  }
`;

export const EXHIBITS_QUERY = gql`
  query Exhibits($pageArgs: PageArgs!, $filter: Filter!) {
    exhibits(pageArgs: $pageArgs, filter: $filter) {
      arr {
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
          }
          amount
        }
        fund_amount
        fund_percent
        manual
      }
      cnt
    }
  }
`;

export const TOP_EXHIBITS_QUERY = gql`
  query {
    top_exhibits {
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
        }
        amount
      }
      fund_amount
      fund_percent
      manual
    }
  }
`;

export const AUCTIONS_QUERY = gql`
  query Auctions($pageArgs: PageArgs!, $filter: Filter!) {
    auctions(pageArgs: $pageArgs, filter: $filter) {
      arr {
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
        state
        reserved
        watchers
        chatters
        timer
        live_timer
        bid_speed
        fund_amount
        fund_percent
        manual
      }
      cnt
      timestamp
    }
  }
`;

export const LAST_AUCTION_QUERY = gql`
  query LastAuction($pageArgs: PageArgs!, $filter: Filter!) {
    last_auction(pageArgs: $pageArgs, filter: $filter) {      
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
        state
        reserved
        watchers
        chatters
        timer
        live_timer
        bid_speed
        fund_amount
        fund_percent
        manual      
    }
  }
`;

export const ADMIN_AUCTIONS_QUERY = gql`
  query AdminAuctions($pageArgs: PageArgs!, $filter: Filter!) {
    admin_auctions(pageArgs: $pageArgs, filter: $filter) {
      arr {
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
          }
          amount
        }
        autos {
          user {
            id
            email
            username
            avatar
          }
          value
          active
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
        watchers
        chatters
        timer
        live_timer
        bid_speed
        fund_amount
        fund_percent
        campaign
        reserved
        state
        manual
      }
      cnt
      timestamp
    }
  }
`;

export const GET_AUCTION_LIVE_TIMER_QUERY = gql`
  query GetAuctionLiveTimer($auction_id: String!) {
    getAuctionLiveTimer(auction_id: $auction_id)
  }
`;

export const ORDERS_QUERY = gql`
  query Orders($pageArgs: PageArgs!, $filter: Filter!) {
    orders(pageArgs: $pageArgs, filter: $filter) {
      arr {
        id
        amount
        user {
          id
          email
          username
          avatar
          note_channels
          note_cases
        }
        product {
          title
          asin
          link
          main_image {
            link
          }
        }
      }
      cnt
    }
  }
`;

//wishes query
export const LISTINGS_QUERY = gql`
  query Listings($pageArgs: PageArgs!, $filter: Filter!, $user_id: String!) {
    wishes(pageArgs: $pageArgs, filter: $filter, user_id: $user_id) {
      arr {
        id
        exhibit {
          product {
            asin
            title
            image
          }
        }
        user {
          id
          email
          username
          avatar
        }
        created_at
      }
      cnt
    }
  }
`;

export const BADGE_QUERY = gql`
  query Badges($pageArgs: PageArgs!, $filter: Filter!) {
    badges(pageArgs: $pageArgs, filter: $filter) {
      arr {
        id
        kind
        title
        details
        image
        type
        points
        rewards
        difficulty
      }
      cnt
    }
  }
`;

export const WINNER_QUERY = gql`
  query Histories($pageArgs: PageArgs!, $filter: Filter!) {
    histories(pageArgs: $pageArgs, filter: $filter) {
      arr {
        id
        winner {
          id
          email
          username
          avatar
          wins
          created_at
        }
        product {
          asin
          title
          image
        }
        end_bids
        manual
      }
      cnt
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query Messages {
    messages {
      room_id
      user_id
      username
      avatar
      content
      created_at
    }
  }
`;

export const WISHES_QUERY = gql`
  query MyWishes($user_id: String!) {
    mywishes(user_id: $user_id)
  }
`;

export const EXHIBIT_DETAILS_QUERY = gql`
  query Exhibit($exhibit_id: String!) {
    exhibit(exhibit_id: $exhibit_id) {
      exhibit {
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
          }
          amount
        }
        fund_amount
        fund_percent
        manual
      }
      product {
        title
        asin
        link
        categories {
          name
          link
        }
        main_image {
          link
        }
        description
        specifications {
          name
          value
        }
        feature_bullets
        buybox_winner {
          price {
            currency
            raw
            symbol
            value
          }
        }
        images {
          link
          variant
        }
      }
    }
  }
`;

export const AUCTION_DETAILS_QUERY = gql`
  query Auction($auction_id: String!, $user_id: String!) {
    auction(auction_id: $auction_id, user_id: $user_id) {
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
        state
        timer
        live_timer
        bid_speed
        fund_amount
        fund_percent
        manual
      }
      product {
        title
        asin
        link
        categories {
          name
          link
        }
        main_image {
          link
        }
        description
        specifications {
          name
          value
        }
        feature_bullets
        buybox_winner {
          price {
            currency
            raw
            symbol
            value
          }
        }
        images {
          link
          variant
        }
      }
    }
  }
`;

export const HISTORY_DETAILS_QUERY = gql`
  query History($history_id: String!) {
    history(history_id: $history_id) {
      history {
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
        winner {
          avatar
          username
        }
        state
        timer
        fund_amount
        fund_percent
        tracking
        manual
      }
      product {
        title
        asin
        link
        categories {
          name
          link
        }
        main_image {
          link
        }
        description
        specifications {
          name
          value
        }
        feature_bullets
        buybox_winner {
          price {
            currency
            raw
            symbol
            value
          }
        }
        images {
          link
          variant
        }
      }
    }
  }
`;

export const NOFRIENDS_QUERY = gql`
  query NoFriends($pageArgs: PageArgs!, $filter: Filter!, $user_id: String!) {
    nofriends(pageArgs: $pageArgs, filter: $filter, user_id: $user_id) {
      arr {
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
      }
      cnt
    }
  }
`;

export const NOTES_QUERY = gql`
  query Notes($pageArgs: PageArgs!, $filter: Filter!, $user_id: String!) {
    notes(pageArgs: $pageArgs, filter: $filter, user_id: $user_id) {
      arr {
        id
        content
        created_at
      }
      cnt
    }
  }
`;

export const SENT_FRIEND_REQUESTS_QUERY = gql`
  query SentFriendRequests(
    $pageArgs: PageArgs!
    $filter: Filter!
    $user_id: String!
  ) {
    sentFriendRequests(
      pageArgs: $pageArgs
      filter: $filter
      user_id: $user_id
    ) {
      arr {
        id
        receiver {
          username
          email
          avatar
        }
        state
      }
      cnt
    }
  }
`;

export const RECV_FRIEND_REQUESTS_QUERY = gql`
  query RecvFriendRequests(
    $pageArgs: PageArgs!
    $filter: Filter!
    $user_id: String!
  ) {
    recvFriendRequests(
      pageArgs: $pageArgs
      filter: $filter
      user_id: $user_id
    ) {
      arr {
        id
        sender {
          username
          email
          avatar
        }
        state
      }
      cnt
    }
  }
`;

export const GET_USER_BONUS_QUERY = gql`
  query GetBonus($user_id: String!) {
    getBonus(user_id: $user_id)
  }
`;

export const CURRENT_STATISTICS_QUERY = gql`
  query CurrentStatistics {
    currentStatistics {
      online_users
      online_bid_users
      bids_per_action
    }
  }
`;

export const HISTORY_STATISTICS_QUERY = gql`
  query HistoryStatistics {
    historyStatistics {
      total_actions
      total_winners
      max_users
      bids_per_action
    }
  }
`;

export const FB_POSTS_QUERY = gql`
  query FBPosts($pageArgs: PageArgs!, $filter: Filter!) {
    fb_posts(pageArgs: $pageArgs, filter: $filter) {
      arr {
        id
        permalink_url
      }
      cnt
    }
  }
`;

//////////////////////////////////////////////////////////////////

export const ADMIN_PRODUCTS_QUERY = gql`
  query AdminProducts($pageArgs: PageArgs!, $filter: Filter!) {
    admin_products(pageArgs: $pageArgs, filter: $filter) {
      arr {
        title
        asin
        link
        categories {
          name
          link
        }
        main_image {
          link
        }
        description
        specifications {
          name
          value
        }
        feature_bullets
        buybox_winner {
          price {
            currency
            raw
            symbol
            value
          }
        }
        images {
          link
          variant
        }
        active
      }
      cnt
    }
  }
`;

export const ADMIN_COMPLETED_QUERY = gql`
  query AdminCompletedAuctions($pageArgs: PageArgs!, $filter: Filter!) {
    admin_completed_auctions(pageArgs: $pageArgs, filter: $filter) {
      arr {
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
        winner {
          avatar
          username
        }
        watchers
        chatters
        timer
        live_timer
        bid_speed
        fund_amount
        fund_percent
        campaign
        reserved
        state
        tracking
        manual
      }
      cnt
    }
  }
`;
