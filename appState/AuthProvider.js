import {createContext,useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'
import {MAKE_BLACK_LIST} from '../gql/gql_mutation'
import {useMutation} from '@apollo/react-hooks'

export const AuthContext = createContext()

const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useState(userData)
    const [currentUrl, setCurrentUrl] = useState({ urlName: '' })
    const [jwtBlacklist,setJwtBlacklist] = useState({jwt:''})
    
    const [makeBlackList, { loading, error }] = useMutation(MAKE_BLACK_LIST, {
        variables: { jwt:jwtBlacklist.jwt },
        onCompleted: data => {
            console.log(data)
        }
    })

    useEffect(() => {
        const syncLogout = e => {
            if (e.key === 'logout') {
                setUser(null)
                Router.push('/')
            }
        }

        addEventListener('storage', syncLogout)

        return () => {
            removeEventListener('storage', syncLogout)
            localStorage.removeItem('logout')
        }
    },[])

    const setAuthUser = userInfo => setUser(userInfo)

    const signout = async() => {
        // const currentJwt = Cookies.get('jwt')
        // console.log(currentJwt)

        // setJwtBlacklist(jwtBlacklist.jwt=currentJwt)
        // console.log(jwtBlacklist)
        // await makeBlackList()


        Cookies.remove('jwt')
        setUser(null)
        localStorage.setItem('logout',Date.now())
        Router.push('/signin')
    }

    return (
        <AuthContext.Provider value={{user, setAuthUser, signout,currentUrl,setCurrentUrl}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
