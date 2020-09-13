import {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

export const AuthContext = createContext()

const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useState(userData)
    const [currentUrl, setCurrentUrl] = useState({urlName:''})

    useEffect(() => {
        const syncLogout = e => {
            if (e.key === 'logout') {
                setUser(null)
                Router.push('/products')
            }
        }

        addEventListener('storage', syncLogout)

        return () => {
            removeEventListener('storage', syncLogout)
            localStorage.removeItem('logout')
        }
    },[])

    const setAuthUser = userInfo => setUser(userInfo)

    const signout = () => {
        Cookies.remove('jwt')
        setUser(null)
        localStorage.setItem('logout',Date.now())
        Router.push('/products')
    }

    return (
        <AuthContext.Provider value={{user, setAuthUser, signout,currentUrl,setCurrentUrl}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
