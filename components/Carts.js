import React, { useContext } from 'react'
import CartItem from './CartItem'
import { AuthContext } from '../appState/AuthProvider'
import CheckoutWithCreditCard from './CheckoutWithCreditCard'
import CheckoutWithInternetBanking from './CheckoutWithInternetBanking'
import { useMutation } from '@apollo/react-hooks'
import {CREATE_ORDER} from '../gql/gql_mutation'
import {ME} from '../gql/gql_query'

const Carts = () => {

    const {user} = useContext(AuthContext)
    // console.log(user)

    const [createOrder, { loading, error }] = useMutation(CREATE_ORDER, {
        onCompleted: data => {
            if (data.createOrder.authorize_uri) {
                window.location.href = data.createOrder.authorize_uri
            }
        }
        , refetchQueries: [{ query: ME }]
    })
    
    const calculateAmount = carts => {
        const amount = carts.reduce(
            (sum, cart) => sum + cart.quantity * cart.product.price,
            0
        )
        return amount * 100
    }

    const handleCheckout = async(amount, cardId, token, return_uri) => {
        const result = await createOrder({ variables: { amount, cardId, token, return_uri } })
        console.log('Result ==>', result)
    }
    

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (user && (
        <div style={{
            width: '95%',
            margin: 'auto'
        }}>
            <h1 style={{
                fontSize: "5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "100px",
                textAlign:"center"
            }}>Cart</h1>
            <div>
                {user.carts.length > 0 ?
                    <>
                        <h1 style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            marginTop: "50px",
                            textAlign:"center"
                        }}>Products List</h1>
                        {/* Header */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr',
                            width: '100%',
                            marginTop: "100px",
                            backgroundColor: 'teal',
                            color:'white',
                        }}>
                            <h3 style={{
                                margin: 'auto',
                                padding: '20px',
                                fontWeight:'bold'
                            }}
                            >Description</h3>
                            <h3 style={{
                                margin: 'auto',
                                padding: '20px',
                                fontWeight:'bold'
                            }}
                            >Picture</h3>
                            <h3 style={{
                                margin: 'auto',
                                padding: '20px',
                                fontWeight:'bold'
                            }}
                            >Price</h3>
                            <h3 style={{
                                margin: 'auto',
                                padding: '20px',
                                fontWeight:'bold'
                            }}
                            >Quantity</h3>
                            <h3 style={{
                                margin: 'auto',
                                padding: '20px',
                                fontWeight:'bold'
                            }}
                            >Amount</h3>
                            <h3 style={{
                                margin: 'auto',
                                padding: '20px',
                                fontWeight:'bold'
                            }}
                            >Action</h3>
                        </div>
                        {/* Body */}

                        {user.carts.map(cart => <CartItem key={cart.id} cart={cart} />)}

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '5fr 1fr 1fr 1fr',
                                width: '100%',
                                borderTop: 'solid 1px rgba(0,0,0,.7)',
                                textAlign: 'center',
                                padding: '5px 0',
                                backgroundColor: 'teal',
                                color:'white',
                                fontSize:'1.5rem'
                            }}
                        >
                            <div style={{margin:'auto',display: 'grid',placeItems: 'center',padding: '20px',
                                fontWeight:'bold'}}>All</div>
                            <div style={{margin:'auto',display: 'grid',placeItems: 'center',padding: '20px',
                                fontWeight: 'bold'
                            }}>
                                {user.carts.length > 0 ?
                                    user.carts.reduce((sum, cart) =>
                                        sum + cart.quantity, 0
                                ):'-'}
                                </div>
                            <div style={{ margin: 'auto', display: 'grid', placeItems: 'center',padding: '20px',
                                fontWeight: 'bold'
                            }}>
                                {user.carts.length > 0 && <>{numberWithCommas(parseInt(calculateAmount(user.carts)/100))} </>}
                                &nbsp;THB
                            </div>
                            <div style={{margin:'auto',display: 'grid',placeItems: 'center',}}></div>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px'
                            }}
                            >
                            <div>
                                {user.cards &&
                                    user.cards.map(card => (
                                        <div
                                            key={card.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                            >
                                            <p>
                                                **** **** {card.cardInfo.last_digits}{' '}
                                                {card.cardInfo.brand} expire:
                                                {card.cardInfo.expiration_month}/
                                                {card.cardInfo.expiration_year}
                                            </p>
                                            <button
                                                style={{
                                                background: 'blue',
                                                cursor: 'pointer',
                                                color: 'white',
                                                border: 'none'
                                                }}
                                                onClick={() => {
                                                    const amount = calculateAmount(user.carts)
                                                    handleCheckout(amount, card.id)
                                                }}
                                            >
                                                Use This Card
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <CheckoutWithCreditCard
                            amount={calculateAmount(user.carts)}
                            handleCheckout={handleCheckout}
                        />
                        <CheckoutWithInternetBanking
                            amount={calculateAmount(user.carts)}
                            handleCheckout={handleCheckout}
                        />

                        {/* bottom */}
                        <div style={{
                            width: '100%',
                            height:"100px",
                            margin: 'auto',
                            background: 'teal',
                            marginTop:'200px'
                        }}></div>
                    </>
                    : <>
                        <div style={{
                            width: '100%',
                            height: '200px',
                            display: 'grid',
                            placeContent: 'center',
                            backgroundColor:'whitesmoke'
                        }}>
                            <h1 style={{
                                color: 'darkgray',
                                fontWeight: 'bold',
                                fontSize: '3rem',
                                textTransform:'uppercase'
                            }}>
                                products list's Empty
                            </h1>
                        </div>
                        
                    </>
                }
            </div>
            
        </div>
    )
    )
}

export default Carts
