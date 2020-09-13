import {useRouter} from 'next/router'
import { useQuery,useMutation } from '@apollo/react-hooks'
import { ME, QUERY_PRODUCT } from '../gql/gql_query'
import {ADD_TO_CART} from '../gql/gql_mutation'
import { motion } from "framer-motion"
import { useContext } from 'react'
import {AuthContext} from '../appState/AuthProvider'


const ProductDetail = () => {
    const route = useRouter() 
    const {user} = useContext(AuthContext)
    const {data,loading,error} = useQuery(QUERY_PRODUCT, {
        variables: { id: route.query.productId }
    })

    const [addToCart] = useMutation(ADD_TO_CART, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries:[{query: ME}]
    })

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleAddToCart = async (id) => {
        if (!user) {
            return Router.push('/signin')
        }
        await addToCart({variables:{id}})
    }
    // console.log(result)
    if (error) return <div style={{
        width: "500px",
        height: "auto",
        display: "flex",
        flexDirection:"row",
        position: "fixed",
        bottom: "1%",
        left: "1%"
    }} role="status"><span style={{
            width: "3rem",
            height: "3rem"
        }} className="spinner-grow text-danger spinner-grow-sm" role="status" aria-hidden="true"></span>
        <h5 style={{
            marginLeft: "10px"
        }}>😓Ooobs...&nbsp;something went wrong,<br /> Please try agian later. 📌</h5></div>

    if (loading) return <div style={{
        width: "500px",
        height: "auto",
        display: "flex",
        flexDirection:"row",
        position: "fixed",
        bottom: "1%",
        left: "1%"
    }} role="status"><span style={{
            width: "3rem",
            height: "3rem"
        }} className="spinner-grow text-info spinner-grow-sm" role="status" aria-hidden="true"></span>
        <h4 style={{
            marginTop: "10px",
            marginLeft: "10px"
        }}>Loading...</h4></div>
    
    
    

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop:'30px'
            }}
        >
            <img
                src={data.product.imageUrl}
                alt={data.product.description}
                width='350' />
            <h1>{data.product.description}</h1>
            <h3>{numberWithCommas(parseInt(data.product.price))} THB.</h3>
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
                    outline: 'none'
                }}
                onClick={() => handleAddToCart(data.product.id)}
            >{loading ? 'Processing...':'Add to Cart'}</motion.button>
        </div>
    )
}

export default ProductDetail