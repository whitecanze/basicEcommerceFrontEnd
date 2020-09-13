import React from 'react'
import { motion } from "framer-motion"
import { useMutation } from "@apollo/react-hooks"
import { ME } from '../gql/gql_query'
import {DELETE_CART} from '../gql/gql_mutation'

const CartItem = ({ cart }) => {

    const [deleteCart, { loading, error }] = useMutation(DELETE_CART, {
		onCompleted: data => {
			console.log(data)
		},
		refetchQueries: [{ query: ME }],
	})

	const handleSubmit = async () => {
        try {
            await deleteCart({variables: {id:cart.id}})
        } catch (error) {
            console.log(error)
        }
	}

	const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

	
    return (
        <div id={cart.product.id}
            style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr',
                width: '100%',
                borderTop:'solid 1px rgba(0,0,0,.7)',
                textAlign: 'center',
                padding:'5px 0'
			}}>

            <div style={{margin:'auto',display: 'grid',
                placeItems: 'center',
            }}>
                <p style={{
                    margin:"0"
                }}>{cart.product.description}</p>
            </div>
            <div style={{margin:'auto',display: 'grid',
                placeItems: 'center',}}>
					<img
						src={cart.product.imageUrl}
						alt={cart.product.description}
						width='150px'
						height='150px'
					/>
            </div>
			<div
				style={{
				margin: 'auto',
				display: 'grid',
				placeItems: 'center',
			}}>
                <p style={{margin:"0"}}>{numberWithCommas(parseInt(cart.product.price))}</p>
			</div>
			<div
				style={{
				margin: 'auto',
				display: 'grid',
				placeItems: 'center',
			}}>
                <p style={{margin:"0"}}>{cart.quantity}</p>
			</div>
			<div
				style={{
				margin: 'auto',
				display: 'grid',
				placeItems: 'center',
			}}>
                <p style={{margin:"0"}}>{numberWithCommas(parseInt(cart.quantity * cart.product.price))}</p>
			</div>
				<div style={{
						margin: 'auto',
						display: 'grid',
						placeItems: 'center',
				}}>
					<motion.button
                        whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						style={{
							background: "darkred",
							color: "white",
							padding: "5px 10px",
							cursor: "pointer",
							border: 'none',
							borderRadius: '5px',
							outline: 'none'
						}}
						onClick={handleSubmit}
                    >
                    {loading ?
						<>
							<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            &nbsp;Deleting...
						</> :
						error ?
							'Error' :
						<>
							<i className="fas fa-trash"></i>&nbsp;Delete
						</>}
					</motion.button>
			</div>
        </div>
    )
}

export default CartItem
