import {useContext, useEffect} from 'react'
import ManageProduct from '../components/ManageProduct'
import { AuthContext } from '../appState/AuthProvider'
import Router from 'next/router'
import { withRouter } from 'next/router'
const ManageProductPage = ({ router }) => {
    const { user } = useContext(AuthContext)
    // console.log(router.pathname)
    useEffect(() => {
        if (!user) {
            Router.push('/signin')
        }
        if (user && user.email != "whitecanze123@gmail.com") {
            Router.push('/')
        }
        if (router.pathname === '/manageProduct') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Manage-btn').addClass('active')
            }
        }
    })
    return(
        <>
            <ManageProduct/>
        </>
    )
}

export default withRouter(ManageProductPage)
