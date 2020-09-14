import { withRouter } from 'next/router'
import { useEffect,useState } from 'react'

const Home = ({ router }) => {
  useEffect(() => {
    if (router.pathname === '/') {
      if ($('a').hasClass('nav-link')) {
        $('a').removeClass('active')
        $('#Home-btn').addClass('active')
      }
    }
  },[])

  return (
    <div>
      <div className="container">
        <h1>
          Home Page
        </h1>
        <p>
          Url: {router.pathname}
        </p>
      </div>
    </div>
)}

export default withRouter(Home)
