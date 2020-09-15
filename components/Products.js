import { useQuery } from '@apollo/react-hooks'
import ProductItem from './ProductItem'
import { QUERY_PRODUCTS } from '../gql/gql_query'
import { useEffect } from 'react'

const Products = () => {
    const {data,loading,error} = useQuery(QUERY_PRODUCTS,{refetchQueries:[{query: QUERY_PRODUCTS}]})
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
        <div>
            <div className="product-items-container">
                {data.products.map(prod => 
                    <ProductItem key={prod.id} prod={prod} />
                    )}
            </div>
        </div>
    )
}
export default Products
