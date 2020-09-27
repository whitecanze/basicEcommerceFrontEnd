import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "isomorphic-unfetch"
import withApollo from "next-with-apollo"
import cookie from "cookie"

const uri = "https://backend-api-01.herokuapp.com/graphql"
// const uri = "https://backend-api-01.herokuapp.com/playground"

const httpLink = createHttpLink({
  uri,
  fetch
})

const authLink = setContext((_, { headers }) => {
  // Get token from cookie
  let cookies

  // Server side
  if (headers) {
    cookies = cookie.parse(header.cookie || "")
  }

  // Client side
  if (typeof window !== "undefined") {
    cookies = cookie.parse(document.cookie || "")
  }

  const token = (cookies && cookies.jwt) || ""

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
    })
  }
  // {
  //   render: ({ Page, props }) => {
  //     return (
  //       <ApolloProvider client={props.apollo}>
  //         <Page {...props} />
  //       </ApolloProvider>
  //     )
  //   }
  // }
)