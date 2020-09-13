import React from 'react'
import { useEffect,useState } from 'react'
import { QUERY_ALL_USERS } from '../gql/gql_query'
import { useQuery } from '@apollo/react-hooks'
const adminPage = () => {
    const {data,loading,error} = useQuery(QUERY_ALL_USERS)

    // console.log(data)
    return (
        <div>
            {error &&
                <div style={{
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
                }}>😓Ooobs...&nbsp;something went wrong,<br /> Please try agian later. 📌</h5>
                </div>
            }
            {loading &&
                <div style={{
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
                }}>Loading...</h4>
                </div>
            }
            <div className="container">
                <h1>Admin Page</h1>
                <table style={{
                    border:'solid 1px darkgray'
                }}>
                    <tr style={{
                    border:'solid 1px darkgray'
                }}>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>ID</td>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>NAME</td>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>EMAIL</td>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>CREATED AT</td>
                    </tr>
                {data && data.users ? data.users.map(user => 
                    <tr key={user.id} style={{
                    border:'solid 1px darkgray'
                }}>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>{user.id}</td>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>{user.name}</td>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>{user.email}</td>
                        <td style={{
                    border:'solid 1px darkgray'
                }}>{user.createdAt}</td>
                    </tr>
                ) : <h3>Empty!</h3>
                    }
                </table>
                
            </div>
        </div>
    )
}

export default adminPage
