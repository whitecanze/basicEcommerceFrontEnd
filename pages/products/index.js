import Products from '../../components/Products'
import { withRouter } from 'next/router'
import { useEffect } from 'react'

const ProductsPage = ({ router }) => {
    useEffect(() => {
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
