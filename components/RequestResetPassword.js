import React, { useState } from "react"
import { useMutation } from '@apollo/react-hooks'
import {REQUEST_RESET_PASSWORD} from '../gql/gql_mutation'

const RequestResetPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [requestResetPassword, { loading, error }] = useMutation(REQUEST_RESET_PASSWORD, {
        variables: { email },
        onCompleted: data => {
            if (data) {
                setMessage(data.requestResetPassword.message)
            }   
        }
    })

    const handleChange = e => {
        setEmail(e.target.value)
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
            await requestResetPassword()
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
            <h4 style={{
                textTransform:"uppercase",
                fontWeight:'bold'
            }}>Please enter email to proceed reset password.</h4>
            <div>
                {error && (
                    <div className="alert alert-danger" role="alert" style={{
                        position: "fixed",
                        bottom: "0",
                        right:"1%"
                    }}>
                        {error.graphQLErrors[0]?error.graphQLErrors[0].message:''}
                    </div>
                )}
                {message && (
                    <div className="alert alert-success" role="alert" style={{
                        position: "fixed",
                        bottom: "0",
                        right:"1%"
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
                type="email"
                name="email"
                placeholder="Email"
                value={email}
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

export default RequestResetPassword