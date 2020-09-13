import React, { Component } from "react";
import Script from "react-load-script";


const CheckoutWithCreditCard = ({ amount, handleCheckout }) => {
    
    let OmiseCard
    // console.log(process.env.OMISE_PUBLIC_KEY)

    // const amount = carts.reduce((sum, cart) => sum + cart.quantity * cart.product.price, 0)
    
    const handleLoadScript = () => {
        // console.log('loading complete')
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
        publicKey: process.env.OMISE_PUBLIC_KEY,
        currency: "thb",
        frameLabel: "Tea Shop",
        submitLabel: "PAY NOW",
        buttonLabel: "Pay with Omise"
        });
    };

    const creditCardConfigure = () => {
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: []
        });
        OmiseCard.configureButton("#credit-card");
        OmiseCard.attach();
    };

    const omiseCardHandler = () => {
        OmiseCard.open({
            frameDescription: 'Invoice #3847',
            amount,
            onCreateTokenSuccess: (token) => {
                console.log(token)
                handleCheckout(amount, null,token)
        },
            onFormClosed: () => {},
        })
    }

    const handleClick = e => {
        e.preventDefault();
        creditCardConfigure();
        omiseCardHandler()
    };

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center'
        }}>
            <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
            <form>
                <button
                    style={{
                        margin:'25px 0 0 0',
                        padding: '15px 25px',
                        cursor: 'pointer',
                        background: 'blue',
                        border: 'none',
                        borderRadius:'3px',
                        outline: 'none',
                        fontSize: '18px',
                        color: 'white',
                        fontWeight:'bold',
                        textTransform:'uppercase'
                        
                    }}
                    id="credit-card"
                    type="button"
                    disabled={!amount}
                    onClick={handleClick}
                >
                Pay with Credit Card
            </button>
            </form>
        </div>
        );
}

export default CheckoutWithCreditCard;