import { useState,useRef,useEffect,useContext } from 'react'
import {useMutation} from '@apollo/react-hooks'
import {SIGN_UP} from '../gql/gql_mutation'
import Link from 'next/link'
import ReCAPTCHA from "react-google-recaptcha"
import Router from 'next/router'
import {AuthContext} from '../appState/AuthProvider'
const Signup = () => {
    const { user } = useContext(AuthContext)
    const reRef = useRef()

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [rePassword, setRepassword] = useState({
        repassword: ""
    })
    const [success, setSuccess] = useState(false)
    
    const [chkPass, setchkPass] = useState(false)
    const [passError, setPassError] = useState({
        message: ""
    })
    
    const [signup, { loading, error }] = useMutation(SIGN_UP, {
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
            // Router.push("/signin")
        }
    })

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeRepass = e => {
        setRepassword({
            ...rePassword,
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
        reRef.current.reset()
        const respone = await fetch(
            `${cors}https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
            , { method: "POST" }
        )
        const data = await respone.json()

        console.log(data, "recaptcha data")
        
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
                    message:"You're not a human."
                })
            } else {
                if (userInfo.password === rePassword.repassword) {
                    setchkPass(false)
                    await signup()
                } else {
                    setchkPass(true)
                    setPassError({
                        message:'Password and Re-password not match.'
                    })
                    console.log(passError.message)
                }
            }
        } catch (error) {
            
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
        if (!user) {
            Router.push('/signin')
        }
        if (user && user.email != "whitecanze123@gmail.com") {
            Router.push('/')
        }
    })

    return (
        <div style={{width:'100%',backgroundColor:'#222'}}>
        <div className="signup-container">
            <ReCAPTCHA
                    sitekey={process.env.RECAPTCHA_SITE_KEY}
                    size="invisible"
                    ref={reRef}
                />
            <h1 style={{
                textTransform: "uppercase",
                fontWeight:'bold',
                color:"#e85a19"
            }}>add new user</h1>
            <div>
                {success && (
                    <div className="alert alert-success" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        You're successfully add new user
                        {/* <Link href="/signin"><a>&nbsp;Sign in.</a></Link> */}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        {error.graphQLErrors[0].message}
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
                

                <input className="input-cst-lg"
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={userInfo.name}
                    onChange={handleChange}
                />
                <input className="input-cst-lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={handleChange}
                />
                <input className="input-cst-lg"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userInfo.password}
                    onChange={handleChange}
                />
                <input className="input-cst-lg"
                    type="password"
                    name="repassword"
                    placeholder="Re-password"
                    value={rePassword.repassword}
                    onChange={handleChangeRepass}
                />
                <div className="btn-wrapper">
                    <button
                        className="btns btn-bg-gre"
                        draggable="false"
                        type="submit"
                        disabled={loading}
                    >Submit</button>
                </div>
                {/* <button
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
                >Submit</button> */}
            </form>

            
            </div>
        </div>
    )
}

export default Signup
