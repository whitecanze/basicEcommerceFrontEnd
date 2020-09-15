import Products from '../../components/Products'
import { withRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../appState/AuthProvider'
import Router from 'next/router'
const ProductsPage = ({ router }) => {

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user && user.email != "whitecanze123@gmail.com") {
            Router.push('/')
        }
        if (!user) {
            Router.push('/signin')
        }
        if (router.pathname === '/products') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#Products-btn').addClass('active')
            }
        }
    },[])
    return <Products />
}

export default withRouter(ProductsPage)
