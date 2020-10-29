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

export const GROCERIES_QUERY = gql`
  query Groceries($pageArgs: PageArgs!, $filter: Filter!) {
    groceries(pageArgs: $pageArgs, filter: $filter) {
      arr {
        name
        second_lang
        mobile
        owner_email
        bank_account
        contact_email
        contact_phone
        opening_hours
        delivery_radius
        min_order
        first_offer_discount
        is_collect 
        logo {
          link
        }
        images {
          link
          variant
        }          
        location {
          address
          lng
          lat
        }
        credit_card {
          card_number
          expired_date
          cvv
        }
        description {
          lang
          value
        }
        delivery_policy {
          lang
          value
        }
        about_us {
          lang
          value
        }
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
