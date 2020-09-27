import {useContext,useEffect, useState, useRef } from 'react'
import { withRouter } from 'next/router'
import { AuthContext } from '../appState/AuthProvider'
import Router from 'next/router'
import axios from 'axios'
const Home = ({ router }) => {
  const { user } = useContext(AuthContext)

  // const [codeData, setCodeDate] = useState({
  //       codes:[]
  //   })

    // useEffect(() => {
    //     axios.get('http://localhost:5000/codes/')
    //         .then(res => {
    //             setCodeDate({ codes: res.data })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // })
  
  useEffect(() => {
    if (!user) {
      Router.push('/signin')
    }
    if (router.pathname === '/') {
      if ($('a').hasClass('nav-link')) {
        $('a').removeClass('active')
        $('#Home-btn').addClass('active')
      }
    }
  },[])

  return (
    <div>
      <div style={{ backgroundColor: "#222",color:"#fff" }}>
        <div className="container">
          <h1 id="header-title-text">
            Styles & Animations
          </h1><br/><br/>
          <div className="content-page">
            <h4>Ripple animation</h4><br/>
            <iframe
              height="265"
              style={{width:"100%"}}
              scrolling="no"
              title="Ripple animation"
              src="https://codepen.io/whitecanze/embed/preview/XWdGGbx?height=265&theme-id=dark&default-tab=html,result"
              frameborder="no"
              loading="lazy"
              allowtransparency="true"
              allowfullscreen="true"
            >
              See the Pen <a href='https://codepen.io/whitecanze/pen/XWdGGbx'>Ripple animation</a> by whitecanze
              (<a href='https://codepen.io/whitecanze'>@whitecanze</a>) on <a href='https://codepen.io'>CodePen</a>.
            </iframe>
          </div>
          <br /><hr /><br />
          <div className="content-page">
            <h4>Animated sliding menu indicator</h4><br/>
            <iframe
              height="265"
              style={{ width: "100%" }}
              scrolling="no"
              title="Animated sliding menu indicator"
              src="https://codepen.io/whitecanze/embed/preview/ExKMMQB?height=265&theme-id=dark&default-tab=css,result"
              frameborder="no"
              loading="lazy"
              allowtransparency="true"
              allowfullscreen="true"
            >
              See the Pen <a href='https://codepen.io/whitecanze/pen/ExKMMQB'>Animated sliding menu indicator</a> by whitecanze
              (<a href='https://codepen.io/whitecanze'>@whitecanze</a>) on <a href='https://codepen.io'>CodePen</a>.
            </iframe>
          </div>
          <br /><hr /><br />
          <div className="content-page">
            <h4>Rainbow progressbar</h4><br/>
            <iframe
              height="265"
              style={{ width: "100%" }}
              scrolling="no"
              title="Rainbow progressbar"
              src="https://codepen.io/whitecanze/embed/preview/LYNaaBp?height=265&theme-id=dark&default-tab=css,result"
              frameborder="no"
              loading="lazy"
              allowtransparency="true"
              allowfullscreen="true"
            >
              See the Pen <a href='https://codepen.io/whitecanze/pen/LYNaaBp'>Rainbow progressbar</a> by whitecanze
              (<a href='https://codepen.io/whitecanze'>@whitecanze</a>) on <a href='https://codepen.io'>CodePen</a>.
            </iframe>
          </div>
          <br /><hr /><br />
      </div>
    </div>
    </div>
)}

export default withRouter(Home)
