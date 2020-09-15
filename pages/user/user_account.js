import { useEffect,useContext,useState } from 'react'
import Router from 'next/router'
import { withRouter } from 'next/router'
import { AuthContext } from '../../appState/AuthProvider'
import { CHANGE_PASSWORD } from '../../gql/gql_mutation'
import { useMutation } from '@apollo/react-hooks'

const user_account = ({ router }) => {
    const { user } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({
        email: "",
        currentpassword: "",
        newpassword:""
    })

    const [CHANGE_PASSWORD, { loading, error }] = useMutation(CHANGE_PASSWORD, {
        variables: { ...userInfo },
        onCompleted: data => {
            if (data) {
                setSuccess(true)
                setUserInfo({
                    name: "",
                    email: "",
                    password: "",
                })
                setRepassword({
                    repassword: ""
                })
                setchkPass(false)
                setPassError({
                    passError:""
                })
            }
            Router.push("/signin")
        }
    })

    const handleChange = e => {
        console.log(userInfo.email)
        console.log(userInfo.currentpassword)
        console.log(userInfo.newpassword)
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        console.log(user)
        if (!user) {
            Router.push('/signin')
        }
        if (router.pathname === '/user/user_account') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Account-btn').addClass('active')
            }
        }
    })

    return (
        <div>
            <div style={{backgroundColor:"#222",width:"100%",height:"100vh",color:"#fff"}}>
                <div className="container">
                    <h1>User Account Data</h1>
                    {user ?
                        <>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </> :
                        <>
                            
                        </>
                    }
                    <h1>Change Password</h1>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "auto",
                        }}
                        // onSubmit={handleSubmit}
                    >
                        <input type="hidden" name="email" value={user.email}/>
                        <input 
                            style={{
                                margin: "5px", height: "50px"
                            }}
                            type="password"
                            name="currentpassword"
                            placeholder="Current password"
                            value={userInfo.currentpassword}
                            onChange={handleChange}
                        />
                        <input 
                            style={{
                                margin: "5px", height: "50px"
                            }}
                            type="password"
                            name="newpassword"
                            placeholder="New password"
                            value={userInfo.newpassword}
                            onChange={handleChange}
                        />
                        <button
                            style={{
                                margin: "5px",
                                padding: "10px",
                                background: "teal",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "18px"
                            }}
                            type="submit"
                            // disabled={loading}
                        >Submit</button>
                    </form>
                </div>
            </div>    
        </div>
    )
}

export default withRouter(user_account)
