import React, { useState, useContext,useRef } from "react"
import Router from "next/router"
import { useMutation } from "@apollo/react-hooks"
import Cookies from "js-cookie"
import { AuthContext } from '../appState/AuthProvider'
import ReCAPTCHA from "react-google-recaptcha"
import {LOG_IN} from '../gql/gql_mutation'


const Signin = () => {

    const reRef = useRef()

    const [chkPass, setchkPass] = useState(false)
    const [passError, setPassError] = useState({
        message: ""
    })
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const { setAuthUser } = useContext(AuthContext)

    const [login, { loading, error }] = useMutation(LOG_IN, {
        variables: { ...userInfo },
        onCompleted: data => {
            if (data) {
            setAuthUser(data.login.user)
            Cookies.set("jwt", data.login.jwt)
            setUserInfo({
                email: "",
                password: ""
            })
            Router.push("/products")
        }
        }
    })

    const handleChange = e => {
        setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
        })
    }

    const hideAlert = () => {

        setTimeout(() => {
            $('.alert').fadeOut('slow')
        },3000)
    }

    const validateHuman = async () => {
        // console.log('2:',token)
        const cors =  'https://cors-anywhere.herokuapp.com/'
        const secret = process.env.RECAPTCHA_SECRET_KEY
        // console.log('secret',secret)
        const token = await reRef.current.executeAsync()
        const respone = await fetch(
            `${cors}https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
            , { method: "POST" }
        )
        const data = await respone.json()

        // console.log(data, "recaptcha data")
        
        return data.success
    }
    const handleSubmit = async e => {
        try {
            hideAlert()
            e.preventDefault()

            const human = validateHuman()
            if (!human) {
                setchkPass(true)
                setPassError({
                    message: "You're not a human."
                })
            } else {
                reRef.current.reset()
                await login()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div
            style={{
                margin: "100px",
                textAlign:"center"
            }}
        >
            
            <h1 style={{
                textTransform:"uppercase",
                fontWeight:'bold'
            }}>sign in</h1>
            <div>
                {error && (
                    <div className="alert alert-danger" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        {error.graphQLErrors[0]?error.graphQLErrors[0].message:''}
                    </div>
                )}
                {chkPass && (
                    <div className="alert alert-warning" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        {passError.message}
                    </div>
                )}
            </div>
            
            <form
                style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                width: "30%"
                }}
                onSubmit={handleSubmit}
            >
                
                <input
                style={{ margin: "5px", height: "30px" }}
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                />
                <input
                style={{ margin: "5px", height: "30px" }}
                type="password"
                name="password"
                placeholder="Password"
                value={userInfo.password}
                onChange={handleChange}
                />
                <ReCAPTCHA
                    sitekey={process.env.RECAPTCHA_SITE_KEY}
                    size="invisible"
                    ref={reRef}
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
                disabled={loading}
                >
                Submit
                </button>
            </form>
            <div>
                <p>Forgot password? <span
                    style={{
                        color: 'orange',
                        cursor:"pointer"
                    }}
                    onClick={()=> Router.push('/signin/requestresetpassword')}
                >Click here</span></p>
            </div>
        </div>
    )
    }

export default Signin