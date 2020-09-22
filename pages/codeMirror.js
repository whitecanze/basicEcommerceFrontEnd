import React,{useEffect,useContext,useState} from 'react'
import { withRouter } from 'next/router'
import Router from 'next/router'
import { AuthContext } from '../appState/AuthProvider'
const Codemirror = () => {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            Router.push('/signin')
        }
        if (router.pathname === '/codeMirror') {
            if ($('a').hasClass('nav-link')) {
                $('a').removeClass('active')
                $('#CodeMirror-btn').addClass('active')
            }
        }
    })
    return (
        <div>
            CodeMirror
        </div>
    )
}

export default withRouter(Codemirror)
