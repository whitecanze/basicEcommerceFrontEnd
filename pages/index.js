import { withRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
const Home = ({ router }) => {
  const ripple = e => {
    const buttons = document.querySelectorAll(".btns")
    buttons.forEach((button) => {
      button.onclick = function (e) {
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop
        
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

  useEffect(() => {
    if (router.pathname === '/') {
      if ($('a').hasClass('nav-link')) {
        $('a').removeClass('active')
        $('#Home-btn').addClass('active')
      }
    }
    ripple()
  },[])

  return (
    <div style={{backgroundColor:"#222",color:"#fff",width:"100%",height:"100%"}}>
      <div className="container" style={{backgroundColor:"#222",}}>
        <h1 style={{paddingTop:"20px"}}>
          Animations
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
              <div className="btn-ripple-html" id="btn-ripple-html"
              >
                &lt;div className="btn-wrapper"&gt;<br/>
                &emsp;&lt;button class="btns btn-bg-org"&gt;Click me&lt;/button&gt;<br/>
                &emsp;&lt;button class="btns btn-bg-blu"&gt;Click me&lt;/button&gt;<br/>
                &emsp;&lt;button class="btns btn-bg-pur"&gt;Click me&lt;/button&gt;<br/>
                &emsp;&lt;button class="btns btn-bg-gre"&gt;Click me&lt;/button&gt;<br/>
                &lt;/div&gt;
              </div>
            </div>
            <div className="mysubcard-box">
              <h5>CSS</h5>
              <div className="btn-ripple-css" id="btn-ripple-css">
                .btn-wrapper&nbsp;&#123;<br/>
                &emsp;display&#58;&ensp;flex&#59;<br/>
                &emsp;justify-content&#58;&ensp;space-evenly&#59;<br />
                &#125;<br/><br/>
                .btns&nbsp;&#123;<br/>
                &emsp;position&#58;&ensp;relative&#59;<br/>
                &emsp;display&#58;&ensp;inline-block&#59;<br/>
                &emsp;padding&#58;&ensp;12px&ensp;36px&#59;<br/>
                &emsp;margin&#58;&ensp;10px&ensp;0px&#59;<br/>
                &emsp;color&#58;&ensp;<span style={{color:"#000",backgroundColor:"#fff"}}>#fff</span>&#59;<br/>
                &emsp;text-transform&#58;&ensp;uppercase&#59;<br/>
                &emsp;font-size&#58;&ensp;18px&#59;<br/>
                &emsp;border&#58;&ensp;none&#59;<br/>
                &emsp;outline&#58;&ensp;none&#59;<br/>
                &emsp;letter-spacing&#58;&ensp;2px&#59;<br/>
                &emsp;border-radius&#58;&ensp;40px&#59;<br/>
                &emsp;user-select&#58;&ensp;none&#59;<br/>
                &emsp;overflow&#58;&ensp;hidden&#59;<br /><br />
                
                &emsp;.span&nbsp;&#123;<br/>
                &emsp;&emsp;position&#58;&ensp;absolute&#59;<br/>
                &emsp;&emsp;background&#58;&ensp;<span style={{color:"#000",backgroundColor:"#fff"}}>#fff</span>&#59;<br/>
                &emsp;&emsp;transform&#58;&ensp;translate(-50%,&ensp;-50%)&#59;<br/>
                &emsp;&emsp;border-radius&#58;&ensp;50%&#59;<br/>
                &emsp;&emsp;pointer-events&#58;&ensp;none&#59;<br/>
                &emsp;&emsp;animation&#58;&ensp;ripples&ensp;1s&ensp;linear&ensp;infinite&#59;<br/>
                &emsp;&#125;<br /><br />
                &emsp;&&nbsp;:&nbsp;focus&nbsp;&#123;<br/>
                &emsp;&emsp;outline&#58;&ensp;none&#59;<br/>
                &emsp;&#125;<br /><br />
            
                &#125;<br/><br/>
                
                .btn-bg-org&nbsp;&#123;<br/>
                &emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#e85a19"}}>#e85a19</span>,&ensp;<span style={{color:"#000",backgroundColor:"#f5ce62"}}>#f5ce62</span>)&#59;<br/>
                &#125;<br /><br />
                .btn-bg-blu&nbsp;&#123;<br/>
                &emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#0162c8"}}>#0162c8</span>,&ensp;<span style={{color:"#000",backgroundColor:"#55e7fc"}}>#55e7fc</span>)&#59;<br/>
                &#125;<br /><br />
                .btn-bg-gre&nbsp;&#123;<br/>
                &emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#55e7fc"}}>#55e7fc</span>,&ensp;<span style={{color:"#000",backgroundColor:"#77e775"}}>#77e775</span>)&#59;<br/>
                &#125;<br /><br />
                .btn-bg-pur&nbsp;&#123;<br/>
                &emsp;background&#58;&ensp;linear-gradient(90deg,&ensp;<span style={{color:"#000",backgroundColor:"#755bea"}}>#755bea</span>,&ensp;<span style={{color:"#000",backgroundColor:"#ff72c0"}}>#ff72c0</span>)&#59;<br/>
                &#125;<br /><br />

                @keyframes&nbsp;ripples&nbsp;&#123;<br/>
                &emsp;0%&nbsp;&#123;<br />
                &emsp;&emsp;width&#58;&ensp;0px&#59;<br/>
                &emsp;&emsp;height&#58;&ensp;0px&#59;<br/>
                &emsp;&emsp;opacity&#58;&ensp;0.5&#59;<br/>
                &emsp;&#125;<br /><br/>
                &emsp;100%&nbsp;&#123;<br />
                &emsp;&emsp;width&#58;&ensp;500px&#59;<br/>
                &emsp;&emsp;height&#58;&ensp;500px&#59;<br/>
                &emsp;&emsp;opacity&#58;&ensp;0&#59;<br/>
                &emsp;&#125;<br />
                &#125;<br /><br />
              </div>
            </div>
            <div className="mysubcard-box">
              <h5>JS</h5>
              <div className="btn-ripple-js" id="btn-ripple-js">
                const&ensp;ripple&ensp;=&ensp;e&ensp;=&#62;&nbsp;&#123;<br />
                &emsp;const&ensp;buttons&ensp;=&ensp;document.querySelectorAll(".btns")<br />
                &emsp;buttons.forEach((button)&ensp;=&#62;&nbsp;&#123;<br />
                &emsp;&emsp;button.onclick&ensp;=&ensp;function&ensp;(e)&ensp;&#123;<br />
                &emsp;&emsp;&emsp;let&ensp;x&ensp;=&ensp;e.clientX&ensp;-&ensp;e.target.offsetLeft<br />
                &emsp;&emsp;&emsp;let&ensp;y&ensp;=&ensp;e.clientY&ensp;-&ensp;e.target.offsetTop<br />
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
        
      
      </div>
    </div>
)}

export default withRouter(Home)
