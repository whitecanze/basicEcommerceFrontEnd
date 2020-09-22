import { withRouter } from 'next/router'
import {useContext,useEffect, useState, useRef } from 'react'
import { AuthContext } from '../appState/AuthProvider'
import Router from 'next/router'
const Home = ({ router }) => {
  const { user } = useContext(AuthContext)
  const ripple = e => {
    const buttons = document.querySelectorAll(".btns")
    buttons.forEach((button) => {
      button.onclick = function (e) {
        let x = e.pageX - e.target.offsetLeft
        let y = e.pageY - e.target.offsetTop
        
        let ripples = document.createElement("span")
        
        ripples.style.left = `${x}px`
        ripples.style.top = `${y}px`

        this.appendChild(ripples)
        
        setTimeout(()=> {
          ripples.remove()
        }, 1000)
      }
    })
  }

  const indicatorSlidingMenu = () => {
    const marker = document.querySelector("#marker")
    const item = document.querySelectorAll('.animated-sliding-menu-indicator ul li a')

    const indicator = e => {
      marker.style.top = e.offsetTop + 'px'
      marker.style.width = e.offsetWidth + 'px'
    }
    item.forEach(link => {
      link.addEventListener('mousemove', e => {
        indicator(e.target)
      })
    })
  }

  const cstProgressBar = () => {
    let myprogressbar = document.querySelector(".cst-progressbar")
    // let progress = (window.pageYOffset / totalheight) * 100
    //   if (progress > 100) {
    //     progress = 100
    //   }
    // myprogressbar.style.width = progress + "%"
    myprogressbar.style.width = "100%"
  }

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
    ripple()
    indicatorSlidingMenu()
    cstProgressBar()
    
  },[])

  return (
    <div>
      <div style={{ backgroundColor: "#222",color:"#fff" }}>
        <div className="container">
          <h1 id="header-title-text">
            Styles & Animations
          </h1><br/><br/>
          <div className="content-page">
            <h4>Ripple animation</h4>
            <div className="btn-wrapper">
              <button className="btns btn-bg-org" draggable="false">Click me</button>
              <button className="btns btn-bg-blu" draggable="false">Click me</button>
              <button className="btns btn-bg-pur" draggable="false">Click me</button>
              <button className="btns btn-bg-gre" draggable="false">Click me</button>
            </div><br />
            <div className="mycard-box">
              <div className="mysubcard-box">
                <h5>HTML</h5>
                <div className="code-Frame-box">
                  &lt;div className="btn-wrapper"&gt;<br/>
                  &emsp;&lt;button class="btns btn-bg-org"&gt;Click me&lt;/button&gt;<br/>
                  &emsp;&lt;button class="btns btn-bg-blu"&gt;Click me&lt;/button&gt;<br/>
                  &emsp;&lt;button class="btns btn-bg-pur"&gt;Click me&lt;/button&gt;<br/>
                  &emsp;&lt;button class="btns btn-bg-gre"&gt;Click me&lt;/button&gt;<br/>
                  &lt;/div&gt;
                </div>
              </div>
              <div className="mysubcard-box">
                <h5>SCSS</h5>
                <div className="code-Frame-box">
                  .btn-wrapper&nbsp;&#123;<br/>
                  &emsp;display&#58;&ensp;flex&#59;<br/>
                  &emsp;justify-content&#58;&ensp;center&#59;<br />
                  &emsp;gap&#58;&ensp;2em&#59;<br />
                  &emsp;flex-wrap&#58;&ensp;wrap&#59;<br /><br />
                  
                  &emsp;&&ensp;&gt;&ensp;*&ensp;&#123;<br/>
                  &emsp;&emsp;flex-basis&#58;&ensp;200px&#59;<br />
                  &emsp;&emsp;grow&#58;&ensp;1&#59;<br />
                  &emsp;&#125;<br /><br />

                  &emsp;.btns&nbsp;&#123;<br />
                  &emsp;&emsp;position&#58;&ensp;relative&#59;<br/>
                  &emsp;&emsp;display&#58;&ensp;inline-block&#59;<br/>
                  &emsp;&emsp;padding&#58;&ensp;12px&ensp;36px&#59;<br/>
                  &emsp;&emsp;margin&#58;&ensp;10px&ensp;0px&#59;<br/>
                  &emsp;&emsp;color&#58;&ensp;<span style={{color:"#000",backgroundColor:"#fff"}}>#fff</span>&#59;<br/>
                  &emsp;&emsp;text-transform&#58;&ensp;uppercase&#59;<br/>
                  &emsp;&emsp;font-size&#58;&ensp;18px&#59;<br/>
                  &emsp;&emsp;border&#58;&ensp;none&#59;<br/>
                  &emsp;&emsp;outline&#58;&ensp;none&#59;<br/>
                  &emsp;&emsp;letter-spacing&#58;&ensp;2px&#59;<br/>
                  &emsp;&emsp;border-radius&#58;&ensp;40px&#59;<br/>
                  &emsp;&emsp;user-select&#58;&ensp;none&#59;<br/>
                  &emsp;&emsp;overflow&#58;&ensp;hidden&#59;<br /><br />
                  
                  &emsp;&emsp;span&nbsp;&#123;<br/>
                  &emsp;&emsp;&emsp;&emsp;position&#58;&ensp;absolute&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;background&#58;&ensp;<span style={{color:"#000",backgroundColor:"#fff"}}>#fff</span>&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;transform&#58;&ensp;translate(-50%,&ensp;-50%)&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;border-radius&#58;&ensp;50%&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;pointer-events&#58;&ensp;none&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;animation&#58;&ensp;ripples&ensp;1s&ensp;linear&ensp;infinite&#59;<br/>
                  &emsp;&emsp;&#125;<br /><br />

                  &emsp;&emsp;@keyframes&nbsp;ripples&nbsp;&#123;<br/>
                  &emsp;&emsp;&emsp;&emsp;0%&nbsp;&#123;<br />
                  &emsp;&emsp;&emsp;&emsp;&emsp;width&#58;&ensp;0px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;height&#58;&ensp;0px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;opacity&#58;&ensp;0.2&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&#125;<br /><br/>
                  &emsp;&emsp;&emsp;&emsp;100%&nbsp;&#123;<br />
                  &emsp;&emsp;&emsp;&emsp;&emsp;width&#58;&ensp;500px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;height&#58;&ensp;500px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;opacity&#58;&ensp;0&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&#125;<br />
                  &emsp;&emsp;&#125;<br /><br/>

                  &emsp;&emsp;&&nbsp;:&nbsp;focus&nbsp;&#123;<br/>
                  &emsp;&emsp;&emsp;&emsp;outline&#58;&ensp;none&#59;<br/>
                  &emsp;&emsp;&#125;<br /><br />
                  &emsp;&#125;<br/><br/>
                  
                  &emsp;.btn-bg-org&nbsp;&#123;<br/>
                  &emsp;&emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#e85a19"}}>#e85a19</span>,&ensp;<span style={{color:"#000",backgroundColor:"#f5ce62"}}>#f5ce62</span>)&#59;<br/>
                  &emsp;&#125;<br /><br />
                  &emsp;.btn-bg-blu&nbsp;&#123;<br/>
                  &emsp;&emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#0162c8"}}>#0162c8</span>,&ensp;<span style={{color:"#000",backgroundColor:"#55e7fc"}}>#55e7fc</span>)&#59;<br/>
                  &emsp;&#125;<br /><br />
                  &emsp;.btn-bg-gre&nbsp;&#123;<br/>
                  &emsp;&emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#55e7fc"}}>#55e7fc</span>,&ensp;<span style={{color:"#000",backgroundColor:"#77e775"}}>#77e775</span>)&#59;<br/>
                  &emsp;&#125;<br /><br />
                  &emsp;.btn-bg-pur&nbsp;&#123;<br/>
                  &emsp;&emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#755bea"}}>#755bea</span>,&ensp;<span style={{color:"#000",backgroundColor:"#ff72c0"}}>#ff72c0</span>)&#59;<br/>
                  &emsp;&#125;<br /><br />

                  &#125;<br/><br/>

                </div>
              </div>
              <div className="mysubcard-box">
                <h5>JS</h5>
                <div className="code-Frame-box" >
                  const&ensp;ripple&ensp;=&ensp;e&ensp;=&#62;&nbsp;&#123;<br />
                  &emsp;const&ensp;buttons&ensp;=&ensp;document.querySelectorAll(".btns")<br />
                  &emsp;buttons.forEach((button)&ensp;=&#62;&nbsp;&#123;<br />
                  &emsp;&emsp;button.onclick&ensp;=&ensp;function&ensp;(e)&ensp;&#123;<br />
                  &emsp;&emsp;&emsp;let&ensp;x&ensp;=&ensp;e.pageX&ensp;-&ensp;e.target.offsetLeft<br />
                  &emsp;&emsp;&emsp;let&ensp;y&ensp;=&ensp;e.pageY&ensp;-&ensp;e.target.offsetTop<br />
                  &emsp;&emsp;&emsp;let&ensp;ripples&ensp;=&ensp;document.createElement("span")<br />
                  &emsp;&emsp;&emsp;ripples.style.left&ensp;=&ensp;`$&#123;x&#125;px`<br />
                  &emsp;&emsp;&emsp;ripples.style.top&ensp;=&ensp;`$&#123;y&#125;px`<br />
                  &emsp;&emsp;&emsp;this.appendChild(ripples)<br />
                  &emsp;&emsp;&emsp;setTimeout(()=&#62;&nbsp;&#123;<br />
                  &emsp;&emsp;&emsp;&emsp;ripples.remove()<br />
                  &emsp;&emsp;&emsp;&#125;, 1000)<br />
                  &emsp;&emsp;&#125;<br />
                  &emsp;&#125;<br />
                  &#125;<br /><br />
                </div>
              </div>
            </div>
          </div>
          <br /><hr /><br />
          <div className="content-page">
            <h4>Animated sliding menu indicator</h4>
            <div className="animated-sliding-menu-indicator">
              <ul>
                <div id="marker"></div>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Service</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div><br />
            <div className="mycard-box">
              <div className="mysubcard-box">
                <h5>HTML</h5>
                <div className="code-Frame-box">
                  &lt;div&ensp;className="animated-sliding-menu-indicator"&gt;<br/>
                  &emsp;&lt;ul&gt;<br />
                  &emsp;&emsp;&lt;div&ensp;id="marker"&gt;&lt;/div&gt;<br/>
                  &emsp;&emsp;&lt;li&gt;&lt;a&ensp;href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;<br/>
                  &emsp;&emsp;&lt;li&gt;&lt;a&ensp;href="#"&gt;About&lt;/a&gt;&lt;/li&gt;<br/>
                  &emsp;&emsp;&lt;li&gt;&lt;a&ensp;href="#"&gt;Service&lt;/a&gt;&lt;/li&gt;<br/>
                  &emsp;&emsp;&lt;li&gt;&lt;a&ensp;href="#"&gt;Portfolio&lt;/a&gt;&lt;/li&gt;<br/>
                  &emsp;&emsp;&lt;li&gt;&lt;a&ensp;href="#"&gt;Team&lt;/a&gt;&lt;/li&gt;<br/>
                  &emsp;&emsp;&lt;li&gt;&lt;a&ensp;href="#"&gt;Contact&lt;/a&gt;&lt;/li&gt;<br/>
                  &emsp;&lt;/ul&gt;<br />
                  &lt;/div&gt;
                </div>
              </div>
              <div className="mysubcard-box">
                <h5>SCSS</h5>
                <div className="code-Frame-box">
                  .animated-sliding-menu-indicator&nbsp;&#123;<br/>
                  &emsp;margin-top&#58;&ensp;50px&#59;<br/>
                  &emsp;padding&#58;&ensp;25px&#59;<br />
                  &emsp;display&#58;&ensp;flex&#59;<br/>
                  &emsp;justity-content&#58;&ensp;center&#59;<br/>
                  &emsp;align-items&#58;&ensp;center&#59;<br/>
                  &emsp;min-width&#58;&ensp;auto&#59;<br/>
                  &emsp;background&#58;&ensp;<span style={{color:"#fff",backgroundColor:"#080b1f"}}>#080b1f</span>&#59;<br/><br />

                  &emsp;ul&nbsp;&#123;<br />
                  &emsp;&emsp;position&#58;&ensp;relative&#59;<br/>
                  &emsp;&emsp;display&#58;&ensp;flex&#59;<br/>
                  &emsp;&emsp;flex-direction&#58;&ensp;column&#59;<br/>
                  &emsp;&emsp;align-items&#58;&ensp;center&#59;<br/>
                  &emsp;&emsp;justify-content&#58;&ensp;center&#59;<br/><br/>
                  
                  &emsp;&emsp;#marker&nbsp;&#123;<br/>
                  &emsp;&emsp;&emsp;&emsp;position&#58;&ensp;absolute&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;background&#58;&ensp;<span style={{color:"#000",backgroundColor:"#2196f3"}}>#2196f3</span>&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;top&#58;&ensp;0&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;height&#58;&ensp;35px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;border-radius&#58;&ensp;2px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;transition&#58;&ensp;0.5s&#59;<br/>
                  &emsp;&emsp;&#125;<br /><br />

                  &emsp;&emsp;li&nbsp;&#123;<br />
                  &emsp;&emsp;&emsp;&emsp;list-style&#58;&ensp;none&#59;<br/><br/>
                  &emsp;&emsp;&emsp;&emsp;a&nbsp;&#123;<br />
                  &emsp;&emsp;&emsp;&emsp;&emsp;position&#58;&ensp;relative&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;font-size&#58;&ensp;2em&#59;<br />
                  &emsp;&emsp;&emsp;&emsp;&emsp;color&#58;&ensp;<span style={{color:"#000",backgroundColor:"#fff"}}>#fff</span>&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;text-decoration&#58;&ensp;none&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;margin&#58;&ensp;10px&ensp;0&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&emsp;padding&#58;&ensp;0&ensp;20px&#59;<br/>
                  &emsp;&emsp;&emsp;&emsp;&#125;<br />
                  &emsp;&emsp;&#125;<br />
                  &#125;<br/><br/>
                </div>
              </div>
              <div className="mysubcard-box">
                <h5>JS</h5>
                <div className="code-Frame-box" >
                  const&ensp;indicatorSlidingMenu&ensp;=&ensp;()&ensp;=&#62;&nbsp;&#123;<br />
                  &emsp;const&ensp;marker&ensp;=&ensp;document.querySelector("#marker")<br />
                  &emsp;const&ensp;item&ensp;=&ensp;document.querySelectorAll('.animated-sliding-menu-indicator&ensp;ul&ensp;li&ensp;a')<br /><br />
                  &emsp;const&ensp;indicator&ensp;=&ensp;e&ensp;=&#62;&nbsp;&#123;<br />
                  &emsp;&emsp;marker.style.top&ensp;=&ensp;e.offsetTop&ensp;+&ensp;'px'<br />
                  &emsp;&emsp;marker.style.width&ensp;=&ensp;e.offsetWidth&ensp;+&ensp;'px'<br />
                  &emsp;&#125;<br /><br />
                  &emsp;item.forEach(link&ensp;=&#62;&nbsp;&#123;<br />
                  &emsp;&emsp;link.addEventListener('mousemove',&ensp;e&ensp;=&#62;&ensp;&#123;<br />
                  &emsp;&emsp;&emsp;indicator(e.target)<br/>
                  &emsp;&emsp;&#125;)<br />
                  &emsp;&#125;)<br /><br />
                  &#125;<br /><br />
                </div>
              </div>
            </div>
          </div>
          <br /><hr /><br />
          <div className="content-page">
            <div className = "myprogressbar">
              <div className="cst-progressbar"></div>
              <div className="cst-percent"></div>
            </div>
          </div>
          <br/><hr/><br/>
        </div>
      </div>
    </div>
)}

export default withRouter(Home)
