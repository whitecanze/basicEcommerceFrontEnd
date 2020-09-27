import Signin from '../../components/Signin'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../appState/AuthProvider'
import Router from 'next/router'
import { withRouter } from 'next/router'
const SignInPage = ({ router }) => {
    const { user } = useContext(AuthContext)
    // console.log(router.pathname)
    useEffect(() => {
        if (user) {
            Router.push('/')
        }
        if (router.pathname === '/signin') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Signin-btn').addClass('active')
            }
        }
    })
    return <Signin/>
}

export default withRouter(SignInPage)