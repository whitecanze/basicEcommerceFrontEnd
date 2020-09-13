import React, {useContext} from 'react'
import { useQuery } from '@apollo/react-hooks'
import UserProductItem from './UserProductItem'
import { ME } from '../gql/gql_query'
import {AuthContext} from '../appState/AuthProvider'

const UserProducts = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
    return (
        <div style={{
            width: '80%',
            margin: 'auto'
        }}>
            <h1 style={{
                fontSize: "5rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginTop: "200px",
                textAlign:"center"
            }}>Products List</h1>

            {/* Header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 2fr 1fr 2fr',
                width: '100%',
                marginTop:"100px"
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
                >Action</h3>
            </div>
            
            {/* Body */}
            <div>
                {user &&
                    user.products.length > 0 ?
                    user.products.map(
                        product => (
                            <UserProductItem key={product.id} product={product} />
                    )
                    ) : (
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
                )}
            </div>

            {/* bottom */}
            <div style={{
                width: '100%',
                height:"100px",
                margin: 'auto',
                background: 'teal',
                marginTop:'200px'
            }}></div>
        </div>
    )
}

export default UserProducts
