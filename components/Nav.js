import Link from 'next/link'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../appState/AuthProvider'
import { useQuery } from '@apollo/react-hooks'
import { ME } from '../gql/gql_query'


const liStyle = { listStyle: "none", position: "relative" }
const Nav = () => {
    const { data } = useQuery(ME)
    const {user, signout, setAuthUser} = useContext(AuthContext)
    useEffect(() => {
        if (data) {
            setAuthUser(data.user)
        }

        // $('a').click((e) => {
        //     console.log(e.target.id)
        //     if ($('#' + e.target.id).hasClass('nav-link')) {
        //         $('a').removeClass('active')
        //         $('#'+e.target.id).addClass('active')
        //     }
        // })
    }, [data])
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <div className="container-fluid" style={{textAlign:'center',backgroundColor:"#ff5411",padding:'0',margin:'0'}}>
                <div className="navbar-brand" style={{
                        fontSize: "2rem",
                        margin: "10px",
                        marginLeft:"50px"
                }}><i className="fab fa-opencart"></i></div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    id="toggle-navbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                    style={{
                        marginRight:"50px"
                    }}
                >
                
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                    {user &&
                        <li className="nav-item">
                        <Link href="/">
                            <a id="Home-btn" className="nav-link" aria-current="page" >Home</a>
                        </Link>
                        </li>
                    }
                    {user &&
                        <li className="nav-item">
                            <Link href="/todolistPage">
                                <a id="Todolist-btn" className="nav-link" aria-current="page" >TodoList</a>
                            </Link>
                        </li>
                    }
                    {/* {user &&
                        <li className="nav-item">
                            <Link href="/codeMirror">
                                <a id="Home-btn" className="nav-link" aria-current="page" id="CodeMirror-btn">Code Mirror</a>
                            </Link>
                        </li>
                    } */}
                    {/* {user && user.email == "whitecanze123@gmail.com" &&
                        <li className="nav-item" style={liStyle}>
                            <Link href="/products">
                                <a className="nav-link" id="Products-btn">Products</a>
                            </Link>
                        </li>
                    }
                    {user && user.email == "whitecanze123@gmail.com" &&
                        <li className="nav-item">
                            <Link href="/manageProduct">
                                <a className="nav-link" id="Manage-btn">Manage product</a>
                            </Link>
                        </li>
                    } */}
                    {user && user.email == "whitecanze123@gmail.com" &&
                        <li className="nav-item">
                            <Link href="/admin">
                                <a className="nav-link" id="Admin-btn">Admin page</a>
                            </Link>
                        </li>
                    }
                </ul>
                    {user && (
                        <ul className="navbar-nav d-flex">
                            {/* <li className="nav-item" style={{
                                position:'relative'
                            }}>
                                {user.email == "whitecanze123@gmail.com" && 
                                    <Link href="/cart">
                                        <a className="nav-link" id="Cart-btn" style={{
                                                fontWeight:'bold',
                                                fontSize:"1rem"
                                            }}>
                                            <i className="fas fa-shopping-cart"></i>
                                            &nbsp;
                                            <span className="badge bg-success">
                                                {user && user.carts && user.carts.length === 0 && 0}
                                                {user &&
                                                    user.carts &&
                                                    user.carts.length > 0 &&
                                                    user.carts.reduce((sum, item) => sum + item.quantity, 0)}
                                            </span>
                                        </a>
                                    </Link>
                                }
                            </li> */}
                            {/* <li className="nav-item" style={{
                                cursor:"pointer"
                            }}>
                                <Link href="/user/user_account">
                                    <a className="nav-link" id="Account-btn" >
                                        Account
                                    </a>
                                </Link>
                            </li> */}
                            {user && user.email === "whitecanze123@gmail.com" &&
                            <li style={liStyle}>
                                <Link href="/signup">
                                    <a className="nav-link" id="Signup-btn">add user</a>
                                </Link>
                            </li>
                            }
                            <li className="nav-item" style={{
                                cursor:"pointer"
                            }}>
                                <a className="nav-link" onClick={signout}>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    )}
                    
                    {!user && (
                        <ul className="navbar-nav d-flex">
                            <li style={liStyle}>
                                <Link href="/signin">
                                    <a className="nav-link" id="Signin-btn">Sign in</a>
                                </Link>
                            </li>
                        </ul>
                    )}
                    </div>
                </div>
        </nav>
    )
}

export default Nav