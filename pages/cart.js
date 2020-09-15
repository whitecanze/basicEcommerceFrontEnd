import {useContext, useEffect} from 'react'
import Router from 'next/router'
import Carts from '../components/Carts'
import {AuthContext} from '../appState/AuthProvider'
import { withRouter } from 'next/router'
const cartPage = ({ router }) => {
    const { user } = useContext(AuthContext)
    // console.log(router.pathname)
    useEffect(() => {
        if (!user) {
            Router.push('/signin')
        }
        if (user && user.email != "whitecanze123@gmail.com") {
            Router.push('/')
        }
        if (router.pathname === '/cart') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Cart-btn').addClass('active')
            }
        }
    })

    return <Carts/>
}

export default withRouter(cartPage)