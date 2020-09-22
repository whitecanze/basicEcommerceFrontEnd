import React, { useState, useContext,useRef,useEffect } from "react"
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
            Router.push("/")
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

    const ripple = e => {
        const buttons = document.querySelectorAll(".btns")
        buttons.forEach((button) => {
        button.onclick = function (e) {
            let x = e.pageX - e.target.offsetLeft
            let y = e.pageY - e.target.offsetTop
            
            let ripples = document.createElement("span")
            
            ripples.style.left = `${x}px`
            ripples.style.top = `${y}px`
            this.appendChild(ripples)
            setTimeout(()=> {
            ripples.remove()
            }, 1000)
        }
        })
    }

    useEffect(() => {
        ripple()
    })
    return (
        <div className="signin-container">
            
            <h1 style={{
                textTransform:"uppercase",
                fontWeight: 'bold',
                color:"#e85a19"
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
                className="input-cst-lg"
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleChange}
                />
                <input
                className="input-cst-lg"
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
                <div className="btn-wrapper">
                    <button
                        className="btns btn-bg-pur"
                        draggable="false"
                        type="submit"
                        disabled={loading}
                    >Submit</button>
                </div>
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