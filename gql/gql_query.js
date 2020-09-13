import gql from 'graphql-tag'

export const ME = gql`
    query ME {
        user{
            id
            name
            email
            products{
                id
                description
                imageUrl
                price
            }
            carts{
                id
                product{
                    id
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
export const QUERY_ALL_USERS = gql`
    query QUERY_ALL_USERS{
        users{
            id
            name
            email
            products{
                id
                description
            }
            carts{
                id
                product{
                    id
                    description
                }
                quantity
            }
            createdAt
        }
    }
`

export const QUERY_PRODUCT = gql`
    query QUERY_PRODUCT($id: ID!){
        product(id: $id){
            id
            description
            price
            imageUrl
        }
    }
`

export const QUERY_PRODUCTS = gql`
    query{
        products{
            id
            description
            price
            imageUrl
            user {
                id
            }
        }
    }
`

const gql_query = () => {
    return (
        <div>
            
        </div>
    )
}

export default gql_query
