import React,{ useContext } from 'react'
import Router from 'next/router'
import { motion } from "framer-motion"
import { AuthContext } from '../appState/AuthProvider'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'
import {ME} from '../gql/gql_query'
import {ADD_TO_CART} from '../gql/gql_mutation'


const ProductItem = ({ prod }) => {
    const { user } = useContext(AuthContext)

    const [addToCart, { loading, error }] = useMutation(ADD_TO_CART, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries:[{query: ME}]
    })

    const handleAddToCart = async (id) => {
        console.log(id)
        if (!user) {
            return Router.push('/signin')
        }
        await addToCart({variables:{id}})
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                    }}
                >
                    <div 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: "40px",
                            padding: "40px 0",
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            boxShadow:"6px 6px 8px rgba(0,0,0,.5)",
                        }}
                    >
                        
                        <Link href='/products/[productId]' as={`/products/${prod.id}`}>
                            <a>
                                <img loading="lazy" src={prod.imageUrl} alt={prod.description} width='250px' height='250px'></img>
                            </a>
                        </Link>
                        <h3>{prod.description}</h3>
                        <h4>{numberWithCommas(parseInt(prod.price))} THB.</h4>
                        {user && user.id === prod.user.id ?
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                    style={{
                                        background: "orange",
                                        color: "white",
                                        padding: "10px",
                                        cursor: "pointer",
                                        border: 'none',
                                        borderRadius: '5px',
                                        marginTop: '15px',
                                        outline: 'none',
                                }}
                                onClick={()=> Router.push('/manageProduct')}
                            ><i className="fas fa-cogs"></i>&nbsp;Manage</motion.button>
                            :
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                    style={{
                                        background: "green",
                                        color: "white",
                                        padding: "10px",
                                        cursor: "pointer",
                                        border: 'none',
                                        borderRadius: '5px',
                                        marginTop:'15px',
                                        outline: 'none',
                                    }}
                                    onClick={() => handleAddToCart(prod.id)}
                    
                            >{loading ? <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>&nbsp; Adding...</>:'Add to Cart'}</motion.button>
                        }
                    </div>
                </motion.div>
}

export default ProductItem
