import PageLayout from '../components/PageLayout'
import AuthProvider from '../appState/AuthProvider'
import apolloClient from "../apollo/apolloClient"
import { ApolloProvider } from "@apollo/react-hooks"
import fetch from "isomorphic-unfetch"
import cookie from 'cookie'

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <AuthProvider>
//       <PageLayout>
//         <Component {...pageProps} />
//       </PageLayout>
//     </AuthProvider>
//   )
// }

const QUERY_USER = {
  query: `
    query {
        user{
          id
          name
          email
          products{
            id
            imageUrl
            description
            price
          }
          carts{
            id
            product{
              description
              imageUrl
              price
            }
            quantity
          }
          orders{
            id
            items{
              product{
                description
                price
                imageUrl
              }
              quantity
            }
          }
          cards{
            id
            cardInfo{
              id
              expiration_month
              expiration_year
              brand
              last_digits
            }
          }
        }
      }
  `
}

function MyApp({ Component, pageProps, apollo, user }) {
  // console.log('User -->',user)
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </AuthProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async ({ctx, router}) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }
  // console.log(ctx.req.headers)

  const { headers } = ctx.req
  const cookies = headers && cookie.parse(headers.cookie || '')
  const token = cookies && cookies.jwt

  ctx.res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict")
  if (!token) {
    if (router.pathname === '/cart' || router.pathname === '/manageProduct') {
      ctx.res.writeHead(302, { Location: '/signin' })
      ctx.res.end()
    } 
    return null
  } else {
    if (router.pathname === '/signin') {
      ctx.res.writeHead(302, { Location: '/products' })
      ctx.res.end()
    } 
  }

  // console.log(token)
  const response = await fetch('http://localhost:4444/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}` || "",
      
    },
    body: JSON.stringify(QUERY_USER)
  })

  if (response.ok) {
    const result = await response.json()
    // console.log('Result -->',result)
    return{user:result.data.user}
  } else {
        if (router.pathname === '/cart') {
          ctx.res.writeHead(302, { Location: '/signin' })
          ctx.res.end()
        }
    return null
  }
}

export default apolloClient(MyApp)
