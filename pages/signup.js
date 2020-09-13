import Signup from '../components/Signup'
import { withRouter } from 'next/router'
import {useEffect} from 'react'
const signout = ({ router }) => {
    // console.log(router.pathname)
    useEffect(() => {
        if (router.pathname === '/signup') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Signup-btn').addClass('active')
            }
        }
    })
    return <Signup/>
    
}

export default withRouter(signout)