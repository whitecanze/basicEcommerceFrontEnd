import React,{ useEffect,useContext,useState } from 'react'
import { AuthContext } from '../appState/AuthProvider'
import Router from 'next/router'
import { QUERY_ALL_USERS, QUERY_ALL_TODOLIST } from '../gql/gql_query'
// import {CALCULATE_ABV} from '../gql/gql_mutation'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'

export const CALCULATE_ABV = gql`
    mutation CALCULATE_ABV($ssg: Float!,$fsh: Float!){
        ABV(
            ssg:$ssg
            fsg:$fsh
        ){
            ssg
            fsg
            standard_formula
            alternate_formula
            abw_formula
            standard_abv
            standard_abw
            alternate_abv
            alternate_abw
        }
    }
`
const adminPage = ({ router }) => {
    const { data, loading, error } = useQuery(QUERY_ALL_USERS)
    const { data2, loading2, error2} = useQuery(QUERY_ALL_TODOLIST)
    const { user } = useContext(AuthContext)
    const [calData, setCalData] = useState({
        ssg: "",
        fsg:""
    })


    const [ABV, { loading3, error3 }] = useMutation(CALCULATE_ABV, {
        variables: {...parseFloat(calData)},
        onCompleted: data => {
            if (data) {
                console.log(data)
            }
			// $('#' + productData.id).remove()
		}
	})

    const hiding_userid = (user_id) => {
        let split_id = user_id.substring(0,4)
        // console.log(split_id)
        return split_id
    }
    useEffect(() => {
        // console.log(user.email)
        if (user && user.email != "whitecanze123@gmail.com") {
            Router.push('/')
        }
        if (!user) {
            Router.push('/signin')
        }
        if (router.pathname === '/admin') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Admin-btn').addClass('active')
            }
        }
    })

    const handlerCalculate = async (e) => {
        try {
            e.preventDefault()
            await ABV()
        } catch (error) {
            console.log(error)
        }
        
    }

    const inputCalHandler = e => {
        // console.log(e.target.value)
        setCalData({
            ...calData,
            [e.target.name]: e.target.value
        })
    }

    // console.log(data)
    return (
        <div>
            {error || error2  &&
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
            {loading || loading2 && 
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
            {user && user.email == "whitecanze123@gmail.com" &&
                <div className="container">
                    <h1>Admin Page</h1>
                    <table className="table table-dark table-striped" >
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>NAME</td>
                                <td>EMAIL</td>
                                <td>CREATED AT</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.users && data.users.map(user => 
                                <tr key={user.id}>
                                    <td>{hiding_userid(user.id)}....</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default withRouter(adminPage)
