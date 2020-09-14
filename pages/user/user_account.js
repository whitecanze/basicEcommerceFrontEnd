import { useEffect,useContext,useState } from 'react'
import Router from 'next/router'
import { withRouter } from 'next/router'
import {AuthContext} from '../../appState/AuthProvider'
const user_account = ({ router }) => {
    const { user } = useContext(AuthContext)
    useEffect(() => {
        // console.log(user.email)
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
            <h1>User Account Page</h1>
        </div>
    )
}

export default withRouter(user_account)
