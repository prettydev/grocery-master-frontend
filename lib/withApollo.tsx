import nextWithApollo from "next-with-apollo";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  HttpLink,
  split,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { getMainDefinition } from "@apollo/client/utilities";
import { InMemoryCache } from "@apollo/client/cache";
import { WebSocketLink } from "@apollo/client/link/ws";
import fetch from "isomorphic-unfetch";

export const withApollo = (
  component: Parameters<ReturnType<typeof nextWithApollo>>[0]
): ReturnType<ReturnType<typeof nextWithApollo>> => {
  const wsUrl = `wss://${process.env.GRAPHQL_URL}`;
  const httpUrl = `https://${process.env.GRAPHQL_URL}`;
  if (!httpUrl) {
    throw new Error(
      "either url or httpUrl must be provided to make an apollo connection"
    );
  }

  const ssrMode = !process.browser;

  const httpLink: ApolloLink = new HttpLink({
    uri: httpUrl,
    credentials: "same-origin",
    fetch,
  });
  let link = httpLink;
  if (!ssrMode && wsUrl) {
    const wsLink = new WebSocketLink({
      uri: wsUrl,
      options: {
        reconnect: true,
      },
      // eslint not seeing WebSocket definition in typescript package. need to fix eslint rules
      // eslint-disable-next-line no-undef
      webSocketImpl: WebSocket,
    });
    link = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    );
  }

  return nextWithApollo(
    ({ initialState }) => {
      return new ApolloClient({
        link,
        ssrMode,
        connectToDevTools: !ssrMode,
        // type is somehow lost here. need to fix it
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cache: new InMemoryCache(),
      });
    },
    {
      render: ({ Page, props }) => (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      ),
    }
  )(component, { getDataFromTree });
};
