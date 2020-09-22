import React, { useState } from "react"
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import {RESET_PASSWORD} from '../gql/gql_mutation'

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const router = useRouter()

    const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
        variables: { password, token: router && router.query.resetToken },
        onCompleted: data => {
            if (data) {
                setMessage(data.resetPassword.message)
            }   
        }
    })

    const handleChange = e => {
        setPassword(e.target.value)
    }

    const hideAlert = () => {
        setTimeout(() => {
            $('.alert').fadeOut('slow')
        },3000)
    }
    const handleSubmit = async e => {
        try {
            hideAlert()
            e.preventDefault()
            await resetPassword()
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(password)
    // console.log(router && router.query.resetToken)
    return (
        <div
            style={{
                margin: "100px",
                textAlign:"center"
            }}
        >
            <h4 style={{
                textTransform:"uppercase",
                fontWeight:'bold'
            }}>Please enter your new password below.</h4>
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
                {message && (
                    <div className="alert alert-success" role="alert" style={{
                        position: "fixed",
                        bottom: "10px",
                        left:"10px"
                    }}>
                        {message}
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                />
                <div className="btn-wrapper">
                    <button
                        className="btns btn-bg-pur"
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
                >
                Submit
                </button> */}
            </form>
        </div>
    )
    }

export default ResetPassword