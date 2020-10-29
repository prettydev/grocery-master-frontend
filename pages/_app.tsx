import React from "react";
import App from "next/app";
import Head from "next/head";
import { Provider } from "next-auth/client";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache";

import { withApollo } from "../lib/withApollo";
import { MapProvider } from "../context/store";

import "animate.css";
import "antd/dist/antd.css";
import "../style/custom-antd.css";
import "../style/index.css";
import "../style/animations.css";
import "react-image-gallery/styles/css/image-gallery.css";

// since "apollo" isn't a native Next.js prop we have to declare it's type.
interface IProps {
  apollo: ApolloClient<NormalizedCacheObject>;
}

// adds our custom props interface to the generic App base class.
class MyApp extends App<IProps> {
  render() {
    // instead of creating a client here, we use the rehydrated apollo client provided by our own withApollo provider.
    const { Component, pageProps, apollo } = this.props;

    return (
      <>
        <Head>
          <title>byebyeGROCERY</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <Provider
          options={{
            clientMaxAge: 0,
            keepAlive: 0,
          }}
          session={pageProps.session}
        >
          <MapProvider>
            <ApolloProvider client={apollo}>
              <Component {...pageProps} />
            </ApolloProvider>
          </MapProvider>
        </Provider>
      </>
    );
  }
}

// before exporting our App we wrapp it with our own withApollo provider to have access to the our rehydrated apollo client.
export default withApollo(MyApp);
