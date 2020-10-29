require("dotenv").config();

const withPlugins = require("next-compose-plugins");
const withImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const withPWA = require("next-pwa");

const envConfig = {
  clientId: process.env.clientId,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,

  UPLOAD_URL: process.env.UPLOAD_URL,
  CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
  GOOGLE_KEY: process.env.GOOGLE_KEY,

  WEB_PUSH_EMAIL: process.env.WEB_PUSH_EMAIL,
  WEB_PUSH_PRIVATE_KEY: process.env.WEB_PUSH_PRIVATE_KEY,
  NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,

  FACEBOOK_ID: process.env.FACEBOOK_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_FROM: process.env.EMAIL_FROM,
  DATABASE_URL: process.env.DATABASE_URL,
  SHARE_BASE_URL: process.env.SHARE_BASE_URL,

  GRAPHQL_URL: process.env.GRAPHQL_URL,
  API_URL: process.env.API_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  SITE: process.env.SITE,
};

const settings = {
  env: envConfig,
  devIndicators: {
    autoPrerender: false,
  },
  pwa: {
    dest: "public",
  },
};

module.exports =
  process.env.NODE_ENV === "development"
    ? withPlugins([[withImages], withFonts], settings)
    : withPlugins([withPWA, [withImages], withFonts], settings);
